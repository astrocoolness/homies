import { coerceStoredProfile } from "./sheet";
import type { CustomProfile, Stage } from "./types";
import { STAGES } from "./types";

const HOMIE_RE = /^c[a-z0-9]{4,16}$/;
const REEL_RE = /^r[a-z0-9]{4,24}$/;
const KEEPER_RE = /^k[a-f0-9]{32}$/;

const SCHEMA = [
  `create table if not exists public.homie_keepers (
    id text primary key,
    created_at timestamptz not null default now(),
    constraint homie_keepers_id check (id ~ '^k[a-f0-9]{32}$')
  )`,
  `create table if not exists public.custom_homies (
    id text primary key,
    keeper_id text not null references public.homie_keepers (id) on delete cascade,
    name text not null,
    stage text not null,
    profile jsonb not null,
    portrait_path text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint custom_homies_id check (id ~ '^c[a-z0-9]{4,16}$')
  )`,
  `create index if not exists custom_homies_keeper on public.custom_homies (keeper_id)`,
  `create table if not exists public.homie_reels (
    id text primary key,
    homie_id text not null references public.custom_homies (id) on delete cascade,
    keeper_id text not null references public.homie_keepers (id) on delete cascade,
    caption text not null,
    mime text not null,
    storage_path text not null,
    created_at timestamptz not null default now(),
    constraint homie_reels_id check (id ~ '^r[a-z0-9]{4,24}$')
  )`,
  `create index if not exists homie_reels_homie on public.homie_reels (homie_id)`,
  `alter table public.homie_keepers enable row level security`,
  `alter table public.custom_homies enable row level security`,
  `alter table public.homie_reels enable row level security`,
  `insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
   values (
     'homie-files',
     'homie-files',
     true,
     2500000,
     array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
   )
   on conflict (id) do nothing`,
  `do $$
   begin
     if not exists (
       select 1 from pg_policies
       where schemaname = 'storage' and tablename = 'objects' and policyname = 'homie files are public to read'
     ) then
       create policy "homie files are public to read"
         on storage.objects for select
         to public
         using (bucket_id = 'homie-files');
     end if;
   end $$`,
];

export type CloudHomie = { id: string; stage: Stage; profile: CustomProfile };
export type CloudReel = {
  id: string;
  homieId: string;
  caption: string;
  mime: string;
  url: string;
  at: number;
};
export type CloudOk<T> = { ok: true } & T;
export type CloudNo = { ok: false; reason: "off" | "down" };

type Creds = { url: string; key: string };

let schemaOk = false;
let schemaRetryAt = 0;

function creds(): Creds | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key || !url.startsWith("https://")) return null;
  return { url, key };
}

function authHeaders(key: string, extra?: Record<string, string>) {
  return { apikey: key, Authorization: `Bearer ${key}`, ...extra };
}

function publicUrl(base: string, path: string) {
  return `${base}/storage/v1/object/public/homie-files/${path}`;
}

function stripSslMode(raw: string) {
  try {
    const url = new URL(raw);
    url.searchParams.delete("sslmode");
    return url.toString();
  } catch {
    return raw;
  }
}

async function ensureSchema() {
  const dbUrl = process.env.SUPABASE_DB_URL?.trim();
  if (schemaOk || !dbUrl || Date.now() < schemaRetryAt) return;
  const pg = await import("pg");
  const client = new pg.Client({
    connectionString: stripSslMode(dbUrl),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 4000,
    statement_timeout: 20000,
  });
  try {
    await Promise.race([
      client.connect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ]);
    for (const statement of SCHEMA) await client.query(statement);
    schemaOk = true;
  } catch {
    schemaRetryAt = Date.now() + 60_000;
  } finally {
    await client.end().catch(() => undefined);
  }
}

async function rest(creds: Creds, path: string, init?: RequestInit) {
  const res = await fetch(`${creds.url}${path}`, {
    ...init,
    headers: authHeaders(creds.key, init?.headers as Record<string, string> | undefined),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("shelf");
  return res;
}

function decodeDataUrl(dataUrl: string): { mime: string; bytes: Buffer } | null {
  const match = /^data:(image\/(?:jpeg|png|webp)|image\/gif|video\/mp4);base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!match) return null;
  const bytes = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (bytes.length < 32 || bytes.length > 2_200_000) return null;
  return { mime: match[1], bytes };
}

async function upload(creds: Creds, path: string, mime: string, bytes: Buffer) {
  const res = await fetch(`${creds.url}/storage/v1/object/homie-files/${path}`, {
    method: "POST",
    headers: authHeaders(creds.key, { "Content-Type": mime, "x-upsert": "true" }),
    body: new Uint8Array(bytes),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error("shelf");
}

async function removePaths(creds: Creds, paths: string[]) {
  const prefixes = paths.filter(Boolean);
  if (prefixes.length === 0) return;
  await fetch(`${creds.url}/storage/v1/object/homie-files`, {
    method: "DELETE",
    headers: authHeaders(creds.key, { "Content-Type": "application/json" }),
    body: JSON.stringify({ prefixes }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => undefined);
}

async function touchKeeper(creds: Creds, keeperId: string) {
  await rest(creds, "/rest/v1/homie_keepers?on_conflict=id", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: keeperId }),
  });
}

function stageOf(value: unknown): Stage {
  return STAGES.includes(value as Stage) ? (value as Stage) : "adult";
}

async function run<T>(work: (creds: Creds) => Promise<T>): Promise<CloudOk<T> | CloudNo> {
  const ready = creds();
  if (!ready) return { ok: false, reason: "off" };
  try {
    await ensureSchema();
    const value = await work(ready);
    return { ok: true, ...value };
  } catch {
    return { ok: false, reason: "down" };
  }
}

export function pullKeeper(keeperId: string) {
  if (!KEEPER_RE.test(keeperId)) return Promise.resolve({ ok: false as const, reason: "down" as const });
  return run(async (creds) => {
    const homieRes = await rest(
      creds,
      `/rest/v1/custom_homies?keeper_id=eq.${keeperId}&select=id,stage,profile,portrait_path`,
    );
    const reelRes = await rest(
      creds,
      `/rest/v1/homie_reels?keeper_id=eq.${keeperId}&select=id,homie_id,caption,mime,storage_path,created_at`,
    );
    const homieRows = (await homieRes.json()) as {
      id: string;
      stage: string;
      profile: unknown;
      portrait_path: string;
    }[];
    const reelRows = (await reelRes.json()) as {
      id: string;
      homie_id: string;
      caption: string;
      mime: string;
      storage_path: string;
      created_at: string;
    }[];
    const homies: CloudHomie[] = [];
    for (const row of homieRows) {
      if (!HOMIE_RE.test(row.id) || typeof row.portrait_path !== "string") continue;
      const profile = coerceStoredProfile({
        ...(row.profile as object),
        portrait: publicUrl(creds.url, row.portrait_path),
      });
      if (!profile) continue;
      homies.push({ id: row.id, stage: stageOf(row.stage), profile });
    }
    const reels: CloudReel[] = reelRows
      .filter((row) => REEL_RE.test(row.id) && HOMIE_RE.test(row.homie_id))
      .map((row) => ({
        id: row.id,
        homieId: row.homie_id,
        caption: String(row.caption ?? "").slice(0, 80),
        mime: String(row.mime ?? "image/gif"),
        url: publicUrl(creds.url, row.storage_path),
        at: Date.parse(row.created_at) || Date.now(),
      }));
    return { homies, reels };
  });
}

export function pushHomie(input: { keeperId: string; id: string; stage: Stage; profile: unknown }) {
  if (!KEEPER_RE.test(input.keeperId) || !HOMIE_RE.test(input.id)) {
    return Promise.resolve({ ok: false as const, reason: "down" as const });
  }
  return run(async (creds) => {
    const profile = coerceStoredProfile(input.profile);
    if (!profile || !profile.portrait.startsWith("data:image/")) throw new Error("shelf");
    const file = decodeDataUrl(profile.portrait);
    if (!file || !file.mime.startsWith("image/")) throw new Error("shelf");
    const ext = file.mime === "image/png" ? "png" : file.mime === "image/webp" ? "webp" : "jpg";
    const portraitPath = `${input.keeperId}/${input.id}/portrait.${ext}`;
    await touchKeeper(creds, input.keeperId);
    const existing = await rest(creds, `/rest/v1/custom_homies?keeper_id=eq.${input.keeperId}&select=id`);
    const rows = (await existing.json()) as { id: string }[];
    if (!rows.some((row) => row.id === input.id) && rows.length >= 4) throw new Error("shelf");
    await upload(creds, portraitPath, file.mime, file.bytes);
    const stored = { ...profile, portrait: publicUrl(creds.url, portraitPath) };
    await rest(creds, "/rest/v1/custom_homies?on_conflict=id", {
      method: "POST",
      headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        id: input.id,
        keeper_id: input.keeperId,
        name: profile.name,
        stage: stageOf(input.stage),
        profile: stored,
        portrait_path: portraitPath,
        updated_at: new Date().toISOString(),
      }),
    });
    return {};
  });
}

export function dropHomie(keeperId: string, id: string) {
  if (!KEEPER_RE.test(keeperId) || !HOMIE_RE.test(id)) {
    return Promise.resolve({ ok: false as const, reason: "down" as const });
  }
  return run(async (creds) => {
    const found = await rest(
      creds,
      `/rest/v1/custom_homies?id=eq.${id}&keeper_id=eq.${keeperId}&select=portrait_path,homie_reels(storage_path)`,
    );
    const rows = (await found.json()) as { portrait_path: string; homie_reels: { storage_path: string }[] }[];
    const paths = rows.flatMap((row) => [row.portrait_path, ...(row.homie_reels ?? []).map((reel) => reel.storage_path)]);
    await rest(creds, `/rest/v1/custom_homies?id=eq.${id}&keeper_id=eq.${keeperId}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
    await removePaths(creds, paths);
    return {};
  });
}

export function dropKeeper(keeperId: string) {
  if (!KEEPER_RE.test(keeperId)) return Promise.resolve({ ok: false as const, reason: "down" as const });
  return run(async (creds) => {
    const found = await rest(
      creds,
      `/rest/v1/custom_homies?keeper_id=eq.${keeperId}&select=portrait_path,homie_reels(storage_path)`,
    );
    const rows = (await found.json()) as { portrait_path: string; homie_reels: { storage_path: string }[] }[];
    const paths = rows.flatMap((row) => [row.portrait_path, ...(row.homie_reels ?? []).map((reel) => reel.storage_path)]);
    await rest(creds, `/rest/v1/homie_keepers?id=eq.${keeperId}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
    await removePaths(creds, paths);
    return {};
  });
}

export function pushReel(input: { keeperId: string; homieId: string; id: string; caption: string; media: string }) {
  if (!KEEPER_RE.test(input.keeperId) || !HOMIE_RE.test(input.homieId) || !REEL_RE.test(input.id)) {
    return Promise.resolve({ ok: false as const, reason: "down" as const });
  }
  return run(async (creds) => {
    const owned = await rest(creds, `/rest/v1/custom_homies?id=eq.${input.homieId}&keeper_id=eq.${input.keeperId}&select=id`);
    const owners = (await owned.json()) as { id: string }[];
    if (owners.length === 0) throw new Error("shelf");
    const have = await rest(creds, `/rest/v1/homie_reels?homie_id=eq.${input.homieId}&select=id`);
    const existing = (await have.json()) as { id: string }[];
    if (!existing.some((row) => row.id === input.id) && existing.length >= 3) throw new Error("shelf");
    const file = decodeDataUrl(input.media);
    if (!file) throw new Error("shelf");
    const ext = file.mime === "video/mp4" ? "mp4" : "gif";
    const storagePath = `${input.keeperId}/${input.homieId}/${input.id}.${ext}`;
    await upload(creds, storagePath, file.mime, file.bytes);
    await rest(creds, "/rest/v1/homie_reels?on_conflict=id", {
      method: "POST",
      headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        id: input.id,
        homie_id: input.homieId,
        keeper_id: input.keeperId,
        caption: input.caption.slice(0, 80) || "Home",
        mime: file.mime,
        storage_path: storagePath,
      }),
    });
    return {};
  });
}

export function dropReel(keeperId: string, id: string) {
  if (!KEEPER_RE.test(keeperId) || !REEL_RE.test(id)) {
    return Promise.resolve({ ok: false as const, reason: "down" as const });
  }
  return run(async (creds) => {
    const found = await rest(
      creds,
      `/rest/v1/homie_reels?id=eq.${id}&keeper_id=eq.${keeperId}&select=storage_path`,
    );
    const rows = (await found.json()) as { storage_path: string }[];
    await rest(creds, `/rest/v1/homie_reels?id=eq.${id}&keeper_id=eq.${keeperId}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
    await removePaths(creds, rows.map((row) => row.storage_path));
    return {};
  });
}

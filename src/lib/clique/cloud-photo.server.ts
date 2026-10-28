import {
  cliqueCloudConfig,
  cliquePhotoKey,
  r2ObjectRef,
  supabaseObjectUrl,
  type CliqueCloudStatus,
  type UploadCliquePhotoResult,
} from "./cloud-config";
import { sniffPhotoType, PHOTO_MAX_BYTES, type PhotoType } from "./photo-upload";
import { signR2Put } from "./r2-sign";

/**
 * Clique cloud photo upload — server-only logic (never imported by client
 * code directly; the createServerFn wrappers in cloud-photo.ts load this
 * module dynamically inside their handlers, the same pattern as
 * game/cloud.ts + game/cloud.server.ts).
 *
 * Secrets (Supabase service role key, R2 secret access key) are read from
 * process.env here and never returned; status exposes booleans only.
 *
 * Backend order: Cloudflare R2 first (free egress, built for media), then
 * the app's existing Supabase Storage bucket ("homie-files", the same one
 * cloud.server.ts uses), then an honest "not connected" error — the client
 * keeps the photo on-device in that case. Object keys are scoped to the
 * verified session user ID passed in by the wrapper; a client-sent ID is
 * never used.
 */

export function cliqueCloudStatus(): CliqueCloudStatus {
  const cfg = cliqueCloudConfig(process.env);
  return { supabase: cfg.supabase, supabaseDb: cfg.supabaseDb, r2: cfg.r2 };
}

// JSON RPC transport limit is intentionally lower than the 10 MB local-file limit.
// Larger photos remain stored on-device until a streaming upload endpoint exists.
export const MAX_PHOTO_DATA_URL = 1_900_000;

function decodeDataUrl(dataUrl: string): { bytes: Buffer; declared: string } | null {
  const match = /^data:(image\/[a-z]+);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) return null;
  try {
    const payload = match[2];
    // Buffer.from(base64) silently accepts malformed encodings. Reject them.
    if (payload.length % 4 !== 0 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(payload)) return null;
    const bytes = Buffer.from(payload, "base64");
    if (bytes.toString("base64") !== payload) return null;
    return { bytes, declared: match[1] };
  } catch {
    return null;
  }
}

function extOf(type: PhotoType): "jpg" | "png" | "webp" {
  return type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
}

async function putToR2(userId: string, slot: string, type: PhotoType, bytes: Buffer): Promise<string | null> {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucket = process.env.R2_BUCKET?.trim();
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return null;
  const key = cliquePhotoKey(userId, slot, extOf(type), crypto.randomUUID());
  try {
    const signed = await signR2Put({
      accountId,
      accessKeyId,
      secretAccessKey,
      bucket,
      key,
      contentType: type,
      body: new Uint8Array(bytes),
      now: new Date(),
    });
    const res = await fetch(signed.url, {
      method: "PUT",
      headers: signed.headers,
      body: new Uint8Array(bytes) as BodyInit,
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    return r2ObjectRef(process.env, key);
  } catch {
    return null;
  }
}

async function putToSupabase(userId: string, slot: string, type: PhotoType, bytes: Buffer): Promise<string | null> {
  const base = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!base || !key || !base.startsWith("https://")) return null;
  const path = `clique/${cliquePhotoKey(userId, slot, extOf(type), crypto.randomUUID())}`;
  try {
    const res = await fetch(`${base}/storage/v1/object/homie-files/${path}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": type,
        "x-upsert": "false",
      },
      body: new Uint8Array(bytes) as BodyInit,
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    return supabaseObjectUrl(base, "homie-files", path);
  } catch {
    return null;
  }
}

export async function uploadCliquePhotoForUser(
  userId: string,
  input: { dataUrl: string; slot: string },
): Promise<UploadCliquePhotoResult> {
  if (!userId || userId === "dev-user") {
    return { ok: false, error: "Sign in with a real account before uploading photos to the cloud." };
  }
  if (input.slot !== "profile") return { ok: false, error: "Unknown photo slot" };
  if (!input.dataUrl.startsWith("data:image/") || input.dataUrl.length > MAX_PHOTO_DATA_URL) {
    return { ok: false, error: "This photo exceeds the current cloud-transfer limit (about 1.4 MB). Your local copy is safe; choose a smaller image or compress it before cloud backup." };
  }
  const decoded = decodeDataUrl(input.dataUrl);
  if (!decoded) return { ok: false, error: "That photo couldn't be read." };
  if (decoded.bytes.length === 0 || decoded.bytes.length > PHOTO_MAX_BYTES) {
    return { ok: false, error: "Photo must be between 1 byte and 10 MB." };
  }
  // Content must be a real image and must agree with its declared type.
  const sniffed = sniffPhotoType(new Uint8Array(decoded.bytes));
  if (!sniffed || sniffed !== decoded.declared) {
    return { ok: false, error: "That file's contents don't match its type." };
  }

  const cfg = cliqueCloudConfig(process.env);
  if (cfg.r2) {
    const url = await putToR2(userId, input.slot, sniffed, decoded.bytes);
    if (url) return { ok: true, backend: "r2", url };
  }
  if (cfg.supabase) {
    const url = await putToSupabase(userId, input.slot, sniffed, decoded.bytes);
    if (url) return { ok: true, backend: "supabase", url };
  }
  return {
    ok: false,
    error: "Cloud photo storage isn't connected yet — your photo stays on this device.",
  };
}

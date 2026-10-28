/**
 * Clique cloud connection config — pure detection from server env.
 *
 * Two free backends can be connected, independently:
 * - Supabase: the app's existing cloud backend (cloud.server.ts). Connected
 *   when SUPABASE_URL (https) + SUPABASE_SERVICE_ROLE_KEY are set. The DB
 *   URL (SUPABASE_DB_URL) additionally enables auto-schema creation.
 * - Cloudflare R2: S3-compatible object storage for photos/media, free
 *   tier with $0 egress. Connected when R2_ACCOUNT_ID, R2_ACCESS_KEY_ID,
 *   R2_SECRET_ACCESS_KEY and R2_BUCKET are all set. R2_PUBLIC_BASE_URL is
 *   optional; without it objects are referenced as r2://<bucket>/<key>.
 *
 * Only booleans and public URLs ever leave this module — secret values are
 * read by the server functions that use them and never returned to clients.
 */

export type CliqueCloudEnv = Record<string, string | undefined>;

export type CliqueCloudConfig = {
  supabase: boolean;
  supabaseDb: boolean;
  r2: boolean;
};

/** Wire type for the status RPC — booleans only, safe to send to clients. */
export type CliqueCloudStatus = CliqueCloudConfig;

export type UploadCliquePhotoResult =
  | { ok: true; backend: "r2" | "supabase"; url: string }
  | { ok: false; error: string };

function present(env: CliqueCloudEnv, key: string): string | null {
  const v = env[key]?.trim();
  return v ? v : null;
}

export function cliqueCloudConfig(env: CliqueCloudEnv): CliqueCloudConfig {
  const supabaseUrl = present(env, "SUPABASE_URL");
  const supabase =
    !!supabaseUrl && supabaseUrl.startsWith("https://") && !!present(env, "SUPABASE_SERVICE_ROLE_KEY");
  return {
    supabase,
    supabaseDb: supabase && !!present(env, "SUPABASE_DB_URL"),
    r2:
      !!present(env, "R2_ACCOUNT_ID") &&
      !!present(env, "R2_ACCESS_KEY_ID") &&
      !!present(env, "R2_SECRET_ACCESS_KEY") &&
      !!present(env, "R2_BUCKET"),
  };
}

/** Object key for a user's Clique photo. userId must come from the server's verified session, never from the client. */
export function cliquePhotoKey(userId: string, slot: string, ext: string, id: string): string {
  const clean = (s: string) => s.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 64);
  const user = clean(userId) || "anonymous";
  const safeSlot = clean(slot) || "profile";
  const safeId = clean(id) || "photo";
  const safeExt = ["jpg", "png", "webp"].includes(ext) ? ext : "jpg";
  return `users/${user}/photos/${safeSlot}-${safeId}.${safeExt}`;
}

export function r2Endpoint(accountId: string): string {
  return `https://${accountId}.r2.cloudflarestorage.com`;
}

/** Public (or reference) URL for a stored R2 object. */
export function r2ObjectRef(env: CliqueCloudEnv, key: string): string {
  const base = present(env, "R2_PUBLIC_BASE_URL")?.replace(/\/$/, "");
  if (base) return `${base}/${key}`;
  const bucket = present(env, "R2_BUCKET") ?? "bucket";
  return `r2://${bucket}/${key}`;
}

/** Supabase Storage public URL, matching the pattern cloud.server.ts uses for the homie-files bucket. */
export function supabaseObjectUrl(supabaseUrl: string, bucket: string, path: string): string {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${path}`;
}

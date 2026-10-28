/**
 * Minimal AWS Signature Version 4 signer for Cloudflare R2 (S3-compatible).
 * Uses WebCrypto only — no SDK dependency. R2 specifics: region "auto",
 * service "s3", signed headers host + x-amz-content-sha256 + x-amz-date.
 */

const enc = new TextEncoder();

export function toHex(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return [...view].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const bytes = typeof data === "string" ? enc.encode(data) : data;
  return toHex(await crypto.subtle.digest("SHA-256", bytes as BufferSource));
}

async function hmac(key: Uint8Array, data: string): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(data)));
}

/** SigV4 signing key derivation: HMAC chain AWS4+secret → date → region → service → aws4_request. */
export async function deriveSigningKey(
  secret: string,
  dateStamp: string,
  region: string,
  service: string,
): Promise<Uint8Array> {
  const kDate = await hmac(enc.encode(`AWS4${secret}`), dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

export type SignedPut = { url: string; headers: Record<string, string> };

export async function signR2Put(opts: {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  key: string;
  contentType: string;
  body: Uint8Array;
  now: Date;
}): Promise<SignedPut> {
  const host = `${opts.accountId}.r2.cloudflarestorage.com`;
  const region = "auto";
  const service = "s3";
  const iso = opts.now.toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const dateStamp = iso.slice(0, 8);
  const payloadHash = await sha256Hex(opts.body);
  const encodedKey = opts.key.split("/").map(encodeURIComponent).join("/");
  const path = `/${opts.bucket}/${encodedKey}`;

  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${iso}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = ["PUT", path, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const scope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", iso, scope, await sha256Hex(canonicalRequest)].join("\n");
  const signingKey = await deriveSigningKey(opts.secretAccessKey, dateStamp, region, service);
  const signature = toHex(await hmac(signingKey, stringToSign));

  return {
    url: `https://${host}${path}`,
    headers: {
      "Content-Type": opts.contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": iso,
      Authorization: `AWS4-HMAC-SHA256 Credential=${opts.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  };
}

/**
 * Clique photo-upload validation — deliberately independent of any AI
 * generation workflow (Surprise Me / invent / mint). Selecting, validating,
 * or uploading a photo must never trigger character generation, and a failed
 * upload must never fall back to generated content.
 *
 * Validation is three-layered: declared MIME type allowlist, size cap, and
 * magic-byte signature that must agree with the declared type (a renamed
 * file or a polyglot cannot pass on its extension/MIME alone).
 */

export const PHOTO_MAX_BYTES = 10 * 1024 * 1024;

export const PHOTO_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export type PhotoType = (typeof PHOTO_ALLOWED_TYPES)[number];

export type PhotoValidation =
  | { ok: true; type: PhotoType }
  | { ok: false; error: string };

const SIGNATURES: Record<PhotoType, (bytes: Uint8Array) => boolean> = {
  "image/jpeg": (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) =>
    b.length >= 8 &&
    b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
    b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a,
  "image/webp": (b) =>
    b.length >= 12 &&
    ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP",
};

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  let out = "";
  for (let i = offset; i < offset + length && i < bytes.length; i++) {
    out += String.fromCharCode(bytes[i]);
  }
  return out;
}

/** Pure signature check, exported for tests and reuse outside the DOM. */
export function sniffPhotoType(bytes: Uint8Array): PhotoType | null {
  for (const type of PHOTO_ALLOWED_TYPES) {
    if (SIGNATURES[type](bytes)) return type;
  }
  return null;
}

export type PhotoFileLike = {
  type: string;
  size: number;
  slice: (start: number, end: number) => { arrayBuffer: () => Promise<ArrayBuffer> };
};

/**
 * Validate a user-selected photo file. Reads only the first 12 bytes.
 * Returns a typed failure instead of throwing, so callers can show the
 * error and leave all other state (including generation state) untouched.
 */
export async function validatePhotoFile(file: PhotoFileLike): Promise<PhotoValidation> {
  if (!PHOTO_ALLOWED_TYPES.includes(file.type as PhotoType)) {
    return { ok: false, error: "Choose a JPG, PNG or WebP photo." };
  }
  if (file.size <= 0) {
    return { ok: false, error: "That file is empty." };
  }
  if (file.size > PHOTO_MAX_BYTES) {
    return { ok: false, error: "Photo must be smaller than 10 MB." };
  }
  let header: Uint8Array;
  try {
    header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  } catch {
    return { ok: false, error: "That photo didn't open. Try a JPG, PNG or WebP." };
  }
  const sniffed = sniffPhotoType(header);
  if (!sniffed) {
    return { ok: false, error: "That file isn't a JPG, PNG or WebP image." };
  }
  if (sniffed !== file.type) {
    return { ok: false, error: "That file's contents don't match its type. Try a JPG, PNG or WebP." };
  }
  return { ok: true, type: sniffed };
}

export function photoExtension(type: PhotoType): "jpg" | "png" | "webp" {
  return type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
}

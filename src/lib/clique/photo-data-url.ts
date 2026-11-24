/** Strict, bounded decoder for Clique's authenticated cloud-photo RPC.
 * The browser validates original files up to PHOTO_MAX_BYTES, then sends a
 * downscaled JPEG. Keep the RPC payload ceiling aligned with that limit;
 * counting encoded bytes before Buffer.from avoids oversized allocation.
 * This does NOT replace a streaming upload protocol or private read URLs.
 */
import { PHOTO_MAX_BYTES, sniffPhotoType, type PhotoType } from "./photo-upload.ts";

const MAX_BASE64_LENGTH = Math.ceil(PHOTO_MAX_BYTES / 3) * 4;
export const MAX_PHOTO_DATA_URL = "data:image/jpeg;base64,".length + MAX_BASE64_LENGTH;

type PhotoDecodeResult =
  | { ok: true; bytes: Buffer; type: PhotoType }
  | { ok: false; error: string };

export function decodePhotoDataUrl(dataUrl: string): PhotoDecodeResult {
  if (typeof dataUrl !== "string" || dataUrl.length > MAX_PHOTO_DATA_URL) {
    return { ok: false, error: "Photo is too large for cloud upload." };
  }
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match) return { ok: false, error: "That photo couldn't be read." };
  const declared = match[1] as PhotoType;
  const encoded = match[2];
  if (encoded.length % 4 !== 0 || encoded.length > MAX_BASE64_LENGTH) {
    return { ok: false, error: "That photo couldn't be read." };
  }
  const padding = encoded.endsWith("==") ? 2 : encoded.endsWith("=") ? 1 : 0;
  const decodedSize = (encoded.length / 4) * 3 - padding;
  if (decodedSize === 0 || decodedSize > PHOTO_MAX_BYTES) {
    return { ok: false, error: "Photo must be between 1 byte and 10 MB." };
  }
  const bytes = Buffer.from(encoded, "base64");
  // Buffer.from is permissive: re-encoding rejects noncanonical trailing bits.
  if (bytes.length !== decodedSize || bytes.toString("base64") !== encoded) {
    return { ok: false, error: "That photo couldn't be read." };
  }
  const sniffed = sniffPhotoType(new Uint8Array(bytes));
  if (!sniffed || sniffed !== declared) {
    return { ok: false, error: "That file's contents don't match its type." };
  }
  return { ok: true, bytes, type: sniffed };
}

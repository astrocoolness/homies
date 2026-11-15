import assert from "node:assert/strict";
import test from "node:test";
import { decodePhotoDataUrl, MAX_PHOTO_DATA_URL } from "../src/lib/clique/photo-data-url.ts";
import { PHOTO_MAX_BYTES } from "../src/lib/clique/photo-upload.ts";

const asUrl = (bytes, type = "image/jpeg") => "data:" + type + ";base64," + bytes.toString("base64");
const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2]);
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

test("accepts a genuine JPEG and PNG payload", () => {
  const a = decodePhotoDataUrl(asUrl(jpeg));
  assert.equal(a.ok, true);
  if (a.ok) assert.deepEqual(a.bytes, jpeg);
  const b = decodePhotoDataUrl(asUrl(png, "image/png"));
  assert.equal(b.ok, true);
});

test("accepts full 10 MiB size supported by browser validator", () => {
  const full = Buffer.alloc(PHOTO_MAX_BYTES);
  jpeg.copy(full);
  const url = asUrl(full);
  assert.ok(url.length <= MAX_PHOTO_DATA_URL);
  const result = decodePhotoDataUrl(url);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.bytes.length, PHOTO_MAX_BYTES);
});

test("rejects 10 MiB plus one byte before allocating decoded bytes", () => {
  const oversized = Buffer.alloc(PHOTO_MAX_BYTES + 1);
  jpeg.copy(oversized);
  assert.equal(decodePhotoDataUrl(asUrl(oversized)).ok, false);
});

test("rejects declared MIME / magic byte mismatch", () => {
  const result = decodePhotoDataUrl(asUrl(jpeg, "image/png"));
  assert.equal(result.ok, false);
});

test("rejects empty, invalid, or noncanonical base64 and disallowed types", () => {
  for (const sample of ["", "data:image/jpeg;base64,", "data:image/jpeg;base64,//8", "data:image/gif;base64,AAAA", "data:image/jpeg;base64,AAAA-", "data:image/jpeg;base64,/9j/===="]) {
    assert.equal(decodePhotoDataUrl(sample).ok, false, sample.slice(0, 36));
  }
});

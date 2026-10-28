import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sniffPhotoType, validatePhotoFile, PHOTO_MAX_BYTES } from "./photo-upload.ts";

function fakeFile(type: string, header: number[], size = 1024) {
  const bytes = new Uint8Array(12);
  bytes.set(header.slice(0, 12));
  return {
    type,
    size,
    slice: (_start: number, _end: number) => ({
      arrayBuffer: async () => bytes.buffer as ArrayBuffer,
    }),
  };
}

const JPEG = [0xff, 0xd8, 0xff, 0xe0, 0, 0x10];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const WEBP = [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]; // RIFF....WEBP
const GIF = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]; // GIF89a

describe("sniffPhotoType", () => {
  it("recognises jpeg, png and webp signatures", () => {
    assert.equal(sniffPhotoType(new Uint8Array(JPEG)), "image/jpeg");
    assert.equal(sniffPhotoType(new Uint8Array(PNG)), "image/png");
    assert.equal(sniffPhotoType(new Uint8Array(WEBP)), "image/webp");
  });
  it("rejects gif and empty input", () => {
    assert.equal(sniffPhotoType(new Uint8Array(GIF)), null);
    assert.equal(sniffPhotoType(new Uint8Array(0)), null);
  });
});

describe("validatePhotoFile", () => {
  it("accepts a real jpeg/png/webp whose signature matches its type", async () => {
    assert.deepEqual(await validatePhotoFile(fakeFile("image/jpeg", JPEG)), { ok: true, type: "image/jpeg" });
    assert.deepEqual(await validatePhotoFile(fakeFile("image/png", PNG)), { ok: true, type: "image/png" });
    assert.deepEqual(await validatePhotoFile(fakeFile("image/webp", WEBP)), { ok: true, type: "image/webp" });
  });
  it("rejects a disallowed declared type even with image bytes", async () => {
    const r = await validatePhotoFile(fakeFile("image/gif", GIF));
    assert.equal(r.ok, false);
  });
  it("rejects content that does not match the declared type", async () => {
    const r = await validatePhotoFile(fakeFile("image/png", JPEG));
    assert.equal(r.ok, false);
    if (!r.ok) assert.match(r.error, /don't match/);
  });
  it("rejects non-image bytes masquerading as a photo", async () => {
    const r = await validatePhotoFile(fakeFile("image/jpeg", [1, 2, 3, 4, 5, 6]));
    assert.equal(r.ok, false);
  });
  it("rejects oversize and empty files", async () => {
    assert.equal((await validatePhotoFile(fakeFile("image/png", PNG, PHOTO_MAX_BYTES + 1))).ok, false);
    assert.equal((await validatePhotoFile(fakeFile("image/png", PNG, 0))).ok, false);
  });
});

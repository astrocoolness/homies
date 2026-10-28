import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const uploader = readFileSync(new URL("../src/components/clique/ProfilePhotoUploader.tsx", import.meta.url), "utf8");
const validation = readFileSync(new URL("../src/lib/clique/photo-upload.ts", import.meta.url), "utf8");
const maker = readFileSync(new URL("../src/components/homies/SettingsSheet.tsx", import.meta.url), "utf8");

test("profile photo uploader contains no generation workflow", () => {
  // The release-blocking defect was upload behaving like Surprise Me.
  // The uploader must never import or call a generation entry point
  // (mentions in comments explaining that separation are fine).
  for (const source of [uploader, validation]) {
    assert.doesNotMatch(source, /inventHomie\(|mintHomie\(/);
    assert.doesNotMatch(source, /from\s+["'][^"']*(invent|mint)["']/);
  }
  assert.match(uploader, /validatePhotoFile/);
  assert.match(uploader, /uploadFile/);
});

test("photo validation checks actual file content, not just declared type", () => {
  assert.match(validation, /sniffPhotoType/);
  assert.match(validation, /0x89/); // PNG signature
  assert.match(validation, /RIFF/); // WebP container
  assert.match(validation, /don't match its type/);
});

test("Maker keeps photo, Surprise Me, and Make Homie state independent", () => {
  assert.match(maker, /const \[photoBusy, setPhotoBusy\]/);
  assert.match(maker, /const \[surpriseBusy, setSurpriseBusy\]/);
  assert.match(maker, /const \[makeBusy, setMakeBusy\]/);
  assert.match(maker, /surpriseBusy \? "Inventing\.\.\." : "Surprise me"/);
  assert.match(maker, /makeBusy \? "Drawing them\.\.\."/);
  // The file handler may only fit + store the photo; generation is elsewhere.
  const onFile = maker.slice(maker.indexOf("async function onFile"), maker.indexOf("async function surprise"));
  assert.doesNotMatch(onFile, /inventHomie|mintHomie/);
  assert.match(onFile, /setPhoto\(/);
});

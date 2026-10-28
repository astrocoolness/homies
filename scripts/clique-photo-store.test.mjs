import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const store = readFileSync(new URL("../src/lib/clique/photo-store.ts", import.meta.url), "utf8");
const local = readFileSync(new URL("../src/components/clique/LocalProfilePhoto.tsx", import.meta.url), "utf8");
const hub = readFileSync(new URL("../src/routes/clique/index.tsx", import.meta.url), "utf8");

test("device photo storage is IndexedDB-only: no network, no server upload", () => {
  assert.match(store, /DB_NAME = "homies-clique-photos"/);
  assert.match(store, /indexedDB\.open\(DB_NAME, 1\)/);
  assert.doesNotMatch(store, /\bfetch\(|XMLHttpRequest|api\.x\.ai|pollinations/);
  assert.match(store, /device-photo:\/\//);
});

test("profile photo UI wires the uploader to the device adapter and reads it back", () => {
  assert.match(local, /uploadPhotoToDevice\(PROFILE_PHOTO_SLOT, file\)/);
  assert.match(local, /loadDevicePhoto\(PROFILE_PHOTO_SLOT\)/);
  assert.match(local, /dropDevicePhoto\(PROFILE_PHOTO_SLOT\)/);
  // Persistence honesty: the UI must say the device copy never leaves it.
  assert.match(local, /this copy never leaves it/);
});

test("the /clique hub mounts the local profile photo section", () => {
  assert.match(hub, /LocalProfilePhoto/);
  assert.match(hub, /Your Flyspace photo/);
});

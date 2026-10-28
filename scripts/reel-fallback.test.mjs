import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { beginReel, advanceReel, REEL_LIFETIME_MS } from "../src/game/reel-engine.ts";

const home = readFileSync(
  new URL("../src/components/homies/CustomHome.tsx", import.meta.url),
  "utf8",
);

test("an exhausted fallback keeps the original portrait and identifies the result", async () => {
  const portrait =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=";
  const result = beginReel({ portrait, name: "Boop", setting: "A cozy room." }, "", 1000);
  const done = await advanceReel(result.requestId, "", {
    now: () => 1001 + REEL_LIFETIME_MS,
    fetch: async () => assert.fail("deadline must not call a provider"),
  });
  assert.equal(done.media, portrait);
  assert.equal(done.mime, "image/png");
  assert.match(done.note, /animated still/);
  assert.match(home, /Animated still/);
});

test("still animation is a slow Ken Burns drift and respects reduced motion", () => {
  assert.match(home, /@keyframes homie-moment-cinema/);
  assert.match(home, /animation: homie-moment-cinema 16s/);
  assert.match(home, /prefers-reduced-motion: reduce/);
  assert.match(home, /\.homie-moment-still \{\s*animation: none;/);
  // Scale never drops below 1, so the drifting frame never shows edges.
  assert.doesNotMatch(home, /scale\(0\./);
  assert.doesNotMatch(home, /scale\(1\)/);
});

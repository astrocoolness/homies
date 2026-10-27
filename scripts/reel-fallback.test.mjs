import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const reel = readFileSync(new URL("../src/game/reel.ts", import.meta.url), "utf8");
const home = readFileSync(new URL("../src/components/homies/CustomHome.tsx", import.meta.url), "utf8");

test("fallback chain ends with a guaranteed cinematic still, not an error", () => {
  // Order matters: video → poses → free frames → the Homie's own portrait.
  // Anchor inside startReel so helper definitions above it don't skew indexes.
  const start = reel.slice(reel.indexOf("export const startReel"));
  const video = start.indexOf("grok-imagine-video");
  const poses = start.indexOf("xaiPoseSequence(apiKey");
  const free = start.indexOf("freeAnimated(name");
  const still = start.indexOf("requestId: data.portrait");
  assert.ok(video > -1 && poses > video, "xAI poses run after the video attempt");
  assert.ok(free > poses, "free frames run after xAI poses");
  assert.ok(still > free, "portrait still is the final fallback");
  // The old hard failure must not come back as the end of startReel.
  assert.doesNotMatch(start, /The loop didn't come through/);
});

test("cinematic still is the character's own image and honestly labelled", () => {
  assert.match(reel, /requestId: data\.portrait/);
  assert.match(home, /Animated still/);
  assert.match(home, /isStill && featured/);
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

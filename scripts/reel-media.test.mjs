import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { framesToGif, videoToGif } from "../src/game/reel-media.ts";

const available = spawnSync("ffmpeg", ["-version"]).status === 0;
const portrait = new URL("../public/homies/tony-adult.png", import.meta.url);

test("ffmpeg encodes mixed PNG and JPEG reference frames", { skip: !available }, async () => {
  const frames = await Promise.all(
    [
      [portrait, "png"],
      [new URL("../public/homies/room-tony.jpg", import.meta.url), "jpeg"],
    ].map(
      async ([path, mime]) =>
        `data:image/${mime};base64,${(await readFile(path)).toString("base64")}`,
    ),
  );
  const gif = await framesToGif(frames);
  assert.ok(gif?.startsWith("data:image/gif;base64,"));
  assert.match(Buffer.from(gif.split(",")[1], "base64").toString("ascii", 0, 6), /^GIF8[79]a$/);
});

test("ffmpeg converts a real MP4 to a bounded GIF", { skip: !available }, async () => {
  const dir = await mkdtemp(join(tmpdir(), "homie-codec-test-"));
  try {
    const path = join(dir, "clip.mp4");
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-loglevel",
        "error",
        "-threads",
        "1",
        "-filter_threads",
        "1",
        "-loop",
        "1",
        "-i",
        portrait.pathname,
        "-t",
        "0.5",
        "-vf",
        "scale=320:320,format=yuv420p",
        "-c:v",
        "libx264",
        "-threads",
        "1",
        path,
      ],
      { timeout: 10_000 },
    );
    const gif = await videoToGif(await readFile(path));
    assert.ok(gif?.startsWith("data:image/gif;base64,"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

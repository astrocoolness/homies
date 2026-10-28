import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import {
  advanceReel,
  beginReel,
  imageData,
  POSES,
  REEL_LIFETIME_MS,
} from "../src/game/reel-engine.ts";
import { filmMoment, parseReelFrames } from "../src/game/reel-client.ts";

const key = "test-only-xai-key-never-live";
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
  "base64",
);
const frame = (n) => imageData(Buffer.concat([png, Buffer.from([n])]));
const input = {
  portrait: frame(0),
  name: "Boop",
  setting: "A quiet green room with a red chair.",
  allowCommunity: true,
};
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });
afterEach(() => mock.restoreAll());

async function run(fetch, options = {}) {
  let result = beginReel(input, options.key ?? key, options.now?.() ?? Date.now());
  for (let i = 0; i < 100 && result.ok && result.status === "pending"; i++) {
    result = await advanceReel(result.requestId, options.key ?? key, { fetch, ...options });
  }
  assert.equal(result.status, "done", JSON.stringify(result).slice(0, 300));
  return result;
}

test("accepted videos fail over once, then six poses retain the fixed room reference", async () => {
  const calls = [];
  let edits = 0,
    videos = 0;
  const result = await run(
    async (url, init) => {
      const body = init?.body ? JSON.parse(init.body) : null;
      calls.push({ url, body });
      if (url.endsWith("images/edits")) {
        edits++;
        assert.equal(body.image.url, edits === 1 ? input.portrait : frame(1));
        assert.match(body.prompt, /quiet green room/);
        return json({ data: [{ b64_json: frame(edits).split(",")[1] }] });
      }
      if (url.endsWith("videos/generations")) {
        videos++;
        assert.equal(body.image.url, frame(1));
        return json({ request_id: `video-request-${videos}` });
      }
      if (url.includes("/videos/")) return json({ status: videos === 1 ? "failed" : "expired" });
      throw new Error(`Unexpected URL ${url}`);
    },
    {
      framesToGif: async () => {
        throw new Error("ENOENT ffmpeg");
      },
    },
  );
  assert.equal(videos, 2);
  assert.equal(edits, 7);
  assert.equal(result.mime, "application/x-homie-frames");
  const frames = parseReelFrames(result.media);
  assert.equal(frames.length, POSES.length);
  assert.deepEqual(
    parseReelFrames(Buffer.from(result.media.split(",")[1], "base64").toString()),
    frames,
  );
  assert.match(result.note, /Video was unavailable/);
  assert.ok(!calls.some((call) => call.url.includes("images/generations")));
});

test("Horde polls progress, retrieves /status, and handles URL and base64 results", async () => {
  const calls = [];
  let submitted = 0,
    checks = 0;
  const result = await run(
    async (url, init) => {
      calls.push(url);
      if (url.endsWith("/async")) {
        const body = JSON.parse(init.body);
        assert.equal(init.headers.apikey, "0000000000");
        assert.equal(body.source_image, input.portrait.split(",")[1]);
        assert.equal(body.source_processing, "img2img");
        assert.equal(body.params.denoising_strength, 0.25);
        assert.equal(body.r2, true);
        assert.equal(body.nsfw, false);
        assert.equal(body.censor_nsfw, true);
        return json({ id: `horde-job-${++submitted}` });
      }
      if (url.includes("/check/")) return json({ done: ++checks > 1 }); // No generations here.
      if (url.includes("/status/")) {
        const n = Number(url.split("-").at(-1));
        return json({
          generations: [
            {
              img: n === 1 ? "https://images.example/frame.png" : frame(n).split(",")[1],
              censored: false,
            },
          ],
        });
      }
      if (url === "https://images.example/frame.png")
        return new Response(Buffer.concat([png, Buffer.from([1])]));
      throw new Error(`Unexpected URL ${url}`);
    },
    { key: "", now: () => 1000 },
  );
  assert.equal(submitted, 6);
  assert.equal(calls.filter((url) => url.includes("/status/")).length, 6);
  assert.equal(parseReelFrames(result.media).length, 6);
  assert.ok(!calls.some((url) => url.includes("pollinations")));
});

test("Horde deadline cancels outstanding jobs and keeps the exact portrait", async () => {
  let now = 1000;
  let deleted = 0;
  const request = async (url, init) => {
    if (init.method === "DELETE") {
      deleted++;
      return json({});
    }
    assert.match(url, /\/async$/);
    return json({ id: "horde-job-1234" });
  };
  let result = beginReel(input, "", now);
  result = await advanceReel(result.requestId, "", { fetch: request, now: () => now });
  now += REEL_LIFETIME_MS + 1;
  result = await advanceReel(result.requestId, "", { fetch: request, now: () => now });
  assert.equal(deleted, 1);
  assert.equal(result.media, input.portrait);
  assert.equal(result.mime, "image/png");
  assert.match(result.note, /original portrait/);
});

test("signed cursors reject changed portraits, deadlines and provider IDs without network calls", async () => {
  const started = beginReel(input, key, 1000);
  const bad = started.requestId.replace("quiet green room", "different scene");
  let calls = 0;
  const result = await advanceReel(bad, key, {
    fetch: async () => {
      calls++;
      throw new Error("network");
    },
  });
  assert.equal(result.ok, false);
  assert.equal(calls, 0);
});

test("free cursors cannot invoke paid stages", async () => {
  const free = beginReel(input, "", 1000);
  const forged = free.requestId.replace('"horde-submit"', '"scene"');
  const result = await advanceReel(forged, "", {
    fetch: async () => assert.fail("network must not run"),
  });
  assert.equal(result.ok, false);
});

test("account failure skips all other paid models", async () => {
  let xaiCalls = 0;
  const result = await run(async (url) => {
    if (url.includes("api.x.ai")) {
      xaiCalls++;
      return json({ error: { code: "invalid_api_key" } }, 401);
    }
    return json({ error: "unavailable" }, 503);
  });
  assert.equal(xaiCalls, 1);
  assert.equal(result.media, input.portrait);
});

test("policy refusal does not fall through to another model or Horde", async () => {
  let calls = 0;
  const result = await run(async () => {
    calls++;
    return json({ error: { code: "content_policy_violation" } }, 400);
  });
  assert.equal(calls, 1);
  assert.equal(result.media, input.portrait);
  assert.match(result.note, /different description/);
});

test("model compatibility tries all configured image IDs without text-only generation", async () => {
  const models = [];
  const result = await run(async (url, init) => {
    if (url.includes("api.x.ai")) {
      models.push(JSON.parse(init.body).model);
      return json({ error: { code: "model_not_found" } }, 404);
    }
    return json({}, 503);
  });
  assert.deepEqual(models, [
    "grok-imagine-image-2.0",
    "grok-imagine-image",
    "grok-imagine-image-quality",
  ]);
  assert.equal(result.media, input.portrait);
});

test("ambiguous paid timeout is not resubmitted", async () => {
  mock.method(console, "warn", () => {});
  let paid = 0;
  const result = await run(async (url) => {
    if (url.includes("api.x.ai")) {
      paid++;
      throw new DOMException("timeout", "TimeoutError");
    }
    return json({}, 503);
  });
  assert.equal(paid, 1);
  assert.equal(result.media, input.portrait);
});

test("an HTTP 200 HTML error page is never accepted as a frame", async () => {
  let video = false;
  const result = await run(async (url) => {
    if (url.endsWith("images/edits"))
      return json({ data: [{ url: "https://images.example/error" }] });
    if (url === "https://images.example/error")
      return new Response("<html>error</html>".repeat(200));
    if (url.includes("videos")) video = true;
    return json({}, 503);
  });
  assert.equal(video, false);
  assert.equal(result.media, input.portrait);
});

test("successful video stays playable without ffmpeg", async () => {
  const mp4 = Buffer.concat([
    Buffer.from([0, 0, 0, 24]),
    Buffer.from("ftypisom"),
    Buffer.alloc(32),
  ]);
  const result = await run(
    async (url) => {
      if (url.endsWith("images/edits"))
        return json({ data: [{ b64_json: png.toString("base64") }] });
      if (url.endsWith("videos/generations")) return json({ request_id: "video-request-1234" });
      if (url.includes("/videos/"))
        return json({ status: "done", video: { url: "https://video.example/clip.mp4" } });
      return new Response(mp4);
    },
    { videoToGif: async () => null },
  );
  assert.equal(result.mime, "video/mp4");
  assert.deepEqual(Buffer.from(result.media.split(",")[1], "base64"), mp4);
});

test("failed video download continues to reference poses", async () => {
  mock.method(console, "warn", () => {});
  let edits = 0;
  const result = await run(async (url) => {
    if (url.endsWith("images/edits"))
      return json({ data: [{ b64_json: frame(++edits).split(",")[1] }] });
    if (url.endsWith("videos/generations")) return json({ request_id: "video-request-1234" });
    if (url.includes("/videos/"))
      return json({ status: "done", video: { url: "https://video.example/missing" } });
    return new Response("expired", { status: 404 });
  });
  assert.equal(edits, 7);
  assert.equal(result.mime, "application/x-homie-frames");
});

test("client follows new continuation IDs and retains the portrait after a transport error", async () => {
  const ids = [];
  const result = await filmMoment(input, {
    active: () => true,
    progress: () => {},
    sleep: async () => {},
    start: async () => ({
      ok: true,
      status: "pending",
      requestId: "first",
      phase: "room",
      retryAfterMs: 0,
    }),
    pull: async (id) => {
      ids.push(id);
      if (ids.length === 1)
        return {
          ok: true,
          status: "pending",
          requestId: "second",
          phase: "poses",
          retryAfterMs: 0,
        };
      throw new Error("network disconnected");
    },
  });
  assert.deepEqual(ids, ["first", "second"]);
  assert.equal(result.media, input.portrait);
  assert.match(result.note, /could not finish/);
});

test("leaving the Homie stops further polls and prevents saving to the wrong character", async () => {
  let active = true;
  const result = await filmMoment(input, {
    active: () => active,
    progress: () => {},
    sleep: async () => {
      active = false;
    },
    start: async () => ({
      ok: true,
      status: "pending",
      requestId: "first",
      phase: "room",
      retryAfterMs: 0,
    }),
    pull: async () => assert.fail("no requests after unmount"),
  });
  assert.equal(result, null);
});

test("flipbook decoder accepts persisted JSON and rejects malformed or remote frames", () => {
  assert.deepEqual(parseReelFrames(JSON.stringify([frame(1), "https://example.com/pixel", 42])), [
    frame(1),
  ]);
  assert.deepEqual(parseReelFrames("not JSON"), []);
});

test("community generation is off by default and never sends a portrait without opting in", async () => {
  const { allowCommunity, ...privateInput } = input;
  const start = beginReel(privateInput, "", 1000);
  const result = await advanceReel(start.requestId, "", {
    now: () => 1001,
    fetch: async () => assert.fail("no community request without opt-in"),
  });
  assert.equal(result.media, input.portrait);
});

test("censored or source-ignored Horde outputs are not saved as Homie poses", async () => {
  const result = await run(
    async (url, init) => {
      if (url.endsWith("/async")) return json({ id: "horde-job-12345" });
      if (url.includes("/check/")) return json({ done: true });
      return json({
        generations: [
          { img: frame(1).split(",")[1], censored: true },
          { img: frame(2).split(",")[1], state: "censored" },
          {
            img: frame(3).split(",")[1],
            gen_metadata: [{ type: "source_image", value: "parse_failed" }],
          },
        ],
      });
    },
    { key: "", now: () => 1000 },
  );
  assert.equal(result.media, input.portrait);
});

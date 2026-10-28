// Server-only, stateless continuation: one bounded provider step per request.
// The cursor carries its reference images across Vercel instances; no background
// promises or process-local job store are needed.
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const IMAGE_MODELS = [
  "grok-imagine-image-2.0",
  "grok-imagine-image",
  "grok-imagine-image-quality",
];
export const VIDEO_MODELS = [
  "grok-imagine-video-1.5",
  "grok-imagine-video",
  "grok-imagine-video-1.5-lite",
];
export const POSES = [
  "looking slightly left",
  "looking slightly right",
  "gentle lean forward",
  "small smile",
  "slight head tilt",
  "soft wave",
];
export const REEL_LIFETIME_MS = 360_000;
const MAX_FRAMES_CHARS = 1_400_000;
const MAX_CURSOR = 3_500_000;
const HORDE = "https://aihorde.net/api/v2/generate";
const jobId = z.string().regex(/^[a-zA-Z0-9-]{8,80}$/);
const image = z
  .string()
  .max(900_000)
  .regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/);
export const reelInputSchema = z.object({
  portrait: image,
  name: z.string().trim().max(24),
  setting: z.string().trim().min(2).max(240),
  allowCommunity: z.boolean().default(false),
});
export type ReelInput = z.infer<typeof reelInputSchema>;
const jobSchema = z.object({
  v: z.literal(1),
  input: reelInputSchema,
  stage: z.enum([
    "scene",
    "video-start",
    "video-poll",
    "poses",
    "horde-submit",
    "horde-poll",
    "finish",
  ]),
  expires: z.number().int(),
  imageModel: z.number().int().min(0).max(3),
  videoModel: z.number().int().min(0).max(3),
  videoAttempts: z.number().int().min(0).max(2),
  pose: z.number().int().min(0).max(6),
  scene: image.optional(),
  frames: z.array(image).max(6),
  activeId: jobId.optional(),
  activeUntil: z.number().int().optional(),
  hordeUntil: z.number().int().optional(),
  hordeIds: z.array(jobId).max(6),
  hordeSubmitted: z.number().int().min(0).max(6),
  note: z.string().max(240).optional(),
});
type Job = z.infer<typeof jobSchema>;
export type ReelResult =
  | { ok: true; status: "pending"; requestId: string; phase: string; retryAfterMs: number }
  | { ok: true; status: "done"; media: string; mime: string; note?: string }
  | { ok: false; error: string };
type Dependencies = {
  fetch?: typeof fetch;
  now?: () => number;
  framesToGif?: (frames: string[]) => Promise<string | null>;
  videoToGif?: (bytes: Buffer) => Promise<string | null>;
};
type Json = Record<string, unknown>;
function record(value: unknown): Json {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Json) : {};
}
export function usableXaiKey(value?: string): string | undefined {
  return value && value.length > 10 && !value.startsWith("sk-or-") && !value.startsWith("AQ.")
    ? value
    : undefined;
}
function seal(job: Job, key?: string) {
  const payload = JSON.stringify(job);
  if (payload.length > MAX_CURSOR) throw new Error("Moment is too large.");
  const signature = key ? createHmac("sha256", key).update(payload).digest("hex") : "free";
  return `homie1:${signature}:${payload}`;
}
function unseal(cursor: string, key?: string): Job {
  if (cursor.length > MAX_CURSOR + 80 || !cursor.startsWith("homie1:"))
    throw new Error("Invalid moment.");
  const split = cursor.indexOf(":", 7);
  const signature = cursor.slice(7, split);
  const payload = cursor.slice(split + 1);
  if (key) {
    const expected = createHmac("sha256", key).update(payload).digest();
    const actual = Buffer.from(signature, "hex");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      throw new Error("Invalid moment.");
  } else if (signature !== "free") throw new Error("Filming connection changed. Try again.");
  const job = jobSchema.parse(JSON.parse(payload));
  if (job.frames.join("").length > MAX_FRAMES_CHARS) throw new Error("Moment is too large.");
  // Unsigned free jobs can only contact Horde's fixed endpoints, never xAI or
  // a client-supplied download URL. Paid cursors are authenticated above.
  if (!key && !["horde-submit", "horde-poll", "finish"].includes(job.stage))
    throw new Error("Invalid moment.");
  return job;
}
function pending(job: Job, key?: string): ReelResult {
  const phase =
    job.stage === "scene"
      ? "Putting them in the room…"
      : job.stage.startsWith("video")
        ? "Filming…"
        : job.stage.startsWith("horde")
          ? "Waiting for reference poses…"
          : job.stage === "poses"
            ? `Making pose ${Math.min(job.pose + 1, 6)} of 6…`
            : "Saving the moment…";
  return {
    ok: true,
    status: "pending",
    requestId: seal(job, key),
    phase,
    retryAfterMs: job.stage.endsWith("poll") ? 2500 : 100,
  };
}
function still(job: Job): ReelResult {
  return {
    ok: true,
    status: "done",
    media: job.input.portrait,
    mime: job.input.portrait.slice(5, job.input.portrait.indexOf(";")),
    note:
      job.note ??
      "Filming was unavailable. Your Homie’s original portrait was kept as an animated still.",
  };
}
export function beginReel(input: unknown, rawKey?: string, now = Date.now()): ReelResult {
  const key = usableXaiKey(rawKey);
  const data = reelInputSchema.parse(input);
  if (!imageData(Buffer.from(data.portrait.split(",")[1], "base64")))
    throw new Error("Use a JPEG, PNG or WebP portrait.");
  return pending(
    {
      v: 1,
      input: data,
      stage: key ? "scene" : data.allowCommunity ? "horde-submit" : "finish",
      expires: now + REEL_LIFETIME_MS,
      imageModel: 0,
      videoModel: 0,
      videoAttempts: 0,
      pose: 0,
      frames: [],
      hordeIds: [],
      hordeSubmitted: 0,
    },
    key,
  );
}

// Inspect bytes, not an HTTP 200 or a claimed MIME type (providers can return
// HTML error pages). Preserve the real format in stored flipbooks.
export function imageData(bytes: Buffer): string | null {
  let mime = "";
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) mime = "image/jpeg";
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    mime = "image/png";
  if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP")
    mime = "image/webp";
  const data = mime ? `data:${mime};base64,${bytes.toString("base64")}` : "";
  return data && data.length <= 900_000 ? data : null;
}
async function boundedBytes(response: Response, max: number): Promise<Buffer> {
  if (!response.ok || Number(response.headers.get("content-length")) > max)
    throw new Error("Invalid media.");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Missing media.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > max) throw new Error("Media is too large.");
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return Buffer.concat(chunks);
}
function failureKind(status: number, body: Json) {
  const error = record(body.error);
  const text = [body.code, body.message, body.error, error.code, error.message]
    .filter((v) => typeof v === "string")
    .join(" ")
    .toLowerCase();
  if (/content.?policy|content.?moderation|safety|nsfw|content.?filter/.test(text)) return "policy";
  if ([401, 402, 403, 429].includes(status)) return "account";
  if (
    [400, 404].includes(status) &&
    /model/.test(text) &&
    /not.found|not.*exist|unsupported|unavailable|not.*access/.test(text)
  )
    return "model";
  return "other";
}
function addFrame(job: Job, frame: string | null) {
  if (
    frame &&
    !job.frames.includes(frame) &&
    job.frames.join("").length + frame.length <= MAX_FRAMES_CHARS
  )
    job.frames.push(frame);
}

export async function advanceReel(
  cursor: string,
  rawKey?: string,
  deps: Dependencies = {},
): Promise<ReelResult> {
  const key = usableXaiKey(rawKey);
  const now = deps.now ?? Date.now;
  const request = deps.fetch ?? fetch;
  let job: Job;
  try {
    job = unseal(cursor, key);
  } catch {
    return {
      ok: false,
      error: "This moment could not be resumed. Your portrait is unchanged; try again.",
    };
  }
  const callDeadline = now() + 38_000;
  const signal = (ms: number) =>
    AbortSignal.timeout(Math.max(1, Math.min(ms, callDeadline - now(), job.expires - now())));
  const json = async (url: string, init: RequestInit, ms: number) => {
    const res = await request(url, { ...init, signal: signal(ms) });
    return { status: res.status, ok: res.ok, body: record(await res.json()) };
  };
  const postXai = (path: string, payload: Json, ms = 25_000) =>
    json(
      `https://api.x.ai/v1/${path}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(payload),
      },
      ms,
    );
  const readImage = async (item: Json): Promise<string | null> => {
    if (typeof item.b64_json === "string" && item.b64_json.length <= 900_000)
      return imageData(Buffer.from(item.b64_json, "base64"));
    if (typeof item.url === "string" && item.url.startsWith("https://")) {
      return imageData(
        await boundedBytes(await request(item.url, { signal: signal(8_000) }), 675_000),
      );
    }
    return null;
  };
  const toFree = () => {
    job.stage = job.frames.length >= 2 || !job.input.allowCommunity ? "finish" : "horde-submit";
    job.activeId = undefined;
  };
  const toPoses = () => {
    if (key) job.stage = "poses";
    else toFree();
    job.activeId = undefined;
  };
  const stopPolicy = (): ReelResult => {
    job.note =
      "The image service could not use this portrait or scene. Your original portrait was kept; try a different description.";
    return still(job);
  };
  const cancelHorde = async () => {
    await Promise.allSettled(
      job.hordeIds.map((id) =>
        request(`${HORDE}/status/${id}`, {
          method: "DELETE",
          headers: { apikey: "0000000000" },
          signal: AbortSignal.timeout(2000),
        }),
      ),
    );
    job.hordeIds = [];
  };

  if (job.expires > now() + REEL_LIFETIME_MS + 1000)
    return { ok: false, error: "Invalid moment deadline." };
  if (now() >= job.expires) job.stage = "finish";
  try {
    switch (job.stage) {
      case "scene": {
        const res = await postXai("images/edits", {
          model: IMAGE_MODELS[job.imageModel],
          response_format: "b64_json",
          n: 1,
          image: { url: job.input.portrait, type: "image_url" },
          prompt: `Place this exact character in their home. Preserve their face, outfit and proportions. One character, no text. Setting: ${job.input.setting}`,
        });
        if (!res.ok || res.body.error) {
          const kind = failureKind(res.status, res.body);
          if (kind === "policy") return stopPolicy();
          if (kind === "model" && ++job.imageModel < IMAGE_MODELS.length) break;
          toFree();
          break;
        }
        const scene = await readImage(
          record(Array.isArray(res.body.data) ? res.body.data[0] : res.body),
        );
        if (scene) {
          job.scene = scene;
          job.stage = "video-start";
        } else toFree();
        break;
      }
      case "video-start": {
        if (job.videoModel >= VIDEO_MODELS.length || job.videoAttempts >= 2) {
          toPoses();
          break;
        }
        const res = await postXai(
          "videos/generations",
          {
            model: VIDEO_MODELS[job.videoModel],
            duration: 6,
            image: { url: job.scene ?? job.input.portrait },
            prompt: `${job.input.name || "Homie"} lives a few quiet seconds in this exact room. A glance, a small shift, a gentle wave. Same character and outfit. Camera holds steady. No new people or text.`,
          },
          20_000,
        );
        if (!res.ok || res.body.error) {
          const kind = failureKind(res.status, res.body);
          if (kind === "policy") return stopPolicy();
          if (kind === "account") {
            toFree();
            break;
          }
          if (kind === "model" && ++job.videoModel < VIDEO_MODELS.length) break;
          toPoses();
          break;
        }
        const id = jobId.safeParse(res.body.request_id ?? res.body.id);
        if (!id.success) {
          toPoses();
          break;
        }
        job.activeId = id.data;
        job.activeUntil = Math.min(now() + 70_000, job.expires);
        job.videoAttempts += 1;
        job.stage = "video-poll";
        break;
      }
      case "video-poll": {
        if (!job.activeId || now() >= (job.activeUntil ?? 0)) {
          toPoses();
          break;
        }
        const res = await json(
          `https://api.x.ai/v1/videos/${job.activeId}`,
          { headers: { Authorization: `Bearer ${key}` } },
          8000,
        );
        const status = String(res.body.status ?? "").toLowerCase();
        if (!res.ok || res.body.error || status === "failed" || status === "expired") {
          const kind = failureKind(res.status, res.body);
          if (kind === "policy") return stopPolicy();
          if (kind === "account") {
            toFree();
            break;
          }
          // A terminal failure can try one other video model; an ambiguous
          // timeout never re-submits an already accepted paid generation.
          if (
            ["failed", "expired"].includes(status) &&
            job.videoAttempts < 2 &&
            ++job.videoModel < VIDEO_MODELS.length
          )
            job.stage = "video-start";
          else toPoses();
          break;
        }
        if (status !== "done") break;
        const url = record(res.body.video).url;
        if (typeof url !== "string" || !url.startsWith("https://")) {
          toPoses();
          break;
        }
        const bytes = await boundedBytes(await request(url, { signal: signal(10_000) }), 8_000_000);
        if (bytes.length < 12 || bytes.toString("ascii", 4, 8) !== "ftyp") {
          toPoses();
          break;
        }
        const gif = await deps.videoToGif?.(bytes).catch(() => null);
        if (gif) return { ok: true, status: "done", mime: "image/gif", media: gif };
        if (bytes.length <= 2_200_000)
          return {
            ok: true,
            status: "done",
            mime: "video/mp4",
            media: `data:video/mp4;base64,${bytes.toString("base64")}`,
          };
        toPoses();
        break;
      }
      case "poses": {
        if (job.pose >= POSES.length || job.frames.length >= POSES.length) {
          toFree();
          break;
        }
        const res = await postXai("images/edits", {
          model: IMAGE_MODELS[Math.min(job.imageModel, IMAGE_MODELS.length - 1)],
          n: 1,
          response_format: "b64_json",
          image: { url: job.scene ?? job.input.portrait, type: "image_url" },
          prompt: `Edit this same character and room: ${POSES[job.pose]}. Keep the exact face, outfit, proportions, camera, background and lighting. Small motion only, no text. Setting: ${job.input.setting}`,
        });
        if (!res.ok || res.body.error) {
          const kind = failureKind(res.status, res.body);
          if (kind === "policy") return stopPolicy();
          if (kind === "model" && ++job.imageModel < IMAGE_MODELS.length) break;
          toFree();
          break;
        }
        addFrame(
          job,
          await readImage(record(Array.isArray(res.body.data) ? res.body.data[0] : res.body)),
        );
        job.pose += 1;
        if (job.pose >= POSES.length) toFree();
        break;
      }
      case "horde-submit": {
        if (!job.input.allowCommunity) {
          job.stage = "finish";
          break;
        }
        job.hordeUntil ??= Math.min(now() + 75_000, job.expires);
        if (now() >= job.hordeUntil || job.hordeSubmitted >= POSES.length) {
          job.stage = job.hordeIds.length ? "horde-poll" : "finish";
          break;
        }
        const pose = job.hordeSubmitted++;
        // Legacy Pollinations is text-only: it cannot retain this portrait and
        // must not substitute an unrelated character for a filmed Homie.
        const res = await json(
          `${HORDE}/async`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: "0000000000",
              "Client-Agent": "Homies:1:github.com/astrocoolness/homies",
            },
            body: JSON.stringify({
              prompt: `The exact same character, face and outfit as the source image, ${POSES[pose]}, small motion. Same room and camera. ${job.input.setting} ### text, watermark, extra people`,
              source_image: (job.scene ?? job.input.portrait).split(",")[1],
              source_processing: "img2img",
              params: {
                width: 512,
                height: 512,
                steps: 20,
                n: 1,
                denoising_strength: 0.25,
                seed: String(100 + pose * 41),
              },
              nsfw: false,
              censor_nsfw: true,
              r2: true,
            }),
          },
          8000,
        );
        if (!res.ok || res.body.error) {
          if (failureKind(res.status, res.body) === "policy") {
            await cancelHorde();
            return stopPolicy();
          }
          job.stage = job.hordeIds.length ? "horde-poll" : "finish";
          break;
        }
        const id = jobId.safeParse(res.body.id);
        if (id.success) job.hordeIds.push(id.data);
        else job.stage = job.hordeIds.length ? "horde-poll" : "finish";
        if (job.hordeSubmitted >= POSES.length) job.stage = "horde-poll";
        break;
      }
      case "horde-poll": {
        if (!job.hordeIds.length || now() >= (job.hordeUntil ?? 0)) {
          job.stage = "finish";
          break;
        }
        const id = job.hordeIds[0];
        const check = await json(`${HORDE}/check/${id}`, {}, 5000);
        if (!check.ok || check.body.faulted || check.body.is_possible === false) {
          await request(`${HORDE}/status/${id}`, { method: "DELETE", signal: signal(2000) }).catch(
            () => undefined,
          );
          job.hordeIds.shift();
          break;
        }
        if (!check.body.done) {
          job.hordeIds.push(job.hordeIds.shift()!);
          break;
        }
        // /check contains only progress. Fetch the completed images separately.
        const result = await json(`${HORDE}/status/${id}`, {}, 5000);
        if (result.ok) {
          const generations = Array.isArray(result.body.generations) ? result.body.generations : [];
          for (const value of generations) {
            const generation = record(value);
            const metadata = Array.isArray(generation.gen_metadata)
              ? generation.gen_metadata.map(record)
              : [];
            if (
              generation.censored ||
              ["censored", "csam"].includes(String(generation.state)) ||
              metadata.some(
                (meta) =>
                  meta.type === "censorship" ||
                  (meta.type === "source_image" &&
                    ["parse_failed", "download_failed"].includes(String(meta.value))),
              ) ||
              typeof generation.img !== "string"
            )
              continue;
            const img = generation.img;
            if (img.startsWith("https://")) addFrame(job, await readImage({ url: img }));
            else
              addFrame(
                job,
                await readImage({ b64_json: img.replace(/^data:image\/\w+;base64,/, "") }),
              );
          }
        }
        job.hordeIds.shift();
        if (!job.hordeIds.length) job.stage = "finish";
        break;
      }
      case "finish": {
        await cancelHorde();
        if (job.frames.length < 2) return still(job);
        const gif = await deps.framesToGif?.(job.frames).catch(() => null);
        const mime = gif ? "image/gif" : "application/x-homie-frames";
        const media =
          gif ??
          `data:${mime};base64,${Buffer.from(JSON.stringify(job.frames)).toString("base64")}`;
        return {
          ok: true,
          status: "done",
          mime,
          media,
          note: "Video was unavailable. Saved a reference-based pose sequence.",
        };
      }
    }
  } catch {
    // Do not log portraits, prompts, provider error bodies, credentials or
    // signed cursors. A failed step preserves all previously collected frames.
    console.warn("[homies/reel] provider step failed", { stage: job.stage });
    if (job.stage === "scene" || job.stage === "poses") toFree();
    else if (job.stage.startsWith("video")) toPoses();
    else job.stage = "finish";
  }
  return pending(job, key);
}

import { createServerFn } from "@tanstack/react-start";

const MAX_IMAGE = 900_000;

export type StartReelResult = { ok: true; requestId: string } | { ok: false; error: string };

export type PullReelResult =
  | { ok: true; status: "pending" }
  | { ok: true; status: "done"; media: string; mime: string }
  | { ok: false; error: string };

function clip(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function authHeaders(apiKey: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` };
}

function isUsableXaiKey(key: string | undefined): key is string {
  return !!key && key.length > 10 && !key.startsWith("sk-or-") && !key.startsWith("AQ.");
}

function framesToDataUrl(frames: Buffer[]): string | null {
  if (frames.length === 0) return null;
  const dataUrls = frames.map((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`);
  const payload = JSON.stringify(dataUrls);
  return `data:application/x-homie-frames;base64,${Buffer.from(payload).toString("base64")}`;
}

async function sceneUrl(apiKey: string, portrait: string, setting: string): Promise<string | null> {
  const models = ["grok-imagine-image-2.0", "grok-imagine-image", "grok-imagine-image-quality"];
  for (const model of models) {
    try {
      const res = await fetch("https://api.x.ai/v1/images/edits", {
        method: "POST",
        headers: authHeaders(apiKey),
        signal: AbortSignal.timeout(40_000),
        body: JSON.stringify({
          model,
          prompt: `Place this exact vinyl-toy character inside their home, same face and outfit, full scene, one character only. Setting: ${setting}. Warm toy-like room, no text, no watermark, no extra people.`,
          image: { url: portrait, type: "image_url" },
        }),
      });
      if (!res.ok) continue;
      const body = (await res.json()) as { data?: { url?: string; b64_json?: string }[]; url?: string; b64_json?: string };
      const url = body.data?.[0]?.url ?? body.url;
      if (url) return url;
      const b64 = body.data?.[0]?.b64_json ?? body.b64_json;
      if (b64) return `data:image/png;base64,${b64}`;
    } catch {
      // try next model
    }
  }
  return null;
}

async function freeFrame(prompt: string, seed: number): Promise<Buffer | null> {
  // 1. Pollinations (legacy free URL)
  try {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(18_000) });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 800) return buf;
    }
  } catch {
    // continue
  }

  // 2. AI Horde anonymous (slow but free, no key)
  try {
    const res = await fetch("https://stablehorde.net/api/v2/generate/async", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: "0000000000" },
      signal: AbortSignal.timeout(12_000),
      body: JSON.stringify({
        prompt,
        params: { width: 512, height: 512, steps: 20, n: 1 },
        nsfw: false,
        censor_nsfw: true,
        models: ["stable_diffusion"],
      }),
    });
    if (res.ok) {
      const body = (await res.json()) as { id?: string };
      if (body.id) {
        await new Promise((r) => setTimeout(r, 8000));
        const check = await fetch(`https://stablehorde.net/api/v2/generate/check/${body.id}`, {
          signal: AbortSignal.timeout(8_000),
        });
        if (check.ok) {
          const status = (await check.json()) as { done?: boolean; generations?: { img?: string }[] };
          if (status.done && status.generations?.[0]?.img) {
            const imgRes = await fetch(status.generations[0].img, { signal: AbortSignal.timeout(10_000) });
            if (imgRes.ok) {
              const buf = Buffer.from(await imgRes.arrayBuffer());
              if (buf.length > 800) return buf;
            }
          }
        }
      }
    }
  } catch {
    // skip
  }

  return null;
}

async function framesToGif(frames: Buffer[]): Promise<string | null> {
  if (frames.length < 2) return null;
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { execFile } = await import("node:child_process");
  const id = Math.random().toString(36).slice(2);
  const dir = path.join(os.tmpdir(), `homie-gif-${id}`);
  const output = path.join(dir, "out.gif");
  try {
    await fs.mkdir(dir, { recursive: true });
    for (let i = 0; i < frames.length; i++) {
      await fs.writeFile(path.join(dir, `f${i}.jpg`), frames[i]);
    }
    await new Promise<void>((resolve, reject) => {
      execFile(
        "ffmpeg",
        [
          "-y",
          "-framerate",
          "2",
          "-i",
          path.join(dir, "f%d.jpg"),
          "-vf",
          "fps=2,scale=320:-1:flags=lanczos,format=rgb24,split[s0][s1];[s0]palettegen=max_colors=48[p];[s1][p]paletteuse=dither=bayer",
          output,
        ],
        { timeout: 18_000 },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    const bytes = await fs.readFile(output);
    if (bytes.length >= 100 && bytes.length <= 1_800_000) {
      return `data:image/gif;base64,${bytes.toString("base64")}`;
    }
  } catch {
    // ffmpeg unavailable
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
  return null;
}

async function freeAnimated(name: string, setting: string): Promise<string | null> {
  const base = `cute vinyl toy character named ${name}, ${setting}, soft matte plastic, warm cream room, one character only, no text`;
  const variations = [
    "slight lean left",
    "slight lean right",
    "gentle head tilt",
    "small smile",
    "looking down",
    "looking up",
    "soft wave",
    "tiny step forward",
  ];
  const frames: Buffer[] = [];
  for (let i = 0; i < variations.length && frames.length < 5; i++) {
    const frame = await freeFrame(`${base}, ${variations[i]}, small motion`, 100 + i * 41);
    if (frame && frame.length > 800) frames.push(frame);
  }
  if (frames.length === 0) return null;

  const gif = await framesToGif(frames);
  if (gif) return gif;

  if (frames.length >= 2) return framesToDataUrl(frames);

  return `data:image/jpeg;base64,${frames[0].toString("base64")}`;
}

async function xaiPoseSequence(apiKey: string, setting: string, name: string): Promise<string | null> {
  const models = ["grok-imagine-image-2.0", "grok-imagine-image", "grok-imagine-image-quality"];
  const poses = [
    "looking slightly left",
    "looking slightly right",
    "gentle lean forward",
    "small smile",
    "slight head tilt",
    "soft wave",
  ];
  const frames: Buffer[] = [];
  for (const pose of poses) {
    if (frames.length >= 4) break;
    for (const model of models) {
      try {
        const res = await fetch("https://api.x.ai/v1/images/generations", {
          method: "POST",
          headers: authHeaders(apiKey),
          signal: AbortSignal.timeout(26_000),
          body: JSON.stringify({
            model,
            prompt: `A cute vinyl toy character named ${name}, ${pose}, standing in their cozy home. Setting: ${setting}. Soft matte plastic, warm cream room, one character only, no text, no watermark, high quality.`,
            n: 1,
          }),
        });
        if (!res.ok) continue;
        const body = (await res.json()) as { data?: { b64_json?: string; url?: string }[] };
        const item = body.data?.[0];
        if (item?.b64_json) {
          frames.push(Buffer.from(item.b64_json, "base64"));
          break;
        } else if (item?.url) {
          const img = await fetch(item.url, { signal: AbortSignal.timeout(12_000) });
          if (img.ok) {
            frames.push(Buffer.from(await img.arrayBuffer()));
            break;
          }
        }
      } catch {
        // try next model
      }
    }
  }
  if (frames.length === 0) return null;

  const gif = await framesToGif(frames);
  if (gif) return gif;

  if (frames.length >= 2) return framesToDataUrl(frames);

  return `data:image/jpeg;base64,${frames[0].toString("base64")}`;
}

async function toGif(mp4: Uint8Array): Promise<{ mime: string; bytes: Buffer } | null> {
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { execFile } = await import("node:child_process");
  const id = Math.random().toString(36).slice(2);
  const input = path.join(os.tmpdir(), `homie-${id}.mp4`);
  const output = path.join(os.tmpdir(), `homie-${id}.gif`);
  try {
    await fs.writeFile(input, mp4);
    await new Promise<void>((resolve, reject) => {
      execFile(
        "ffmpeg",
        [
          "-y",
          "-i",
          input,
          "-t",
          "6",
          "-vf",
          "fps=8,scale=320:-1:flags=lanczos,format=rgb24,split[s0][s1];[s0]palettegen=max_colors=48[p];[s1][p]paletteuse=dither=bayer",
          output,
        ],
        { timeout: 22_000 },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    const bytes = await fs.readFile(output);
    if (bytes.length < 40 || bytes.length > 1_800_000) return null;
    return { mime: "image/gif", bytes };
  } catch {
    return null;
  } finally {
    await fs.unlink(input).catch(() => undefined);
    await fs.unlink(output).catch(() => undefined);
  }
}

export const startReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const row = (input ?? {}) as { portrait?: unknown; name?: unknown; setting?: unknown };
    const portrait = typeof row.portrait === "string" ? row.portrait : "";
    if (!portrait.startsWith("data:image/") || portrait.length > MAX_IMAGE) {
      throw new Error("The portrait is too big to film.");
    }
    return {
      portrait,
      name: clip(row.name, 24),
      setting: clip(row.setting, 240),
    };
  })
  .handler(async ({ data }): Promise<StartReelResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (data.setting.length < 2) return { ok: false, error: "They need a home before a scene." };

    const name = data.name || "Homie";

    // 1. Prefer xAI video (expanded model list)
    if (isUsableXaiKey(apiKey)) {
      try {
        const still = await sceneUrl(apiKey, data.portrait, data.setting);
        if (still) {
          const models = ["grok-imagine-video-1.5", "grok-imagine-video", "grok-imagine-video-1.5-lite"];
          for (const model of models) {
            try {
              const res = await fetch("https://api.x.ai/v1/videos/generations", {
                method: "POST",
                headers: authHeaders(apiKey),
                signal: AbortSignal.timeout(28_000),
                body: JSON.stringify({
                  model,
                  duration: 6,
                  image: { url: still },
                  prompt: `${name} lives a few quiet seconds in this room. Small natural motion: a glance, a shift, their habit. Camera holds steady. No new people. No text.`,
                }),
              });
              if (!res.ok) continue;
              const body = (await res.json()) as { request_id?: string; id?: string };
              const requestId = body.request_id ?? body.id ?? "";
              if (/^[A-Za-z0-9-]{8,80}$/.test(requestId)) return { ok: true, requestId };
            } catch {
              // try next model
            }
          }
        }
      } catch (err) {
        console.error("startReel xAI video", err instanceof Error ? err.message : "failed");
      }

      // 2. xAI multi-pose frames → GIF or flipbook (more models)
      try {
        const poseMedia = await xaiPoseSequence(apiKey, data.setting, name);
        if (poseMedia) return { ok: true, requestId: poseMedia };
      } catch (err) {
        console.error("startReel xAI poses", err instanceof Error ? err.message : "failed");
      }
    }

    // 3. Free multi-frame (Pollinations + AI Horde, GIF or flipbook)
    const freeMedia = await freeAnimated(name, data.setting);
    if (freeMedia) return { ok: true, requestId: freeMedia };

    // 4. Final guaranteed still: the Homie's own portrait (client animates it)
    return { ok: true, requestId: data.portrait };
  });

export const pullReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const requestId = typeof (input as { requestId?: unknown })?.requestId === "string" ? (input as { requestId: string }).requestId : "";
    if (!requestId) throw new Error("Missing take.");
    return { requestId };
  })
  .handler(async ({ data }): Promise<PullReelResult> => {
    if (data.requestId.startsWith("data:image/gif")) {
      return { ok: true, status: "done", mime: "image/gif", media: data.requestId };
    }
    if (data.requestId.startsWith("data:image/")) {
      return { ok: true, status: "done", mime: "image/jpeg", media: data.requestId };
    }
    if (data.requestId.startsWith("data:application/x-homie-frames")) {
      return { ok: true, status: "done", mime: "application/x-homie-frames", media: data.requestId };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!isUsableXaiKey(apiKey)) return { ok: false, error: "Filming isn't available right now." };
    try {
      const res = await fetch(`https://api.x.ai/v1/videos/${data.requestId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(18_000),
      });
      if (!res.ok) return { ok: false, error: "Lost the camera. Try once more." };
      const body = (await res.json()) as { status?: string; video?: { url?: string } };
      const status = (body.status ?? "").toLowerCase();
      if (status === "failed" || status === "expired") return { ok: false, error: "That take didn't come out. Try once more." };
      const url = body.video?.url;
      if (status !== "done" || !url) return { ok: true, status: "pending" };
      const clipRes = await fetch(url, { signal: AbortSignal.timeout(28_000) });
      if (!clipRes.ok) return { ok: false, error: "The loop didn't download. Try once more." };
      const bytes = Buffer.from(await clipRes.arrayBuffer());
      if (bytes.length < 1000 || bytes.length > 8_000_000) return { ok: false, error: "That take was too heavy." };
      const gif = await toGif(bytes);
      const mime = gif?.mime ?? "video/mp4";
      const payload = gif?.bytes ?? bytes;
      if (payload.length > 2_200_000) return { ok: false, error: "That take was too heavy to keep." };
      return { ok: true, status: "done", mime, media: `data:${mime};base64,${payload.toString("base64")}` };
    } catch (err) {
      console.error("pullReel", err instanceof Error ? err.message : "failed");
      return { ok: false, error: "That didn't work. Try once more." };
    }
  });

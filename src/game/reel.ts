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

async function sceneUrl(apiKey: string, portrait: string, setting: string): Promise<string | null> {
  const res = await fetch("https://api.x.ai/v1/images/edits", {
    method: "POST",
    headers: authHeaders(apiKey),
    signal: AbortSignal.timeout(45_000),
    body: JSON.stringify({
      model: "grok-imagine-image-2.0",
      prompt: `Place this exact vinyl-toy character inside their home, same face and outfit, full scene, one character only. Setting: ${setting}. Warm toy-like room, no text, no watermark, no extra people.`,
      image: { url: portrait, type: "image_url" },
    }),
  });
  if (!res.ok) return null;
  const body = (await res.json()) as { data?: { url?: string; b64_json?: string }[]; url?: string; b64_json?: string };
  const url = body.data?.[0]?.url ?? body.url;
  if (url) return url;
  const b64 = body.data?.[0]?.b64_json ?? body.b64_json;
  if (!b64) return null;
  return `data:image/png;base64,${b64}`;
}

async function freeFrame(prompt: string, seed: number): Promise<Buffer | null> {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(25_000) });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function freeGif(name: string, setting: string): Promise<string | null> {
  const base = `cute vinyl toy character named ${name}, ${setting}, soft matte plastic, warm cream room, one character only, no text`;
  const seeds = [42, 137, 256, 512];
  const frames: Buffer[] = [];
  for (const seed of seeds) {
    const frame = await freeFrame(`${base}, slight pose variation ${seed}`, seed);
    if (frame && frame.length > 1000) frames.push(frame);
    if (frames.length >= 4) break;
  }
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
        { timeout: 20_000 },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    const bytes = await fs.readFile(output);
    if (bytes.length < 100 || bytes.length > 1_800_000) return null;
    return `data:image/gif;base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
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
        { timeout: 25_000 },
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

    // Free path: return the GIF data URL as the requestId so pullReel can hand it back immediately.
    if (!apiKey || apiKey.startsWith("sk-or-") || apiKey.startsWith("AQ.")) {
      const media = await freeGif(data.name || "Homie", data.setting);
      if (!media) return { ok: false, error: "The loop didn't come through. Try once more." };
      return { ok: true, requestId: media };
    }

    try {
      const still = await sceneUrl(apiKey, data.portrait, data.setting);
      if (!still) return { ok: false, error: "The room didn't come through. Try once more." };
      const res = await fetch("https://api.x.ai/v1/videos/generations", {
        method: "POST",
        headers: authHeaders(apiKey),
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          model: "grok-imagine-video-1.5",
          duration: 6,
          image: { url: still },
          prompt: `${data.name || "The homie"} lives a few quiet seconds in this room. Small motion only: a glance, a shift, their habit. Camera holds. No new people. No text.`,
        }),
      });
      if (!res.ok) return { ok: false, error: "The camera didn't start. Try once more." };
      const body = (await res.json()) as { request_id?: string; id?: string };
      const requestId = body.request_id ?? body.id ?? "";
      if (!/^[A-Za-z0-9-]{8,80}$/.test(requestId)) return { ok: false, error: "The camera didn't start. Try once more." };
      return { ok: true, requestId };
    } catch (err) {
      console.error("startReel", err instanceof Error ? err.message : "failed");
      return { ok: false, error: "That didn't work. Try once more." };
    }
  });

export const pullReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const requestId = typeof (input as { requestId?: unknown })?.requestId === "string" ? (input as { requestId: string }).requestId : "";
    if (!requestId) throw new Error("Missing take.");
    return { requestId };
  })
  .handler(async ({ data }): Promise<PullReelResult> => {
    // Free path: requestId is the data URL itself.
    if (data.requestId.startsWith("data:image/gif")) {
      return { ok: true, status: "done", mime: "image/gif", media: data.requestId };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Filming isn't available right now." };
    try {
      const res = await fetch(`https://api.x.ai/v1/videos/${data.requestId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(20_000),
      });
      if (!res.ok) return { ok: false, error: "Lost the camera. Try once more." };
      const body = (await res.json()) as { status?: string; video?: { url?: string } };
      const status = (body.status ?? "").toLowerCase();
      if (status === "failed" || status === "expired") return { ok: false, error: "That take didn't come out. Try once more." };
      const url = body.video?.url;
      if (status !== "done" || !url) return { ok: true, status: "pending" };
      const clipRes = await fetch(url, { signal: AbortSignal.timeout(30_000) });
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

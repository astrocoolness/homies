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

function soften(text: string): string {
  const safe = text
    .replace(/\b(spicy|edge|violent|blood|gore|sex|nude|nsfw|dark|gritty|edgy)\b/gi, "gentle")
    .trim();
  return `${safe} Soft wholesome gentle family-friendly pastel toy aesthetic. No violence no edge no suggestive no spicy content. Warm cozy safe room.`;
}

async function sceneUrl(apiKey: string, portrait: string, setting: string, soft = false): Promise<string | null> {
  const promptSetting = soft ? soften(setting) : setting;
  const res = await fetch("https://api.x.ai/v1/images/edits", {
    method: "POST",
    headers: authHeaders(apiKey),
    signal: AbortSignal.timeout(45_000),
    body: JSON.stringify({
      model: "grok-imagine-image-2.0",
      prompt: `Place this exact vinyl-toy character inside their home, same face and outfit, full scene, one character only. Setting: ${promptSetting}. Warm toy-like room, no text, no watermark, no extra people.`,
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
          "10",
          "-vf",
          "fps=6,scale=240:-1:flags=lanczos,format=rgb24,split[s0][s1];[s0]palettegen=max_colors=40[p];[s1][p]paletteuse=dither=bayer",
          output,
        ],
        { timeout: 40_000 },
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

function allowedShelfPortrait(portrait: string) {
  try {
    const url = new URL(portrait);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".supabase.co") &&
      url.pathname.includes("/storage/v1/object/public/homie-files/")
    );
  } catch {
    return false;
  }
}

export const startReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const row = (input ?? {}) as { portrait?: unknown; name?: unknown; setting?: unknown };
    const portrait = typeof row.portrait === "string" ? row.portrait : "";
    const inline = portrait.startsWith("data:image/") && portrait.length <= MAX_IMAGE;
    if (!inline && !allowedShelfPortrait(portrait)) {
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
    if (!apiKey) return { ok: false, error: "Filming isn't available right now." };
    if (data.setting.length < 2) return { ok: false, error: "They need a home before a scene." };
    let portrait = data.portrait;
    if (portrait.startsWith("https://")) {
      try {
        const got = await fetch(portrait, { signal: AbortSignal.timeout(12_000) });
        if (!got.ok) return { ok: false, error: "The portrait didn't load." };
        const bytes = Buffer.from(await got.arrayBuffer());
        if (bytes.length < 32 || bytes.length > 650_000) return { ok: false, error: "The portrait is too big to film." };
        const mime = (got.headers.get("content-type") ?? "image/jpeg").split(";")[0];
        if (!mime.startsWith("image/")) return { ok: false, error: "The portrait didn't load." };
        portrait = `data:${mime};base64,${bytes.toString("base64")}`;
      } catch {
        return { ok: false, error: "The portrait didn't load." };
      }
    }
    try {
      let still = await sceneUrl(apiKey, portrait, data.setting, false);
      if (!still) still = await sceneUrl(apiKey, portrait, data.setting, true);
      if (!still) return { ok: false, error: "The room didn't come through. Try once more." };

      const basePrompt = `${data.name || "The homie"} lives for ten seconds in this room. Small motion only: a glance, a shift, their habit. Camera holds. No new people. No text.`;
      const softPrompt = `${soften(basePrompt)} Soft gentle wholesome motion only.`;

      let res = await fetch("https://api.x.ai/v1/videos/generations", {
        method: "POST",
        headers: authHeaders(apiKey),
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          model: "grok-imagine-video-1.5",
          duration: 10,
          image: { url: still },
          prompt: basePrompt,
        }),
      });
      if (!res.ok) {
        res = await fetch("https://api.x.ai/v1/videos/generations", {
          method: "POST",
          headers: authHeaders(apiKey),
          signal: AbortSignal.timeout(30_000),
          body: JSON.stringify({
            model: "grok-imagine-video-1.5",
            duration: 10,
            image: { url: still },
            prompt: softPrompt,
          }),
        });
      }
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
    if (!/^[A-Za-z0-9-]{8,80}$/.test(requestId)) throw new Error("Missing take.");
    return { requestId };
  })
  .handler(async ({ data }): Promise<PullReelResult> => {
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
      const clip = await fetch(url, { signal: AbortSignal.timeout(45_000) });
      if (!clip.ok) return { ok: false, error: "The loop didn't download. Try once more." };
      const bytes = Buffer.from(await clip.arrayBuffer());
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

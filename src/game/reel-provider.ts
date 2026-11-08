// Server-side provider adapter. Never return provider error bodies or credentials.
type FailureReason = "auth" | "credits" | "model" | "policy" | "rate_limit" | "request" | "unavailable" | "timeout" | "response";
type Failure = { ok: false; error: string; reason: FailureReason; status: number };
type JsonObject = Record<string, unknown>;
type ProviderResult = { ok: true; body: JsonObject } | Failure;

function record(value: unknown): JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function failure(stage: "room" | "film", status: number, reason: FailureReason): Failure {
  const messages: Record<FailureReason, string> = {
    auth: "Filming is unavailable: the image/video service could not authenticate. The app owner needs to check its connection.",
    credits: "Filming is unavailable: the image/video service has no credits or has reached its spending limit.",
    model: "This image/video model is unavailable for the app. The app owner needs to check model access.",
    policy: "The image/video service could not use this portrait or scene. Try a different portrait or home description.",
    rate_limit: "The image/video service is busy. Wait a little before trying again.",
    request: "The image/video service could not accept this portrait or scene. Try a different portrait or home description.",
    unavailable: "The image/video service is temporarily unavailable. Try again later.",
    timeout: "The image/video service took too long. Wait a little before trying again.",
    response: stage === "room" ? "The room service returned no usable image. Try again later." : "The camera returned no usable take. Try again later.",
  };
  console.error("[homies/reel]", { stage, status, reason });
  return { ok: false, error: messages[reason], reason, status };
}

function classify(status: number, body: JsonObject): FailureReason {
  const error = record(body.error);
  const message = [body.code, body.message, typeof body.error === "string" ? body.error : "", error.code, error.message]
    .filter((value): value is string => typeof value === "string").join(" ").toLowerCase();
  if (status === 401) return "auth";
  if (status === 402 || /insufficient_quota|credit|spending limit|spend limit|billing|quota.*exceed/.test(message)) return "credits";
  if (/content.?policy|content.?moderation|safety|nsfw|content.?filter/.test(message)) return "policy";
  if ((status === 400 || status === 404) && /model/.test(message) && /not found|not_found|does not exist|unavailable|not available|not.*access|no.*access|unknown|unsupported/.test(message)) return "model";
  if (status === 403) return "auth";
  if (status === 429) return "rate_limit";
  return status >= 500 ? "unavailable" : "request";
}

async function request(apiKey: string, stage: "room" | "film", path: string, payload: JsonObject, timeout: number): Promise<ProviderResult> {
  try {
    const res = await fetch(`https://api.x.ai/v1/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(timeout),
      body: JSON.stringify(payload),
    });
    const body = record(await res.json().catch(() => null));
    if (!res.ok || body.error) return failure(stage, res.status, classify(res.status, body));
    return { ok: true, body };
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return failure(stage, 0, timedOut ? "timeout" : "unavailable");
  }
}

function extractImage(body: JsonObject): string | null {
  const first = record(Array.isArray(body.data) ? body.data[0] : body);
  if (typeof first.url === "string" && first.url.startsWith("https://")) return first.url;
  if (typeof first.b64_json === "string" && first.b64_json.length > 0) {
    const mime = first.mime_type === "image/png" ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${first.b64_json}`;
  }
  return null;
}

function parseDataUrl(dataUrl: string): { mime: string; data: string } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { mime: match[1], data: match[2] };
}

async function requestReelSceneGemini(key: string, portrait: string, setting: string): Promise<{ ok: true; url: string } | Failure> {
  const parsed = parseDataUrl(portrait);
  if (!parsed) return failure("room", 400, "request");
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      signal: AbortSignal.timeout(40_000),
      body: JSON.stringify({
        model: "gemini-nano-banana-2.1",
        input: [
          { type: "text", text: `Place this exact vinyl-toy character inside their home, same face and outfit, full scene, one character only. Setting: ${setting}. Warm toy-like room, no text, no watermark, no extra people.` },
          { type: "image", mime_type: parsed.mime, data: parsed.data },
        ],
        response_format: { type: "image" },
      }),
    });
    if (!res.ok) {
      const body = record(await res.json().catch(() => null));
      return failure("room", res.status, classify(res.status, body));
    }
    const data = (await res.json()) as {
      steps?: { content?: { type?: string; data?: string; mime_type?: string }[] }[];
      output_image?: { data?: string; mime_type?: string };
    };
    for (const step of data.steps ?? []) {
      for (const block of step.content ?? []) {
        if (block.type === "image" && block.data) {
          const mime = block.mime_type || "image/png";
          return { ok: true, url: `data:${mime};base64,${block.data}` };
        }
      }
    }
    if (data.output_image?.data) {
      const mime = data.output_image.mime_type || "image/png";
      return { ok: true, url: `data:${mime};base64,${data.output_image.data}` };
    }
    return failure("room", 200, "response");
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return failure("room", 0, timedOut ? "timeout" : "unavailable");
  }
}

export async function requestReelScene(apiKey: string, portrait: string, setting: string): Promise<{ ok: true; url: string } | Failure> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const gemini = await requestReelSceneGemini(geminiKey, portrait, setting);
    if (gemini.ok) return gemini;
  }
  const models = ["grok-imagine-image-2.0", "grok-imagine-image"];
  for (const [index, model] of models.entries()) {
    const result = await request(apiKey, "room", "images/edits", {
      model,
      prompt: `Place this exact vinyl-toy character inside their home, same face and outfit, full scene, one character only. Setting: ${setting}. Warm toy-like room, no text, no watermark, no extra people.`,
      image: { url: portrait, type: "image_url" },
    }, 40_000);
    if (result.ok) {
      const url = extractImage(result.body);
      if (url) return { ok: true, url };
    } else if (result.reason === "model" && index === 0) {
      continue;
    } else if (result.reason === "auth" || result.reason === "credits" || result.reason === "timeout" || result.reason === "unavailable") {
      return result;
    }
  }
  for (const model of models) {
    const result = await request(apiKey, "room", "images/generations", {
      model,
      prompt: `A cute vinyl toy character with a friendly face, similar style to a collectible figurine, standing in their cozy home. Setting: ${setting}. Warm pastel toy-like room, one character only, no text, no watermark, no extra people. Soft wholesome aesthetic.`,
      n: 1,
    }, 40_000);
    if (result.ok) {
      const url = extractImage(result.body);
      if (url) return { ok: true, url };
    }
  }
  return failure("room", 200, "response");
}

export async function requestReelVideo(apiKey: string, image: string, name: string): Promise<{ ok: true; requestId: string } | Failure> {
  // Prefer Gemini Omni if available for video (returns data directly; caller can adapt if needed)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const parsed = parseDataUrl(image);
    if (parsed) {
      try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiKey,
          },
          signal: AbortSignal.timeout(60_000),
          body: JSON.stringify({
            model: "gemini-omni-1.2-flash",
            input: [
              { type: "text", text: `${name || "The homie"} lives for ten seconds in this room. Small natural motion: a glance, a shift, their habit. Camera holds steady. High quality, smooth, no new people, no text.` },
              { type: "image", mime_type: parsed.mime, data: parsed.data },
            ],
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { output_video?: { data?: string } };
          if (data.output_video?.data) {
            // Return a synthetic requestId that pullReel can treat as immediate (or extend later)
            return { ok: true, requestId: `gemini:${Buffer.from(data.output_video.data.slice(0, 32)).toString("hex")}` };
          }
        }
      } catch {
        // fall through to xAI
      }
    }
  }
  const models = ["grok-imagine-video-1.5", "grok-imagine-video"];
  for (const [index, model] of models.entries()) {
    const result = await request(apiKey, "film", "videos/generations", {
      model, duration: 10, image: { url: image },
      prompt: `${name || "The homie"} lives for ten seconds in this room. Small natural motion: a glance, a shift, their habit. Camera holds steady. High quality, smooth, no new people, no text.`,
    }, 30_000);
    if (!result.ok) {
      if (result.reason === "model" && index === 0) continue;
      return result;
    }
    const id = result.body.request_id ?? result.body.id;
    if (typeof id !== "string" || !/^[A-Za-z0-9-]{8,80}$/.test(id)) return failure("film", 200, "response");
    return { ok: true, requestId: id };
  }
  return failure("film", 404, "model");
}

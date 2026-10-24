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

export async function requestReelScene(apiKey: string, portrait: string, setting: string): Promise<{ ok: true; url: string } | Failure> {
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
  // Prefer lighter/faster model first for speed
  const models = ["grok-imagine-video", "grok-imagine-video-1.5"];
  for (const [index, model] of models.entries()) {
    const result = await request(apiKey, "film", "videos/generations", {
      model, duration: 6, image: { url: image },
      prompt: `${name || "The homie"} moves gently for a few seconds in this room. Small motion only: a glance, a shift, their habit. Camera holds. No new people. No text.`,
    }, 25_000);
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

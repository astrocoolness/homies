export function isOpenRouter(key: string) {
  return key.startsWith("sk-or-");
}

export function chatUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/chat/completions"
    : "https://api.x.ai/v1/chat/completions";
}

export function imageGenUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/images"
    : "https://api.x.ai/v1/images/generations";
}

export function imageEditUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/images"
    : "https://api.x.ai/v1/images/edits";
}

export function videoUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/videos/generations"
    : "https://api.x.ai/v1/videos/generations";
}

export function chatModel(key: string) {
  // Free models on OpenRouter (no image gen free models exist)
  return isOpenRouter(key) ? "google/gemma-4-31b-it:free" : "grok-4.5";
}

export function imageModel(key: string) {
  // Cheapest reliable image model; no free image models on OpenRouter
  return isOpenRouter(key) ? "black-forest-labs/flux.2-max" : "grok-imagine-image";
}

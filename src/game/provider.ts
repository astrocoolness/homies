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
    ? "https://openrouter.ai/api/v1/images/generations"
    : "https://api.x.ai/v1/images/generations";
}

export function imageEditUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/images/generations" // OpenRouter uses gen for most
    : "https://api.x.ai/v1/images/edits";
}

export function videoUrl(key: string) {
  return isOpenRouter(key)
    ? "https://openrouter.ai/api/v1/videos/generations"
    : "https://api.x.ai/v1/videos/generations";
}

export function chatModel(key: string) {
  return isOpenRouter(key) ? "x-ai/grok-4" : "grok-4.5";
}

export function imageModel(key: string) {
  return isOpenRouter(key) ? "black-forest-labs/flux.2-pro" : "grok-imagine-image";
}

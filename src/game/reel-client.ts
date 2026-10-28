import type { ReelInput, ReelResult } from "./reel-engine";

type Complete = Extract<ReelResult, { status: "done" }>;
type Api = {
  start: (input: ReelInput) => Promise<ReelResult>;
  pull: (requestId: string) => Promise<ReelResult>;
  active: () => boolean;
  progress: (phase: string) => void;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
};

function requestWithin<T>(request: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  return Promise.race([
    request,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("Filming connection timed out.")), 50_000);
    }),
  ]).finally(() => clearTimeout(timer));
}

// Transport errors and client deadlines also retain the portrait. Never retry
// a timed-out POST: the provider may already have accepted the paid request.
export async function filmMoment(input: ReelInput, api: Api): Promise<Complete | null> {
  const now = api.now ?? Date.now;
  const sleep =
    api.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const deadline = now() + 420_000;
  try {
    let result = await requestWithin(api.start(input));
    for (let step = 0; step < 240 && now() < deadline; step += 1) {
      if (!api.active()) return null;
      if (!result.ok) throw new Error(result.error);
      if (result.status === "done") return result;
      api.progress(result.phase);
      await sleep(result.retryAfterMs);
      if (!api.active()) return null;
      result = await requestWithin(api.pull(result.requestId));
    }
  } catch {
    // The original portrait is already on the device; no server is needed.
  }
  if (!api.active()) return null;
  return {
    ok: true,
    status: "done",
    media: input.portrait,
    mime: input.portrait.slice(5, input.portrait.indexOf(";")),
    note: "Filming could not finish. Your Homie’s original portrait was kept as an animated still.",
  };
}

export function parseReelFrames(stored: string): string[] {
  try {
    // IndexedDB/cloud blobs contain decoded JSON. Accept old data-URL exports too.
    const json = stored.startsWith("data:application/x-homie-frames")
      ? atob(stored.split(",")[1] ?? "")
      : stored;
    const rows: unknown = JSON.parse(json);
    return Array.isArray(rows)
      ? rows
          .filter(
            (row): row is string =>
              typeof row === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(row),
          )
          .slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

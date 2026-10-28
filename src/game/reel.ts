import { createServerFn } from "@tanstack/react-start";
import type { ReelResult } from "./reel-engine";

export type StartReelResult = ReelResult;
export type PullReelResult = ReelResult;

export const startReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<StartReelResult> => {
    const { beginReel } = await import("./reel-engine");
    try {
      return beginReel(data, process.env.XAI_API_KEY);
    } catch {
      return {
        ok: false,
        error: "Use a JPEG, PNG or WebP portrait and a home description before filming.",
      };
    }
  });

export const pullReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const requestId = (input as { requestId?: unknown } | null)?.requestId;
    if (typeof requestId !== "string" || requestId.length > 3_500_080)
      throw new Error("Invalid moment.");
    return { requestId };
  })
  .handler(async ({ data }): Promise<PullReelResult> => {
    const { advanceReel } = await import("./reel-engine");
    const { framesToGif, videoToGif } = await import("./reel-media");
    return advanceReel(data.requestId, process.env.XAI_API_KEY, { framesToGif, videoToGif });
  });

import { createServerFn } from "@tanstack/react-start";
import type { Stage } from "./types";
import { STAGES } from "./types";

function row(input: unknown) {
  return (input ?? {}) as Record<string, unknown>;
}

function keeperOf(input: unknown) {
  const value = row(input).keeperId;
  return typeof value === "string" ? value : "";
}

export const pullCloud = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ keeperId: keeperOf(input) }))
  .handler(async ({ data }) => {
    const { pullKeeper } = await import("./cloud.server");
    return pullKeeper(data.keeperId);
  });

export const pushCloudHomie = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const body = row(input);
    const stage = STAGES.includes(body.stage as Stage) ? (body.stage as Stage) : "adult";
    return {
      keeperId: typeof body.keeperId === "string" ? body.keeperId : "",
      id: typeof body.id === "string" ? body.id : "",
      stage,
      profile: body.profile ?? null,
    };
  })
  .handler(async ({ data }) => {
    const { pushHomie } = await import("./cloud.server");
    return pushHomie(data);
  });

export const dropCloudHomie = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const body = row(input);
    return {
      keeperId: keeperOf(input),
      id: typeof body.id === "string" ? body.id : "",
    };
  })
  .handler(async ({ data }) => {
    const { dropHomie } = await import("./cloud.server");
    return dropHomie(data.keeperId, data.id);
  });

export const dropCloudShelf = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ keeperId: keeperOf(input) }))
  .handler(async ({ data }) => {
    const { dropKeeper } = await import("./cloud.server");
    return dropKeeper(data.keeperId);
  });

export const pushCloudReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const body = row(input);
    return {
      keeperId: keeperOf(input),
      homieId: typeof body.homieId === "string" ? body.homieId : "",
      id: typeof body.id === "string" ? body.id : "",
      caption: typeof body.caption === "string" ? body.caption.slice(0, 80) : "",
      media: typeof body.media === "string" ? body.media : "",
    };
  })
  .handler(async ({ data }) => {
    const { pushReel } = await import("./cloud.server");
    return pushReel(data);
  });

export const dropCloudReel = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const body = row(input);
    return {
      keeperId: keeperOf(input),
      id: typeof body.id === "string" ? body.id : "",
    };
  })
  .handler(async ({ data }) => {
    const { dropReel } = await import("./cloud.server");
    return dropReel(data.keeperId, data.id);
  });

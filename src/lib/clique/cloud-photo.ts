import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { CliqueCloudStatus, UploadCliquePhotoResult } from "./cloud-config";

/**
 * Thin RPC wrappers. All logic and every secret live in
 * cloud-photo.server.ts, loaded dynamically inside the handlers so none
 * of it can reach the browser bundle (the game/cloud.ts pattern).
 */

export const getCliqueCloudStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async (): Promise<CliqueCloudStatus> => {
    const { cliqueCloudStatus } = await import("./cloud-photo.server");
    return cliqueCloudStatus();
  });

export const uploadCliquePhoto = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const body = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return {
      dataUrl: typeof body.dataUrl === "string" ? body.dataUrl : "",
      slot: typeof body.slot === "string" ? body.slot : "",
    };
  })
  .handler(async ({ data, context }): Promise<UploadCliquePhotoResult> => {
    const { uploadCliquePhotoForUser } = await import("./cloud-photo.server");
    return uploadCliquePhotoForUser(context.userId, data);
  });

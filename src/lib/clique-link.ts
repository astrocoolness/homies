import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

type LinkResult = { ok: true; status?: string } | { ok: false; error: string };

export const completeCliqueLink = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const body = input && typeof input === "object" ? input as Record<string, unknown> : {};
    const challenge = typeof body.challenge === "string" ? body.challenge : "";
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(challenge)) {
      throw new Error("Invalid Clique link challenge");
    }
    return { challenge };
  })
  .handler(async ({ data, context }): Promise<LinkResult> => {
    const externalSubject = context.userId;
    if (!externalSubject || externalSubject === "dev-user") {
      return { ok: false, error: "Sign in with a real account before linking to Clique." };
    }

    const secret = process.env.CLIQUE_LINK_SECRET?.trim();
    const configuredOrigin = process.env.CLIQUE_API_ORIGIN?.trim();
    if (!secret || !configuredOrigin) {
      return { ok: false, error: "Secure linking is not configured for this deployment yet." };
    }

    let origin: URL;
    try {
      origin = new URL(configuredOrigin);
    } catch {
      return { ok: false, error: "Clique API origin is misconfigured." };
    }
    if (
      (origin.protocol !== "https:" && origin.hostname !== "localhost" && origin.hostname !== "127.0.0.1") ||
      origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash
    ) {
      return { ok: false, error: "Clique API origin must be a trusted HTTPS origin." };
    }

    try {
      const response = await fetch(new URL("/api/clique/apps/homies/link/complete", origin), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clique-link-secret": secret,
        },
        body: JSON.stringify({ challenge: data.challenge, externalSubject }),
        signal: AbortSignal.timeout(8000),
      });
      const payload = await response.json().catch(() => ({})) as { result?: { status?: string }; error?: string };
      if (!response.ok) {
        return { ok: false, error: payload.error ?? "Clique could not verify this link. The challenge may have expired." };
      }
      return { ok: true, status: payload.result?.status ?? "linked" };
    } catch {
      return { ok: false, error: "Could not reach Clique. Please try again." };
    }
  });

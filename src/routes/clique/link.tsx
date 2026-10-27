import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ExternalLink, Link2, LoaderCircle, ShieldCheck } from "lucide-react";
import { completeCliqueLink } from "@/lib/clique-link";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/clique/link")({
  validateSearch: (search: Record<string, unknown>) => ({
    challenge: typeof search.challenge === "string" ? search.challenge : "",
    returnTo: typeof search.returnTo === "string" ? search.returnTo : "",
  }),
  component: CliqueLinkPage,
});

function safeReturnTo(value: string, appKey: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const allowedHost =
      host === "rva.guru" ||
      host === "www.rva.guru";
    if (url.protocol !== "https:" || !allowedHost || url.pathname !== "/clique/apps" || url.searchParams.get("linked") !== appKey) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function CliqueLinkPage() {
  const { challenge, returnTo } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [linkStatus, setLinkStatus] = useState("linked");
  const validChallenge = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(challenge);
  const safeReturn = safeReturnTo(returnTo, "homies");

  async function confirmLink() {
    setBusy(true);
    setError("");
    try {
      const result = await completeCliqueLink({ data: { challenge } });
      if (!result.ok) throw new Error(result.error);
      setLinkStatus(result.status ?? "linked");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not link this account.");
    } finally {
      setBusy(false);
    }
  }

  const callbackURL = "/clique/link?challenge=" + encodeURIComponent(challenge) + "&returnTo=" + encodeURIComponent(returnTo);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-950 px-4 py-10 text-neutral-100">
      <section className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl sm:p-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100"><ArrowLeft className="h-4 w-4" /> Back to Homies</a>
        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800"><Link2 className="h-6 w-6" /></div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">RVA.GURU · Clique</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Link Homies to Clique</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-300">This links the account you are signed into here with the Clique profile that started this short-lived challenge. No email matching or account merging is used.</p>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <p className="text-sm leading-6 text-neutral-400">Your account ID is sent server-to-server after you confirm. The link challenge expires after ten minutes and can only be used once.</p>
        </div>
        {!validChallenge ? <p role="alert" className="mt-5 text-sm text-red-300">This link challenge is invalid. Return to Clique and start a new link.</p>
        : isPending ? <p className="mt-5 flex items-center gap-2 text-sm text-neutral-400"><LoaderCircle className="h-4 w-4 animate-spin" /> Checking your session…</p>
        : done ? <div className="mt-6 space-y-4"><p role="status" className="flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-5 w-5" /> {linkStatus === "already_linked" ? "This account is already linked to your Clique profile." : "Account linked successfully."}</p>{safeReturn ? <a href={safeReturn} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-neutral-950">Return to Clique <ExternalLink className="h-4 w-4" /></a> : <p className="text-sm text-neutral-400">You can return to the Clique tab you opened this link from.</p>}</div>
        : !user ? <div className="mt-6 space-y-3"><p className="text-sm text-amber-200">Sign in to Homies first. Then confirm which account to connect.</p>{GROK_PROVIDERS.map((provider) => <button key={provider.providerId} type="button" onClick={() => signIn(provider.providerId, { callbackURL })} className="w-full rounded-full border border-neutral-700 px-4 py-3 text-sm font-semibold hover:bg-neutral-800">Continue with {provider.label}</button>)}</div>
        : user.isDevFallback ? <p className="mt-5 text-sm text-amber-200">This app is using a development fallback identity. Secure linking is disabled until real sign-in is configured.</p>
        : <div className="mt-6 space-y-4"><div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4"><p className="text-xs uppercase tracking-wider text-neutral-500">You are linking</p><p className="mt-1 font-semibold">{user.displayName || "Signed-in account"}</p><p className="mt-1 text-sm text-neutral-400">Account ID: {user.id.slice(0, 8)}…</p></div><button type="button" onClick={confirmLink} disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-neutral-950 disabled:opacity-60">{busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />} Confirm link</button></div>}
        {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      </section>
    </main>
  );
}

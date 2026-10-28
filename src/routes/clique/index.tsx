import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Link2, MessagesSquare, Sparkles, UserRound } from "lucide-react";
import { LocalProfilePhoto } from "@/components/clique/LocalProfilePhoto";
import { CliqueCloudStatus } from "@/components/clique/CliqueCloudStatus";

export const Route = createFileRoute("/clique/")({
  component: CliqueHubPage,
});

/**
 * Clique hub — the unified home for the HOMIES × FLYSPACE × DIAL system.
 * Homies characters are created and raised here; each saved Homie publishes
 * a Flyspace profile through the typed sync contract; Dial carries the
 * stat-aware conversations. Account linking to the wider Clique platform
 * lives at /clique/link.
 */
function CliqueHubPage() {
  return (
    <main className="min-h-dvh bg-neutral-950 px-4 py-10 text-neutral-100">
      <section className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">RVA.GURU · Clique</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Your clique, all in one place</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-300">
          Raise Homies, publish them to Flyspace profiles you actually control, and talk to them in
          Dial — where how they answer depends on who they are and how they're feeling.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/"
            className="rounded-3xl border border-neutral-800 bg-neutral-900 p-5 transition hover:bg-neutral-800"
          >
            <Home className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 font-semibold">Homies</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-400">
              Hatch, feed, and raise your characters. A photo makes a custom Homie — Surprise Me is
              a separate, random one, only when you ask for it.
            </p>
          </Link>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-5">
            <UserRound className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 font-semibold">Flyspace profiles</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-400">
              Every saved Homie can publish a Flyspace profile — avatar, bio, interests, media, and
              animations — and your own edits there are never overwritten by a sync.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-5">
            <MessagesSquare className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 font-semibold">Dial</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-400">
              Chat with your Homies. A hungry or drained Homie answers like one — personality and
              stats shape every reply.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-neutral-800 bg-neutral-900 p-5">
          <h2 className="font-semibold">Your Flyspace photo</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-neutral-400">
            Uploads are validated on the spot (real JPG/PNG/WebP, under 10 MB) and stored on this
            device for free — no account, no server. Uploading a photo never starts Surprise Me.
          </p>
          <div className="mt-4">
            <LocalProfilePhoto />
          </div>
          <div className="mt-4 border-t border-neutral-800 pt-4">
            <CliqueCloudStatus />
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/clique/link"
            search={{ challenge: "", returnTo: "" }}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-neutral-950"
          >
            <Link2 className="h-4 w-4" /> Link your Clique account
          </Link>
          <span className="inline-flex items-center gap-2 text-sm text-neutral-400">
            <Sparkles className="h-4 w-4 text-cyan-300" /> Photo uploads and Surprise Me are always
            separate actions.
          </span>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";
import { getCliqueCloudStatus } from "@/lib/clique/cloud-photo";
import type { CliqueCloudStatus as Status } from "@/lib/clique/cloud-config";

/** Live connection status for Clique's two free cloud backends. Booleans only — the server never sends config values or secrets. */
export function CliqueCloudStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    getCliqueCloudStatus()
      .then((s) => {
        if (live) setStatus(s);
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, []);

  const chip = (label: string, on: boolean | undefined) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
        on ? "border-emerald-700 text-emerald-300" : "border-neutral-700 text-neutral-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-emerald-400" : "bg-neutral-500"}`} />
      {label}: {on ? "connected" : "not connected"}
    </span>
  );

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {failed ? (
        <span className="text-xs text-neutral-400">Cloud status unavailable — sign-in may be required.</span>
      ) : status === null ? (
        <span className="text-xs text-neutral-400">Checking cloud connections…</span>
      ) : (
        <>
          {chip("Supabase", status.supabase)}
          {chip("Cloudflare R2", status.r2)}
          {!status.supabase && !status.r2 && (
            <span className="text-xs text-neutral-400">
              Photos stay on this device until a backend is connected.
            </span>
          )}
        </>
      )}
    </div>
  );
}

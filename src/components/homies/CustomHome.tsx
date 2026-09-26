import { useEffect, useRef, useState } from "react";
import { Film } from "lucide-react";
import { pullReel, startReel } from "@/game/reel";
import { dataUrlToBlob, dropReel, listReels, putReel, type SavedReel } from "@/game/reels";
import { forgetCloudReel, publishReel } from "@/game/cloud-sync";
import { useHomies } from "@/game/store";

const CAP = 3;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CustomHome({ id, dirt }: { id: string; dirt: number }) {
  const homie = useHomies((s) => s.save.homies[id]);
  const profile = homie?.profile;
  const [reels, setReels] = useState<SavedReel[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "room" | "film">("idle");
  const [error, setError] = useState<string | null>(null);
  const token = useRef(0);

  useEffect(() => {
    const mine = token.current;
    return () => {
      if (token.current === mine) token.current += 1;
    };
  }, [id]);

  useEffect(() => {
    let live = true;
    void listReels(id).then((rows) => {
      if (!live) return;
      setReels(rows);
      setPicked(rows[0]?.id ?? null);
    });
    return () => {
      live = false;
    };
  }, [id]);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const reel of reels) next[reel.id] = URL.createObjectURL(reel.blob);
    setUrls(next);
    return () => {
      for (const url of Object.values(next)) URL.revokeObjectURL(url);
    };
  }, [reels]);

  if (!profile || !homie || homie.hatchedAt == null) return null;
  const sheet = profile;

  const featured = reels.find((reel) => reel.id === picked) ?? reels[0];
  const featuredUrl = featured ? urls[featured.id] : null;
  const full = reels.length >= CAP;

  async function film() {
    if (phase !== "idle" || full) return;
    const mine = token.current;
    setError(null);
    setPhase("room");
    try {
      const started = await startReel({
        data: {
          portrait: sheet.portrait,
          name: sheet.name,
          setting: `${sheet.homeTitle}. ${sheet.homeLine} Days: ${sheet.job}`,
        },
      });
      if (!started.ok) {
        if (token.current === mine) {
          setError(started.error);
          setPhase("idle");
        }
        return;
      }
      if (token.current === mine) setPhase("film");
      for (let i = 0; i < 24; i += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 4000));
        const pulled = await pullReel({ data: { requestId: started.requestId } });
        if (!pulled.ok) {
          if (token.current === mine) {
            setError(pulled.error);
            setPhase("idle");
          }
          return;
        }
        if (pulled.status === "pending") continue;
        const reel: SavedReel = {
          id: `r${Date.now().toString(36)}`,
          homieId: id,
          caption: sheet.homeTitle,
          at: Date.now(),
          mime: pulled.mime,
          blob: dataUrlToBlob(pulled.media),
        };
        await putReel(reel);
        void publishReel(reel);
        if (token.current !== mine) return;
        const rows = await listReels(id);
        setReels(rows);
        setPicked(reel.id);
        setPhase("idle");
        return;
      }
      if (token.current !== mine) return;
      setError("The filming ran long. Try once more.");
      setPhase("idle");
    } catch {
      if (token.current !== mine) return;
      setError("That didn't work. Try once more.");
      setPhase("idle");
    }
  }

  async function remove(reelId: string) {
    await dropReel(reelId);
    void forgetCloudReel(reelId);
    const rows = await listReels(id);
    setReels(rows);
    setPicked(rows[0]?.id ?? null);
  }

  function keepCopy(reel: SavedReel) {
    const url = URL.createObjectURL(reel.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sheet.name}-moment.${reel.mime === "image/gif" ? "gif" : "mp4"}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-cream-2">
        {featured && featuredUrl ? (
          featured.mime.startsWith("video/") ? (
            <video
              key={featured.id}
              src={featuredUrl}
              className="aspect-[4/3] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img key={featured.id} src={featuredUrl} alt={featured.caption} className="aspect-[4/3] w-full object-cover" />
          )
        ) : (
          <div className="flex aspect-[4/3] items-end p-3">
            <img src={sheet.portrait} alt="" className="h-36 w-36 object-contain" />
          </div>
        )}
        {dirt > 0.05 && <div className="grime pointer-events-none absolute inset-0" style={{ opacity: dirt }} />}
      </div>
      {reels.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {reels.map((reel) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => setPicked(reel.id)}
              aria-pressed={reel.id === featured?.id}
              className={cx(
                "h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-2",
                reel.id === featured?.id && "ring-2 ring-tomato",
              )}
            >
              {urls[reel.id] && reel.mime.startsWith("video/") ? (
                <video src={urls[reel.id]} muted playsInline className="h-full w-full object-cover" />
              ) : (
                urls[reel.id] && <img src={urls[reel.id]} alt="" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => void film()}
          disabled={phase !== "idle" || full}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-tomato font-display text-lg text-paper disabled:opacity-50"
        >
          <Film className="size-4" aria-hidden />
          {phase === "room" ? "Putting them in the room..." : phase === "film" ? "Filming..." : full ? "Three moments saved" : "Film them at home"}
        </button>
        {featured && (
          <div className="flex justify-between">
            <button type="button" onClick={() => keepCopy(featured)} className="min-h-11 font-display text-sm text-ink-soft">
              Save a copy
            </button>
            <button type="button" onClick={() => void remove(featured.id)} className="min-h-11 font-display text-sm text-ink-soft">
              Let this one go
            </button>
          </div>
        )}
        {error && <p className="text-pretty text-sm text-tomato">{error}</p>}
        {!featured && !error && phase === "idle" && (
          <p className="text-sm text-ink-soft">One short loop, in their room. It stays on this phone.</p>
        )}
      </div>
    </div>
  );
}

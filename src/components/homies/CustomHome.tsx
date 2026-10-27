import { useEffect, useRef, useState } from "react";
import { Film } from "lucide-react";
import { portraitSrc, roomOf } from "@/game/content";
import { pullReel, startReel } from "@/game/reel";
import { dataUrlToBlob, dropReel, listReels, putReel, type SavedReel } from "@/game/reels";
import { forgetCloudReel, publishReel } from "@/game/cloud-sync";
import { useHomies } from "@/game/store";

const CAP = 3;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

async function filmPortrait(src: string) {
  if (src.startsWith("data:image/") || src.startsWith("https://")) return src;
  const res = await fetch(src);
  if (!res.ok) throw new Error("portrait");
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("portrait"));
    reader.readAsDataURL(blob);
  });
}

async function mediaToBlob(media: string, mime: string): Promise<Blob> {
  if (media.startsWith("data:")) return dataUrlToBlob(media);
  const res = await fetch(media);
  if (!res.ok) throw new Error("fetch");
  return await res.blob();
}

function parseFrames(media: string): string[] {
  try {
    if (!media.startsWith("data:application/x-homie-frames")) return [];
    const b64 = media.split(",")[1] ?? "";
    const json = atob(b64);
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function CustomHome({ id, dirt }: { id: string; dirt: number }) {
  const homie = useHomies((s) => s.save.homies[id]);
  const profile = homie?.profile;
  const [reels, setReels] = useState<SavedReel[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "room" | "film">("idle");
  const [error, setError] = useState<string | null>(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [currentFrameUrl, setCurrentFrameUrl] = useState<string | null>(null);
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

  const featured = reels.find((reel) => reel.id === picked) ?? reels[0];
  const featuredUrl = featured ? urls[featured.id] : null;
  const isFrames = featured?.mime === "application/x-homie-frames";

  useEffect(() => {
    if (!isFrames || !featuredUrl) {
      setCurrentFrameUrl(null);
      setFrameIdx(0);
      return;
    }
    let cancelled = false;
    let frames: string[] = [];
    void fetch(featuredUrl)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        frames = parseFrames(text);
        setCurrentFrameUrl(frames[0] ?? null);
      })
      .catch(() => {});
    const timer = window.setInterval(() => {
      setFrameIdx((i) => {
        const next = frames.length ? (i + 1) % frames.length : 0;
        setCurrentFrameUrl(frames[next] ?? frames[0] ?? null);
        return next;
      });
    }, 320);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [isFrames, featuredUrl]);

  if (!profile || !homie || homie.hatchedAt == null) return null;
  const sheet = profile;
  const still = portraitSrc(id, homie.stage);
  const room = roomOf(id);
  const full = reels.length >= CAP;

  async function film() {
    if (phase !== "idle" || full) return;
    const mine = token.current;
    setError(null);
    setPhase("room");
    try {
      const started = await startReel({
        data: {
          portrait: await filmPortrait(still),
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
      for (let i = 0; i < 30; i += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 3000));
        const pulled = await pullReel({ data: { requestId: started.requestId } });
        if (!pulled.ok) {
          if (token.current === mine) {
            setError(pulled.error);
            setPhase("idle");
          }
          return;
        }
        if (pulled.status === "pending") continue;
        const blob = await mediaToBlob(pulled.media, pulled.mime);
        const reel: SavedReel = {
          id: `r${Date.now().toString(36)}`,
          homieId: id,
          caption: sheet.homeTitle,
          at: Date.now(),
          mime: pulled.mime,
          blob,
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
    link.download = `${sheet.name}-moment.${reel.mime === "image/gif" ? "gif" : reel.mime.startsWith("video/") ? "mp4" : reel.mime === "application/x-homie-frames" ? "frames" : "jpg"}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const isVideo = featured?.mime.startsWith("video/");
  const isGif = featured?.mime.includes("gif");
  const isStill = featured && !isVideo && !isGif && !isFrames;

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-cream-2">
        {featured && featuredUrl ? (
          isVideo ? (
            <video
              key={featured.id}
              src={featuredUrl}
              className="aspect-[4/3] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : isFrames && currentFrameUrl ? (
            <img
              key={`${featured.id}-${frameIdx}`}
              src={currentFrameUrl}
              alt={featured.caption}
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            <img
              key={featured.id}
              src={featuredUrl}
              alt={featured.caption}
              className={cx(
                "aspect-[4/3] w-full object-cover",
                isStill && "homie-moment-still",
              )}
            />
          )
        ) : room ? (
          <>
            <img src={room} alt="" className="aspect-[4/3] w-full object-cover" />
            <img src={still} alt="" className="absolute bottom-2 left-2 h-20 w-20 object-contain drop-shadow-md" />
          </>
        ) : (
          <div className="flex aspect-[4/3] items-end p-3">
            <img src={still} alt="" className="h-36 w-36 object-contain" />
          </div>
        )}
        {isStill && featured && (
          <span className="absolute left-2 top-2 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white">
            Animated still
          </span>
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
          {phase === "room" ? "Putting them in the room..." : phase === "film" ? "Filming..." : full ? "Three moments saved" : "Film a 10-second moment"}
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
          <p className="text-sm text-ink-soft">A short loop in their room. It stays on this phone.</p>
        )}
      </div>
      <style>{`
        @keyframes homie-moment-cinema {
          0% { transform: scale(1.04) translate(0.6%, 0.4%); }
          50% { transform: scale(1.09) translate(-0.8%, -1%); }
          100% { transform: scale(1.04) translate(-0.4%, 0.6%); }
        }
        .homie-moment-still {
          animation: homie-moment-cinema 16s ease-in-out infinite alternate;
          transform-origin: center;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .homie-moment-still {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

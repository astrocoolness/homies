import { useEffect, useState } from "react";
import {
  Activity,
  Battery,
  Cake,
  Gamepad2,
  Heart,
  House,
  MessageCircle,
  Moon,
  Pill,
  Pizza,
  Smile,
  Soup,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Tv,
  Utensils,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BIOS,
  EGG_SRC,
  FOODS,
  HOMES,
  NAMES,
  portraitSrc,
  roomSrc,
  STAGE_LABEL,
  traitPhrases,
} from "@/game/content";
import type { FoodIcon } from "@/game/content";
import { describe, lifeDayOf, STAGE_AT, ageHours } from "@/game/logic";
import { unlockAudio } from "@/game/sfx";
import { useHomies } from "@/game/store";
import type { HomieId, StatKey, View } from "@/game/types";
import { HOMIE_IDS, STAGES } from "@/game/types";

const FOOD_ICONS: Record<FoodIcon, LucideIcon> = {
  cake: Cake,
  utensils: Utensils,
  pizza: Pizza,
  soup: Soup,
  star: Star,
  battery: Battery,
  zap: Zap,
};

const METERS: { key: StatKey; label: string; icon: LucideIcon }[] = [
  { key: "hunger", label: "Hunger", icon: Utensils },
  { key: "rest", label: "Sleep", icon: Moon },
  { key: "happiness", label: "Happiness", icon: Smile },
  { key: "cleanliness", label: "Clean", icon: Sparkles },
  { key: "energy", label: "Energy", icon: Zap },
  { key: "fun", label: "Fun", icon: Gamepad2 },
  { key: "affection", label: "Affection", icon: Heart },
  { key: "health", label: "Health", icon: Activity },
];

const VIEWS: { id: View; label: string; icon: LucideIcon }[] = [
  { id: "care", label: "Care", icon: Heart },
  { id: "episode", label: "Episode", icon: Tv },
  { id: "home", label: "Home", icon: House },
  { id: "life", label: "Life", icon: Sprout },
];

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function HomiesApp() {
  const boot = useHomies((s) => s.boot);
  const catchUp = useHomies((s) => s.catchUp);

  useEffect(() => {
    boot();
  }, [boot]);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      catchUp();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    const onVis = () => {
      if (document.visibilityState === "visible") {
        unlockAudio();
        catchUp();
      }
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") catchUp();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("pointerdown", unlock);
    };
  }, [catchUp]);

  return (
    <main className="flex min-h-dvh justify-center bg-desk md:items-center md:py-6">
      <section className="flex h-dvh w-full max-w-[440px] flex-col bg-cream px-4 pt-4 pb-4 md:h-[min(900px,calc(100dvh-3rem))] md:rounded-[2rem] md:shadow-2xl">
        <Device />
      </section>
    </main>
  );
}

function Device() {
  const save = useHomies((s) => s.save);
  const view = useHomies((s) => s.view);
  const setView = useHomies((s) => s.setView);
  const toggleMute = useHomies((s) => s.toggleMute);
  const select = useHomies((s) => s.select);
  const recap = useHomies((s) => s.recap);
  const dismissRecap = useHomies((s) => s.dismissRecap);
  const id = save.activeId;
  const info = describe(save, id);
  const TimeIcon = info.clock.hour >= 6 && info.clock.hour < 19 ? Sun : Moon;

  return (
    <>
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-2xl leading-none text-ink">HOMIES</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft tabular-nums">
            <TimeIcon className="size-4 text-tomato" aria-hidden />
            {info.clock.label}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={save.muted ? "Unmute" : "Mute"}
          className="flex size-11 items-center justify-center rounded-full bg-paper text-ink"
        >
          {save.muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </header>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {HOMIE_IDS.map((hid) => {
          const homie = save.homies[hid];
          const hatched = homie.hatchedAt != null;
          const active = hid === id;
          return (
            <button
              key={hid}
              type="button"
              onClick={() => select(hid)}
              aria-pressed={active}
              className={cx(
                "flex min-h-16 flex-col items-center gap-1 rounded-2xl px-1 py-1.5",
                active ? "bg-paper ring-2 ring-tomato" : "bg-cream-2",
              )}
            >
              <img
                src={hatched ? portraitSrc(hid, homie.stage) : EGG_SRC}
                alt=""
                className="size-12 object-contain"
              />
              <span className="font-display text-sm leading-none text-ink">{NAMES[hid]}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto pb-2">
          {view === "care" && <CareView />}
          {view === "care" && save.homies[id].hatchedAt != null && <CareDock />}
          {view === "episode" && <EpisodeView />}
          {view === "home" && <HomeView />}
          {view === "life" && <LifeView />}
        </div>
        <nav className="mt-2 grid grid-cols-4 gap-1" aria-label="Sections">
          {VIEWS.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cx(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl font-display text-xs",
                  on ? "bg-paper text-ink" : "text-ink-soft",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
        {recap && recap.homieId === id && (
          <div className="absolute inset-0 z-20 flex items-end bg-ink/40 p-1 pb-16" role="dialog" aria-label={recap.title}>
            <div className="pop-in w-full rounded-3xl bg-paper p-5">
              <p className="text-sm text-ink-soft tabular-nums">{info.clock.label}</p>
              <h2 className="mt-1 font-display text-3xl text-balance text-ink">{recap.title}</h2>
              <ul className="mt-3 space-y-2">
                {recap.lines.map((line) => (
                  <li key={line} className="text-pretty text-ink">
                    {line}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={dismissRecap}
                className="mt-4 min-h-12 w-full rounded-2xl bg-tomato font-display text-lg text-paper"
              >
                I'm here
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function CareView() {
  const save = useHomies((s) => s.save);
  const hatch = useHomies((s) => s.hatch);
  const act = useHomies((s) => s.act);
  const joy = useHomies((s) => s.joy);
  const speech = useHomies((s) => s.speech);
  const setView = useHomies((s) => s.setView);
  const id = save.activeId;
  const homie = save.homies[id];
  const info = describe(save, id);

  if (homie.hatchedAt == null) {
    return (
      <div className="flex flex-col items-center px-2 pt-4 text-center">
        <img src={EGG_SRC} alt="" className="egg-wobble h-52 w-52 object-contain" />
        <h1 className="mt-2 font-display text-4xl text-ink">{NAMES[id]}</h1>
        <p className="mt-2 max-w-[18rem] text-pretty text-ink-soft">{BIOS[id]}</p>
        <button
          type="button"
          onClick={() => hatch(id)}
          className="mt-5 min-h-14 w-full rounded-2xl bg-tomato font-display text-xl text-paper"
        >
          Hatch {NAMES[id]}
        </button>
      </div>
    );
  }

  const low = homie.stats.health < 40 || homie.stats.hunger < 26 || homie.stats.affection < 28;
  const latest = [...save.log].reverse().find((entry) => entry.homieId === id);

  return (
    <div className="flex flex-col">
      <div className="relative flex justify-center pt-1">
        {speech && (
          <p className="pop-in absolute top-0 z-10 max-w-[16rem] rounded-2xl bg-paper px-3 py-2 text-center text-sm text-pretty text-ink shadow-sm">
            {speech}
          </p>
        )}
        <button
          type="button"
          onClick={() => act("talk")}
          aria-label={`Talk to ${NAMES[id]}`}
          className="mt-8"
        >
          <img
            key={`${id}-${homie.stage}-${joy}`}
            src={portraitSrc(id, homie.stage)}
            alt={`${NAMES[id]}, ${STAGE_LABEL[homie.stage]}`}
            className={cx(
              "h-48 w-48 object-contain",
              homie.sleeping ? "homie-bob-slow" : "homie-bob",
              homie.sick || homie.stats.health < 40 ? "mood-sick" : low ? "mood-low" : undefined,
            )}
          />
        </button>
      </div>
      <h1 className="text-center font-display text-4xl leading-none text-ink">{NAMES[id]}</h1>
      <p className="mt-1 text-center text-sm text-ink-soft">
        {STAGE_LABEL[homie.stage]} · Day {lifeDayOf(homie, save.gameMinute)}
      </p>
      <p className="mt-2 text-center font-display text-lg text-balance text-ink">{info.line}</p>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {METERS.map((meter) => (
          <Meter key={meter.key} label={meter.label} icon={meter.icon} value={homie.stats[meter.key]} />
        ))}
      </div>
      {latest && (
        <button
          type="button"
          onClick={() => setView("episode")}
          className="mt-3 rounded-2xl bg-paper px-3 py-3 text-left"
        >
          <span className="font-display text-xs tracking-wide text-ink-soft">Episode</span>
          <span className="mt-0.5 block text-pretty text-sm text-ink">{latest.text}</span>
        </button>
      )}
    </div>
  );
}

function Meter({ label, icon: Icon, value }: { label: string; icon: LucideIcon; value: number }) {
  const low = value < 28;
  const shown = Math.max(0, Math.min(100, value));
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-1 text-xs text-ink-soft">
        <Icon className={cx("size-3.5", low ? "text-tomato" : "text-sage")} aria-hidden />
        <span>{label}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-cream-2"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(shown)}
      >
        <div className={cx("h-full rounded-full", low ? "bg-tomato" : "bg-sage")} style={{ width: `${shown}%` }} />
      </div>
    </div>
  );
}

function CareDock() {
  const save = useHomies((s) => s.save);
  const feedOpen = useHomies((s) => s.feedOpen);
  const setFeed = useHomies((s) => s.setFeed);
  const act = useHomies((s) => s.act);
  const toast = useHomies((s) => s.toast);
  const id = save.activeId;
  const homie = save.homies[id];
  const asleep = homie.sleeping;
  const sick = homie.sick || homie.stats.health < 42;

  return (
    <div className="relative shrink-0 pt-2">
      {toast && (
        <p className="pointer-events-none absolute -top-9 right-0 left-0 text-center">
          <span className="pop-in inline-block max-w-full rounded-full bg-ink px-3 py-1 text-sm text-paper">{toast}</span>
        </p>
      )}
      {sick && !feedOpen && (
        <button
          type="button"
          onClick={() => act("medicine")}
          className="mb-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-tomato font-display text-paper"
        >
          <Pill className="size-4" aria-hidden />
          Give medicine
        </button>
      )}
      {feedOpen ? (
        <div className="grid gap-2">
          {FOODS[id].map((food) => {
            const Icon = FOOD_ICONS[food.icon];
            return (
              <button
                key={food.id}
                type="button"
                onClick={() => act("feed", food.id)}
                className="flex min-h-12 items-center gap-3 rounded-2xl bg-paper px-3 text-left"
              >
                <Icon className="size-5 shrink-0 text-tomato" aria-hidden />
                <span className="min-w-0">
                  <span className="block font-display text-ink">{food.name}</span>
                  <span className="block text-sm text-ink-soft">{food.blurb}</span>
                </span>
              </button>
            );
          })}
          <button type="button" onClick={() => setFeed(false)} className="min-h-11 font-display text-ink-soft">
            Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-2">
          <Act className="col-span-2" icon={Utensils} label="Feed" onClick={() => setFeed(true)} />
          <Act className="col-span-2" icon={Gamepad2} label="Play" onClick={() => act("play")} />
          <Act className="col-span-2" icon={Sparkles} label="Clean" onClick={() => act("clean")} />
          <Act className="col-span-3" icon={MessageCircle} label="Talk" onClick={() => act("talk")} />
          <Act
            className="col-span-3"
            icon={Moon}
            label={asleep ? "Wake" : id === "nori" ? "Dock" : "Sleep"}
            onClick={() => act(asleep ? "wake" : "sleep")}
          />
        </div>
      )}
    </div>
  );
}

function Act({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex min-h-12 w-full flex-col items-center justify-center gap-0.5 rounded-2xl bg-paper font-display text-sm text-ink active:scale-[0.98]",
        className,
      )}
    >
      <Icon className="size-4 text-tomato" aria-hidden />
      {label}
    </button>
  );
}

function EpisodeView() {
  const save = useHomies((s) => s.save);
  const id = save.activeId;
  const homie = save.homies[id];
  const entries = save.log.filter((entry) => entry.homieId === id);
  if (homie.hatchedAt == null || entries.length === 0) {
    return (
      <div className="px-1 pt-6">
        <h2 className="font-display text-3xl text-ink">{NAMES[id]}'s day</h2>
        <p className="mt-2 text-pretty text-ink-soft">Nothing yet. They keep living when you look away.</p>
      </div>
    );
  }
  const groups = new Map<number, typeof entries>();
  for (const entry of entries) {
    const day = lifeDayOf({ ...homie, hatchedAt: homie.hatchedAt }, entry.at);
    const list = groups.get(day) ?? [];
    list.push(entry);
    groups.set(day, list);
  }
  const days = [...groups.keys()].sort((a, b) => b - a);
  return (
    <div className="px-1 pt-2">
      <h2 className="font-display text-3xl text-balance text-ink">{NAMES[id]}'s day</h2>
      <div className="mt-3 space-y-4">
        {days.map((day) => (
          <section key={day}>
            <h3 className="font-display text-sm text-ink-soft">Day {day}</h3>
            <ul className="mt-1 space-y-2">
              {groups.get(day)!.map((entry) => (
                <li
                  key={entry.id}
                  className={cx(
                    "text-pretty",
                    entry.kind === "milestone" ? "border-l-2 border-tomato pl-2 font-display text-ink" : "",
                    entry.kind === "care" ? "text-ink-soft" : "text-ink",
                  )}
                >
                  {entry.text}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function HomeView() {
  const save = useHomies((s) => s.save);
  const id = save.activeId;
  const homie = save.homies[id];
  const home = HOMES[id];
  const dirt = homie.hatchedAt == null ? 0 : Math.max(0, (72 - homie.stats.cleanliness) / 100);
  return (
    <div className="pt-1">
      <div className="relative overflow-hidden rounded-3xl bg-cream-2">
        <img src={roomSrc(id)} alt={home.title} className="aspect-[4/3] w-full object-cover" />
        {dirt > 0.05 && <div className="grime absolute inset-0" style={{ opacity: dirt }} />}
        {homie.hatchedAt != null && (
          <img
            src={portraitSrc(id, homie.stage)}
            alt=""
            className="absolute bottom-2 left-2 h-20 w-20 object-contain drop-shadow-md"
          />
        )}
      </div>
      <h2 className="mt-3 font-display text-3xl text-ink">{home.title}</h2>
      <p className="mt-1 text-pretty text-ink">{home.line}</p>
      <p className="mt-2 text-pretty text-ink-soft">
        {homie.hatchedAt == null ? "Nobody lives here yet." : homie.stats.cleanliness < 45 ? home.messy : home.tidy}
      </p>
    </div>
  );
}

function LifeView() {
  const save = useHomies((s) => s.save);
  const reset = useHomies((s) => s.reset);
  const id = save.activeId;
  const homie = save.homies[id];
  const [armed, setArmed] = useState(false);
  const hours = ageHours(homie, save.gameMinute);
  const marks = save.milestones.filter((m) => m.homieId === id).slice().sort((a, b) => a.at - b.at);

  if (homie.hatchedAt == null) {
    return (
      <div className="pt-4">
        <h2 className="font-display text-3xl text-ink">{NAMES[id]}</h2>
        <p className="mt-2 text-pretty text-ink-soft">Still an egg. Hatch them and a life starts keeping score.</p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <h2 className="font-display text-3xl text-ink">
        Day {lifeDayOf(homie, save.gameMinute)}
      </h2>
      <p className="text-ink-soft">{STAGE_LABEL[homie.stage]}. They grow while you're gone.</p>
      <ol className="mt-4 flex items-center gap-1">
        {STAGES.map((stage, index) => {
          const reached = hours >= STAGE_AT[index].hours;
          const current = homie.stage === stage;
          return (
            <li key={stage} className="flex-1">
              <div className={cx("h-1.5 rounded-full", reached ? "bg-sage" : "bg-cream-2", current && "bg-tomato")} />
              <p className={cx("mt-1 text-center text-xs", current ? "font-display text-ink" : "text-ink-soft")}>
                {STAGE_LABEL[stage]}
              </p>
            </li>
          );
        })}
      </ol>
      <ul className="mt-4 divide-y divide-line rounded-2xl bg-paper px-3">
        {traitPhrases(homie.traits).map((phrase) => (
          <li key={phrase} className="py-2.5 text-ink">
            {phrase}
          </li>
        ))}
      </ul>
      <h3 className="mt-5 font-display text-lg text-ink">What they've lived</h3>
      <ul className="mt-2 space-y-2">
        {marks.map((mark) => (
          <li key={mark.id} className="flex gap-2 text-pretty text-ink">
            <span className="shrink-0 font-display text-sm text-ink-soft">Day {lifeDayOf(homie, mark.at)}</span>
            <span>{mark.title}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => (armed ? reset() : setArmed(true))}
        className="mt-8 min-h-11 text-sm text-ink-soft underline decoration-line underline-offset-4"
      >
        {armed ? "Really let them go?" : "Start over"}
      </button>
    </div>
  );
}

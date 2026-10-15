import { useMemo, useState } from "react";
import { Camera, Check, Clock3, Dice5, Music2, Sparkles, Users, X } from "lucide-react";

type Category = "auto" | "clean" | "car" | "food" | "help" | "medicine" | "dance" | "surprise";
type Mode = "teamwork" | "competition" | "comedy" | "roleplay";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "auto", label: "Let the photo decide" },
  { value: "clean", label: "Clean a room / tidy up" },
  { value: "car", label: "Wash or tidy a car" },
  { value: "food", label: "Make food together" },
  { value: "help", label: "Help a friend with a task" },
  { value: "medicine", label: "Medicine reminder / care support" },
  { value: "dance", label: "DJ while everyone dances" },
  { value: "surprise", label: "Surprise me" },
];

const MISSIONS: Record<Exclude<Category, "auto" | "surprise">, { title: string; goal: string; roles: string[]; twists: string[] }> = {
  clean: {
    title: "Room Rescue",
    goal: "Agree on three priorities, split the work, and make visible progress before the timer ends.",
    roles: ["Captain: chooses the first priority", "Organizer: sorts and tidies", "Hype DJ: picks the soundtrack", "Timekeeper: calls halfway and final-minute checks"],
    twists: ["Switch jobs halfway through", "Every player picks one tiny bonus task", "Pause halfway for a 20-second team huddle", "Finish with a dramatic before-and-after reveal"],
  },
  car: {
    title: "Operation Clean Machine",
    goal: "Choose safe, suitable cleaning jobs and work together to tidy the car.",
    roles: ["Captain: picks the task order", "Exterior crew: handles an agreed wash task", "Interior crew: tidies accessible items", "DJ / timekeeper: keeps the team moving"],
    twists: ["Swap roles at halfway", "Everyone names one satisfying detail to finish", "Choose a soundtrack for each phase", "End with a team inspection checklist"],
  },
  food: {
    title: "Kitchen Chaos",
    goal: "Choose a simple meal or snack, assign jobs, and prepare it together safely.",
    roles: ["Chef: leads the recipe", "Prep partner: handles suitable prep", "Table stylist: sets up the serving area", "DJ / timekeeper: manages the vibe and timer"],
    twists: ["Give the dish a ridiculous restaurant name", "Plate it like a cooking show finale", "Each player contributes one presentation idea", "Switch one non-safety-critical job halfway"],
  },
  help: {
    title: "Sidekick Mission",
    goal: "Ask your friend what help they actually want, agree on a goal, and complete it together.",
    roles: ["Mission owner: defines what would help", "Sidekick: assists with the chosen task", "Coach: offers encouragement", "Timekeeper: checks in, never rushes anyone"],
    twists: ["Take a short planning huddle first", "Celebrate one small milestone", "Swap helper roles only if everyone agrees", "Finish by asking what would make the result better"],
  },
  medicine: {
    title: "Care Companion",
    goal: "Offer a kind reminder and practical support that follows the person's existing care instructions.",
    roles: ["Care captain: asks what support is wanted", "Support buddy: fetches water or supplies if requested", "Reminder buddy: helps check the person's own instructions", "Comfort DJ: keeps the atmosphere calm if welcome"],
    twists: ["Choose a calming playlist", "Prepare a comfortable spot if wanted", "Check whether any practical help is needed", "Finish with a gentle check-in"],
  },
  dance: {
    title: "Dancefloor Director",
    goal: "Build a tiny group dance or freestyle round, changing the vibe when the music shifts.",
    roles: ["DJ: chooses the music", "Dance captain: starts a move", "Hype friend: cheers everyone on", "Director: picks the final pose"],
    twists: ["Switch genre halfway", "Invent a move named after the group", "Everyone contributes one move", "End with a 10-second group finale"],
  },
};

const SURPRISES: Exclude<Category, "auto" | "surprise">[] = ["clean", "food", "help", "dance", "car"];

export function SituationGame() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("auto");
  const [mode, setMode] = useState<Mode>("teamwork");
  const [players, setPlayers] = useState(3);
  const [minutes, setMinutes] = useState(10);
  const [chaos, setChaos] = useState(2);
  const [context, setContext] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [mission, setMission] = useState<{ category: Exclude<Category, "auto" | "surprise">; twist: string; seed: number } | null>(null);

  const current = useMemo(() => mission ? MISSIONS[mission.category] : null, [mission]);
  const roleList = useMemo(() => {
    if (!current) return [];
    const roles = current.roles.slice(0, Math.min(players, current.roles.length));
    if (players > roles.length) roles.push(...Array.from({ length: players - roles.length }, (_, i) => `Support player ${i + roles.length + 1}: choose a helpful role`));
    return roles;
  }, [current, players]);

  function generate() {
    const chosen = category === "surprise" || category === "auto"
      ? SURPRISES[Math.floor(Math.random() * SURPRISES.length)]
      : category;
    const data = MISSIONS[chosen];
    const twistPool = data.twists.slice(0, chaos === 1 ? 2 : data.twists.length);
    setMission({ category: chosen, twist: twistPool[Math.floor(Math.random() * twistPool.length)], seed: Date.now() });
  }

  function onPhoto(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) {
      setPhotoName("Please choose an image under 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === "string" ? reader.result : null);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open random situation game" className="fixed bottom-5 right-5 z-30 flex min-h-14 items-center gap-2 rounded-full bg-tomato px-5 font-display text-base text-paper shadow-xl ring-2 ring-paper/80">
        <Dice5 className="size-5" aria-hidden /> Play a situation
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="situation-title" className="flex max-h-[94dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl">
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-tomato">HOMIES · PARTY MODE</p>
                <h2 id="situation-title" className="mt-1 font-display text-2xl text-ink">Random Situation Lab</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close game" className="flex size-10 items-center justify-center rounded-full bg-paper text-ink"><X className="size-5" /></button>
            </header>
            <div className="min-h-0 overflow-y-auto px-5 py-4">
              <p className="text-sm leading-relaxed text-ink-soft">Turn a real-life photo into a playable mission. Upload a scene, add context, then assign roles and roll a random twist.</p>
              <label className="mt-4 flex min-h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-line bg-paper text-center">
                {photo ? <img src={photo} alt="Your uploaded situation" className="max-h-52 w-full object-contain" /> : <><Camera className="size-8 text-tomato" /><span className="mt-2 font-display text-lg text-ink">Add a situation photo</span><span className="text-xs text-ink-soft">JPG, PNG, WebP · max 10 MB</span></>}
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => onPhoto(event.currentTarget.files?.[0])} />
              </label>
              {photoName && <p className="mt-1 text-xs text-ink-soft">{photoName}</p>}
              <label className="mt-4 block text-sm font-extrabold text-ink" htmlFor="situation-context">What's going on? <span className="font-normal text-ink-soft">(optional)</span></label>
              <textarea id="situation-context" value={context} onChange={(event) => setContext(event.target.value)} placeholder="e.g. We have 15 minutes to tidy the living room before guests arrive…" rows={3} className="mt-2 w-full resize-y rounded-2xl border border-line bg-paper p-3 text-sm text-ink outline-none focus:ring-2 focus:ring-tomato" />
              <label className="mt-4 block text-sm font-extrabold text-ink" htmlFor="situation-category">Situation type</label>
              <select id="situation-category" value={category} onChange={(event) => setCategory(event.target.value as Category)} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-3 text-ink">
                {CATEGORIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm font-extrabold text-ink">Players
                  <select value={players} onChange={(event) => setPlayers(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-3 font-normal">
                    {[2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} friends</option>)}
                  </select>
                </label>
                <label className="text-sm font-extrabold text-ink">Time limit
                  <select value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-3 font-normal">
                    {[5, 10, 15, 20, 30].map((n) => <option key={n} value={n}>{n} minutes</option>)}
                  </select>
                </label>
              </div>
              <label className="mt-4 block text-sm font-extrabold text-ink" htmlFor="situation-mode">Play style</label>
              <select id="situation-mode" value={mode} onChange={(event) => setMode(event.target.value as Mode)} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-3 text-ink">
                <option value="teamwork">Teamwork — win together</option><option value="competition">Competition — score points</option><option value="comedy">Comedy — silly twists</option><option value="roleplay">Roleplay — act out a story</option>
              </select>
              <label className="mt-4 block text-sm font-extrabold text-ink" htmlFor="situation-chaos">Randomness: {["Chill", "Playful", "Chaotic", "Wild"][chaos - 1]}</label>
              <input id="situation-chaos" type="range" min="1" max="4" value={chaos} onChange={(event) => setChaos(Number(event.target.value))} className="mt-2 w-full accent-tomato" />
              <button type="button" onClick={generate} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-tomato font-display text-xl text-paper"><Sparkles className="size-5" /> Generate mission</button>
              {current && mission && (
                <article className="mt-5 rounded-3xl border border-line bg-paper p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="text-xs font-extrabold uppercase tracking-widest text-tomato">YOUR MISSION</p><h3 className="mt-1 font-display text-3xl text-ink">{current.title}</h3></div>
                    <span className="rounded-full bg-cream px-3 py-1 text-xs font-extrabold text-ink">{minutes} min</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{current.goal}</p>
                  {context.trim() && <p className="mt-2 rounded-xl bg-cream p-3 text-sm text-ink-soft"><strong>Context:</strong> {context.trim()}</p>}
                  {photo && <div className="mt-3 flex items-center gap-2 text-xs text-sage"><Check className="size-4" /> Photo attached to this local mission</div>}
                  <div className="mt-4 flex items-center gap-2 font-display text-lg text-ink"><Users className="size-5 text-tomato" /> Roles</div>
                  <ul className="mt-2 space-y-2">{roleList.map((role, i) => <li key={role} className="flex gap-2 text-sm text-ink"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-extrabold">{i + 1}</span><span>{role}</span></li>)}</ul>
                  <div className="mt-4 rounded-2xl bg-cream p-3"><p className="flex items-center gap-2 font-display text-lg text-ink"><Dice5 className="size-5 text-tomato" /> Random twist</p><p className="mt-1 text-sm text-ink">{mission.twist}</p></div>
                  {mode === "competition" ? <p className="mt-3 text-sm text-ink-soft">Scoring: award one point for teamwork, creativity, and completing the agreed goal. Keep tasks voluntary and safe.</p> : mode === "comedy" ? <p className="mt-3 text-sm text-ink-soft">Comedy mode: narrate the mission like a dramatic reality show; anyone can skip a bit that feels uncomfortable.</p> : mode === "roleplay" ? <p className="mt-3 text-sm text-ink-soft">Roleplay mode: stay in character while completing the agreed task. Real-world safety always beats the story.</p> : <p className="mt-3 text-sm text-ink-soft">Teamwork mode: win together by completing the agreed goal and checking that everyone is happy with their role.</p>}
                  {mission.category === "medicine" && <p className="mt-3 rounded-xl border border-line p-3 text-xs text-ink-soft">Care reminder: never invent a dose or change medication instructions. Follow the person's existing directions and ask a qualified professional if unsure.</p>}
                  <button type="button" onClick={generate} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-line font-display text-lg text-ink"><Dice5 className="size-4" /> Roll another twist</button>
                </article>
              )}
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft"><Clock3 className="mt-0.5 size-4 shrink-0" /> Missions are generated in your browser in this first version. The photo is previewed locally and isn't uploaded to a server or analyzed by AI yet. For care or mobility tasks, ask first and keep participation voluntary.</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-ink-soft"><Music2 className="size-4" /> Bring your own playlist for music missions.</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

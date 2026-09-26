import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { bioOf, isBuiltin, nameOf } from "@/game/content";
import { idsOf } from "@/game/logic";
import { mintHomie } from "@/game/mint";
import { DESCRIPTORS } from "@/game/sheet";
import { useHomies } from "@/game/store";
import type { CustomProfile, Stage } from "@/game/types";
import { STAGES } from "@/game/types";

const STAGE_WORD: Record<Stage, string> = {
  baby: "Baby",
  kid: "Kid",
  teen: "Teen",
  adult: "Adult",
  elder: "Elder",
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

async function fitPhoto(file: File, max: number, quality: number) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("photo"));
    reader.readAsDataURL(file);
  });
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("photo"));
    img.src = dataUrl;
  });
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

export function SettingsSheet({
  creating,
  onClose,
  onCreate,
  onList,
}: {
  creating: boolean;
  onClose: () => void;
  onCreate: () => void;
  onList: () => void;
}) {
  const save = useHomies((s) => s.save);
  const release = useHomies((s) => s.release);
  const adopt = useHomies((s) => s.adopt);
  const [confirm, setConfirm] = useState<string | null>(null);
  const made = idsOf(save).filter((id) => id.startsWith("c")).length;

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-cream px-4 pt-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl text-ink">{creating ? "New Homie" : "Settings"}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="flex size-11 items-center justify-center rounded-full bg-paper text-ink"
        >
          <X className="size-5" />
        </button>
      </div>
      {creating ? (
        <Maker
          full={made >= 4}
          neighbors={idsOf(save)
            .filter((id) => save.homies[id].hatchedAt != null)
            .map((id) => nameOf(id))}
          onDone={(profile, stage) => {
            adopt(profile, stage);
            onClose();
          }}
          onBack={onList}
        />
      ) : (
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          <button
            type="button"
            onClick={onCreate}
            disabled={made >= 4}
            className="min-h-12 w-full rounded-2xl bg-tomato font-display text-lg text-paper disabled:opacity-50"
          >
            {made >= 4 ? "The house is full" : "Make a Homie"}
          </button>
          <p className="mt-2 text-sm text-ink-soft">
            Traits, a life, and a photo. They move in and keep living here.
          </p>
          <ul className="mt-4 space-y-2">
            {idsOf(save).map((id) => {
              const homie = save.homies[id];
              return (
                <li key={id} className="rounded-2xl bg-paper px-3 py-3">
                  <p className="font-display text-lg text-ink">{nameOf(id)}</p>
                  <p className="text-sm text-pretty text-ink-soft">{bioOf(id)}</p>
                  {!isBuiltin(id) && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm === id) {
                          release(id);
                          setConfirm(null);
                        } else setConfirm(id);
                      }}
                      className="mt-2 min-h-11 text-sm text-ink-soft underline decoration-line underline-offset-4"
                    >
                      {confirm === id ? `Let ${nameOf(id)} go?` : "Let them go"}
                    </button>
                  )}
                  {homie.hatchedAt == null && <p className="mt-1 text-sm text-ink-soft">Still an egg.</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Maker({
  full,
  neighbors,
  onDone,
  onBack,
}: {
  full: boolean;
  neighbors: string[];
  onDone: (profile: CustomProfile, stage: Stage) => void;
  onBack: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [home, setHome] = useState("");
  const [days, setDays] = useState("");
  const [habit, setHabit] = useState("");
  const [stage, setStage] = useState<Stage>("adult");
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(trait: string) {
    setPicked((current) => {
      if (current.includes(trait)) return current.filter((item) => item !== trait);
      if (current.length >= 5) return current;
      return [...current, trait];
    });
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Use a JPG or PNG.");
      return;
    }
    try {
      const fitted = await fitPhoto(file, 768, 0.82);
      setPhoto(fitted);
      setError(null);
    } catch {
      setError("That photo didn't open. Try a JPG or PNG.");
    }
  }

  async function make() {
    if (full || busy) return;
    if (!photo) {
      setError("Add a photo so they have a face.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await mintHomie({
        data: { name, descriptors: picked, home, days, habit, stage, neighbors, imageDataUrl: photo },
      });
      if (!result.ok) {
        setError(result.error);
        setBusy(false);
        return;
      }
      const portrait = await fitPhotoData(result.profile.portrait);
      onDone({ ...result.profile, portrait }, stage);
    } catch (err) {
      const message = err instanceof Error ? err.message : "That didn't work. Try once more.";
      setError(message.slice(0, 180));
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-2">
      <button type="button" onClick={onBack} className="min-h-11 font-display text-ink-soft">
        Back
      </button>
      <label className="mt-1 block font-display text-sm text-ink" htmlFor="homie-name">
        Name
      </label>
      <input
        id="homie-name"
        value={name}
        maxLength={16}
        onChange={(event) => setName(event.target.value)}
        placeholder="Their name"
        className="mt-1 min-h-12 w-full rounded-2xl bg-paper px-3 text-ink"
      />

      <p className="mt-4 font-display text-sm text-ink">Who they are</p>
      <p className="text-sm text-ink-soft">Pick two to five.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {DESCRIPTORS.map((trait) => {
          const on = picked.includes(trait);
          return (
            <button
              key={trait}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(trait)}
              className={cx(
                "min-h-11 rounded-full px-3 font-display text-sm",
                on ? "bg-paper text-ink ring-2 ring-tomato" : "bg-cream-2 text-ink-soft",
              )}
            >
              {trait}
            </button>
          );
        })}
      </div>

      <Field id="homie-home" label="Where they live" value={home} onChange={setHome} placeholder="A little house with a loud cat" />
      <Field id="homie-days" label="How they spend the day" value={days} onChange={setDays} placeholder="Drives a taxi and dodges mornings" />
      <Field id="homie-habit" label="A habit that's only theirs" value={habit} onChange={setHabit} placeholder="Buys hats they don't need" />

      <p className="mt-4 font-display text-sm text-ink">They start as</p>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {STAGES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={stage === item}
            onClick={() => setStage(item)}
            className={cx(
              "min-h-11 rounded-2xl font-display text-xs",
              stage === item ? "bg-paper text-ink ring-2 ring-tomato" : "bg-cream-2 text-ink-soft",
            )}
          >
            {STAGE_WORD[item]}
          </button>
        ))}
      </div>

      <p className="mt-4 font-display text-sm text-ink">Photo</p>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="mt-2 flex min-h-24 w-full items-center gap-3 rounded-2xl bg-paper px-3 text-left"
      >
        {photo ? (
          <img src={photo} alt="" className="size-16 rounded-2xl object-cover" />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-2xl bg-cream-2 text-tomato">
            <ImagePlus className="size-6" />
          </span>
        )}
        <span>
          <span className="block font-display text-ink">{photo ? "Change photo" : "Upload a photo"}</span>
          <span className="block text-sm text-ink-soft">We'll draw them as a Homie, still them.</span>
        </span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          void onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {error && <p className="mt-3 text-pretty text-sm text-tomato">{error}</p>}
      <button
        type="button"
        onClick={() => void make()}
        disabled={busy || full}
        className="mt-4 min-h-14 w-full rounded-2xl bg-tomato font-display text-xl text-paper disabled:opacity-50"
      >
        {busy ? "Drawing them..." : full ? "The house is full" : "Make Homie"}
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="mt-4 block" htmlFor={id}>
      <span className="font-display text-sm text-ink">{label}</span>
      <input
        id={id}
        value={value}
        maxLength={80}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-12 w-full rounded-2xl bg-paper px-3 text-ink"
      />
    </label>
  );
}

async function fitPhotoData(dataUrl: string) {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("portrait"));
    img.src = dataUrl;
  });
  const max = 512;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

import { create } from "zustand";
import {
  adoptHomie,
  anyHatched,
  applyAction,
  freshSave,
  hatchHomie,
  idsOf,
  loadSave,
  makeRecap,
  persistSave,
  releaseHomie,
  simulate,
  targetMinute,
} from "./logic";
import { playSound, setMuted, unlockAudio } from "./sfx";
import { forgetAllReels, forgetHomieReels } from "./reels";
import type { Action, CustomProfile, HomieId, Recap, Save, Stage, View } from "./types";

type State = {
  ready: boolean;
  save: Save;
  view: View;
  feedOpen: boolean;
  recap: Recap | null;
  toast: string | null;
  speech: string | null;
  joy: number;
  boot: () => void;
  catchUp: () => void;
  select: (id: HomieId) => void;
  hatch: (id: HomieId) => void;
  act: (action: Action, foodId?: string) => void;
  dismissRecap: () => void;
  setView: (view: View) => void;
  setFeed: (open: boolean) => void;
  toggleMute: () => void;
  reset: () => void;
  adopt: (profile: CustomProfile, stage: Stage) => void;
  release: (id: HomieId) => void;
};

let toastTimer = 0;
let speechTimer = 0;
let persistTimer = 0;

function schedulePersist(save: Save, immediate = false) {
  const write = () => persistSave(save);
  if (typeof window === "undefined") return;
  window.clearTimeout(persistTimer);
  if (immediate) write();
  else persistTimer = window.setTimeout(write, 700);
}

function flash(set: (partial: Partial<State>) => void, toast: string | null, speech: string | null) {
  if (typeof window === "undefined") return;
  if (toast) {
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => set({ toast: null }), 2400);
  }
  if (speech) {
    window.clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => set({ speech: null }), 4600);
  }
}

function withViewed(save: Save, id: HomieId): Save {
  const h = save.homies[id];
  if (h.hatchedAt == null || h.lastViewed === save.gameMinute) return save;
  return {
    ...save,
    homies: { ...save.homies, [id]: { ...h, lastViewed: save.gameMinute } },
  };
}

export const useHomies = create<State>((set, get) => ({
  ready: false,
  save: freshSave(0),
  view: "care",
  feedOpen: false,
  recap: null,
  toast: null,
  speech: null,
  joy: 0,
  boot: () => {
    if (get().ready) return;
    const now = Date.now();
    let save = loadSave(now);
    if (anyHatched(save)) {
      const target = targetMinute(save, now);
      if (Number.isFinite(target) && target > save.gameMinute) save = simulate(save, target);
    } else {
      save = { ...save, gameMinute: 8 * 60, originMs: now - 8 * 60 * 1000 };
    }
    let recap: Recap | null = null;
    if (anyHatched(save)) {
      recap = makeRecap(save, save.activeId, 90);
      if (!recap && save.homies[save.activeId].hatchedAt != null) save = withViewed(save, save.activeId);
    }
    setMuted(save.muted);
    set({ save, ready: true, recap, view: "care", feedOpen: false, toast: null, speech: null });
    schedulePersist(save, true);
  },
  catchUp: () => {
    const st = get();
    if (!st.ready || !anyHatched(st.save)) return;
    let save = st.save;
    const target = targetMinute(save);
    if (!Number.isFinite(target) || target < save.gameMinute) return;
    if (target > save.gameMinute) save = simulate(save, target);
    const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
    const id = save.activeId;
    const h = save.homies[id];
    if (!hidden && !st.recap && h.hatchedAt != null) {
      const gap = save.gameMinute - h.lastViewed;
      if (gap >= 90) {
        const card = makeRecap(save, id, 90);
        if (card) {
          set({ save, recap: card });
          schedulePersist(save);
          return;
        }
      }
      save = withViewed(save, id);
    }
    if (save !== st.save) {
      set({ save });
      schedulePersist(save);
    }
  },
  select: (id) => {
    get().catchUp();
    let save = get().save;
    const h = save.homies[id];
    let recap: Recap | null = null;
    if (h.hatchedAt != null) {
      recap = makeRecap(save, id, 45);
      if (!recap) save = withViewed(save, id);
    }
    save = { ...save, activeId: id };
    set({ save, recap, feedOpen: false, speech: null, toast: null, view: "care" });
    schedulePersist(save, true);
    playSound("tap", save.muted);
  },
  hatch: (id) => {
    unlockAudio();
    const now = Date.now();
    let save = get().save;
    if (anyHatched(save)) {
      const target = targetMinute(save, now);
      if (target > save.gameMinute) save = simulate(save, target);
    }
    save = hatchHomie(save, id, now);
    set({
      save,
      view: "care",
      feedOpen: false,
      recap: null,
      speech: null,
      toast: null,
      joy: get().joy + 1,
    });
    playSound("hatch", save.muted);
    schedulePersist(save, true);
  },
  act: (action, foodId) => {
    unlockAudio();
    let save = get().save;
    if (anyHatched(save)) {
      const target = targetMinute(save);
      if (target > save.gameMinute) save = simulate(save, target);
    }
    const result = applyAction(save, save.activeId, action, foodId);
    set({
      save: result.save,
      toast: result.toast,
      speech: result.speech,
      feedOpen: false,
      joy: get().joy + 1,
    });
    playSound(result.sound, result.save.muted);
    flash(set, result.toast, result.speech);
    schedulePersist(result.save, true);
  },
  dismissRecap: () => {
    const save = withViewed(get().save, get().save.activeId);
    set({ save, recap: null });
    schedulePersist(save, true);
  },
  setView: (view) => set({ view, feedOpen: false }),
  setFeed: (feedOpen) => {
    const save = get().save;
    if (save.homies[save.activeId].hatchedAt == null) return;
    set({ feedOpen, view: "care" });
    playSound("tap", save.muted);
  },
  toggleMute: () => {
    const save = { ...get().save, muted: !get().save.muted };
    setMuted(save.muted);
    set({ save });
    if (!save.muted) {
      unlockAudio();
      playSound("tap", false);
    }
    schedulePersist(save, true);
  },
  reset: () => {
    const save = freshSave(Date.now());
    set({ save, recap: null, toast: null, speech: null, view: "care", feedOpen: false, joy: 0 });
    schedulePersist(save, true);
    void forgetAllReels();
  },
  adopt: (profile, stage) => {
    const current = get().save;
    const made = idsOf(current).filter((id) => id.startsWith("c")).length;
    if (made >= 4) return;
    const save = adoptHomie(current, profile, stage);
    set({
      save,
      view: "care",
      feedOpen: false,
      recap: null,
      toast: `${profile.name} moved in.`,
      speech: null,
      joy: get().joy + 1,
    });
    playSound("hatch", save.muted);
    flash(set, `${profile.name} moved in.`, null);
    schedulePersist(save, true);
  },
  release: (id) => {
    const save = releaseHomie(get().save, id);
    set({ save, view: "care", feedOpen: false, speech: null, toast: null, recap: null });
    schedulePersist(save, true);
    void forgetHomieReels(id);
  },
}));

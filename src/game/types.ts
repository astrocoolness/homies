export const HOMIE_IDS = ["tony", "betty", "nori"] as const;
export type HomieId = (typeof HOMIE_IDS)[number];

export const STAGES = ["baby", "kid", "teen", "adult", "elder"] as const;
export type Stage = (typeof STAGES)[number];

export const STAT_KEYS = [
  "hunger",
  "rest",
  "happiness",
  "cleanliness",
  "energy",
  "affection",
  "health",
  "fun",
] as const;
export type StatKey = (typeof STAT_KEYS)[number];
export type Stats = Record<StatKey, number>;

export type Traits = {
  diet: number;
  playful: number;
  bond: number;
  grit: number;
};

export type Noted = Partial<Record<StatKey | "sick", boolean>>;

export type HomieState = {
  hatchedAt: number | null;
  sleeping: boolean;
  wakeAt: number | null;
  sick: boolean;
  stage: Stage;
  stats: Stats;
  traits: Traits;
  noted: Noted;
  beatCooldown: number;
  lastBeatId: string;
  lastViewed: number;
};

export type LogKind = "life" | "care" | "milestone";

export type LogEntry = {
  id: string;
  homieId: HomieId;
  at: number;
  text: string;
  kind: LogKind;
};

export type MilestoneRecord = {
  id: string;
  homieId: HomieId;
  at: number;
  title: string;
};

export const SAVE_VERSION = 1;

export type Save = {
  version: number;
  originMs: number;
  lastWallMs: number;
  gameMinute: number;
  activeId: HomieId;
  muted: boolean;
  homies: Record<HomieId, HomieState>;
  log: LogEntry[];
  milestones: MilestoneRecord[];
};

export type View = "care" | "episode" | "home" | "life";

export type Action = "feed" | "play" | "clean" | "talk" | "sleep" | "wake" | "medicine";

export type FoodKind = "fav" | "meal" | "junk";

export type Sound =
  | "feed"
  | "play"
  | "clean"
  | "talk"
  | "sleep"
  | "wake"
  | "med"
  | "hatch"
  | "tap"
  | "no";

export type Recap = {
  homieId: HomieId;
  title: string;
  lines: string[];
};

export type BeatCtx = {
  id: HomieId;
  name: string;
  stage: Stage;
  hour: number;
  minuteLabel: string;
  stats: Stats;
  traits: Traits;
  others: HomieId[];
  lifeDay: number;
};

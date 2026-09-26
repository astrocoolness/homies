import type { BeatCtx, FoodKind, HomieId, HomieState, Stage, Traits } from "./types";

export type FoodIcon = "cake" | "utensils" | "pizza" | "soup" | "star" | "battery" | "zap";

export type Food = {
  id: string;
  name: string;
  blurb: string;
  kind: FoodKind;
  icon: FoodIcon;
};

export const NAMES: Record<HomieId, string> = {
  tony: "Tony",
  betty: "Betty",
  nori: "Nori",
};

export const BIOS: Record<HomieId, string> = {
  tony: "Lazy, social, impulsive. Will want pancakes.",
  betty: "Kind and stubborn. The garden answers to her.",
  nori: "Curious, strange, barely sleeps.",
};

export const STAGE_LABEL: Record<Stage, string> = {
  baby: "Baby",
  kid: "Kid",
  teen: "Teen",
  adult: "Adult",
  elder: "Elder",
};

export const SCHEDULE: Record<HomieId, { bed: number; wake: number; work: [number, number] }> = {
  tony: { bed: 23, wake: 8, work: [9, 17] },
  betty: { bed: 21, wake: 6, work: [7, 11] },
  nori: { bed: 3, wake: 5, work: [20, 23] },
};

export const FOODS: Record<HomieId, Food[]> = {
  tony: [
    { id: "pancakes", name: "Pancakes", blurb: "The right answer.", kind: "fav", icon: "cake" },
    { id: "diner", name: "Diner plate", blurb: "Eggs, toast, too much coffee.", kind: "meal", icon: "utensils" },
    { id: "pizza", name: "Gas-station pizza", blurb: "It folds like a secret.", kind: "junk", icon: "pizza" },
  ],
  betty: [
    { id: "soup", name: "Tomato soup", blurb: "From the good pot.", kind: "fav", icon: "soup" },
    { id: "chicken", name: "Sunday chicken", blurb: "Even if it isn't Sunday.", kind: "meal", icon: "utensils" },
    { id: "pie", name: "Wrapped pie", blurb: "She will know it was bought.", kind: "junk", icon: "cake" },
  ],
  nori: [
    { id: "sugar", name: "Star sugar", blurb: "Mostly light. A little joy.", kind: "fav", icon: "star" },
    { id: "broth", name: "Battery broth", blurb: "Warm, metallic, comforting.", kind: "meal", icon: "battery" },
    { id: "crisps", name: "Static crisps", blurb: "They crackle on the way down.", kind: "junk", icon: "zap" },
  ],
};

export const HOMES: Record<HomieId, { title: string; line: string; messy: string; tidy: string }> = {
  tony: {
    title: "Messy apartment",
    line: "Above a garage. The hat has its own hook.",
    messy: "The floor has opinions.",
    tidy: "Even the hat looks intentional.",
  },
  betty: {
    title: "Little house",
    line: "A kitchen, a garden, and a cat who will not explain.",
    messy: "The cat has been conducting experiments.",
    tidy: "The tomatoes approve.",
  },
  nori: {
    title: "Pod",
    line: "A round room that never quite sleeps.",
    messy: "Cables are thinking about becoming a nest.",
    tidy: "The plant has a name. It has not agreed.",
  },
};

export const HATCH_LINES: Record<HomieId, string> = {
  tony: "Tony hatched, already looking for breakfast.",
  betty: "Betty hatched and reached for the windowsill, where a plant should be.",
  nori: "Nori booted, beeped once, and tried to hold the morning.",
};

export const STAGE_LINES: Record<HomieId, Record<Stage, string>> = {
  tony: {
    baby: "",
    kid: "Tony isn't a baby anymore. The hat is too big, which is the point.",
    teen: "Tony hit the age where the couch is a career plan.",
    adult: "Tony grew up. He still negotiates with mornings.",
    elder: "Tony got older. The cab still knows his hands.",
  },
  betty: {
    baby: "",
    kid: "Betty grew. She has opinions about dirt now.",
    teen: "Betty is a teenager. The garden has been informed.",
    adult: "Betty grew into her kitchen. The spoon was ready.",
    elder: "Betty got older and somehow more certain.",
  },
  nori: {
    baby: "",
    kid: "Nori updated. The questions got longer.",
    teen: "Nori added a lens and immediately pointed it at nothing important.",
    adult: "Nori finished growing, which they find suspicious.",
    elder: "Nori got older. A sprout stayed.",
  },
};

export const SLEEP_LINES: Record<HomieId, string> = {
  tony: "Tony went to bed. The hat stayed on the hook, barely.",
  betty: "Betty went to bed at a sensible hour, on purpose.",
  nori: "Nori docked, and called the dark a kind of thinking.",
};

export const NAP_LINES: Record<HomieId, string> = {
  tony: "Tony is taking a nap. He described it as a shift change.",
  betty: "Betty is napping, and would like that kept quiet.",
  nori: "Nori is docked for a little while. Not sleep. A pause.",
};

export const COLLAPSE_LINES: Record<HomieId, string> = {
  tony: "Tony fell asleep where he was. The floor allowed it.",
  betty: "Betty sat down for one minute and the minute won.",
  nori: "Nori dimmed without announcing it. Rare.",
};

export const SLIP_LINES: Record<HomieId, string> = {
  tony: "Days slipped past. Tony kept the hat on anyway.",
  betty: "Days slipped past. Betty watered what she could.",
  nori: "Days slipped past. Nori counted them, then lost the number.",
};

const SICK_LINES: Record<HomieId, string> = {
  tony: "Tony doesn't look well. He says it's the weather. It isn't.",
  betty: "Betty is poorly and is offended by the suggestion.",
  nori: "Nori is running warm, and has opened a ticket about it.",
};

const WELL_LINES: Record<HomieId, string> = {
  tony: "Tony looks like himself again.",
  betty: "Betty is better, and already rewriting the story.",
  nori: "Nori cooled down. The ticket is closed.",
};

export function sickLine(id: HomieId) {
  return SICK_LINES[id];
}
export function wellLine(id: HomieId) {
  return WELL_LINES[id];
}

export function wakeLine(id: HomieId, label: string) {
  if (id === "tony") return `Tony woke up at ${label}. He negotiated with the floor.`;
  if (id === "betty") return `Betty woke up at ${label}, already thinking about the garden.`;
  return `Nori came back online at ${label} and counted it as sleep.`;
}

export function portraitSrc(id: HomieId, stage: Stage) {
  return `/homies/${id}-${stage}.png`;
}
export function roomSrc(id: HomieId) {
  return `/homies/room-${id}.jpg`;
}
export const EGG_SRC = "/homies/egg.png";

export function cravingOf(id: HomieId, dayIndex: number): Food {
  const foods = FOODS[id];
  return foods[((dayIndex % foods.length) + foods.length) % foods.length];
}

export function workBlurb(id: HomieId, stage: Stage) {
  if (id === "tony") {
    return stage === "teen" ? "Tony is hanging around the garage." : "Tony is on a fare.";
  }
  if (id === "betty") return "Betty is in the garden.";
  return "Nori is naming streets that aren't there yet.";
}

const QUIPS: Record<HomieId, string[]> = {
  tony: [
    "Tony is thinking about the hat.",
    "Tony says he's fine. His stomach disagrees, quietly.",
    "Tony hums a song from the cab.",
    "Tony has nowhere to be, and is going anyway.",
    "Tony waves at a car that does not wave back.",
    "Tony is practicing standing up. It's going okay.",
  ],
  betty: [
    "Betty is deciding which plant is the favorite.",
    "Betty has a opinion she is saving.",
    "Betty checks the window like it might have news.",
    "Betty is kind today. It still has rules.",
    "Betty moved a spoon back where it belongs.",
    "Betty is listening to the house settle.",
  ],
  nori: [
    "Nori is collecting a question for later.",
    "Nori watched a corner for a while. It behaved.",
    "Nori tried a joke on the plant.",
    "Nori is curious about the next hour.",
    "Nori labeled a shadow, then unlabeled it.",
    "Nori seems pleased, in a scientific way.",
  ],
};

export function statusLine(
  id: HomieId,
  h: HomieState,
  hour: number,
  minuteLabel: string,
  working: boolean,
  night: boolean,
  wantName: string,
): string {
  const name = NAMES[id];
  if (h.hatchedAt == null) return "Still an egg.";
  if (h.sleeping) {
    const nap = !night;
    if (id === "nori") return nap ? "Nori is docked for a little while." : "Nori is docked.";
    return nap ? `${name} is napping.` : `${name} is asleep.`;
  }
  if (h.sick || h.stats.health < 40) {
    if (id === "betty") return "Betty insists she is fine. She is not.";
    if (id === "nori") return "Nori is running warm.";
    return "Tony isn't well.";
  }
  if (h.stats.hunger < 26) {
    if (id === "tony") return "Tony is hungry.";
    if (id === "betty") return "Betty is hungry, and will mention it.";
    return "Nori is hungry in a new way.";
  }
  if (h.stats.rest < 24) return id === "nori" ? "Nori's eyes are dimming." : `${name} is sleepy.`;
  if (h.stats.cleanliness < 24) {
    if (id === "tony") return "Tony could use a wash. The cab agrees.";
    if (id === "betty") return "Betty has garden on her.";
    return "Nori has been collecting dust like data.";
  }
  if (h.stats.fun < 24) {
    if (id === "tony") return "Tony is bored enough to reorganize hats.";
    if (id === "betty") return "Betty is bored. This is dangerous.";
    return "Nori is bored and inventing Tuesdays.";
  }
  if (h.stats.energy < 22) return `${name} is worn out.`;
  if (h.stats.affection < 28) {
    if (id === "betty") return "Betty misses you, and will not say it first.";
    if (id === "nori") return "Nori saved a sentence for you.";
    return "Tony misses you.";
  }
  if (working) return workBlurb(id, h.stage);
  if (hour >= 7 && hour < 11 && h.stats.hunger < 62) return `${name} wants ${wantName.toLowerCase()}.`;
  if (h.stats.happiness > 80) {
    if (id === "tony") return "Tony feels great.";
    if (id === "betty") return "Betty feels like the day came out right.";
    return "Nori feels, experimentally, great.";
  }
  void minuteLabel;
  return QUIPS[id][hour % QUIPS[id].length];
}

export function traitPhrases(t: Traits): string[] {
  const diet =
    t.diet < 32 ? "Diet: terrible" : t.diet < 46 ? "Diet: snacky" : t.diet > 76 ? "Eats like someone looked after" : "Diet: ordinary";
  const play = t.playful > 72 ? "Very playful" : t.playful < 34 ? "Hard to tempt" : "Likes a game";
  const bond = t.bond > 76 ? "Strong bond" : t.bond < 30 ? "Lonely" : "Bond is growing";
  const grit = t.grit > 72 ? "Shows up anyway" : t.grit < 32 ? "Would rather not" : "Getting by";
  return [diet, play, bond, grit];
}

const NEED_LINES: Record<HomieId, Record<string, string>> = {
  tony: {
    hunger: "Tony is hungry.",
    rest: "Tony can barely keep his eyes open.",
    cleanliness: "Tony has become a little bit of the street.",
    fun: "Tony is bored. The hat cannot fix it.",
    energy: "Tony is worn out.",
    affection: "Tony sat by the window. Nobody had come by.",
  },
  betty: {
    hunger: "Betty is hungry and considers this a scheduling error.",
    rest: "Betty is sleepy and denying it.",
    cleanliness: "Betty tracked the garden through the kitchen.",
    fun: "Betty is restless. The cookies know.",
    energy: "Betty is worn out.",
    affection: "Betty started a sentence and saved it for you.",
  },
  nori: {
    hunger: "Nori is hungry and has questions about it.",
    rest: "Nori is dimming at the edges.",
    cleanliness: "Nori has dust in the seams.",
    fun: "Nori is under-stimulated and rewriting Tuesday.",
    energy: "Nori is worn out.",
    affection: "Nori held a thought until you got back.",
  },
};

export function needLine(id: HomieId, key: string) {
  return NEED_LINES[id][key] ?? `${NAMES[id]} needs you.`;
}

export type MilestoneDef = {
  id: string;
  homieId: HomieId;
  title: string;
  minHours: number;
  test?: (h: HomieState) => boolean;
};

export const MILESTONES: MilestoneDef[] = [
  { id: "tony-word", homieId: "tony", title: "Tony learned a word. It was pancakes.", minHours: 3 },
  {
    id: "tony-cook",
    homieId: "tony",
    title: "Tony learned to cook. The menu is short and correct.",
    minHours: 16,
    test: (h) => h.traits.diet >= 52 && h.stage !== "baby",
  },
  {
    id: "tony-garage",
    homieId: "tony",
    title: "Tony started hanging around the garage.",
    minHours: 18,
    test: (h) => h.stage !== "baby",
  },
  {
    id: "tony-job",
    homieId: "tony",
    title: "Tony got his first job. The cab smells like coffee and rain.",
    minHours: 72,
    test: (h) => h.stage === "teen" || h.stage === "adult" || h.stage === "elder",
  },
  { id: "tony-apartment", homieId: "tony", title: "Tony moved into his own apartment. The hat got a hook.", minHours: 96 },
  {
    id: "tony-hat",
    homieId: "tony",
    title: "The weird hat became part of the uniform.",
    minHours: 24,
    test: (h) => h.traits.playful >= 70,
  },
  {
    id: "tony-dash",
    homieId: "tony",
    title: "Tony keeps a picture of you on the dash.",
    minHours: 20,
    test: (h) => h.traits.bond >= 74,
  },
  {
    id: "tony-jacket",
    homieId: "tony",
    title: "Tony's jacket stopped buttoning.",
    minHours: 8,
    test: (h) => h.traits.diet <= 30,
  },
  { id: "betty-dirt", homieId: "betty", title: "Betty patted the dirt like it owed her a tomato.", minHours: 4 },
  {
    id: "betty-cookies",
    homieId: "betty",
    title: "Betty learned the family cookie recipe.",
    minHours: 18,
    test: (h) => h.traits.diet >= 60,
  },
  { id: "betty-cat", homieId: "betty", title: "A cat moved in and refused to explain itself.", minHours: 36, test: (h) => h.stage !== "baby" },
  {
    id: "betty-sister",
    homieId: "betty",
    title: "Betty's sister called her first, for once.",
    minHours: 48,
    test: (h) => h.traits.bond >= 58,
  },
  {
    id: "betty-stubborn",
    homieId: "betty",
    title: "Betty will not be hurried. This is who she is.",
    minHours: 30,
    test: (h) => h.traits.grit >= 74,
  },
  { id: "nori-joke", homieId: "nori", title: "Nori told a joke. The punchline was the number four.", minHours: 4 },
  { id: "nori-pigeon", homieId: "nori", title: "Nori befriended a pigeon and logged a colleague.", minHours: 28, test: (h) => h.stage !== "baby" },
  {
    id: "nori-job",
    homieId: "nori",
    title: "Nori got a job naming streets that don't exist yet.",
    minHours: 72,
    test: (h) => h.stage === "teen" || h.stage === "adult" || h.stage === "elder",
  },
  {
    id: "nori-window",
    homieId: "nori",
    title: "Nori cut a tiny window into the pod.",
    minHours: 80,
    test: (h) => h.traits.bond >= 60,
  },
  { id: "nori-plant", homieId: "nori", title: "Something green started growing on Nori. They left it.", minHours: 40, test: (h) => h.stage !== "baby" },
];

type Beat = {
  id: string;
  who: HomieId;
  weight?: number;
  stages?: Stage[];
  hours?: [number, number];
  test?: (ctx: BeatCtx) => boolean;
  text: string;
};

const OLDER: Stage[] = ["kid", "teen", "adult", "elder"];
const WORKING_AGE: Stage[] = ["teen", "adult", "elder"];

const BEATS: Beat[] = [
  { id: "t-dream", who: "tony", stages: OLDER, hours: [5, 10], text: "Tony had a strange dream. The hat was driving." },
  { id: "t-work", who: "tony", stages: WORKING_AGE, hours: [9, 17], text: "Tony went to work." },
  { id: "t-met", who: "tony", stages: WORKING_AGE, hours: [10, 18], text: "Tony met someone new. They tipped in a story." },
  { id: "t-hat", who: "tony", stages: OLDER, hours: [11, 20], text: "Tony bought a weird hat. It joined the other one." },
  { id: "t-home", who: "tony", stages: WORKING_AGE, hours: [17, 23], text: "Tony came home tired and stood in the kitchen." },
  { id: "t-think", who: "tony", stages: OLDER, hours: [18, 24], text: "Tony is thinking about the hat." },
  { id: "t-light", who: "tony", stages: WORKING_AGE, hours: [9, 17], test: (c) => c.stats.energy < 40, text: "Tony fell asleep at a long light." },
  { id: "t-mints", who: "tony", test: (c) => c.stats.hunger < 36, text: "Tony ate mints and called it lunch." },
  { id: "t-betty", who: "tony", hours: [11, 19], test: (c) => c.others.includes("betty"), text: "Tony drove past Betty's and smelled cookies through the vent." },
  { id: "t-nori", who: "tony", test: (c) => c.others.includes("nori"), text: "Tony tried to explain hats to Nori. Nori designed a bowl." },
  { id: "t-baby-key", who: "tony", stages: ["baby"], text: "Tony gummed a taxi key and looked extremely proud." },
  { id: "t-baby-foot", who: "tony", stages: ["baby"], text: "Tony discovered a foot and introduced it to the room." },
  { id: "t-kid-couch", who: "tony", stages: ["kid"], text: "Tony drove the couch. The fare was a cushion." },
  { id: "t-kid-hat", who: "tony", stages: ["kid"], text: "Tony wore a hat backwards and refused corrections." },
  { id: "t-stoop", who: "tony", stages: ["teen"], hours: [15, 22], text: "Tony sat on the stoop and ranked the hats that walked by." },
  { id: "t-elder", who: "tony", stages: ["elder"], text: "Tony told the whole story of the first hat. The passenger stayed." },
  { id: "t-skip", who: "tony", stages: WORKING_AGE, hours: [9, 16], test: (c) => c.traits.grit < 42, text: "Tony did not want to go to work. He went, late, hat first." },
  { id: "t-night", who: "tony", hours: [22, 5], text: "Tony reorganized the hats, then undid the whole thing." },
  { id: "t-pancake-think", who: "tony", hours: [6, 11], text: "Tony wants pancakes in a way that feels personal." },
  { id: "b-water", who: "betty", hours: [6, 12], text: "Betty watered the plants and apologized to the one she missed." },
  { id: "b-cookies", who: "betty", stages: OLDER, hours: [9, 17], text: "Betty baked cookies. The cat supervised poorly." },
  { id: "b-sister", who: "betty", stages: WORKING_AGE, hours: [11, 20], text: "Betty called her sister and did not apologize first." },
  { id: "b-cat", who: "betty", stages: OLDER, text: "The cat knocked something over. Betty called it a statement." },
  { id: "b-squirrel", who: "betty", hours: [7, 13], text: "Betty argued with a squirrel. The squirrel left with a cherry." },
  { id: "b-soup", who: "betty", hours: [16, 21], text: "Betty left soup to cool and watched it like a program." },
  { id: "b-nap", who: "betty", test: (c) => c.stats.rest < 36, text: "Betty refused a nap on principle, then took one anyway." },
  { id: "b-tony", who: "betty", test: (c) => c.others.includes("tony"), text: "Betty told Tony to eat sitting down. He considered it." },
  { id: "b-nori", who: "betty", test: (c) => c.others.includes("nori"), text: "Betty let Nori ask four questions and answered three." },
  { id: "b-baby", who: "betty", stages: ["baby"], text: "Betty napped against a watering can and held the handle." },
  { id: "b-kid", who: "betty", stages: ["kid"], text: "Betty lined up three tomatoes by seriousness." },
  { id: "b-elder", who: "betty", stages: ["elder"], text: "Betty sat with the garden and let it do the talking." },
  { id: "b-chair", who: "betty", test: (c) => c.traits.grit > 60, text: "Betty moved the chair back to where it belongs. It knows." },
  { id: "b-night", who: "betty", hours: [21, 6], text: "Betty checked the lock, the stove, and the cat, in that order." },
  { id: "n-tuesday", who: "nori", text: "Nori asked what a Tuesday is, then wrote the answer down wrong on purpose." },
  { id: "n-dream", who: "nori", text: "Nori recorded a dream they did not have, for practice." },
  { id: "n-pigeon", who: "nori", hours: [8, 18], text: "Nori befriended a pigeon and filed it under colleagues." },
  { id: "n-lamp", who: "nori", text: "Nori rewired the lamp. The lamp seems happier. The switch does not." },
  { id: "n-hat", who: "nori", test: (c) => c.others.includes("tony"), text: "Nori wondered if Tony's hat is a kind of container." },
  { id: "n-cookie", who: "nori", test: (c) => c.others.includes("betty"), text: "Nori analyzed a cookie. Twelve percent of it is mystery." },
  { id: "n-fridge", who: "nori", hours: [0, 6], text: "Nori tried to sleep and counted the refrigerator instead." },
  { id: "n-map", who: "nori", hours: [20, 24], text: "Nori mapped the block and gave the corners private names." },
  { id: "n-baby", who: "nori", stages: ["baby"], text: "Nori booted, beeped once, and tried to hold a finger of light." },
  { id: "n-kid", who: "nori", stages: ["kid"], text: "Nori practiced blinking. The room stayed. They noted that." },
  { id: "n-elder", who: "nori", stages: ["elder"], text: "Nori watered the sprout on their shoulder and called it a roommate." },
  { id: "n-still", who: "nori", text: "Nori held still for a whole minute, as an experiment." },
  { id: "n-work", who: "nori", stages: WORKING_AGE, hours: [20, 23], text: "Nori went to work, which tonight meant naming an alley." },
];

function inHours(hour: number, range: [number, number]) {
  const [a, b] = range;
  if (a < b) return hour >= a && hour < b;
  return hour >= a || hour < b;
}

function poolFor(ctx: BeatCtx, lastId: string, loose: boolean) {
  let pool = BEATS.filter((b) => b.who === ctx.id);
  pool = pool.filter((b) => !b.stages || b.stages.includes(ctx.stage));
  if (!loose) pool = pool.filter((b) => !b.hours || inHours(ctx.hour, b.hours));
  pool = pool.filter((b) => !b.test || b.test(ctx));
  if (pool.length > 1) pool = pool.filter((b) => b.id !== lastId);
  return pool;
}

const QUIET: Record<HomieId, string> = {
  tony: "Tony had a quiet hour. He spent it near the hat.",
  betty: "Betty had a quiet hour. The garden did most of the work.",
  nori: "Nori had a quiet hour and wrote it down as data.",
};

export function rollBeat(ctx: BeatCtx, lastId: string): { id: string; text: string } {
  let pool = poolFor(ctx, lastId, false);
  if (pool.length === 0) pool = poolFor(ctx, lastId, true);
  if (pool.length === 0) return { id: "quiet", text: QUIET[ctx.id] };
  const total = pool.reduce((sum, b) => sum + (b.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const b of pool) {
    r -= b.weight ?? 1;
    if (r <= 0) return { id: b.id, text: b.text };
  }
  const last = pool[pool.length - 1];
  return { id: last.id, text: last.text };
}

export function feedLine(id: HomieId, food: Food, stage: Stage, asleep: boolean) {
  if (asleep) {
    if (id === "nori") return `You left ${food.name.toLowerCase()} by the dock.`;
    return `You left ${food.name.toLowerCase()} by the bed.`;
  }
  if (stage === "baby") {
    if (id === "tony") return `Tony got ${food.name.toLowerCase()}. A surprising amount stayed on Tony.`;
    if (id === "betty") return `Betty tried the ${food.name.toLowerCase()} and regarded it like a contract.`;
    return `Nori investigated the ${food.name.toLowerCase()}, then kept it.`;
  }
  if (id === "tony" && food.id === "pancakes") return "Tony ate pancakes.";
  if (id === "tony" && food.id === "pizza") return "Tony ate the gas-station pizza and has no notes yet.";
  if (id === "tony") return "Tony ate the diner plate like it was a plan.";
  if (id === "betty" && food.kind === "junk") return "Betty ate the wrapped pie and forgave no one.";
  if (id === "betty" && food.id === "soup") return "Betty ate tomato soup and went quiet in a good way.";
  if (id === "betty") return "Betty ate properly, which is its own kind of care.";
  if (food.id === "sugar") return "Nori had star sugar and glowed half a shade warmer.";
  if (food.kind === "junk") return "Nori ate static crisps. Something in the room crackled.";
  return "Nori drank battery broth and called it dinner.";
}

export function playLine(id: HomieId, stage: Stage) {
  if (stage === "baby") {
    if (id === "tony") return "You played with Tony. He offered you the taxi key.";
    if (id === "betty") return "You played with Betty. She stacked two spoons and looked proud.";
    return "You played with Nori. They beeped in time, almost.";
  }
  if (id === "tony") return stage === "elder" ? "You and Tony drove the long way, on purpose." : "You and Tony drove nowhere in particular.";
  if (id === "betty") return "You stayed in the garden with Betty. A tomato was discussed.";
  return "You and Nori took apart a question and almost got it back together.";
}

export function cleanLine(id: HomieId, stage: Stage) {
  if (stage === "baby") {
    if (id === "tony") return "You wiped breakfast off Tony. He considered it a sport.";
    if (id === "betty") return "You cleaned Betty's hands. She immediately found dirt.";
    return "You dusted Nori. They logged it as weather.";
  }
  if (id === "tony") return "Tony got cleaned up and thought about the hat anyway.";
  if (id === "betty") return "Betty washed up, then checked the tomatoes were still themselves.";
  return "Nori got a polish. The star in their chest looked clearer.";
}

const TALK: Record<HomieId, { test?: (h: HomieState) => boolean; text: string }[]> = {
  tony: [
    { test: (h) => h.stats.hunger < 40, text: "I'm hungry." },
    { test: (h) => h.stats.energy < 35 || h.traits.grit < 40, text: "I don't wanna go to work." },
    { test: (h) => h.traits.bond > 60, text: "I met someone today. I saved you the good part." },
    { test: (h) => h.stats.fun < 40, text: "The hat is not a personality. I'm working on it." },
    { text: "You can stay. The cab can wait one minute." },
    { text: "I had a weird dream. You were in the back seat, giving directions." },
    { text: "Pancakes would fix more than people think." },
  ],
  betty: [
    { test: (h) => h.stats.hunger < 40, text: "I could eat. Sit down if you're staying." },
    { test: (h) => h.sick || h.stats.health < 50, text: "I'm fine. Don't look at me like that." },
    { test: (h) => h.traits.bond > 60, text: "I called my sister. I told her about you, briefly." },
    { text: "The cat did it. Whatever it is." },
    { text: "Come see the tomatoes before they get proud." },
    { text: "You don't have to fix anything. Being here is the chore." },
  ],
  nori: [
    { test: (h) => h.stats.hunger < 40, text: "I require fuel. Preferably the glowing kind." },
    { test: (h) => h.traits.bond > 60, text: "I saved a question. It was: did you have a good day, specifically." },
    { text: "What is a Tuesday for, if not renaming?" },
    { text: "I tried to dream. I got as far as the refrigerator." },
    { text: "If you stay, I will count that as company. That's new." },
    { text: "The pigeon says hello. I may be projecting." },
  ],
};

export function talkLine(id: HomieId, h: HomieState, asleep: boolean) {
  if (asleep) {
    if (id === "tony") return "You whisper. Tony snores like a small engine.";
    if (id === "betty") return "You say goodnight. Betty answers without waking.";
    return "You tap the pod. Nori hums, still docked.";
  }
  const options = TALK[id].filter((t) => !t.test || t.test(h));
  const pick = options[Math.floor(Math.random() * options.length)] ?? TALK[id][0];
  return pick.text;
}

export function urgentLine(id: HomieId, h: HomieState): string | null {
  if (h.sick || h.stats.health < 40) return statusLine(id, h, 12, "", false, false, "soup");
  if (h.stats.hunger < 30) return NEED_LINES[id].hunger;
  if (h.stats.rest < 26 && !h.sleeping) return NEED_LINES[id].rest;
  if (h.stats.affection < 30) return NEED_LINES[id].affection;
  return null;
}

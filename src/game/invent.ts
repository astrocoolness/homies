import { createServerFn } from "@tanstack/react-start";
import type { CustomProfile, Stage } from "./types";
import { STAGES } from "./types";
import { DESCRIPTORS, cleanName, clip, sheetFromModel, templateSheet, type MintFacts } from "./sheet";

export type InventResult =
  | { ok: true; profile: CustomProfile; stage: Stage }
  | { ok: false; error: string };

function extractJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1)) as unknown;
  } catch {
    return null;
  }
}

async function inventSheet(apiKey: string, neighbors: string[]): Promise<{ facts: MintFacts; sheet: CustomProfile } | null> {
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 1.1,
        max_tokens: 1800,
        messages: [
          {
            role: "system",
            content:
              "You invent original, specific, slightly weird but wholesome Tamagotchi characters in the style of rich SillyTavern character cards. Voice: warm, concrete, funny. No emoji. Reply with JSON only.",
          },
          {
            role: "user",
            content: `Invent a completely new Homie. Other Homies that may cameo: ${neighbors.join(", ") || "none"}.

Return JSON with:
name (1-2 words, unique),
descriptors (exactly 3-4 from this list: ${DESCRIPTORS.join(", ")}),
home (short place),
days (how they spend the day),
habit (one private quirk),
stage (one of: baby, kid, teen, adult, elder),
bio, homeTitle, homeLine, messy, tidy, job, pace ("slow"|"steady"|"wired"),
schedule {bed, wake, work:[start,end]},
foods: 3 objects {name, blurb, kind:"fav"|"meal"|"junk", icon:...},
hatch, sleep, nap, collapse, slip, sick, well, wakeEarly, wakeOk, work, medicine,
quips:6, beats:8, talk:5, talkAsleep, play, clean, feed (must contain {food}),
needs:{hunger,rest,cleanliness,fun,energy,affection},
stages:{baby:"",kid,teen,adult,elder},
milestones:3 {title, minHours}.

Also include a short "card" object for SillyTavern flavor: {description, personality, scenario, first_mes}.
Make them feel like a real little person with a specific life.`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    const raw = extractJson(text) as Record<string, unknown> | null;
    if (!raw) return null;
    const name = cleanName(raw.name);
    if (name.length < 2) return null;
    const descriptors = Array.isArray(raw.descriptors)
      ? raw.descriptors.filter((d): d is string => DESCRIPTORS.includes(d as any)).slice(0, 5)
      : [];
    if (descriptors.length < 2) return null;
    const stage = STAGES.includes(raw.stage as Stage) ? (raw.stage as Stage) : "adult";
    const facts: MintFacts = {
      name,
      descriptors,
      home: clip(raw.home, 80) || "a little place",
      days: clip(raw.days, 80) || "their days",
      habit: clip(raw.habit, 80) || "a private habit",
      stage,
      neighbors: neighbors.map(cleanName).filter(Boolean).slice(0, 4),
    };
    const sheet = sheetFromModel(raw, facts);
    sheet.name = name;
    sheet.descriptors = descriptors;
    return { facts, sheet };
  } catch {
    return null;
  }
}

function portraitPrompt(facts: MintFacts) {
  const age =
    facts.stage === "baby" ? "toddler" : facts.stage === "kid" ? "kid" : facts.stage === "teen" ? "teen" : facts.stage === "elder" ? "older" : "adult";
  return `One cute ${age} vinyl toy character, full body, standing, centered. Chunky rounded limbs, big head, soft matte plastic, gentle studio light. Personality hints: ${facts.descriptors.join(", ")}. Outfit and vibe from: ${facts.days}. Plain warm cream background, no scenery, no text, no watermark, no extra people.`;
}

async function drawPortrait(apiKey: string, facts: MintFacts): Promise<string | null> {
  const models = ["grok-imagine-image-2.0", "grok-imagine-image"];
  for (const model of models) {
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(60_000),
      body: JSON.stringify({
        model,
        prompt: portraitPrompt(facts),
        n: 1,
      }),
    });
    if (!res.ok) continue;
    const body = (await res.json()) as {
      data?: { b64_json?: string; url?: string }[];
      url?: string;
      b64_json?: string;
    };
    const b64 = body.data?.[0]?.b64_json ?? body.b64_json;
    if (b64) return `data:image/png;base64,${b64}`;
    const url = body.data?.[0]?.url ?? body.url;
    if (!url) continue;
    const img = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (!img.ok) return null;
    const type = (img.headers.get("content-type") ?? "image/jpeg").split(";")[0].trim() || "image/jpeg";
    const bytes = new Uint8Array(await img.arrayBuffer());
    return `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
  }
  return null;
}

export const inventHomie = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const row = (input ?? {}) as { neighbors?: unknown };
    const neighbors = Array.isArray(row.neighbors) ? row.neighbors.filter((n): n is string => typeof n === "string") : [];
    return { neighbors };
  })
  .handler(async ({ data }): Promise<InventResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Making new Homies isn't available right now." };
    try {
      const invented = await inventSheet(apiKey, data.neighbors);
      if (!invented) return { ok: false, error: "Couldn't invent one. Try again." };
      const portrait = await drawPortrait(apiKey, invented.facts);
      if (!portrait) return { ok: false, error: "The portrait didn't come through. Try again." };
      invented.sheet.portrait = portrait;
      return { ok: true, profile: invented.sheet, stage: invented.facts.stage };
    } catch (err) {
      console.error("inventHomie", err instanceof Error ? err.message : "failed");
      return { ok: false, error: "That didn't work. Try once more." };
    }
  });

import { createServerFn } from "@tanstack/react-start";
import type { CustomProfile, Stage } from "./types";
import { STAGES } from "./types";
import { DESCRIPTORS, cleanName, clip, sheetFromModel, templateSheet, type MintFacts } from "./sheet";
import { chatUrl, chatModel, imageGenUrl, imageModel } from "./provider";

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

function randomFacts(neighbors: string[]): MintFacts {
  const namePool = ["Miko", "Juno", "Pip", "Lark", "Nox", "Vee", "Sol", "Rin", "Kip", "Zed"];
  const name = namePool[Math.floor(Math.random() * namePool.length)];
  const shuffled = [...DESCRIPTORS].sort(() => Math.random() - 0.5);
  return {
    name,
    descriptors: shuffled.slice(0, 3),
    home: "a small apartment above a quiet shop",
    days: "fixes old radios and drinks too much tea",
    habit: "names every plant they meet",
    stage: "adult",
    neighbors: neighbors.map(cleanName).filter(Boolean).slice(0, 4),
  };
}

async function inventSheet(apiKey: string, neighbors: string[]): Promise<{ facts: MintFacts; sheet: CustomProfile }> {
  const fallbackFacts = randomFacts(neighbors);
  try {
    const res = await fetch(chatUrl(apiKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(22_000),
      body: JSON.stringify({
        model: chatModel(apiKey),
        temperature: 0.9,
        max_tokens: 1400,
        messages: [
          {
            role: "system",
            content:
              "You invent original, specific, slightly weird but wholesome Tamagotchi characters. Voice: warm, concrete, funny. No emoji. Reply with JSON only.",
          },
          {
            role: "user",
            content: `Invent a new Homie. Cameos: ${neighbors.join(", ") || "none"}.
Return JSON: name, descriptors (3-4 from: ${DESCRIPTORS.join(", ")}), home, days, habit, stage (baby|kid|teen|adult|elder), bio, homeTitle, homeLine, job, pace, schedule, foods, quips, beats, talk, needs, stages, milestones.
Keep it short and specific.`,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error("llm");
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    const raw = extractJson(text) as Record<string, unknown> | null;
    if (!raw) throw new Error("parse");
    const name = cleanName(raw.name) || fallbackFacts.name;
    const descriptors = Array.isArray(raw.descriptors)
      ? raw.descriptors.filter((d): d is string => DESCRIPTORS.includes(d as any)).slice(0, 5)
      : fallbackFacts.descriptors;
    const stage = STAGES.includes(raw.stage as Stage) ? (raw.stage as Stage) : "adult";
    const facts: MintFacts = {
      name,
      descriptors: descriptors.length >= 2 ? descriptors : fallbackFacts.descriptors,
      home: clip(raw.home, 80) || fallbackFacts.home,
      days: clip(raw.days, 80) || fallbackFacts.days,
      habit: clip(raw.habit, 80) || fallbackFacts.habit,
      stage,
      neighbors: fallbackFacts.neighbors,
    };
    const sheet = sheetFromModel(raw, facts);
    sheet.name = name;
    sheet.descriptors = facts.descriptors;
    return { facts, sheet };
  } catch {
    const sheet = templateSheet(fallbackFacts);
    return { facts: fallbackFacts, sheet };
  }
}

function portraitPrompt(facts: MintFacts) {
  const age =
    facts.stage === "baby" ? "toddler" : facts.stage === "kid" ? "kid" : facts.stage === "teen" ? "teen" : facts.stage === "elder" ? "older" : "adult";
  return `One cute ${age} vinyl toy character, full body, standing, centered. Chunky rounded limbs, big head, soft matte plastic, gentle studio light. Personality: ${facts.descriptors.join(", ")}. Vibe: ${facts.days}. Plain warm cream background, no scenery, no text, no watermark, no extra people.`;
}

async function drawPortrait(apiKey: string, facts: MintFacts): Promise<string | null> {
  const model = imageModel(apiKey);
  try {
    const res = await fetch(imageGenUrl(apiKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(50_000),
      body: JSON.stringify({
        model,
        prompt: portraitPrompt(facts),
        n: 1,
      }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as {
      data?: { b64_json?: string; url?: string }[];
      url?: string;
      b64_json?: string;
    };
    const b64 = body.data?.[0]?.b64_json ?? body.b64_json;
    if (b64) return `data:image/png;base64,${b64}`;
    const url = body.data?.[0]?.url ?? body.url;
    if (!url) return null;
    const img = await fetch(url, { signal: AbortSignal.timeout(18_000) });
    if (!img.ok) return null;
    const type = (img.headers.get("content-type") ?? "image/jpeg").split(";")[0].trim() || "image/jpeg";
    const bytes = new Uint8Array(await img.arrayBuffer());
    return `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
  } catch {
    return null;
  }
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
      const portrait = await drawPortrait(apiKey, invented.facts);
      if (!portrait) return { ok: false, error: "Couldn't draw the portrait. Try once more." };
      invented.sheet.portrait = portrait;
      return { ok: true, profile: invented.sheet, stage: invented.facts.stage };
    } catch (err) {
      console.error("inventHomie", err instanceof Error ? err.message : "failed");
      return { ok: false, error: "That didn't work. Try once more." };
    }
  });

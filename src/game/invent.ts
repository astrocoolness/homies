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
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(22_000),
      body: JSON.stringify({
        model: "grok-4.5",
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

async function drawPortraitGemini(geminiKey: string, facts: MintFacts): Promise<string | null> {
  const model = "gemini-nano-banana-2.1";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(50_000),
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: portraitPrompt(facts) }] }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    },
  );
  if (!res.ok) {
    console.error("gemini invent", res.status, await res.text().catch(() => ""));
    return null;
  }
  const body = (await res.json()) as {
    candidates?: { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[];
  };
  const part = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part?.inlineData?.data) return null;
  const mime = part.inlineData.mimeType || "image/png";
  return `data:${mime};base64,${part.inlineData.data}`;
}

export const inventHomie = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const row = (input ?? {}) as { neighbors?: unknown };
    const neighbors = Array.isArray(row.neighbors) ? row.neighbors.filter((n): n is string => typeof n === "string") : [];
    return { neighbors };
  })
  .handler(async ({ data }): Promise<InventResult> => {
    const xaiKey = process.env.XAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return { ok: false, error: "Making new Homies isn't available right now." };
    try {
      const invented = xaiKey ? await inventSheet(xaiKey, data.neighbors) : { facts: randomFacts(data.neighbors), sheet: templateSheet(randomFacts(data.neighbors)) };
      const portrait = await drawPortraitGemini(geminiKey, invented.facts);
      if (!portrait) return { ok: false, error: "Couldn't draw the portrait. Try once more." };
      invented.sheet.portrait = portrait;
      return { ok: true, profile: invented.sheet, stage: invented.facts.stage };
    } catch (err) {
      console.error("inventHomie", err instanceof Error ? err.message : "failed");
      return { ok: false, error: "That didn't work. Try once more." };
    }
  });

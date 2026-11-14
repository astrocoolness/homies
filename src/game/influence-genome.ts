import type { Influence } from "./influences";

export type InfluenceEventKind =
  | "friendship"
  | "betrayal"
  | "loss"
  | "discovery"
  | "failure"
  | "performance"
  | "care"
  | "journey"
  | "conflict"
  | "reconciliation";

export type InfluenceGenome = {
  /** Stable reference lineage. The sources remain the same; their expression evolves. */
  sourceIds: string[];
  dominant: string;
  counterforce: string;
  activeStrengths: string[];
  activeShadows: string[];
  unresolvedContradiction: string;
  expression: number;
  evolutionStage: number;
  recentEventIds: string[];
  storySeeds: string[];
};

export type GenomeEvent = {
  id: string;
  kind: InfluenceEventKind;
  summary: string;
  relationship?: "stranger" | "friend" | "rival" | "family" | "mentor" | "beloved";
};

const EVENT_EFFECTS: Record<InfluenceEventKind, { strengthen: string; challenge: string; seed: string }> = {
  friendship: { strengthen: "trust", challenge: "independence", seed: "A friend notices the habit the character insists is meaningless." },
  betrayal: { strengthen: "discernment", challenge: "trust", seed: "A familiar gesture means something different after a broken promise." },
  loss: { strengthen: "tenderness", challenge: "avoidance", seed: "An ordinary object becomes a ritual for someone who is gone." },
  discovery: { strengthen: "curiosity", challenge: "certainty", seed: "A small discovery makes the character revise a lifelong assumption." },
  failure: { strengthen: "humility", challenge: "pride", seed: "The character must ask for help at the exact thing they claim to master." },
  performance: { strengthen: "expression", challenge: "self-consciousness", seed: "The persona that wins applause clashes with the person who goes home." },
  care: { strengthen: "generosity", challenge: "self-neglect", seed: "Helping someone reveals a need the character has been hiding." },
  journey: { strengthen: "adaptability", challenge: "control", seed: "A wrong turn introduces someone who changes the destination." },
  conflict: { strengthen: "courage", challenge: "rigidity", seed: "Both sides are partly right, so the character must invent a third way." },
  reconciliation: { strengthen: "forgiveness", challenge: "resentment", seed: "An apology opens the door but does not instantly repair what happened." },
};

/** Initialize a character genome from a three-way blend. */
export function createInfluenceGenome(influences: Influence[]): InfluenceGenome {
  const lead = influences[0];
  const counter = influences[2] ?? influences[1] ?? lead;
  if (!lead || !counter) {
    return {
      sourceIds: [], dominant: "curiosity", counterforce: "caution", activeStrengths: [],
      activeShadows: [], unresolvedContradiction: "The character is still discovering who they are.",
      expression: 0, evolutionStage: 0, recentEventIds: [], storySeeds: [],
    };
  }
  return {
    sourceIds: influences.map((item) => item.id),
    dominant: lead.strengths[0] ?? lead.essence,
    counterforce: counter.shadows[0] ?? "uncertainty",
    activeStrengths: [...new Set(influences.flatMap((item) => item.strengths.slice(0, 2)))].slice(0, 5),
    activeShadows: [...new Set(influences.flatMap((item) => item.shadows.slice(0, 2)))].slice(0, 4),
    unresolvedContradiction: counter.contradiction,
    expression: 0,
    evolutionStage: 0,
    recentEventIds: [],
    storySeeds: influences.flatMap((item) => item.storyEngines.slice(0, 1)).slice(0, 3),
  };
}

/**
 * Events and relationships change which traits are expressed, not the character's
 * underlying identity. Deterministic and persistence-friendly for save files.
 */
export function evolveInfluenceGenome(genome: InfluenceGenome, event: GenomeEvent): InfluenceGenome {
  if (genome.recentEventIds.includes(event.id)) return genome;
  const effect = EVENT_EFFECTS[event.kind];
  const relationshipSeed = event.relationship
    ? `Their ${event.relationship} relationship changes how the event is understood.`
    : "";
  const strength = effect.strengthen;
  const shadow = effect.challenge;
  const activeStrengths = [strength, ...genome.activeStrengths.filter((item) => item !== strength)].slice(0, 5);
  const activeShadows = [shadow, ...genome.activeShadows.filter((item) => item !== shadow)].slice(0, 4);
  const storySeeds = [
    `${event.summary} ${effect.seed}`,
    ...(relationshipSeed ? [relationshipSeed] : []),
    ...genome.storySeeds,
  ].slice(0, 8);
  const expression = Math.min(100, genome.expression + 12);
  return {
    ...genome,
    activeStrengths,
    activeShadows,
    expression,
    evolutionStage: Math.min(5, Math.floor(expression / 20)),
    recentEventIds: [...genome.recentEventIds, event.id].slice(-40),
    storySeeds,
  };
}

/** Convert a life event into concise animation-friendly direction. */
export function genomeAnimationCue(genome: InfluenceGenome, event: GenomeEvent) {
  const conflict = genome.activeShadows[0] ?? "uncertainty";
  const strength = genome.activeStrengths[0] ?? genome.dominant;
  return {
    emotionalTurn: `From ${conflict} toward ${strength}`,
    visualMotif: genome.evolutionStage >= 3 ? "repeat an established motif, but change its meaning" : "introduce one motif tied to the event",
    action: event.kind === "conflict" || event.kind === "betrayal"
      ? "hold a beat, look away, then make one decisive movement"
      : event.kind === "reconciliation" || event.kind === "friendship"
        ? "hesitate, mirror the other character's gesture, then soften"
        : "show the feeling through a small repeated habit before the scene changes",
    storySeed: genome.storySeeds[0] ?? event.summary,
  };
}

/** Craiyon prompt handoff: Craiyon has no supported public generation API. */
export type HomieImageInput = {
  name: string;
  archetype?: string;
  appearance?: string;
  personality?: string;
  setting?: string;
  style?: string;
};
export function buildHomieImagePrompt(input: HomieImageInput): string {
  const clean = (s?: string) => (s ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 400);
  return [
    "Original character portrait, single character, no text or watermark.",
    `Name: ${clean(input.name) || "Unnamed Homie"}.`,
    input.archetype && `Archetype: ${clean(input.archetype)}.`,
    input.appearance && `Appearance: ${clean(input.appearance)}.`,
    input.personality && `Personality: ${clean(input.personality)}.`,
    input.setting && `Background: ${clean(input.setting)}.`,
    `Art direction: ${clean(input.style) || "expressive colorful character illustration"}.`,
    "Consistent facial features, clear silhouette, detailed composition."
  ].filter(Boolean).join(" ");
}
export const CRAIYON_URL = "https://www.craiyon.com/en";
export function openCraiyon(): void {
  if (typeof window !== "undefined") window.open(CRAIYON_URL, "_blank", "noopener,noreferrer");
}

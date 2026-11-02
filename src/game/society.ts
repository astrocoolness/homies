/** Deterministic, consent-aware HOMIES society *preview* (local only).
 * No social posts, hidden cloud requests, cross-app account writes or paid inference.
 * Future durable jobs need authenticated identity, moderation and a server-owned clock.
 */
export type SocietyParticipant = { id: string; name: string; energy: number; consent: boolean };
export type SocietyEvent = {
  id: string; tick: number; kind: 'conversation' | 'collaboration' | 'rest';
  actors: string[]; message: string
};
export type SocietyState = { tick: number; seed: number; events: SocietyEvent[] };
const ACTIONS = ['conversation', 'collaboration'] as const;
const finiteEnergy = (n: number) => Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;

export function initialSociety(seed = 123456789): SocietyState {
  if (!Number.isSafeInteger(seed) || seed < 1 || seed > 0xffffffff) throw new TypeError('Invalid society seed');
  return { tick: 0, seed, events: [] };
}
function roll(n: number) {
  let x = n >>> 0; x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
  return x >>> 0;
}
export function advanceSociety(state: SocietyState, agents: SocietyParticipant[]): SocietyState {
  if (!Number.isSafeInteger(state.tick) || state.tick < 0 || state.tick >= 100000 ||
      !Number.isSafeInteger(state.seed) || state.seed < 1) throw new TypeError('Invalid society state');
  if (!Array.isArray(agents) || agents.length > 100) throw new TypeError('Invalid participants');
  const ids = new Set<string>();
  for (const a of agents) {
    if (!a || typeof a.id !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(a.id) ||
        typeof a.name !== 'string' || !a.name.trim() || a.name.length > 80 ||
        typeof a.consent !== 'boolean' || !Number.isFinite(a.energy)) throw new TypeError('Invalid participant');
    if (ids.has(a.id)) throw new TypeError('Duplicate participant');
    ids.add(a.id);
  }
  const tick = state.tick + 1;
  const seed = roll(state.seed);
  // Default deny: only explicitly opted-in, awake/energetic participants may interact.
  const eligible = agents.filter(a => a.consent && finiteEnergy(a.energy) >= 25).sort((a,b)=>a.id.localeCompare(b.id));
  if (eligible.length < 2) return { tick, seed, events: state.events.slice(-99) };
  const firstIndex = seed % eligible.length;
  const secondIndex = (firstIndex + 1 + ((seed >>> 8) % (eligible.length - 1))) % eligible.length;
  const a = eligible[firstIndex], b = eligible[secondIndex];
  const kind = ACTIONS[(seed >>> 16) % ACTIONS.length];
  const message = kind === 'collaboration'
    ? `${a.name} and ${b.name} teamed up to plan a shared project.`
    : `${a.name} and ${b.name} exchanged stories and checked in on each other.`;
  const event: SocietyEvent = { id: `society-${tick}-${seed}`, tick, kind, actors: [a.id,b.id], message };
  return { tick, seed, events: [...state.events.slice(-99),event] };
}

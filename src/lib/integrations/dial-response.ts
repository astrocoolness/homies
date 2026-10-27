/** Deterministic, stat-aware Dial response router. Safe for server and browser. */
export type DialHomie = {
  identity: { name: string; tagline?: string }
  archetype: string
  stats: { hunger: number; socialBattery: number; chaos?: number }
}
export type DialResult = { text: string; mood: 'hungry' | 'offline' | 'engaged' | 'casual'; animation: string }
const clamp = (n: unknown) => typeof n === 'number' && Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 50
function hash(input: string): number {
  let h = 2166136261
  for (const c of input) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return h >>> 0
}
export function routeDialResponse(homie: DialHomie, message: string, turn = 0): DialResult {
  const hunger = clamp(homie.stats?.hunger)
  const battery = clamp(homie.stats?.socialBattery)
  const name = homie.identity?.name?.trim().slice(0, 80) || 'Homie'
  const msg = String(message ?? '').toLowerCase().slice(0, 2000)
  if (hunger < 30) return { text: `*[${name}'s stomach growls]* I need a snack before we get into this.`, mood: 'hungry', animation: 'stomach-growl' }
  if (battery < 20) return { text: `Low social battery (${Math.round(battery)}%). I'll get back to you after I recharge.`, mood: 'offline', animation: 'sleepy-idle' }
  if (homie.archetype === 'Synth-Punk' && /\b(synth|music|modular|beat)\b/.test(msg))
    return { text: 'Been experimenting with a modular patch. Want to hear what I made?', mood: 'engaged', animation: 'head-bob' }
  if (homie.archetype === 'Cyber-Goth' && /\b(css|layout|flyspace|profile)\b/.test(msg))
    return { text: 'I just rebuilt my Flyspace profile with CRT-inspired details.', mood: 'engaged', animation: 'typing' }
  const lines = [
    'Vibing in the underground network. What are you up to?',
    'My Top 8 has been causing drama again.',
    'Processing ideas. Maybe too much caffeine.',
    'Come by the lab sometime. I have something to show you.'
  ]
  return { text: lines[hash(name + ':' + msg + ':' + turn) % lines.length], mood: 'casual', animation: 'idle-talk' }
}

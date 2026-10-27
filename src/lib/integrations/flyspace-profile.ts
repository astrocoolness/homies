/**
 * Shared Homies -> Flyspace profile payload.
 * No provider-specific API assumptions: the receiving service must implement
 * an authenticated, idempotent upsert endpoint before this is enabled.
 */
export type HomieProfile = {
  id: string
  displayName: string
  biography?: string
  personality: { traits: string[]; interests: string[]; voice?: string; goals?: string[] }
  appearance: { avatarUrl?: string; coverUrl?: string; referenceUrls: string[] }
  media: { id: string; kind: 'photo' | 'animation' | 'video'; url: string; caption?: string }[]
  animations: { id: string; name: string; motionRef: string; durationMs?: number }[]
  theme?: { mood?: string; accent?: string; background?: string }
  updatedAt: string
}
export type FlyspaceProfileUpsert = {
  source: 'homies'
  externalId: string
  slug: string
  displayName: string
  bio: string
  avatarUrl?: string
  coverUrl?: string
  personality: HomieProfile['personality']
  media: HomieProfile['media']
  animations: HomieProfile['animations']
  theme?: HomieProfile['theme']
  updatedAt: string
}
export function toFlyspaceProfile(character: HomieProfile): FlyspaceProfileUpsert {
  if (!character.id.trim() || !character.displayName.trim()) {
    throw new Error('Character ID and display name are required')
  }
  const slug = character.displayName.toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '').slice(0, 48) || 'homie'
  return {
    source: 'homies', externalId: character.id,
    slug: slug + '-' + character.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).toLowerCase(),
    displayName: character.displayName, bio: character.biography || '',
    avatarUrl: character.appearance.avatarUrl,
    coverUrl: character.appearance.coverUrl,
    personality: character.personality,
    media: character.media.filter(m => /^https:\/\//.test(m.url)),
    animations: character.animations,
    theme: character.theme, updatedAt: character.updatedAt
  }
}
/**
 * Invoke ONLY from a trusted server-side job after saving the character.
 * Do not expose tokens in browser bundles. Caller handles queue/retry and
 * supplies an authenticated transport. Never silently report success.
 */
export async function syncFlyspaceProfile(
  character: HomieProfile,
  send: (payload: FlyspaceProfileUpsert, idempotencyKey: string) => Promise<void>
): Promise<void> {
  const payload = toFlyspaceProfile(character)
  await send(payload, 'homies:' + character.id + ':' + character.updatedAt)
}

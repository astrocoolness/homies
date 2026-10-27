import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/integrations/flyspace-profile.ts', import.meta.url), 'utf8')
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const exports = {}
new Function('exports', js)(exports)
const { toFlyspaceProfile, syncFlyspaceProfile } = exports

function character(overrides = {}) {
  return {
    id: 'hom-42', displayName: 'Roxy Stardust', biography: 'Night photographer',
    personality: { traits: ['curious'], interests: ['music'] },
    appearance: { avatarUrl: 'https://example.com/roxy.png', referenceUrls: [] },
    media: [{ id: 'photo-1', kind: 'photo', url: 'https://example.com/p.png' }],
    animations: [{ id: 'dance', name: 'Dance', motionRef: 'motion-1' }],
    updatedAt: '2026-10-27T00:00:00Z', ...overrides
  }
}
test('maps identity, media, personality, and motion to stable profile', () => {
  const p = toFlyspaceProfile(character())
  assert.equal(p.externalId, 'hom-42')
  assert.equal(p.slug, 'roxy-stardust-hom42')
  assert.equal(p.media.length, 1)
  assert.equal(p.animations[0].motionRef, 'motion-1')
  assert.deepEqual(p.personality.traits, ['curious'])
})
test('rejects missing character identity', () => {
  assert.throws(() => toFlyspaceProfile(character({ id: ' ' })))
})
test('filters non-HTTPS media references', () => {
  const p = toFlyspaceProfile(character({ media: [
    { id: 'unsafe', kind: 'photo', url: 'javascript:alert(1)' },
    { id: 'safe', kind: 'photo', url: 'https://example.com/safe.png' }
  ] }))
  assert.deepEqual(p.media.map(x => x.id), ['safe'])
})
test('uses stable idempotency key and propagates transport failures', async () => {
  let captured
  await syncFlyspaceProfile(character(), async (payload, key) => { captured = { payload, key } })
  assert.equal(captured.key, 'homies:hom-42:2026-10-27T00:00:00Z')
  await assert.rejects(syncFlyspaceProfile(character(), async () => { throw new Error('offline') }), /offline/)
})

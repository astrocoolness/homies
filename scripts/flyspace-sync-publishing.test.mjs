import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Integration-style proof for the Homies -> Flyspace publishing contract in
// src/lib/integrations/flyspace-profile.ts (PR #4). That module's header
// requires the receiving service to implement "an authenticated, idempotent
// upsert endpoint" and leaves queue/retry + transport to the caller. There is
// no production receiver in this repo yet, so this test drives the REAL
// contract functions (toFlyspaceProfile via syncFlyspaceProfile) against a
// local in-memory receiver that implements exactly the documented receiver
// semantics:
//   - dedupe by the idempotency key supplied with each publish,
//   - one profile per (source, externalId) — upsert, never duplicate,
//   - event version = payload.updatedAt: an update whose version is not
//     newer than the stored profile's is stale and is ignored,
//   - field ownership: a field the Flyspace user has customized is owned by
//     Flyspace and is preserved on resync; Homies-owned fields still update.
const source = readFileSync(new URL('../src/lib/integrations/flyspace-profile.ts', import.meta.url), 'utf8')
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const exports = {}
new Function('exports', js)(exports)
const { syncFlyspaceProfile } = exports

function character(overrides = {}) {
  return {
    id: 'hom-42', displayName: 'Roxy Stardust', biography: 'Night photographer',
    personality: { traits: ['curious'], interests: ['music'] },
    appearance: { avatarUrl: 'https://example.com/roxy-v1.png', referenceUrls: [] },
    media: [{ id: 'photo-1', kind: 'photo', url: 'https://example.com/p.png' }],
    animations: [{ id: 'dance', name: 'Dance', motionRef: 'motion-1' }],
    updatedAt: '2026-10-27T00:00:00Z', ...overrides
  }
}

function createFlyspaceReceiver() {
  const profiles = new Map() // `${source}:${externalId}` -> stored profile
  const seenKeys = new Set() // idempotency keys already applied
  const userOwnedFields = new Map() // profile key -> Set<field>
  return {
    profiles,
    async upsert(payload, idempotencyKey) {
      if (seenKeys.has(idempotencyKey)) return { applied: false, status: 'duplicate' }
      seenKeys.add(idempotencyKey)
      const key = payload.source + ':' + payload.externalId
      const existing = profiles.get(key)
      if (existing && Date.parse(payload.updatedAt) <= Date.parse(existing.updatedAt)) {
        return { applied: false, status: 'stale' }
      }
      const next = { ...payload }
      if (existing) {
        for (const field of userOwnedFields.get(key) ?? []) next[field] = existing[field]
      }
      profiles.set(key, next)
      return { applied: true, status: existing ? 'updated' : 'created' }
    },
    // Simulate the Flyspace user editing a field on their published profile.
    customizeLocally(externalId, field, value) {
      const key = 'homies:' + externalId
      const profile = profiles.get(key)
      assert.ok(profile, 'profile must exist before local customization')
      profile[field] = value
      if (!userOwnedFields.has(key)) userOwnedFields.set(key, new Set())
      userOwnedFields.get(key).add(field)
    }
  }
}

// Publish through the real contract function, recording keys and receiver verdicts.
async function publish(receiver, homie, record) {
  await syncFlyspaceProfile(homie, async (payload, key) => {
    record.keys.push(key)
    record.verdicts.push(await receiver.upsert(payload, key))
  })
}

test('publishing the same character twice with the same idempotency key creates no duplicate profile', async () => {
  const receiver = createFlyspaceReceiver()
  const record = { keys: [], verdicts: [] }
  await publish(receiver, character(), record)
  await publish(receiver, character(), record)
  assert.equal(record.keys[0], record.keys[1])
  assert.deepEqual(record.verdicts.map(v => v.status), ['created', 'duplicate'])
  assert.equal(receiver.profiles.size, 1)
  // A genuine newer update upserts the SAME profile instead of duplicating it.
  await publish(receiver, character({
    updatedAt: '2026-10-28T00:00:00Z',
    appearance: { avatarUrl: 'https://example.com/roxy-v2.png', referenceUrls: [] }
  }), record)
  assert.equal(record.verdicts[2].status, 'updated')
  assert.equal(receiver.profiles.size, 1)
  assert.equal(receiver.profiles.get('homies:hom-42').avatarUrl, 'https://example.com/roxy-v2.png')
})

test('a stale older-version update is ignored after a newer publish', async () => {
  const receiver = createFlyspaceReceiver()
  const record = { keys: [], verdicts: [] }
  await publish(receiver, character({
    updatedAt: '2026-10-28T00:00:00Z', biography: 'Newer bio'
  }), record)
  await publish(receiver, character({
    updatedAt: '2026-10-27T00:00:00Z', biography: 'Stale bio',
    appearance: { avatarUrl: 'https://example.com/roxy-old.png', referenceUrls: [] }
  }), record)
  assert.equal(record.verdicts[1].status, 'stale')
  assert.equal(record.verdicts[1].applied, false)
  const stored = receiver.profiles.get('homies:hom-42')
  assert.equal(stored.bio, 'Newer bio')
  assert.equal(stored.avatarUrl, 'https://example.com/roxy-v1.png')
  assert.equal(stored.updatedAt, '2026-10-28T00:00:00Z')
})

test('a user-customized Flyspace field is preserved on resync while Homies-owned fields update', async () => {
  const receiver = createFlyspaceReceiver()
  const record = { keys: [], verdicts: [] }
  await publish(receiver, character(), record)
  receiver.customizeLocally('hom-42', 'bio', 'My own words, edited on Flyspace')
  await publish(receiver, character({
    updatedAt: '2026-10-28T00:00:00Z', biography: 'Homies-side rewrite',
    appearance: { avatarUrl: 'https://example.com/roxy-v2.png', referenceUrls: [] }
  }), record)
  assert.equal(record.verdicts[1].status, 'updated')
  const stored = receiver.profiles.get('homies:hom-42')
  assert.equal(stored.bio, 'My own words, edited on Flyspace')
  assert.equal(stored.avatarUrl, 'https://example.com/roxy-v2.png')
  assert.equal(receiver.profiles.size, 1)
})

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  createMemoryFlyspaceSyncStore,
  isFlyspaceSyncEnabled,
  listFlyspaceSyncEvents,
  processFlyspaceSyncQueue,
  queueFlyspaceSync
} from '../src/lib/integrations/flyspace-sync-publisher.ts'

// The publisher is the production caller the flyspace-profile.ts contract
// always required. These tests drive the REAL publisher + contract code
// with an injected mock transport and an in-memory event store.
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
const noSleep = async () => {}

test('publish queues exactly one event and processing sends exactly once with the contract idempotency key', async () => {
  const store = createMemoryFlyspaceSyncStore()
  const event = queueFlyspaceSync(character(), store)
  assert.equal(event.status, 'pending')
  assert.equal(event.key, 'homies:hom-42:2026-10-27T00:00:00Z')
  assert.equal(listFlyspaceSyncEvents(store).length, 1)

  const sends = []
  const report = await processFlyspaceSyncQueue(async (payload, key) => { sends.push({ payload, key }) },
    { store, enabled: true, sleep: noSleep })
  assert.equal(sends.length, 1)
  assert.equal(sends[0].key, 'homies:hom-42:2026-10-27T00:00:00Z')
  assert.equal(sends[0].payload.externalId, 'hom-42')
  assert.deepEqual(report, { enabled: true, sent: 1, published: 1, failed: 0, pending: 0 })
  const [stored] = listFlyspaceSyncEvents(store)
  assert.equal(stored.status, 'published')
  assert.ok(stored.publishedAt)
})

test('queueing the same character version twice creates no second event and sends nothing extra', async () => {
  const store = createMemoryFlyspaceSyncStore()
  const first = queueFlyspaceSync(character(), store)
  const second = queueFlyspaceSync(character(), store)
  assert.equal(second.key, first.key)
  assert.equal(listFlyspaceSyncEvents(store).length, 1)

  let calls = 0
  const transport = async () => { calls += 1 }
  await processFlyspaceSyncQueue(transport, { store, enabled: true, sleep: noSleep })
  assert.equal(calls, 1)
  // Re-queueing after publish and re-processing still sends nothing.
  queueFlyspaceSync(character(), store)
  const report = await processFlyspaceSyncQueue(transport, { store, enabled: true, sleep: noSleep })
  assert.equal(calls, 1)
  assert.equal(report.sent, 0)
  assert.equal(listFlyspaceSyncEvents(store).length, 1)
  // A genuinely newer version is a new event with its own key.
  const newer = queueFlyspaceSync(character({ updatedAt: '2026-10-28T00:00:00Z' }), store)
  assert.equal(newer.key, 'homies:hom-42:2026-10-28T00:00:00Z')
  assert.equal(listFlyspaceSyncEvents(store).length, 2)
})

test('a transient failure is retried and the event is marked published only after success', async () => {
  const store = createMemoryFlyspaceSyncStore()
  queueFlyspaceSync(character(), store)
  let calls = 0
  const report = await processFlyspaceSyncQueue(async () => {
    calls += 1
    if (calls === 1) throw new Error('temporary 503')
  }, { store, enabled: true, sleep: noSleep })
  assert.equal(calls, 2)
  assert.deepEqual(report, { enabled: true, sent: 2, published: 1, failed: 0, pending: 0 })
  const [stored] = listFlyspaceSyncEvents(store)
  assert.equal(stored.status, 'published')
  assert.equal(stored.attempts, 2)
  assert.equal(stored.lastError, undefined)
})

test('a permanent failure is recorded with its error and never marked published', async () => {
  const store = createMemoryFlyspaceSyncStore()
  queueFlyspaceSync(character(), store)
  const report = await processFlyspaceSyncQueue(async () => { throw new Error('receiver exploded') },
    { store, enabled: true, maxAttempts: 3, sleep: noSleep })
  assert.deepEqual(report, { enabled: true, sent: 3, published: 0, failed: 1, pending: 0 })
  const [stored] = listFlyspaceSyncEvents(store)
  assert.equal(stored.status, 'failed')
  assert.equal(stored.attempts, 3)
  assert.match(stored.lastError, /receiver exploded/)
  assert.equal(stored.publishedAt, undefined)
})

test('flag OFF: events still queue, processing sends nothing and leaves them pending', async () => {
  assert.equal(isFlyspaceSyncEnabled(), false) // default in any unconfigured environment
  const store = createMemoryFlyspaceSyncStore()
  queueFlyspaceSync(character(), store)
  let calls = 0
  const report = await processFlyspaceSyncQueue(async () => { calls += 1 },
    { store, enabled: false, sleep: noSleep })
  assert.equal(calls, 0)
  assert.deepEqual(report, { enabled: false, sent: 0, published: 0, failed: 0, pending: 1 })
  const [stored] = listFlyspaceSyncEvents(store)
  assert.equal(stored.status, 'pending')
  assert.equal(stored.attempts, 0)
})

test('the real publish flow queues a Flyspace sync (source contract)', () => {
  const cloudSync = readFileSync(new URL('../src/game/cloud-sync.ts', import.meta.url), 'utf8')
  assert.match(cloudSync, /export async function publishHomie/)
  assert.match(cloudSync, /queueFlyspaceSync\(character\)/)
  assert.match(cloudSync, /toHomieProfile\(id, homie/)
  const publisher = readFileSync(new URL('../src/lib/integrations/flyspace-sync-publisher.ts', import.meta.url), 'utf8')
  assert.match(publisher, /VITE_FLYSPACE_SYNC_ENABLED/)
  assert.match(publisher, /homies\.flyspace-sync\.v1/)
})

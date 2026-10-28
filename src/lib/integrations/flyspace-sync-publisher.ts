/**
 * Homies -> Flyspace sync publisher: the caller the profile contract in
 * flyspace-profile.ts always required ("Caller handles queue/retry and
 * supplies an authenticated transport").
 *
 * Saving/publishing a Homie queues a durable sync event here; a separate
 * processing step drains the queue through syncFlyspaceProfile with an
 * injected, authenticated transport. There is NO real Flyspace receiver
 * endpoint yet, so the feature flag defaults to OFF: queueing still records
 * events, and processing reports them as awaiting a receiver — it never
 * marks them published without a real transport success.
 */
import { syncFlyspaceProfile, toFlyspaceProfile, type FlyspaceProfileUpsert, type HomieProfile } from "./flyspace-profile.ts";

export type FlyspaceSyncTransport = (payload: FlyspaceProfileUpsert, idempotencyKey: string) => Promise<void>;

export type FlyspaceSyncEventStatus = "pending" | "published" | "failed";

export type FlyspaceSyncEvent = {
  /** Idempotency key, identical to the one syncFlyspaceProfile sends. */
  key: string;
  characterId: string;
  updatedAt: string;
  character: HomieProfile;
  status: FlyspaceSyncEventStatus;
  attempts: number;
  queuedAt: string;
  publishedAt?: string;
  lastError?: string;
};

export type FlyspaceSyncStore = {
  load: () => FlyspaceSyncEvent[];
  save: (events: FlyspaceSyncEvent[]) => void;
};

const QUEUE_KEY = "homies.flyspace-sync.v1";

/** Durable store following the game's localStorage pattern (keeper/save). */
export const localStorageFlyspaceSyncStore: FlyspaceSyncStore = {
  load: () => {
    if (typeof localStorage === "undefined") return [];
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? (parsed as FlyspaceSyncEvent[]) : [];
    } catch {
      return [];
    }
  },
  save: (events) => {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(events));
    } catch {
      /* quota/denied: the in-flight report still tells the truth */
    }
  },
};

/** Volatile store for tests and non-browser runtimes. */
export function createMemoryFlyspaceSyncStore(): FlyspaceSyncStore {
  let events: FlyspaceSyncEvent[] = [];
  return {
    load: () => events.map((event) => ({ ...event })),
    save: (next) => {
      events = next.map((event) => ({ ...event }));
    },
  };
}

let fallbackStore: FlyspaceSyncStore | null = null;
/** localStorage where available, otherwise a per-session memory store. */
export function defaultFlyspaceSyncStore(): FlyspaceSyncStore {
  if (typeof localStorage !== "undefined") return localStorageFlyspaceSyncStore;
  fallbackStore ??= createMemoryFlyspaceSyncStore();
  return fallbackStore;
}

export function flyspaceSyncKey(character: HomieProfile): string {
  return `homies:${character.id}:${character.updatedAt}`;
}

/**
 * Feature flag, following the repo's VITE_* env pattern (see
 * src/lib/auth/client.ts). Defaults to OFF — opt in with
 * VITE_FLYSPACE_SYNC_ENABLED=true only once a real authenticated Flyspace
 * receiver endpoint exists.
 */
export function isFlyspaceSyncEnabled(): boolean {
  const viteEnv = (import.meta as { env?: Record<string, string | undefined> }).env;
  if (viteEnv?.VITE_FLYSPACE_SYNC_ENABLED !== undefined) return viteEnv.VITE_FLYSPACE_SYNC_ENABLED === "true";
  if (typeof process !== "undefined") return process.env?.VITE_FLYSPACE_SYNC_ENABLED === "true";
  return false;
}

/**
 * Record a pending sync event for a saved character. Idempotent: queueing
 * the same character version again returns the existing event instead of
 * creating a duplicate, whatever its status.
 */
export function queueFlyspaceSync(
  character: HomieProfile,
  store: FlyspaceSyncStore = defaultFlyspaceSyncStore(),
): FlyspaceSyncEvent {
  toFlyspaceProfile(character); // fail fast on an unpublishable character
  const key = flyspaceSyncKey(character);
  const events = store.load();
  const existing = events.find((event) => event.key === key);
  if (existing) return existing;
  const event: FlyspaceSyncEvent = {
    key,
    characterId: character.id,
    updatedAt: character.updatedAt,
    character,
    status: "pending",
    attempts: 0,
    queuedAt: new Date().toISOString(),
  };
  store.save([...events, event]);
  return event;
}

export function listFlyspaceSyncEvents(store: FlyspaceSyncStore = defaultFlyspaceSyncStore()): FlyspaceSyncEvent[] {
  return store.load();
}

export type FlyspaceSyncReport = {
  enabled: boolean;
  /** Transport invocations actually made. */
  sent: number;
  published: number;
  failed: number;
  /** Events still waiting (includes every event when the flag is off). */
  pending: number;
};

export type ProcessFlyspaceSyncOptions = {
  store?: FlyspaceSyncStore;
  enabled?: boolean;
  /** Total send attempts per event before the failure is recorded. */
  maxAttempts?: number;
  /** First retry delay; doubles each attempt (bounded by maxAttempts). */
  backoffMs?: number;
  sleep?: (ms: number) => Promise<void>;
};

const realSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Drain pending events through the contract with the caller's transport.
 * An event is marked published ONLY after the transport resolves. Failures
 * retry with bounded exponential backoff; a failure that exhausts its
 * attempts is recorded on the event with its error — never hidden, never
 * reported as success. With the flag off nothing is sent and every event
 * stays pending (awaiting a receiver).
 */
export async function processFlyspaceSyncQueue(
  transport: FlyspaceSyncTransport,
  options: ProcessFlyspaceSyncOptions = {},
): Promise<FlyspaceSyncReport> {
  const store = options.store ?? defaultFlyspaceSyncStore();
  const enabled = options.enabled ?? isFlyspaceSyncEnabled();
  const events = store.load();
  const pendingCount = events.filter((event) => event.status === "pending").length;
  if (!enabled) return { enabled: false, sent: 0, published: 0, failed: 0, pending: pendingCount };

  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  const backoffMs = options.backoffMs ?? 200;
  const sleep = options.sleep ?? realSleep;
  let sent = 0;
  let published = 0;
  let failed = 0;

  for (const event of events) {
    if (event.status !== "pending") continue;
    let lastError: unknown = null;
    let delivered = false;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      event.attempts += 1;
      sent += 1;
      try {
        await syncFlyspaceProfile(event.character, transport);
        delivered = true;
        break;
      } catch (err) {
        lastError = err;
        if (attempt < maxAttempts) await sleep(backoffMs * 2 ** (attempt - 1));
      }
    }
    if (delivered) {
      event.status = "published";
      event.publishedAt = new Date().toISOString();
      delete event.lastError;
      published += 1;
    } else {
      event.status = "failed";
      event.lastError = lastError instanceof Error ? lastError.message : String(lastError);
      failed += 1;
      console.error(`[flyspace-sync] ${event.key} failed after ${maxAttempts} attempt(s): ${event.lastError}`);
    }
    store.save(events);
  }

  return {
    enabled: true,
    sent,
    published,
    failed,
    pending: events.filter((event) => event.status === "pending").length,
  };
}

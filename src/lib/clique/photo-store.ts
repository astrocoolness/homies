/**
 * Device-local photo storage for Clique/Flyspace uploads.
 *
 * The free, zero-service storage adapter: photos are kept in IndexedDB on
 * the user's own device — the same local-first pattern Homies already uses
 * for reels (`src/game/reels.ts`). No account, no network, works offline,
 * and an uploaded photo survives page refresh because it is read back from
 * IndexedDB on load. Photos stored here do NOT leave the device; cloud
 * storage (e.g. R2/Supabase) is a separate adapter behind the same
 * `uploadFile` contract, to be added when cross-device profiles ship.
 *
 * References are honest about where the bytes live: `device-photo://<slot>`.
 * Callers turn a stored record back into a displayable object URL with
 * `resolveDevicePhoto` and must revoke that URL when done.
 */

export const PROFILE_PHOTO_SLOT = "profile";

export type StoredPhoto = {
  slot: string;
  blob: Blob;
  type: string;
  name: string;
  size: number;
  at: number;
};

const DB_NAME = "homies-clique-photos";
const STORE = "photos";
const REF_PREFIX = "device-photo://";

export function devicePhotoRef(slot: string): string {
  return `${REF_PREFIX}${slot}`;
}

export function slotFromDevicePhotoRef(ref: string): string | null {
  if (typeof ref !== "string" || !ref.startsWith(REF_PREFIX)) return null;
  const slot = ref.slice(REF_PREFIX.length).trim();
  return slot.length > 0 ? slot : null;
}

export function isDevicePhotoRef(ref: string): boolean {
  return slotFromDevicePhotoRef(ref) !== null;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "slot" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function txDone(tx: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function loadDevicePhoto(slot: string): Promise<StoredPhoto | null> {
  if (typeof indexedDB === "undefined") return null;
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readonly");
    const row = await new Promise<StoredPhoto | undefined>((resolve, reject) => {
      const req = tx.objectStore(STORE).get(slot);
      req.onsuccess = () => resolve(req.result as StoredPhoto | undefined);
      req.onerror = () => reject(req.error);
    });
    await txDone(tx);
    return row ?? null;
  } finally {
    db.close();
  }
}

/**
 * `uploadFile` adapter for ProfilePhotoUploader: validates nothing itself
 * (the uploader validates content first) — it persists the file under
 * `slot`, replacing any previous photo in that slot, and returns its
 * device-photo reference.
 */
export async function uploadPhotoToDevice(slot: string, file: File): Promise<string> {
  if (typeof indexedDB === "undefined") {
    throw new Error("This browser can't store photos on the device.");
  }
  const record: StoredPhoto = {
    slot,
    blob: file,
    type: file.type,
    name: file.name,
    size: file.size,
    at: Date.now(),
  };
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(record);
    await txDone(tx);
  } finally {
    db.close();
  }
  return devicePhotoRef(slot);
}

/** Resolve a stored photo to a displayable object URL (caller revokes). */
export async function resolveDevicePhoto(ref: string): Promise<string | null> {
  const slot = slotFromDevicePhotoRef(ref);
  if (!slot) return null;
  const row = await loadDevicePhoto(slot);
  if (!row) return null;
  return URL.createObjectURL(row.blob);
}

export async function dropDevicePhoto(slot: string): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(slot);
    await txDone(tx);
  } finally {
    db.close();
  }
}

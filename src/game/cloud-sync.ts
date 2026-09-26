import { dropCloudHomie, dropCloudReel, dropCloudShelf, pullCloud, pushCloudHomie, pushCloudReel } from "./cloud";
import { readKeeperId } from "./keeper";
import { restoreHomie } from "./logic";
import { listReels, putReel, type SavedReel } from "./reels";
import type { HomieState, Save, Stage } from "./types";

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function publishHomie(id: string, homie: HomieState) {
  const keeperId = readKeeperId();
  if (!keeperId || !homie.profile || !homie.profile.portrait.startsWith("data:image/")) return;
  await pushCloudHomie({ data: { keeperId, id, stage: homie.stage, profile: homie.profile } }).catch(() => undefined);
}

export async function forgetCloudHomie(id: string) {
  const keeperId = readKeeperId();
  if (!keeperId) return;
  await dropCloudHomie({ data: { keeperId, id } }).catch(() => undefined);
}

export async function forgetCloudShelf() {
  const keeperId = readKeeperId();
  if (!keeperId) return;
  await dropCloudShelf({ data: { keeperId } }).catch(() => undefined);
}

export async function publishReel(reel: SavedReel) {
  const keeperId = readKeeperId();
  if (!keeperId) return;
  try {
    const media = await blobToDataUrl(reel.blob);
    await pushCloudReel({
      data: { keeperId, homieId: reel.homieId, id: reel.id, caption: reel.caption, media },
    });
  } catch {
    /* the phone copy is already kept */
  }
}

export async function forgetCloudReel(id: string) {
  const keeperId = readKeeperId();
  if (!keeperId) return;
  await dropCloudReel({ data: { keeperId, id } }).catch(() => undefined);
}

async function pullReels(
  save: Save,
  reels: { id: string; homieId: string; caption: string; mime: string; url: string; at: number }[],
  pushLocal: boolean,
) {
  const byHomie = new Map<string, typeof reels>();
  for (const reel of reels) {
    const list = byHomie.get(reel.homieId) ?? [];
    list.push(reel);
    byHomie.set(reel.homieId, list);
  }
  for (const id of Object.keys(save.homies)) {
    if (!id.startsWith("c") || !save.homies[id]?.profile) continue;
    const remote = byHomie.get(id) ?? [];
    let local: SavedReel[] = [];
    try {
      local = await listReels(id);
    } catch {
      continue;
    }
    const localIds = new Set(local.map((reel) => reel.id));
    const remoteIds = new Set(remote.map((reel) => reel.id));
    for (const reel of remote) {
      if (localIds.has(reel.id) || local.length >= 3) continue;
      try {
        const res = await fetch(reel.url);
        if (!res.ok) continue;
        const blob = await res.blob();
        await putReel({ id: reel.id, homieId: id, caption: reel.caption, at: reel.at, mime: reel.mime || blob.type, blob });
        local.push({ id: reel.id, homieId: id, caption: reel.caption, at: reel.at, mime: reel.mime, blob });
      } catch {
        /* skip this film */
      }
    }
    for (const reel of local) {
      if (pushLocal && !remoteIds.has(reel.id)) void publishReel(reel);
    }
  }
}

export async function syncKeeper(
  read: () => Save,
  write: (recipe: (save: Save) => Save) => void,
  pushLocal = true,
): Promise<string[] | null> {
  const keeperId = readKeeperId();
  if (!keeperId) return [];
  const remote = await pullCloud({ data: { keeperId } }).catch(() => null);
  if (!remote) return null;
  if (!remote.ok) return remote.reason === "off" ? [] : null;
  const arrived: string[] = [];
  write((save) => {
    let next = save;
    for (const row of remote.homies) {
      const updated = restoreHomie(next, row.id, row.profile, row.stage as Stage);
      if (updated !== next) arrived.push(row.profile.name);
      next = updated;
    }
    return next;
  });
  const save = read();
  const remoteIds = new Set(remote.homies.map((row) => row.id));
  for (const id of Object.keys(save.homies)) {
    const homie = save.homies[id];
    if (!id.startsWith("c") || !homie?.profile || remoteIds.has(id) || !pushLocal) continue;
    void publishHomie(id, homie);
  }
  void pullReels(save, remote.reels, pushLocal);
  return arrived;
}

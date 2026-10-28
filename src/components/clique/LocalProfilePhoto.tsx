import { useCallback, useEffect, useRef, useState } from "react";
import { ProfilePhotoUploader } from "./ProfilePhotoUploader";
import { uploadCliquePhoto } from "@/lib/clique/cloud-photo";
import {
  PROFILE_PHOTO_SLOT,
  dropDevicePhoto,
  loadDevicePhoto,
  resolveDevicePhoto,
  uploadPhotoToDevice,
} from "@/lib/clique/photo-store";

/** Downscale to a JPEG data URL sized for the cloud-upload RPC (the device copy keeps the original file). */
async function cloudCopyDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const max = 1024;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

/**
 * Profile photo, stored on this device (IndexedDB) — the free storage
 * wiring for the Clique/Flyspace uploader. On load it reads the saved
 * photo back, so an uploaded photo survives a page refresh. When a cloud
 * backend (R2 or Supabase) is connected, a downscaled copy is also backed
 * up there and the UI says which happened; the device copy is the one
 * guaranteed to exist, and the copy below says so plainly.
 */
export function LocalProfilePhoto() {
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [cloudNote, setCloudNote] = useState<string | null>(null);
  const liveUrl = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    const row = await loadDevicePhoto(PROFILE_PHOTO_SLOT);
    if (liveUrl.current) URL.revokeObjectURL(liveUrl.current);
    liveUrl.current = null;
    if (!row) {
      setSavedUrl(null);
      setSavedAt(null);
      return;
    }
    const url = await resolveDevicePhoto(`device-photo://${PROFILE_PHOTO_SLOT}`);
    liveUrl.current = url;
    setSavedUrl(url);
    setSavedAt(row.at);
  }, []);

  useEffect(() => {
    void refresh();
    return () => {
      if (liveUrl.current) URL.revokeObjectURL(liveUrl.current);
    };
  }, [refresh]);

  async function remove() {
    await dropDevicePhoto(PROFILE_PHOTO_SLOT);
    await refresh();
  }

  return (
    <div>
      {savedUrl ? (
        <div className="mb-4">
          <img
            src={savedUrl}
            alt="Your saved profile photo"
            className="h-28 w-28 rounded-2xl object-cover"
          />
          <p className="mt-2 text-xs text-neutral-400">
            Saved on this device{savedAt ? ` · ${new Date(savedAt).toLocaleDateString()}` : ""} —
            this copy never leaves it. Cloud backup, when connected, is noted below the uploader.
          </p>
          <button
            type="button"
            onClick={() => void remove()}
            className="mt-2 text-sm font-medium text-neutral-300 underline underline-offset-4 hover:text-white"
          >
            Remove photo
          </button>
        </div>
      ) : (
        <p className="mb-4 text-sm text-neutral-400">
          No profile photo yet. Add one and it will still be here after you refresh.
        </p>
      )}
      <div className="clique-uploader rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200">
        <ProfilePhotoUploader
          label="Choose a photo from your device"
          uploadFile={async (file) => {
            const ref = await uploadPhotoToDevice(PROFILE_PHOTO_SLOT, file);
            // Best-effort cloud backup on top of the guaranteed device copy.
            // Failure (including "not connected") never fails the upload.
            try {
              const dataUrl = await cloudCopyDataUrl(file);
              const result = await uploadCliquePhoto({ data: { dataUrl, slot: PROFILE_PHOTO_SLOT } });
              setCloudNote(
                result.ok
                  ? `Also backed up to ${result.backend === "r2" ? "Cloudflare R2" : "Supabase"}.`
                  : result.error,
              );
            } catch {
              setCloudNote("Cloud backup didn't go through — the photo is safe on this device.");
            }
            return ref;
          }}
          onUploaded={() => refresh()}
        />
        {cloudNote && <p className="mt-3 text-xs text-neutral-400">{cloudNote}</p>}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { ProfilePhotoUploader } from "./ProfilePhotoUploader";
import {
  PROFILE_PHOTO_SLOT,
  dropDevicePhoto,
  loadDevicePhoto,
  resolveDevicePhoto,
  uploadPhotoToDevice,
} from "@/lib/clique/photo-store";

/**
 * Profile photo, stored on this device (IndexedDB) — the free storage
 * wiring for the Clique/Flyspace uploader. On load it reads the saved
 * photo back, so an uploaded photo survives a page refresh. Nothing is
 * sent anywhere; the copy says so, because device-local is a real limit
 * (the photo won't appear on another device until cloud sync exists).
 */
export function LocalProfilePhoto() {
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
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
            Saved on this device{savedAt ? ` · ${new Date(savedAt).toLocaleDateString()}` : ""}. It
            stays here — it is not uploaded to a server.
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
          uploadFile={(file) => uploadPhotoToDevice(PROFILE_PHOTO_SLOT, file)}
          onUploaded={() => refresh()}
        />
      </div>
    </div>
  );
}

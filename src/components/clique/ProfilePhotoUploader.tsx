import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { validatePhotoFile } from "@/lib/clique/photo-upload";

/**
 * Real device photo upload for Clique/Flyspace profiles.
 *
 * Storage-agnostic: the caller supplies `uploadFile`, which persists the
 * validated file (e.g. to authenticated object storage) and returns its URL.
 * This component owns ONLY upload state. It imports no generation code —
 * selecting or uploading a photo can never start Surprise Me / invent /
 * mint, and a failed upload never falls back to a generated image. If the
 * caller's persistence step (`onUploaded`) fails after storage succeeds,
 * the caller is responsible for removing the orphaned object; the failure
 * is surfaced here and the selection is kept so the user can retry.
 */
export type ProfilePhotoUploaderProps = {
  uploadFile: (file: File) => Promise<string>;
  onUploaded: (url: string) => Promise<void> | void;
  label?: string;
};

export function ProfilePhotoUploader({ uploadFile, onUploaded, label }: ProfilePhotoUploaderProps) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function choose(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    // Reset the input so picking the same file again re-fires onChange.
    event.target.value = "";
    setDone(false);
    setError("");
    setSelected(null);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
    if (!file) return;
    const result = await validatePhotoFile(file);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSelected(file);
    setPreview(URL.createObjectURL(file));
  }

  async function upload() {
    if (!selected || busy) return;
    setBusy(true);
    setError("");
    try {
      const url = await uploadFile(selected);
      await onUploaded(url);
      setSelected(null);
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old);
        return null;
      });
      setDone(true);
    } catch (cause) {
      // Keep the selection + preview so the user can retry. No fallback.
      setError(cause instanceof Error ? cause.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label="Upload profile photo">
      <label htmlFor="clique-photo-file">{label ?? "Choose a photo from your device"}</label>
      <input
        id="clique-photo-file"
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => void choose(event)}
        disabled={busy}
      />
      {preview && (
        <img src={preview} alt="Selected photo preview" style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }} />
      )}
      {error && <p role="alert">{error}</p>}
      {done && <p role="status">Photo saved.</p>}
      <button type="button" onClick={() => void upload()} disabled={!selected || busy}>
        {busy ? "Uploading…" : "Save selected photo"}
      </button>
    </section>
  );
}

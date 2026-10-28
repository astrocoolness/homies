export async function framesToGif(dataUrls: string[]): Promise<string | null> {
  const frames = dataUrls.map((url) => Buffer.from(url.split(",")[1], "base64"));
  if (frames.length < 2) return null;
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { execFile } = await import("node:child_process");
  const id = Math.random().toString(36).slice(2);
  const dir = path.join(os.tmpdir(), `homie-gif-${id}`);
  const output = path.join(dir, "out.gif");
  try {
    await fs.mkdir(dir, { recursive: true });
    const inputs: string[] = [];
    const filters: string[] = [];
    for (let i = 0; i < frames.length; i++) {
      const extension = dataUrls[i].startsWith("data:image/png")
        ? "png"
        : dataUrls[i].startsWith("data:image/webp")
          ? "webp"
          : "jpg";
      const file = path.join(dir, `f${i}.${extension}`);
      await fs.writeFile(file, frames[i]);
      inputs.push("-threads", "1", "-loop", "1", "-t", "0.5", "-i", file);
      filters.push(
        `[${i}:v]scale=320:320:force_original_aspect_ratio=decrease,pad=320:320:(ow-iw)/2:(oh-ih)/2,setsar=1[v${i}]`,
      );
    }
    filters.push(
      `${frames.map((_, i) => `[v${i}]`).join("")}concat=n=${frames.length}:v=1:a=0,fps=2,format=rgb24,split[s0][s1];[s0]palettegen=max_colors=48[p];[s1][p]paletteuse=dither=bayer`,
    );
    await new Promise<void>((resolve, reject) => {
      execFile(
        "ffmpeg",
        [
          "-y",
          "-loglevel",
          "error",
          "-filter_complex_threads",
          "1",
          ...inputs,
          "-filter_complex",
          filters.join(";"),
          "-loop",
          "0",
          output,
        ],
        { timeout: 10_000 },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    const bytes = await fs.readFile(output);
    if (bytes.length >= 100 && bytes.length <= 1_800_000) {
      return `data:image/gif;base64,${bytes.toString("base64")}`;
    }
  } catch {
    // ffmpeg unavailable
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
  return null;
}

export async function videoToGif(mp4: Uint8Array): Promise<string | null> {
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { execFile } = await import("node:child_process");
  const id = Math.random().toString(36).slice(2);
  const input = path.join(os.tmpdir(), `homie-${id}.mp4`);
  const output = path.join(os.tmpdir(), `homie-${id}.gif`);
  try {
    await fs.writeFile(input, mp4);
    await new Promise<void>((resolve, reject) => {
      execFile(
        "ffmpeg",
        [
          "-y",
          "-loglevel",
          "error",
          "-threads",
          "1",
          "-filter_complex_threads",
          "1",
          "-filter_threads",
          "1",
          "-i",
          input,
          "-t",
          "6",
          "-vf",
          "fps=8,scale=320:-1:flags=lanczos,format=rgb24,split[s0][s1];[s0]palettegen=max_colors=48[p];[s1][p]paletteuse=dither=bayer",
          output,
        ],
        { timeout: 10_000 },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    const bytes = await fs.readFile(output);
    if (bytes.length < 40 || bytes.length > 1_800_000) return null;
    return `data:image/gif;base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  } finally {
    await fs.unlink(input).catch(() => undefined);
    await fs.unlink(output).catch(() => undefined);
  }
}

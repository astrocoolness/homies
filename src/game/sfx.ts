import type { Sound } from "./types";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const audio = context();
  if (audio && audio.state === "suspended") void audio.resume();
}

export function setMuted(muted: boolean) {
  const audio = context();
  if (!audio || !master) return;
  master.gain.setTargetAtTime(muted ? 0 : 0.18, audio.currentTime, 0.02);
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  delay = 0,
  gain = 0.12,
) {
  const audio = context();
  if (!audio || !master) return;
  const t = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

export function playSound(kind: Sound, muted: boolean) {
  if (muted) return;
  unlockAudio();
  const j = 1 + (Math.random() * 0.06 - 0.03);
  if (kind === "hatch") {
    tone(523 * j, 0.12, "triangle", 0, 0.1);
    tone(659 * j, 0.12, "triangle", 0.1, 0.1);
    tone(784 * j, 0.2, "triangle", 0.2, 0.1);
    return;
  }
  if (kind === "feed") {
    tone(392 * j, 0.08, "triangle", 0, 0.1);
    tone(588 * j, 0.12, "triangle", 0.07, 0.09);
    return;
  }
  if (kind === "play") {
    tone(494 * j, 0.08, "triangle", 0, 0.08);
    tone(740 * j, 0.1, "triangle", 0.08, 0.07);
    return;
  }
  if (kind === "talk") {
    tone(330 * j, 0.14, "sine", 0, 0.08);
    return;
  }
  if (kind === "clean") {
    tone(280 * j, 0.16, "sine", 0, 0.07);
    return;
  }
  if (kind === "sleep") {
    tone(220 * j, 0.22, "sine", 0, 0.07);
    return;
  }
  if (kind === "wake") {
    tone(440 * j, 0.1, "sine", 0, 0.08);
    return;
  }
  if (kind === "med") {
    tone(520 * j, 0.1, "triangle", 0, 0.08);
    return;
  }
  if (kind === "no") {
    tone(180 * j, 0.08, "sine", 0, 0.05);
    return;
  }
  tone(360 * j, 0.05, "sine", 0, 0.05);
}

/**
 * Browser-only, original procedural chiptune playback.
 * Must be started by a user gesture; stop on unmount/navigation.
 */
export type ChiptuneSeed = { bpm?: number; scale?: number[]; waveform?: OscillatorType; rootHz?: number }
export class HomieChiptunePlayer {
  private ctx: AudioContext | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private step = 0
  private readonly bpm: number
  private readonly scale: number[]
  private readonly waveform: OscillatorType
  private readonly rootHz: number
  constructor(seed: ChiptuneSeed = {}) {
    this.bpm = Math.min(240, Math.max(40, Number.isFinite(seed.bpm) ? seed.bpm! : 120))
    this.scale = (seed.scale?.filter(n => Number.isInteger(n) && n >= -24 && n <= 36).slice(0, 24) ?? []).length
      ? seed.scale!.filter(n => Number.isInteger(n) && n >= -24 && n <= 36).slice(0, 24) : [0, 3, 7, 10]
    this.waveform = ['sine', 'square', 'sawtooth', 'triangle'].includes(seed.waveform ?? '') ? seed.waveform! : 'triangle'
    this.rootHz = Math.min(880, Math.max(55, seed.rootHz ?? 110))
  }
  async start(): Promise<void> {
    if (this.ctx) return
    if (typeof window === 'undefined') return
    const Ctx = window.AudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    this.ctx = ctx
    try {
      await ctx.resume()
      if (this.ctx !== ctx) return
      this.playStep()
      this.timer = setInterval(() => this.playStep(), 60000 / this.bpm / 4)
    } catch (error) {
      this.stop()
      throw error
    }
  }
  private playStep(): void {
    const ctx = this.ctx
    if (!ctx || ctx.state !== 'running') return
    const note = this.scale[this.step++ % this.scale.length]
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime
    osc.type = this.waveform
    osc.frequency.setValueAtTime(this.rootHz * Math.pow(2, note / 12), now)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.onended = () => { osc.disconnect(); gain.disconnect() }
    osc.start(now)
    osc.stop(now + 0.15)
  }
  stop(): void {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    const ctx = this.ctx
    this.ctx = null
    if (ctx) void ctx.close().catch(() => {})
  }
}

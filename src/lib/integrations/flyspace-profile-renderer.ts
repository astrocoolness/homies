/**
 * Profile renderer: user content is inserted as text, never interpolated into HTML.
 * Arbitrary CSS is deliberately not supported: Shadow DOM alone is NOT a CSS sandbox.
 */
export type FlyspacePassport = {
  identity?: { name?: string; tagline?: string }
  stats?: { chaos?: number; socialBattery?: number }
  flyspaceProfile?: { blurbs?: { aboutMe?: string }; theme?: { accent?: string; background?: string } }
}
const safeColor = (value: unknown, fallback: string): string =>
  typeof value === 'string' && /^(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6})$/.test(value) ? value : fallback
export function renderFlyspacePassport(root: ShadowRoot, passport: FlyspacePassport): void {
  root.replaceChildren()
  const style = document.createElement('style')
  style.textContent = `
    :host{display:block;font-family:ui-monospace,monospace;background:var(--bg);color:var(--accent);padding:20px;border:2px solid #333;border-radius:8px;overflow:hidden}
    .stage{overflow-wrap:anywhere}
    .stage.low-battery{filter:saturate(.3)}
    .stage.chaos{animation:glitch .45s steps(2,end) 3}
    h2{margin:0 0 8px;color:var(--accent)}
    .tagline{color:#aaa;margin-bottom:16px}
    .blurb{background:#111;color:#eee;border:1px dashed #555;padding:12px;white-space:pre-wrap}
    @media(prefers-reduced-motion:reduce){.stage.chaos{animation:none}}
    @keyframes glitch{0%,100%{transform:translate(0)}33%{transform:translate(-2px,1px)}66%{transform:translate(2px,-1px)}}
  `
  const stage = document.createElement('section')
  stage.className = 'stage'
  if ((passport.stats?.chaos ?? 0) > 75) stage.classList.add('chaos')
  if ((passport.stats?.socialBattery ?? 100) < 25) stage.classList.add('low-battery')
  const title = document.createElement('h2')
  title.textContent = passport.identity?.name || 'Unnamed Homie'
  const tagline = document.createElement('div')
  tagline.className = 'tagline'
  tagline.textContent = '// ' + (passport.identity?.tagline || '')
  const bio = document.createElement('div')
  bio.className = 'blurb'
  bio.textContent = passport.flyspaceProfile?.blurbs?.aboutMe || 'No bio provided.'
  stage.append(title, tagline, bio)
  root.host instanceof HTMLElement && (
    root.host.style.setProperty('--accent', safeColor(passport.flyspaceProfile?.theme?.accent, '#00ffcc')),
    root.host.style.setProperty('--bg', safeColor(passport.flyspaceProfile?.theme?.background, '#09090c'))
  )
  root.append(style, stage)
}
export function registerFlyspaceProfileElement(): void {
  if (typeof window === 'undefined' || !window.customElements || customElements.get('flyspace-profile')) return
  customElements.define('flyspace-profile', class extends HTMLElement {
    private readonly profileRoot = this.attachShadow({ mode: 'open' })
    connectedCallback(): void {
      const encoded = this.getAttribute('data-homie')
      if (!encoded || encoded.length > 65536) return
      try {
        const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0))
        const passport = JSON.parse(new TextDecoder().decode(bytes)) as FlyspacePassport
        renderFlyspacePassport(this.profileRoot, passport)
      } catch {
        this.profileRoot.replaceChildren(document.createTextNode('Unable to load profile.'))
      }
    }
  })
}

import type { Palette } from './types'

/**
 * The light theme: Film Noir by day, on Noir's own type, sizes and layout (src/theme/skins/noir.ts), so switching
 * theme in the header never moves a line. Paper & Ink's ground (direction A, ./paper.ts): warm paper and ink
 * type; the app's orange stays the one thing to tap, with ink lettering on it, and a deep orange for the accent as
 * type. The home hero becomes a daylight line-up: a pale height wall with ink lines and marks, cream plates with
 * an ink outline, and a white spotlight.
 * Contrast (WCAG 2.1, on page #f8f6f0): text 18.3:1, body 13.1:1, muted 7.4:1, link and highlight 6.4:1,
 * accentText 5.6:1, control 4.5:1, onAccent on accent 9.0:1; every text colour stays AA on band, deep, the
 * surfaces, the glow and the hero's sky (4.8:1 or more), the plates 18.9:1.
 */
export const daylight: Palette = {
  id: 'daylight',
  scheme: 'light',
  colors: {
    page: '#f8f6f0',
    band: '#efebe1',
    deep: '#ebe6d9',
    header: 'rgba(248, 246, 240, 0.92)',
    text: '#0a0a0a',
    body: 'rgba(10, 10, 10, 0.86)',
    muted: 'rgba(10, 10, 10, 0.7)',
    subtle: 'rgba(10, 10, 10, 0.5)',
    line: 'rgba(10, 10, 10, 0.14)',
    lineStrong: 'rgba(10, 10, 10, 0.28)',
    control: 'rgba(10, 10, 10, 0.56)',
    surface: 'rgba(255, 255, 255, 0.62)',
    surfaceStrong: 'rgba(10, 10, 10, 0.05)',
    surfaceHover: 'rgba(10, 10, 10, 0.08)',
    link: '#9c3c00',
    linkHover: '#0a0a0a',
    accent: '#ff9500',
    accentHover: '#f08700',
    onAccent: '#0a0a0a',
    accentText: '#a94300',
    highlight: '#9c3c00',
    focus: '#9c3c00',
    success: '#2f6b4a',
    danger: '#b3262f',
    warn: '#7a4f00',
    warnSurface: 'rgba(255, 209, 102, 0.3)',
    warnLine: 'rgba(122, 79, 0, 0.45)',
    glow: 'rgba(255, 180, 70, 0.2)',
  },
  shadows: {
    card: 'none',
    phone: '0 0 0 1.5px rgba(10, 10, 10, 0.16), 0 28px 50px -24px rgba(10, 10, 10, 0.45)',
    button: 'none',
  },
  // Daylight on a pale police wall: ink lines and marks, cream plates with an ink outline, a white spotlight laid
  // over the wall (overlay: it lights the suspect without washing him out); the suspects out of it go grey instead
  // of dark.
  art: {
    heroSky: 'rgba(255, 196, 92, 0.22)',
    heroMid: '#f3f0e8',
    heroEnd: '#eeeae0',
    wallTop: '#dfe3e8',
    wallBottom: '#cdd4dc',
    wallLine: 'rgba(10, 10, 10, 0.13)',
    wallMark: 'rgba(10, 10, 10, 0.62)',
    floor: '#0a0a0a',
    beamFrom: 'rgba(255, 255, 255, 0)',
    beamMid: 'rgba(255, 255, 255, 0.6)',
    beamTo: 'rgba(255, 255, 255, 0.8)',
    beamBlend: 'overlay',
    pool: 'rgba(255, 255, 255, 0.8)',
    plate: '#fefaea',
    plateText: '#0a0a0a',
    plateLine: '#0a0a0a',
    stamp: 'rgba(254, 250, 234, 0.94)',
    dim: 'grayscale(0.6) contrast(0.85) brightness(1.02)',
  },
  wordmark: 'ink',
}

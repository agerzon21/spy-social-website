import type { Skin } from './types'

/**
 * Direction B, Film Noir: a night city, one warm spotlight, cream type on deep navy, the app's orange for the one
 * thing to tap. Tall condensed Big Shoulders Display for posters and headings, Barlow for reading.
 * Contrast (WCAG 2.1, on page #0a111c): text 18.1:1, body 12.8:1, muted 9.1:1, link 13.1:1, accent 8.6:1, control
 * 5.1:1, onAccent on accent 9.0:1; muted stays 8:1 or more on band, deep and the surfaces.
 */
export const noir: Skin = {
  id: 'noir',
  scheme: 'dark',
  colors: {
    page: '#0a111c',
    band: '#10233a',
    deep: '#070c14',
    header: 'rgba(10, 17, 28, 0.92)',
    text: '#fefaea',
    body: 'rgba(254, 250, 234, 0.84)',
    muted: 'rgba(254, 250, 234, 0.7)',
    subtle: 'rgba(254, 250, 234, 0.42)',
    line: 'rgba(254, 250, 234, 0.14)',
    lineStrong: 'rgba(254, 250, 234, 0.24)',
    control: 'rgba(254, 250, 234, 0.5)',
    surface: 'rgba(254, 250, 234, 0.04)',
    surfaceStrong: 'rgba(254, 250, 234, 0.08)',
    surfaceHover: 'rgba(254, 250, 234, 0.12)',
    link: '#ffd166',
    linkHover: '#fefaea',
    accent: '#ff9500',
    accentHover: '#ffab3d',
    onAccent: '#0a0a0a',
    highlight: '#ffd166',
    focus: '#ffd166',
    success: '#8fe3a8',
    danger: '#ff8f94',
    warn: '#ffd166',
    warnSurface: 'rgba(255, 209, 102, 0.1)',
    warnLine: 'rgba(255, 209, 102, 0.45)',
    glow: 'rgba(255, 240, 205, 0.2)',
  },
  fonts: {
    display: '"Big Shoulders Display", "Arial Narrow", Impact, sans-serif',
    body: 'Barlow, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    code: '"Big Shoulders Display", "Arial Narrow", sans-serif',
  },
  type: {
    body: [16, 17],
    headingWeight: 800,
    headings: { xl: [54, 76], lg: [44, 58], md: [36, 44], sm: [28, 32], xs: [22, 24] },
  },
  display: { weight: 900, transform: 'uppercase', leading: 0.86, tracking: '0.005em', stretch: 'normal' },
  radii: { card: '0', control: '0', button: '0', phone: '30px' },
  borders: { hairline: '1.5px', card: '1.5px' },
  shadows: {
    card: 'none',
    phone: '0 0 0 1.5px rgba(254, 250, 234, 0.18), 0 30px 60px -20px rgba(0, 0, 0, 0.8), -14px -10px 50px -18px rgba(255, 240, 205, 0.18)',
    button: 'none',
  },
  wordmark: 'cream',
}

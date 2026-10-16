import type { Skin } from './types'

/**
 * Direction A, Paper & Ink (not active; see src/theme/index.ts): the app's own kit on the web. Paper and cream,
 * ink outlines with hard offset shadows, chunky blue for the main action. Its faces (Archivo, wide and heavy) aren't
 * bundled yet: add their woff2 files to src/theme/fonts.css when this skin goes live; until then the fallbacks show.
 * Contrast on paper #f8f6f0 (WCAG 2.1): text 18.3:1, body 13.1:1, muted 6.8:1, link 6.4:1, accent 4.7:1, onAccent on
 * accent 5.0:1; every text pair is AA on paper, band and deep.
 */
export const paper: Skin = {
  id: 'paper',
  scheme: 'light',
  colors: {
    page: '#f8f6f0',
    band: '#fefaea',
    deep: '#efebdf',
    header: 'rgba(248, 246, 240, 0.94)',
    text: '#0a0a0a',
    body: 'rgba(10, 10, 10, 0.86)',
    muted: 'rgba(10, 10, 10, 0.68)',
    subtle: 'rgba(10, 10, 10, 0.4)',
    line: 'rgba(10, 10, 10, 0.14)',
    lineStrong: '#0a0a0a',
    control: '#0a0a0a',
    surface: '#fefaea',
    surfaceStrong: 'rgba(10, 10, 10, 0.05)',
    surfaceHover: 'rgba(10, 10, 10, 0.08)',
    link: '#2b56b0',
    linkHover: '#0a0a0a',
    accent: '#386ad4',
    accentHover: '#2f5cbd',
    onAccent: '#ffffff',
    highlight: '#0a0a0a',
    focus: '#386ad4',
    success: '#2f6b4a',
    danger: '#b3262f',
    warn: '#7a5200',
    warnSurface: 'rgba(255, 209, 102, 0.35)',
    warnLine: '#0a0a0a',
    glow: 'rgba(255, 209, 102, 0.6)',
  },
  fonts: {
    display: 'Archivo, "Arial Black", system-ui, sans-serif',
    body: 'Archivo, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    code: 'Archivo, "Arial Black", sans-serif',
  },
  type: {
    body: [16, 17],
    headingWeight: 900,
    headings: { xl: [40, 56], lg: [32, 42], md: [28, 34], sm: [21, 24], xs: [18, 20] },
  },
  display: { weight: 900, transform: 'none', leading: 0.94, tracking: '-0.02em', stretch: '115%' },
  radii: { card: '14px', control: '10px', button: '12px', phone: '30px' },
  borders: { hairline: '1.5px', card: '3px' },
  shadows: {
    card: '5px 5px 0 #0a0a0a',
    phone: '6px 6px 0 #0a0a0a',
    button: '3px 3px 0 #0a0a0a',
  },
  wordmark: 'ink',
}

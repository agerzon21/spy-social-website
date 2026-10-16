import { extendTheme } from '@chakra-ui/react'
import { noir } from './skins/noir'
import type { Skin, SkinColors } from './skins/types'
import './fonts.css'

/**
 * The site's look comes from one skin (src/theme/skins). This file turns it into:
 * - CSS variables on :root (--ss-page, --ss-text, --ss-font-display, --ss-radius-card...), which the CSS modules of
 *   the shared components (src/components/ui, src/components/home) read;
 * - Chakra semantic tokens (ss.page, ss.text, ss.link...), which the pages' Chakra props read, and the heading,
 *   link and button styles.
 * To change direction, point SKIN at another skin. Nothing else names a colour or a typeface.
 * The variables go in as plain CSS (SKIN_CSS, App.tsx's <Global>): Chakra's global styles cut a font list at its
 * commas.
 */
export const SKIN: Skin = noir

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const px = ([phone, desk]: [number, number]) => ({ base: `${phone}px`, md: `${desk}px` })

function cssVariables(skin: Skin): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [k, v] of Object.entries(skin.colors)) vars[`--ss-${kebab(k)}`] = v
  vars['--ss-font-display'] = skin.fonts.display
  vars['--ss-font-body'] = skin.fonts.body
  vars['--ss-font-code'] = skin.fonts.code
  vars['--ss-display-weight'] = String(skin.display.weight)
  vars['--ss-display-transform'] = skin.display.transform
  vars['--ss-display-leading'] = String(skin.display.leading)
  vars['--ss-display-tracking'] = skin.display.tracking
  vars['--ss-display-stretch'] = skin.display.stretch
  for (const [k, v] of Object.entries(skin.radii)) vars[`--ss-radius-${kebab(k)}`] = v
  vars['--ss-hairline'] = skin.borders.hairline
  vars['--ss-card-border'] = skin.borders.card
  for (const [k, v] of Object.entries(skin.shadows)) vars[`--ss-shadow-${kebab(k)}`] = v
  return vars
}

/** The active skin as CSS variables on :root, for App.tsx's <Global>. */
export const SKIN_CSS = `:root{${Object.entries(cssVariables(SKIN))
  .map(([k, v]) => `${k}:${v};`)
  .join('')}color-scheme:${SKIN.scheme};}`

// ss.page -> var(--ss-page): the Chakra props and the CSS modules share one set of values.
const colorTokens = Object.fromEntries(
  (Object.keys(SKIN.colors) as (keyof SkinColors)[]).map((k) => [`ss.${k}`, `var(--ss-${kebab(k)})`]),
)

const H = SKIN.type.headings

export const theme = extendTheme({
  fonts: {
    heading: 'var(--ss-font-display)',
    body: 'var(--ss-font-body)',
    mono: 'var(--ss-font-code)',
  },
  semanticTokens: { colors: colorTokens },
  styles: {
    global: {
      'html, body': {
        bg: 'ss.page',
        color: 'ss.body',
        fontFamily: 'body',
        fontWeight: 500,
        lineHeight: 1.6,
        WebkitTextSizeAdjust: '100%',
        textRendering: 'optimizeLegibility',
      },
      body: { minWidth: '320px' },
      '::selection': { bg: 'ss.accent', color: 'ss.onAccent' },
      // One focus ring everywhere, in the skin's focus colour (Chakra's own blue ring is 2.4:1 on navy).
      ':focus-visible': { outline: '3px solid var(--ss-focus)', outlineOffset: '3px' },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
          scrollBehavior: 'auto !important',
        },
      },
    },
  },
  textStyles: {
    // Running text on the legal and help pages.
    body: { fontSize: px(SKIN.type.body), lineHeight: 1.7 },
    // Notes under a passage, small print in a box.
    small: { fontSize: { base: '15px', md: '15px' }, lineHeight: 1.65 },
    // "Last updated", dates.
    meta: { fontSize: '14px', lineHeight: 1.5, color: 'ss.muted', letterSpacing: '0.02em' },
    // Small caps-style labels above a group (the FAQ's sections, "Quick links").
    label: { fontSize: '13px', lineHeight: 1.3, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'ss.highlight' },
  },
  components: {
    Heading: {
      baseStyle: { fontFamily: 'heading', fontWeight: SKIN.type.headingWeight, color: 'ss.text', letterSpacing: '0.005em', textWrap: 'balance' },
      sizes: {
        xl: { fontSize: px(H.xl), lineHeight: 0.95, fontWeight: 900 },
        lg: { fontSize: px(H.lg), lineHeight: 0.98, fontWeight: 900 },
        md: { fontSize: px(H.md), lineHeight: 1 },
        sm: { fontSize: px(H.sm), lineHeight: 1.05 },
        xs: { fontSize: px(H.xs), lineHeight: 1.1 },
      },
      variants: {
        // A legal page's section heading: a rule above it, room to breathe, and it scrolls to just under the
        // sticky header when a link jumps to it.
        section: {
          w: '100%',
          mt: 6,
          pt: 8,
          borderTop: 'var(--ss-hairline) solid',
          borderColor: 'ss.line',
          scrollMarginTop: '84px',
        },
      },
    },
    Link: {
      // Underlined, so a link never depends on its colour alone (the link and body colours are both light on Noir).
      baseStyle: {
        color: 'ss.link',
        textDecoration: 'underline',
        textDecorationThickness: '1.5px',
        textUnderlineOffset: '3px',
        transition: 'color 0.15s',
        _hover: { color: 'ss.linkHover', textDecorationThickness: '2px' },
        _focusVisible: { boxShadow: 'none', outline: '3px solid var(--ss-focus)', outlineOffset: '2px', borderRadius: '2px' },
      },
    },
    Button: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 800,
        letterSpacing: '0.06em',
        textTransform: 'var(--ss-display-transform)',
        borderRadius: 'var(--ss-radius-button)',
        _focusVisible: { boxShadow: 'none', outline: '3px solid var(--ss-focus)', outlineOffset: '3px' },
      },
      // Labels may wrap on a narrow phone rather than run out of the button.
      sizes: {
        lg: { h: 'auto', minH: '56px', py: 3, fontSize: { base: '18px', md: '20px' }, px: 6, whiteSpace: 'normal', lineHeight: 1.1 },
        md: { h: 'auto', minH: '48px', py: 2, fontSize: '18px', px: 5, whiteSpace: 'normal', lineHeight: 1.1 },
        sm: { h: 'auto', minH: '44px', py: 2, fontSize: '16px', px: 4, whiteSpace: 'normal', lineHeight: 1.1 },
      },
      variants: {
        primary: {
          bg: 'ss.accent',
          color: 'ss.onAccent',
          boxShadow: 'var(--ss-shadow-button)',
          _hover: { bg: 'ss.accentHover', _disabled: { bg: 'ss.accent' } },
          _active: { bg: 'ss.accentHover' },
        },
        secondary: {
          bg: 'transparent',
          color: 'ss.text',
          border: 'var(--ss-hairline) solid',
          borderColor: 'ss.control',
          _hover: { bg: 'ss.surfaceStrong', borderColor: 'ss.text' },
          _active: { bg: 'ss.surfaceHover' },
        },
      },
      defaultProps: { variant: 'primary', size: 'md' },
    },
  },
})

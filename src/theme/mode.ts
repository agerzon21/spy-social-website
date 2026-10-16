import type { ChakraProviderProps } from '@chakra-ui/react'
import { flushSync } from 'react-dom'
import { daylight } from './skins/daylight'
import { noir } from './skins/noir'
import type { Palette } from './skins/types'

/**
 * The two themes and how a page wears one. Dark (Noir) is everyone's default; a visitor who flips the header's
 * switch keeps that choice in localStorage. public/theme.js reads it and sets <html data-theme> before the first
 * paint (an external file: the CSP in vercel.json allows scripts from 'self' only, so no inline script). Keep its
 * key and page colours in step with this file.
 * Chakra's colour mode follows the same attribute (colorModeManager below): its own light/dark styles and
 * useColorMode() always agree with the page.
 */
export type ThemeName = 'dark' | 'light'

export const PALETTES: Record<ThemeName, Palette> = { dark: noir, light: daylight }

const KEY = 'ss-theme'

/** The theme the page wears now (public/theme.js set it before React started). */
export const pageTheme = (): ThemeName =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

/**
 * Chakra reads the page's theme on start and writes nothing: a visit stores no choice until the visitor makes one
 * (rememberTheme), so the default stays the default.
 */
export const colorModeManager: NonNullable<ChakraProviderProps['colorModeManager']> = {
  type: 'localStorage',
  ssr: false,
  get: () => pageTheme(),
  set: () => {},
}

export function rememberTheme(theme: ThemeName) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // Private mode or blocked storage: the switch still works for this page view.
  }
}

/** The browser's toolbar tint (Safari, Chrome on Android) follows the page. */
function tintBrowser(theme: ThemeName) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PALETTES[theme].colors.page)
}

/**
 * Wears `theme`: `apply` sets Chakra's colour mode (the attribute, color-scheme and React state) and the browser
 * tint follows. With motion allowed and View Transitions supported, the new theme spreads over the page in a circle
 * from the switch (`from`) while the knob slides (src/index.css); otherwise the page changes at once. Either way no
 * other transition replays mid-switch.
 */
export function switchTheme(theme: ThemeName, apply: (theme: ThemeName) => void, from?: Element) {
  const root = document.documentElement
  const update = () => {
    flushSync(() => apply(theme))
    tintBrowser(theme)
  }
  const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('ss-theme-switching')))
  root.classList.add('ss-theme-switching')
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still || typeof document.startViewTransition !== 'function') {
    update()
    settle()
    return
  }
  const box = from?.getBoundingClientRect()
  const x = box ? box.left + box.width / 2 : window.innerWidth
  const y = box ? box.top + box.height / 2 : 0
  const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const spread = document.startViewTransition(update)
  spread.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${reach}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'cubic-bezier(0.45, 0, 0.25, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {})
  spread.finished.then(settle, settle)
}

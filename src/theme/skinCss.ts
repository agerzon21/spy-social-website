import { noir } from './skins/noir'
import type { Palette, Skin } from './skins/types'
import { PALETTES } from './mode'

/**
 * The skin as CSS variables (src/theme/index.ts explains them), apart from Chakra (speed-1111): the Archive's and the
 * Market's hosts (src/hosts) wear SKIN_CSS without loading Chakra; www's App puts it in through Chakra's <Global>.
 */
export const SKIN: Skin = noir

export const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

/** A theme's colours, shadows and hero art. */
function paletteVariables(palette: Palette): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [k, v] of Object.entries(palette.colors)) vars[`--ss-${kebab(k)}`] = v
  for (const [k, v] of Object.entries(palette.shadows)) vars[`--ss-shadow-${kebab(k)}`] = v
  for (const [k, v] of Object.entries(palette.art)) vars[`--ss-art-${kebab(k)}`] = v
  return vars
}

/** The skin's type, radii and rules: the same in both themes. */
function shapeVariables(skin: Skin): Record<string, string> {
  const vars: Record<string, string> = {}
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
  return vars
}

const block = (selector: string, vars: Record<string, string>, scheme: string) =>
  `${selector}{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join('')}color-scheme:${scheme};}`

/** Both themes as CSS variables, for App.tsx's <Global>: dark on :root (the default), light under its attribute. */
export const SKIN_CSS =
  block(':root', { ...shapeVariables(SKIN), ...paletteVariables(PALETTES.dark) }, PALETTES.dark.scheme) +
  block(':root[data-theme="light"]', paletteVariables(PALETTES.light), PALETTES.light.scheme)


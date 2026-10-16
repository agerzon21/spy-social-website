/**
 * A skin is one design direction's look: every colour, typeface, radius and shadow the site uses. The pages and
 * components never name a colour or a font; they read these through the `ss.*` Chakra tokens and the `--ss-*` CSS
 * variables that src/theme/index.ts makes from the skins. The site has two themes, dark and light (the header's
 * switch): both share one skin's type, radii and rules, and each brings its own Palette (colours, shadows, the home
 * hero's art and the wordmark), so switching theme never moves the layout.
 */
export interface SkinColors {
  /** The page. */
  page: string
  /** A band that sets a section apart from the page (the home page's "One round"). */
  band: string
  /** The deepest ground: the footer. */
  deep: string
  /** The sticky header bar (translucent over the page). */
  header: string
  /** Headings and strong text. */
  text: string
  /** Running text. */
  body: string
  /** Secondary text: dates, notes, captions. AA (4.5:1) on page, band and deep. */
  muted: string
  /** Decorative glyphs only (arrows, separators): never text someone has to read. */
  subtle: string
  /** Hairline rules and dividers. */
  line: string
  /** Card and table borders. */
  lineStrong: string
  /** The outline of an input or an outlined button: 3:1 against the page. */
  control: string
  /** A raised box on the page. */
  surface: string
  /** A box inside a box, or a hovered row. */
  surfaceStrong: string
  surfaceHover: string
  /** Links in running text. */
  link: string
  linkHover: string
  /** The main action: filled buttons. */
  accent: string
  accentHover: string
  /** Text and icons on the accent fill. */
  onAccent: string
  /**
   * The accent as type or a mark on the page (the hero's full stop, step numbers, list markers, 404). AA (4.5:1) on
   * page, band and deep: the accent fill itself is too pale for that on a light page.
   */
  accentText: string
  /** Eyebrow labels and small highlights. */
  highlight: string
  /** The keyboard focus ring. */
  focus: string
  success: string
  danger: string
  warn: string
  warnSurface: string
  warnLine: string
  /** A soft light (the Noir spotlight, the Paper sticker glow). */
  glow: string
}

/**
 * The home hero's art (the line-up): a sky over a height wall, a spotlight and its pool on the floor, the
 * suspects' number plates and verdict stamps, and how a suspect out of the light is dimmed. CSS values: colours,
 * plus a blend mode and a filter.
 */
export interface SkinArt {
  /** The hero's ground: a soft light at the top, then down to the wall. */
  heroSky: string
  heroMid: string
  heroEnd: string
  /** The height wall, its lines and the feet marks (decoration). */
  wallTop: string
  wallBottom: string
  wallLine: string
  wallMark: string
  /** The floor line under the wall. */
  floor: string
  /** The spotlight: a beam and its pool, and how the beam mixes with the wall. */
  beamFrom: string
  beamMid: string
  beamTo: string
  beamBlend: string
  pool: string
  /** The number plates (text: plateText on plate) and the verdict stamp's ground (text: text / accentText). */
  plate: string
  plateText: string
  plateLine: string
  stamp: string
  /** A CSS filter for the suspects outside the light. */
  dim: string
}

/** What a theme changes: everything a dark or a light page needs, nothing that moves the layout. */
export interface Palette {
  id: string
  /** The browser's own controls and scrollbars follow it. */
  scheme: 'dark' | 'light'
  colors: SkinColors
  shadows: {
    card: string
    phone: string
    button: string
  }
  art: SkinArt
  /** Which wordmark artwork reads on this palette's page. */
  wordmark: 'cream' | 'ink'
}

export interface Skin extends Palette {
  fonts: {
    /** Poster headings. */
    display: string
    /** Everything else. */
    body: string
    /** Room codes. */
    code: string
  }
  /**
   * Type sizes in px, [phone, desktop]: running text, and the Chakra Heading sizes the pages use (xl: a page's
   * big title, lg: a legal page's title, md: a short page's title, sm: a section heading, xs: a sub-heading).
   */
  type: {
    body: [number, number]
    headingWeight: number
    headings: Record<'xl' | 'lg' | 'md' | 'sm' | 'xs', [number, number]>
  }
  /** How the poster headings (DisplayHeading) and buttons are set. The pages' own headings never change case. */
  display: {
    weight: number
    transform: 'uppercase' | 'none'
    /** Line height of a big poster line. */
    leading: number
    tracking: string
    /** font-stretch, for faces with a width axis. */
    stretch: string
  }
  radii: {
    card: string
    control: string
    button: string
    phone: string
  }
  borders: {
    /** Rules, dividers, card outlines. */
    hairline: string
    /** A card's outline when the skin draws cards with a heavy line (Paper). */
    card: string
  }
}

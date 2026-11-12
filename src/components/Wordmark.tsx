import cream from '../assets/brand/wordmark-cream-outline.svg'
import ink from '../assets/brand/wordmark-ink.svg'
import { PALETTES, type ThemeName } from '../theme/mode'

const ART = {
  cream: { src: cream, width: 319, height: 100 },
  ink: { src: ink, width: 304, height: 86 },
}

/**
 * The SpySocial wordmark in the artwork that reads on the page's theme: cream lettering with an ink outline on the
 * dark (Noir) pages, ink lettering on the light ones (the brand kit's vector masters). Both are on the page and the
 * theme's CSS shows one (index.css, data-theme-only), so the page's HTML is the same in both themes: the build draws
 * it before the theme is known (www-speed-1112) and the header's switch still swaps it in the same frame.
 * /images/logo*.png in public/ stay for the email templates.
 */
const Wordmark = ({ className, height }: { className?: string; height?: number }) => (
  <>
    {(['dark', 'light'] as ThemeName[]).map((theme) => {
      const art = PALETTES[theme].wordmark === 'cream' ? 'cream' : 'ink'
      return (
        <img
          key={theme}
          className={className}
          src={ART[art].src}
          alt="SpySocial"
          // The artwork's own proportions (318.94 x 100.25 and 304.24 x 85.55), so the space is kept while it loads.
          width={ART[art].width}
          height={ART[art].height}
          style={height ? { height, width: 'auto' } : undefined}
          // The ink artwork has no outline round its letters: shell.module.css sets it a little smaller, so the letters
          // stay the same size in both themes.
          data-wordmark={art}
          data-theme-only={theme}
          decoding="async"
        />
      )
    })}
  </>
)

export default Wordmark

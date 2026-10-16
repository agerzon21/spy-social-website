import { useColorMode } from '@chakra-ui/react'
import cream from '../assets/brand/wordmark-cream-outline.svg'
import ink from '../assets/brand/wordmark-ink.svg'
import { PALETTES, type ThemeName } from '../theme/mode'

/**
 * The SpySocial wordmark in the artwork that reads on the page's theme: cream lettering with an ink outline on the
 * dark (Noir) pages, ink lettering on the light ones (the brand kit's vector masters). It follows the header's
 * switch. /images/logo*.png in public/ stay for the email templates.
 */
const Wordmark = ({ className, height }: { className?: string; height?: number }) => {
  const dark = PALETTES[useColorMode().colorMode as ThemeName].wordmark === 'cream'
  return (
    <img
      className={className}
      src={dark ? cream : ink}
      alt="SpySocial"
      // The artwork's own proportions (318.94 x 100.25 and 304.24 x 85.55), so the space is kept while it loads.
      width={dark ? 319 : 304}
      height={dark ? 100 : 86}
      style={height ? { height, width: 'auto' } : undefined}
      // The ink artwork has no outline round its letters: shell.module.css sets it a little smaller, so the letters
      // stay the same size in both themes.
      data-wordmark={dark ? 'cream' : 'ink'}
      decoding="async"
    />
  )
}

export default Wordmark

import cream from '../assets/brand/wordmark-cream-outline.svg'
import ink from '../assets/brand/wordmark-ink.svg'
import { SKIN } from '../theme'

/**
 * The SpySocial wordmark in the artwork that reads on the active skin: cream lettering with an ink outline on the
 * dark Noir pages, ink lettering on Paper (the brand kit's vector masters). /images/logo*.png in public/ stay for
 * the email templates.
 */
const Wordmark = ({ className, height }: { className?: string; height?: number }) => {
  const dark = SKIN.wordmark === 'cream'
  return (
    <img
      className={className}
      src={dark ? cream : ink}
      alt="SpySocial"
      // The artwork's own proportions (318.94 x 100.25 and 304.24 x 85.55), so the space is kept while it loads.
      width={dark ? 319 : 304}
      height={dark ? 100 : 86}
      style={height ? { height, width: 'auto' } : undefined}
      decoding="async"
    />
  )
}

export default Wordmark

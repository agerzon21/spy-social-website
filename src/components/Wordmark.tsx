import { Image, type ImageProps } from '@chakra-ui/react'

/**
 * The SpySocial wordmark for the site's navy pages (the header on every page
 * but Home, and Home's hero): the app's on-navy artwork, cream lettering with
 * an ink outline (the app's assets/images/logo-home.png, cropped to its
 * edges). /images/logo.svg and /images/logo.png have black lettering for light
 * backgrounds (the email templates use logo.png); on navy they nearly vanish.
 */
const Wordmark = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image src="/images/logo-light.png" alt="SpySocial" {...props} />
)

export default Wordmark

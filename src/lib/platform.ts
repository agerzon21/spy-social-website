/**
 * Which store and which "Open in SpySocial" a page offers.
 *
 * iPadOS 13+ Safari asks for desktop sites by default: its user agent says
 * "Macintosh" with no "iPad" (QA run 7 F207: a 13" iPad got only the store
 * buttons on /join, no Open in SpySocial). A Mac has no touch screen, so a
 * "Macintosh" with more than one touch point is an iPad.
 */
export type Platform = 'ios' | 'android' | 'desktop'

export function detectPlatform(ua: string, maxTouchPoints = 0): Platform {
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return 'ios'
  return 'desktop'
}

export function currentPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  return detectPlatform(navigator.userAgent || '', navigator.maxTouchPoints || 0)
}

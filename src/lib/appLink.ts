/**
 * The way from an invite page (/join/<code>, /join/e/<id>) into the installed app.
 *
 * A tap on an invite link opens the app by itself when it's installed: iOS's Universal Links and Android's App Links
 * (public/.well-known) hand /join/* to it before this site loads. So in Safari or Chrome, reaching the page usually
 * means the app isn't installed, and a spysocial:// address opened on page load only makes iOS Safari say "Cannot
 * Open Page" (QA F4506 / review F4408). The page opens nothing by itself there; its Open in SpySocial button does,
 * on a tap: spysocial:// on iPhone and iPad, and on Android an intent:// link, which Chrome hands to the app or, when
 * it isn't installed, sends to the Google Play listing.
 *
 * In-app browsers (Instagram, Facebook and Messenger, TikTok) open links in their own web view, where iOS never
 * follows a Universal Link, so the app doesn't open even when it's installed. There, on iOS only, the page tries the
 * app once on load: a web view that can't open spysocial:// stays on the page without Safari's alert. On Android, a
 * web view may show an error page for an address it can't open, so Android waits for the tap.
 */
import { PLAY_STORE_URL } from './stores'
import type { Platform } from './platform'

/** The app's Android package (app.json) and its link scheme. */
const ANDROID_PACKAGE = 'com.gerz.spysocial'
const SCHEME = 'spysocial'

/**
 * Instagram, Facebook and Messenger (FBAN / FBAV / FB_IAB), TikTok (musical_ly_<version>, BytedanceWebview). No word
 * boundaries: TikTok's iOS agent runs "musical_ly" into its version.
 */
const IN_APP_BROWSER = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|musical_ly|TikTok|BytedanceWebview/i

export function isInAppBrowser(ua: string): boolean {
  return IN_APP_BROWSER.test(ua)
}

/**
 * The Open in SpySocial address for an app path ("join/ABCDE?p=XYZ", "join/e/AB12CD"): spysocial://<path>, or on
 * Android intent://<path>#Intent;scheme=spysocial;package=...;S.browser_fallback_url=<the Play listing>;end.
 */
export function openAppHref(path: string, platform: Platform): string {
  if (platform === 'android') {
    return `intent://${path}#Intent;scheme=${SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
  }
  return `${SCHEME}://${path}`
}

/** Whether the page should try the app on load: only in an in-app browser on iOS (see the top of this file). */
export function tryAppOnLoad(platform: Platform, ua: string): boolean {
  return platform === 'ios' && isInAppBrowser(ua)
}

/**
 * Tries the app once per page and tab: the address goes to spysocial://<path>; coming back to the page (the web view's
 * Back, a reload) doesn't try again.
 */
export function tryAppOnce(path: string): void {
  const key = `ss-app-tried:${path}`
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    // No storage: still try, once for this load.
  }
  window.location.href = `${SCHEME}://${path}`
}

/**
 * The browser version of SpySocial (play.spysocial.app): where the site's
 * "Play in Your Browser" links go, once LIVE.browserLinks is on.
 *
 * VITE_PLAY_URL (the website's Vercel env, read at build time) can point the
 * links at another origin, such as a preview deploy. Only an https origin is
 * taken (path, query and anything else in it are dropped); unset or anything
 * else gives the default, so a typo can't send players to http or a path.
 */
import { LIVE } from './legalRelease'

const DEFAULT_PLAY_URL = 'https://play.spysocial.app'

export const PLAY_URL: string = (() => {
  const raw = String(import.meta.env.VITE_PLAY_URL ?? '').trim()
  if (!raw) return DEFAULT_PLAY_URL
  try {
    const u = new URL(raw)
    return u.protocol === 'https:' ? u.origin : DEFAULT_PLAY_URL
  } catch {
    return DEFAULT_PLAY_URL
  }
})()

/**
 * The same invite in the browser version: the link code and, when the host
 * changed the room's code, ?p= (the app's /join/[code] reads both). Null while
 * the browser version is off or without a code.
 */
export function playJoinUrl(code: string, passcode = ''): string | null {
  if (!LIVE.browserLinks || !code) return null
  return `${PLAY_URL}/join/${encodeURIComponent(code)}${passcode ? `?p=${encodeURIComponent(passcode)}` : ''}`
}

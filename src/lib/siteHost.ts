/**
 * The site's three hosts (subdomains-1110, owner Nov 10): www.spysocial.app, the Archive at archive.spysocial.app and
 * the Market at market.spysocial.app, the way the shop has shop.spysocial.app. One build serves all three (one
 * Vercel project, vercel.json); the page reads its host and routes only that host's pages.
 *
 * Code names every page by its canonical path, as before: '/archive/u/<item>/<serial>', '/market/item/<code>',
 * '/ledger'. `placeOf` says where that page lives: '/archive/u/x/3' is archive.spysocial.app/u/x/3. Links go through
 * components/SiteLink, which keeps a link on this host in the router and gives one to another host its full address.
 *
 * Production (spysocial.app) and a local dev server (localhost: archive.localhost:5173, market.localhost:5173) split
 * by host. Anywhere else (a Vercel preview's *.vercel.app, whose subdomains don't exist) everything stays on the one
 * host at its canonical path, as before the split.
 */

export type SiteHost = 'main' | 'archive' | 'market'

/** Each subdomain's pages: its canonical path prefix. */
const PREFIX: Record<Exclude<SiteHost, 'main'>, string> = { archive: '/archive', market: '/market' }
const SUBS = Object.keys(PREFIX) as Exclude<SiteHost, 'main'>[]

/** The production addresses (canonical links, sitemaps, share cards), whatever host the page runs on. */
export const PUBLIC_ORIGIN: Record<SiteHost, string> = {
  main: 'https://www.spysocial.app',
  archive: 'https://archive.spysocial.app',
  market: 'https://market.spysocial.app',
}

const hostname = typeof window === 'undefined' ? 'www.spysocial.app' : window.location.hostname.toLowerCase()

/** Whether this host splits by subdomain: production and localhost (see the top). */
const SPLIT = /(^|\.)spysocial\.app$/.test(hostname) || /(^|\.)localhost$/.test(hostname)

/** The host this page runs on. */
export const HOST: SiteHost = SPLIT ? (SUBS.find((sub) => hostname.startsWith(`${sub}.`)) ?? 'main') : 'main'

/** A host's origin from here: production's on spysocial.app, the same dev server's otherwise. */
export function originOf(host: SiteHost): string {
  if (typeof window === 'undefined' || /(^|\.)spysocial\.app$/.test(hostname)) return PUBLIC_ORIGIN[host]
  const { protocol, port } = window.location
  const base = hostname.replace(/^(www|archive|market)\./, '')
  return `${protocol}//${host === 'main' ? '' : `${host}.`}${base}${port ? `:${port}` : ''}`
}

/** Splits '/a/b?x=1#y' into the path and the rest ('?x=1#y'). */
const split = (to: string): [string, string] => {
  const at = to.search(/[?#]/)
  return at < 0 ? [to, ''] : [to.slice(0, at), to.slice(at)]
}

/** Where a canonical path lives, and its path there: '/archive/uniques?item=x' is the Archive's '/uniques?item=x'. */
export function placeOf(to: string, split_ = SPLIT): { host: SiteHost; path: string } {
  const [path, rest] = split(to)
  if (split_) {
    for (const sub of SUBS) {
      const prefix = PREFIX[sub]
      if (path === prefix || path.startsWith(`${prefix}/`)) return { host: sub, path: `${path.slice(prefix.length) || '/'}${rest}` }
    }
  }
  return { host: 'main', path: to }
}

/** A link's target from this page: a router path when it stays on this host, a full address when it leaves. */
export function siteTarget(to: string): { to: string } | { href: string } {
  const { host, path } = placeOf(to)
  return host === HOST ? { to: path } : { href: `${originOf(host)}${path}` }
}

/** A canonical path's path on this host (for <Navigate>, which only moves within the host). */
export const sitePath = (to: string) => placeOf(to).path

/** A canonical path's production address (canonical links, share cards): https://archive.spysocial.app/u/x/3. */
export function publicUrl(to: string): string {
  const { host, path } = placeOf(to, true)
  return `${PUBLIC_ORIGIN[host]}${path}`
}

/** This host's path back to its canonical path: the Archive's '/uniques' is '/archive/uniques', its '/' '/archive'. */
export function canonicalPath(pathname: string, host: SiteHost = HOST): string {
  if (host === 'main') return pathname
  return pathname === '/' || pathname === '' ? PREFIX[host] : `${PREFIX[host]}${pathname}`
}

/** Whether a canonical path's page belongs on this host (App.tsx routes only those). */
export const onThisHost = (to: string) => placeOf(to).host === HOST

import { lazy, type ComponentType } from 'react'

/**
 * A lazily loaded chunk (a page, the Archive's and Market's nav) that survives a deploy. A page opened before a deploy
 * asks for chunks the new deploy no longer has, and for the first seconds after a deploy a page can be served before
 * its new chunks reach every edge (site QA Nov 11: both seen live, each left a blank screen). Instead: reload, at once
 * the first time and after a short wait the next two, so the reload lands after the deploy has settled.
 * sessionStorage counts the reloads in the last minute (not cleared when some other chunk loads: the page's nav loads
 * fine while its page chunk fails), so a chunk that is really missing stops after three tries instead of looping.
 */
const KEY = 'ss-chunk-reload'
const WAITS = [0, 2500, 6000]
const WINDOW_MS = 60_000

export function lazyPage<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
  return lazy(() =>
    load().catch((err) => {
      let tries = WAITS.length
      try {
        const now = Date.now()
        const last = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as { n: number; at: number } | null
        tries = last && now - last.at < WINDOW_MS ? last.n : 0
        if (tries < WAITS.length) sessionStorage.setItem(KEY, JSON.stringify({ n: tries + 1, at: now }))
      } catch { /* no storage (or a bad value): never reload, so never loop */ }
      if (tries >= WAITS.length) throw err
      window.setTimeout(() => window.location.reload(), WAITS[tries])
      return new Promise<{ default: ComponentType<P> }>(() => {})
    })
  )
}

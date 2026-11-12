import { createElement, lazy, useState, type ComponentType } from 'react'
import ReloadNotice from '../components/ReloadNotice'

/**
 * A lazily loaded chunk (a page, the Archive's and Market's nav) that survives a deploy. A page opened before a deploy
 * asks for chunks the new deploy no longer has, and for the first seconds after a deploy a page can be served before
 * its new chunks reach every edge (site QA Nov 11: both seen live, each left a blank screen). Instead: reload, at once
 * the first time and after a short wait the next two, so the reload lands after the deploy has settled.
 * sessionStorage counts the reloads in the last minute (not cleared when some other chunk loads: the page's nav loads
 * fine while its page chunk fails), so a chunk that is really missing stops after three tries instead of looping.
 * Then (or with no storage to count in) the page says so with a Reload button (components/ReloadNotice) instead of
 * going blank (link-previews-1112); `quiet` for a part that isn't the page (the nav): nothing in its place.
 */
const KEY = 'ss-chunk-reload'
const WAITS = [0, 2500, 6000]
const WINDOW_MS = 60_000

const Nothing = () => null

export type LazyPage<P> = ComponentType<P> & {
  /**
   * Loads the chunk before the page needs it (www-speed-1112): main.tsx waits for the page being opened before it
   * hydrates the HTML the build rendered (scripts/prerender.mjs), so the page renders at once instead of suspending.
   * A chunk lost to a deploy takes the same reloads as above (the promise then never settles), then the notice.
   */
  preload: () => Promise<void>
}

export function lazyPage<P extends object>(load: () => Promise<{ default: ComponentType<P> }>, quiet = false): LazyPage<P> {
  // The page's component once its chunk is in: rendered directly from then on (no Suspense round).
  let loaded: ComponentType<P> | null = null
  const guarded = () =>
    load().then(
      (mod) => {
        loaded = mod.default
        return mod
      },
      () => {
        let tries = WAITS.length
        try {
          const now = Date.now()
          const last = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as { n: number; at: number } | null
          tries = last && now - last.at < WINDOW_MS ? last.n : 0
          if (tries < WAITS.length) sessionStorage.setItem(KEY, JSON.stringify({ n: tries + 1, at: now }))
        } catch { /* no storage (or a bad value): never reload, so never loop */ }
        if (tries >= WAITS.length) return { default: (quiet ? Nothing : ReloadNotice) as ComponentType<P> }
        window.setTimeout(() => window.location.reload(), WAITS[tries])
        return new Promise<{ default: ComponentType<P> }>(() => {})
      },
    )
  const Lazy = lazy(guarded)
  function Page(props: P) {
    // Chosen once per mount, so a page whose chunk arrives later never swaps component (and loses its state).
    const [ready] = useState(() => loaded)
    return ready ? createElement(ready, props) : createElement(Lazy as unknown as ComponentType<P>, props)
  }
  return Object.assign(Page, { preload: () => guarded().then(() => {}) })
}

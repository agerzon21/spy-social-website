import { lazyPage } from '../lib/lazyPage'

/**
 * The Archive's and the Market's own nav (archive. / market.spysocial.app; components/Header): its own chunk, never
 * loaded on www. A chunk lost to a deploy reloads the page (lib/lazyPage) rather than taking the whole page down with it.
 */
export const HostNav = lazyPage(() => import('./HostNav'), true)

/** Loads the nav's chunk before a page the build drew is taken over or drawn (hosts/start.tsx, src/prerender.tsx; archive-speed-1116). */
export const preloadHostNav = () => HostNav.preload()

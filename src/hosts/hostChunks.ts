import { lazyPage } from '../lib/lazyPage'
import { LIVE } from '../lib/legalRelease'
import { sharedHere } from '../lib/siteHost'
import { preloadHostPage } from '../routes/hostRoutes'
import { preloadHostNav } from '../components/hostNavChunk'

// www's pages the Archive serves too (lib/siteHost SHARED), plain CSS like the hosts' own (speed2-1111).
export const Ledger = lazyPage(() => import('../pages/Ledger'))
export const Transparency = lazyPage(() => import('../pages/Transparency'))
// The 404 page: with Chakra (hosts/ChakraIsland).
export const ChakraPage = lazyPage(() => import('./ChakraIsland'))

/**
 * Loads what the page at `path` (this host's own path) renders before React takes over the HTML the build drew
 * (hosts/start.tsx; archive-speed-1116) or the build draws it (src/prerender.tsx): the page's chunk and the host nav.
 */
export function preloadHost(path: string): Promise<void> {
  const at = path.replace(/\/+$/, '') || '/'
  const shared = at === '/ledger' && LIVE.mintedCollectibles && sharedHere('/ledger') ? Ledger.preload() : at === '/transparency' && LIVE.transparencyPage && sharedHere('/transparency') ? Transparency.preload() : preloadHostPage(at)
  return Promise.all([shared, preloadHostNav()]).then(() => {})
}


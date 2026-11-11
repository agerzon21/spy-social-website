import { Navigate, Route } from 'react-router-dom'
import { Layout } from '../components'
import { lazyPage } from '../lib/lazyPage'
import { LIVE } from '../lib/legalRelease'
import { onThisHost, sitePath } from '../lib/siteHost'

/*
 * The Archive's and the Market's routes (speed-1111): www's App (a preview build, where every page is on one host, and
 * the dev server) and each host's own lean app (src/hosts) route the same pages. Each page is its own chunk (lib/lazyPage
 * reloads the page if a deploy took it); on its own host the page's HTML fetches the host's page chunks alongside the
 * app (vite.config.ts hostPages).
 */

// The Archive (rarefinds-page-1110): every Unique, its own page per copy; with the ledger (LIVE.mintedCollectibles).
const ArchiveHome = lazyPage(() => import('../pages/archive/ArchiveHome'))
const ArchiveBrowse = lazyPage(() => import('../pages/archive/ArchiveBrowse'))
const ArchiveItem = lazyPage(() => import('../pages/archive/ArchiveItem'))
// The Market (market-site-1110): the Black Market's prices, read from the ledger function (LIVE.marketSite).
const MarketHome = lazyPage(() => import('../pages/market/MarketHome'))
const MarketMovers = lazyPage(() => import('../pages/market/MarketMovers'))
const MarketCatalogue = lazyPage(() => import('../pages/market/MarketCatalogue'))
const MarketItem = lazyPage(() => import('../pages/market/MarketItem'))

// The Archive's routes, on the host it lives on (lib/siteHost: archive.spysocial.app; www's /archive goes there).
export const archiveOn = LIVE.mintedCollectibles && LIVE.uniqueArchive && onThisHost('/archive')
// The Market's, likewise (market.spysocial.app; www's /market goes there).
export const marketOn = LIVE.marketSite && onThisHost('/market')

/** The Archive on archive.spysocial.app ('/', '/uniques', '/u/<item>/<serial>'; lib/siteHost), at /archive on a preview build. */
export const archiveRoutes = archiveOn ? (
  <>
    <Route path={sitePath('/archive')} element={<Layout><ArchiveHome /></Layout>} />
    <Route path={sitePath('/archive/uniques')} element={<Layout><ArchiveBrowse /></Layout>} />
    <Route path={sitePath('/archive/u/:item/:serial')} element={<Layout><ArchiveItem /></Layout>} />
  </>
) : null

/** The Market on market.spysocial.app ('/', '/movers/<list>', '/catalogue[/<shelf>]', '/item/<code>'). */
export const marketRoutes = marketOn ? (
  <>
    <Route path={sitePath('/market')} element={<Layout><MarketHome /></Layout>} />
    <Route path={sitePath('/market/movers/:list')} element={<Layout><MarketMovers /></Layout>} />
    <Route path={sitePath('/market/movers')} element={<Navigate to={sitePath('/market/movers/rises')} replace />} />
    <Route path={sitePath('/market/catalogue')} element={<Layout><MarketCatalogue /></Layout>} />
    <Route path={sitePath('/market/catalogue/:cat')} element={<Layout><MarketCatalogue /></Layout>} />
    <Route path={sitePath('/market/item/:code')} element={<Layout><MarketItem /></Layout>} />
  </>
) : null

import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components'
import OffHost from '../components/OffHost'
import ScrollManager from '../components/ScrollManager'
import { lazyPage } from '../lib/lazyPage'
import { LIVE } from '../lib/legalRelease'
import { HOST, sharedHere } from '../lib/siteHost'
import { archiveRoutes, marketRoutes } from '../routes/hostRoutes'

// www's pages these hosts serve too, and the 404 page: with Chakra, in one chunk (hosts/ChakraIsland).
const ChakraPage = lazyPage(() => import('./ChakraIsland'))

/**
 * archive.spysocial.app's and market.spysocial.app's own app (speed-1111): App.tsx's routes for this host, without
 * Chakra, Emotion or Framer Motion (www's pages need them; these hosts' pages are CSS modules). hosts/base.css is what
 * Chakra's provider used to put on the page.
 */
export default function HostApp() {
  return (
    <HelmetProvider>
      <div className="ss-host-app">
        <ScrollManager />
        <Suspense fallback={<div className="ss-host-wait" />}>
          <Routes>
            {HOST === 'archive' ? archiveRoutes : marketRoutes}
            {LIVE.mintedCollectibles && sharedHere('/ledger') && <Route path="/ledger" element={<Layout><ChakraPage page="ledger" /></Layout>} />}
            {LIVE.transparencyPage && sharedHere('/transparency') && <Route path="/transparency" element={<Layout><ChakraPage page="transparency" /></Layout>} />}
            {/* A page on another host goes there (OffHost); anything else is the 404 page. */}
            <Route path="*" element={<OffHost><Layout><ChakraPage page="notFound" /></Layout></OffHost>} />
          </Routes>
        </Suspense>
      </div>
    </HelmetProvider>
  )
}

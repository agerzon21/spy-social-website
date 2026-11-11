/*
 * market.spysocial.app's entry (speed-1111; market.html). Its CSS is the host's whole look, inlined into the page by
 * the build: the site's base (index.css, the fonts), the Market's pages' modules, then hosts/base.css last.
 */
import '../index.css'
import '../theme/fonts.css'
import '../components/ui/ui.module.css'
import '../components/SearchField.module.css'
import '../pages/archive/archive.module.css'
import '../pages/archive/displayCase.module.css'
import '../pages/market/market.module.css'
import { loadArtIndex, loadLookIndex } from '../lib/archive'
import { fetchMarket, fetchMarketItem } from '../lib/market'
import { loadMarketLines } from '../lib/marketArt'
import { startHost } from './start'
import './base.css'

startHost((path, lang) => {
  loadArtIndex()
  loadLookIndex()
  loadMarketLines(lang)
  const item = /^\/item\/([^/]+)\/?$/.exec(path)
  if (item) fetchMarketItem(decodeURIComponent(item[1]), lang).catch(() => {})
  else fetchMarket(lang).catch(() => {})
})

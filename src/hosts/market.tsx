/*
 * market.spysocial.app's entry (speed-1111; market.html). Its CSS is the host's whole look, inlined into the page by
 * the build: the site's base (index.css, the fonts) and hosts/base.css last; the pages' own CSS is linked beside it
 * (vite.config.ts hostHtml).
 */
import '../index.css'
import '../theme/fonts.css'
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

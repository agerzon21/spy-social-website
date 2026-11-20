/*
 * archive.spysocial.app's entry (speed-1111; archive.html). Its CSS is the host's whole look, inlined into the page by
 * the build: the site's base (index.css, the fonts) and hosts/base.css last; the pages' own CSS is linked beside it
 * (vite.config.ts hostHtml).
 */
import '../index.css'
import '../theme/fonts.css'
import { fetchUnique, fetchUniques, loadArchiveData, loadArtIndex, loadLookIndex } from '../lib/archive'
import { loadMarketLines } from '../lib/marketArt'
import { startHost } from './start'
import './base.css'

startHost((path, lang) => {
  // www's pages the Archive serves too (the Ledger, the Transparency page) read none of the Archive's files.
  if (/^\/(ledger|transparency)\/?$/.test(path)) return
  loadArchiveData(lang)
  loadArtIndex()
  loadLookIndex()
  loadMarketLines(lang)
  const copy = /^\/u\/([^/]+)\/(\d+)\/?$/.exec(path)
  if (copy) fetchUnique(decodeURIComponent(copy[1]), Number(copy[2])).catch(() => {})
  else if (path === '/' || path === '/uniques' || path === '/uniques/') fetchUniques().catch(() => {})
})

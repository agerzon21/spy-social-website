/*
 * archive.spysocial.app's entry (speed-1111; archive.html). Its CSS is the host's whole look, inlined into the page by
 * the build: the site's base (index.css, the fonts), the Archive's pages' modules, then hosts/base.css last.
 */
import '../index.css'
import '../theme/fonts.css'
import '../components/ui/ui.module.css'
import '../pages/archive/archive.module.css'
import '../pages/archive/displayCase.module.css'
import '../pages/archive/holder.module.css'
import { fetchUnique, fetchUniques, loadArchiveData, loadArtIndex, loadLookIndex } from '../lib/archive'
import { loadMarketLines } from '../lib/marketArt'
import { startHost } from './start'
import './base.css'

startHost((path, lang) => {
  loadArchiveData(lang)
  loadArtIndex()
  loadLookIndex()
  loadMarketLines(lang)
  const copy = /^\/u\/([^/]+)\/(\d+)\/?$/.exec(path)
  if (copy) fetchUnique(decodeURIComponent(copy[1]), Number(copy[2])).catch(() => {})
  else if (path === '/' || path === '/uniques' || path === '/uniques/') fetchUniques().catch(() => {})
})

/*
 * The build's renderer for www's pages (www-speed-1112): `vite build --ssr src/prerender.tsx` turns this into a Node
 * module that scripts/prerender.mjs calls once per page and language, writing each page's HTML into the built files
 * so it paints before the app's JavaScript arrives; main.tsx then hydrates it. The same App, router and words as the
 * browser's (main.tsx), with Chakra's styles collected (Emotion's cache in compat mode, so none are put inline) and
 * handed back to go in the page's <head>, where Emotion in the browser picks them up again.
 */
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import { Helmet, HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import App, { PRERENDER_PAGES, PRERENDER_SHELLS, preloadPage } from './App'
import { LANGUAGES, loadStrings, type LangCode } from './i18n'
import I18nProvider from './i18n/I18nProvider'
import SiteHead from './components/SiteHead'
import { CATEGORIES, MOVER_LISTS, type Category, type MoverList } from './lib/market'
import { LIVE } from './lib/legalRelease'
import { archiveStrings } from './pages/archive/strings'
import HostApp from './hosts/HostApp'
import { preloadHost } from './hosts/hostChunks'
import { placeOf } from './lib/siteHost'
import { marketStrings } from './pages/market/strings'

export { PRERENDER_PAGES, PRERENDER_SHELLS }
/** The skin's variables, which hosts/start.tsx puts on a host's page: in the HTML of a page the build draws (archive-speed-1116). */
export { SKIN_CSS } from './theme/skinCss'
export const LANGUAGE_CODES = LANGUAGES.map((l) => ({ code: l.code, rtl: l.rtl }))

/**
 * The link-preview card's alt text in `lang` (og:image:alt, twitter:image:alt), as index.html's English one reads: the
 * card's poster line, then the line-up (meta.cardAlt). `site`: the site's card (home.hero.title); `invite`: an invite's
 * (meta.titles.join), as scripts/share-cards.mjs draws them. Live walk 1118: every language's file said it in English.
 */
export async function cardAlts(lang: LangCode): Promise<{ site: string; invite: string }> {
  const t = await loadStrings(lang)
  const mark = t.home.hero.titleMark
  const gap = lang === 'zh-Hans' ? '' : ' '
  const alt = (poster: string) => `${t.meta.siteName}: ${poster}${mark}${gap}${t.meta.cardAlt}`
  return { site: alt(t.home.hero.title), invite: alt(t.meta.titles.join) }
}

/** One <style> of Emotion's: its key ('css' or 'css-global'), the rules' names and their CSS. */
export type StyleChunk = { key: string; ids: string[]; css: string }

/** The page at `path` in `lang`: the markup inside #root and Chakra's styles, in the order Emotion inserts them. */
/** The page's <head> tags as SiteHead (and the page's own Helmet) set them in the browser: title, meta, link. */
export type HeadTags = { title: string; meta: string; link: string }

export async function render(path: string, lang: LangCode): Promise<{ html: string; styles: StyleChunk[]; head: HeadTags }> {
  await Promise.all([loadStrings(lang), preloadPage(path)])
  // Again, now with any table the page brought (Help's), as main.tsx does.
  const strings = await loadStrings(lang)
  const cache = createCache({ key: 'css' })
  cache.compat = true
  const helmetContext: { helmet?: HelmetServerState } = {}
  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={path}>
        <I18nProvider lang={lang} strings={strings}>
          <App helmetContext={helmetContext} />
        </I18nProvider>
      </StaticRouter>
    </CacheProvider>,
  )
  // @emotion/server's extractCriticalToChunks: the global styles one by one, then every class this page uses.
  const used = new Set<string>()
  for (const m of html.matchAll(/css-([a-zA-Z0-9-_]+)/g)) used.add(m[1])
  const styles: StyleChunk[] = []
  const regular: StyleChunk = { key: cache.key, ids: [], css: '' }
  for (const [id, css] of Object.entries(cache.inserted)) {
    if (css === true || css === undefined) continue
    const registered = cache.registered[`${cache.key}-${id}`] !== undefined
    if (!used.has(id) && registered) continue
    if (registered) {
      regular.ids.push(id)
      regular.css += css
    } else styles.push({ key: `${cache.key}-global`, ids: [id], css })
  }
  styles.push(regular)
  const helmet = helmetContext.helmet
  if (!helmet) throw new Error(`prerender: ${path} in ${lang} set no <head> (HelmetProvider's context is empty)`)
  return { html, styles, head: { title: helmet.title.toString(), meta: helmet.meta.toString(), link: helmet.link.toString() } }
}

/**
 * The Archive's and the Market's fixed pages (crawl2-1114): each host is one app page (vercel.json: _host/archive.html,
 * market.html) whose HTML had the host's one English head until the app's script ran. `file` is the page's name under
 * dist/_host/pre/<host>/ (vercel.json's language rewrites name the same files); `path` its canonical path, which
 * SiteHead names it by. A Unique's and an item's own page stay the host's page (middleware.ts gives previewers theirs).
 */
export const HOST_PAGES: { host: 'archive' | 'market'; file: string; path: string; title?: (lang: LangCode) => string }[] = [
  { host: 'archive', file: 'home', path: '/archive' },
  { host: 'archive', file: 'uniques', path: '/archive/uniques', title: (l) => { const w = archiveStrings(l); return `${w.browse.title} · ${w.item.crumbs} · SpySocial` } },
  { host: 'market', file: 'home', path: '/market' },
  ...MOVER_LISTS.map((list: MoverList) => ({ host: 'market' as const, file: `movers/${list}`, path: `/market/movers/${list}`, title: (l: LangCode) => { const w = marketStrings(l); return `${w.lists[list].title} · ${w.name} · SpySocial` } })),
  { host: 'market', file: 'catalogue', path: '/market/catalogue', title: (l) => { const w = marketStrings(l); return `${w.catalogue.title} · ${w.name} · SpySocial` } },
  ...CATEGORIES.map((cat: Category) => ({ host: 'market' as const, file: `catalogue/${cat}`, path: `/market/catalogue/${cat}`, title: (l: LangCode) => { const w = marketStrings(l); return `${w.categories[cat]} · ${w.name} · SpySocial` } })),
]

/** Whether the build has the hosts' pages on (the LIVE flags routes/hostRoutes reads; there, its host too). */
export const HOSTS_ON = { archive: !!(LIVE.mintedCollectibles && LIVE.uniqueArchive), market: !!LIVE.marketSite }

/**
 * A host page's <head> in `lang`, as the browser ends up with it: SiteHead's (title, description, og:locale, canonical,
 * the ten languages and x-default), then the page's own title where it sets one (its Helmet, WCAG 2.4.2).
 */
export async function renderHostHead(index: number, lang: LangCode): Promise<HeadTags> {
  const page = HOST_PAGES[index]
  const strings = await loadStrings(lang)
  const helmetContext: { helmet?: HelmetServerState } = {}
  renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={page.path}>
        <I18nProvider lang={lang} strings={strings}>
          <SiteHead />
          {page.title ? (
            <Helmet>
              <title>{page.title(lang)}</title>
            </Helmet>
          ) : null}
        </I18nProvider>
      </StaticRouter>
    </HelmetProvider>,
  )
  const helmet = helmetContext.helmet
  if (!helmet) throw new Error(`prerender: ${page.path} in ${lang} set no <head>`)
  return { title: helmet.title.toString(), meta: helmet.meta.toString(), link: helmet.link.toString() }
}

/**
 * A host page's own path ('/archive/uniques' is the Archive's '/uniques'), for its body (renderHostBody). The Archive's
 * ledger (www's page it serves too, lib/siteHost SHARED) is drawn as well: HOST_BODIES.
 */
export const HOST_BODIES: { host: 'archive' | 'market'; file: string; path: string }[] = [
  ...HOST_PAGES.map((p) => ({ host: p.host, file: p.file, path: placeOf(p.path, true).path })),
  ...(LIVE.mintedCollectibles ? [{ host: 'archive' as const, file: 'ledger', path: '/ledger' }] : []),
]

/**
 * A host page's body (archive-speed-1116): the host's own app (hosts/HostApp, as hosts/start.tsx renders it) at its
 * path in `lang`, before any read has come back (the page's own loading state), so it paints before the app's script
 * arrives and hosts/start.tsx hydrates it. Only in a process whose host is that host (scripts/prerender.mjs sets
 * globalThis.__ssSsrHost before loading this module: lib/siteHost reads it once).
 */
export async function renderHostBody(path: string, lang: LangCode): Promise<string> {
  await Promise.all([loadStrings(lang), preloadHost(path)])
  const strings = await loadStrings(lang)
  return renderToString(
    <StaticRouter location={path}>
      <I18nProvider lang={lang} strings={strings}>
        <HostApp />
      </I18nProvider>
    </StaticRouter>,
  )
}

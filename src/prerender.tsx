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
import { StaticRouter } from 'react-router-dom/server'
import App, { PRERENDER_PAGES, preloadPage } from './App'
import { LANGUAGES, loadStrings, type LangCode } from './i18n'
import I18nProvider from './i18n/I18nProvider'

export { PRERENDER_PAGES }
export const LANGUAGE_CODES = LANGUAGES.map((l) => ({ code: l.code, rtl: l.rtl }))

/** One <style> of Emotion's: its key ('css' or 'css-global'), the rules' names and their CSS. */
export type StyleChunk = { key: string; ids: string[]; css: string }

/** The page at `path` in `lang`: the markup inside #root and Chakra's styles, in the order Emotion inserts them. */
export async function render(path: string, lang: LangCode): Promise<{ html: string; styles: StyleChunk[] }> {
  await Promise.all([loadStrings(lang), preloadPage(path)])
  // Again, now with any table the page brought (Help's), as main.tsx does.
  const strings = await loadStrings(lang)
  const cache = createCache({ key: 'css' })
  cache.compat = true
  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={path}>
        <I18nProvider lang={lang} strings={strings}>
          <App />
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
  return { html, styles }
}

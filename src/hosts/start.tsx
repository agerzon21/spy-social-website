import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { loadStrings, pageLang, type LangCode } from '../i18n'
import I18nProvider from '../i18n/I18nProvider'
import { SKIN_CSS } from '../theme/skinCss'
import HostApp from './HostApp'
import { preloadHost } from './hostChunks'

/**
 * Starts the Archive's or the Market's own app (speed-1111; vite.config.ts builds archive.html and market.html, which
 * vercel.json serves on those hosts). `early` starts the page's reads (the ledger, the picture indexes) while the
 * language's words load, instead of after the first paint.
 */
export function startHost(early: (path: string, lang: LangCode) => void) {
  // The skin's variables (www's App puts them in through Chakra's <Global>).
  // A page the build drew has them in its HTML already (scripts/prerender.mjs, archive-speed-1116).
  if (!document.querySelector('style[data-ss-skin]')) {
    const skin = document.createElement('style')
    skin.textContent = SKIN_CSS
    document.head.appendChild(skin)
  }
  const lang = pageLang()
  try {
    early(window.location.pathname, lang)
  } catch {
    // Only a head start: the page reads them itself.
  }
  /*
   * archive-speed-1116: the host's fixed pages (its home, Every Unique, the Market's lists, the ledger) arrive already
   * drawn (scripts/prerender.mjs), in the state the page has before its reads come back, so they paint before this
   * script has arrived. When the HTML's language (#root's data-pre) is the one lang.js chose, React takes that HTML
   * over (hydrateRoot) once the page's chunk and the nav's are in, as main.tsx does on www; the reads then fill it in.
   * Otherwise (another saved language: the HTML's own CSS keeps it hidden) the HTML goes and React draws the page.
   */
  const root = document.getElementById('root')!
  const pre = root.getAttribute('data-pre')
  const start = (strings: Awaited<ReturnType<typeof loadStrings>>, take: boolean) => {
    const app = (
      <BrowserRouter>
        <I18nProvider lang={lang} strings={strings}>
          <HostApp />
        </I18nProvider>
      </BrowserRouter>
    )
    const state = (window.__ssHydration = { hydrated: take, errors: [] as string[] })
    if (take) {
      // A mismatch is put right by React itself (it draws that part again); kept for the site's checks, not logged.
      ReactDOM.hydrateRoot(root, app, { onRecoverableError: (err) => void state.errors.push(String((err as Error)?.message ?? err)) })
      // The built HTML's guard (hidden unless <html lang> is data-pre's language) has done its job once React has taken
      // the HTML over: without the mark, nothing that later touches <html lang> can blank the page (nav-blank-1122).
      root.removeAttribute('data-pre')
      return
    }
    if (pre) {
      root.replaceChildren()
      root.removeAttribute('data-pre')
    }
    ReactDOM.createRoot(root).render(app)
  }
  if (pre === lang) {
    Promise.all([loadStrings(lang), preloadHost(window.location.pathname)]).then(
      ([strings]) => start(strings, true),
      () => loadStrings(lang).then((strings) => start(strings, false)),
    )
  } else loadStrings(lang).then((strings) => start(strings, false))
}

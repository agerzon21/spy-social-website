import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { preloadPage } from './App'
import { loadStrings, pageLang } from './i18n'
import I18nProvider from './i18n/I18nProvider'
import './index.css'

/*
 * The language public/lang.js chose: its words load first (English is already here), so the first paint is in it.
 *
 * www-speed-1112: most of www's pages arrive already drawn (scripts/prerender.mjs renders them into the HTML at build
 * time, in the language the address or the browser asks for), so they paint before this script has even arrived.
 * When the HTML's language (#root's data-pre) is the one lang.js chose, React takes that HTML over as it is
 * (hydrateRoot), once the page's own chunk is in, so nothing on the page is drawn again. Otherwise (a visitor whose
 * saved language differs; the HTML's own CSS keeps it hidden until now) the HTML goes and React draws the page, as
 * every page did before.
 */
const lang = pageLang()
const root = document.getElementById('root')!
const pre = root.getAttribute('data-pre')
const hydrate = pre === lang

declare global {
  interface Window {
    /** What a hydration had to fix (a page whose HTML no longer matched): read by the site's checks, never shown. */
    __ssHydration?: { hydrated: boolean; errors: string[] }
  }
}

const start = (strings: Awaited<ReturnType<typeof loadStrings>>, take: boolean) => {
  const app = (
    <BrowserRouter>
      <I18nProvider lang={lang} strings={strings}>
        <App />
      </I18nProvider>
    </BrowserRouter>
  )
  const state = (window.__ssHydration = { hydrated: take, errors: [] as string[] })
  if (take) {
    // A mismatch is put right by React itself (it draws that part again); kept for the site's checks, not logged.
    ReactDOM.hydrateRoot(root, app, { onRecoverableError: (err) => void state.errors.push(String((err as Error)?.message ?? err)) })
    return
  }
  if (pre) {
    root.replaceChildren()
    root.removeAttribute('data-pre')
  }
  ReactDOM.createRoot(root).render(app)
}

// The page's chunk loads alongside the words; then the words again, now with any table the page brought (Help's).
Promise.all([loadStrings(lang), preloadPage(window.location.pathname)]).then(
  () => loadStrings(lang).then((strings) => start(strings, hydrate)),
  // The page's chunk didn't load (lib/lazyPage reloads the page for a deploy; this is a chunk that's really gone):
  // draw the page as before, so its error shows as it always did.
  () => loadStrings(lang).then((strings) => start(strings, false)),
)

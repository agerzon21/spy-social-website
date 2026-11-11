import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { loadStrings, pageLang, type LangCode } from '../i18n'
import I18nProvider from '../i18n/I18nProvider'
import { SKIN_CSS } from '../theme/skinCss'
import HostApp from './HostApp'

/**
 * Starts the Archive's or the Market's own app (speed-1111; vite.config.ts builds archive.html and market.html, which
 * vercel.json serves on those hosts). `early` starts the page's reads (the ledger, the picture indexes) while the
 * language's words load, instead of after the first paint.
 */
export function startHost(early: (path: string, lang: LangCode) => void) {
  // The skin's variables (www's App puts them in through Chakra's <Global>).
  const skin = document.createElement('style')
  skin.textContent = SKIN_CSS
  document.head.appendChild(skin)
  const lang = pageLang()
  try {
    early(window.location.pathname, lang)
  } catch {
    // Only a head start: the page reads them itself.
  }
  loadStrings(lang).then((strings) =>
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
        <I18nProvider lang={lang} strings={strings}>
          <HostApp />
        </I18nProvider>
      </BrowserRouter>,
    ),
  )
}

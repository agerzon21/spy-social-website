import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { loadStrings, pageLang } from './i18n'
import I18nProvider from './i18n/I18nProvider'
import './index.css'

// The language public/lang.js chose: its words load first (English is already here), so the first paint is in it.
const lang = pageLang()
loadStrings(lang).then((strings) =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <I18nProvider lang={lang} strings={strings}>
        <App />
      </I18nProvider>
    </BrowserRouter>
  )
)

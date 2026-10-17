import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, languageOf, loadStrings, wear, type LangCode, type Strings } from '.'

/** Holds the page's language and its strings (src/i18n); the header's menu switches them with setLang. */
export default function I18nProvider({ lang: first, strings, children }: { lang: LangCode; strings: Strings; children: ReactNode }) {
  const [state, setState] = useState({ lang: first, t: strings })

  const setLang = useCallback(async (code: LangCode) => {
    const t = await loadStrings(code)
    wear(code)
    setState({ lang: code, t })
  }, [])

  const value = useMemo(() => ({ ...state, language: languageOf(state.lang), setLang }), [state, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}


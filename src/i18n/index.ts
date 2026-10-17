import { createContext, useContext } from 'react'
import en, { type Strings } from './locales/en'
import { DEFAULT_LANG, LANG_KEY, languageOf, type LangCode, type Language } from './languages'

/**
 * The site's small i18n layer: one string table per language (src/i18n/locales, English the source and the
 * fallback), a context with the current language, and useT() for the table. A language's table loads as its own
 * chunk the first time it's needed (main.tsx waits for the first one, so the page never paints in the wrong
 * language). public/lang.js picks the language before the first paint; the header's menu changes it (setLang).
 */

export type { Strings } from './locales/en'
export * from './languages'

// Every language but English, each its own chunk.
const loaders = import.meta.glob<{ default: Strings }>(['./locales/*.ts', '!./locales/en.ts'])
const loaded = new Map<LangCode, Strings>([['en', en]])

type Tree = { [key: string]: unknown }
const isTree = (v: unknown): v is Tree => typeof v === 'object' && v !== null && !Array.isArray(v)

/** A translation over English: whatever a translation leaves out (or gets the wrong kind of) stays English. */
function over<T>(base: T, top: unknown): T {
  if (isTree(base)) {
    if (!isTree(top)) return base
    const out: Tree = {}
    for (const k of Object.keys(base)) out[k] = over((base as Tree)[k], top[k])
    return out as T
  }
  if (Array.isArray(base)) return (Array.isArray(top) ? top : base) as T
  return (typeof top === typeof base ? top : base) as T
}

/** The table for `code`, fetched once. Falls back to English if its chunk can't load. */
export async function loadStrings(code: LangCode): Promise<Strings> {
  const cached = loaded.get(code)
  if (cached) return cached
  const load = loaders[`./locales/${code}.ts`]
  if (!load) return en
  try {
    const strings = over(en, (await load()).default)
    loaded.set(code, strings)
    return strings
  } catch {
    return en
  }
}

/** Puts <html> in the language (Helmet keeps it there too) and remembers the choice like public/lang.js reads it. */
export function wear(code: LangCode) {
  const root = document.documentElement
  root.setAttribute('lang', code)
  root.setAttribute('dir', languageOf(code).rtl ? 'rtl' : 'ltr')
  try {
    localStorage.setItem(LANG_KEY, code)
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  // A ?lang= in the address would bring the old language back on a reload: the choice replaces it. The router
  // ignores the query here, so its state stays as it is.
  const url = new URL(window.location.href)
  if (url.searchParams.has('lang')) {
    url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
  }
}

export interface I18n {
  lang: LangCode
  language: Language
  t: Strings
  setLang: (code: LangCode) => Promise<void>
}

export const I18nContext = createContext<I18n>({
  lang: DEFAULT_LANG,
  language: languageOf(DEFAULT_LANG),
  t: en,
  setLang: async () => {},
})

/** The current language, its details and the switch. */
export const useLang = () => useContext(I18nContext)

/** The current language's strings. */
export const useT = () => useContext(I18nContext).t

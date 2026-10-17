/**
 * The site's ten languages: the app's (spy-social localization/languages.ts), in its order, with their own names.
 * `short` is what the header's button shows; `flag` the little flag in the menu (src/components/flags.tsx);
 * `locale` formats dates (Arabic and Bengali with Latin digits, as the app does); `og` is the Open Graph locale.
 * public/lang.js reads the same codes before the first paint: keep the two lists in step.
 */
export type LangCode = 'en' | 'es' | 'ru' | 'zh-Hans' | 'hi' | 'ar' | 'fr' | 'bn' | 'pt-BR' | 'id'

export type FlagCode = 'us' | 'es' | 'ru' | 'cn' | 'in' | 'sa' | 'fr' | 'bd' | 'br' | 'id'

export interface Language {
  code: LangCode
  short: string
  native: string
  flag: FlagCode
  rtl: boolean
  locale: string
  og: string
}

export const LANGUAGES: readonly Language[] = [
  { code: 'en', short: 'EN', native: 'English', flag: 'us', rtl: false, locale: 'en-US', og: 'en_US' },
  { code: 'es', short: 'ES', native: 'Español', flag: 'es', rtl: false, locale: 'es', og: 'es_ES' },
  { code: 'ru', short: 'RU', native: 'Русский', flag: 'ru', rtl: false, locale: 'ru', og: 'ru_RU' },
  { code: 'zh-Hans', short: 'ZH', native: '简体中文', flag: 'cn', rtl: false, locale: 'zh-CN', og: 'zh_CN' },
  { code: 'hi', short: 'HI', native: 'हिन्दी', flag: 'in', rtl: false, locale: 'hi-IN', og: 'hi_IN' },
  { code: 'ar', short: 'AR', native: 'العربية', flag: 'sa', rtl: true, locale: 'ar-u-nu-latn', og: 'ar_AR' },
  { code: 'fr', short: 'FR', native: 'Français', flag: 'fr', rtl: false, locale: 'fr-FR', og: 'fr_FR' },
  { code: 'bn', short: 'BN', native: 'বাংলা', flag: 'bd', rtl: false, locale: 'bn-u-nu-latn', og: 'bn_BD' },
  { code: 'pt-BR', short: 'PT', native: 'Português (Brasil)', flag: 'br', rtl: false, locale: 'pt-BR', og: 'pt_BR' },
  { code: 'id', short: 'ID', native: 'Bahasa Indonesia', flag: 'id', rtl: false, locale: 'id-ID', og: 'id_ID' },
]

export const DEFAULT_LANG: LangCode = 'en'

/** The key public/lang.js and the menu keep the choice under. */
export const LANG_KEY = 'ss-lang'

export const languageOf = (code: LangCode): Language => LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]

/**
 * A browser or URL tag to one of ours: an exact code (any case, _ or -), Chinese of any script or region to
 * zh-Hans, Portuguese of any region to pt-BR, otherwise the base code. Same rules as public/lang.js.
 */
export function matchLang(tag: string | null | undefined): LangCode | null {
  if (!tag) return null
  const t = String(tag).trim().replace(/_/g, '-').toLowerCase()
  if (!t) return null
  const exact = LANGUAGES.find((l) => l.code.toLowerCase() === t)
  if (exact) return exact.code
  const base = t.split('-')[0]
  if (base === 'zh') return 'zh-Hans'
  if (base === 'pt') return 'pt-BR'
  return LANGUAGES.find((l) => l.code === base)?.code ?? null
}

/** The language public/lang.js put on <html> before React started. */
export const pageLang = (): LangCode =>
  (typeof document !== 'undefined' && matchLang(document.documentElement.getAttribute('lang'))) || DEFAULT_LANG

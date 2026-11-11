import { useCallback, useEffect, useState } from 'react'
import { useLang, type LangCode } from '../../i18n'
import { fetchMarket, fetchMarketItem, marketSoon, type MarketItemPage, type MarketList } from '../../lib/market'
import { loadArtIndex } from '../../lib/archive'
import { marketStrings, type MarketStrings } from './strings'

export type LoadState = 'loading' | 'ok' | 'busy' | 'soon'

/** The page's words, the reader's language and the pictures the Archive has drawn (a Legendary's plain picture). */
export function useMarketWords(): { w: MarketStrings; lang: LangCode; locale: string; art: Set<string> } {
  const { lang, language } = useLang()
  const [art, setArt] = useState<Set<string>>(new Set())
  useEffect(() => {
    let live = true
    loadArtIndex().then((a) => live && setArt(a))
    return () => {
      live = false
    }
  }, [])
  return { w: marketStrings(lang), lang, locale: language.locale, art }
}

/** Every item on the books (op=market): 'soon' while the server's Market reads aren't on yet (the function answers 400). */
export function useMarketList() {
  const { lang } = useLang()
  const [list, setList] = useState<MarketList | null>(null)
  const [state, setState] = useState<LoadState>('loading')
  const load = useCallback(() => {
    setState('loading')
    fetchMarket(lang)
      .then((l) => {
        setList(l)
        setState(l ? 'ok' : 'busy')
      })
      .catch((e) => setState(marketSoon(e) ? 'soon' : 'busy'))
  }, [lang])
  useEffect(load, [load])
  return { list, state, retry: load }
}

/** One item's page (op=market_item). null page with state 'ok': not on the books. */
export function useMarketItem(code: string) {
  const { lang } = useLang()
  const [page, setPage] = useState<MarketItemPage | null>(null)
  const [state, setState] = useState<LoadState>('loading')
  const load = useCallback(() => {
    setState('loading')
    fetchMarketItem(code, lang)
      .then((p) => {
        setPage(p)
        setState('ok')
      })
      .catch((e) => setState(marketSoon(e) ? 'soon' : 'busy'))
  }, [code, lang])
  useEffect(load, [load])
  return { page, state, retry: load }
}

export const fmt = (n: number, locale: string) => n.toLocaleString(locale)

/** 1.2k / 3.4m for the tight columns on a phone; the full number in its title. */
export function compact(n: number, locale: string): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: n >= 1000 && n < 10_000 ? 1 : 0 }).format(n)
}

/** +12.3% / −4% (a real minus), one decimal under 10%. */
export function pctText(f: number, locale: string): string {
  const p = f * 100
  const abs = Math.abs(p)
  const txt = new Intl.NumberFormat(locale, { maximumFractionDigits: abs < 10 ? 1 : 0 }).format(abs)
  return `${p > 0 ? '+' : p < 0 ? '−' : ''}${txt}%`
}

export const dayText = (iso: string, locale: string, withYear = false) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString(locale, { month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}), timeZone: 'UTC' })

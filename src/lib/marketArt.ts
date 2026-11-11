/**
 * The Market's pictures and lines for every item on the books (market-art-1111, owner Nov 11: "most items don't have
 * photos ... why aren't there descriptions"). No server change: both come from the app's own code at a release
 * (scripts/market-item-art, run from an app checkout).
 *
 * Pictures: public/market-art/<code>.webp (the item page's, at most 640) and <code>-s.webp (a list row's, 128), drawn
 * by the app's own drawing, never on a sample agent:
 *   case    a wearable, a hair or beard colour (the standard hair or beard alone in that colour), a border round an
 *           empty dark stage: alone, cut out, shown in the display case (the Archive's room)
 *   scene   a backdrop or a celebration: full frame, no case and no frame
 *   plate   a title: the app's own title plate, its words in each language (public/market-art/title/<lang>/<code>)
 *   file    a sealed Intercept: the app's file of its tier with its stamp in each language
 *           (public/market-art/intercept/<lang>/<tier>)
 * The index (pages/market/art.json) says which picture each item has; an item drawn after it falls back to its shelf's
 * mark. A Legendary the Archive has drawn keeps the Archive's picture (lib/archive lookOf).
 *
 * Lines: the app's item descriptions (localization/translations/itemDescriptions: one short line under the item's name
 * on its card) and the names of titles named on the server (Game Night prizes) the ledger doesn't send yet, per
 * language in pages/market/words/<lang>.json, loaded with the page's language (its own small file).
 */
import { useEffect, useState } from 'react'
import { useLang, type LangCode } from '../i18n'
import index from '../pages/market/art.json'
import type { MarketItem } from './market'

export type MarketPicKind = 'case' | 'scene' | 'plate' | 'file'
export type MarketPic = { kind: MarketPicKind; src: string; big: boolean }

const KINDS = index as unknown as Record<string, MarketPicKind | string[]>
const LANGS = new Set((KINDS.langs as string[] | undefined) ?? [])

/** The item's picture (the list's small one, or the page's), or null where none is drawn yet. */
export function marketPic(it: Pick<MarketItem, 'k' | 'i' | 't'>, lang: LangCode, small: boolean): MarketPic | null {
  const s = small ? '-s' : ''
  const ln = LANGS.has(lang) ? lang : 'en'
  if (it.t || it.k === 'intercept') {
    return KINDS[`intercept.tier.${it.i}`] ? { kind: 'file', src: `/market-art/intercept/${ln}/${it.i}${s}.webp`, big: false } : null
  }
  const kind = KINDS[it.i]
  if (typeof kind !== 'string') return null
  if (it.k === 'title') return kind === 'plate' ? { kind: 'plate', src: `/market-art/title/${ln}/${it.i}${s}.webp`, big: false } : null
  return { kind: kind as MarketPicKind, src: `/market-art/${it.i}${s}.webp`, big: it.i.startsWith('frame_') }
}

export type MarketLines = { d: Record<string, string>; n: Record<string, string> }
const NONE: MarketLines = { d: {}, n: {} }
const loaders = import.meta.glob<MarketLines>('../pages/market/words/*.json', { import: 'default' })
const cache = new Map<string, Promise<MarketLines>>()

/** The item lines in the reader's language (English where a language has no file). */
export function loadMarketLines(lang: LangCode): Promise<MarketLines> {
  const hit = cache.get(lang)
  if (hit) return hit
  const load = loaders[`../pages/market/words/${lang}.json`] ?? loaders['../pages/market/words/en.json']
  const p = (load ? load() : Promise.resolve(NONE)).catch(() => NONE)
  cache.set(lang, p)
  return p
}

const lineKey = (it: Pick<MarketItem, 'k' | 'i' | 't'>) => `${it.t || it.k === 'intercept' ? 'intercept' : it.k === 'title' ? 'title' : 'avatar'}:${it.i}`

/** The item's description (a sealed Intercept's: its tier's), or null where it has none. */
export function lineOf(lines: MarketLines | null, it: Pick<MarketItem, 'k' | 'i' | 't'>): string | null {
  if (!lines) return null
  return lines.d[lineKey(it)] ?? null
}

/** The server's name, unless it sent the bare code (a title named on the server: its name from the lines). */
export function nameFix<T extends Pick<MarketItem, 'k' | 'i' | 't' | 'nm'>>(lines: MarketLines, it: T): T {
  if (it.nm && it.nm !== it.i) return it
  const n = lines.n[lineKey(it)]
  return n ? { ...it, nm: n } : it
}

/** The item lines in the reader's language; null until they're read (the Market's pages and the Archive's Unique pages). */
export function useItemLines(): MarketLines | null {
  const { lang } = useLang()
  const [lines, setLines] = useState<{ lang: LangCode; l: MarketLines } | null>(null)
  useEffect(() => {
    let live = true
    loadMarketLines(lang).then((l) => live && setLines({ lang, l }))
    return () => {
      live = false
    }
  }, [lang])
  return lines?.lang === lang ? lines.l : null
}

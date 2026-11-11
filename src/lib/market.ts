/**
 * The Market (www.spysocial.app/market): the Black Market's prices for every non-Unique item, read from the app's
 * ledger function without an account (app repo supabase/functions/ledger, ops `market` and `market_item`: the database's
 * market_public, 20261231980000_market_public_1110). Aggregates only: the server sends no player, order or single trade,
 * and an item has a price only when at least `min_trades` counted trades make it. Its days are UTC dates.
 *
 * An item's PRICE on a day is the average of its trades in the 7 days to that day (30, then 90 days while there are
 * fewer than min_trades); GUIDE is the app's own guide price. Cached 60 s at the function; a busy answer is tried again.
 * The Uniques are the Archive's (src/lib/archive.ts); this page leaves them out.
 */
import type { LangCode } from '../i18n'
import { ArchiveBusy, ledgerGet } from './archive'

/** The windows the server counts in: today, 7, 30, 90, 180 days (the order of `b`, `v` and `x`). */
export const WINDOWS = ['1d', '7d', '30d', '90d', '180d'] as const
export type Win = (typeof WINDOWS)[number]
export const winIndex = (w: Win) => WINDOWS.indexOf(w)

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'mythic' | 'legendary' | 'intercept'

/** One item on the books (op=market). Without `p` it has too few trades for a price, and nothing past `s` is sent. */
export type MarketItem = {
  /** Its code on the books ("beta.intercepts.avatar.hat_fez", "intercept.tier.5"). */
  c: string
  /** avatar | title | intercept */
  k: string
  /** The app's item code ("hat_fez"; an Intercept's tier "5"). */
  i: string
  /** Its name in the reader's language (English where the app has none). */
  nm: string
  r: Rarity | string
  /** The rarity's rank (Common 1 .. Legendary 6); null for an Intercept. */
  rk: number | null
  /** An unopened Intercept. */
  t: boolean
  /** Its shred value in Intel: the lowest price the market takes (null: a title that can't be shredded). */
  s: number | null
  /** Its price today (Intel). */
  p?: number
  /** The app's guide price, when enough trades make it. */
  g?: number | null
  /** Its price 1, 7, 30, 90 and 180 days ago (null: too few trades then). */
  b?: (number | null)[]
  /** Trades today and in 7 / 30 / 90 / 180 days. */
  v?: number[]
  /** Intel traded in the same windows (null: fewer than min_trades there). */
  x?: (number | null)[]
}

export type MarketHead = {
  ok: true
  /** 'beta' before the launch (the testers' market; wiped Dec 7), 'open' from it. */
  phase: 'beta' | 'open'
  opens_at: string | null
  at: string
  min_trades: number
  /** The market is paused (the owner's switch or its own safety pause). */
  halted: boolean
  notice?: string
}

export type MarketList = MarketHead & {
  featured: string | null
  totals: { trades_1d: number; trades_30d: number; intel_30d: number | null }
  items: MarketItem[]
}

export type MarketDay = {
  /** UTC date, YYYY-MM-DD. */
  d: string
  /** Trades that day. */
  n: number
  /** That day's average, only with at least min_trades trades that day. */
  a: number | null
  /** The day's price (the 7-day rule). */
  p: number | null
}

export type MarketItemPage = MarketHead & { item: MarketItem; days: MarketDay[] }

/** A sample answer for the design preview (dev builds with ?sample=1 only; every page then says SAMPLE DATA). */
export const sampleOn = (): boolean =>
  import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('sample')

const listCache = new Map<string, { at: number; p: Promise<MarketList | null> }>()
/** Every item on the books in the reader's language (kept a minute in this tab: every Market page shares it). */
export function fetchMarket(lang: LangCode): Promise<MarketList | null> {
  const key = `${lang}${sampleOn() ? ':sample' : ''}`
  const kept = listCache.get(key)
  if (kept && Date.now() - kept.at < 60_000) return kept.p
  const p = sampleOn()
    ? import('../pages/market/sample').then((m) => m.sampleMarket())
    : ledgerGet<MarketList>(`op=market&lang=${encodeURIComponent(lang)}`)
  p.catch(() => listCache.delete(key))
  listCache.set(key, { at: Date.now(), p })
  return p
}

export function fetchMarketItem(code: string, lang: LangCode): Promise<MarketItemPage | null> {
  if (sampleOn()) return import('../pages/market/sample').then((m) => m.sampleItem(code))
  return ledgerGet<MarketItemPage>(`op=market_item&code=${encodeURIComponent(code)}&lang=${encodeURIComponent(lang)}`)
}

/** The server's Market reads aren't on yet (the ledger function answers 400 for an op it doesn't know). */
export const marketSoon = (e: unknown) => e instanceof ArchiveBusy && /archive 400/.test(e.message)

// ------------------------------------------------------------------ catalogue

/** The catalogue's shelves, in the order the page shows them. */
export const CATEGORIES = ['intercepts', 'outfits', 'hats', 'glasses', 'accessories', 'hair', 'facial_hair', 'borders', 'backdrops', 'celebrations', 'titles'] as const
export type Category = (typeof CATEGORIES)[number]

/** Which shelf an item sits on: what it is in the app's Locker. */
export function categoryOf(it: Pick<MarketItem, 'k' | 'i' | 't'>): Category {
  if (it.t || it.k === 'intercept') return 'intercepts'
  if (it.k === 'title') return 'titles'
  const code = it.i
  if (code.startsWith('outfit_')) return 'outfits'
  if (code.startsWith('hat_')) return 'hats'
  if (code.startsWith('glasses_')) return 'glasses'
  if (code.startsWith('hair_')) return 'hair'
  if (code.startsWith('facial_hair_')) return 'facial_hair'
  if (code.startsWith('frame_')) return 'borders'
  if (code.startsWith('background_')) return 'backdrops'
  if (code.startsWith('celebration_') || code.startsWith('local_')) return 'celebrations'
  return 'accessories'
}

/** The page's own address for an item. */
export const itemPath = (code: string) => `/market/item/${encodeURIComponent(code)}`

// ------------------------------------------------------------------ numbers

/** A change as a fraction (0.12 = +12%), or null when either end has no price. */
export function changeOf(now: number | null | undefined, before: number | null | undefined): number | null {
  if (now == null || before == null || before <= 0) return null
  return (now - before) / before
}

/** An item's change over a window (today = since yesterday's price). */
export const itemChange = (it: MarketItem, w: Win) => changeOf(it.p, it.b?.[winIndex(w)])

/** The four lists of Market Movers. */
export type MoverList = 'rises' | 'falls' | 'traded' | 'valuable'
export const MOVER_LISTS: MoverList[] = ['rises', 'falls', 'traded', 'valuable']

/** A list of Market Movers over a window, at most `limit` items (never every item). */
export function movers(items: MarketItem[], list: MoverList, w: Win, limit: number): MarketItem[] {
  const i = winIndex(w)
  const priced = items.filter((it) => it.p != null)
  let out: { it: MarketItem; key: number }[]
  switch (list) {
    case 'rises':
    case 'falls':
      out = priced
        .map((it) => ({ it, key: itemChange(it, w) }))
        .filter((x): x is { it: MarketItem; key: number } => x.key != null && (list === 'rises' ? x.key > 0 : x.key < 0))
        .map((x) => ({ it: x.it, key: list === 'rises' ? -x.key : x.key }))
      break
    case 'traded':
      out = priced.filter((it) => (it.v?.[i] ?? 0) > 0).map((it) => ({ it, key: -(it.v?.[i] ?? 0) }))
      break
    case 'valuable':
      out = priced.filter((it) => it.x?.[i] != null).map((it) => ({ it, key: -(it.x?.[i] ?? 0) }))
      break
  }
  return out
    .sort((a, b) => a.key - b.key || (b.it.v?.[i] ?? 0) - (a.it.v?.[i] ?? 0) || a.it.nm.localeCompare(b.it.nm))
    .slice(0, limit)
    .map((x) => x.it)
}

/** The featured item: the server's pick (the owner's), else the most traded priced item of the week. */
export function featuredOf(list: MarketList | null): MarketItem | null {
  if (!list) return null
  return list.items.find((it) => it.c === list.featured) ?? movers(list.items, 'traded', '7d', 1)[0] ?? null
}

/** Search the names (and codes) a reader types: starts-with first, then contains; at most `limit`. */
export function searchItems(items: MarketItem[], q: string, limit: number): MarketItem[] {
  const norm = (t: string) => t.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  const query = norm(q)
  if (query.length < 2) return []
  const scored: { it: MarketItem; s: number }[] = []
  for (const it of items) {
    const n = norm(it.nm)
    const words = n.split(' ')
    const s = n.startsWith(query) ? 0 : words.some((w) => w.startsWith(query)) ? 1 : n.includes(query) ? 2 : norm(it.i.replace(/_/g, ' ')).includes(query) ? 3 : -1
    if (s >= 0) scored.push({ it, s })
  }
  return scored
    .sort((a, b) => a.s - b.s || Number(b.it.p != null) - Number(a.it.p != null) || a.it.nm.localeCompare(b.it.nm))
    .slice(0, limit)
    .map((x) => x.it)
}

/** The app's rarity colours (constants/kit.ts rarityColors: `dark` on navy, `light` on cream), an Intercept's tier gold. */
export const RARITY_COLOUR: Record<string, { dark: string; light: string }> = {
  common: { dark: '#A3A9B4', light: '#6B7280' },
  uncommon: { dark: '#6FD39F', light: '#2F8F57' },
  rare: { dark: '#7FB4F5', light: '#2A5CD4' },
  epic: { dark: '#C39CFF', light: '#7A3FC7' },
  mythic: { dark: '#FF7FB0', light: '#C2185B' },
  legendary: { dark: '#F2B64D', light: '#B26B00' },
  intercept: { dark: '#ffd166', light: '#8a5e12' },
}

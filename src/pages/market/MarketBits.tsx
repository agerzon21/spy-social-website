import { useMemo, type ReactNode } from 'react'
import Link from '../../components/SiteLink'
import { FaCaretDown, FaCaretUp, FaFlask, FaTriangleExclamation } from 'react-icons/fa6'
import ui from '../../components/ui/ui.module.css'
import { SearchField } from '../../components/SearchField'
import {
  categoryOf,
  itemChange,
  itemPath,
  RARITY_COLOUR,
  sampleOn,
  searchItems,
  winIndex,
  type MarketHead,
  type MarketItem,
  type MoverList,
  type Win,
  WINDOWS,
} from '../../lib/market'
import { compact, fmt, pctText, useMarketWords, type LoadState } from './useMarket'
import { CATEGORY_ICON } from './icons'
import a from '../archive/archive.module.css'
import s from './market.module.css'

/** Every Market page: the dark vault and the lines (its nav is in the header: components/HostNav) that must show above everything (sample, beta, paused). */
export function MarketPage({ head, children }: { head?: MarketHead | null; children: ReactNode }) {
  const { w } = useMarketWords()
  return (
    <div className={`${a.page} ${s.page}`}>
      <div className={ui.wrap}>
        {sampleOn() ? (
          <p className={`${a.notice} ${s.sample}`} role="note">
            <FaFlask aria-hidden focusable={false} />
            <span>{w.sample}</span>
          </p>
        ) : null}
        {head?.phase === 'beta' && !sampleOn() ? (
          <p className={a.notice} role="note">
            <FaTriangleExclamation aria-hidden focusable={false} />
            <span>{w.beta}</span>
          </p>
        ) : null}
        {head?.halted ? (
          <p className={a.notice} role="status">
            <FaTriangleExclamation aria-hidden focusable={false} />
            <span>{w.halted}</span>
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}

/** The server's Market reads aren't on yet: "Market opens December 8". Busy: a plain line and a retry. */
export function MarketState({ kind, onRetry }: { kind: LoadState; onRetry?: () => void }) {
  const { w } = useMarketWords()
  if (kind === 'soon') {
    return (
      <div className={s.soon} role="status">
        <p className={s.soonKicker}>{w.name}</p>
        <p className={s.soonTitle}>{w.soon.title}</p>
        <p className={s.soonText}>{w.soon.text}</p>
      </div>
    )
  }
  if (kind !== 'busy') return null
  return (
    <div className={a.state} role="status">
      <p>{w.busy}</p>
      {onRetry ? (
        <button type="button" className={a.linkBtn} onClick={onRetry}>
          {w.retry}
        </button>
      ) : null}
    </div>
  )
}

/** An item's picture: a Legendary's plain art from the Archive where it's drawn, else its shelf's mark in its rarity. */
export function ItemThumb({ it, size = 'sm' }: { it: Pick<MarketItem, 'k' | 'i' | 't' | 'r' | 'nm'>; size?: 'sm' | 'md' | 'lg' }) {
  const { art } = useMarketWords()
  const cat = categoryOf(it)
  const Icon = CATEGORY_ICON[cat]
  const colour = RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common
  const pic = it.r === 'legendary' && art.has(`l-${it.i}`) ? `/archive/art/l-${it.i}${size === 'lg' ? '' : '-s'}.webp` : null
  return (
    <span
      className={`${s.thumb} ${s[`thumb_${size}`]} ${pic ? s.thumbArt : ''}`}
      style={{ ['--rar' as string]: colour.dark, ['--rar-light' as string]: colour.light }}
      aria-hidden
    >
      {pic ? (
        <img src={pic} alt="" loading="lazy" decoding="async" width={size === 'lg' ? 640 : 320} height={size === 'lg' ? 640 : 320} />
      ) : it.t ? (
        <span className={s.thumbTier}>{it.i}</span>
      ) : (
        <Icon className={s.thumbIcon} focusable={false} />
      )}
    </span>
  )
}

/** "1,240" and a small "Intel", or the no-price words. */
export function Price({ n, big = false }: { n: number | null | undefined; big?: boolean }) {
  const { w, locale } = useMarketWords()
  if (n == null) return <span className={s.noPrice}>{w.noPrice}</span>
  return (
    <span className={big ? s.priceBig : s.price}>
      {fmt(n, locale)}
      <small> {w.intel}</small>
    </span>
  )
}

/** A change: a caret, a sign and the percent; never colour alone. */
export function Change({ f, big = false }: { f: number | null | undefined; big?: boolean }) {
  const { locale } = useMarketWords()
  if (f == null) return <span className={`${s.change} ${s.flat}`}>—</span>
  const dir = f > 0.0005 ? 'up' : f < -0.0005 ? 'down' : 'flat'
  const Icon = dir === 'up' ? FaCaretUp : dir === 'down' ? FaCaretDown : null
  return (
    <span className={`${s.change} ${s[dir]} ${big ? s.changeBig : ''}`}>
      {Icon ? <Icon aria-hidden focusable={false} /> : null}
      {pctText(f, locale)}
    </span>
  )
}

/** Its shelf and rarity, in words. */
export function ItemMeta({ it }: { it: MarketItem }) {
  const { w } = useMarketWords()
  return (
    <span className={s.meta}>
      <span className={s.rarDot} style={{ ['--rar' as string]: (RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common).dark, ['--rar-light' as string]: (RARITY_COLOUR[it.r] ?? RARITY_COLOUR.common).light }} aria-hidden />
      {w.categories[categoryOf(it)]} · {w.rarity[it.r] ?? it.r}
    </span>
  )
}

/**
 * A ranked table of items (a mover list, a shelf, search results): rank, the item, its price, and the list's own number
 * (the change for rises / falls, trades for most traded, Intel for most valuable). Rows are links; the price and the
 * second number keep to the right; on a phone the second number sits under the price.
 */
export function ItemTable({ items, list = 'traded', win = '30d', start = 1, showRank = true }: { items: MarketItem[]; list?: MoverList; win?: Win; start?: number; showRank?: boolean }) {
  const { w, locale } = useMarketWords()
  const i = winIndex(win)
  const third = `${list === 'rises' || list === 'falls' ? w.cols.change : list === 'valuable' ? w.cols.value : w.cols.trades} · ${w.windows[win]}`
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead>
          <tr>
            {showRank ? <th scope="col" className={s.colRank}>{w.cols.rank}</th> : null}
            <th scope="col">{w.cols.item}</th>
            <th scope="col" className={s.colNum}>{w.cols.price}</th>
            <th scope="col" className={s.colNum}>{third}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, n) => (
            <tr key={it.c}>
              {showRank ? <td className={s.colRank}>{start + n}</td> : null}
              <td>
                <Link to={itemPath(it.c)} className={s.rowLink}>
                  <ItemThumb it={it} />
                  <span className={s.rowName}>
                    <b>{it.nm}</b>
                    <ItemMeta it={it} />
                  </span>
                </Link>
              </td>
              <td className={s.colNum}>
                <Price n={it.p} />
              </td>
              <td className={s.colNum}>
                {list === 'rises' || list === 'falls' ? (
                  <Change f={itemChange(it, win)} />
                ) : list === 'valuable' ? (
                  it.x?.[i] != null ? <span className={s.num} title={fmt(it.x[i] as number, locale)}>{compact(it.x[i] as number, locale)}</span> : <span className={s.flat}>—</span>
                ) : (
                  <span className={s.num}>{fmt(it.v?.[i] ?? 0, locale)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The search box and what it finds as you type (nothing until two letters: never every item). */
export function MarketSearch({ items, q, onQ, limit, autoFocus = false }: { items: MarketItem[]; q: string; onQ: (q: string) => void; limit: number; autoFocus?: boolean }) {
  const { w } = useMarketWords()
  const found = useMemo(() => searchItems(items, q, limit + 1), [items, q, limit])
  const shown = found.slice(0, limit)
  return (
    <div className={s.searchBox} data-autofocus={autoFocus || undefined}>
      <SearchField value={q} onChange={onQ} label={w.search.label} hint={w.search.hint} clear={w.search.clear} />
      {q.trim().length >= 2 ? (
        shown.length ? (
          <>
            <p className={s.searchCount} role="status">{w.search.results(shown.length)}</p>
            <ItemTable items={shown} showRank={false} list="traded" win="30d" />
            {found.length > limit ? <p className={s.searchCount}>{w.search.more}</p> : null}
          </>
        ) : (
          <p className={a.empty} role="status">{w.search.none}</p>
        )
      ) : null}
    </div>
  )
}


/** The window chips: Today, 7, 30, 90, 180 days. */
export function WindowChips({ win, onWin, label }: { win: Win; onWin: (w: Win) => void; label: string }) {
  const { w } = useMarketWords()
  return (
    <div className={s.chips} role="group" aria-label={label}>
      {WINDOWS.map((x) => (
        <button key={x} type="button" className={a.chip} aria-pressed={x === win} onClick={() => onWin(x)}>
          {w.windows[x]}
        </button>
      ))}
    </div>
  )
}


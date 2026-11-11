import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import { CATEGORIES, categoryOf, itemChange, type Category, type MarketItem } from '../../lib/market'
import { ItemTable, MarketPage, MarketSearch, MarketState } from './MarketBits'
import { useMarketList, useMarketWords } from './useMarket'
import { CATEGORY_ICON } from './icons'
import a from '../archive/archive.module.css'
import s from './market.module.css'

const SHOWN = 100
const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'mythic', 'legendary'] as const
type Sort = 'traded' | 'price' | 'change' | 'name'

/** Every shelf with its count (/market/catalogue), or one shelf's items (/market/catalogue/:cat): at most 100 shown. */
const MarketCatalogue = () => {
  const { w } = useMarketWords()
  const { cat } = useParams()
  const { list, state, retry } = useMarketList()
  const items = useMemo(() => list?.items ?? [], [list])
  const [q, setQ] = useState('')
  const [rar, setRar] = useState<string>('all')
  const [sort, setSort] = useState<Sort>('traded')
  const shelf = cat && (CATEGORIES as readonly string[]).includes(cat) ? (cat as Category) : null
  const onShelf = useMemo(() => (shelf ? items.filter((it) => categoryOf(it) === shelf) : []), [items, shelf])
  const rows = useMemo(() => {
    const by: Record<Sort, (x: MarketItem, y: MarketItem) => number> = {
      traded: (x, y) => (y.v?.[2] ?? -1) - (x.v?.[2] ?? -1),
      price: (x, y) => (y.p ?? -1) - (x.p ?? -1),
      change: (x, y) => Math.abs(itemChange(y, '30d') ?? -1) - Math.abs(itemChange(x, '30d') ?? -1),
      name: () => 0,
    }
    return onShelf
      .filter((it) => rar === 'all' || it.r === rar)
      .sort((x, y) => by[sort](x, y) || x.nm.localeCompare(y.nm))
  }, [onShelf, rar, sort])
  if (cat && !shelf) return <Navigate to="/market/catalogue" replace />

  if (!shelf) {
    return (
      <MarketPage head={list}>
        <ol className={a.crumbs}>
          <li><Link to="/market">{w.nav.market}</Link></li>
          <li>{w.catalogue.title}</li>
        </ol>
        <header className={s.pageHead}>
          <Eyebrow>{w.name}</Eyebrow>
          <DisplayHeading as="h1" size={2}>{w.catalogue.title}</DisplayHeading>
          <p className={a.sectionLede}>{w.catalogue.lede}</p>
        </header>
        {state === 'soon' || state === 'busy' ? <MarketState kind={state} onRetry={retry} /> : null}
        {state === 'ok' ? (
          <>
            <div className={s.toolbar}>
              <MarketSearch items={items} q={q} onQ={setQ} limit={50} />
            </div>
            <ul className={s.shelves}>
              {CATEGORIES.map((c) => {
                const on = items.filter((it) => categoryOf(it) === c)
                if (!on.length) return null
                const Icon = CATEGORY_ICON[c]
                return (
                  <li key={c}>
                    <Link to={`/market/catalogue/${c}`} className={s.shelf}>
                      <Icon className={s.shelfIcon} aria-hidden focusable={false} />
                      <span className={s.shelfName}>{w.categories[c]}</span>
                      <span className={s.shelfCount}>{w.catalogue.shelf(on.length, on.filter((it) => it.p != null).length)}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
      </MarketPage>
    )
  }

  const Icon = CATEGORY_ICON[shelf]
  const rarities = RARITIES.filter((r) => onShelf.some((it) => it.r === r))
  return (
    <MarketPage head={list}>
      <ol className={a.crumbs}>
        <li><Link to="/market">{w.nav.market}</Link></li>
        <li><Link to="/market/catalogue">{w.catalogue.title}</Link></li>
        <li>{w.categories[shelf]}</li>
      </ol>
      <header className={`${s.pageHead} ${s.shelfHead}`}>
        <Icon className={s.shelfHeadIcon} aria-hidden focusable={false} />
        <div>
          <Eyebrow>{w.catalogue.title}</Eyebrow>
          <DisplayHeading as="h1" size={2}>{w.categories[shelf]}</DisplayHeading>
          {state === 'ok' ? <p className={a.sectionLede}>{w.catalogue.shelf(onShelf.length, onShelf.filter((it) => it.p != null).length)}</p> : null}
        </div>
      </header>
      {state === 'soon' || state === 'busy' ? <MarketState kind={state} onRetry={retry} /> : null}
      {state === 'ok' ? (
        <>
          <div className={s.toolbar}>
            <MarketSearch items={onShelf} q={q} onQ={setQ} limit={50} />
            {q.trim().length < 2 ? (
              <div className={s.filterRow}>
                {rarities.length > 1 ? (
                  <div className={s.chips} role="group" aria-label={w.catalogue.filter}>
                    <button type="button" className={a.chip} aria-pressed={rar === 'all'} onClick={() => setRar('all')}>{w.catalogue.all}</button>
                    {rarities.map((r) => (
                      <button key={r} type="button" className={a.chip} aria-pressed={rar === r} onClick={() => setRar(r)}>{w.rarity[r]}</button>
                    ))}
                  </div>
                ) : <span />}
                <label className={s.sortLabel}>
                  <span className={a.fieldLabel}>{w.catalogue.sort}</span>
                  <select className={a.select} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                    {(Object.keys(w.catalogue.sorts) as Sort[]).map((k) => (
                      <option key={k} value={k}>{w.catalogue.sorts[k]}</option>
                    ))}
                  </select>
                </label>
              </div>
            ) : null}
          </div>
          {q.trim().length < 2 ? (
            <>
              <ItemTable items={rows.slice(0, SHOWN)} list="traded" win="30d" />
              {rows.length > SHOWN ? <p className={s.searchCount}>{w.catalogue.showing(SHOWN, rows.length)}</p> : null}
            </>
          ) : null}
        </>
      ) : null}
    </MarketPage>
  )
}

export default MarketCatalogue

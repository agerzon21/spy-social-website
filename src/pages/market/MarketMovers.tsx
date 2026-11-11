import { useMemo } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import { movers, MOVER_LISTS, WINDOWS, type MoverList, type Win } from '../../lib/market'
import { ItemTable, MarketPage, MarketState, WindowChips } from './MarketBits'
import { useMarketList, useMarketWords } from './useMarket'
import { LIST_ICON } from './icons'
import a from '../archive/archive.module.css'
import s from './market.module.css'

/** One list of Market Movers: its top 100 over the window the reader picks (?w=7d). */
const MarketMovers = () => {
  const { w } = useMarketWords()
  const { list: name } = useParams()
  const [params, setParams] = useSearchParams()
  const { list, state, retry } = useMarketList()
  const win = (WINDOWS as readonly string[]).includes(params.get('w') ?? '') ? (params.get('w') as Win) : '7d'
  const which = (MOVER_LISTS as string[]).includes(name ?? '') ? (name as MoverList) : null
  const top = useMemo(() => (which && list ? movers(list.items, which, win, 100) : []), [list, which, win])
  if (!which) return <Navigate to="/market/movers/rises" replace />
  const L = w.lists[which]
  return (
    <MarketPage head={list}>
      <ol className={a.crumbs}>
        <li><Link to="/market">{w.nav.market}</Link></li>
        <li>{w.nav.movers}</li>
      </ol>
      <header className={s.pageHead}>
        <Eyebrow>{w.nav.movers}</Eyebrow>
        <DisplayHeading as="h1" size={2}>{L.title}</DisplayHeading>
        <p className={a.sectionLede}>{w.movers.lede}</p>
      </header>
      <nav className={s.tabs} aria-label={w.nav.movers}>
        {MOVER_LISTS.map((l) => {
          const Icon = LIST_ICON[l]
          return (
            <Link key={l} to={`/market/movers/${l}?w=${win}`} className={s.tab} aria-current={l === which ? 'page' : undefined}>
              <Icon aria-hidden focusable={false} />
              <span>{w.lists[l].short}</span>
            </Link>
          )
        })}
      </nav>
      <div className={s.toolbar}>
        <WindowChips win={win} onWin={(x) => setParams({ w: x }, { replace: true })} label={w.movers.window} />
      </div>
      {state === 'soon' || state === 'busy' ? <MarketState kind={state} onRetry={retry} /> : null}
      {state === 'ok' ? top.length ? <ItemTable items={top} list={which} win={win} /> : <p className={a.empty}>{w.movers.none}</p> : null}
    </MarketPage>
  )
}

export default MarketMovers

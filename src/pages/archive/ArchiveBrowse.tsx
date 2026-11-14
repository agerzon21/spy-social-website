import { useEffect, useMemo, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { SearchField } from '../../components/SearchField'
import DisplayHeading from '../../components/ui/DisplayHeading'
import Eyebrow from '../../components/ui/Eyebrow'
import ui from '../../components/ui/ui.module.css'
import { codenameOf, itemType, nameOf, serialText, type ArchiveCopy, type ItemType } from '../../lib/archive'
import { ArchiveState, BetaNotice, UniqueCard } from './ArchiveBits'
import { fmt, setText, useArchive, useUniques } from './useArchive'
import s from './archive.module.css'

/** 20 a page (owner 2026-11-02: every list of items at most about 20 a page, with search and sort). */
const PER_PAGE = 20
type Sort = 'newest' | 'price_low' | 'price_high' | 'serial' | 'float'
const SORTS: Sort[] = ['newest', 'price_low', 'price_high', 'serial', 'float']
const TYPES: ItemType[] = ['celebration', 'wearable', 'border', 'backdrop', 'title']

/** The price a card shows: its asking price, else its last sale (none: last in a price sort). */
const priceOf = (c: ArchiveCopy) => (c.status === 'listed' ? c.price : c.last_sale)

/**
 * Every Unique (archive.spysocial.app/uniques): a grid with search (name, codename, number), sort, and filters
 * (item, type, set, season, for sale now, price), 20 a page. The filters live in the address, so a link keeps them.
 */
const ArchiveBrowse = () => {
  const { w, data, lang, locale } = useArchive()
  const b = w.browse
  const { list, state, retry } = useUniques()
  const [params, setParams] = useSearchParams()
  const top = useRef<HTMLDivElement>(null)

  const q = params.get('q') ?? ''
  const sort = (SORTS as string[]).includes(params.get('sort') ?? '') ? (params.get('sort') as Sort) : 'newest'
  const item = params.get('item') ?? ''
  const type = params.get('type') ?? ''
  const set = params.get('set') ?? ''
  const season = params.get('season') ?? ''
  const listed = params.get('listed') === '1'
  const min = params.get('min') ?? ''
  const max = params.get('max') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const put = (k: string, v: string, keepPage = false) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    if (!keepPage) next.delete('page')
    setParams(next, { replace: true })
  }

  const copies = useMemo(() => list?.copies ?? [], [list])
  const sets = useMemo(() => list?.sets ?? [], [list])
  const seasons = useMemo(() => {
    const m = new Map<string, string>()
    for (const x of sets) m.set(x.season, setText(x, lang).season)
    return [...m]
  }, [sets, lang])
  const itemsHere = useMemo(() => [...new Set(copies.map((c) => c.item_code))].sort((a, b2) => nameOf(data, a).localeCompare(nameOf(data, b2), locale)), [copies, data, locale])

  const shown = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase(locale).replace(/^#0*/, '')
    const lo = Number(min) || 0
    const hi = Number(max) || Infinity
    const out = copies.filter((c) => {
      if (item && c.item_code !== item) return false
      if (type && itemType(c.item_code, c.item_kind) !== type) return false
      if (set && c.set !== set) return false
      if (season && sets.find((x) => x.code === c.set)?.season !== season) return false
      if (listed && c.status !== 'listed') return false
      if (min || max) {
        const p = priceOf(c)
        if (p == null || p < lo || p > hi) return false
      }
      if (needle) {
        const hay = [nameOf(data, c.item_code), codenameOf(data, c.item_code, c.serial) ?? '', String(c.serial), serialText(c.serial), c.item_code]
          .join(' ')
          .toLocaleLowerCase(locale)
        if (!hay.includes(needle)) return false
      }
      return true
    })
    const byPrice = (dir: 1 | -1) => (a: ArchiveCopy, z: ArchiveCopy) => {
      const pa = priceOf(a)
      const pz = priceOf(z)
      if (pa == null && pz == null) return 0
      if (pa == null) return 1
      if (pz == null) return -1
      return (pa - pz) * dir
    }
    if (sort === 'price_low') out.sort(byPrice(1))
    else if (sort === 'price_high') out.sort(byPrice(-1))
    else if (sort === 'serial') out.sort((a, z) => a.serial - z.serial || a.item_code.localeCompare(z.item_code))
    else if (sort === 'float') out.sort((a, z) => a.float.localeCompare(z.float))
    return out
  }, [copies, data, q, item, type, set, season, listed, min, max, sort, sets, locale])

  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE))
  const at = Math.min(page, pages)
  const slice = shown.slice((at - 1) * PER_PAGE, at * PER_PAGE)
  const filtered = !!(q || item || type || set || season || listed || min || max)

  useEffect(() => {
    if (params.get('page')) top.current?.scrollIntoView({ block: 'start' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at])

  return (
    <div className={`${s.page} ${s.foil}`}>
      <div className={ui.wrap} ref={top}>
        {/* Its own title, not the Archive home's (WCAG 2.4.2, a11y-1111). */}
        <Helmet>
          <title>{`${b.title} · ${w.item.crumbs} · SpySocial`}</title>
        </Helmet>
        <BetaNotice chain={list?.chain} />
        <header style={{ marginTop: 30 }}>
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <DisplayHeading as="h1" size={2}>
            {b.title}
          </DisplayHeading>
        </header>

        {state === 'soon' || state === 'busy' ? <ArchiveState kind={state} onRetry={retry} /> : null}

        <div className={s.controls}>
          <div className={s.controlRow}>
            <SearchField value={q} onChange={(v) => put('q', v)} label={b.search} hint={b.search} clear={b.clearSearch} />
            <label className={s.field}>
              <select className={s.select} aria-label={b.sort} value={sort} onChange={(e) => put('sort', e.target.value === 'newest' ? '' : e.target.value)}>
                {SORTS.map((k) => (
                  <option key={k} value={k}>
                    {b.sorts[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={s.filterBar} role="group" aria-label={b.type}>
            <button type="button" className={s.chip} aria-pressed={listed} onClick={() => put('listed', listed ? '' : '1')}>
              {b.listedOnly}
            </button>
            {TYPES.filter((t) => copies.some((c) => itemType(c.item_code, c.item_kind) === t)).map((t) => (
              <button key={t} type="button" className={s.chip} aria-pressed={type === t} onClick={() => put('type', type === t ? '' : t)}>
                {b.types[t]}
              </button>
            ))}
          </div>

          <div className={s.filters}>
            <label className={s.field}>
              <span className={s.fieldLabel}>{b.item}</span>
              <select className={s.select} value={item} onChange={(e) => put('item', e.target.value)}>
                <option value="">{b.any}</option>
                {itemsHere.map((code) => (
                  <option key={code} value={code}>
                    {nameOf(data, code)}
                  </option>
                ))}
              </select>
            </label>
            <label className={s.field}>
              <span className={s.fieldLabel}>{b.set}</span>
              <select className={s.select} value={set} onChange={(e) => put('set', e.target.value)}>
                <option value="">{b.any}</option>
                {sets.map((x) => (
                  <option key={x.code} value={x.code}>
                    {setText(x, lang).set}
                  </option>
                ))}
              </select>
            </label>
            <label className={s.field}>
              <span className={s.fieldLabel}>{b.season}</span>
              <select className={s.select} value={season} onChange={(e) => put('season', e.target.value)}>
                <option value="">{b.any}</option>
                {seasons.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <div className={s.field}>
              <span className={s.fieldLabel}>{b.price}</span>
              <div className={s.priceRow}>
                <input className={s.input} inputMode="numeric" placeholder={b.min} aria-label={`${b.price}: ${b.min}`} value={min} onChange={(e) => put('min', e.target.value.replace(/\D/g, '').slice(0, 9))} />
                <input className={s.input} inputMode="numeric" placeholder={b.max} aria-label={`${b.price}: ${b.max}`} value={max} onChange={(e) => put('max', e.target.value.replace(/\D/g, '').slice(0, 9))} />
              </div>
            </div>
          </div>
        </div>

        <div className={s.countRow} aria-live="polite">
          <span>{state === 'ok' ? b.count(fmt(shown.length, locale), fmt(copies.length, locale)) : ''}</span>
          {filtered ? (
            <button type="button" className={s.linkBtn} onClick={() => setParams(new URLSearchParams(), { replace: true })}>
              {b.clear}
            </button>
          ) : null}
        </div>

        {state === 'ok' && !shown.length ? <p className={s.empty}>{copies.length ? b.none : b.noneYet}</p> : null}
        {state === 'loading' ? (
          <ul className={s.grid} aria-hidden>
            {Array.from({ length: 8 }, (_, i) => (
              <li key={i} className={s.skeleton} style={{ aspectRatio: '0.72' }} />
            ))}
          </ul>
        ) : (
          <ul className={s.grid}>
            {slice.map((c) => (
              <UniqueCard key={`${c.item_code}-${c.serial}`} c={c} sets={sets} />
            ))}
          </ul>
        )}

        {pages > 1 ? (
          <nav className={s.pager} aria-label={b.page(String(at), String(pages))}>
            <button type="button" disabled={at <= 1} onClick={() => put('page', String(at - 1), true)}>
              {b.prev}
            </button>
            <span>{b.page(fmt(at, locale), fmt(pages, locale))}</span>
            <button type="button" disabled={at >= pages} onClick={() => put('page', String(at + 1), true)}>
              {b.next}
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  )
}

export default ArchiveBrowse

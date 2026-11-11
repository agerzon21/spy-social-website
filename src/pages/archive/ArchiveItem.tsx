import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Link from '../../components/SiteLink'
import { Helmet } from 'react-helmet-async'
import ActionLink from '../../components/ui/ActionLink'
import DisplayHeading from '../../components/ui/DisplayHeading'
import ui from '../../components/ui/ui.module.css'
import {
  ArchiveBusy,
  artOf,
  lookOf,
  attributesOf,
  codenameOf,
  fetchUnique,
  holderOf,
  nameOf,
  serialText,
  swatchOf,
  uniquePath,
  type ArchiveUnique,
  type HistoryEvent,
} from '../../lib/archive'
import { ArchiveState, BetaNotice, FloatDigits, Piece } from './ArchiveBits'
import { dayText, fmt, setText, useArchive } from './useArchive'
import s from './archive.module.css'
import hs from './holder.module.css'
import { LIVE } from '../../lib/legalRelease'

const ITEM = /^[a-z0-9][a-z0-9_.]{0,127}$/
const SERIAL = /^[1-9]\d{0,8}$/

const EVENT_CLASS: Record<string, string | undefined> = { minted: s.evMinted, sold: s.evSold, sale_undone: s.evUndone, burned: s.evBurned }

/**
 * One Unique's own page (archive.spysocial.app/u/<item>/<serial>, which the app's "View in the Archive" button
 * opens): its picture, number, codename, set and season, its
 * certificate (the float and what each digit picks), how it was minted, whether it's for sale, and its ledger history
 * with sale prices in Intel. Past holders are numbered, nothing more; the holder today is named by @username, linked to
 * their profile, only when the server names them (LIVE.archiveHolders, lib/archive holderOf), else "Held privately".
 */
const ArchiveItem = () => {
  const { item = '', serial: serialParam = '' } = useParams()
  const { w, data, art, looks, lang, locale } = useArchive()
  const t = w.item
  const valid = ITEM.test(item) && SERIAL.test(serialParam)
  const serial = Number(serialParam)
  const [u, setU] = useState<ArchiveUnique | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'missing' | 'busy' | 'soon'>(valid ? 'loading' : 'missing')

  const load = useCallback(() => {
    if (!valid) return
    setState('loading')
    fetchUnique(item, serial)
      .then((r) => {
        setU(r)
        setState(r ? 'ok' : 'missing')
      })
      .catch((e) => setState(e instanceof ArchiveBusy && /archive 400/.test(e.message) ? 'soon' : 'busy'))
  }, [item, serial, valid])
  useEffect(load, [load])

  const name = nameOf(data, item)
  const code = codenameOf(data, item, serial)
  const title = `${name} ${serialText(serial)}`

  if (state === 'missing') {
    return (
      <div className={`${s.page} ${s.foil}`}>
        <div className={ui.wrap}>
          <div className={s.state}>
            <DisplayHeading as="h1" size={3}>
              {t.notFound}
            </DisplayHeading>
            <p>{t.notFoundText}</p>
            <ActionLink to="/archive/uniques">{t.back}</ActionLink>
          </div>
        </div>
      </div>
    )
  }

  const pic = artOf(art, item, serial)
  const look = pic ? lookOf(looks, item, serial) : null
  const attrs = u ? attributesOf(data, item, u.float) : []
  const glow = u ? swatchOf(data, item, u.float) : null
  const st = setText(u?.set, lang)
  const sales = (u?.history ?? []).filter((e) => e.event === 'sold' && e.price != null && e.sale_state !== 'undone')
  const high = sales.reduce<number | null>((m, e) => (m == null || (e.price ?? 0) > m ? e.price : m), null)
  const last = sales.length ? sales[sales.length - 1] : null
  const how = !u
    ? ''
    : u.source === 'intercept' && u.tier
      ? t.fromIntercept(data?.words.tiers[u.tier - 1] ?? `tier ${u.tier}`)
      : u.source === 'trade_up' && u.inputs
        ? t.fromTradeUp(fmt(u.inputs, locale))
        : t.fromOther
  // The rule's line, in the reader's language whenever the server has it (all ten once archive_words_1111 is applied;
  // English and Russian before it), never another language's: the line above it already says how this copy was minted.
  const rule = u?.how ? u.how[lang] ?? '' : ''
  // The holder today (archive-holder-1110): only with the switch on and a server that sends the holder keys.
  const holder = u && LIVE.archiveHolders ? holderOf(u) : ({ kind: 'unknown' } as const)
  const namesHolders = !!u && LIVE.archiveHolders && u.holder_handle !== undefined

  return (
    <div className={`${s.page} ${s.foil}`}>
      <Helmet>
        <title>{`${title} · Archive · SpySocial`}</title>
      </Helmet>
      <div className={ui.wrap}>
        <ol className={s.crumbs}>
          <li><Link to="/archive">{t.crumbs}</Link></li>
          <li><Link to={`/archive/uniques?item=${encodeURIComponent(item)}`}>{name}</Link></li>
          <li aria-current="page">{serialText(serial)}</li>
        </ol>
        <BetaNotice chain={u?.chain} />

        {state === 'busy' || state === 'soon' ? <ArchiveState kind={state} onRetry={load} /> : null}

        <div className={s.itemGrid}>
          <div className={s.stage} style={glow ? ({ '--glow': `${glow}66` } as React.CSSProperties) : undefined}>
            <div className={s.stagePiece}>
              <Piece src={pic?.src ?? null} alt={`${title}${code ? ` · ${code}` : ''}`} eager look={look} wear />
            </div>
            <div className={s.plinth} aria-hidden />
          </div>

          <div>
            <div className={s.kicker}>
              <span className={s.uniqueTag}>{data?.words.unique ?? 'Unique'}</span>
              {st.set ? <span>{st.set}</span> : null}
              {st.season && st.season !== st.set ? <span>{st.season}</span> : null}
            </div>
            <h1 className={s.itemTitle}>{name}</h1>
            {code ? <p className={s.codename}>“{code}”</p> : null}
            <span className={s.bigSerial}>{serialText(serial)}</span>

            {u ? (
              <div className={s.statusBox}>
                <div className={s.statusTop}>
                  {/* Held, with the holder known (archive-holder-1110): "Held by @name" or "Held privately" is the status itself. */}
                  {u.status === 'held' && holder.kind === 'named' ? (
                    <span className={hs.top}>
                      <span className={s.statusPill}>
                        <i aria-hidden />
                        {t.heldBy}
                      </span>
                      <a className={`${hs.handle} ${hs.big}`} href={holder.url} rel="nofollow" aria-label={t.profileOf(`@${holder.handle}`)}>
                        @{holder.handle}
                      </a>
                    </span>
                  ) : (
                    <span className={`${s.statusPill} ${u.status === 'listed' ? s.listed : u.status === 'burned' ? s.burned : ''}`}>
                      <i aria-hidden />
                      {u.status === 'held' && holder.kind === 'private' ? t.heldPrivately : t.status[u.status]}
                    </span>
                  )}
                  {u.status === 'listed' && u.listing ? (
                    <span className={s.price}>
                      {fmt(u.listing.price, locale)}
                      <small>{w.card.intel}</small>
                    </span>
                  ) : null}
                </div>
                {u.status === 'listed' ? <p>{t.buyHow}</p> : null}
                {/* For sale: who is selling it, under the price. */}
                {u.status === 'listed' && holder.kind === 'named' ? (
                  <div className={hs.line}>
                    <span className={hs.label}>{t.heldBy}</span>
                    <a className={hs.handle} href={holder.url} rel="nofollow" aria-label={t.profileOf(`@${holder.handle}`)}>
                      @{holder.handle}
                    </a>
                  </div>
                ) : u.status === 'listed' && holder.kind === 'private' ? (
                  <div className={`${hs.line} ${hs.private}`}>{t.heldPrivately}</div>
                ) : null}
                {u.status === 'burned' ? (
                  <p>{t.retiredHow(t.burnWhy[(u.history.find((e) => e.event === 'burned')?.burn ?? 'other') as 'trade_up' | 'shred' | 'other'])}</p>
                ) : null}
              </div>
            ) : (
              <div className={`${s.statusBox} ${s.skeleton}`} style={{ height: 70 }} aria-hidden />
            )}

            {u ? (
              <section className={s.cert} aria-labelledby="cert-title">
                <div className={s.certHead}>
                  <span id="cert-title">{t.certificate}</span>
                  <span>{serialText(serial)}</span>
                </div>
                <div className={s.certFloat}>
                  <div className={s.floatLabel}>{t.float}</div>
                  <FloatDigits float={u.float} />
                </div>
                <dl className={s.attrs}>
                  {attrs.map((a) => (
                    <div key={a.id} className={s.attr}>
                      <dt>{a.label}</dt>
                      <dd>
                        {a.hex ? <span className={s.sw} style={{ background: a.hex }} aria-hidden /> : null}
                        <span>{a.value}</span>
                        <span className={s.attrDigit} aria-hidden>
                          {a.place}
                        </span>
                      </dd>
                    </div>
                  ))}
                  {code ? (
                    <div className={s.attr}>
                      <dt>{t.codename}</dt>
                      <dd>{code}</dd>
                    </div>
                  ) : null}
                  {u.pattern != null ? (
                    <div className={s.attr}>
                      <dt>{t.pattern}</dt>
                      <dd>{u.pattern}</dd>
                    </div>
                  ) : null}
                  <div className={s.attr}>
                    <dt>{t.minted}</dt>
                    <dd>{dayText(u.minted_at, locale)}</dd>
                  </div>
                  <div className={s.attr}>
                    <dt>{t.season}</dt>
                    <dd>{(u.set && (u.set.season_names[lang] ?? u.set.season_names.en)) || t.preSeason}</dd>
                  </div>
                  <div className={`${s.attr} ${s.wide}`}>
                    <dt>{t.how}</dt>
                    <dd style={{ textTransform: 'none', fontFamily: 'var(--ss-font-body)', fontSize: 17, fontWeight: 700 }}>{how}</dd>
                    {rule ? <p className={s.historyNote} style={{ marginTop: 6 }}>{rule}</p> : null}
                    {u.history[0]?.retro ? <p className={s.historyNote} style={{ marginTop: 4 }}>{t.recordedLater}</p> : null}
                  </div>
                </dl>
                <div className={s.supply}>
                  {t.supply(name, fmt(u.item.minted, locale), u.item.minted)}
                  {u.item.serials.length > 1 ? (
                    <div className={s.serials} aria-label={t.others}>
                      {u.item.serials.map((n) =>
                        n === serial ? (
                          <span key={n} aria-current="true">{serialText(n)}</span>
                        ) : (
                          <Link key={n} to={uniquePath(item, n)}>
                            {serialText(n)}
                          </Link>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        {u ? (
          <section className={s.historyWrap} aria-labelledby="history-title">
            <DisplayHeading id="history-title" size={3}>
              {t.history}
            </DisplayHeading>
            <p className={s.historyNote}>{namesHolders ? t.historyNoteNamed : t.historyNote}</p>
            <div className={s.summary}>
              <div><b>{fmt(u.holders, locale)}</b><span>{t.holders}</span></div>
              <div><b>{fmt(sales.length, locale)}</b><span>{t.sales}</span></div>
              <div><b>{high != null ? fmt(high, locale) : '—'}</b><span>{t.highest}</span></div>
              <div><b>{last?.price != null ? fmt(last.price, locale) : '—'}</b><span>{t.lastSale}</span></div>
            </div>
            <ol className={s.timeline}>
              {[...u.history].reverse().map((e) => (
                <HistoryLine key={e.seq} e={e} />
              ))}
            </ol>

            <div className={s.verify}>
              <h3>{t.verify}</h3>
              <p>{t.verifyText.replace('{seq}', fmt(u.ledger_seq, locale))}</p>
              <code className={s.hash}>{u.evidence_sha256}</code>
              <p style={{ marginTop: 12 }}>
                <Link to="/ledger" className={s.seeAll}>
                  {t.openLedger}
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        <p style={{ marginTop: 40 }}>
          <Link to="/archive/uniques" className={s.seeAll}>
            ← {t.back}
          </Link>
        </p>
      </div>
    </div>
  )
}

function HistoryLine({ e }: { e: HistoryEvent }) {
  const { w, locale } = useArchive()
  const t = w.item
  const label = (t.events as Record<string, string>)[e.event] ?? e.event
  const who =
    e.from != null && e.to != null
      ? `${t.holder(fmt(e.from, locale))} → ${t.holder(fmt(e.to, locale))}`
      : e.to != null && e.event === 'minted'
        ? t.holder(fmt(e.to, locale))
        : null
  return (
    <li className={`${s.event} ${EVENT_CLASS[e.event] ?? ''}`}>
      <div className={s.evTop}>
        <span className={s.evName}>{label}</span>
        {e.event === 'sold' && e.price != null ? (
          <span className={s.evPrice}>
            {e.sale_state === 'undone' ? <s>{fmt(e.price, locale)}</s> : fmt(e.price, locale)} <small style={{ fontSize: 13, color: 'var(--ss-muted)' }}>{w.card.intel}</small>
          </span>
        ) : null}
      </div>
      <div className={s.evMeta}>
        {dayText(e.at, locale)}
        {e.sale_state === 'undone' ? ` · ${t.undone}` : ''}
      </div>
      {who ? <span className={s.evWho}>{who}</span> : null}
    </li>
  )
}

export default ArchiveItem

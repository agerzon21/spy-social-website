import { Heading } from '@chakra-ui/react'
import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { addTableLoader, useLang, type LangCode } from '../i18n'
import { rich, type Parts } from '../i18n/rich'
import { LIVE, ONLINE_SAFETY_TEXT } from '../lib/legalRelease'
import { DISCORD_URL } from '../lib/social'
import SocialLinks from '../components/SocialLinks'
import { SearchField } from '../components/SearchField'
import en from '../help/locales/en'
import type { HelpItem, HelpOpts, HelpSection, HelpText } from '../help/types'
import s from './FAQ.module.css'

/**
 * Help & FAQ (/support): every question in its topic, a search over them all, an #anchor per topic and question
 * (open on arrival), and the same questions as schema.org FAQPage data for search engines. The words are
 * src/help/locales (one chunk per language, loaded here only); lines true only from a release follow LIVE.
 */

const EMAIL = 'support@spysocial.app'

const OPTS: HelpOpts = {
  launch: LIVE.launchSite,
  purchases: LIVE.purchases,
  passwordless: LIVE.passwordless,
  onePool: LIVE.onePool,
  autoTranslation: LIVE.autoTranslation,
  storeAgeSignals: LIVE.storeAgeSignals,
  testerMarket: LIVE.testerMarket === 'open',
  interceptsInTrades: LIVE.interceptsInTrades,
  rarefindsOffers: LIVE.rarefindsOffers,
  rarefindsOfferPush: LIVE.rarefindsOfferPush,
  appU61: LIVE.appU61,
  partyLeaderLapse: LIVE.partyLeaderLapse,
  memberLoyalty: LIVE.memberLoyalty,
  testerInterceptsTradable: LIVE.testerIntercepts === 'tradable',
  testerGiftGame: LIVE.testerGiftGame,
  roleReveal: LIVE.helpRoleReveal,
}

// Every language but English, each its own chunk; English is in this page's chunk (the fallback, and no wait).
const loaders = import.meta.glob<{ default: HelpText }>(['../help/locales/*.ts', '!../help/locales/en.ts'])
const cache = new Map<LangCode, HelpText>([['en', en]])

/** The help text in `lang`, fetched once; English if its chunk can't load. */
const loadHelp = (lang: LangCode): Promise<void> => {
  if (cache.has(lang)) return Promise.resolve()
  const load = loaders[`../help/locales/${lang}.ts`]
  return (load ? load().then((m) => m.default) : Promise.resolve(en))
    .catch(() => en)
    .then((text) => {
      cache.set(lang, text)
    })
}
// The page's language loads with the site's words (i18n loadStrings waits for it), so the page is drawn in it from
// the start: in the build's HTML (www-speed-1112) and when main.tsx hydrates it, which must match.
addTableLoader(loadHelp)

function useHelp(lang: LangCode): HelpText | null {
  const [, setTick] = useState(0)
  const ready = cache.get(lang) ?? null
  useEffect(() => {
    if (cache.has(lang)) return
    let live = true
    loadHelp(lang).then(() => {
      if (live) setTick((n) => n + 1)
    })
    return () => {
      live = false
    }
  }, [lang])
  return ready
}

/** Drops a line that links to a page this build doesn't have (the Safety page before its text is published). */
const keep = (line: string) => ONLINE_SAFETY_TEXT || !line.includes('<safety>')

const PARTS: Parts = {
  b: (c) => <b>{c}</b>,
  terms: (c) => <Link to="/terms">{c}</Link>,
  privacy: (c) => <Link to="/privacy">{c}</Link>,
  rules: (c) => <Link to="/rules">{c}</Link>,
  gnr: (c) => (LIVE.gameNightRules ? <Link to="/game-night-rules">{c}</Link> : c),
  delete: (c) => <Link to="/delete-account">{c}</Link>,
  safety: (c) => <Link to="/safety">{c}</Link>,
  discord: (c) => (
    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
      {c}
    </a>
  ),
  email: () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>,
}

/** A line as plain text: for the search and the structured data. */
const plain = (line: string) =>
  line
    .replace(/<email\s*\/>/g, EMAIL)
    .replace(/<\/?[a-z]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Lower case, Latin accents off, so "resume" finds "résumé" and "ПЕРЕХВАТ" finds "перехват". */
const fold = (text: string) => text.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ё/g, 'е')

const lines = (item: HelpItem) => item.a.filter(keep)

function matches(item: HelpItem, section: HelpSection, words: string[]): boolean {
  const hay = fold([item.q, section.title, ...lines(item)].map(plain).join(' '))
  return words.every((w) => hay.includes(w))
}

const Chevron = () => (
  <svg className={s.chev} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const Answer = ({ item }: { item: HelpItem }): ReactNode => {
  const a = lines(item)
  if (a.length === 1) return <p>{rich(a[0], PARTS)}</p>
  return (
    <ul>
      {a.map((line, i) => (
        <li key={i}>{rich(line, PARTS)}</li>
      ))}
    </ul>
  )
}

const FAQ = () => {
  const { lang } = useLang()
  const help = useHelp(lang)
  const sections = useMemo(() => (help ? help.sections(OPTS) : []), [help])
  // /support?q=refund opens the page on that search (a link support can send).
  // (The build's HTML has no search: vercel.json serves a search link the plain app.)
  const [query, setQuery] = useState(() => (typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q')?.slice(0, 80) ?? ''))

  const words = useMemo(() => fold(query).split(/\s+/).filter(Boolean), [query])
  const shown = useMemo(
    () =>
      words.length
        ? sections.map((sec) => ({ ...sec, items: sec.items.filter((it) => matches(it, sec, words)) })).filter((sec) => sec.items.length)
        : sections,
    [sections, words],
  )
  const count = shown.reduce((n, sec) => n + sec.items.length, 0)

  // Arriving at /support#question opens that question and scrolls to it (and #topic scrolls to the topic).
  useEffect(() => {
    if (!sections.length || !window.location.hash) return
    const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
    if (!el) return
    if (el instanceof HTMLDetailsElement) el.open = true
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
  }, [sections])

  const structured = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: sections.flatMap((sec) =>
          sec.items.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: lines(it).map(plain).join(' ') },
          })),
        ),
      }),
    [sections, lang],
  )

  const t = help ?? en
  return (
    <div className={s.page}>
      {help && (
        <Helmet>
          <script type="application/ld+json">{structured}</script>
        </Helmet>
      )}
      <div className={s.wrap}>
        <Heading as="h1" size="lg" className={s.title}>
          {t.title}
        </Heading>
        <p className={s.lede}>{t.lede}</p>

        <SearchField className={s.search} value={query} onChange={setQuery} label={t.search} hint={t.searchHint} clear={t.clear} />
        <p className={s.status} role="status" aria-live="polite">
          {help && words.length ? (count ? t.results(count) : t.noResults(query.trim())) : ''}
        </p>

        {help && !words.length && (
          <nav aria-labelledby="help-topics">
            <h2 id="help-topics" className={s.topicsLabel}>
              {t.topics}
            </h2>
            <ul className={s.topics}>
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`}>{sec.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* A search remounts the lists so every match opens; clearing it closes them again. */}
        <Fragment key={words.length ? 'search' : 'all'}>
          {shown.map((sec) => (
            <section key={sec.id} id={words.length ? undefined : sec.id} className={s.section} aria-labelledby={`h-${sec.id}`}>
              <h2 id={`h-${sec.id}`} className={s.sectionTitle}>
                {sec.title}
              </h2>
              <div className={s.list}>
                {sec.items.map((it) => (
                  <details key={it.id} id={words.length ? undefined : it.id} className={s.item} open={words.length ? true : undefined}>
                    <summary className={s.q}>
                      <span className={s.qText}>{it.q}</span>
                      <Chevron />
                    </summary>
                    <div className={s.a}>
                      <Answer item={it} />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </Fragment>

        <p className={s.footer}>
          {t.stillStuck} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <div className={s.social}>
          <SocialLinks variant="list" />
        </div>
      </div>
    </div>
  )
}

export default FAQ

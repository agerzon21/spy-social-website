import { Box, Button, Code, Flex, ListItem, Select, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, OutLink, P, PageLink } from '../components/legal/LegalText'
import { InfoTable, type InfoRow } from '../components/legal/InfoTable'
import { SearchField } from '../components/SearchField'
import { useLang, useT, type LangCode } from '../i18n'
import { checkHeads, parseHeadsCsv, verifyRows, ZERO_HASH, type Head, type LedgerRow } from '../lib/ledgerVerify'

// spysocial.app/ledger: the minted-collectibles ledger's supply per collectible and a verifier that recomputes the
// whole chain in this browser (src/lib/ledgerVerify.ts) and checks it against the day heads this site's public
// repository commits every day (public/ledger/heads.csv, .github/workflows/ledger-heads.yml). The data comes from the
// app's ledger function (app repo supabase/functions/ledger), read without an account. The route exists only while
// LIVE.mintedCollectibles is on (src/lib/legalRelease.ts): from genesis, the launch hour.

const LEDGER_URL = `${String(import.meta.env.VITE_SUPABASE_URL ?? '').replace(/\/$/, '')}/functions/v1/ledger`
const REPO_HEADS = 'https://github.com/agerzon21/spy-social-website/commits/main/public/ledger/heads.csv'
const PAGE = 2000

type DayHead = { day: string; seq: number; hash: string; rules_fp: string; witnessed?: { wayback?: { url?: string } } }
type HeadAnswer = { tip: { seq: number; hash: string; at: string } | null; heads: DayHead[]; chain?: string; notice?: string }
type Supply = {
  code: string; set: string; season: string; track: string; set_names: Record<string, string>; item_kind: string; item_code: string
  variant: string; how: Record<string, string>; opens_at: string; closes_at: string; minted: number; burned: number; held: number
  closed_at: string | null; close_seq: number | null; name: string | null
}

/** Thrown when the ledger can't be read; the page shows a plain line, never the status code. */
class LedgerBusy extends Error {}

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

/** One read of the ledger. A busy answer (429, 5xx) or a dropped connection is tried again up to twice, after the
 *  Retry-After the ledger names (at most 8 s) or 1.5 s, then 3 s. */
async function get<T>(query: string): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    let r: Response | null = null
    try { r = await fetch(`${LEDGER_URL}?${query}`) } catch { r = null }
    if (r?.ok) return (await r.json()) as T
    const retry = !r || r.status === 429 || r.status >= 500
    if (!retry || attempt >= 2) throw new LedgerBusy(r ? `ledger ${r.status}` : 'ledger unreachable')
    const after = Number(r?.headers.get('retry-after'))
    await wait(Number.isFinite(after) && after > 0 ? Math.min(after, 8) * 1000 : 1500 * (attempt + 1))
  }
}

/**
 * Item names in the reader's language, the app's own (public/ledger/names/<code>.json, exported from the app's
 * localisation by scripts/ledger-names/run.sh: re-run it when an update adds Intercept items or titles). The ledger
 * sends names only for what the app doesn't name (Game Night titles, code titles): "Beta Game Night: Master Spy".
 */
type Names = { unique: string; items: Record<string, [name: string, kind: string]> }

const namesCache = new Map<string, Promise<Names | null>>()
function loadNames(code: LangCode): Promise<Names | null> {
  let p = namesCache.get(code)
  if (!p) {
    p = fetch(`/ledger/names/${code}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Names>) : null))
      .catch(() => null)
    namesCache.set(code, p)
  }
  return p
}

/** An item the names file doesn't have yet (newer than the export): its code as words, "frame_art_deco" "Art Deco". */
const KINDS = ['facial_hair_color_', 'hair_color_', 'outfit_color_', 'accessory_', 'background_', 'celebration_', 'frame_', 'glasses_', 'hat_', 'outfit_', 'local_']
const words = (code: string) => code.split('_').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
const guessName = (code: string) => words(code.slice(KINDS.find((k) => code.startsWith(k))?.length ?? 0))

const short = (h: string) => `${h.slice(0, 12)}…`
const day = (iso: string, locale = 'en-US') => new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
/** A date that never breaks across lines ("1 янв. 2100 г." kept whole in a narrow column). */
const dayWhole = (iso: string, locale: string) => day(iso, locale).replace(/ /g, '\u00a0')

type Check =
  | { state: 'idle' }
  | { state: 'running'; done: number }
  | { state: 'done'; rows: number; head: string; heads: { day: string; ok: boolean | null }[] }
  | { state: 'bad'; seq: number; reason: string }
  | { state: 'error' }

const Ledger: React.FC = () => {
  const [head, setHead] = useState<HeadAnswer | null>(null)
  const [supply, setSupply] = useState<Supply[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [check, setCheck] = useState<Check>({ state: 'idle' })

  useEffect(() => {
    let on = true
    Promise.all([get<HeadAnswer>('op=head'), get<{ collectibles: Supply[] }>('op=supply')])
      .then(([h, s]) => { if (on) { setHead(h); setSupply(s.collectibles) } })
      .catch(() => { if (on) setError(true) })
    return () => { on = false }
  }, [attempt])

  const verify = useCallback(async () => {
    setCheck({ state: 'running', done: 0 })
    try {
      const hashes = new Map<number, string>()
      let prev = ZERO_HASH
      let after = 0
      for (;;) {
        const page = await get<{ rows: LedgerRow[] }>(`op=rows&after=${after}&limit=${PAGE}`)
        if (page.rows.length === 0) break
        const r = await verifyRows(page.rows, prev, after + 1)
        if (!r.ok) { setCheck({ state: 'bad', seq: r.badSeq, reason: r.reason }); return }
        for (const row of page.rows) hashes.set(row.seq, row.hash)
        prev = r.head
        after = r.lastSeq
        setCheck({ state: 'running', done: after })
        if (page.rows.length < PAGE) break
      }
      // The heads published where we can't change them (this site's repository), then the ledger's own list.
      let published: Head[] = []
      try {
        // (the beta test chain's heads are kept apart: public/ledger/beta/heads.csv)
        const csv = await fetch(head?.chain === 'beta' ? '/ledger/beta/heads.csv' : '/ledger/heads.csv', { cache: 'no-store' })
        if (csv.ok) published = parseHeadsCsv(await csv.text())
      } catch { /* no published heads yet */ }
      const own: Head[] = (head?.heads ?? []).map((h) => ({ day: h.day, seq: h.seq, hash: h.hash }))
      const byDay = new Map<string, Head>([...own, ...published].map((h) => [h.day, h]))
      setCheck({ state: 'done', rows: after, head: prev, heads: checkHeads([...byDay.values()], (s) => hashes.get(s)) })
    } catch {
      setCheck({ state: 'error' })
    }
  }, [head])

  const latest = head?.heads[0]
  const beta = head?.chain === 'beta'
  return (
    <LegalPage english title="Collectibles Ledger" updated={<>Public record of every minted collectible</>}>
      {beta && (
        <Box borderWidth="2px" borderColor="orange.400" borderRadius="md" p={4} mb={4}>
          <P>
            <B>This is the beta test chain.</B> Everything below (every copy, number, trade and day head) is for testing
            only and is wiped before launch. The real ledger starts at launch with its own first entry, and its numbers
            start at #1. Test heads are kept apart from the real ones.
          </P>
        </Box>
      )}
      <P>
        Game Night titles, the Beta Pin, Field Tester and every item from an Intercept are <B>minted</B>: each copy
        has its own number and a record of how it was earned, and it can be made only by its rule, inside its window.
        Once a collectible closes, no more copies are ever made, by anyone, us included. Every copy, and everything
        that happens to it later, is a line in this ledger. Each line carries the fingerprint (SHA-256) of the line
        before it, so changing or removing any past line changes every fingerprint after it.
      </P>
      <P>
        Every day at 00:00 UTC the ledger records a checkpoint: the supply of every collectible and a fingerprint of the
        rules' code. That checkpoint's fingerprint is the day's <B>head</B>. Minutes later it is committed to this
        website's <OutLink href={REPO_HEADS}>public repository</OutLink> and saved by the Internet Archive's Wayback
        Machine, two places we can't rewrite. Holders appear only as tags (<Code>h:7f3a91c20b5e</Code>), a different
        one on every copy, so the ledger never shows who holds what. See the <PageLink to="/terms">Terms</PageLink> and
        the <PageLink to="/privacy">Privacy Policy</PageLink>.
      </P>

      <H2>Today's head</H2>
      {error && (
        <>
          <P>The ledger is busy right now, so this part couldn't load. Give it a minute, then try again.</P>
          <Button size="sm" variant="outline" mb={4} onClick={() => { setError(false); setAttempt((n) => n + 1) }}>Try again</Button>
        </>
      )}
      {!error && !head && <P>Loading…</P>}
      {head && (
        <Bullets>
          <ListItem>Entries so far: <B>{head.tip ? head.tip.seq.toLocaleString('en-US') : 0}</B>{head.tip ? <>, the newest <Code>{short(head.tip.hash)}</Code></> : null}</ListItem>
          {latest ? (
            <ListItem>
              Head of {day(latest.day)}: <Code>{short(latest.hash)}</Code> at entry {latest.seq.toLocaleString('en-US')}
              {latest.witnessed?.wayback?.url ? <> (<OutLink href={latest.witnessed.wayback.url}>Wayback Machine</OutLink>)</> : null}
            </ListItem>
          ) : (
            <ListItem>No daily head yet: the first is recorded at the first 00:00 UTC after the ledger starts.</ListItem>
          )}
        </Bullets>
      )}

      <H2>Check it yourself</H2>
      <P>
        This recomputes every line's fingerprint in your browser, checks that each line points at the one before it,
        and compares the result with every published day head. Nothing is taken on trust from our servers.
      </P>
      <Box>
        <Button onClick={() => { void verify() }} isDisabled={check.state === 'running' || !head} size="md">
          {check.state === 'running' ? `Checking… ${check.done.toLocaleString('en-US')} entries` : 'Check the whole ledger'}
        </Button>
      </Box>
      {check.state === 'done' && (
        <Text textStyle="body">
          <B>All {check.rows.toLocaleString('en-US')} entries check out</B> (head <Code>{short(check.head)}</Code>).{' '}
          {check.heads.length === 0
            ? 'No day head has been published yet.'
            : check.heads.every((h) => h.ok === true)
              ? `Every published day head (${check.heads.length}) matches.`
              : `Day heads that don't match: ${check.heads.filter((h) => h.ok === false).map((h) => h.day).join(', ') || 'none'}; not yet in the ledger: ${check.heads.filter((h) => h.ok === null).map((h) => h.day).join(', ') || 'none'}.`}
        </Text>
      )}
      {check.state === 'bad' && <Text textStyle="body"><B>Entry {check.seq} doesn't check out</B> ({check.reason === 'hash' ? 'its fingerprint is not the fingerprint of its line' : check.reason === 'prev' ? 'it does not point at the entry before it' : 'an entry is missing before it'}). Please tell us at support@spysocial.app.</Text>}
      {check.state === 'error' && <Text textStyle="body">The check stopped partway because the ledger is busy right now. Give it a minute, then check again.</Text>}

      <H2>Supply</H2>
      {supply && supply.length === 0 && <P>Nothing has been minted yet.</P>}
      {supply && supply.length > 0 && <SupplyTable supply={supply} />}
    </LegalPage>
  )
}

/** Rows per page of the Supply table (house rule: about 20). */
const PER_PAGE = 20
type SortKey = 'name' | 'minted' | 'held' | 'newest'

/**
 * The Supply table, in the reader's language (the rest of the page is English only): item names as the app says them,
 * a search over names, kinds, sets and how each is earned, a sort, and 20 rows a page.
 */
const SupplyTable = ({ supply }: { supply: Supply[] }) => {
  const t = useT().ledger
  const { language } = useLang()
  const { code, locale } = language
  const [names, setNames] = useState<Names | null>(null)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('newest')
  const [page, setPage] = useState(0)
  const top = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let on = true
    void Promise.all([loadNames(code), code === 'en' ? null : loadNames('en')]).then(([own, en]) => {
      if (on) setNames(own ?? en)
    })
    return () => { on = false }
  }, [code])

  const all = useMemo(() => {
    const num = (n: number) => n.toLocaleString(locale)
    return supply.map((c) => {
      const named = names?.items[`${c.item_kind === 'title' ? 'title' : 'avatar'}:${c.item_code}`]
      const name = named?.[0] ?? c.name ?? guessName(c.item_code)
      const unique = c.variant === 'unique' ? (names?.unique ?? 'Unique') : ''
      const set = c.set_names?.[code] ?? c.set_names?.en ?? c.set
      // How it's earned: the ledger says it in English and Russian; another language shows the English, kept apart.
      const own = c.how?.[code]
      const how = own ?? c.how?.en ?? ''
      const kind = named?.[1] ?? ''
      const row: InfoRow = {
        label: <bdi>{unique ? `${name} · ${unique}` : name}</bdi>,
        note: (
          <>
            {[kind, set].filter(Boolean).join(' · ')}
            {how && <>{' · '}{own ? how : <bdi lang="en">{how}</bdi>}</>}
          </>
        ),
        cells: [
          <>
            {t.supply(num(c.minted), num(c.burned), num(c.held)).map((line) => <Text key={line} as="span" display="block">{line}</Text>)}
            <Text as="span" display="block" mt={1} color="ss.muted" fontSize={{ base: '14px', md: '15px' }}>
              {c.closed_at
                ? (c.minted === 0 ? t.neverAwarded : t.closed(dayWhole(c.closed_at, locale), c.close_seq === null ? '…' : num(c.close_seq)))
                : t.openUntil(dayWhole(c.closes_at, locale))}
            </Text>
          </>,
        ],
      }
      return { c, name, row, text: [name, unique, kind, set, how, c.item_code].join(' ').toLocaleLowerCase(locale) }
    })
  }, [supply, names, code, locale, t])

  const shown = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase(locale).split(/\s+/).filter(Boolean)
    const hits = terms.length ? all.filter((r) => terms.every((w) => r.text.includes(w))) : [...all]
    const byName = (a: (typeof all)[number], b: (typeof all)[number]) => a.name.localeCompare(b.name, locale)
    const order: Record<SortKey, (a: (typeof all)[number], b: (typeof all)[number]) => number> = {
      name: byName,
      minted: (a, b) => b.c.minted - a.c.minted || byName(a, b),
      held: (a, b) => b.c.held - a.c.held || byName(a, b),
      newest: (a, b) => b.c.opens_at.localeCompare(a.c.opens_at) || byName(a, b),
    }
    return hits.sort(order[sort])
  }, [all, query, sort, locale])

  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE))
  const at = Math.min(page, pages - 1)
  const rows = shown.slice(at * PER_PAGE, (at + 1) * PER_PAGE).map((r) => r.row)
  const go = (p: number) => {
    setPage(p)
    top.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
  const num = (n: number) => n.toLocaleString(locale)

  return (
    <Box ref={top} lang={code} dir={language.rtl ? 'rtl' : 'ltr'} scrollMarginTop="96px">
      <SearchField value={query} onChange={(q) => { setQuery(q); setPage(0) }} label={t.search} hint={t.searchHint} clear={t.clear} />
      <Flex mt={3} mb={4} gap={3} align="center" justify="space-between" wrap="wrap">
        <Flex as="label" align="center" gap={2} fontSize="15px" color="ss.muted">
          {t.sort}
          <Select
            size="md"
            w="auto"
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortKey); setPage(0) }}
            color="ss.text"
            bg="ss.surface"
            borderColor="ss.lineStrong"
          >
            {(Object.keys(t.sortBy) as SortKey[]).map((k) => <option key={k} value={k}>{t.sortBy[k]}</option>)}
          </Select>
        </Flex>
        <Text fontSize="15px" color="ss.muted" role="status" aria-live="polite">
          {shown.length === 0 ? t.noMatch(query.trim()) : t.count(num(at * PER_PAGE + 1), num(at * PER_PAGE + rows.length), num(shown.length))}
        </Text>
      </Flex>
      {rows.length > 0 && <InfoTable head={t.head} rows={rows} firstWidth="52%" />}
      {pages > 1 && (
        <Flex as="nav" aria-label={t.pages} mt={4} gap={3} align="center" justify="space-between">
          <Button variant="outline" size="md" minW="44px" isDisabled={at === 0} onClick={() => go(at - 1)}>{t.prev}</Button>
          <Text fontSize="15px" color="ss.muted">{t.page(num(at + 1), num(pages))}</Text>
          <Button variant="outline" size="md" minW="44px" isDisabled={at >= pages - 1} onClick={() => go(at + 1)}>{t.next}</Button>
        </Flex>
      )}
    </Box>
  )
}

export default Ledger

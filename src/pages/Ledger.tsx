import { Box, Button, Code, ListItem, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, OutLink, P, PageLink } from '../components/legal/LegalText'
import { InfoTable, type InfoRow } from '../components/legal/InfoTable'
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

async function get<T>(query: string): Promise<T> {
  const r = await fetch(`${LEDGER_URL}?${query}`)
  if (!r.ok) throw new Error(`the ledger answered ${r.status}`)
  return (await r.json()) as T
}

const short = (h: string) => `${h.slice(0, 12)}…`
const day = (iso: string) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

type Check =
  | { state: 'idle' }
  | { state: 'running'; done: number }
  | { state: 'done'; rows: number; head: string; heads: { day: string; ok: boolean | null }[] }
  | { state: 'bad'; seq: number; reason: string }
  | { state: 'error'; message: string }

const Ledger: React.FC = () => {
  const [head, setHead] = useState<HeadAnswer | null>(null)
  const [supply, setSupply] = useState<Supply[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [check, setCheck] = useState<Check>({ state: 'idle' })

  useEffect(() => {
    let on = true
    Promise.all([get<HeadAnswer>('op=head'), get<{ collectibles: Supply[] }>('op=supply')])
      .then(([h, s]) => { if (on) { setHead(h); setSupply(s.collectibles) } })
      .catch((e: unknown) => { if (on) setError(e instanceof Error ? e.message : String(e)) })
    return () => { on = false }
  }, [])

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
    } catch (e) {
      setCheck({ state: 'error', message: e instanceof Error ? e.message : String(e) })
    }
  }, [head])

  const rows: InfoRow[] = useMemo(() => (supply ?? []).map((c) => ({
    label: `${c.name ?? c.item_code}${c.variant === 'unique' ? ' · Unique' : ''}`,
    note: `${c.set_names?.en ?? c.set} · ${c.how?.en ?? ''}`,
    cells: [
      `${c.minted} minted · ${c.burned} burned · ${c.held} held`,
      c.closed_at ? (c.minted === 0 ? 'Never awarded' : `Closed ${day(c.closed_at)} (entry ${c.close_seq ?? '…'})`) : `Open until ${day(c.closes_at)}`,
    ],
  })), [supply])

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
      {error && <P>The ledger can't be read right now ({error}). Try again in a minute.</P>}
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
      {check.state === 'error' && <Text textStyle="body">The check stopped: {check.message}. Try again in a minute.</Text>}

      <H2>Supply</H2>
      {supply && supply.length === 0 && <P>Nothing has been minted yet.</P>}
      {supply && supply.length > 0 && <InfoTable head={['Collectible', 'Supply', 'Status']} rows={rows} firstWidth="44%" />}
    </LegalPage>
  )
}

export default Ledger

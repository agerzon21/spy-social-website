import { useEffect, useMemo, useState } from 'react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, H3, InlineCode, LegalButton, Numbered, OutLink, P, PageLink, SupportEmail, TextLink } from '../components/legal/LegalText'
import { InfoTable, type InfoRow } from '../components/legal/InfoTable'
import { LIVE } from '../lib/legalRelease'
import legal from '../components/legal/legal.module.css'
import s from './Ledger.module.css'
import {
  LEDGER_FILES_BASE, LEDGER_REPO, cyberChefSha256, ledgerFile, repoPath, sizeOf, staticJson,
  type LedgerChain, type LedgerSummary, type LedgerSupply,
} from '../lib/ledgerFiles'

// spysocial.app/ledger: the minted-collectibles ledger as files anyone can download and check with tools that aren't
// ours (OpenTimestamps, a SHA-256 calculator, a few lines of Python), the day heads' public copies, and the supply. Every
// file is static (src/lib/ledgerFiles.ts): the daily GitHub Action writes the day files, their OpenTimestamps proofs,
// heads.csv and supply.json (.github/workflows/ledger-heads.yml); the build adds summary.json, the whole-ledger file and
// the newest day's CSV (scripts/ledger-files.mjs). The page makes no call to our servers. The route exists only while
// LIVE.mintedCollectibles is on (src/lib/legalRelease.ts).

const OTS_SITE = 'https://opentimestamps.org'
const CYBERCHEF = "https://gchq.github.io/CyberChef/#recipe=SHA2('256',64,160)"
const STAMPING_BEGAN = '2026-11-11'
const WINDOW = 7
const SUPPLY_PAGE = 20

const day = (iso: string) => new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
const when = (iso: string) => `${day(iso)}, ${new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })} UTC`
const n = (x: number) => x.toLocaleString('en-US')

const PY_CHECK = (file: string) => `import gzip, json, hashlib
prev = "0" * 64
for row in map(json.loads, gzip.open("${file}", "rt")):
    assert row["line"].endswith("|" + prev), row["seq"]
    assert hashlib.sha256(row["line"].encode()).hexdigest() == row["hash"], row["seq"]
    prev = row["hash"]
print("All", row["seq"], "lines check out. Last fingerprint:", prev)`

/** A file to download: a secondary button with the file's size under it. */
const FileButton = ({ href, label, note }: { href: string; label: string; note: string }) => (
  <div>
    <LegalButton href={href} download>
      {label}
    </LegalButton>
    <p className={`${legal.meta} ${legal.mt1}`}>{note}</p>
  </div>
)

// Fingerprints and lines in a plain monospace face (the skin's code face is a condensed display one), each character
// readable for comparing by eye (Ledger.module.css).
const Code = ({ children }: { children: string }) => <InlineCode className={s.mono}>{children}</InlineCode>

const Hash = ({ children, block = false }: { children: string; block?: boolean }) => (
  <InlineCode className={block ? `${s.hash} ${s.hashBlock}` : s.hash}>{children}</InlineCode>
)

const Block = ({ children }: { children: string }) => (
  <pre className={s.block}>
    <code>{children}</code>
  </pre>
)

const Ledger: React.FC = () => {
  const [chain, setChain] = useState<LedgerChain | null>(null)
  const [summary, setSummary] = useState<LedgerSummary | null>(null)
  const [supply, setSupply] = useState<LedgerSupply | null>(null)
  const [missing, setMissing] = useState(false)
  const [names, setNames] = useState<Record<string, [string, string]>>({})
  const [allDays, setAllDays] = useState(false)
  const [allSupply, setAllSupply] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let on = true
    void (async () => {
      const current = await staticJson<{ chain: LedgerChain }>(`${LEDGER_FILES_BASE}current.json`)
      if (!on) return
      if (!current) { setMissing(true); return }
      setChain(current.chain)
      const [s, sup, nm] = await Promise.all([
        staticJson<LedgerSummary>(ledgerFile(current.chain, 'summary.json')),
        staticJson<LedgerSupply>(ledgerFile(current.chain, 'supply.json')),
        // The items' English names (the page is English-only), from scripts/ledger-names (public/ledger/names).
        staticJson<{ items: Record<string, [string, string]> }>(`${LEDGER_FILES_BASE}names/en.json`),
      ])
      if (!on) return
      if (!s) setMissing(true)
      setSummary(s)
      setSupply(sup)
      setNames(nm?.items ?? {})
    })()
    return () => { on = false }
  }, [])

  const rows: InfoRow[] = useMemo(() => (supply?.collectibles ?? []).map((c) => ({
    label: `${c.name ?? names[`${c.item_kind}:${c.item_code}`]?.[0] ?? c.item_code}${c.variant === 'unique' ? ' · Unique' : ''}`,
    note: `${c.set_names?.en ?? c.set} · ${c.how?.en ?? ''}`,
    cells: [
      // ledger-reasons-1111: copies removed for integrity, once the server sends them (LIVE.ledgerReasons).
      LIVE.ledgerReasons && typeof c.removed === 'number'
        ? `${n(c.minted)} minted · ${n(c.burned)} burned (${n(c.removed)} removed) · ${n(c.held)} in circulation`
        : `${n(c.minted)} minted · ${n(c.burned)} burned · ${n(c.held)} held`,
      c.closed_at
        ? (c.minted === 0 ? 'Never awarded' : `Closed ${day(c.closed_at)} (entry ${c.close_seq ?? '…'})`)
        : new Date(c.closes_at).getUTCFullYear() >= 2099 ? 'Open' : `Open until ${day(c.closes_at)}`, // 2100-01-01: no closing date
    ],
  })), [supply, names])

  const beta = chain === 'beta'
  const days = summary ? [...summary.days].reverse() : []
  const newest = days[0]
  const shownDays = allDays ? days : days.slice(0, WINDOW)
  const headsPath = chain ? repoPath(chain, 'heads.csv') : ''
  const rawHeads = `https://raw.githubusercontent.com/${LEDGER_REPO.replace('https://github.com/', '')}/main/${headsPath}`
  const exampleRow = summary?.last
  const dayRows: InfoRow[] = shownDays.map((d) => ({
    label: day(d.day),
    note: `Entries ${n(d.from)} to ${n(d.to)}`,
    cells: [
      <Hash key="h">{d.hash}</Hash>,
      <div key="f" className={s.files}>
        <TextLink href={ledgerFile(summary!.chain, d.file)} download>File ({sizeOf(d.bytes)})</TextLink>
        {d.ots ? <TextLink href={ledgerFile(summary!.chain, d.ots)} download>Proof (.ots)</TextLink> : <span>Proof tomorrow</span>}
      </div>,
    ],
  }))

  const copyLine = async () => {
    if (!exampleRow) return
    try {
      await navigator.clipboard.writeText(exampleRow.line)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch { /* the text is on the page to select by hand */ }
  }

  return (
    <LegalPage english title="Collectibles Ledger" updated={<>{LIVE.ledgerUniquesOnly ? 'Public record of every Unique' : 'Public record of every minted collectible'}</>}>
      {beta && (
        <div className={s.betaBox}>
          <P>
            <B>This is the beta test chain.</B> Everything below (every copy, number, trade and day's fingerprint) is
            for testing only and is wiped before launch. The real ledger starts at launch with its own first entry, and
            its numbers start at #1. Test files are kept apart from the real ones.
            {LIVE.ledgerUniquesOnly && ' Its earlier lines also list other items, from before the ledger carried Uniques only.'}
          </P>
        </div>
      )}
      {/* ledger-uniques-1111 (LIVE.ledgerUniquesOnly): the public ledger carries Uniques only */}
      {LIVE.ledgerUniquesOnly ? (
        <P>
          This ledger holds <B>Uniques</B> only. Each Unique is <B>minted</B>: it has its own number and a record of how
          it was earned (the Intercept or trade-up it came from), and it can be made only by its rule, inside its window.
          Every Unique, and everything that happens to it later (a trade, a sale, a trade-up, a correction), is a line
          in this ledger. Other items (Game Night titles, the Beta Pin, Field Tester and the other items from
          Intercepts) are numbered and recorded by us in the same way, but they aren't on the public ledger. Holders
          appear only as tags (<Code>h:7f3a91c20b5e</Code>), a different one on every copy, so the
          ledger never shows who holds what. See the{' '}
          <PageLink to="/terms">Terms</PageLink> and the <PageLink to="/privacy">Privacy Policy</PageLink>.
        </P>
      ) : (
        <P>
          Game Night titles, the Beta Pin, Field Tester and every item from an Intercept are <B>minted</B>: each copy
          has its own number and a record of how it was earned, and it can be made only by its rule, inside its window.
          Once a collectible closes, no more copies are ever made, by anyone, us included. Every copy, and everything
          that happens to it later, is a line in this ledger. Holders appear only as tags (<Code>h:7f3a91c20b5e</Code>), a
          different one on every copy, so the ledger never shows who holds what. See the{' '}
          <PageLink to="/terms">Terms</PageLink> and the <PageLink to="/privacy">Privacy Policy</PageLink>.
        </P>
      )}
      <P>
        Each line ends with the <B>fingerprint</B> of the line before it (its SHA-256, a 64-character code that changes
        completely if even one letter of the line changes). Every day at 00:00 UTC the ledger writes a checkpoint line;
        its fingerprint is the day's <B>final fingerprint</B>. That day's lines are then published below as a file,
        stamped into the Bitcoin blockchain with OpenTimestamps, and the final fingerprint is added to this
        website's public file history and saved by the Internet Archive.
        {LIVE.ledgerUniquesOnly && (
          <>
            {' '}On the 1st of each month the ledger also writes a <B>snapshot</B> line (a checkpoint whose note starts{' '}
            <Code>snapshot:</Code>). Its <Code>state</Code> is the SHA-256 of a list
            of every Unique as the lines before it leave it, one line per copy in copy order (
            <Code>u1|copy|item|number|held, burned or retired|holder tag</Code>), so you can check the
            ledger from that month on without going back to its first line. Nothing is ever deleted.
          </>
        )}
      </P>

      <H2>The ledger today</H2>
      {missing && <P>The ledger's files aren't published yet. They appear here after the first daily update.</P>}
      {!missing && !summary && <P>Loading…</P>}
      {summary && !summary.ok && (
        <P>
          <B>The published copy doesn't check out:</B> {summary.problem}. Its files are held back until we find out why.
          Please tell us at <SupportEmail subject="Ledger check" />.
        </P>
      )}
      {summary?.ok && newest && (
        <Bullets>
          <li>
            Entries: <B>{n(summary.rows)}</B>, through the final fingerprint of <B>{day(newest.day)}</B>
          </li>
          <li>
            That final fingerprint: <Hash>{newest.hash}</Hash>
          </li>
          <li>The files are updated once a day, soon after 00:00 UTC. Entries made since then come in the next day's file.</li>
        </Bullets>
      )}

      {summary?.ok && newest && (
        <>
          <H2>Download the ledger</H2>
          <div className={s.downloads}>
            {summary.files.all && (
              <FileButton
                href={ledgerFile(summary.chain, summary.files.all.path)}
                label="Whole ledger"
                note={`${n(summary.rows)} lines · JSON lines, gzip · ${sizeOf(summary.files.all.bytes)}`}
              />
            )}
            {summary.files.latestCsv && (
              <FileButton
                href={ledgerFile(summary.chain, summary.files.latestCsv.path)}
                label={`${day(summary.files.latestCsv.day)} as a spreadsheet`}
                note={`${n(newest.rows)} lines · CSV · ${sizeOf(summary.files.latestCsv.bytes)}`}
              />
            )}
          </div>
          <P>
            Each day also has its own file (its lines, gzipped JSON, one line per row) and its OpenTimestamps proof.
            Every row has a <Code>line</Code>, the exact text that is fingerprinted, and a <Code>hash</Code>, its
            fingerprint.
          </P>
          <InfoTable head={['Day', 'Final fingerprint', 'Files']} rows={dayRows} firstWidth={{ base: '30%', md: '24%' }} />
          {days.length > WINDOW && (
            <div className={legal.mt3}>
              <LegalButton onClick={() => setAllDays(!allDays)}>{allDays ? `Show the last ${WINDOW} days` : `Show all ${days.length} days`}</LegalButton>
            </div>
          )}

          <H2>Check it yourself</H2>
          <P>You don't have to trust us or this page. Three checks, with tools that aren't ours:</P>

          <H3>1. A day's file existed on its date</H3>
          <Numbered>
            <li>Download a day's file and its proof (.ots) from the table above.</li>
            <li>
              Open <OutLink href={OTS_SITE}>opentimestamps.org</OutLink> and drop both files on its Stamp &amp; Verify
              box.
            </li>
            <li>
              It shows the Bitcoin block and date that hold the file's fingerprint. A file changed by even one letter
              fails.
            </li>
          </Numbered>
          <P>
            A proof less than a day old may show as pending: Bitcoin takes a few hours to include it, and the next daily
            update adds the block to the proof. Days before {day(STAMPING_BEGAN)} were stamped on {day(STAMPING_BEGAN)},
            when stamping began.
          </P>

          <H3>2. One line, by hand</H3>
          <P>
            Copy a line's text into a SHA-256 calculator, such as{' '}
            <OutLink href={CYBERCHEF}>CyberChef</OutLink> (free and open source, made by GCHQ; it runs in your browser).
            The result must equal that line's fingerprint. The end of every line is the fingerprint of the line before
            it, so changing any old line breaks every line after it. Try the newest line:
          </P>
          {exampleRow && (
            <div className={s.example}>
              <p className={legal.meta}>Line {n(exampleRow.seq)}, the text:</p>
              <Hash block>{exampleRow.line}</Hash>
              <p className={`${legal.meta} ${legal.mt2}`}>Its fingerprint:</p>
              <Hash block>{exampleRow.hash}</Hash>
              <div className={s.exampleButtons}>
                <LegalButton onClick={() => { void copyLine() }}>{copied ? 'Copied' : 'Copy the text'}</LegalButton>
                <LegalButton href={cyberChefSha256(exampleRow.line)} external>
                  Open it in CyberChef
                </LegalButton>
              </div>
            </div>
          )}
          <P>
            In the spreadsheet, the text is the <Code>line</Code> column: copy the cell's text exactly, with no space or
            line break after it.
          </P>

          <H3>3. The whole ledger (for programmers)</H3>
          <P>Download the whole ledger, then run this with Python 3 in the same folder:</P>
          <Block>{PY_CHECK(summary.files.all?.path ?? 'ledger-all.ndjson.gz')}</Block>
          <P>
            It stops at the first line that was changed or doesn't point at the line before it. Otherwise the last
            fingerprint it prints must be the final fingerprint above, the same as in the public copies below.
          </P>

          <H3>Where the final fingerprints are kept</H3>
          <Bullets>
            <li>
              This website's public repository on GitHub: <OutLink href={`${LEDGER_REPO}/blob/main/${headsPath}`}>the list of final fingerprints</OutLink>,{' '}
              <OutLink href={`${LEDGER_REPO}/blame/main/${headsPath}`}>the date each one was added</OutLink>, and{' '}
              <OutLink href={`${LEDGER_REPO}/commits/main/${chain ? repoPath(chain, 'days') : ''}`}>the history of the day files</OutLink>.
            </li>
            <li>
              The Internet Archive's Wayback Machine: <OutLink href={`https://web.archive.org/web/*/${rawHeads}`}>its saved copies of that list</OutLink>.
            </li>
            <li>Bitcoin, through each day file's OpenTimestamps proof.</li>
          </Bullets>

          <H2>Why this proves no Unique was secretly re-made</H2>
          <P>
            Every copy ever made, every Unique included, is a line in these files, and each line carries the fingerprint
            of the line before it. Making a second copy of an old Unique, or changing who got one, would mean adding or
            changing an old line, which changes every fingerprint after it. Those fingerprints are already in Bitcoin,
            in GitHub's history and in the Internet Archive, where nobody, us included, can change them.
          </P>
        </>
      )}

      <H2>Supply</H2>
      {supply && <p className={`${legal.meta} ${legal.mb3}`}>As of {when(supply.as_of)}</p>}
      {supply && supply.collectibles.length === 0 && <P>Nothing has been minted yet.</P>}
      {supply && supply.collectibles.length > 0 && (
        <>
          <InfoTable head={['Collectible', 'Supply', 'Status']} rows={allSupply ? rows : rows.slice(0, SUPPLY_PAGE)} firstWidth="44%" />
          {rows.length > SUPPLY_PAGE && (
            <div className={legal.mt3}>
              <LegalButton onClick={() => setAllSupply(!allSupply)}>{allSupply ? `Show the first ${SUPPLY_PAGE}` : `Show all ${n(rows.length)} collectibles`}</LegalButton>
            </div>
          )}
        </>
      )}
      {!supply && missing && <P>The supply is published with the first daily update.</P>}
    </LegalPage>
  )
}

export default Ledger

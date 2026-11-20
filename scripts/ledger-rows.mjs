// ledger-rows.mjs : the daily copy of the ledger itself (run by .github/workflows/ledger-heads.yml right after
// ledger-heads.mjs). For every witnessed day head in heads.csv not yet stored, writes
// public/ledger[/beta]/days/<day>.ndjson.gz: the rows from the entry after the previous day's head through that day's
// head, one JSON row a line with its fingerprinted `line` (scripts/ledger-lib.mjs). The workflow then stamps each new
// day file with OpenTimestamps (<day>.ndjson.gz.ots). Also writes the supply as public/ledger[/beta]/supply.json. The
// site's build (scripts/ledger-files.mjs) adds the whole-ledger file and the newest day's CSV; all static files from
// the CDN: the page makes no server call. A day file over 20 MB fails the run (MAX_DAY_BYTES): the public ledger
// would then need object storage, not Git.
//
// Reads only the rows after the last stored one (usually one call a day). Before anything is written, every stored
// line is checked again, every new row's fingerprint is recomputed, the first new row must point at the last stored
// one, and the row at each witnessed day head must carry that head's fingerprint; anything else fails the run and
// nothing is committed. A stored day file is never rewritten. The beta test chain ("chain": "beta") goes to
// public/ledger/beta, never into the real chain's public/ledger.
// Usage: LEDGER_URL=<.../functions/v1/ledger> node scripts/ledger-rows.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ZERO_HASH, dayBytes, parseHeadsCsv, readDays, rowIsWhole, verifyRows } from './ledger-lib.mjs'

const URL_BASE = process.env.LEDGER_URL || 'https://ajobkfasquywiawjfdxg.supabase.co/functions/v1/ledger'
const PAGE = 2000
const MAX_DAY_BYTES = 20 * 1024 * 1024

async function get(query) {
  const r = await fetch(`${URL_BASE}?${query}`, { headers: { accept: 'application/json' } })
  if (!r.ok) throw new Error(`ledger ${query} answered ${r.status}`)
  return r.json()
}
const fail = (msg) => {
  console.error(msg)
  process.exit(1)
}

let head
try {
  head = await get('op=head')
} catch (e) {
  console.log(`ledger not readable (${e.message}): nothing to copy yet`)
  process.exit(0)
}
if (head.ok !== true) {
  console.log('ledger not readable: nothing to copy yet')
  process.exit(0)
}
const PUB = head.chain === 'beta' ? 'public/ledger/beta' : 'public/ledger'
const DAYS = join(PUB, 'days')
const HEADS = join(PUB, 'heads.csv')

const witnessed = (existsSync(HEADS) ? parseHeadsCsv(readFileSync(HEADS, 'utf8')) : []).sort((a, b) => a.day.localeCompare(b.day))
if (witnessed.length === 0) {
  console.log('no witnessed day head yet: nothing to copy')
  process.exit(0)
}

// What's stored: every day file, checked row by row, each ending on its day's witnessed head.
const days = readDays(DAYS)
const stored = days.flatMap((d) => d.rows)
const have = verifyRows(stored)
if (!have.ok) fail(`STORED COPY BROKEN at entry ${have.badSeq} (${have.reason}): fix ${DAYS} before anything else`)
const torn = stored.find((r) => !rowIsWhole(r))
if (torn) fail(`STORED ROW ${torn.seq}'s line is not its fields: fix ${DAYS} before anything else`)
for (const d of days) {
  const h = witnessed.find((w) => w.day === d.day)
  const last = d.rows[d.rows.length - 1]
  if (!h || !last || h.seq !== last.seq || h.hash !== last.hash) fail(`STORED DAY ${d.day} doesn't end on its witnessed head`)
}
const lastSeq = stored.length ? stored[stored.length - 1].seq : 0
const todo = witnessed.filter((h) => h.seq > lastSeq && !days.some((d) => d.day === h.day))

if (todo.length === 0) {
  console.log(`days already stored through entry ${lastSeq}`)
} else {
  const target = todo[todo.length - 1].seq
  const fresh = []
  let after = lastSeq
  while (after < target) {
    const page = await get(`op=rows&after=${after}&limit=${PAGE}`)
    if (!Array.isArray(page.rows) || page.rows.length === 0) break
    for (const r of page.rows) if (r.seq <= target) fresh.push(r)
    after = page.rows[page.rows.length - 1].seq
    if (page.rows.length < PAGE) break
  }
  const check = verifyRows(fresh, lastSeq ? stored[stored.length - 1].hash : ZERO_HASH, lastSeq + 1)
  if (!check.ok) fail(`NEW ROWS DON'T CHECK OUT at entry ${check.badSeq} (${check.reason}): nothing written`)
  if (check.lastSeq !== target) fail(`the ledger gave rows only through ${check.lastSeq}, the newest head is at ${target}: nothing written`)
  const bySeq = new Map(fresh.map((r) => [r.seq, r]))
  const wrong = todo.filter((h) => bySeq.get(h.seq)?.hash !== h.hash)
  if (wrong.length) fail(`MISMATCH with witnessed heads: ${wrong.map((h) => h.day).join(', ')}: nothing written`)
  const files = []
  let from = lastSeq
  for (const h of todo) {
    const bytes = dayBytes(fresh.slice(from - lastSeq, h.seq - lastSeq))
    if (bytes.length > MAX_DAY_BYTES) fail(`DAY ${h.day} IS ${(bytes.length / 1048576).toFixed(1)} MB gzipped (over 20 MB): move the public ledger's files to object storage; nothing written`)
    files.push({ h, from, bytes })
    from = h.seq
  }
  mkdirSync(DAYS, { recursive: true })
  for (const { h, from: f, bytes } of files) {
    writeFileSync(join(DAYS, `${h.day}.ndjson.gz`), bytes)
    console.log(`day ${h.day}: entries ${f + 1}..${h.seq}, ${bytes.length} bytes`)
  }
}

// The supply per collectible, as the ledger answers it now (the page's Supply table reads this file).
const supply = await get('op=supply')
if (Array.isArray(supply.collectibles)) {
  mkdirSync(PUB, { recursive: true })
  writeFileSync(join(PUB, 'supply.json'), JSON.stringify({ as_of: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), chain: head.chain ?? 'main', collectibles: supply.collectibles }) + '\n')
  console.log(`supply: ${supply.collectibles.length} collectibles`)
}

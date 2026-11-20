// ledger-heads.mjs : the daily witness (run by .github/workflows/ledger-heads.yml at 00:20 UTC, after the app's 00:00
// UTC checkpoint; the app server does no Wayback save of its own: this Action is the only witness). Reads the minted-collectibles ledger's day heads (the app's ledger
// function, no sign-in), appends every day not yet in public/ledger/heads.csv (day,seq,hash,fetched_at), and saves the
// rules' SQL of every new fingerprint as public/ledger/rules/<fp>.sql, so a head's rules can be read next to it. Git's
// history is the timestamp. Never rewrites a row: a head that disagrees with one already committed fails the run.
// No secret: the ledger is public. Before the ledger exists (the function not deployed, or no head yet) it does nothing.
// The BETA TEST CHAIN (app 20261202295000, Oct 31 until Window W): its answers say "chain": "beta". Its heads go to
// public/ledger/beta/heads.csv (rules under public/ledger/beta/rules), never into the real chain's heads.csv; the
// real chain starts with its own genesis at launch.
// Usage: LEDGER_URL=<.../functions/v1/ledger> node scripts/ledger-heads.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const URL_BASE = process.env.LEDGER_URL || 'https://ajobkfasquywiawjfdxg.supabase.co/functions/v1/ledger'
let CSV = 'public/ledger/heads.csv'
let RULES = 'public/ledger/rules'

async function get(query) {
  const r = await fetch(`${URL_BASE}?${query}`, { headers: { accept: 'application/json' } })
  if (!r.ok) return { status: r.status, body: null }
  return { status: r.status, body: await r.json() }
}

const head = await get('op=head')
if (!head.body || head.body.ok !== true) {
  console.log(`ledger not readable (${head.status}): nothing to witness yet`)
  process.exit(0)
}
if (head.body.chain === 'beta') {
  CSV = 'public/ledger/beta/heads.csv'
  RULES = 'public/ledger/beta/rules'
  mkdirSync('public/ledger/beta', { recursive: true })
  console.log('the beta test chain: its heads go to public/ledger/beta/')
}
const text = existsSync(CSV) ? readFileSync(CSV, 'utf8') : 'day,seq,hash,fetched_at\n'
const have = new Map()
for (const line of text.split('\n')) {
  const [day, seq, hash] = line.split(',')
  if (/^\d{4}-\d{2}-\d{2}$/.test(day)) have.set(day, { seq, hash })
}
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const fresh = []
for (const h of [...(head.body.heads ?? [])].sort((a, b) => a.day.localeCompare(b.day))) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(h.day) || !/^[0-9a-f]{64}$/.test(h.hash) || !Number.isInteger(h.seq)) continue
  const old = have.get(h.day)
  if (old) {
    if (old.hash !== h.hash || Number(old.seq) !== h.seq) {
      console.error(`MISMATCH: ${h.day} was committed as ${old.seq} ${old.hash}, the ledger now says ${h.seq} ${h.hash}`)
      process.exit(1)
    }
    continue
  }
  fresh.push(`${h.day},${h.seq},${h.hash},${now}`)
  if (/^[0-9a-f]{64}$/.test(h.rules_fp ?? '') && !existsSync(`${RULES}/${h.rules_fp}.sql`)) {
    const rules = await get(`op=rules&fp=${h.rules_fp}`)
    if (rules.body?.ok === true && typeof rules.body.sql === 'string') {
      mkdirSync(RULES, { recursive: true })
      writeFileSync(`${RULES}/${h.rules_fp}.sql`, rules.body.sql)
      console.log(`rules ${h.rules_fp} saved`)
    }
  }
}
if (fresh.length === 0) {
  console.log('no new day head')
  process.exit(0)
}
writeFileSync(CSV, text.replace(/\n?$/, '\n') + fresh.join('\n') + '\n')
console.log(`appended ${fresh.length} head(s): ${fresh.map((f) => f.split(',')[0]).join(', ')}`)

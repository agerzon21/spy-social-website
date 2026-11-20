// ledger-files.mjs : the ledger downloads on spysocial.app/ledger, made at build time (npm run build, after vite build)
// from the day files the daily witness stores (public/ledger[/beta]/days/<day>.ndjson.gz, scripts/ledger-rows.mjs,
// each stamped with OpenTimestamps beside it). For each chain with days, writes into the build, next to its days/:
//   ledger-all.ndjson.gz  the whole ledger: the day files joined end to end (gzip members join into one gzip file),
//                         while the total stays under ALL_MAX (past it, the page offers the day files only)
//   latest-day.csv        the newest day's rows as a spreadsheet, with `line` (the exact text that is fingerprinted)
//   summary.json          what the page shows: entries, the newest line, the days with their files, sizes
// into <out>/ledger (the real chain) and <out>/ledger/beta (the beta test chain), and <out>/ledger/current.json
// naming the chain the page shows (the real one once it has days). Paths in summary.json are relative to the chain's
// folder, so the files can move to object storage behind one base (src/lib/ledgerFiles.ts). Static files from the CDN:
// the page makes no server call. Before writing, the whole chain is checked again (every fingerprint recomputed, every
// link, every day file ending on its witnessed head); a broken copy writes no downloads, only a summary that says so,
// and never fails the site build.
// Usage: node scripts/ledger-files.mjs [outDir=dist]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { FIELDS, csvCell, parseHeadsCsv, readDays, rowIsWhole, verifyRows } from './ledger-lib.mjs'

const OUT = process.argv[2] || 'dist'
const ALL_MAX = 50 * 1024 * 1024
const CHAINS = [
  { chain: 'main', pub: 'public/ledger', dir: 'ledger' },
  { chain: 'beta', pub: 'public/ledger/beta', dir: 'ledger/beta' },
]

let current = null
for (const c of CHAINS) {
  const days = readDays(join(c.pub, 'days'))
  if (days.length === 0) continue
  const out = join(OUT, c.dir)
  mkdirSync(out, { recursive: true })
  const heads = existsSync(join(c.pub, 'heads.csv')) ? parseHeadsCsv(readFileSync(join(c.pub, 'heads.csv'), 'utf8')) : []
  const rows = days.flatMap((d) => d.rows)
  const check = verifyRows(rows)
  const torn = rows.find((r) => !rowIsWhole(r))
  const said = { hash: "doesn't match its fingerprint", prev: "doesn't point at the line before it", seq: 'comes after a missing line' }
  let problem = !check.ok ? `line ${check.badSeq} ${said[check.reason]}` : torn ? `line ${torn.seq}'s text doesn't match its fields` : null
  const dayList = days.map((d) => {
    const last = d.rows[d.rows.length - 1]
    const h = heads.find((x) => x.day === d.day)
    if (!problem && (!last || !h || h.seq !== last.seq || h.hash !== last.hash)) problem = `the file for ${d.day} doesn't end on that day's published final fingerprint`
    return {
      day: d.day, from: d.rows[0]?.seq ?? null, to: last?.seq ?? null, hash: last?.hash ?? null, rows: d.rows.length,
      bytes: d.bytes.length, fetched_at: h?.fetched_at ?? null, file: `days/${d.name}`, ots: existsSync(`${d.file}.ots`) ? `days/${d.name}.ots` : null,
    }
  })
  const last = rows[rows.length - 1]
  const summary = {
    ok: problem === null,
    problem,
    chain: c.chain,
    rows: rows.length,
    first_at: rows[0]?.at ?? null,
    last: last ? { seq: last.seq, at: last.at, kind: last.kind, hash: last.hash, line: last.line } : null,
    days: dayList,
    built_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    files: {},
  }
  if (problem) {
    console.warn(`ledger-files: ${c.chain}: ${problem}; no downloads written`)
  } else {
    const total = days.reduce((n, d) => n + d.bytes.length, 0)
    if (total <= ALL_MAX) {
      writeFileSync(join(out, 'ledger-all.ndjson.gz'), Buffer.concat(days.map((d) => d.bytes)))
      summary.files.all = { path: 'ledger-all.ndjson.gz', bytes: total }
    }
    const newest = days[days.length - 1]
    const cols = [...FIELDS, 'line']
    const csv = [cols.join(','), ...newest.rows.map((r) => cols.map((f) => csvCell(r[f])).join(','))].join('\n') + '\n'
    writeFileSync(join(out, 'latest-day.csv'), csv)
    summary.files.latestCsv = { path: 'latest-day.csv', bytes: Buffer.byteLength(csv), day: newest.day }
    console.log(`ledger-files: ${c.chain}: ${rows.length} rows in ${days.length} days, through entry ${last.seq}`)
  }
  writeFileSync(join(out, 'summary.json'), JSON.stringify(summary) + '\n')
  current = current ?? { chain: c.chain }
}
if (current) {
  mkdirSync(join(OUT, 'ledger'), { recursive: true })
  writeFileSync(join(OUT, 'ledger', 'current.json'), JSON.stringify(current) + '\n')
} else {
  console.log('ledger-files: no stored days yet')
}

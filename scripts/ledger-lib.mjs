// ledger-lib.mjs : the minted-collectibles ledger's line, fingerprint and chain check, shared by the daily witness
// (scripts/ledger-rows.mjs, run by .github/workflows/ledger-heads.yml) and the build step that turns the stored days
// into the downloads on spysocial.app/ledger (scripts/ledger-files.mjs). Tests: scripts/ledger-lib_test.ts.
//
// Every row is one line of text; its fingerprint (hash) is the SHA-256 of that line, and the line ends with the row
// before's fingerprint, so each row vouches for every row before it. The line (app repo
// supabase/migrations/20261202200000_mint_ledger.sql, _mint_line):
//   v1|seq|at|kind|collectible|serial|copy_id|from_tag|to_tag|note|evidence_sha256|prev_hash
// at is UTC with microseconds ("2026-11-10T08:00:00.000002Z"); an empty field is empty text. The first row's
// prev_hash is 64 zeros.
//
// Stored form (public/ledger[/beta]/days/<day>.ndjson.gz): one gzip file per witnessed day head, holding the rows from
// the entry after the previous day's head through that day's head (its 00:00 UTC checkpoint), one JSON row a line:
// FIELDS, then `line`, the exact text that is fingerprinted. Each day file is stamped with OpenTimestamps
// (<day>.ndjson.gz.ots beside it) and never changes again. Gzip files joined end to end are one gzip file, so the
// whole ledger is the day files concatenated (the build's ledger-all.ndjson.gz). Kept small in Git for now (the
// public ledger may later move to object storage: the page reads every file under one base, src/lib/ledgerFiles.ts).
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { gunzipSync, gzipSync } from 'node:zlib'
import { join } from 'node:path'

export const ZERO_HASH = '0'.repeat(64)

/** The fields of a row, in the order the downloads keep them. */
export const FIELDS = ['seq', 'at', 'kind', 'collectible', 'serial', 'copy_id', 'from_tag', 'to_tag', 'note', 'evidence_sha256', 'prev_hash', 'hash']

/** A row as the text its fingerprint is taken of. */
export function lineOf(r) {
  return [
    'v1', String(r.seq), r.at, r.kind, r.collectible ?? '', r.serial === null ? '' : String(r.serial),
    r.copy_id === null ? '' : String(r.copy_id), r.from_tag, r.to_tag, r.note, r.evidence_sha256, r.prev_hash,
  ].join('|')
}

export const sha256Hex = (text) => createHash('sha256').update(text, 'utf8').digest('hex')

/**
 * Rows in seq order, after the row whose hash is `prev` (ZERO_HASH from the start).
 * { ok: true, head, lastSeq } or { ok: false, badSeq, reason: 'seq' | 'prev' | 'hash' }.
 */
export function verifyRows(rows, prev = ZERO_HASH, firstSeq = 1) {
  let expect = firstSeq
  let head = prev
  for (const r of rows) {
    if (r.seq !== expect) return { ok: false, badSeq: r.seq, reason: 'seq' }
    if (r.prev_hash !== head) return { ok: false, badSeq: r.seq, reason: 'prev' }
    if (sha256Hex(lineOf(r)) !== r.hash) return { ok: false, badSeq: r.seq, reason: 'hash' }
    head = r.hash
    expect++
  }
  return { ok: true, head, lastSeq: expect - 1 }
}

/** public/ledger/heads.csv: day,seq,hash,fetched_at (the GitHub Action's rows; a header line, # comments). */
export function parseHeadsCsv(text) {
  const out = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || line.startsWith('day,')) continue
    const [day, seq, hash, fetched] = line.split(',')
    if (/^\d{4}-\d{2}-\d{2}$/.test(day) && /^\d+$/.test(seq) && /^[0-9a-f]{64}$/.test(hash)) out.push({ day, seq: Number(seq), hash, fetched_at: fetched ?? '' })
  }
  return out
}

export const DAY_FILE = /^(\d{4}-\d{2}-\d{2})\.ndjson\.gz$/

/** A row as a day file keeps it: FIELDS in order, then its line. */
export function storedRow(r) {
  const out = {}
  for (const f of FIELDS) out[f] = r[f]
  out.line = lineOf(r)
  return out
}

/** A day file's bytes: its rows as NDJSON, gzipped. */
export const dayBytes = (rows) => gzipSync(Buffer.from(rows.map((r) => JSON.stringify(storedRow(r)) + '\n').join(''), 'utf8'), { level: 9 })

/** The stored day files of one chain (public/ledger[/beta]/days), oldest first: [{ day, name, file, bytes, rows }]. */
export function readDays(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((n) => DAY_FILE.test(n))
    .sort()
    .map((n) => {
      const bytes = readFileSync(join(dir, n))
      const rows = gunzipSync(bytes).toString('utf8').split('\n').filter((l) => l !== '').map((l) => JSON.parse(l))
      return { day: n.slice(0, 10), name: n, file: join(dir, n), bytes, rows }
    })
}

/** A stored row's own check: its line is its fields, and its hash is its line's SHA-256. */
export const rowIsWhole = (r) => typeof r.line === 'string' && r.line === lineOf(r) && sha256Hex(r.line) === r.hash

/** One CSV cell (RFC 4180: quoted when it holds a comma, a quote or a line break). */
export function csvCell(v) {
  const s = v === null || v === undefined ? '' : String(v)
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// The minted-collectibles ledger, checked in the browser (spysocial.app/ledger). Every row is one line of text; its
// hash is the SHA-256 of that line, and the line ends with the row before's hash, so each row vouches for every row
// before it. The line (app repo supabase/migrations/20261202200000_mint_ledger.sql, _mint_line):
//   v1|seq|at|kind|collectible|serial|copy_id|from_tag|to_tag|note|evidence_sha256|prev_hash
// at is UTC with microseconds ("2026-11-10T08:00:00.000002Z"); an empty field is empty text. The first row's
// prev_hash is 64 zeros. Nothing here trusts the server: the hashes are recomputed here and compared with the day
// heads committed to this site's public repo (public/ledger/heads.csv) and saved by the Wayback Machine.

export type LedgerRow = {
  seq: number
  at: string
  kind: string
  collectible: string | null
  serial: number | null
  copy_id: number | null
  from_tag: string
  to_tag: string
  note: string
  evidence_sha256: string
  prev_hash: string
  hash: string
}

export const ZERO_HASH = '0'.repeat(64)

/** A row as the text its hash is taken of. */
export function lineOf(r: LedgerRow): string {
  return [
    'v1', String(r.seq), r.at, r.kind, r.collectible ?? '', r.serial === null ? '' : String(r.serial),
    r.copy_id === null ? '' : String(r.copy_id), r.from_tag, r.to_tag, r.note, r.evidence_sha256, r.prev_hash,
  ].join('|')
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

export type ChainCheck =
  | { ok: true; rows: number; head: string; lastSeq: number }
  | { ok: false; rows: number; badSeq: number; reason: 'seq' | 'prev' | 'hash' }

/** Rows in seq order, after the row whose hash is `prev` (ZERO_HASH from the start). */
export async function verifyRows(rows: LedgerRow[], prev = ZERO_HASH, firstSeq = 1): Promise<ChainCheck> {
  let expectSeq = firstSeq
  let head = prev
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    if (r.seq !== expectSeq) return { ok: false, rows: i, badSeq: r.seq, reason: 'seq' }
    if (r.prev_hash !== head) return { ok: false, rows: i, badSeq: r.seq, reason: 'prev' }
    if ((await sha256Hex(lineOf(r))) !== r.hash) return { ok: false, rows: i, badSeq: r.seq, reason: 'hash' }
    head = r.hash
    expectSeq++
  }
  return { ok: true, rows: rows.length, head, lastSeq: expectSeq - 1 }
}

export type Head = { day: string; seq: number; hash: string }

/** public/ledger/heads.csv: day,seq,hash,fetched_at (the GitHub Action's rows; a header line, # comments). */
export function parseHeadsCsv(text: string): Head[] {
  const out: Head[] = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || line.startsWith('day,')) continue
    const [day, seq, hash] = line.split(',')
    if (/^\d{4}-\d{2}-\d{2}$/.test(day) && /^\d+$/.test(seq) && /^[0-9a-f]{64}$/.test(hash)) out.push({ day, seq: Number(seq), hash })
  }
  return out
}

/** Every witnessed head checked against the recomputed chain: the row at its seq must have its hash. */
export function checkHeads(heads: Head[], hashAt: (seq: number) => string | undefined): { day: string; ok: boolean | null }[] {
  return heads.map((h) => {
    const got = hashAt(h.seq)
    return { day: h.day, ok: got === undefined ? null : got === h.hash }
  })
}

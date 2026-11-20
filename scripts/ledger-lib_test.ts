// deno test --no-lock --no-check --allow-read scripts/ledger-lib_test.ts   (the site has no test runner; Deno runs it as is)
// Checks the ledger's line and chain check (scripts/ledger-lib.mjs), and the stored day files in this repo.
import { deepStrictEqual, strictEqual } from 'node:assert/strict'
import { dayBytes, lineOf, parseHeadsCsv, readDays, rowIsWhole, sha256Hex, verifyRows, ZERO_HASH } from './ledger-lib.mjs'
import { gunzipSync } from 'node:zlib'

type Row = {
  seq: number; at: string; kind: string; collectible: string | null; serial: number | null; copy_id: number | null
  from_tag: string; to_tag: string; note: string; evidence_sha256: string; prev_hash: string; hash: string; line?: string
}

Deno.test('the design doc example: row 3 of Local Hero hashes to 52738386...', () => {
  const r: Row = {
    seq: 3, at: '2026-11-09T21:00:00.000002Z', kind: 'mint', collectible: 'beta.gn.beta_game_night.local', serial: 1, copy_id: 100001,
    from_tag: '', to_tag: 'h:7f3a91c20b5e', note: 'retro:gamenight_results',
    evidence_sha256: '9969e10633a2bdf48649c862e7923ccdee56a27fb2056317d17916431173c154',
    prev_hash: 'c5e810715419238090c4868bc205ed848effbd035722a9ec2ea7c77908c40c26', hash: '',
  }
  strictEqual(sha256Hex(lineOf(r)), '52738386c8e8afb4847ce38c823f72bac9477306a1b99d5e6e33f13e1fe7f8df')
})

function chain(n: number): Row[] {
  const rows: Row[] = []
  let prev = ZERO_HASH
  for (let seq = 1; seq <= n; seq++) {
    const r: Row = { seq, at: `2026-11-10T08:00:0${seq}.000000Z`, kind: seq === 1 ? 'genesis' : 'mint', collectible: seq === 1 ? null : 'x.y',
      serial: seq === 1 ? null : seq - 1, copy_id: seq === 1 ? null : seq, from_tag: '', to_tag: '', note: '', evidence_sha256: '', prev_hash: prev, hash: '' }
    r.hash = sha256Hex(lineOf(r))
    prev = r.hash
    rows.push(r)
  }
  return rows
}

Deno.test('a chain verifies, and any changed byte is caught at its row', () => {
  const rows = chain(4)
  deepStrictEqual(verifyRows(rows), { ok: true, head: rows[3].hash, lastSeq: 4 })
  const forged = rows.map((r) => ({ ...r }))
  forged[2].serial = 9
  deepStrictEqual(verifyRows(forged), { ok: false, badSeq: 3, reason: 'hash' })
  deepStrictEqual(verifyRows([rows[0], rows[2]]), { ok: false, badSeq: 3, reason: 'seq' })
})

Deno.test('a day file keeps each row whole, and a row whose line was edited is caught', () => {
  const rows = chain(3)
  const back = gunzipSync(dayBytes(rows)).toString('utf8').trim().split('\n').map((l) => JSON.parse(l))
  strictEqual(back.every(rowIsWhole), true)
  deepStrictEqual(verifyRows(back), { ok: true, head: rows[2].hash, lastSeq: 3 })
  strictEqual(rowIsWhole({ ...back[1], line: back[1].line.replace('mint', 'mInt') }), false)
  strictEqual(rowIsWhole({ ...back[1], serial: 7 }), false)
})

Deno.test('heads.csv', () => {
  const heads = parseHeadsCsv(`day,seq,hash,fetched_at\n# a comment\n2026-11-10,815,${'a'.repeat(64)},2026-11-11T00:20:03Z\nbad,line\n`)
  deepStrictEqual(heads, [{ day: '2026-11-10', seq: 815, hash: 'a'.repeat(64), fetched_at: '2026-11-11T00:20:03Z' }])
})

Deno.test('the stored beta days check out and each ends on its witnessed head', () => {
  const days = readDays('public/ledger/beta/days')
  if (days.length === 0) return
  const rows = days.flatMap((d: { rows: Row[] }) => d.rows)
  strictEqual(verifyRows(rows).ok, true)
  strictEqual(rows.every(rowIsWhole), true)
  const heads = parseHeadsCsv(Deno.readTextFileSync('public/ledger/beta/heads.csv'))
  for (const d of days) {
    const h = heads.find((x: { day: string }) => x.day === d.day)
    strictEqual(h?.hash, d.rows[d.rows.length - 1].hash, d.day)
  }
})

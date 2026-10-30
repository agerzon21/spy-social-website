// deno test --no-lock scripts/ledgerVerify_test.ts   (the site has no test runner; Deno runs the TypeScript as is)
// LEDGER_ROWS=<a mint_public rows answer saved as JSON> checks a real chain too.
import { deepStrictEqual, strictEqual } from 'node:assert/strict'
import { checkHeads, lineOf, parseHeadsCsv, sha256Hex, verifyRows, type LedgerRow, ZERO_HASH } from '../src/lib/ledgerVerify.ts'

Deno.test('the design doc example: row 3 of Local Hero hashes to 52738386...', async () => {
  const r: LedgerRow = {
    seq: 3, at: '2026-11-09T21:00:00.000002Z', kind: 'mint', collectible: 'beta.gn.beta_game_night.local', serial: 1, copy_id: 100001,
    from_tag: '', to_tag: 'h:7f3a91c20b5e', note: 'retro:gamenight_results',
    evidence_sha256: '9969e10633a2bdf48649c862e7923ccdee56a27fb2056317d17916431173c154',
    prev_hash: 'c5e810715419238090c4868bc205ed848effbd035722a9ec2ea7c77908c40c26', hash: '',
  }
  strictEqual(await sha256Hex(lineOf(r)), '52738386c8e8afb4847ce38c823f72bac9477306a1b99d5e6e33f13e1fe7f8df')
})

Deno.test('a chain verifies, and any changed byte is caught at its row', async () => {
  const rows: LedgerRow[] = []
  let prev = ZERO_HASH
  for (let seq = 1; seq <= 4; seq++) {
    const r: LedgerRow = { seq, at: `2026-11-10T08:00:0${seq}.000000Z`, kind: seq === 1 ? 'genesis' : 'mint', collectible: seq === 1 ? null : 'x.y',
      serial: seq === 1 ? null : seq - 1, copy_id: seq === 1 ? null : seq, from_tag: '', to_tag: '', note: '', evidence_sha256: '', prev_hash: prev, hash: '' }
    r.hash = await sha256Hex(lineOf(r))
    prev = r.hash
    rows.push(r)
  }
  const ok = await verifyRows(rows)
  deepStrictEqual(ok, { ok: true, rows: 4, head: prev, lastSeq: 4 })
  const forged = rows.map((r) => ({ ...r }))
  forged[2].serial = 9
  deepStrictEqual(await verifyRows(forged), { ok: false, rows: 2, badSeq: 3, reason: 'hash' })
  deepStrictEqual(await verifyRows([rows[0], rows[2]]), { ok: false, rows: 1, badSeq: 3, reason: 'seq' })
})

Deno.test('heads.csv and the heads check', () => {
  const heads = parseHeadsCsv(`day,seq,hash,fetched_at\n# a comment\n2026-11-10,815,${'a'.repeat(64)},2026-11-11T00:20:03Z\nbad,line\n`)
  deepStrictEqual(heads, [{ day: '2026-11-10', seq: 815, hash: 'a'.repeat(64) }])
  deepStrictEqual(checkHeads(heads, (s) => (s === 815 ? 'a'.repeat(64) : undefined)), [{ day: '2026-11-10', ok: true }])
  deepStrictEqual(checkHeads(heads, () => 'b'.repeat(64)), [{ day: '2026-11-10', ok: false }])
})

Deno.test('a real chain (LEDGER_ROWS, optional)', async () => {
  const path = Deno.env.get('LEDGER_ROWS')
  if (!path) return
  const rows = JSON.parse(await Deno.readTextFile(path)).rows as LedgerRow[]
  const r = await verifyRows(rows)
  strictEqual(r.ok, true, JSON.stringify(r))
  console.log(`real chain: ${rows.length} rows verified, head ${rows[rows.length - 1].hash.slice(0, 16)}`)
})

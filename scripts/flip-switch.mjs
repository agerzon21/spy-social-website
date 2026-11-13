// flip-switch.mjs : turns on one named site switch in src/lib/legalRelease.ts and sets its *_DAY, so each of Friday's
// website steps (the app repo's FRIDAY-1113-RUNSHEET.md "S" rows; the list in FRIDAY-SITE-FLIPS.md) is one command.
// It only edits the file: build, check, commit by path and safe_push yourself. Every edit must match exactly once inside
// `export const LIVE = {` (or the one DAY line), else nothing is written. Running it twice is harmless (it says so).
//
// Usage:
//   node scripts/flip-switch.mjs <name> [--day "November 13, 2026"] [--dry-run] [--file <path>]
//   node scripts/flip-switch.mjs --list          the names, their LIVE values now and their days
//   node scripts/flip-switch.mjs <name> --undo   the rollback: the LIVE values back (the day is left; set it with --day)
// --day defaults to "November 13, 2026" (Friday's apply). Use the real apply day if it moves.
import { readFileSync, writeFileSync } from 'node:fs'

const SWITCHES = {
  // name: { live: [[LIVE key, value when flipped]], day: the *_DAY constant (null: no date), step: run sheet row }
  codes: { live: [['membershipCodes', false], ['codesNoMembership', true]], day: 'CODES_NO_MEMBERSHIP_DAY', step: '11S' },
  reputation: { live: [['reputation', true]], day: 'REPUTATION_DAY', step: '13S' },
  drawingMinorRooms: { live: [['drawingMinorRooms', true]], day: 'DRAWING_MINOR_ROOMS_DAY', step: '18S' },
  testerGiftGame: { live: [['testerGiftGame', true]], day: 'TESTER_GIFT_GAME_DAY', step: '19S' },
  partyLeaderLapse: { live: [['partyLeaderLapse', true]], day: 'PARTY_LEADER_LAPSE_DAY', step: '20S' },
  memberLoyalty: { live: [['memberLoyalty', true]], day: 'MEMBER_LOYALTY_DAY', step: '21S->u61' }, // with appU61, not Friday (friday-allon-read-1112)
  modCoverHold: { live: [['modCoverHold', true]], day: 'MOD_COVER_HOLD_DAY', step: '22S->u61' }, // with appU61, not Friday (friday-allon-read-1112)
  unconfirmedSignups: { live: [['unconfirmedSignups', true]], day: 'UNCONFIRMED_SIGNUPS_DAY', step: '31S' },
  retentionSweep: { live: [['retentionSweep', true]], day: 'RETENTION_SWEEP_DAY', step: '33S' },
  practiceResults: { live: [['practiceResults', true]], day: 'PRACTICE_RESULTS_DAY', step: '47S' },
  ledgerReasons: { live: [['ledgerReasons', true]], day: null, step: '48S' },
  ledgerUniquesOnly: { live: [['ledgerUniquesOnly', true]], day: 'LEDGER_UNIQUES_DAY', step: '49S' },
  rarefinds: { live: [['rarefindsOffers', true], ['rarefindsOfferPush', true]], day: 'RAREFINDS_OFFERS_DAY', step: '52S' },
  ncmecOnly: { live: [['ncmecOnly', true]], day: 'NCMEC_ONLY_DAY', step: 'on since Nov 11 (coordinator)' },
  // friday-allon-read-1112: NOT Friday. Flip when the u61 OTA ships, with memberLoyalty and modCoverHold, all three with --day <that day>.
  appU61: { live: [['appU61', true]], day: 'APP_U61_DAY', step: 'u61' },
  // creator-invite-data-1113: Saturday or later, after 20270101000010_creator_invite_data_1113 is applied (and LIVE.creatorInvites is on).
  creatorInviteData: { live: [['creatorInviteData', true]], day: 'CREATOR_INVITE_DATA_DAY', step: 'creator-invite-data-1113' },
}

const args = process.argv.slice(2)
const opt = (k) => {
  const i = args.indexOf(k)
  return i >= 0 ? args[i + 1] : undefined
}
const FILE = opt('--file') || new URL('../src/lib/legalRelease.ts', import.meta.url).pathname
const DAY = opt('--day') || 'November 13, 2026'
const DRY = args.includes('--dry-run')
const UNDO = args.includes('--undo')
const die = (m) => {
  console.error(`flip-switch: ${m}`)
  process.exit(1)
}

let src = readFileSync(FILE, 'utf8')
const liveStart = src.indexOf('\nexport const LIVE = {\n')
const liveEnd = src.indexOf('\n}\n', liveStart)
if (liveStart < 0 || liveEnd < 0) die(`no LIVE block in ${FILE}`)
const keyRe = (key) => new RegExp(`^  ${key}: (true|false),$`, 'gm')
const dayRe = (c) => new RegExp(`^export const ${c} = '([^']*)'$`, 'gm')
const liveOf = (key) => {
  const m = [...src.slice(liveStart, liveEnd).matchAll(keyRe(key))]
  if (m.length !== 1) die(`LIVE.${key}: ${m.length} matches in the LIVE block (want 1)`)
  return m[0]
}
const dayOf = (c) => {
  const m = [...src.matchAll(dayRe(c))]
  if (m.length !== 1) die(`${c}: ${m.length} matches (want 1)`)
  return m[0]
}

if (args[0] === '--list' || !args[0]) {
  for (const [name, s] of Object.entries(SWITCHES)) {
    const live = s.live.map(([k]) => `${k}=${liveOf(k)[1]}`).join(' ')
    console.log(`${name.padEnd(20)} ${s.step.padEnd(5)} ${live}${s.day ? `  ${s.day}='${dayOf(s.day)[1]}'` : ''}`)
  }
  process.exit(0)
}

const name = args[0]
const sw = SWITCHES[name]
if (!sw) die(`unknown switch '${name}'. Known: ${Object.keys(SWITCHES).join(', ')}`)
if (!/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/.test(DAY))
  die(`--day must read like "November 13, 2026", not '${DAY}'`)

const changes = []
for (const [key, on] of sw.live) {
  const want = UNDO ? !on : on
  const m = liveOf(key)
  if (m[1] === String(want)) {
    changes.push(`LIVE.${key} already ${want}`)
    continue
  }
  const at = liveStart + m.index
  src = src.slice(0, at) + `  ${key}: ${want},` + src.slice(at + m[0].length)
  changes.push(`LIVE.${key}: ${m[1]} -> ${want}`)
}
if (sw.day && !UNDO) {
  const m = dayOf(sw.day)
  if (m[1] === DAY) changes.push(`${sw.day} already '${DAY}'`)
  else {
    src = src.slice(0, m.index) + `export const ${sw.day} = '${DAY}'` + src.slice(m.index + m[0].length)
    changes.push(`${sw.day}: '${m[1]}' -> '${DAY}'`)
  }
}
if (!DRY) writeFileSync(FILE, src)
console.log(`${DRY ? '[dry run] ' : ''}${name} (${sw.step}${UNDO ? ', undo' : ''}):\n  ${changes.join('\n  ')}`)
if (!DRY) console.log('next: npm run build, check the page, then commit src/lib/legalRelease.ts by path and safe_push')

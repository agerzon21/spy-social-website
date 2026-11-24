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
  // web-signin-flag-1123: Sign in links (header, footer, Home hero) to the app's /login; no legal text, no day. Dec 8 at the web release.
  webSignIn: { live: [['webSignIn', true]], day: null, step: 'Dec 8 web release (E6b)' },
  codes: { live: [['membershipCodes', false], ['codesNoMembership', true]], day: 'CODES_NO_MEMBERSHIP_DAY', step: '11S' },
  // guest-save-before-buy-1120: the day round 14 is PUBLISHED (a guest saves before buying a membership); --day = that day.
  // safety-g6g8-1120: the day 20261231999727 cs_auto_preserve_1120 is applied live; --day = that day. Privacy only.
  csAutoPreserve: { live: [['csAutoPreserve', true]], day: 'CS_AUTO_PRESERVE_DAY', step: 'row 999727' },
  // privacy-a40-1124 (A40): each the day its app server row is applied live; --day = that day. Privacy only.
  savedLooks1122: { live: [['savedLooks1122', true]], day: 'SAVED_LOOKS_1122_DAY', step: 'row 999689' },
  marketWatch1122: { live: [['marketWatch1122', true]], day: 'MARKET_WATCH_1122_DAY', step: 'row 999692' },
  drawingMinorLeft1122: { live: [['drawingMinorLeft1122', true]], day: 'DRAWING_MINOR_LEFT_1122_DAY', step: 'row 999688 (same deploy)' },
  exportMinorLeftSkip: { live: [['exportMinorLeftSkip', true]], day: 'EXPORT_MINOR_LEFT_SKIP_DAY', step: '_data_export skips drawing_minor_left (not staged)' },
  // gn-tiers4-1120: the day server row 20261231999719 (4 Game Night tiers, shred for Game Night Intel) is applied live, after the client OTA; --day = that day.
  gnTiers4_1120: { live: [['gnTiers4_1120', true]], day: 'GN_TIERS4_1120_DAY', step: 'row 999719 (gn-tiers4-1120)' },
  oddsPublic1120: { live: [['oddsPublic1120', true]], day: 'ODDS_PUBLIC_1120_DAY', step: 'with or after gnTiers4_1120 (legal-1120)' },
  guestSaveBeforeBuy: { live: [['guestSaveBeforeBuy', true]], day: 'GUEST_SAVE_BEFORE_BUY_DAY', step: 'round 14' },
  reputation: { live: [['reputation', true]], day: 'REPUTATION_DAY', step: '13S' },
  drawingMinorRooms: { live: [['drawingMinorRooms', true]], day: 'DRAWING_MINOR_ROOMS_DAY', step: '18S' },
  testerGiftGame: { live: [['testerGiftGame', true]], day: 'TESTER_GIFT_GAME_DAY', step: '19S' },
  partyLeaderLapse: { live: [['partyLeaderLapse', true]], day: 'PARTY_LEADER_LAPSE_DAY', step: '20S' },
  // party-no-member-1118: the same hour server row 107 (20261231999818_party_no_member_1117) is applied; --day = that day.
  partyNoMember: { live: [['partyNoMember', true]], day: 'PARTY_NO_MEMBER_DAY', step: 'row 107 (999818)' },
  memberLoyalty: { live: [['memberLoyalty', true]], day: 'MEMBER_LOYALTY_DAY', step: '21S->u61' }, // with appU61, not Friday (friday-allon-read-1112)
  modCoverHold: { live: [['modCoverHold', true]], day: 'MOD_COVER_HOLD_DAY', step: '22S->u61' }, // with appU61, not Friday (friday-allon-read-1112)
  unconfirmedSignups: { live: [['unconfirmedSignups', true]], day: 'UNCONFIRMED_SIGNUPS_DAY', step: '31S' },
  retentionSweep: { live: [['retentionSweep', true]], day: 'RETENTION_SWEEP_DAY', step: '33S' },
  practiceResults: { live: [['practiceResults', true]], day: 'PRACTICE_RESULTS_DAY', step: '47S' },
  // practice-members-1117: POLICY FIRST, the day NEXT-BATCH row 95 (999836) is applied, before it; both switches, PRACTICE_AI_DAY = that day.
  practiceMembers: { live: [['practiceAi', true], ['practiceMembers', true]], day: 'PRACTICE_AI_DAY', step: 'row 95 (999836)' },
  ledgerReasons: { live: [['ledgerReasons', true]], day: null, step: '48S' },
  ledgerUniquesOnly: { live: [['ledgerUniquesOnly', true]], day: 'LEDGER_UNIQUES_DAY', step: '49S' },
  rarefinds: { live: [['rarefindsOffers', true], ['rarefindsOfferPush', true]], day: 'RAREFINDS_OFFERS_DAY', step: '52S' },
  ncmecOnly: { live: [['ncmecOnly', true]], day: 'NCMEC_ONLY_DAY', step: 'on since Nov 11 (coordinator)' },
  // friday-allon-read-1112: NOT Friday. Flip when the u61 OTA ships, with memberLoyalty and modCoverHold, all three with --day <that day>.
  appU61: { live: [['appU61', true]], day: 'APP_U61_DAY', step: 'u61' },
  // creator-invite-data-1113: Saturday or later, after 20270101000010_creator_invite_data_1113 is applied (and LIVE.creatorInvites is on).
  creatorInviteData: { live: [['creatorInviteData', true]], day: 'CREATOR_INVITE_DATA_DAY', step: 'creator-invite-data-1113' },
  // help-u61-1113: Beta 3 day (Tue Nov 24), once u62 is on testers' phones and role_reveal_online is 'everyone'. Help only, no date.
  helpRoleReveal: { live: [['helpRoleReveal', true]], day: null, step: 'beta3' },
  // help-new-1117: Help only, no date. Each once its server row is applied AND app update 62.15 is on phones
  // (helpGooglePassStop: the hour app_config google_pass_cancel goes on).
  helpGameNightRewards: { live: [['helpGameNightRewards', true]], day: null, step: 'row 83 (999848) + 62.15' },
  // howto-truth-1117: the Game Night Rules for the rewards, the day row 83 is applied live (before 62.15 is fine).
  // legal-gn-1117: the same flip turns on Terms 5 / 9's, Privacy's and the Ledger page's Game Night lines (GN_REWARDS_RULES_DAY in both Last Updated chains).
  gnRewardsRules: { live: [['gnRewardsRules', true]], day: 'GN_REWARDS_RULES_DAY', step: 'row 83 (999848)' },
  helpMembershipSwitch: { live: [['helpMembershipSwitch', true]], day: null, step: 'row 85 (999846) + 62.15' },
  // legal-coverage-1119: helpGooglePassStop now also turns on Terms 9's and Privacy's lines, so it carries a day.
  helpGooglePassStop: { live: [['helpGooglePassStop', true]], day: 'GOOGLE_PASS_STOP_DAY', step: 'google_pass_cancel on' },
  // legal-coverage-1119: POLICY FIRST, the hour tester-onboard goes live (TESTER_ONBOARD_LIVE=1 + app_config tester_onboard enabled).
  testerOnboard: { live: [['testerOnboard', true]], day: 'TESTER_ONBOARD_DAY', step: 'tester-onboard live' },
  // drawings-1120: published policy-first Nov 20; --undo only if app server row 999743 / 999742 is dropped.
  drawingMinorPeer1120: { live: [['drawingMinorPeer1120', true]], day: 'DRAWINGS_1120_DAY', step: 'row 999743' },
  modDrawingsAdult1120: { live: [['modDrawingsAdult1120', true]], day: 'DRAWINGS_1120_DAY', step: 'row 999742' },
  helpQuestionRounds: { live: [['helpQuestionRounds', true]], day: null, step: 'row 70 (999861) + 62.15' },
  // codename-1118: Help only, no date. The hour app update 62.15.2 is on phones.
  helpU6152: { live: [['helpU6152', true]], day: null, step: '62.15.2' },
  // help-u6153-1118: Help only, no date. The hour 62.15 round 5 is on phones.
  helpU6153: { live: [['helpU6153', true]], day: null, step: '62.15 round 5' },
  // legal-coverage-1114: each the day its server file is applied (practiceNoAi: the next site publish).
  reputationHoldCap: { live: [['reputationHoldCap', true]], day: 'REPUTATION_HOLD_CAP_DAY', step: 'row 25 (999954)' },
  tradeWatchEvidence: { live: [['tradeWatchEvidence', true]], day: 'TRADE_WATCH_EVIDENCE_DAY', step: 'row 24 TWE' },
  tradeMinorSafety: { live: [['tradeMinorSafety', true]], day: 'TRADE_MINOR_SAFETY_DAY', step: 'row 21 (999957)' },
  practiceNoAi: { live: [['practiceNoAi', true]], day: 'PRACTICE_NO_AI_DAY', step: 'next publish' },
  // legal-cov2-1114: each the day its server file is applied (999925 = NEXT-BATCH row 23; 999938 = row AG, before Dec 7).
  modGuard: { live: [['modGuard', true]], day: 'MOD_GUARD_DAY', step: 'row 23 (999925)' },
  resetArchiveForget: { live: [['resetArchiveForget', true]], day: 'RESET_ARCHIVE_FORGET_DAY', step: 'row AG (999938)' },
  // photosens-u62: Beta 3 day (Tue Nov 24) 7:24 PM, after role_reveal_online is 'everyone'. Pass --day "November 24, 2026".
  appU62: { live: [['appU62', true]], day: 'APP_U62_DAY', step: 'beta3' },
  // legal-1115: reputationBanMarket the day NEXT-BATCH row 35 (999909) is applied; siteStorage1115 is on (--day re-dates it to the publish day).
  reputationBanMarket: { live: [['reputationBanMarket', true]], day: 'REPUTATION_BAN_MARKET_DAY', step: 'row 35 (999909)' },
  siteStorage1115: { live: [['siteStorage1115', true]], day: 'SITE_STORAGE_1115_DAY', step: 'publish' },
  // privacy-anchors-1115: only once 20261231999902_sketch_consent_withdraw_1115 is applied live AND u62.12 (Settings > Drawing Checks > Withdraw) is on the phones.
  drawingCheckWithdraw: { live: [['drawingCheckWithdraw', true]], day: 'DRAWING_CHECK_WITHDRAW_DAY', step: '999902 + u62.12' },
  // legal-1116: sameOdds the day NEXT-BATCH row 54 (999888) is applied; playtestTremendous only if the owner picks Tremendous (before the Beta 3 upload); payPalTiming1116 is on.
  sameOdds: { live: [['sameOdds', true]], day: 'SAME_ODDS_DAY', step: 'row 54 (999888)' },
  playtestTremendous: { live: [['playtestTremendous', true]], day: 'PLAYTEST_TREMENDOUS_DAY', step: 'owner picks Tremendous' },
  payPalTiming1116: { live: [['payPalTiming1116', true]], day: 'PAYPAL_TIMING_1116_DAY', step: 'publish' },
  // legal-coverage-1116: coverage1116 is on (--day re-dates it to the publish day); heavyReads the day NEXT-BATCH row 62 (999875) is applied; communitySearchShown the day row 63 (999873) is applied.
  coverage1116: { live: [['coverage1116', true]], day: 'COVERAGE_1116_DAY', step: 'publish' },
  heavyReads: { live: [['heavyReads', true]], day: 'HEAVY_READS_DAY', step: 'row 62 (999875)' },
  communitySearchShown: { live: [['communitySearchShown', true]], day: 'COMMUNITY_SEARCH_DAY', step: 'row 63 (999873)' },
  // no-pack-pass-1117: on (--day re-dates it to the publish day).
  noPackPass1117: { live: [['noPackPass1117', true]], day: 'NO_PACK_PASS_1117_DAY', step: 'publish' },
  // intel-zero-1117: before Dec 7, once economy_reset_decisions holds D1 = zero on live (RUNBOOK_reset_answers_1117.sql), never after B1.
  intelZero1117: { live: [['intelZero1117', true]], day: 'INTEL_ZERO_1117_DAY', step: 'D1 zero on live, before Dec 7' },
  // legal-gn-1117: on (--day re-dates it to the publish day). gnRewardsRules (above) now also moves Terms' and Privacy's Last Updated.
  tutorialGate1117: { live: [['tutorialGate1117', true]], day: 'TUTORIAL_GATE_1117_DAY', step: 'publish' },
  // archive-origins-1119 (B12): the Archive's Origins seal, Dec 6 (website commit A), before the Dec 8 genesis. No legal text, no date.
  archiveOrigins: { live: [['archiveOrigins', true]], day: null, step: 'B12 Dec 6' },
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

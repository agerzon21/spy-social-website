// The transparency page's published facts (src/pages/Transparency.tsx): the incidents and the rule changes, as the app
// server publishes them (app repo: economy_incidents, Economy Integrity E0 / E1). An incident here is word for word the
// database's row once it's published there, and never changes after (the database refuses to). Add a new one the day
// it's published in the Owner Console.

import { INTERCEPTS_IN_TRADES_DAY, LIVE } from './legalRelease'

export type PublishedIncident = {
  id: string
  kind: 'reset' | 'bug' | 'outage'
  title: string
  /** The day it was published (UTC), in words. */
  published: string
  summary: string
  /** How each player's amount is worked out, as published. */
  rule: string
}

/**
 * I-1, the launch reset's Intel (app server 20261201950000, Window W): shown once LIVE.launchResetIncident is on (the
 * day WI runs; set `published` to that day).
 */
const I1: PublishedIncident = {
  id: 'I-1',
  kind: 'reset',
  title: 'Pre-launch Intercept Intel',
  published: 'the day of the reset',
  summary:
    'Before launch, every Intercept opened while SpySocial was being tested was wiped, together with the copies it gave. The Intel those pre-launch copies were shredded for goes with them, and the Intel spent before launch on items the wipe took back is refunded. Intel from games, daily claims and streaks stays.',
  rule: 'Per account, from its Intel rows before the wipe: Intel spent on Intel-shop items and requisitions comes back; Intel made by shredding pre-launch copies is taken back, never below 0.',
}

/**
 * I-2, Test-phase Intel (app server 20261109110058_test_phase_intel, published 2026-11-09; the sweep 20261109122429):
 * word for word the economy_incidents row (title, summary, rule_text). Shown while LIVE.coverage1110 is on.
 * The row's rule says "50,000 Intel, once" and can't change (published incidents are frozen); the testers' amount was raised
 * to 100,000 by 20261225220000_test_phase_grant_100k (live 20261111040944, Nov 11 04:09 UTC = Nov 10 ET), so the rule here
 * says 100,000 and when it was raised (every tester already given 50,000 got the other 50,000 under the same incident).
 */
const I2: PublishedIncident = {
  id: 'I-2',
  kind: 'reset',
  title: 'Test-phase Intel',
  published: 'November 9, 2026',
  summary:
    'While SpySocial is being tested, Intel is given to the developer\'s accounts and to every tester who signs in to a test version before November 13, so the Black Market and trades can be tried for real. All of it is taken back at launch, on December 7: nobody keeps any of it, and nothing it paid for stays.',
  rule: "Each tester account that signs in to a 2.2 test version before 2026-11-13 01:30 UTC: 100,000 Intel, once (published as 50,000; raised to 100,000 on November 10, 2026, when item values went up, and testers already given 50,000 got the other 50,000). The developer's accounts: what the owner sets. At the launch reset each account gives back what it was given, never below 0, after the Black Market's and trades' undo; test accounts' Black Market and trade Intel since this incident is undone too.",
}

/** Newest first. */
export const PUBLISHED_INCIDENTS: PublishedIncident[] = [
  ...(LIVE.launchResetIncident ? [I1] : []),
  ...(LIVE.coverage1110 ? [I2] : []),
]

/**
 * Uniques rarer (owner 2026-10-30; app server 20261202450000_unique_rarity): shown once LIVE.uniquesRarer is on (set
 * `day` to the day the server file is applied). Before launch: no Unique made under the old odds survives the reset.
 */
const UNIQUES_RARER: { day: string; what: string; from: string; to: string }[] = [
  { day: 'October 31, 2026', what: "a Top Secret Intercept's chance of a Unique", from: '0.1%', to: 'none' },
  { day: 'October 31, 2026', what: "a Top Secret Intercept's chance of a Legendary", from: '4%', to: '3%' },
  { day: 'October 31, 2026', what: "a Top Secret Intercept's chance of a Mythic", from: '16.9%', to: '18%' },
  { day: 'October 31, 2026', what: "an Enigma Intercept's chance of a Unique", from: '1%', to: '0.5%' },
  { day: 'October 31, 2026', what: "an Enigma Intercept's chance of a Legendary", from: '15.5%', to: '10%' },
  { day: 'October 31, 2026', what: "an Enigma Intercept's chance of a Mythic", from: '18.5%', to: '24.5%' },
  { day: 'October 31, 2026', what: 'the spare Legendaries a trade-up into a Unique takes', from: '5', to: '10' },
]

/**
 * Gifted copies tradable at once (owner 2026-11-01; app server 20261101213455_market_rules_1101, switch
 * app_config.economy.gift_copies_tradable): shown while LIVE.giftsTradable is on. When the switch goes off, add the
 * reverse change with its own day instead of removing this one.
 */
const GIFTS_TRADABLE: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 1, 2026', what: 'when items we give as gifts, items from a code and the Beta set can be traded', from: 'after 3 real games (gifts: never)', to: 'at once' },
]

/**
 * Trading's gates (owner 2026-11-02; app server app_config.trading.min_friend_days 0 and 20261102002603
 * trade_games_not_level): shown while LIVE.tradeGatesNov2 is on. When a gate changes again, add the change with its
 * own day instead of removing these.
 */
const TRADE_GATES_NOV2: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 2, 2026', what: 'how long two players must be friends before they can trade (friends can trade right away; under-18s still only with friends added in person by Friend Code)', from: '3 days', to: 'right away' },
  { day: 'November 2, 2026', what: 'how old an account must be to trade or use the Black Market', from: '14 days', to: '7 days' },
  { day: 'November 2, 2026', what: 'the play needed to trade or use the Black Market', from: 'level 20', to: '3 counted games' },
]

/**
 * No trade volume limits (owner 2026-11-02; app server app_config.trading, 20261207640000): shown while
 * LIVE.tradeNoLimits is on.
 */
const TRADE_NO_LIMITS: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 2, 2026', what: 'how many trades a player can make in a day (players under 18 still trade only with friends added in person by Friend Code)', from: '5 (players under 18: 3)', to: 'no limit' },
  { day: 'November 2, 2026', what: 'how many items and how much Intel a player can receive by trade in a week', from: 'a weekly limit', to: 'no limit' },
]

/**
 * Unopened Intercepts in friend trades (the app update that offers it; the server's trade_set_intercepts has been live since
 * November 1, with no app calling it): shown while LIVE.interceptsInTrades is on.
 */
const INTERCEPTS_IN_TRADES: { day: string; what: string; from: string; to: string }[] = [
  { day: INTERCEPTS_IN_TRADES_DAY, what: 'whether adults can trade unopened Intercepts with friends (players under 18: never; each counts as one item, and stays sealed through the 7-day protection)', from: 'no', to: 'yes' },
]

/**
 * Unopened Intercepts on the Black Market (owner 2026-11-01; app server 20261101233357_intercepts_market, live
 * 23:33 UTC, i.e. November 1 in New York): shown while LIVE.interceptsMarket is on.
 */
const INTERCEPTS_MARKET: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 1, 2026', what: 'whether adults can buy and sell unopened Intercepts on the Black Market, for Intel only (players under 18: never; minimum prices from the lowest tier to the highest: 8, 15, 50, 113 and 168 Intel)', from: 'no', to: 'yes' },
]

/**
 * What keeps a game from counting toward trading's 3 counted games (decided Nov 3, To-Do code T7, vetoable; app server
 * decided_t7_1103, live 20261103175037): shown while LIVE.audit1103b is on. If he reverses it, add the reverse change with its own day.
 */
const COUNTED_GAMES_NOV3: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 3, 2026', what: 'which other players keep a game from counting toward the 3 counted games needed to trade or use the Black Market', from: 'another account on the same phone or the same sign-up network', to: 'another account on the same phone only' },
]

/**
 * Decided Nov 3, vetoable (To-Do codes T5 and T8; app server decided3_t5_1103, decided3_t8_1103, streak_began_1103): shown while LIVE.audit1103b is on.
 * If one is reversed, add the reverse change with its own day.
 */
const ECONOMY_NOV3: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 3, 2026', what: 'how much Intel one trade between adults can carry', from: '10,000', to: '1,000,000' },
  { day: 'November 3, 2026', what: 'whether a first copy someone bought or got in a trade can be shredded or traded up', from: 'never', to: 'yes, when the player holds another copy of that item' },
  { day: 'November 3, 2026', what: 'which day counts for a streak when a game begins before the daily reset and ends after it', from: 'the day it ended', to: 'the day it began, when that keeps the streak going' },
]

/**
 * The test phase (owner Nov 4 and Nov 6; app server trade_test_phase, trade_intel_test_phase): until the December 7 reset.
 * WT's incident gets its own entry the day it's published. When the phase ends, add the reverse changes with their day.
 */
const TEST_PHASE_NOV: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 6, 2026', what: 'whether adults can trade Intel while SpySocial is being tested (every amount traded goes back on December 7)', from: 'only from the launch', to: 'yes, until December 7' },
  { day: 'November 4, 2026', what: "the account-age, counted-games, new-device and sign-in-change rules for trades and the Black Market while SpySocial is being tested", from: 'on', to: 'off, until December 7' },
]

/** The owner's economy calls of Nov 6 (app server market_own_lock, market_min_fee). */
const MARKET_NOV6: { day: string; what: string; from: string; to: string }[] = [
  { day: 'November 6, 2026', what: 'the fee on a Black Market sale under 50 Intel', from: 'none', to: '1 Intel' },
  { day: 'November 6, 2026', what: 'what closes open Black Market offers and listings', from: 'a trading pause we set, or a change of email we make', to: 'also your own lock, the pause after a reversal, a new device or a change of sign-in, a ban, a suspension and a fair-play hold' },
]

/** Earn-rate, price and odds changes, newest first: the day, what changed, from and to. */
export const RULE_CHANGES: { day: string; what: string; from: string; to: string }[] = [
  ...(LIVE.interceptsInTrades ? INTERCEPTS_IN_TRADES : []),
  ...MARKET_NOV6,
  ...TEST_PHASE_NOV,
  ...(LIVE.audit1103b ? ECONOMY_NOV3 : []),
  ...(LIVE.audit1103b ? COUNTED_GAMES_NOV3 : []),
  ...(LIVE.tradeNoLimits ? TRADE_NO_LIMITS : []),
  ...(LIVE.tradeGatesNov2 ? TRADE_GATES_NOV2 : []),
  ...(LIVE.interceptsMarket ? INTERCEPTS_MARKET : []),
  ...(LIVE.giftsTradable ? GIFTS_TRADABLE : []),
  ...(LIVE.uniquesRarer ? UNIQUES_RARER : []),
]

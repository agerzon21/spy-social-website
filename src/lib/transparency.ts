// The transparency page's published facts (src/pages/Transparency.tsx): the incidents and the rule changes, as the app
// server publishes them (app repo: economy_incidents, Economy Integrity E0 / E1). An incident here is word for word the
// database's row once it's published there, and never changes after (the database refuses to). Add a new one the day
// it's published in the Owner Console.

import { LIVE } from './legalRelease'

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

export const PUBLISHED_INCIDENTS: PublishedIncident[] = [...(LIVE.launchResetIncident ? [I1] : [])]

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

/** Earn-rate, price and odds changes, newest first: the day, what changed, from and to. */
export const RULE_CHANGES: { day: string; what: string; from: string; to: string }[] = [...(LIVE.uniquesRarer ? UNIQUES_RARER : [])]

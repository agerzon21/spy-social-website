/**
 * The Help & FAQ page's words (/support, src/pages/FAQ.tsx): one file per language in ./locales, English the source.
 * Each language's file loads only on the help page, as its own chunk, so the other pages don't carry it.
 *
 * For translators (as src/i18n/locales/en.ts):
 * - Tags: <b>a button's or screen's name</b>; links <terms>, <privacy>, <drawchecks> (Privacy's #drawing-checks), <rules>, <gnr> (the Game Night rules),
 *   <delete> (the Delete Account page), <safety> (the Safety page, plain text while it isn't published), <discord>;
 *   <email/> is replaced whole by the support address. Keep every tag, translate the words inside it.
 * - Every section and question keeps its `id` (the page's #anchors) and its place; the same questions in every
 *   language. Answers are short: one bullet per point.
 * - The app's own words, as the app writes them in your language (the Play Online, Black Market, Intercepts and Intel
 *   names, the tiers, Wax Seal, Friend Code, Locker, Vault and the like).
 * - `o.launch` and the other switches pick a line that is only true from a release (src/lib/legalRelease.ts).
 */

/** What the page reads from src/lib/legalRelease.ts. */
export interface HelpOpts {
  /** Under-18 players' drawings in private rooms get the free check next to another under-18 or no-age player (LIVE.drawingMinorPeer1120). */
  drawingMinorPeer: boolean
  /** Playing games in the browser (play.spysocial.app) is open to everyone (LIVE.browserLinks, flipped when the server's web_beta gate goes off); off: invited testers only. */
  browserPlay: boolean
  /** The 2.2 launch has happened (LIVE.launchSite): Intel moves between players, gift Intercepts stay with you, odds before buying an Intercept. */
  launch: boolean
  /** Memberships are on sale in the released app (LIVE.purchases). */
  purchases: boolean
  /** Saved accounts sign in with an emailed code, not a password (LIVE.passwordless). */
  passwordless: boolean
  /** Everyone sees the game in their own language, whatever room (LIVE.onePool). */
  onePool: boolean
  /** Chat messages are translated automatically (LIVE.autoTranslation). */
  autoTranslation: boolean
  /** The app reads Apple's and Google's age range (LIVE.storeAgeSignals). */
  storeAgeSignals: boolean
  /**
   * Adults trade unopened Intercepts with friends (LIVE.interceptsInTrades: on since update 48, November 7, 2026).
   * TRANSLATIONS UNREVIEWED: these help lines, Safety's interceptsFriendTrades and the Intel History line, in every
   * language but English, are agents' (intercept-trades-1106, econ-calls-1106), not read by a native speaker.
   */
  interceptsInTrades: boolean
  /** Beta 2's Black Market is open to testers for real, Nov 9-16 (LIVE.testerMarket === 'open'). */
  testerMarket: boolean
  /**
   * Rare Finds offers like CSFloat's (LIVE.rarefindsOffers): the seller's discount, counters, a Decline's minimum, 24 h
   * ends, the 30-minute take-back, the offer pause. TRANSLATIONS UNREVIEWED: every language but English is an agent's
   * (rarefinds-offers-1111), not read by a native speaker.
   */
  rarefindsOffers: boolean
  /** The Rare Finds buyer's pushes: a counter, an offer declined or ended (LIVE.rarefindsOfferPush). */
  rarefindsOfferPush: boolean
  /** Update 61 of the app is on phones (LIVE.appU61): Rare Finds' discount choices (5, 10 or 15%) and counters. Off: those two lines hidden. */
  appU61: boolean
  /** A leader whose membership ends closes the party (LIVE.partyLeaderLapse; server party_leader_lapse_1111). */
  partyLeaderLapse: boolean
  /** A party whose leader goes with no member left in it closes for everyone (LIVE.partyNoMember; server party_no_member_1117, row 107). */
  partyNoMember: boolean
  /** Member time and its stamps, reset when a membership ends, and the price kept while a monthly or yearly membership renews (LIVE.memberLoyalty). */
  memberLoyalty: boolean
  /** The testers' thank-you Intercepts trade like anything earned (LIVE.testerIntercepts === 'tradable'); false: they stay with the account. */
  testerInterceptsTradable: boolean
  /** The tester thank-you's counted-game condition (LIVE.testerGiftGame; server tester_gift_game_1111). Off: the old one-line answer. */
  testerGiftGame: boolean
  /**
   * Beta 3's role reveal and Poker Face are on for everyone (LIVE.helpRoleReveal): #role-reveal, #poker-face ("Where Are
   * You Playing?", Online | Same Room) and #voice-chat's line for a call. #talk-out-loud, #drawings-checked and the rest of
   * #voice-chat show either way. TRANSLATIONS UNREVIEWED: every language but English is an agent's (help-u61-1113,
   * help-beta3-1116), in the app's own words for them (app int-u62, u62.13).
   */
  roleReveal: boolean
  /**
   * help-new-1117 (TRANSLATIONS UNREVIEWED: every language but English is an agent's, in the app's own words for each
   * feature, app int/u62-15-prep). Game Night rewards (LIVE.helpGameNightRewards): #game-night-rewards,
   * #game-night-intercepts and #game-night's PRIZES line.
   */
  gnRewards: boolean
  /** The weekly Game Night, Friday and again Saturday (LIVE.launchGameNights): #game-night-weekly. */
  gnWeekly: boolean
  /** Monthly <-> Yearly upgrades in the app and the two-memberships warning (LIVE.helpMembershipSwitch). */
  membershipSwitch: boolean
  /** A Google Play membership stops renewing by itself beside a Lifetime (LIVE.helpGooglePassStop). */
  googlePassStop: boolean
  /** Practice Games for members, 5 a day (LIVE.practiceMembers): #practice-members, #membership-includes' line. */
  practiceMembers: boolean
  /** The Practice Games' AI rating is on (LIVE.practiceAi): #practice-members' AI line. */
  practiceAi: boolean
  /**
   * Every account's Intel to 0 right before launch, earned Intel included, and the streak back to day 0 (LIVE.intelZero1117,
   * the owner's reset answer D1 = zero; howto-truth-1117): #who-can-trade's beta Intel line and #beta-reset's streak line.
   */
  intelZero: boolean
  /**
   * The Game Night rewards replace the night's titles on the server (LIVE.gnRewardsRules, the day NEXT-BATCH row 83 /
   * 999848 is applied, with the Rules page and Terms; stale-help-1118): #who-can-trade's launch line loses the
   * Developer's Pick (no developer's bonus title any more), and until gnRewards (62.15) #game-night's line drops the
   * night's titles and #earn-intercepts drops the winner's Enigma.
   */
  gnRewardsRules: boolean
  /** Spy Talk's Question Rounds (LIVE.helpQuestionRounds): #question-rounds. */
  questionRounds: boolean
  /**
   * App update 62.15.2 is on phones (LIVE.helpU6152, codename-1118): #showcase-items, #intercept-tiers' codename line,
   * #guest-or-saved's Game Over card line and #play-online's Members only line. TRANSLATIONS UNREVIEWED: every language but
   * English is an agent's, in the app's own words for each (int/u62-15-prep: socialProfile showcase, trading.library_open,
   * item_pages.market_site, home.save_nudge, online.members, codes.see_membership; codenames from the Archive's data).
   */
  u6152: boolean
  /**
   * App update 62.15 round 5 is on phones (LIVE.helpU6153, help-u6153-1118): #game-night-intercepts' Blackout line (the Game
   * Night Legendary, formerly The Back Room; rest scene Rain Window), #languages' loader line, #membership-cards,
   * #tablet-keyboard. The Russian codename wording is the Archive's, not here. TRANSLATIONS UNREVIEWED: every language but
   * English is an agent's, in the app's own words (int/u62-15-prep: upsell.*, afterHoursBackdrop names, accountSettings
   * locker.title, membersPage). Rain Window has no app translation: kept in Latin letters in every language.
   */
  u6153: boolean
  /** Version 2.2 signs up and in with an emailed code, older versions with a password (LIVE.emailCodes22): #sign-up-email. */
  emailCodes22: boolean
  /**
   * App round 14 is published (LIVE.guestSaveBeforeBuy, the same flip as the Terms and Privacy lines; help-r14-1120, TRANSLATIONS UNREVIEWED:
   * every language but English is an agent's, in the app's own words, app feat/guest-save-before-buy-1120, fix/match-unseen-warn-1120,
   * fix/a11y-talkback-1120): #guest-or-saved's buy-a-membership line, #play-online's missed-Match-Found warning line (needs server
   * match_unseen_warn_1120, applied before the OTA) and #spy-sketch's screen-reader board line.
   */
  guestSaveBeforeBuy: boolean
  /**
   * Game Night's four tiers and the shred for Game Night Intel are live (LIVE.gnTiers4_1120 with helpGameNightRewards, gn-tiers4-1120,
   * TRANSLATIONS UNREVIEWED: every language but English is an agent's): #game-night-intercepts' tiers (400 / 800 / 1,600 / 3,200),
   * the win-only pay line and its shred line, #duplicates' After Hours line, and the reset line (Game Night Intel from games comes back, not from shredding).
   */
  gnTiers4: boolean
  /**
   * App round 21 (62.21.x) is published (LIVE.helpR21_1123, policy-sync-1122; TRANSLATIONS UNREVIEWED: every language but
   * English is an agent's): #trade-protection and #black-market-protection's Vault tag lines (Trade protected, time left,
   * wearable at once), #game-night-intercepts' "up to 5 at once, opened on the Game Night tab" line.
   */
  r21: boolean
}

export interface HelpItem {
  /** The anchor (#id): the same in every language. */
  id: string
  q: string
  /** One string: a paragraph. Several: bullets. */
  a: string[]
}

export interface HelpSection {
  id: string
  title: string
  items: HelpItem[]
}

export interface HelpText {
  title: string
  lede: string
  /** The search box's label and placeholder. */
  search: string
  searchHint: string
  clear: string
  /** "3 answers" for a search. */
  results: (n: number) => string
  noResults: (query: string) => string
  /** The section list's heading. */
  topics: string
  /** The closing line, before the email address. */
  stillStuck: string
  sections: (o: HelpOpts) => HelpSection[]
}

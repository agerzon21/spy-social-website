/**
 * The press page's own words (www.spysocial.app/press, press-page-1116): English here, the other nine languages in
 * ./locales, each its own chunk (i18n/pageTable). Facts from the press kit draft (Nov 16 refresh, checked against the
 * store text and the live app) and the site's own pages; nothing the owner hasn't settled (no browser play, no role
 * reveal, no founder quote, no store age rating, no pack prices: membership is the only thing sold).
 * The game's own names stay as the app has them (Spy Talk, Spy Sketch, membership names in English); the app's words in each
 * language come from src/help/locales.
 */
import type { LangCode } from '../../i18n'
import { pageTable } from '../../i18n/pageTable'

const en = {
  eyebrow: 'Press kit',
  /** The poster line, set huge before the home hero's full stop: one short word. */
  title: 'Press',
  lede: 'For journalists and creators: what SpySocial is, the key facts, and logos and screenshots to use in your coverage.',
  /** The hero's button: a mail to the press address. */
  email: 'Email the team',
  /** The hero's second link, down to the downloads. */
  toAssets: 'Logos and screenshots',
  about: {
    eyebrow: 'In one paragraph',
    title: 'About SpySocial',
    /** `out` once 2.2 is out. */
    short: (out: boolean): string =>
      `SpySocial is a free party game of bluffing and deduction for 3 to 21 players, each on their own phone or tablet. Everyone knows the secret except the spies. In Spy Talk the secret is a location, and players take turns asking and answering questions. In Spy Sketch it's a word, and players take turns drawing it on one shared board while the spies fake along. Then the table votes. Version 2.2 ${out ? 'came out' : 'comes out'} on iPhone, iPad and Android, with Spy Sketch, Play Online tables, a guided tutorial, Game Night, friends, trading and 10 languages. There are no ads, and the only thing for sale is an optional membership.`,
    moreTitle: 'The longer version',
    /** In this order: the two games, ways to play, languages, progress, what's free. */
    sections: [
      {
        title: 'Two games',
        text: 'In Spy Talk the secret is a location. Players take turns asking and answering questions, typed or dictated with the mic. Be too vague and you look like a spy; be too obvious and the spies learn where you are. In Spy Sketch the secret is a word, drawn turn by turn on one shared board while the spies draw along and try not to get caught. Both play as Classic or as Spy Mafia, where the spies know each other and share a secret chat. Locals win by voting out every spy. Spies win by guessing the secret or by staying hidden until time runs out.',
      },
      {
        title: 'Ways to play',
        text: 'Private rooms hold up to 21 people with their own rules and packs, and friends join by QR code, invite link or room code. Play Online seats you at a table of 4 or 8, where strangers see each other as Agent colors, like Agent Teal, not by name. Game Night is a scheduled online event with titles you can only earn that night. New players start with a guided tutorial of about three minutes, then Practice games against AI agents, graded from A to F.',
      },
      {
        title: '10 languages',
        text: 'English, Spanish, Russian, French, Brazilian Portuguese, Indonesian, Hindi, Bengali, Arabic and Simplified Chinese. Players at one table each see the game in their own language, and chat translates automatically.',
      },
      {
        title: 'Earned by playing',
        text: "Players build a film-noir agent and earn XP, titles, borders and celebrations by playing. Intercepts, sealed files earned by playing, each open to one random item, and the odds show before a player opens one. Players can swap items with friends, and adults can trade on the Black Market for Intel, the game's own money, which is earned only by playing. Real money never buys items, Intercepts or Intel, and none of them has a cash value. Collectibles are not NFTs, tokens or crypto.",
      },
      {
        title: 'Free, with one thing for sale',
        text: 'There are no ads. Spy Talk, Spy Sketch, Game Night, Intercepts, trading and the Black Market are free. The only thing for sale is an optional membership: a Monthly or Yearly Membership, or Lifetime (paid once). It unlocks every premium pack for everyone in a room the member hosts or at their Play Online table, and adds Pack Creator, 50% more XP and members-only tables. No single packs or bundles are sold, and Intercepts and Intel are never sold.',
      },
    ],
  },
  facts: {
    eyebrow: 'At a glance',
    title: 'Fact sheet',
    /** The rows' labels. */
    labels: {
      name: 'Name',
      developer: 'Developer',
      genre: 'Genre',
      platforms: 'Platforms',
      players: 'Players',
      release: 'Release',
      price: 'Price',
      membership: 'Membership',
      languages: 'Languages',
      age: 'Age',
      website: 'Website',
      stores: 'Get it',
      community: 'Community',
      press: 'Press contact',
    },
    developer: 'SpySocial LLC, Pennsylvania, USA',
    genre: 'Social deduction party game',
    platforms: 'iPhone, iPad, and Android phones and tablets. iPhone and Android players play together.',
    players: '3 to 21 in a private room. Play Online: tables of 4 or 8.',
    /** `out` once 2.2 is out; before it, "at full launch" with no date (no fixed launch date in player text). */
    release: (out: boolean): string =>
      out
        ? `Version 2.2 is out now, a free update on the App Store and Google Play.`
        : `Version 2.2 comes out at full launch. SpySocial is already on the App Store and Google Play, and 2.2 is a free update.`,
    price: 'Free to download and play. No ads.',
    /** The US prices, formatted in the page's language: a month, a year, Lifetime. */
    membership: (month: string, year: string, life: string) =>
      `Optional, and the only thing sold: Monthly Membership at ${month} a month or Yearly Membership at ${year} a year (both renew until canceled), or Lifetime at ${life}, paid once. US prices; they vary by country. No single packs or bundles are sold.`,
    languages:
      'English, Spanish, Russian, French, Brazilian Portuguese, Indonesian, Hindi, Bengali, Arabic, Simplified Chinese. All but the first three are marked Beta in the app.',
    age: '13 and up',
    /** <email/> is the press address. */
    press: '<email/>, with “Press” in the subject',
  },
  assets: {
    eyebrow: 'Downloads',
    title: 'Logos and screenshots',
    sub: 'Use them in articles and videos about SpySocial.',
    logoInk: 'Logo for light backgrounds',
    logoCream: 'Logo for dark backgrounds',
    icon: 'App icon',
    banner: 'Banner',
    shotsTitle: 'Screenshots',
    shotsSub: 'From the 2.2 store listing, with captions in the language this page is in. Pick another language at the top of the page for its set.',
    /** A download link's name for screen readers: what it is, then the format ("App icon, PNG"). */
    file: (what: string, format: string) => `${what}, ${format}`,
  },
  safety: {
    eyebrow: 'For parents and platforms',
    title: 'Safety',
    points: [
      'SpySocial is for ages 13 and up.',
      'Players chat only inside a room or a party, with the people in it. There are no direct messages.',
      'Chat filters block slurs and threats. In any room with a player under 18, links, email addresses, phone numbers and social accounts are blocked for everyone.',
      'At Play Online tables, strangers see an Agent color, not a name.',
      'Any player, message, drawing or pack can be reported, and anyone can be blocked. A person reads every report within 24 hours, and reports about child safety or a player under 18 come first.',
    ],
  },
  contact: {
    title: 'Press contact',
    /** <email/> is the press address. */
    text: 'Interviews, review access, or questions about playing SpySocial on your channel: email <email/> with “Press” in the subject.',
  },
}

export type PressStrings = typeof en

const table = pageTable<PressStrings>({ en }, import.meta.glob<{ default: PressStrings }>('./locales/*.ts'))

export function pressStrings(lang: LangCode): PressStrings {
  return table(lang)
}

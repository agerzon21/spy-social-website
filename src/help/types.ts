/**
 * The Help & FAQ page's words (/support, src/pages/FAQ.tsx): one file per language in ./locales, English the source.
 * Each language's file loads only on the help page, as its own chunk, so the other pages don't carry it.
 *
 * For translators (as src/i18n/locales/en.ts):
 * - Tags: <b>a button's or screen's name</b>; links <terms>, <privacy>, <rules>, <gnr> (the Game Night rules),
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
  /** The 2.2 launch has happened (LIVE.launchSite): Intel moves between players, gift Intercepts stay with you. */
  launch: boolean
  /** Memberships are on sale in the released app (LIVE.purchases). */
  purchases: boolean
  /** Saved accounts sign in with an emailed code, not a password (LIVE.passwordless). */
  passwordless: boolean
  /** Everyone sees the game in their own language, whatever room (LIVE.onePool). */
  onePool: boolean
  /** Chat messages are translated automatically (LIVE.autoTranslation). */
  autoTranslation: boolean
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

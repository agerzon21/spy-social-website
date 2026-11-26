import { useSyncExternalStore } from 'react'
import { NEWS as ALL_NEWS, type NewsEntry, type NewsLang, type NewsLink, type NewsText } from './entries'

import { STORES_OPEN } from '../lib/legalRelease'

/** The entries on the site now: one gated 'stores' shows only while STORES_OPEN is on (the same switch as every store button). */
export const NEWS: NewsEntry[] = ALL_NEWS.filter((e) => e.gate !== 'stores' || STORES_OPEN)
export type { NewsEntry, NewsLink }

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

/** An entry's day as the list writes it ('November 24, 2026') at noon UTC, or null if it can't be read. */
function dayOf(text: string): Date | null {
  const m = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(text.trim())
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1
  return m && month >= 0 ? new Date(Date.UTC(Number(m[3]), month, Number(m[2]), 12)) : null
}

/** '2026-11-24' for 'November 24, 2026' (what <time datetime> takes, and what sorts). Unreadable: ''. */
export const isoDay = (text: string): string => dayOf(text)?.toISOString().slice(0, 10) ?? ''

/** Today in Eastern Time, '2026-11-22': the entries' days are Eastern days. */
export function todayEastern(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

const none = () => () => {}
/** The day the build's HTML was drawn for (the page's own data-news-day), so React takes that HTML over as it is. */
const drawnDay = () =>
  (typeof document === 'undefined' ? null : document.querySelector('[data-news-day]')?.getAttribute('data-news-day')) || todayEastern()

/**
 * Today in Eastern Time for the news lists. The build's HTML (scripts/prerender.mjs) was drawn on the build's day:
 * while React takes it over the lists stay as drawn (the page puts the day in data-news-day), then follow today.
 */
export const useNewsDay = (): string => useSyncExternalStore(none, todayEastern, drawnDay)

/** The entries still ahead on `today` (soonest first) and the ones behind (newest first). */
export function newsBy(today: string, entries: NewsEntry[] = NEWS): { upcoming: NewsEntry[]; earlier: NewsEntry[] } {
  const sorted = [...entries].sort((a, b) => isoDay(a.date).localeCompare(isoDay(b.date)))
  const ahead = (e: NewsEntry) => isoDay(e.endDate ?? e.date) >= today
  return { upcoming: sorted.filter(ahead), earlier: sorted.filter((e) => !ahead(e)).reverse() }
}

/** The home page's Latest strip: the next three ahead, or the latest two when nothing is ahead. */
export function latestNews(today: string, entries: NewsEntry[] = NEWS): NewsEntry[] {
  const { upcoming, earlier } = newsBy(today, entries)
  return upcoming.length ? upcoming.slice(0, 3) : earlier.slice(0, 2)
}

/** An entry's words in `lang` (English where the entry has none). */
export const newsText = (entry: NewsEntry, lang: string): NewsText => entry.text[lang as NewsLang] ?? entry.text.en
export const linkLabel = (link: NewsLink, lang: string): string => link.label[lang as NewsLang] ?? link.label.en

/**
 * An entry's day with its weekday, in the page's language: 'Tuesday, November 24, 2026' (`short`: 'Tue, Nov 24');
 * with an endDate, both days ('Friday, December 11 – Saturday, December 12, 2026'). Anything unreadable stays as written.
 */
export function newsDate(entry: NewsEntry, locale: string, short = false): string {
  if (entry.undated) return ''
  const from = dayOf(entry.date)
  if (!from) return entry.date
  const to = entry.endDate ? dayOf(entry.endDate) : null
  try {
    const options: Intl.DateTimeFormatOptions = { weekday: short ? 'short' : 'long', month: short ? 'short' : 'long', day: 'numeric', timeZone: 'UTC' }
    const last = new Intl.DateTimeFormat(locale, short ? options : { ...options, year: 'numeric' })
    // A range names the year once, after its last day.
    return to ? `${new Intl.DateTimeFormat(locale, options).format(from)} – ${last.format(to)}` : last.format(from)
  } catch {
    return entry.endDate ? `${entry.date} – ${entry.endDate}` : entry.date
  }
}

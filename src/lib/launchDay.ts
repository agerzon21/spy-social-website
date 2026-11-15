/** The 2.2 launch day, as the release notes write dates. If the launch moves, change it here: the Roadmap, /hello and the reminder all read it. */
export const LAUNCH_DAY = 'December 8, 2026'

/** The launch day in a language's own format ("December 8", "8 декабря"), kept on one line. */
export const launchDayText = (locale: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric' }).format(new Date(LAUNCH_DAY)).replace(/ /g, ' ')

/** The launch day, short, for a stamp or a big number ("Dec 8", "8 дек."), kept on one line (archive-empty-1115). */
export const launchDayShort = (locale: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(new Date(LAUNCH_DAY)).replace(/ /g, ' ')

/** The launch day with its weekday, in running text ("Tuesday, December 8", "вторник, 8 декабря"; archive-empty-1115). */
export const launchDayWeekday = (locale: string): string =>
  new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(LAUNCH_DAY))

/** The reminder page (src/hello): a plain file, so a full page load, not a router link. */
export const REMINDER_PAGE = '/hello'

/** The 2.2 launch day, as the release notes write dates. If the launch moves, change it here: the Roadmap, /hello and the reminder all read it. */
export const LAUNCH_DAY = 'December 8, 2026'

/** The launch day in a language's own format ("December 8", "8 декабря"), kept on one line. */
export const launchDayText = (locale: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric' }).format(new Date(LAUNCH_DAY)).replace(/ /g, ' ')

/** The reminder page (src/hello): a plain file, so a full page load, not a router link. */
export const REMINDER_PAGE = '/hello'

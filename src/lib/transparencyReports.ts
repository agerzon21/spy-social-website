// The monthly reports on the transparency page (src/pages/Transparency.tsx), newest first. Each entry is pasted as it comes from the
// app's Owner Console > Economy & Items > Transparency Report > Copy Report: the numbers come from the server's records,
// small numbers already hidden, test accounts already left out (app repo: owner_transparency_report, 20261208860000). Don't edit
// a number by hand. That month's rule changes aren't in the entry: the page reads them from RULE_CHANGES (src/lib/transparency.ts).

export type MonthlyReport = {
  /** YYYY-MM, UTC. */
  month: string
  title: string
  /** The day it's due, in words. */
  published: string
  note: string
  sections: { heading: string; lines: string[] }[]
  /** The totals, the file the page offers. */
  csv: string
}

export const MONTHLY_REPORTS: MonthlyReport[] = [
  // Paste the newest report here, above the others.
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** A RULE_CHANGES day ("November 2, 2026") belongs to this report's month (YYYY-MM). */
export function dayInMonth(day: string, month: string): boolean {
  const m = /^([A-Z][a-z]+) \d{1,2}, (\d{4})$/.exec(day)
  if (!m) return false
  const i = MONTHS.indexOf(m[1])
  return i >= 0 && `${m[2]}-${String(i + 1).padStart(2, '0')}` === month
}

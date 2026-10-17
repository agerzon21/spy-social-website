import { Fragment, type ReactNode } from 'react'

/**
 * A translated sentence with its marked parts drawn: `rich('Tap <b>Leave</b>.', { b: (c) => <B>{c}</B> })`.
 * <name>…</name> wraps words (a bold label, a link) and <name/> stands for something the page puts in whole (an
 * email link). Only the names in `parts` are tags; anything else, like the "<code>" in "spysocial.app/join/<code>",
 * is shown as written. Tags don't nest. A part the map lacks for a closing tag shows its words plain.
 */
export type Parts = Record<string, (children: ReactNode) => ReactNode>

export function rich(text: string, parts: Parts = {}): ReactNode {
  const names = Object.keys(parts)
  if (!names.length) return text
  const alt = names.map((n) => n.replace(/[^\w-]/g, '')).join('|')
  const re = new RegExp(`<(${alt})>([\\s\\S]*?)</\\1>|<(${alt})\\s*/>`, 'g')
  const out: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const name = m[1] ?? m[3]
    out.push(<Fragment key={i++}>{parts[name](m[1] ? m[2] : null)}</Fragment>)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out.length === 1 ? out[0] : out
}

/** Bold words, the way the help pages set a button's name. */
export const bold: Parts['b'] = (c) => <b>{c}</b>

/**
 * A date written "October 16, 2026" (legalRelease.ts, the release notes) in the page's language:
 * "16 октября 2026 г.", "2026年10月16日". Anything it can't read stays as written.
 */
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
export function formatDate(text: string, locale: string): string {
  const m = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(text.trim())
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1
  if (!m || month < 0) return text
  try {
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(
      new Date(Date.UTC(Number(m[3]), month, Number(m[2]))),
    )
  } catch {
    return text
  }
}

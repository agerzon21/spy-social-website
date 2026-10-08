// The agreement text format, as the server renders it into the signed PDF
// (spy-social: supabase/functions/agreement/markdown.ts, parseBody). Keep the
// two parsers the same: the page must show the text exactly as it is signed.
//
//   # Title                 the agreement's title (first block)
//   ## 1. Section heading   a heading, one line
//   - item                  a bullet list (every line of the block)
//   anything else           a paragraph (its lines joined with a space)
//
// Blocks are separated by blank lines; {{key}} is a field a party fills in.
// Nothing else is markup: the text is shown as written, never as HTML.

export type Block =
  | { kind: 'title'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'bullets'; items: string[] }

export function parseBody(body: string): Block[] {
  const blocks: Block[] = []
  for (const raw of body.replace(/\r\n?/g, '\n').split(/\n[ \t]*\n/)) {
    const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l !== '')
    if (lines.length === 0) continue
    if (lines.length === 1 && lines[0].startsWith('# ')) {
      blocks.push({ kind: 'title', text: lines[0].slice(2).trim() })
    } else if (lines.length === 1 && lines[0].startsWith('## ')) {
      blocks.push({ kind: 'heading', text: lines[0].slice(3).trim() })
    } else if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ kind: 'bullets', items: lines.map((l) => l.slice(2).trim()) })
    } else {
      blocks.push({ kind: 'paragraph', text: lines.join(' ') })
    }
  }
  return blocks
}

export type Segment = { text: string } | { field: string }

/** A line of text cut at its {{key}} placeholders. */
export function segments(text: string): Segment[] {
  const out: Segment[] = []
  const re = /\{\{([a-z][a-z0-9_]{0,39})\}\}/g
  let last = 0
  for (const m of text.matchAll(re)) {
    const at = m.index ?? 0
    if (at > last) out.push({ text: text.slice(last, at) })
    out.push({ field: m[1] })
    last = at + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

/** One line as the server stores it: NFC, spaces collapsed, trimmed. */
export function cleanLine(v: string): string {
  return v.normalize('NFC').replace(/\s+/g, ' ').trim()
}

/** The same name, ignoring case and spacing (the server's check on the typed signature). */
export function sameName(a: string, b: string): boolean {
  const f = (s: string) => cleanLine(s).normalize('NFKC').toLocaleLowerCase('en-US')
  return f(a) !== '' && f(a) === f(b)
}

export const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

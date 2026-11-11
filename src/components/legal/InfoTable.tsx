import type { CSSProperties, ReactNode } from 'react'
import s from './legal.module.css'

// A two- or three-column table for the legal and safety pages: the first
// column names the thing (bold, with an optional note under it), the others
// say what applies to it. Text wraps in every cell, so the table fits a phone
// screen; it scrolls sideways only if a cell can't wrap. Plain CSS
// (legal.module.css, speed2-1111).

export type InfoRow = {
  /** What the row is about, shown in bold. */
  label: ReactNode
  /** An optional line under the label, such as what the term means. */
  note?: ReactNode
  /** The other columns, in order. */
  cells: ReactNode[]
}

export const InfoTable = ({
  head,
  rows,
  firstWidth = '34%',
}: {
  head: string[]
  rows: InfoRow[]
  firstWidth?: string | { base: string; md: string }
}) => {
  const widths = typeof firstWidth === 'string' ? { base: firstWidth, md: firstWidth } : firstWidth
  const vars = { '--first-w-base': widths.base, '--first-w-md': widths.md } as CSSProperties
  return (
    <div className={s.tableBox}>
      {/* Long names in the narrow first column break at a hyphen, not mid-word. */}
      <table className={s.table} style={vars}>
        <thead className={s.thead}>
          <tr>
            {head.map((h) => (
              <th key={h} className={s.th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={s.row}>
              <td className={s.td}>
                <span className={s.bold}>{row.label}</span>
                {row.note && <p className={`${s.small} ${s.cellNote} ${s.mt1}`}>{row.note}</p>}
              </td>
              {row.cells.map((cell, c) => (
                <td key={c} className={s.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

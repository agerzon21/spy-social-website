import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './LinkRow.module.css'

/**
 * A row that links somewhere (Support's quick links, the social accounts). `to` is a route on this site; `href`
 * leaves it, in a new tab when `newTab`. `arrow` is the trailing glyph (decorative). `ariaLabel` replaces the row's
 * text for screen readers.
 */
export const LinkRow = ({
  to,
  href,
  newTab = false,
  icon,
  label,
  note,
  arrow = '\u2192',
  ariaLabel,
}: {
  to?: string
  href?: string
  newTab?: boolean
  icon?: ReactNode
  label: ReactNode
  note?: ReactNode
  arrow?: string
  ariaLabel?: string
}) => {
  const inner = (
    <>
      {icon && <span className={s.icon} aria-hidden>{icon}</span>}
      <span className={s.label}>{label}</span>
      {note && <span className={s.note}>{note}</span>}
      <span className={s.arrow} aria-hidden>
        {arrow}
      </span>
    </>
  )
  return to ? (
    <Link to={to} className={s.row} aria-label={ariaLabel}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={s.row} aria-label={ariaLabel} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}

/** A group of rows, ruled top and bottom. */
export const LinkRows = ({ children }: { children: ReactNode }) => <div className={s.list}>{children}</div>

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './ui.module.css'

/**
 * A link that looks like a button: `primary` (the accent fill) or `secondary` (an outline). `to` is a route on this
 * site; `href` leaves it, in the same tab unless `newTab`.
 */
const ActionLink = ({
  to,
  href,
  newTab = false,
  tone = 'primary',
  className,
  children,
}: {
  to?: string
  href?: string
  newTab?: boolean
  tone?: 'primary' | 'secondary'
  className?: string
  children: ReactNode
}) => {
  const cls = [s.btn, tone === 'primary' ? s.primary : s.secondary, className].filter(Boolean).join(' ')
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

export default ActionLink

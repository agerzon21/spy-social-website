import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './ui.module.css'

/** A short text link with a leading icon ("Join with a room code"), 44 px tall. */
const IconLink = ({ to, href, icon, children }: { to?: string; href?: string; icon: ReactNode; children: ReactNode }) =>
  to ? (
    <Link to={to} className={s.iconLink}>
      {icon}
      {children}
    </Link>
  ) : (
    <a href={href} className={s.iconLink}>
      {icon}
      {children}
    </a>
  )

export default IconLink

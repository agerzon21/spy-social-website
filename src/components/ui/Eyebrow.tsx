import type { ReactNode } from 'react'
import s from './ui.module.css'

/** A small label over a heading ("How it plays"), led by a short rule. */
const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={className ? `${s.eyebrow} ${className}` : s.eyebrow}>{children}</p>
)

export default Eyebrow

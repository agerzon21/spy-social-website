import type { ReactNode } from 'react'
import s from './ui.module.css'

const SIZE = { 1: s.display1, 2: s.display2, 3: s.display3, 4: s.display4 } as const

/**
 * A poster heading in the skin's display face (Noir: tall condensed capitals). `size` is the look (1 the hero line,
 * 2 a section title, 3 a card title, 4 a small title); `as` is the outline level.
 */
const DisplayHeading = ({
  as: Tag = 'h2',
  size = 2,
  id,
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3'
  size?: 1 | 2 | 3 | 4
  id?: string
  className?: string
  children: ReactNode
}) => (
  <Tag id={id} className={[s.display, SIZE[size], className].filter(Boolean).join(' ')}>
    {children}
  </Tag>
)

export default DisplayHeading

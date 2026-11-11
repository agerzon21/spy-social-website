import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './legal.module.css'

// The text pieces of the legal and safety pages. Their look is the theme's (src/theme), as plain CSS
// (legal.module.css, speed2-1111): section headings in the display face over a rule, running text at reading size,
// links underlined in the link colour.

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2 id={id} className={s.h2}>
    {children}
  </h2>
)

export const H3 = ({ children }: { children: ReactNode }) => <p className={`${s.body} ${s.h3}`}>{children}</p>

export const P = ({ children }: { children: ReactNode }) => <p className={s.body}>{children}</p>

export const Bullets = ({ children }: { children: ReactNode }) => (
  <ul role="list" className={`${s.list} ${s.bullets} ${s.body}`}>
    {children}
  </ul>
)

export const Numbered = ({ children }: { children: ReactNode }) => (
  <ol role="list" className={`${s.list} ${s.numbered} ${s.body}`}>
    {children}
  </ol>
)

/** Bold words inside a sentence, such as a button's name. */
export const B = ({ children }: { children: ReactNode }) => <span className={s.bold}>{children}</span>

export const PageLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className={s.link}>
    {children}
  </Link>
)

export const OutLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className={s.link}>
    {children}
  </a>
)

/** A plain link in the link style (a file to download, a mail address). */
export const TextLink = ({ href, download, children }: { href: string; download?: boolean; children: ReactNode }) => (
  <a href={href} download={download} className={s.link}>
    {children}
  </a>
)

/** support@spysocial.app as a mail link; `subject` fills the subject line. */
export const SupportEmail = ({ subject }: { subject?: string }) => (
  <TextLink href={`mailto:support@spysocial.app${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>support@spysocial.app</TextLink>
)

/** Code or a fingerprint inside a sentence (Chakra's Code: a grey badge); `className` adds the page's own look. */
export const InlineCode = ({ className, children }: { className?: string; children: ReactNode }) => (
  <code className={className ? `${s.code} ${className}` : s.code}>{children}</code>
)

/** A secondary button: a link (`href`, `download`) or a button (`onClick`). */
export const LegalButton = ({
  href,
  download,
  external,
  onClick,
  children,
}: {
  href?: string
  download?: boolean
  external?: boolean
  onClick?: () => void
  children: ReactNode
}) =>
  href ? (
    <a href={href} download={download} className={`${s.button} ${s.secondary}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={`${s.button} ${s.secondary}`}>
      {children}
    </button>
  )

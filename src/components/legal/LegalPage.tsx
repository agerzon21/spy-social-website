import type { ReactNode } from 'react'
import { LanguageNotice } from './LanguageNotice'
import s from './legal.module.css'

/**
 * The frame every legal and safety page shares (Privacy, Terms, Community Rules, Safety, Child Safety, Delete
 * Account): the title, the "Last updated" line under a rule, then the page's passages in one column, sized for
 * reading (about 70 characters a line on a desk).
 * `english`: the page's words are English only for now (the legal pages): in another language the note at the top
 * says so, and the page reads left to right, in English, whatever the site's language. `translated`: a translated
 * page whose English version binds, with the same kind of note (LanguageNotice).
 * Plain CSS (legal.module.css, speed2-1111), no Chakra: the Ledger and the Transparency page also run on the
 * Archive's lean app.
 */
export const LegalPage = ({
  title,
  updated,
  english = false,
  translated = false,
  children,
}: {
  title: ReactNode
  updated: ReactNode
  english?: boolean
  translated?: boolean
  children: ReactNode
}) => (
  <div className={s.page}>
    <div className={s.column}>
      {(english || translated) && <LanguageNotice kind={english ? 'english' : 'translated'} />}
      <div {...(english ? { lang: 'en', dir: 'ltr' } : {})}>
        <div className={s.titleBlock}>
          <h1 className={s.h1}>{title}</h1>
          <p className={`${s.meta} ${s.mt4}`} suppressHydrationWarning>{updated}</p>
          {/* A CSS logical side: it sits at the start of the title whichever way the page reads. */}
          <div className={s.titleRule} aria-hidden />
        </div>
        {/* The title's rule already opens the page: a first section heading needs no second one. No passage is wider
            than the column, so a long address (the Privacy Policy's providers) wraps on a phone. */}
        <div className={s.stack}>{children}</div>
      </div>
    </div>
  </div>
)

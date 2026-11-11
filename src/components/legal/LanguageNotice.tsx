import { useLang, useT } from '../../i18n'
import s from './legal.module.css'

/**
 * The note at the top of a page whose words aren't all in the visitor's language, in that language (nothing in
 * English): `english` for the legal pages, which stay English for now and bind in English; `translated` for a
 * translated page whose English version binds (the Community Rules, part of the Terms; the Safety page), with a
 * way to read it in English; `sections` for Delete Account, whose two Privacy Policy sections stay English.
 * Plain CSS (legal.module.css, speed2-1111).
 */
export const LanguageNotice = ({ kind }: { kind: 'english' | 'translated' | 'sections' }) => {
  const { lang, setLang } = useLang()
  const t = useT().notice
  if (lang === 'en') return null
  const text = kind === 'english' ? t.englishOnly : kind === 'translated' ? t.translated : t.englishSections
  return (
    <div role="note" className={kind === 'sections' ? `${s.notice} ${s.noticeFlush}` : s.notice}>
      <p className={`${s.small} ${s.noticeText}`}>{text}</p>
      {kind === 'translated' && (
        <button type="button" className={`${s.button} ${s.textButton}`} onClick={() => void setLang('en')}>
          {t.readEnglish}
        </button>
      )}
    </div>
  )
}

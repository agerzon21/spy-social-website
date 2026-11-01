import { useT } from '../../i18n'
import { LIVE } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import StoreBadges from '../ui/StoreBadges'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The last word: the stores again. */
const FinalCall = () => {
  const t = useT().home.final
  return (
    <section className={`${s.section} ${s.final}`} aria-labelledby="final-title">
      <div className={ui.wrap}>
        <DisplayHeading id="final-title">{t.title}</DisplayHeading>
        <p className={s.finalText}>
          {t.text}
          {LIVE.purchases ? ` ${t.purchases}` : ''}
        </p>
        <StoreBadges center />
      </div>
    </section>
  )
}

export default FinalCall

import { useT } from '../../i18n'
import { LIVE, STORES_OPEN } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import { LaunchReminder } from '../ui/LaunchReminder'
import StoreBadges from '../ui/StoreBadges'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The last word: the stores again, or until the launch the reminder. */
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
        {STORES_OPEN ? <StoreBadges center /> : <LaunchReminder center />}
      </div>
    </section>
  )
}

export default FinalCall

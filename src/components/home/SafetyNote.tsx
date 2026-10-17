import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import { LIVE, ONLINE_SAFETY_TEXT } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** 13 and up, the reporting tools the app has today (LIVE), the under-18 protections, and the safety pages. */
const SafetyNote = () => {
  const t = useT().home.safety
  return (
    <section className={`${s.section} ${s.flushTop}`} aria-labelledby="safe-title">
      <div className={ui.wrap}>
        <div className={s.safetyBox}>
          <span className={s.age} aria-hidden="true">
            13+
          </span>
          <div>
            <DisplayHeading id="safe-title" className={s.safetyTitle}>
              {t.title}
            </DisplayHeading>
            <p className={s.safetyText}>{t.text({ messages: LIVE.messageReports, drawings: LIVE.drawingCheck })}</p>
            <div className={s.safetyLinks}>
              <Link to="/rules">{t.rules}</Link>
              <Link to="/child-safety">{t.childSafety}</Link>
              {ONLINE_SAFETY_TEXT && <Link to="/safety">{t.safety}</Link>}
              <Link to="/privacy">{t.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SafetyNote

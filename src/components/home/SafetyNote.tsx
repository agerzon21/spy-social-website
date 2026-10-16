import { Link } from 'react-router-dom'
import { LIVE, ONLINE_SAFETY_TEXT } from '../../lib/legalRelease'
import DisplayHeading from '../ui/DisplayHeading'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** 13 and up, the reporting tools the app has today (LIVE), the under-18 protections, and the safety pages. */
const SafetyNote = () => {
  const extra =
    LIVE.messageReports && LIVE.drawingCheck
      ? ', and report a message or a drawing'
      : LIVE.messageReports
        ? ', and report a message'
        : LIVE.drawingCheck
          ? ', and report a drawing'
          : ''
  return (
    <section className={`${s.section} ${s.flushTop}`} aria-labelledby="safe-title">
      <div className={ui.wrap}>
        <div className={s.safetyBox}>
          <span className={s.age} aria-hidden="true">
            13+
          </span>
          <div>
            <DisplayHeading id="safe-title" className={s.safetyTitle}>
              For ages 13 and up
            </DisplayHeading>
            <p className={s.safetyText}>
              Report or block any player{extra}. Rooms with a player under 18 block links, email addresses, phone
              numbers and social accounts for everyone, and reports involving a player under 18 are read first.
            </p>
            <div className={s.safetyLinks}>
              <Link to="/rules">Community rules</Link>
              <Link to="/child-safety">Child safety</Link>
              {ONLINE_SAFETY_TEXT && <Link to="/safety">Safety</Link>}
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SafetyNote

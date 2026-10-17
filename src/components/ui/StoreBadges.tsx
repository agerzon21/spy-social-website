import { FaApple } from 'react-icons/fa'
import { useT } from '../../i18n'
import { APP_STORE_URL, PLAY_STORE_URL } from '../../lib/stores'
import s from './StoreBadges.module.css'

// Google Play's four-colour mark, in its four pieces.
const PlayMark = () => (
  <svg className={`${s.icon} ${s.play}`} viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <path fill="#00A0FF" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
    <path fill="#00E676" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
    <path fill="#FFC400" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
    <path fill="#FF3A44" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
)

/**
 * The two store badges; they open the stores in a new tab. The small line is each store's own wording in the page's
 * language; the badges stay left to right (icon, then words) in Arabic too, as the stores draw them.
 */
const StoreBadges = ({ center = false }: { center?: boolean }) => {
  const t = useT().badges
  return (
    <div className={center ? `${s.row} ${s.center}` : s.row}>
      <a className={s.badge} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t.appStoreLabel} dir="ltr">
        <FaApple className={s.icon} aria-hidden focusable={false} />
        <span className={s.text}>
          <span className={s.small} dir="auto">{t.appStoreSmall}</span>
          <span className={s.large}>App Store</span>
        </span>
      </a>
      <a className={s.badge} href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t.playLabel} dir="ltr">
        <PlayMark />
        <span className={s.text}>
          <span className={`${s.small} ${s.caps}`} dir="auto">{t.playSmall}</span>
          <span className={s.large}>Google Play</span>
        </span>
      </a>
    </div>
  )
}

export default StoreBadges

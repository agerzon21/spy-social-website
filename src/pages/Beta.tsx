import { FaDiscord } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DisplayHeading from '../components/ui/DisplayHeading'
import Eyebrow from '../components/ui/Eyebrow'
import ui from '../components/ui/ui.module.css'
import { useLang, useT } from '../i18n'
import s from './Beta.module.css'

/**
 * /beta between the playtests (site-qa-1113): Beta 2 is over (it still recruited: "$10 PayPal, 24 seats"), Beta 3 is
 * Tuesday, November 24, the final playtest before launch, and its sign-ups aren't open yet, so the page thanks Beta 2's
 * players and sends everyone to Discord to hear first. No form link until Beta 3's form exists. The Beta 2 page is in
 * git history (before this commit). The launch version still sends /beta home (LIVE.launchSite, App.tsx).
 */

const DISCORD_URL = 'https://discord.gg/B8MG3xrV6f'
const SUPPORT_EMAIL = 'support@spysocial.app'

/** Beta 3: Tuesday, November 24, 2026 (the day only, in Eastern time; its hours come with the sign-ups). */
const BETA3_DAY = new Date('2026-11-24T17:00:00Z')

/**
 * Beta 2's session start and the end of its sign-ups. Nothing on this page shows them; the build's /hello page reads
 * them from this file (vite.config.ts helloPage, sourceDate), and hides its Beta 2 strip after the close by itself.
 */
export const START = new Date('2026-11-13T00:00:00Z')
export const CLOSE_SHOWN = new Date('2026-11-09T04:59:00Z')

const Beta = () => {
  const t = useT()
  const h = t.beta.hold
  const { language } = useLang()
  const cut = h.title.lastIndexOf(' ') + 1
  const head = h.title.slice(0, cut)
  const last = h.title.slice(cut)
  const day = new Intl.DateTimeFormat(language.locale, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York' }).format(BETA3_DAY)

  return (
    <div className={s.page}>
      <div className={`${ui.wrap} ${s.hero}`}>
        <div className={s.heroCopy}>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <DisplayHeading as="h1" size={1} className={s.title}>
            {head}
            {/* The full stop never goes to a line of its own (Russian at 320 px): it stays with the last word. */}
            <span className={s.nowrap}>
              {last}
              <span className={s.mark}>{t.home.hero.titleMark}</span>
            </span>
          </DisplayHeading>
          <p className={s.lede}>{h.lede}</p>
        </div>

        <aside className={s.ticket} aria-labelledby="beta-next">
          <p id="beta-next" className={s.ticketLabel}>
            {h.label}
          </p>
          <p className={s.day} suppressHydrationWarning>
            {day}
          </p>
          <p className={s.zones}>{h.note}</p>
          <div className={s.cta}>
            <p className={s.ctaNote}>{h.soon}</p>
            <a href={DISCORD_URL} className={`${ui.btn} ${ui.primary} ${s.go}`} target="_blank" rel="noopener noreferrer">
              <FaDiscord aria-hidden focusable={false} />
              {t.beta.discord}
            </a>
          </div>
        </aside>
      </div>

      {/* Beta 2's fine print stays (legal-batch-1113: when its sign-up data is deleted), with Privacy and support. */}
      <div className={`${ui.wrap} ${s.body}`}>
        <div className={s.fine}>
          <p>{t.beta.fine}</p>
          <p className={s.fineLinks}>
            <Link to="/privacy" className={s.inline}>
              {t.meta.titles.privacy}
            </Link>
            <span aria-hidden="true"> · </span>
            <span className={s.email}>{SUPPORT_EMAIL}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Beta

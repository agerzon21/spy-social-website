/**
 * The optional Europe session (Sat Nov 21, 7-8 PM CET), which runs only if enough people in Europe sign up. The
 * owner decides: true shows it on the page, false hides every mention of it. Nothing else changes.
 */
const EUROPE_SESSION = true

import { useEffect, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import {
  FaAndroid,
  FaApple,
  FaArrowUpRightFromSquare,
  FaComments,
  FaDiscord,
  FaGift,
  FaHeadphones,
  FaLanguage,
  FaPencil,
  FaUserCheck,
  FaUserGroup,
  FaUserSecret,
} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DisplayHeading from '../components/ui/DisplayHeading'
import Eyebrow from '../components/ui/Eyebrow'
import ui from '../components/ui/ui.module.css'
import { LANGUAGES, useLang, useT } from '../i18n'
import { bold, rich } from '../i18n/rich'
import s from './Beta.module.css'

/**
 * /beta: the Beta 2 playtester page (linked from the Reddit bio, Reddit and Discord posts). Phone first: the poster,
 * the session's time (Eastern, Pacific, UTC and the visitor's own, worked out in the browser), the sign-up, then what
 * the test is, who it's for, what we ask, what testers get and how to join. Every time is one instant below, written
 * in the page's language by Intl. At CLOSES_AT the page turns itself to "Sign-ups are closed" (a date check in the
 * browser, no redeploy). Indexed: SiteHead lists it, the sitemap carries it (vite.config.ts) and the build writes a
 * /beta/index.html with its own link preview (vite.config.ts, betaPreview).
 */

const FORM_URL = 'https://forms.gle/RtRy2bQRp2ktwJsw6'
const DISCORD_URL = 'https://discord.gg/B8MG3xrV6f'
const SUPPORT_EMAIL = 'support@spysocial.app'

/** Thursday, November 19, 2026, 7:00-8:00 PM Eastern (EST, UTC-5). */
const START = new Date('2026-11-20T00:00:00Z')
const END = new Date('2026-11-20T01:00:00Z')
/** Check-in on Discord voice: 6:30 PM Eastern. */
const CHECK_IN = new Date('2026-11-19T23:30:00Z')
/** Saturday, November 21, 7:00-8:00 PM CET (6:00-7:00 PM in the UK). */
const EU_START = new Date('2026-11-21T18:00:00Z')
const EU_END = new Date('2026-11-21T19:00:00Z')
/** Sign-ups close Sunday, November 15, 11:59 PM Eastern: the page shows "closed" from the end of that minute. */
const CLOSE_SHOWN = new Date('2026-11-16T04:59:00Z')
const CLOSES_AT = new Date('2026-11-16T05:00:00Z')
/** The confirmation emails go out by Monday, November 16 (also the day the Europe session is confirmed). */
const CONFIRM_BY = new Date('2026-11-16T17:00:00Z')

const ET = 'America/New_York'
const PT = 'America/Los_Angeles'
const CET = 'Europe/Paris'
const UK = 'Europe/London'

/** Intl's formatRange (ES2021; every browser this site supports has it), with a plain "a – b" where it's missing. */
function range(locale: string, opts: Intl.DateTimeFormatOptions, a: Date, b: Date): string {
  const f = new Intl.DateTimeFormat(locale, opts) as Intl.DateTimeFormat & { formatRange?: (x: Date, y: Date) => string }
  return f.formatRange ? f.formatRange(a, b) : `${f.format(a)} – ${f.format(b)}`
}
const fmt = (locale: string, opts: Intl.DateTimeFormatOptions, d: Date) => new Intl.DateTimeFormat(locale, opts).format(d)
/**
 * A time or a date with a time kept on one line: its spaces become no-break ones (a thin space a narrow one). On a
 * right-to-left page (Arabic) each run of Latin digits from one hour to the other ("7:00–8:00") is isolated left to
 * right, or the bidi algorithm would show the range back to front ("8:00–7:00").
 */
const RANGE = /\d{1,2}[:.]\d{2}[\s\u2009\u202f]*[–-][\s\u2009\u202f]*\d{1,2}[:.]\d{2}/g
const nb = (text: string, rtl = false) => {
  const kept = text.replace(/ /g, '\u00a0').replace(/\u2009/g, '\u202f')
  return rtl ? kept.replace(RANGE, (run) => `\u2066${run}\u2069`) : kept
}

const HM: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }
const DAY: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
const SHORT_DAY: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }

/** Whether sign-ups have closed, turning over by itself if the page is open at the moment they close. */
function useClosed(): boolean {
  const [closed, setClosed] = useState(() => Date.now() >= CLOSES_AT.getTime())
  useEffect(() => {
    if (closed) return
    const wait = CLOSES_AT.getTime() - Date.now()
    // setTimeout can't wait longer than ~24.8 days; a page open that long checks again when it's reloaded.
    if (wait > 2_000_000_000) return
    const id = window.setTimeout(() => setClosed(true), Math.max(0, wait))
    return () => window.clearTimeout(id)
  }, [closed])
  return closed
}

/** The visitor's own time zone, or none if the browser won't say. */
function visitorZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined
  } catch {
    return undefined
  }
}

const External = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
  <a href={href} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

/** A section of the page: its small label and title, then its content. */
const Section = ({
  id,
  area,
  eyebrow,
  title,
  children,
}: {
  id: string
  /** Its place in the two columns on a computer (Beta.module.css). */
  area: string
  eyebrow: string
  title: string
  children: ReactNode
}) => (
  <section className={`${s.section} ${area}`} aria-labelledby={id}>
    <Eyebrow className={s.sectionEyebrow}>{eyebrow}</Eyebrow>
    <DisplayHeading id={id} size={3} className={s.sectionTitle}>
      {title}
    </DisplayHeading>
    {children}
  </section>
)

/** A line with an icon at its start. */
const IconItem = ({ icon: Icon, children }: { icon: IconType; children: ReactNode }) => (
  <li className={s.iconItem}>
    <Icon className={s.itemIcon} aria-hidden focusable={false} />
    <div className={s.itemBody}>{children}</div>
  </li>
)

const Beta = () => {
  const t = useT()
  const b = t.beta
  const { language } = useLang()
  const locale = language.locale
  const rtl = language.rtl
  const closed = useClosed()
  const zone = visitorZone()

  // The session in Eastern time (the one the page leads with), then Pacific, UTC and the visitor's own.
  const day = fmt(locale, { ...DAY, timeZone: ET }, START)
  const et = nb(range(locale, { ...HM, timeZone: ET }, START, END), rtl)
  const pacific = nb(fmt(locale, { ...HM, timeZone: PT }, START), rtl)
  const utc = nb(range(locale, { ...SHORT_DAY, hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }, START, END), rtl)
  const yours = zone ? nb(range(locale, { ...SHORT_DAY, ...HM, timeZoneName: 'short', timeZone: zone }, START, END), rtl) : null
  const checkIn = nb(fmt(locale, { ...HM, timeZone: ET }, CHECK_IN), rtl)

  const euDay = fmt(locale, { ...DAY, timeZone: CET }, EU_START)
  const cet = nb(range(locale, { ...HM, timeZone: CET }, EU_START, EU_END), rtl)
  const uk = nb(range(locale, { ...HM, timeZone: UK }, EU_START, EU_END), rtl)
  const euYours = zone ? nb(range(locale, { ...SHORT_DAY, ...HM, timeZoneName: 'short', timeZone: zone }, EU_START, EU_END), rtl) : null

  const closeDay = fmt(locale, { ...DAY, timeZone: ET }, CLOSE_SHOWN)
  const closeTime = nb(fmt(locale, { ...HM, timeZone: ET }, CLOSE_SHOWN), rtl)
  const confirmDay = fmt(locale, { ...DAY, timeZone: ET }, CONFIRM_BY)
  const confirmDate = fmt(locale, { month: 'long', day: 'numeric', timeZone: ET }, CONFIRM_BY)

  const formLink = (c: ReactNode) => (
    <External href={FORM_URL} className={s.inline}>
      {c}
    </External>
  )
  const discordLink = (c: ReactNode) => (
    <External href={DISCORD_URL} className={s.inline}>
      {c}
    </External>
  )

  return (
    <div className={s.page}>
      {/* ---- the poster and the ticket ---- */}
      <div className={`${ui.wrap} ${s.hero}`}>
        <div className={s.heroCopy}>
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <DisplayHeading as="h1" size={1} className={s.title}>
            {b.title}
            <span className={s.mark}>{t.home.hero.titleMark}</span>
          </DisplayHeading>
          <p className={s.lede}>{rich(b.lede, { b: bold })}</p>
          <ul className={s.facts}>
            {b.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <aside className={s.ticket} aria-labelledby="beta-when">
          <p id="beta-when" className={s.ticketLabel}>
            {b.when.label}
          </p>
          <p className={s.day}>{day}</p>
          <p className={s.time}>{b.when.et(et)}</p>
          <p className={s.zones}>{b.when.others(pacific, utc)}</p>
          {yours && <p className={s.yours}>{b.when.yours(yours)}</p>}
          <p className={s.checkIn}>
            <FaHeadphones className={s.checkIcon} aria-hidden focusable={false} />
            <span>{b.when.checkIn(checkIn)}</span>
          </p>

          <div className={s.cta}>
            {closed ? (
              <>
                <p className={s.closed} role="status">
                  {b.closed}
                </p>
                <External href={DISCORD_URL} className={`${ui.btn} ${ui.primary} ${s.go}`}>
                  <FaDiscord aria-hidden focusable={false} />
                  {b.discord}
                </External>
              </>
            ) : (
              <>
                <External href={FORM_URL} className={`${ui.btn} ${ui.primary} ${s.go}`}>
                  {b.signUp}
                  <FaArrowUpRightFromSquare className={s.goIcon} aria-hidden focusable={false} />
                </External>
                <p className={s.ctaNote}>{b.signUpNote(closeDay, closeTime)}</p>
                <External href={DISCORD_URL} className={`${ui.btn} ${ui.secondary} ${s.go}`}>
                  <FaDiscord aria-hidden focusable={false} />
                  {b.discord}
                </External>
              </>
            )}
          </div>

          {EUROPE_SESSION && (
            <div className={s.europe}>
              <p className={s.ticketLabel}>{b.europe.label}</p>
              <p className={s.euDay}>{euDay}</p>
              <p className={s.euTime}>{b.europe.time(cet, uk)}</p>
              {euYours && <p className={s.yours}>{b.when.yours(euYours)}</p>}
              <p className={s.euNote}>{b.europe.note(confirmDate)}</p>
            </div>
          )}
        </aside>
      </div>

      <div className={`${ui.wrap} ${s.body}`}>
        {/* ---- the two games ---- */}
        <Section id="beta-games" area={s.areaGames} eyebrow={b.games.eyebrow} title={b.games.title}>
          <ul className={s.games}>
            <li className={s.game}>
              <FaComments className={s.gameIcon} aria-hidden focusable={false} />
              <DisplayHeading as="h3" size={4}>
                {t.home.how.talk.name}
              </DisplayHeading>
              <p>{b.games.talk}</p>
            </li>
            <li className={s.game}>
              <FaPencil className={s.gameIcon} aria-hidden focusable={false} />
              <DisplayHeading as="h3" size={4}>
                {t.home.how.sketch.name}
              </DisplayHeading>
              <p>{b.games.sketch}</p>
            </li>
          </ul>
        </Section>

        {/* ---- who it's for ---- */}
        <Section id="beta-who" area={s.areaWho} eyebrow={b.who.eyebrow} title={b.who.title}>
          <ul className={s.list}>
            <IconItem icon={FaUserCheck}>
              <p>{rich(b.who.adults, { b: bold })}</p>
            </IconItem>
            <IconItem icon={FaAndroid}>
              <p>{rich(b.who.phones, { b: bold })}</p>
              <ul className={s.chips} aria-label={b.who.androidLabel}>
                {['Samsung A', 'Pixel', 'Motorola', 'OnePlus', 'Xiaomi'].map((brand) => (
                  <li key={brand} dir="ltr">
                    {brand}
                  </li>
                ))}
              </ul>
            </IconItem>
            <IconItem icon={FaUserSecret}>
              <p>{rich(b.who.fans, { b: bold })}</p>
            </IconItem>
            <IconItem icon={FaHeadphones}>
              <p>{rich(b.who.mic, { b: bold })}</p>
            </IconItem>
            <IconItem icon={FaLanguage}>
              <p>{rich(b.who.langs, { b: bold })}</p>
              <ul className={s.chips} aria-label={b.who.langsLabel}>
                {LANGUAGES.map((l) => (
                  <li key={l.code} lang={l.code} dir={l.rtl ? 'rtl' : 'ltr'}>
                    {l.native}
                  </li>
                ))}
              </ul>
            </IconItem>
          </ul>
        </Section>

        {/* ---- what we ask, and what we want to find out ---- */}
        <Section id="beta-ask" area={s.areaAsk} eyebrow={b.ask.eyebrow} title={b.ask.title}>
          <ol className={s.steps}>
            {b.ask.steps.map((step) => (
              <li key={step}>
                <span>{rich(step, { b: bold })}</span>
              </li>
            ))}
          </ol>
          <p className={s.subhead}>{b.ask.wantTitle}</p>
          <ul className={s.questions}>
            {b.ask.want.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </Section>

        {/* ---- what testers get ---- */}
        <Section id="beta-get" area={s.areaGet} eyebrow={b.get.eyebrow} title={b.get.title}>
          <p className={s.keep}>{b.get.keep}</p>
          <ul className={s.rewards}>
            {b.get.items.map((item) => (
              <li key={item}>
                <span>{rich(item, { b: bold })}</span>
              </li>
            ))}
          </ul>
          <div className={s.prize}>
            <FaGift className={s.prizeIcon} aria-hidden focusable={false} />
            <div>
              <p className={s.prizeTitle}>{b.get.prizeTitle}</p>
              <p className={s.prizeText}>{b.get.prize}</p>
            </div>
          </div>
        </Section>

        {/* ---- friends and how to join: only while sign-ups are open (closed, the ticket says so and links Discord) ---- */}
        {!closed && (
          <>
            <Section id="beta-friends" area={s.areaFriends} eyebrow={b.friends.eyebrow} title={b.friends.title}>
              <ul className={s.list}>
                <IconItem icon={FaUserGroup}>
                  <p>{rich(b.friends.text, { b: bold })}</p>
                </IconItem>
              </ul>
            </Section>

            <Section id="beta-join" area={s.areaJoin} eyebrow={b.join.eyebrow} title={b.join.title}>
              <ol className={s.joinSteps}>
                <li>
                  <span>{rich(b.join.form, { link: formLink })}</span>
                </li>
                <li>
                  <span>{b.join.closes(closeDay, closeTime)}</span>
                </li>
                <li>
                  <span>{b.join.email(confirmDay)}</span>
                </li>
                <li>
                  <span>{rich(b.join.discord, { link: discordLink })}</span>
                </li>
              </ol>
              <div className={s.devices}>
                <p>
                  <FaAndroid className={s.deviceIcon} aria-hidden focusable={false} />
                  <span>{b.join.android}</span>
                </p>
                <p>
                  <FaApple className={s.deviceIcon} aria-hidden focusable={false} />
                  <span>{b.join.iphone}</span>
                </p>
              </div>
            </Section>
          </>
        )}

        {/* ---- the fine print ---- */}
        <div className={s.fine}>
          <p>{b.fine}</p>
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

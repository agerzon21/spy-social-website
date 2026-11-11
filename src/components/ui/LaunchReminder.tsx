import { useId, useRef, useState, type FormEvent } from 'react'
import { FaDiscord } from 'react-icons/fa6'
import Link from '../SiteLink'
import { HELLO_STRINGS } from '../../hello/strings'
import { useLang, useT } from '../../i18n'
import { launchDayText, REMINDER_PAGE } from '../../lib/launchDay'
import { askForReminder, looksLikeEmail, type ReminderResult } from '../../lib/launchReminder'
import { DISCORD_URL } from '../../lib/social'
import ui from './ui.module.css'
import s from './LaunchReminder.module.css'

/**
 * Until the launch (STORES_OPEN off, src/lib/legalRelease.ts), what stands where the store buttons will: the launch
 * reminder, in the words and look of /hello (src/hello). A filled honeypot sends nothing and shows success.
 */
export const LaunchReminder = ({ center = false }: { center?: boolean }) => {
  const { lang, language } = useLang()
  const w = HELLO_STRINGS[lang].remind
  const day = launchDayText(language.locale)
  const id = useId()
  const emailRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(false)
  const [trap, setTrap] = useState('')
  const [state, setState] = useState<ReminderResult | 'idle' | 'sending'>('idle')

  const finish = (result: ReminderResult) => {
    setState(result)
    if (result === 'done') window.setTimeout(() => doneRef.current?.focus(), 0)
    if (result === 'bad') emailRef.current?.focus()
    if (result === 'age') ageRef.current?.focus()
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (state === 'sending') return
    if (trap) return finish('done')
    const address = email.trim()
    if (!looksLikeEmail(address)) return finish('bad')
    if (!age) return finish('age')
    setState('sending')
    finish(await askForReminder(address, lang))
  }

  const message = state === 'bad' ? w.badEmail : state === 'age' ? w.ageMissing : state === 'busy' ? w.busy : state === 'no' ? w.refused : state === 'net' ? w.network : null

  return (
    <div className={center ? `${s.remind} ${s.center}` : s.remind}>
      {state === 'done' ? (
        <div ref={doneRef} className={s.done} role="status" tabIndex={-1}>
          <p className={s.doneTitle}>{w.done}</p>
          <p className={s.doneDetail}>{w.doneDetail(day)}</p>
        </div>
      ) : (
        <form className={s.form} onSubmit={submit} noValidate>
          <input
            ref={emailRef}
            className={s.email}
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="off"
            spellCheck={false}
            required
            placeholder={w.email}
            aria-label={w.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={s.age} htmlFor={`${id}-age`}>
            <input ref={ageRef} id={`${id}-age`} type="checkbox" required checked={age} onChange={(e) => setAge(e.target.checked)} />
            <span>{w.age}</span>
          </label>
          <label className={s.trap} aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
          </label>
          {message && (
            <p className={s.message} role="alert">
              {message}
            </p>
          )}
          <button className={`${ui.btn} ${ui.primary} ${s.send}`} type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? w.sending : w.button(day)}
          </button>
        </form>
      )}
      <p className={s.note}>
        {w.note}{' '}
        <Link to="/privacy#launch-reminder" className={s.noteLink}>
          {w.privacy}
        </Link>
      </p>
    </div>
  )
}

/** The launch day, set huge, and the plain words about the version in the stores: the home hero's, as on /hello. */
export const LaunchDate = () => {
  const { lang, language } = useLang()
  const w = HELLO_STRINGS[lang]
  return (
    <div className={s.when}>
      <p className={s.before}>{w.before}</p>
      <p className={s.day}>{launchDayText(language.locale)}</p>
      {w.after && <p className={s.before}>{w.after}</p>}
      <p className={s.stores}>
        {w.stores} <b>{w.wait}</b>
      </p>
    </div>
  )
}

/** The Discord link beside the reminder: the second way to hear about the launch. */
export const DiscordLink = () => {
  const t = useT().beta
  return (
    <a className={`${ui.btn} ${ui.secondary} ${s.discord}`} href={DISCORD_URL} rel="noopener noreferrer">
      <FaDiscord aria-hidden focusable={false} />
      {t.discord}
    </a>
  )
}

/** One line for the pages that had store buttons: the launch day and a link to the reminder page. */
export const LaunchLine = ({ note }: { note?: boolean }) => {
  const { lang, language } = useLang()
  const w = HELLO_STRINGS[lang]
  const day = launchDayText(language.locale)
  return (
    <p className={s.line}>
      {note && <span className={s.lineNote}>{w.joinStores} </span>}
      <span>{w.launchLine(day)} </span>
      <a href={REMINDER_PAGE} className={s.lineLink}>
        {w.remind.button(day)}
      </a>
    </p>
  )
}

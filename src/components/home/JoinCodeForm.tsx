import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { joinPath, keepCodeChars, looksLikeLink } from '../../lib/roomCode'
import ui from '../ui/ui.module.css'
import s from './JoinCodeForm.module.css'

/**
 * Type a room code (or paste an invite link) and JOIN opens this site's /join page for it, which hands it to the
 * app on a phone and shows the stores elsewhere. A typed code goes as /join/CODE?p=CODE so that a code the host
 * changed works too (lib/roomCode.ts).
 */
const JoinCodeForm = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const target = useMemo(() => joinPath(value), [value])

  const onChange = (raw: string) => setValue(looksLikeLink(raw) ? raw : keepCodeChars(raw))
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (target) navigate(target)
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <label htmlFor="room-code" className={s.label}>
        Room code
      </label>
      <input
        id="room-code"
        className={s.input}
        name="code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="go"
        // Long enough for a pasted invite link; a code is cut to 8 characters as it's typed.
        maxLength={200}
        placeholder="ABC123"
        aria-describedby="room-code-note"
      />
      <button type="submit" className={`${ui.btn} ${ui.primary}`} aria-disabled={!target}>
        Join
      </button>
      <p id="room-code-note" className={s.note}>
        The code on the host's screen, 4 to 8 letters and numbers.
      </p>
    </form>
  )
}

export default JoinCodeForm

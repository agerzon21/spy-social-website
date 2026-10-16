import { useColorMode } from '@chakra-ui/react'
import type { MouseEvent } from 'react'
import { rememberTheme, switchTheme, type ThemeName } from '../theme/mode'
import s from './ThemeToggle.module.css'

const Moon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a.6.6 0 0 0-.8-.7A9.6 9.6 0 1 0 20.9 15.4a.6.6 0 0 0-.7-.8Z" />
  </svg>
)
const Sun = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.6" fill="currentColor" />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7"
    />
  </svg>
)

/**
 * The header's light / dark switch: a slim pill with a sliding knob, the moon in it on the dark pages and the sun
 * on the light ones; the other end of the track shows where it goes. A real switch (role switch, on = light), by
 * tap, click, Enter or Space, in a 44 px target. The choice is kept for the next visit (src/theme/mode.ts).
 */
const ThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode()
  const light = colorMode === 'light'

  const flip = (e: MouseEvent<HTMLButtonElement>) => {
    const next: ThemeName = light ? 'dark' : 'light'
    rememberTheme(next)
    switchTheme(next, setColorMode, e.currentTarget)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className={s.toggle}
      data-theme-toggle=""
      onClick={flip}
    >
      <span className={s.track} aria-hidden="true">
        <Sun className={`${s.end} ${s.endSun}`} />
        <Moon className={`${s.end} ${s.endMoon}`} />
        <span className={s.knob}>
          <Moon className={`${s.glyph} ${s.moon}`} />
          <Sun className={`${s.glyph} ${s.sun}`} />
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle

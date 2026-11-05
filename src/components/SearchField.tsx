import s from './SearchField.module.css'

/** The site's search box: a magnifier, the field, and Clear once there's text. Used by Help & FAQ and the ledger. */
export const SearchField = ({
  value,
  onChange,
  label,
  hint,
  clear,
  className,
}: {
  value: string
  onChange: (value: string) => void
  /** The field's accessible name ("Search help"). */
  label: string
  /** The placeholder ("Try “vote” or “trade”"). */
  hint: string
  /** The Clear button's word. */
  clear: string
  /** Spacing from the page (a margin). */
  className?: string
}) => (
  <form className={className ? `${s.search} ${className}` : s.search} role="search" onSubmit={(e) => e.preventDefault()}>
    <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input
      className={value ? `${s.input} ${s.withClear}` : s.input}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={hint}
      aria-label={label}
      enterKeyHint="search"
      autoComplete="off"
      spellCheck={false}
    />
    {value && (
      <button type="button" className={s.clear} onClick={() => onChange('')}>
        {clear}
      </button>
    )}
  </form>
)

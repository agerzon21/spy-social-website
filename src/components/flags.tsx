import type { ReactNode } from 'react'
import type { FlagCode } from '../i18n/languages'

/**
 * The language menu's little flags, drawn here (Windows shows emoji flags as two letters). Simplified at this size:
 * no coats of arms, a few stars for the US, the Saudi script and sword as strokes. 3:2, viewBox 30 x 20. They're
 * decoration: the language's name next to each says what it is.
 */

/** A five-pointed star centred on (cx, cy), point up, `r` to the points. */
const star = (cx: number, cy: number, r: number, turn = 0) => {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const a = ((i * 36 - 90 + turn) * Math.PI) / 180
    const d = i % 2 ? r * 0.382 : r
    pts.push(`${(cx + d * Math.cos(a)).toFixed(2)},${(cy + d * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

const stripes = (colours: string[], vertical = false) =>
  colours.map((c, i) =>
    vertical ? (
      <rect key={i} x={(30 / colours.length) * i} y="0" width={30 / colours.length + 0.01} height="20" fill={c} />
    ) : (
      <rect key={i} x="0" y={(20 / colours.length) * i} width="30" height={20 / colours.length + 0.01} fill={c} />
    ),
  )

const US = () => (
  <>
    <rect width="30" height="20" fill="#fff" />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x="0" y={i * (40 / 13)} width="30" height={20 / 13} fill="#B22234" />
    ))}
    <rect width="13" height={(20 / 13) * 7} fill="#3C3B6E" />
    {[2.2, 6.5, 10.8].flatMap((x, col) =>
      [2.2, 5.4, 8.6].map((y, row) => <circle key={`${col}-${row}`} cx={x} cy={y} r="0.75" fill="#fff" />),
    )}
  </>
)

const FLAGS: Record<FlagCode, () => ReactNode> = {
  us: US,
  es: () => (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
  ru: () => <>{stripes(['#fff', '#0039A6', '#D52B1E'])}</>,
  cn: () => (
    <>
      <rect width="30" height="20" fill="#EE1C25" />
      <polygon points={star(5, 5, 3)} fill="#FFFF00" />
      <polygon points={star(10, 2, 1, 23)} fill="#FFFF00" />
      <polygon points={star(12, 4, 1, 45)} fill="#FFFF00" />
      <polygon points={star(12, 7, 1, 70)} fill="#FFFF00" />
      <polygon points={star(10, 9, 1, 20)} fill="#FFFF00" />
    </>
  ),
  in: () => (
    <>
      {stripes(['#FF9933', '#fff', '#138808'])}
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.6" />
      <circle cx="15" cy="10" r="0.7" fill="#000080" />
      <path
        d="M15 7.4v5.2M12.4 10h5.2M13.16 8.16l3.68 3.68M16.84 8.16l-3.68 3.68"
        stroke="#000080"
        strokeWidth="0.3"
      />
    </>
  ),
  sa: () => (
    <>
      <rect width="30" height="20" fill="#006C35" />
      {/* The shahada, as a line of script-like strokes, and the sword under it. */}
      <path
        d="M7.5 8.6c1-1.6 2.2-1.6 3 0s2-1.6 3 0 2-1.6 3 0 2-1.6 3 0 2-1.6 3.5-.2M9 6.2v2.4M14.8 5.6v3M19.6 6v2.6"
        fill="none"
        stroke="#fff"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path d="M8 13.4h14.2l1.2-.6M9.6 12.2v2.4" fill="none" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" />
    </>
  ),
  fr: () => <>{stripes(['#002654', '#fff', '#CE1126'], true)}</>,
  bd: () => (
    <>
      <rect width="30" height="20" fill="#006A4E" />
      <circle cx="13.5" cy="10" r="6" fill="#F42A41" />
    </>
  ),
  br: () => (
    <>
      <rect width="30" height="20" fill="#009C3B" />
      <polygon points="15,2.2 27.4,10 15,17.8 2.6,10" fill="#FFDF00" />
      <circle cx="15" cy="10" r="4.6" fill="#002776" />
      <path d="M10.5 9.1c3-.9 6.3-.3 8.9 1.7" fill="none" stroke="#fff" strokeWidth="0.85" />
    </>
  ),
  id: () => (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="10" fill="#CE1126" />
    </>
  ),
}

/** A flag, `className` sizing it. */
export const Flag = ({ code, className }: { code: FlagCode; className?: string }) => {
  const Draw = FLAGS[code]
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 30 20" preserveAspectRatio="none" focusable="false">
        <Draw />
      </svg>
    </span>
  )
}

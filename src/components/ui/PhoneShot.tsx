import s from './ui.module.css'

/** An app screenshot (660 x 1428) in a thin phone frame. */
const PhoneShot = ({
  src,
  alt,
  small = false,
  eager = false,
  className,
}: {
  src: string
  alt: string
  small?: boolean
  eager?: boolean
  className?: string
}) => (
  <div className={[s.phone, small ? s.phoneSmall : '', className].filter(Boolean).join(' ')}>
    <img src={src} alt={alt} width={660} height={1428} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  </div>
)

export default PhoneShot

import { useT } from '../i18n'
import DisplayHeading from './ui/DisplayHeading'
import ui from './ui/ui.module.css'
import s from './ReloadNotice.module.css'

/**
 * What a page shows when its part of the site wouldn't load after lib/lazyPage's three reloads (a deploy's files not
 * on every edge yet, or a dropped connection): a short line and a Reload button, instead of a blank page. In the
 * reader's language (the site's table, loaded before the first paint).
 */
const ReloadNotice = () => {
  const t = useT().common
  return (
    <div className={ui.wrap}>
      <div className={s.box} role="alert">
        <DisplayHeading as="h2" size={4}>
          {t.reloadTitle}
        </DisplayHeading>
        <p className={s.text}>{t.reloadText}</p>
        <button type="button" className={`${ui.btn} ${ui.primary}`} onClick={() => window.location.reload()}>
          {t.reload}
        </button>
      </div>
    </div>
  )
}

export default ReloadNotice

import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { HOST, originOf, placeOf } from '../lib/siteHost'

/**
 * The catch-all route (App.tsx). A page that lives on another host (lib/siteHost) goes there with its query and hash:
 * www.spysocial.app/archive/uniques to archive.spysocial.app/uniques, archive.spysocial.app/ledger to
 * www.spysocial.app/ledger. vercel.json sends the typed addresses on the server already; this covers the router's own
 * moves. Anything else is `children`, the 404 page.
 */
const OffHost = ({ children }: { children: ReactNode }) => {
  const { pathname, search, hash } = useLocation()
  const { host, path } = placeOf(pathname)
  const away = host !== HOST
  useEffect(() => {
    if (away) window.location.replace(`${originOf(host)}${path}${search}${hash}`)
  }, [away, host, path, search, hash])
  return away ? null : <>{children}</>
}

export default OffHost

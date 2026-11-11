import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { siteTarget } from '../lib/siteHost'

/**
 * A link to one of the site's pages by its canonical path ('/ledger', '/archive/uniques', '/market/item/<code>'):
 * a router link while the page is on this host, a plain link to its full address on another
 * (archive.spysocial.app, market.spysocial.app, www.spysocial.app; lib/siteHost).
 */
const SiteLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'> & { to: string }>(({ to, replace, state, reloadDocument, preventScrollReset, relative, ...rest }, ref) => {
  const target = siteTarget(to)
  return 'to' in target ? (
    <Link ref={ref} to={target.to} replace={replace} state={state} reloadDocument={reloadDocument} preventScrollReset={preventScrollReset} relative={relative} {...rest} />
  ) : (
    <a ref={ref} href={target.href} {...rest} />
  )
})
SiteLink.displayName = 'SiteLink'

export default SiteLink

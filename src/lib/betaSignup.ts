import { useEffect, useState } from 'react'

/** Beta 2 sign-ups close Sunday, November 8, 11:59 PM Eastern (Nov 9, 05:00 UTC). The /beta page and the footer link both read this. */
export const CLOSES_AT = new Date('2026-11-09T05:00:00Z')

/** Whether sign-ups have closed, turning over by itself if the page is open at the moment they close. */
export function useClosed(): boolean {
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

import { useSyncExternalStore } from 'react'

const none = () => () => {}

/**
 * A value only the browser knows (the platform, whether there's a document to portal into): `server` while React
 * hydrates the HTML the build drew (www-speed-1112, scripts/prerender.mjs), which has to match, then `get()` at once;
 * `get()` from the start on a page React draws itself. `get` must return the same value each time it's called.
 */
export const useClientValue = <T,>(get: () => T, server: T): T => useSyncExternalStore(none, get, () => server)

/**
 * The head start a host's page gave a read (speed-1111: vite.config.ts earlyScript runs before the app's modules
 * arrive and keeps each fetch in window.__ssEarly under its address). The first read of that address takes it; any
 * later one, or one the page didn't start, fetches as usual. A failed head start is fetched again.
 */
export function early(url: string): Promise<Response> {
  const kept = typeof window === 'undefined' ? undefined : (window as unknown as { __ssEarly?: Record<string, Promise<Response>> }).__ssEarly
  const p = kept?.[url]
  if (!p) return fetch(url)
  delete kept[url]
  return p.catch(() => fetch(url))
}

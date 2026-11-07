/**
 * Asks for the launch reminder: the anon RPC launch_reminder_signup(p_email, p_age_ok, p_lang), answering {ok: true} or
 * {ok: false, reason: age | lang | email | busy | closed}. Always POST, so an address never sits in a URL. public/hello/hello.js
 * does the same for the plain /hello page: keep the two in step.
 */
export type ReminderResult = 'done' | 'bad' | 'age' | 'busy' | 'no' | 'net'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const looksLikeEmail = (address: string) => EMAIL.test(address)

export async function askForReminder(address: string, lang: string): Promise<ReminderResult> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !key) return 'net'
  const abort = new AbortController()
  const timer = window.setTimeout(() => abort.abort(), 20000)
  try {
    const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/rpc/launch_reminder_signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ p_email: address, p_age_ok: true, p_lang: lang }),
      signal: abort.signal,
    })
    if (response.status === 429 || response.status >= 500) return 'busy'
    if (!response.ok) return 'no'
    const body = (await response.json()) as { ok?: unknown; reason?: unknown } | null
    if (body?.ok === true) return 'done'
    if (body?.reason === 'email') return 'bad'
    if (body?.reason === 'age') return 'age'
    if (body?.reason === 'busy') return 'busy'
    // 'closed', 'lang' or anything this page doesn't know: never treated as success.
    return 'no'
  } catch {
    return 'net'
  } finally {
    window.clearTimeout(timer)
  }
}

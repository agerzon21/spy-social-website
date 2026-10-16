/**
 * The home page's room-code box: what a typed code (or a pasted invite link) opens.
 *
 * A room has a link code (the path of its invite link, never changes) and a room code (what the host's screen
 * shows; the host can change it, and then invites carry it as ?p=). Someone typing a code here has the room code.
 * The box sends it as both, /join/CODE?p=CODE, which this site's /join page forwards to the app as
 * spysocial://join/CODE?p=CODE: the app's join_room_by_link then finds the room by its link code, or, when no open
 * room has that link code, by the room code its host changed it to (server migration
 * 20261006310100_join_typed_room_code), exactly as when the code is typed in the app's Join a Friend's Room.
 */

// Client copy of the app's lib/roomCode.ts (itself a copy of public.normalize_room_code()): strips spaces and
// dashes, maps Cyrillic look-alikes to Latin, uppercases, 0 -> O and 1 -> I.
const CYRILLIC = '\u0410\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0423\u0425\u0430\u0432\u0435\u043a\u043c\u043d\u043e\u0440\u0441\u0442\u0443\u0445'
const LATIN = 'ABEKMHOPCTYXABEKMHOPCTYX'
const STRIP = /[\s\u00a0\u2000-\u200b\u2060\ufeff\u00ad\u2010-\u2015\u2212-]+/g

export const CODE_MIN = 4
export const CODE_MAX = 8

export function normalizeRoomCode(input: string): string {
  let out = ''
  for (const ch of input.replace(STRIP, '')) {
    const i = CYRILLIC.indexOf(ch)
    out += i >= 0 ? LATIN[i] : ch
  }
  return out.toUpperCase().replace(/0/g, 'O').replace(/1/g, 'I')
}

/** The characters a room code can hold (A-Z and 2-9), at most CODE_MAX. */
export function keepCodeChars(input: string): string {
  return normalizeRoomCode(input).replace(/[^A-Z2-9]/g, '').slice(0, CODE_MAX)
}

/** True when the box holds a whole invite link rather than a code. */
export function looksLikeLink(input: string): boolean {
  return /join\//i.test(input)
}

/**
 * Where the box goes: a pasted invite link keeps its own code and ?p= (a game night's link its page); a typed code
 * goes as /join/CODE?p=CODE (see the top of this file). Null until there's enough to go on.
 */
export function joinPath(input: string): string | null {
  const raw = input.trim()
  if (looksLikeLink(raw)) {
    const event = raw.match(/join\/e\/([0-9a-f-]{36})/i)
    if (event) return `/join/e/${event[1].toLowerCase()}`
    const link = raw.match(/join\/([^/?#\s]+)/i)
    const code = link ? keepCodeChars(decodeURIComponent(link[1])) : ''
    if (code.length < CODE_MIN) return null
    const p = raw.match(/[?&]p=([^&#\s]+)/i)
    const pass = p ? keepCodeChars(decodeURIComponent(p[1])) : ''
    return `/join/${code}${pass ? `?p=${pass}` : ''}`
  }
  const code = keepCodeChars(raw)
  return code.length >= CODE_MIN ? `/join/${code}?p=${code}` : null
}

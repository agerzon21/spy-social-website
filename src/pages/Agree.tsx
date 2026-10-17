import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { SignaturePad } from '../components/agree/SignaturePad'
import { Callout } from '../components/legal/Callout'
import { LanguageNotice } from '../components/legal/LanguageNotice'
import { Bullets, H2, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { cleanLine, looksLikeEmail, parseBody, sameName, segments } from '../lib/agreementText'

// spysocial.app/agree/<token>: one party reads an agreement and signs it.
// The token in the link is their only credential; the page sends it to the
// Edge Function `agreement` (spy-social: supabase/functions/agreement), which
// answers the text, its SHA-256 and what this party fills in, and records the
// signature (with the time, IP and browser, server-side). Never indexed.

const ENDPOINT = import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agreement` : ''

type FieldInfo = { key: string; role: string; label: string; hint: string | null; max: number; value: string | null }
type Party = { role: string; label: string; you: boolean; name: string | null; signed_at: string | null }
type AgreementView = {
  agreement: { title: string; body: string; sha256: string; status: string; sent_at: string | null }
  consent_text: string
  you: { role: string; label: string; name: string; email: string; signed_at: string | null; expires_at: string | null }
  must_fill: string[]
  fields: FieldInfo[]
  parties: Party[]
  final_sent: boolean
}
type Failure = { error: string; message: string; field?: string }
type Signed = { signed_at: string; complete: boolean; final_sent: boolean }

const NETWORK: Failure = { error: 'network', message: "Couldn't reach SpySocial. Check your connection and try again." }

async function call(body: Record<string, unknown>): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false; failure: Failure }> {
  if (!ENDPOINT) return { ok: false, failure: { error: 'not_configured', message: "Signing isn't available right now." } }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const data = (await res.json().catch(() => null)) as Record<string, unknown> | null
    if (res.ok && data?.ok === true) return { ok: true, data }
    if (data && typeof data.error === 'string') {
      return {
        ok: false,
        failure: {
          error: data.error,
          message: typeof data.message === 'string' ? data.message : NETWORK.message,
          field: typeof data.field === 'string' ? data.field : undefined,
        },
      }
    }
    return { ok: false, failure: NETWORK }
  } catch {
    return { ok: false, failure: NETWORK }
  }
}

const when = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
const day = (iso: string) => new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(iso))

const inputStyle = {
  bg: 'ss.deep',
  border: 'var(--ss-hairline) solid',
  borderColor: 'ss.control',
  borderRadius: 'var(--ss-radius-control)',
  color: 'ss.text',
  _placeholder: { color: 'ss.muted' },
  _hover: { borderColor: 'ss.text' },
  _focus: { borderColor: 'ss.focus', boxShadow: '0 0 0 1px var(--ss-focus)' },
} as const

const LOAD_ERRORS: Record<string, string> = {
  not_found: "This signing link doesn't work",
  expired: 'This signing link has expired',
  void: 'This agreement was withdrawn',
  not_sent: "This agreement isn't ready yet",
}

/** A filled-in value inside the text, or the field's name while it's still blank. */
function Blank({ value, label }: { value: string; label: string }) {
  return value ? (
    <Text as="span" color="ss.text" bg="ss.surfaceHover" px={1} borderRadius="sm">
      {value}
    </Text>
  ) : (
    <Text as="span" color="ss.warn" borderBottom="1px dashed" borderColor="ss.warn">
      [{label}]
    </Text>
  )
}

const Agree = () => {
  const { token = '' } = useParams<{ token: string }>()
  const [view, setView] = useState<AgreementView | null>(null)
  const [loadError, setLoadError] = useState<Failure | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [typed, setTyped] = useState('')
  const [drawn, setDrawn] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<Failure | null>(null)
  const [signed, setSigned] = useState<Signed | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const prefilled = useRef(false)

  const load = useCallback(async () => {
    const r = await call({ action: 'view', t: token })
    if (!r.ok) {
      setLoadError(r.failure)
      return null
    }
    const v = r.data as unknown as AgreementView
    setView(v)
    setLoadError(null)
    if (!prefilled.current) {
      prefilled.current = true
      setName(v.you.name)
      setEmail(v.you.email)
    }
    return v
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  // After signing (the form is gone) or a changed text, show the top of the page, where the news is.
  useEffect(() => {
    if (signed || notice) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [signed, notice])

  const fieldsByKey = useMemo(() => new Map((view?.fields ?? []).map((f) => [f.key, f])), [view])
  const mine = useMemo(() => (view?.fields ?? []).filter((f) => view?.must_fill.includes(f.key)), [view])
  const blocks = useMemo(() => (view ? parseBody(view.agreement.body) : []), [view])
  const hasSigned = Boolean(signed || view?.you.signed_at)

  const valueOf = (key: string) => {
    const f = fieldsByKey.get(key)
    if (!f) return ''
    if (!hasSigned && view?.must_fill.includes(key)) return cleanLine(values[key] ?? '')
    return f.value ?? ''
  }

  const inline = (text: string): ReactNode =>
    segments(text).map((s, i) =>
      'field' in s ? <Blank key={i} value={valueOf(s.field)} label={fieldsByKey.get(s.field)?.label ?? s.field} /> : <span key={i}>{s.text}</span>,
    )

  const nameOk = cleanLine(name).length >= 2
  const emailOk = looksLikeEmail(email)
  const typedOk = sameName(typed, name)
  const fieldsOk = mine.every((f) => cleanLine(values[f.key] ?? '') !== '')
  const ready = nameOk && emailOk && typedOk && fieldsOk && consent

  const sign = async () => {
    if (!view || !ready || submitting) return
    setSubmitting(true)
    setFormError(null)
    setNotice(null)
    const r = await call({
      action: 'sign',
      t: token,
      sha256: view.agreement.sha256,
      name: cleanLine(name),
      email: email.trim(),
      fields: Object.fromEntries(mine.map((f) => [f.key, cleanLine(values[f.key] ?? '')])),
      typed_signature: cleanLine(typed),
      drawn_signature: drawn,
      consent: true,
    })
    setSubmitting(false)
    if (r.ok) {
      setSigned(r.data as unknown as Signed)
      void load()
      return
    }
    if (r.failure.error === 'text_changed') {
      // Show the current text; signing it is one more click, on the right text.
      setConsent(false)
      setNotice(r.failure.message)
      await load()
      return
    }
    if (r.failure.error === 'already_signed') {
      await load()
      return
    }
    setFormError(r.failure)
  }

  const fieldError = (field: string) => (formError?.field === field ? formError.message : null)

  const parties = view?.parties ?? []
  const waiting = parties.filter((p) => !p.signed_at && !(p.you && signed))
  const finalSent = view?.final_sent ?? false

  return (
    <Box flex="1" color="ss.body" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Helmet>
        <title>{view ? `${view.agreement.title} · SpySocial` : 'Agreement · SpySocial'}</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Container maxW="container.md">
        {/* The agreement and its page are English only for now: a note in the visitor's language says so. */}
        <LanguageNotice kind="english" />
        <Box lang="en" dir="ltr">
        {!view && !loadError && (
          <VStack py={20}>
            <Spinner color="ss.text" />
          </VStack>
        )}

        {!view && loadError && (
          <VStack spacing={4} py={10} textAlign="center">
            <Heading as="h1" size="lg" color="ss.text">
              {LOAD_ERRORS[loadError.error] ?? "Couldn't open the agreement"}
            </Heading>
            <Text textStyle="body" maxW="md">
              {loadError.message}
            </Text>
            {(loadError.error === 'network' || loadError.error === 'server_error') && (
              <Button size="sm" variant="primary" onClick={() => void load()}>
                Try Again
              </Button>
            )}
            <Text fontSize="xs" color="ss.muted">
              Questions? <SupportEmail subject="Agreement link" />
            </Text>
          </VStack>
        )}

        {view && (
          <VStack spacing={5} align="start">
            <Box>
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="ss.muted" mb={2}>
                Agreement from SpySocial
              </Text>
              <Heading as="h1" size="lg" color="ss.text">
                {blocks[0]?.kind === 'title' ? inline(blocks[0].text) : view.agreement.title}
              </Heading>
            </Box>

            <Box w="100%" fontSize="sm">
              {parties.map((p) => (
                <Text key={p.role} textStyle="body">
                  <Text as="span" fontWeight="600" color="ss.text">
                    {p.label}
                    {p.you ? ' (you)' : ''}:
                  </Text>{' '}
                  {p.signed_at
                    ? `signed by ${p.name ?? p.label} on ${day(p.signed_at)}`
                    : p.you && signed
                      ? 'signed just now'
                      : 'not signed yet'}
                </Text>
              ))}
            </Box>

            {notice && (
              <Callout title="The agreement changed">
                <Text textStyle="body">
                  {notice}
                </Text>
              </Callout>
            )}

            {hasSigned && (
              <Callout title={signed ? 'Signed. Thank you!' : 'You have signed this agreement'}>
                <Text textStyle="body">
                  You signed as {view.you.label} on {when((signed?.signed_at ?? view.you.signed_at) as string)}.{' '}
                  {finalSent || signed?.final_sent
                    ? 'Everyone has signed: the signed PDF, with its audit trail, has been emailed to each party.'
                    : signed?.complete || view.agreement.status === 'signed'
                      ? 'Everyone has signed: the signed PDF is on its way to each party by email.'
                      : `When ${waiting.map((p) => p.label).join(' and ') || 'everyone'} has signed too, both parties get the signed PDF by email.`}
                </Text>
              </Callout>
            )}


            {blocks.map((b, i) =>
              b.kind === 'title' ? (
                i === 0 ? null : (
                  <H2 key={i}>{inline(b.text)}</H2>
                )
              ) : b.kind === 'heading' ? (
                <H2 key={i}>{inline(b.text)}</H2>
              ) : b.kind === 'bullets' ? (
                <Bullets key={i}>
                  {b.items.map((it, j) => (
                    <ListItem key={j}>{inline(it)}</ListItem>
                  ))}
                </Bullets>
              ) : (
                <P key={i}>{inline(b.text)}</P>
              ),
            )}

            {!hasSigned && (
              <Box
                as="form"
                w="100%"
                mt={6}
                p={{ base: 4, md: 6 }}
                bg="ss.surface"
                borderWidth="1px"
                borderColor="ss.lineStrong"
                borderRadius="lg"
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault()
                  void sign()
                }}
              >
                <VStack spacing={5} align="stretch">
                  <Heading as="h2" size="md" color="ss.text">
                    Sign as {view.you.label}
                  </Heading>

                  {mine.map((f) => (
                    <FormControl key={f.key} isRequired isInvalid={Boolean(fieldError(`fields.${f.key}`))}>
                      <FormLabel fontSize="sm" color="ss.body">
                        {f.label}
                      </FormLabel>
                      <Input
                        {...inputStyle}
                        value={values[f.key] ?? ''}
                        maxLength={f.max}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        isDisabled={submitting}
                      />
                      {fieldError(`fields.${f.key}`) ? (
                        <FormErrorMessage>{fieldError(`fields.${f.key}`)}</FormErrorMessage>
                      ) : f.hint ? (
                        <FormHelperText fontSize="xs" color="ss.muted">
                          {f.hint}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  ))}

                  <FormControl isRequired isInvalid={Boolean(fieldError('name'))}>
                    <FormLabel fontSize="sm" color="ss.body">
                      Your full name
                    </FormLabel>
                    <Input {...inputStyle} value={name} maxLength={120} autoComplete="name" onChange={(e) => setName(e.target.value)} isDisabled={submitting} />
                    {fieldError('name') ? (
                      <FormErrorMessage>{fieldError('name')}</FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize="xs" color="ss.muted">
                        The person signing.
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={Boolean(fieldError('email'))}>
                    <FormLabel fontSize="sm" color="ss.body">
                      Your email
                    </FormLabel>
                    <Input
                      {...inputStyle}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      maxLength={254}
                      onChange={(e) => setEmail(e.target.value)}
                      isDisabled={submitting}
                    />
                    {fieldError('email') ? (
                      <FormErrorMessage>{fieldError('email')}</FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize="xs" color="ss.muted">
                        Where the signed PDF goes.
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={Boolean(fieldError('typed_signature')) || (typed !== '' && !typedOk)}>
                    <FormLabel fontSize="sm" color="ss.body">
                      Signature: type your full name
                    </FormLabel>
                    <Input {...inputStyle} value={typed} maxLength={120} autoComplete="off" onChange={(e) => setTyped(e.target.value)} isDisabled={submitting} />
                    {typed !== '' && !typedOk ? (
                      <FormErrorMessage>Type your name exactly as above.</FormErrorMessage>
                    ) : fieldError('typed_signature') ? (
                      <FormErrorMessage>{fieldError('typed_signature')}</FormErrorMessage>
                    ) : null}
                    {typedOk && (
                      <Text mt={3} fontSize="2xl" color="ss.text" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" lineHeight="1.2">
                        {cleanLine(typed)}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={Boolean(fieldError('drawn_signature'))}>
                    <FormLabel fontSize="sm" color="ss.body">
                      Draw your signature (optional)
                    </FormLabel>
                    <SignaturePad onChange={setDrawn} isDisabled={submitting} />
                    {fieldError('drawn_signature') && <FormErrorMessage>{fieldError('drawn_signature')}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired isInvalid={Boolean(fieldError('consent'))}>
                    <Checkbox
                      isChecked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      isDisabled={submitting}
                      alignItems="flex-start"
                      colorScheme="blue"
                    >
                      <Text as="span" fontSize="sm" lineHeight="1.6" color="ss.text">
                        {view.consent_text}
                      </Text>
                    </Checkbox>
                    {fieldError('consent') && <FormErrorMessage>{fieldError('consent')}</FormErrorMessage>}
                  </FormControl>

                  {formError && !formError.field && (
                    <Text color="ss.danger" fontSize="sm">
                      {formError.message}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={submitting}
                    isDisabled={!ready}
                    w={{ base: '100%', md: 'auto' }}
                    alignSelf="flex-start"
                    px={10}
                  >
                    Sign
                  </Button>

                  <Text textStyle="small" color="ss.muted">
                    Signing records your name, email, the details above, your signature, the time, your IP address and your
                    browser, and keeps them with the agreement as its audit trail (see our{' '}
                    <PageLink to="/privacy">Privacy Policy</PageLink>). When everyone has signed, both parties get the signed
                    PDF by email.
                    {view.you.expires_at ? ` This link works until ${day(view.you.expires_at)}.` : ''}
                  </Text>
                </VStack>
              </Box>
            )}

            <Text fontSize="xs" color="ss.muted" pt={4}>
              Questions about this agreement? <SupportEmail subject={`Agreement: ${view.agreement.title}`} />
            </Text>
          </VStack>
        )}
        </Box>
      </Container>
    </Box>
  )
}

export default Agree

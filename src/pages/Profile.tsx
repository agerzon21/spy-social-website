import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { FaApple } from 'react-icons/fa'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import Link from '../components/SiteLink'
import { openAppHref, tryAppOnLoad, tryAppOnce } from '../lib/appLink'
import { currentPlatform } from '../lib/platform'
import { STORES_OPEN } from '../lib/legalRelease'
import { REMINDER_PAGE } from '../lib/launchDay'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/stores'
import { LaunchLine } from '../components/ui/LaunchReminder'
import { useLang, useT } from '../i18n'
import { profileStrings } from './profileStrings'

/** A username as the app allows it (update_profile). */
const HANDLE = /^[A-Za-z0-9_.]{3,30}$/

/**
 * spysocial.app/profile/<username> (archive-holder-1110): the way from a Unique's "Held by @name" on the Archive into
 * the app's own profile (app/profile/[username].tsx). It offers Open in SpySocial (spysocial://profile/<name>, Android's
 * intent://), the stores once they carry the version with profiles, else the launch line. The AASA doesn't claim
 * /profile/* yet: until the launch the stores hold 2.1.1, which has no profile screen, so a link the phone handed to it
 * would open on "nothing here". Add "/profile/*" to public/.well-known/apple-app-site-association with STORES_OPEN.
 *
 * It reads nothing from the server and says the same for every name: whether a profile exists, is public or belongs to
 * a minor is the app's to decide (get_player_profile, signed in, rate-limited), so this page can't be used to sort
 * accounts. Not indexed (vercel.json's X-Robots-Tag and the robots meta below).
 */
const Profile = () => {
  const { username = '' } = useParams<{ username: string }>()
  const { lang, language } = useLang()
  // "Back" points the way the page reads: right in Arabic (site-qa-1113).
  const rtl = language.rtl
  const c = useT().common
  const t = profileStrings(lang)
  const ok = HANDLE.test(username)
  const appPath = `profile/${encodeURIComponent(username)}`
  const platform = useMemo(currentPlatform, [])
  const isMobile = platform === 'ios' || platform === 'android'
  // Before the launch the stores hold 2.1.1, which has no profiles: the reminder page instead (as /join's Friend Code).
  const appLink = STORES_OPEN ? openAppHref(appPath, platform) : openAppHref(appPath, platform, `${window.location.origin}${REMINDER_PAGE}`)

  useEffect(() => {
    if (ok && tryAppOnLoad(platform, navigator.userAgent || '')) tryAppOnce(appPath)
  }, [ok, platform, appPath])

  return (
    <Box flex="1" pt={{ base: 10, md: 16 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(70% 320px at 50% 0, var(--ss-glow), transparent 70%)">
      <Helmet>
        <title>{ok ? `@${username} · SpySocial` : 'SpySocial'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Container maxW="560px" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} textAlign="center">
            {ok ? (
              <>
                <Text fontSize="13px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="ss.muted">
                  {t.eyebrow}
                </Text>
                <Heading as="h1" size="xl" style={{ overflowWrap: 'anywhere', direction: 'ltr', textTransform: 'none' }}>
                  @{username}
                </Heading>
                <Text color="ss.muted" fontSize={{ base: '18px', md: '20px' }} lineHeight="1.45">
                  {isMobile ? t.phone : t.desktop}
                </Text>
              </>
            ) : (
              <>
                <Heading as="h1" size="xl">
                  {t.bad}
                </Heading>
                <Text color="ss.muted" fontSize={{ base: '18px', md: '20px' }} lineHeight="1.45">
                  {t.badText}
                </Text>
              </>
            )}
          </VStack>

          {ok && (
            <VStack spacing={3} align="stretch">
              {isMobile && (
                <Button as="a" href={appLink} size="lg" variant="primary">
                  {c.openInApp}
                </Button>
              )}
              {STORES_OPEN && (platform === 'ios' || platform === 'desktop') && (
                <Button as="a" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" size="lg"
                  variant={isMobile ? 'secondary' : 'primary'} leftIcon={<FaApple size={22} />}>
                  {platform === 'ios' ? c.noAppIos : c.appStore}
                </Button>
              )}
              {STORES_OPEN && (platform === 'android' || platform === 'desktop') && (
                <Button as="a" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" size="lg"
                  variant={isMobile ? 'secondary' : 'primary'} leftIcon={<IoLogoGooglePlaystore size={22} />}>
                  {platform === 'android' ? c.noAppAndroid : c.googlePlay}
                </Button>
              )}
            </VStack>
          )}

          {ok && !STORES_OPEN && <LaunchLine />}

          <Text textAlign="center" fontSize="15px">
            <Link to="/archive" style={{ color: 'var(--ss-link)', fontWeight: 700 }}>
              {rtl ? '→' : '←'} {t.back}
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Profile

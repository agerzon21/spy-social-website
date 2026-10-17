import { Box, Button, Text } from '@chakra-ui/react'
import { useLang, useT } from '../../i18n'

/**
 * The note at the top of a page whose words aren't all in the visitor's language, in that language (nothing in
 * English): `english` for the legal pages, which stay English for now and bind in English; `translated` for a
 * translated page whose English version binds (the Community Rules, part of the Terms; the Safety page), with a
 * way to read it in English; `sections` for Delete Account, whose two Privacy Policy sections stay English.
 */
export const LanguageNotice = ({ kind }: { kind: 'english' | 'translated' | 'sections' }) => {
  const { lang, setLang } = useLang()
  const t = useT().notice
  if (lang === 'en') return null
  const text = kind === 'english' ? t.englishOnly : kind === 'translated' ? t.translated : t.englishSections
  return (
    <Box
      role="note"
      w="100%"
      mb={kind === 'sections' ? 0 : 8}
      px={{ base: 4, md: 5 }}
      py={3}
      bg="ss.surface"
      border="var(--ss-card-border) solid"
      borderColor="ss.line"
      borderInlineStart="3px solid"
      borderInlineStartColor="ss.highlight"
      borderRadius="var(--ss-radius-card)"
    >
      <Text textStyle="small" color="ss.text">
        {text}
      </Text>
      {kind === 'translated' && (
        <Button variant="link" color="ss.link" fontFamily="body" fontWeight="700" fontSize="15px" textTransform="none" letterSpacing="0" minH="44px" textDecoration="underline" textUnderlineOffset="3px" onClick={() => void setLang('en')}>
          {t.readEnglish}
        </Button>
      )}
    </Box>
  )
}

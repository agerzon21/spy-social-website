import { Box, Text } from '@chakra-ui/react'

// The four corner ticks of a case-file plate (decoration only).
const corner = (pos: Record<string, string>, sides: string) => (
  <Box
    position="absolute"
    w="14px"
    h="14px"
    borderColor="ss.highlight"
    {...pos}
    {...Object.fromEntries(sides.split('').map((side) => [`border${{ t: 'Top', r: 'Right', b: 'Bottom', l: 'Left' }[side]}Width`, '2px']))}
    aria-hidden
  />
)

/** A room code, shown big on a plate: /join's "Room Code" and the code the player would type. */
export const RoomCodePlate = ({ code, label }: { code: string; label: string }) => (
  <Box
    position="relative"
    textAlign="center"
    py={{ base: 7, md: 9 }}
    px={6}
    bg="ss.surface"
    border="var(--ss-card-border) solid"
    borderColor="ss.lineStrong"
    borderRadius="var(--ss-radius-card)"
    boxShadow="var(--ss-shadow-card)"
  >
    {corner({ top: '-1px', left: '-1px' }, 'tl')}
    {corner({ top: '-1px', right: '-1px' }, 'tr')}
    {corner({ bottom: '-1px', left: '-1px' }, 'bl')}
    {corner({ bottom: '-1px', right: '-1px' }, 'br')}
    <Text textStyle="label" mb={3}>
      {label}
    </Text>
    <Text
      as="div"
      fontFamily="mono"
      fontWeight="900"
      fontSize={{ base: '56px', md: '72px' }}
      lineHeight="1"
      letterSpacing="0.14em"
      color="ss.text"
      overflowWrap="anywhere"
      dir="ltr"
    >
      {code}
    </Text>
  </Box>
)

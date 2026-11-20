import { useLayoutEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { addThemeApplier } from './mode'

/** Chakra's colour mode follows the header's switch (mode.ts wearTheme), in the same flush as before (speed-1111). */
export default function ChakraModeBridge() {
  const { setColorMode } = useColorMode()
  useLayoutEffect(() => addThemeApplier(setColorMode), [setColorMode])
  return null
}

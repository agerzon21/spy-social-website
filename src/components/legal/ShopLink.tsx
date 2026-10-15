import { Link as ChakraLink } from '@chakra-ui/react'
import { SHOP_HOST, SHOP_URL } from '../../lib/shop'

/** "shop.spysocial.app" as a link to the merch shop, in the same tab, styled like the legal pages' links (LIVE.merchShop). */
export const ShopLink = () => (
  <ChakraLink href={SHOP_URL} color="blue.300" _hover={{ color: 'blue.200' }}>
    {SHOP_HOST}
  </ChakraLink>
)

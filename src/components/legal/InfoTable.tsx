import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import type { ReactNode } from 'react'

// A two- or three-column table for the legal and safety pages: the first
// column names the thing (bold, with an optional note under it), the others
// say what applies to it. Text wraps in every cell, so the table fits a phone
// screen; it scrolls sideways only if a cell can't wrap.

export type InfoRow = {
  /** What the row is about, shown in bold. */
  label: ReactNode
  /** An optional line under the label, such as what the term means. */
  note?: ReactNode
  /** The other columns, in order. */
  cells: ReactNode[]
}

export const InfoTable = ({
  head,
  rows,
  firstWidth = '34%',
}: {
  head: string[]
  rows: InfoRow[]
  firstWidth?: string
}) => (
  <Box w="100%" overflowX="auto" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="md">
    <Table size="sm" variant="unstyled" sx={{ tableLayout: 'fixed' }}>
      <Thead bg="whiteAlpha.50">
        <Tr>
          {head.map((h, i) => (
            <Th
              key={h}
              w={i === 0 ? firstWidth : undefined}
              color="whiteAlpha.700"
              fontSize="xs"
              textTransform="none"
              letterSpacing="normal"
              fontWeight="600"
              py={2}
              px={3}
              borderBottomWidth="1px"
              borderColor="whiteAlpha.200"
            >
              {h}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, r) => (
          <Tr key={r} borderTopWidth={r === 0 ? 0 : '1px'} borderColor="whiteAlpha.100">
            <Td verticalAlign="top" whiteSpace="normal" py={3} px={3} fontSize="sm" lineHeight="1.7">
              <Text as="span" fontWeight="600" color="whiteAlpha.800">
                {row.label}
              </Text>
              {row.note && (
                <Text fontSize="xs" lineHeight="1.6" color="whiteAlpha.500" mt={1}>
                  {row.note}
                </Text>
              )}
            </Td>
            {row.cells.map((cell, c) => (
              <Td key={c} verticalAlign="top" whiteSpace="normal" py={3} px={3} fontSize="sm" lineHeight="1.7">
                {cell}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)

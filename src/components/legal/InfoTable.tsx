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
  <Box w="100%" overflowX="auto" border="var(--ss-card-border) solid" borderColor="ss.lineStrong" borderRadius="var(--ss-radius-card)" boxShadow="var(--ss-shadow-card)">
    <Table size="sm" variant="unstyled" sx={{ tableLayout: 'fixed' }}>
      <Thead bg="ss.surfaceStrong">
        <Tr>
          {head.map((h, i) => (
            <Th
              key={h}
              w={i === 0 ? firstWidth : undefined}
              color="ss.highlight"
              fontFamily="body"
              fontSize="14px"
              textTransform="none"
              letterSpacing="0.02em"
              fontWeight="700"
              py={3}
              px={3}
              borderBottom="var(--ss-hairline) solid"
              borderColor="ss.lineStrong"
            >
              {h}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, r) => (
          <Tr key={r} borderTop={r === 0 ? 0 : 'var(--ss-hairline) solid'} borderColor="ss.line">
            <Td verticalAlign="top" whiteSpace="normal" py={3} px={3} fontSize={{ base: '15px', md: '16px' }} lineHeight="1.6">
              <Text as="span" fontWeight="700" color="ss.text">
                {row.label}
              </Text>
              {row.note && (
                <Text textStyle="small" color="ss.muted" mt={1}>
                  {row.note}
                </Text>
              )}
            </Td>
            {row.cells.map((cell, c) => (
              <Td key={c} verticalAlign="top" whiteSpace="normal" py={3} px={3} fontSize={{ base: '15px', md: '16px' }} lineHeight="1.6">
                {cell}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)

import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

// Draw-to-sign: an SVG pad (600 x 200 units, the box the server and the
// signed PDF use) that turns strokes into SVG path data of M and L commands,
// e.g. "M12.5 80 L14 82.5 L20 90". Nothing leaves the page but that string;
// no canvas, no image, no outside resource (the site's CSP stays as it is).

export const PAD_WIDTH = 600
export const PAD_HEIGHT = 200
const MAX_POINTS = 1400 // the server takes 20,000 characters: 1,400 points of "L599.9 199.9" fit
const MIN_STEP = 2 // pad units between two points of a stroke

type Point = [number, number]

const round = (n: number) => Math.round(n * 10) / 10

function toPath(strokes: Point[][]): string | null {
  const parts: string[] = []
  for (const s of strokes) {
    if (s.length < 2) continue
    s.forEach(([x, y], i) => parts.push(`${i === 0 ? 'M' : 'L'}${x} ${y}`))
  }
  return parts.length >= 2 ? parts.join(' ') : null
}

export function SignaturePad({ onChange, isDisabled }: { onChange: (path: string | null) => void; isDisabled?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [strokes, setStrokes] = useState<Point[][]>([])
  const drawing = useRef(false)
  const count = strokes.reduce((n, s) => n + s.length, 0)

  const pointOf = (e: PointerEvent<SVGSVGElement>): Point | null => {
    const r = svgRef.current?.getBoundingClientRect()
    if (!r || r.width === 0 || r.height === 0) return null
    const x = Math.min(PAD_WIDTH, Math.max(0, ((e.clientX - r.left) / r.width) * PAD_WIDTH))
    const y = Math.min(PAD_HEIGHT, Math.max(0, ((e.clientY - r.top) / r.height) * PAD_HEIGHT))
    return [round(x), round(y)]
  }

  const down = (e: PointerEvent<SVGSVGElement>) => {
    if (isDisabled || count >= MAX_POINTS) return
    const p = pointOf(e)
    if (!p) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    setStrokes((prev) => [...prev, [p]])
  }

  const move = (e: PointerEvent<SVGSVGElement>) => {
    if (!drawing.current) return
    const p = pointOf(e)
    if (!p) return
    setStrokes((prev) => {
      if (prev.reduce((n, s) => n + s.length, 0) >= MAX_POINTS) return prev
      const last = prev[prev.length - 1]
      const [lx, ly] = last[last.length - 1]
      if (Math.hypot(p[0] - lx, p[1] - ly) < MIN_STEP) return prev
      return [...prev.slice(0, -1), [...last, p]]
    })
  }

  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    setStrokes((prev) => {
      onChange(toPath(prev))
      return prev
    })
  }

  const clear = () => {
    setStrokes([])
    onChange(null)
  }

  const shown = toPath(strokes) ?? ''
  const dots = strokes.filter((s) => s.length === 1)

  return (
    <Box>
      <Box
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="whiteAlpha.300"
        borderRadius="md"
        bg="whiteAlpha.50"
        position="relative"
        opacity={isDisabled ? 0.5 : 1}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${PAD_WIDTH} ${PAD_HEIGHT}`}
          role="img"
          aria-label="Signature drawing area"
          style={{ display: 'block', width: '100%', height: 'auto', touchAction: 'none', cursor: isDisabled ? 'default' : 'crosshair' }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        >
          <line x1={24} y1={160} x2={PAD_WIDTH - 24} y2={160} stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} />
          <path d={shown} fill="none" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          {dots.map(([[x, y]], i) => (
            <circle key={i} cx={x} cy={y} r={1.8} fill="white" />
          ))}
        </svg>
        {count === 0 && (
          <Text position="absolute" top="38%" left={0} right={0} textAlign="center" fontSize="sm" color="whiteAlpha.400" pointerEvents="none">
            Draw here with your finger or mouse
          </Text>
        )}
      </Box>
      <HStack justify="flex-end" mt={1}>
        <Button variant="link" size="xs" color="whiteAlpha.600" onClick={clear} isDisabled={isDisabled || count === 0}>
          Clear drawing
        </Button>
      </HStack>
    </Box>
  )
}

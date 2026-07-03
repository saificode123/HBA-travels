import { useReducedMotion, useSpring, useMotionValue, type MotionValue } from 'framer-motion'
import { useCallback, useRef, type MouseEvent } from 'react'

interface Use3DTiltOptions {
  maxTilt?: number
}

export function use3DTilt({ maxTilt = 12 }: Use3DTiltOptions = {}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 280, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 280, damping: 22 })

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rotateY.set(x * maxTilt * 2)
      rotateX.set(-y * maxTilt * 2)
    },
    [reduceMotion, maxTilt, rotateX, rotateY],
  )

  const onMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    rotateX: springX as MotionValue<number>,
    rotateY: springY as MotionValue<number>,
    reduceMotion,
  }
}

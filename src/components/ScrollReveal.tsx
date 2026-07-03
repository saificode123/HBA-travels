import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  const offsets = {
    up: { y: 48, x: 0, scale: 0.96 },
    down: { y: -48, x: 0, scale: 0.96 },
    left: { x: 48, y: 0, scale: 0.96 },
    right: { x: -48, y: 0, scale: 0.96 },
    scale: { x: 0, y: 0, scale: 0.88 },
  }

  const offset = offsets[direction]

  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: offset.y, x: offset.x, scale: offset.scale },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

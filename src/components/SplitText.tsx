import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  stagger?: number
  delay?: number
}

/**
 * Splits text into individual characters and animates each one in
 * with a staggered entrance — inspired by anime.js-style text reveals.
 */
export default function SplitText({
  text,
  className = '',
  el: El = 'span',
  stagger = 0.028,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <El className={className}>{text}</El>
  }

  const words = text.split(' ')
  let charIdx = 0

  return (
    <div
      ref={ref}
      className={`split-text-host ${className}`}
      aria-label={text}
      role="text"
    >
      {words.map((word, wi) => (
        <span key={wi} className="split-word" aria-hidden="true">
          {word.split('').map((char) => {
            const idx = charIdx++
            return (
              <motion.span
                key={idx}
                className="split-char"
                initial={{ opacity: 0, y: 26, rotateX: -45, filter: 'blur(4px)' }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 26, rotateX: -45, filter: 'blur(4px)' }
                }
                transition={{
                  delay: delay + idx * stagger,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && (
            <span className="split-space" aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  )
}

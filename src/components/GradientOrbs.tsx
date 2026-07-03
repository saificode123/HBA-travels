import { motion, useReducedMotion } from 'framer-motion'

interface GradientOrbsProps {
  variant?: 'hero' | 'light' | 'dark'
  className?: string
}

export default function GradientOrbs({ variant = 'hero', className = '' }: GradientOrbsProps) {
  const reduceMotion = useReducedMotion()

  const colors =
    variant === 'hero'
      ? ['bg-gold-400/20', 'bg-night-400/25', 'bg-sage-400/15']
      : variant === 'dark'
        ? ['bg-gold-400/10', 'bg-night-400/20', 'bg-gold-600/8']
        : ['bg-gold-200/40', 'bg-sage-100/60', 'bg-gold-400/15']

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className={`absolute -left-20 top-1/4 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96 ${colors[0]}`}
        animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -right-16 top-1/3 h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80 ${colors[1]}`}
        animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72 ${colors[2]}`}
        animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

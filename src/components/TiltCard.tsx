import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { use3DTilt } from '../hooks/use3DTilt'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  glow?: boolean
  fullHeight?: boolean
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glow = false,
  fullHeight = true,
}: TiltCardProps) {
  const { ref, onMouseMove, onMouseLeave, rotateX, rotateY, reduceMotion } = use3DTilt({
    maxTilt,
  })

  const heightClass = fullHeight ? 'h-full' : ''

  if (reduceMotion) {
    return <div className={`${heightClass} ${className}`}>{children}</div>
  }

  return (
    <div className={`tilt-scene ${heightClass} ${glow ? 'tilt-glow' : ''}`}>
      <motion.div
        ref={ref}
        className={`tilt-inner ${heightClass} ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

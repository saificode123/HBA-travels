import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Hide cursor on touch devices where hover is not a primary interaction
    if (window.matchMedia('(pointer: coarse)').matches || reduceMotion) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Elements that trigger hover state
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable = target.closest('a, button, [role="button"], [role="tab"], .hover-trigger')
      setIsHovered(!!isHoverable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', updateHoverState)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', updateHoverState)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible, reduceMotion])

  if (reduceMotion) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-gold-400/50 mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? 'rgba(212,175,55,0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-sand-50 mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

import { useInView, useReducedMotion, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { StaggerContainer, StaggerItem } from './SectionHeading'

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!isInView || reduceMotion) {
      setCount(value)
      return
    }
    const duration = 1800
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value, reduceMotion])

  return (
    <span
      ref={ref}
      className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl"
      style={{
        background: 'linear-gradient(135deg, #EAD9A8 0%, #D4AF37 40%, #B8912C 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function TrustBar() {
  return (
    <section
      className="relative overflow-hidden border-y border-sand-100/60 bg-sand-50/90 py-14 backdrop-blur-sm sm:py-16"
      aria-label="Trust statistics"
    >
      {/* Subtle gradient bands */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 25%, rgba(212,175,55,0.5) 50%, rgba(212,175,55,0.3) 75%, transparent 100%)',
        }}
      />
      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 35%, rgba(212,175,55,0.4) 50%, rgba(212,175,55,0.2) 65%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {siteConfig.trustStats.map((stat, i) => (
            <StaggerItem key={stat.id}>
              <motion.div
                className="trust-stat-card glass-card-light rounded-2xl px-4 py-6 text-center sm:rounded-3xl sm:px-6 sm:py-7"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                {/* Decorative number index */}
                <span
                  className="pointer-events-none absolute right-3 top-2 font-heading text-5xl font-bold opacity-[0.04] text-night-900"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2.5 text-xs font-medium text-ink/65 sm:text-sm">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

import { useInView, useReducedMotion } from 'framer-motion'
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

    const duration = 1500
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, reduceMotion])

  return (
    <span ref={ref} className="font-heading text-3xl font-semibold text-gold-600 sm:text-4xl lg:text-5xl">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function TrustBar() {
  return (
    <section className="border-y border-sand-100/80 bg-sand-50/80 py-12 backdrop-blur-sm sm:py-14" aria-label="Trust statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {siteConfig.trustStats.map((stat) => (
            <StaggerItem key={stat.id}>
              <div className="glass-card-light rounded-2xl px-4 py-5 text-center sm:rounded-3xl sm:px-6 sm:py-6">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs font-medium text-ink/70 sm:text-sm">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

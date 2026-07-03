import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { siteConfig } from '../config/siteConfig'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  premium?: boolean
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  dark = false,
  premium = false,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 40 },
    visible: reduceMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
  }

  return (
    <motion.div
      className={`mb-14 sm:mb-16 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-xl text-left'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {premium && (
        <span className={`premium-badge mb-4 inline-block ${dark ? 'premium-badge-dark' : ''}`}>
          {siteConfig.sectionBadge}
        </span>
      )}
      <h2
        className={`font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight ${
          dark ? 'text-sand-50' : 'text-night-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-[1.75] sm:text-lg ${
            dark ? 'text-night-50/70' : 'text-ink/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: reduceMotion ? {} : { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 48, scale: 0.94, rotateX: 6 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
    >
      {children}
    </motion.div>
  )
}

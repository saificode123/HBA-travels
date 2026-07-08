import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { siteConfig } from '../config/siteConfig'

interface SectionHeadingProps {
  id?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  premium?: boolean
}

export default function SectionHeading({
  id,
  title,
  subtitle,
  align = 'center',
  dark = false,
  premium = false,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 50 },
    visible: reduceMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
        },
  }

  const lineVariants = {
    hidden: reduceMotion ? {} : { scaleX: 0 },
    visible: reduceMotion
      ? {}
      : {
          scaleX: 1,
          transition: { duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const },
        },
  }

  return (
    <motion.div
      id={id}
      className={`mb-14 sm:mb-18 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-xl text-left'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {premium && (
        <motion.span
          className={`premium-badge mb-5 inline-block ${dark ? 'premium-badge-dark' : ''}`}
          variants={{
            hidden: reduceMotion ? {} : { opacity: 0, scale: 0.7, y: 10 },
            visible: reduceMotion
              ? {}
              : { opacity: 1, scale: 1, y: 0, transition: { delay: 0.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
          }}
        >
          {siteConfig.sectionBadge}
        </motion.span>
      )}

      <motion.h2
        className={`font-heading text-[clamp(2rem,4.5vw,3.35rem)] font-semibold leading-[1.08] tracking-tight ${
          dark ? 'text-sand-50' : 'text-night-900'
        }`}
        variants={{
          hidden: reduceMotion ? {} : { opacity: 0, y: 28 },
          visible: reduceMotion ? {} : { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const } },
        }}
      >
        {title}
      </motion.h2>

      {/* Decorative gold line under heading */}
      <motion.div
        className={`mt-4 ${align === 'center' ? 'mx-auto' : ''}`}
        style={{
          height: '2px',
          width: '56px',
          borderRadius: '99px',
          background: 'linear-gradient(90deg, rgba(212,175,55,0.8), rgba(212,175,55,0.3))',
          transformOrigin: align === 'center' ? 'center' : 'left',
        }}
        variants={lineVariants}
      />

      {subtitle && (
        <motion.p
          className={`mt-5 text-base leading-[1.78] sm:text-lg ${
            dark ? 'text-night-50/70' : 'text-ink/60'
          }`}
          variants={{
            hidden: reduceMotion ? {} : { opacity: 0, y: 18 },
            visible: reduceMotion ? {} : { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
          }}
        >
          {subtitle}
        </motion.p>
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
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: reduceMotion ? {} : { staggerChildren: 0.12, delayChildren: 0.06 },
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
              hidden: { opacity: 0, y: 52, scale: 0.93, rotateX: 8, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
    >
      {children}
    </motion.div>
  )
}

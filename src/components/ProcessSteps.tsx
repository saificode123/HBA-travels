import { motion, useReducedMotion } from 'framer-motion'
import {
  ClipboardCheck,
  FileText,
  Headphones,
  MessageSquare,
} from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import GradientOrbs from './GradientOrbs'
import GeometricPattern from './GeometricPattern'

const stepIcons = [MessageSquare, FileText, ClipboardCheck, Headphones]

export default function ProcessSteps() {
  const { process } = siteConfig
  const reduceMotion = useReducedMotion()

  return (
    <section id="process" className="premium-dark-section relative overflow-hidden vayron-section">
      <GradientOrbs variant="dark" />
      <GeometricPattern className="text-gold-400" opacity={0.04} />
      <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={process.title} subtitle={process.subtitle} dark premium />

        <StaggerContainer>
          <div className="relative grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {/* Connecting line (desktop) */}
            <div
              className="absolute top-[52px] left-[12.5%] right-[12.5%] hidden h-[1px] lg:block"
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 10%, rgba(212,175,55,0.4) 30%, rgba(212,175,55,0.4) 70%, rgba(212,175,55,0.15) 90%, transparent 100%)',
              }}
            />
            {/* Animated glow on connector */}
            <motion.div
              className="absolute top-[52px] left-[12.5%] right-[12.5%] hidden h-[1px] lg:block"
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)',
                backgroundSize: '40% 100%',
                backgroundRepeat: 'no-repeat',
              }}
              animate={reduceMotion ? undefined : { backgroundPosition: ['-40% 0%', '140% 0%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            />

            {process.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? MessageSquare
              return (
                <StaggerItem key={step.title}>
                  <div className="process-step-card glass-card relative rounded-3xl p-6 text-center sm:p-7">
                    {/* Step number ghost */}
                    <span
                      className="pointer-events-none absolute top-3 right-4 font-heading text-6xl font-bold text-sand-50/[0.04] select-none"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icon container */}
                    <div className="process-step-icon relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gold-400/25 bg-night-700/90 sm:h-24 sm:w-24">
                      {/* Glow behind icon */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
                        }}
                      />
                      <Icon className="h-8 w-8 text-gold-400 sm:h-10 sm:w-10" aria-hidden="true" />
                      {/* Step badge */}
                      <span
                        className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-night-900 sm:h-8 sm:w-8 sm:text-sm"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37, #B8912C)',
                          boxShadow: '0 4px 12px -4px rgba(212,175,55,0.6)',
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-heading text-base font-semibold text-sand-50 sm:mt-6 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-night-50/68">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

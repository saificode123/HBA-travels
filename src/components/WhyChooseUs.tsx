import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Building2,
  CreditCard,
  Headphones,
  Shield,
  Users,
} from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import GradientOrbs from './GradientOrbs'

const featureIcons = [Shield, Building2, Users, BadgeCheck, Headphones, CreditCard]
const iconColors = [
  'text-gold-600',
  'text-gold-600',
  'text-sage-600',
  'text-gold-600',
  'text-sage-600',
  'text-gold-600',
]
const iconBgs = [
  'bg-gold-50',
  'bg-gold-50',
  'bg-sage-100',
  'bg-gold-50',
  'bg-sage-100',
  'bg-gold-50',
]

export default function WhyChooseUs() {
  const { whyChooseUs } = siteConfig

  return (
    <section
      className="premium-light-section vayron-section relative overflow-hidden"
      aria-labelledby="why-choose-us"
    >
      <GradientOrbs variant="light" className="opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={whyChooseUs.title} subtitle={whyChooseUs.subtitle} premium />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {whyChooseUs.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Shield
            const iconColor = iconColors[index] ?? 'text-gold-600'
            const iconBg = iconBgs[index] ?? 'bg-gold-50'
            return (
              <StaggerItem key={feature.title}>
                <div
                  className="glass-card-light group relative h-full overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-6"
                >
                  {/* Hover accent glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Index ghost number */}
                  <span
                    className="pointer-events-none absolute bottom-4 right-4 font-heading text-5xl font-bold text-night-900/[0.04] select-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <motion.div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} sm:h-13 sm:w-13 transition-all duration-400`}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  >
                    <Icon className={`h-6 w-6 sm:h-6 sm:w-6 ${iconColor}`} aria-hidden="true" />
                  </motion.div>

                  <h3 className="mt-4 font-heading text-base font-semibold text-night-900 sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/68">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-5 h-[1.5px] rounded-full origin-left transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(212,175,55,0.5), rgba(212,175,55,0.15))',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

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
import TiltCard from './TiltCard'

const featureIcons = [Shield, Building2, Users, BadgeCheck, Headphones, CreditCard]

export default function WhyChooseUs() {
  const { whyChooseUs } = siteConfig

  return (
    <section className="premium-light-section vayron-section" aria-labelledby="why-choose-us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={whyChooseUs.title} subtitle={whyChooseUs.subtitle} premium />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {whyChooseUs.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Shield
            return (
              <StaggerItem key={feature.title}>
                <TiltCard
                  className="glass-card-light h-full rounded-2xl p-5 sm:rounded-3xl sm:p-6"
                  maxTilt={6}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-gold-600 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold text-night-900 sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {feature.description}
                  </p>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

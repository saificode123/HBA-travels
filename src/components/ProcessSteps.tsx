import {
  ClipboardCheck,
  FileText,
  Headphones,
  MessageSquare,
} from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import TiltCard from './TiltCard'
import GradientOrbs from './GradientOrbs'

const stepIcons = [MessageSquare, FileText, ClipboardCheck, Headphones]

export default function ProcessSteps() {
  const { process } = siteConfig

  return (
    <section id="process" className="premium-dark-section relative overflow-hidden vayron-section">
      <GradientOrbs variant="dark" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={process.title} subtitle={process.subtitle} dark premium />

        <StaggerContainer>
          <div className="relative grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div
              className="absolute top-14 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent lg:block"
              aria-hidden="true"
            />

            {process.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? MessageSquare
              return (
                <StaggerItem key={step.title}>
                  <TiltCard
                    className="glass-card relative rounded-3xl p-6 text-center sm:p-7"
                    maxTilt={5}
                  >
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gold-400/30 bg-night-700/80 sm:h-24 sm:w-24">
                      <Icon className="h-8 w-8 text-gold-400 sm:h-10 sm:w-10" aria-hidden="true" />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-night-900 sm:h-8 sm:w-8 sm:text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-base font-semibold text-sand-50 sm:mt-6 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-night-50/70">
                      {step.description}
                    </p>
                  </TiltCard>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

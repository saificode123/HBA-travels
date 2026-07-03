import { Award, CheckCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import GradientOrbs from './GradientOrbs'
import SafeImage from './SafeImage'
import TiltCard from './TiltCard'

export default function About() {
  const { about } = siteConfig

  return (
    <section id="about" className="premium-light-section relative overflow-hidden py-20 lg:py-28">
      <GradientOrbs variant="light" className="opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={about.title} subtitle={about.subtitle} premium />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <StaggerContainer>
            <StaggerItem>
              <div className="about-photo-stack scene-3d relative mx-auto w-full max-w-md lg:max-w-none">
                {/* Makkah — primary */}
                <TiltCard maxTilt={7} glow fullHeight={false}>
                  <figure className="about-photo-card about-photo-main">
                    <SafeImage
                      src={about.makkahImage.src}
                      alt={about.makkahImage.alt}
                      width={about.makkahImage.width}
                      height={about.makkahImage.height}
                      loading="lazy"
                      className="about-photo-img"
                    />
                    <figcaption className="about-photo-caption">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                        {about.makkahLabel}
                      </p>
                      <p className="text-sm font-medium text-sand-50">{about.makkahLocation}</p>
                    </figcaption>
                  </figure>
                </TiltCard>

                {/* Medina — overlapping accent */}
                <TiltCard maxTilt={9} glow fullHeight={false}>
                  <figure className="about-photo-card about-photo-accent">
                    <SafeImage
                      src={about.madinahImage.src}
                      alt={about.madinahImage.alt}
                      width={about.madinahImage.width}
                      height={about.madinahImage.height}
                      loading="lazy"
                      className="about-photo-img"
                    />
                    <figcaption className="about-photo-caption">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-400 sm:text-xs">
                        {about.madinahLabel}
                      </p>
                      <p className="text-[10px] font-medium text-sand-50 sm:text-xs">
                        {about.madinahLocation}
                      </p>
                    </figcaption>
                  </figure>
                </TiltCard>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="space-y-7">
            <StaggerItem>
              <p className="text-base leading-[1.8] text-ink/75 sm:text-lg">{about.description}</p>
            </StaggerItem>

            <StaggerItem>
              <ul className="space-y-4">
                {about.values.map((value) => (
                  <li key={value} className="flex items-start gap-3 text-sm text-ink/80 sm:text-base">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.badges.map((badge) => (
                  <div key={badge.label} className="premium-card-light flex items-center gap-3 rounded-2xl p-4">
                    <Award className="h-8 w-8 shrink-0 text-gold-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-night-900">{badge.label}</p>
                      <p className="text-xs text-ink/55">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

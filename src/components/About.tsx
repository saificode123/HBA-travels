import { motion, useReducedMotion } from 'framer-motion'
import { Award, CheckCircle, Star } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import GradientOrbs from './GradientOrbs'
import SafeImage from './SafeImage'

export default function About() {
  const { about } = siteConfig
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="premium-light-section relative overflow-hidden vayron-section">
      <GradientOrbs variant="light" className="opacity-50" />

      {/* Subtle geometric overlay */}
      <div className="geo-pattern-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={about.title} subtitle={about.subtitle} premium />

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Photo Stack ─────────────────────────────────────────────── */}
          <StaggerContainer>
            <StaggerItem>
              <div className="about-photo-stack relative mx-auto w-full max-w-md lg:max-w-none">
                {/* Makkah — primary */}
                <div className="rounded-3xl shadow-xl overflow-hidden">
                  <figure className="about-photo-card about-photo-main group">
                    <SafeImage
                      src={about.makkahImage.src}
                      alt={about.makkahImage.alt}
                      width={about.makkahImage.width}
                      height={about.makkahImage.height}
                      loading="lazy"
                      className="about-photo-img transition-transform duration-700 ease-vayron group-hover:scale-[1.04]"
                    />
                    {/* Shine layer */}
                    <div className="card-shine absolute inset-0 group-hover:animate-[shimmer-sweep_1s_ease]" />
                    <figcaption className="about-photo-caption">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                        {about.makkahLabel}
                      </p>
                      <p className="text-sm font-medium text-sand-50">{about.makkahLocation}</p>
                    </figcaption>
                  </figure>
                </div>

                {/* Medina — overlapping accent */}
                <div className="rounded-3xl shadow-xl overflow-hidden">
                  <figure className="about-photo-card about-photo-accent group">
                    <SafeImage
                      src={about.madinahImage.src}
                      alt={about.madinahImage.alt}
                      width={about.madinahImage.width}
                      height={about.madinahImage.height}
                      loading="lazy"
                      className="about-photo-img transition-transform duration-700 ease-vayron group-hover:scale-[1.04]"
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
                </div>

                {/* Floating star rating badge */}
                <motion.div
                  className="glass-card-light absolute -top-5 -right-3 hidden sm:flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-lg lg:flex"
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    boxShadow: '0 8px 24px -8px rgba(13,23,48,0.2), 0 0 0 1px rgba(212,175,55,0.2)',
                  }}
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-night-900">Trusted Service</span>
                </motion.div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ── Right content ────────────────────────────────────────────── */}
          <StaggerContainer className="space-y-8 lg:pt-4">
            <StaggerItem>
              <p className="text-base leading-[1.82] text-ink/72 sm:text-[1.07rem]">
                {about.description}
              </p>
            </StaggerItem>

            <StaggerItem>
              <ul className="space-y-4">
                {about.values.map((value) => (
                  <motion.li
                    key={value}
                    className="flex items-start gap-3.5 text-sm text-ink/80 sm:text-base"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100">
                      <CheckCircle className="h-4 w-4 text-sage-600" aria-hidden="true" />
                    </span>
                    <span>{value}</span>
                  </motion.li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.badges.map((badge) => (
                  <motion.div
                    key={badge.label}
                    className="premium-card-light group flex items-center gap-3.5 rounded-2xl p-4 cursor-default"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <Award className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-night-900">{badge.label}</p>
                      <p className="text-xs text-ink/55">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

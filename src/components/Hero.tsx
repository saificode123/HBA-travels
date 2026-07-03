import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig'
import GeometricPattern from './GeometricPattern'
import GradientOrbs from './GradientOrbs'
import MagneticButton from './MagneticButton'
import SafeImage from './SafeImage'
import TiltCard from './TiltCard'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { hero } = siteConfig
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : 100])
  const contentY = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : 50])
  const opacity = useTransform(scrollY, [0, 400], [1, reduceMotion ? 1 : 0.6])

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id="home"
      className="premium-dark-section relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <GeometricPattern className="text-gold-400" opacity={0.06} />
      <GradientOrbs variant="hero" />
      <div className="mesh-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-night-900/20 via-transparent to-night-900" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">
        <motion.div
          style={{ y: contentY, opacity }}
          initial={reduceMotion ? false : { opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <motion.span
            className="premium-badge mb-6 inline-block"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {hero.badge}
          </motion.span>

          <p
            className="font-arabic mb-4 text-xl text-gold-400/90 sm:text-2xl"
            aria-hidden="true"
          >
            {hero.arabicAccent}
          </p>

          <h1 className="font-heading text-[clamp(2.35rem,5.8vw,4.75rem)] font-semibold leading-[1.06] tracking-tight text-sand-50">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.75] text-night-50/80 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MagneticButton variant="primary" onClick={scrollToPackages} className="w-full sm:w-auto">
              {hero.primaryCta}
            </MagneticButton>
            <MagneticButton
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {hero.secondaryCta}
            </MagneticButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-night-50/65">
            {hero.trustItems.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-2"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
          style={{ y: imageY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.88, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="scene-3d relative pb-8 pl-0 sm:pb-10 sm:pl-6">
            <TiltCard
              className="premium-card-dark relative overflow-hidden"
              maxTilt={16}
              glow
            >
              <SafeImage
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                loading="eager"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6] lg:min-h-[540px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/90 via-night-900/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-sand-50/10 bg-night-900/40 p-4 backdrop-blur-2xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-400">
                  {hero.primaryImageLabel}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-sand-50 sm:text-xl">
                  {hero.primaryImageLocation}
                </p>
              </div>
            </TiltCard>

            <motion.div
              className="absolute -bottom-2 left-0 z-10 w-[42%] overflow-hidden rounded-2xl border border-sand-50/15 shadow-2xl sm:-bottom-4 sm:w-[40%] lg:-left-2"
              initial={reduceMotion ? false : { opacity: 0, x: -24, y: 24 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SafeImage
                src={hero.secondaryImage.src}
                alt={hero.secondaryImage.alt}
                width={hero.secondaryImage.width}
                height={hero.secondaryImage.height}
                loading="eager"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <p className="text-[10px] font-semibold text-gold-400 sm:text-xs">
                  {hero.floatingCardLabel}
                </p>
                <p className="flex items-center gap-1 text-[10px] text-sand-50/90 sm:text-xs">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {hero.floatingCardLocation}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="glass-card absolute -right-1 top-4 z-10 rounded-2xl px-5 py-3.5 sm:-right-4 sm:top-6"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-heading text-2xl font-semibold text-gold-400">{hero.statsBadgeValue}</p>
              <p className="text-xs text-night-50/65">{hero.statsBadgeLabel}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

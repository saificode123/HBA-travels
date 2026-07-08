import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig'
import GeometricPattern from './GeometricPattern'
import GradientOrbs from './GradientOrbs'
import MagneticButton from './MagneticButton'
import SafeImage from './SafeImage'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { hero } = siteConfig
  const { scrollY } = useScroll()

  // Parallax transforms
  const imageY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 120])
  const contentY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 60])
  const opacity = useTransform(scrollY, [0, 450], [1, reduceMotion ? 1 : 0.55])

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
      {/* ── Background layers ──────────────────────────────────────────────── */}
      {/* Deep geometric grid */}
      <GeometricPattern className="text-gold-400" opacity={0.05} />

      {/* Animated gradient orbs */}
      <GradientOrbs variant="hero" />

      {/* Mesh gradient overlay */}
      <div className="mesh-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Cinematic vignette bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-900/10 via-transparent to-night-900" />

      {/* Subtle top arch ornament */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        style={{
          width: 'min(600px, 90vw)',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">

        {/* ── Left: content ──────────────────────────────────────────────── */}
        <motion.div
          style={{ y: contentY, opacity }}
          initial={reduceMotion ? false : { opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div
            className="premium-badge mb-7 inline-flex items-center justify-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {hero.badge}
          </motion.div>

          {/* Arabic accent */}
          <motion.p
            className="font-arabic mb-5 text-xl text-gold-400/90 sm:text-2xl"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textShadow: '0 0 24px rgba(212,175,55,0.35)',
            }}
          >
            {hero.arabicAccent}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-heading text-[clamp(2.4rem,5.8vw,4.85rem)] font-semibold leading-[1.05] tracking-tight text-sand-50"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Split title: first word gets gold gradient */}
            {hero.title.split(' ').map((word, i) => (
              <span
                key={i}
                className={i === 0 ? 'text-gold-gradient' : ''}
              >
                {word}{i < hero.title.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-xl text-base leading-[1.78] text-night-50/80 sm:text-[1.07rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              variant="primary"
              onClick={scrollToPackages}
              className="w-full sm:w-auto btn-shimmer"
            >
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
          </motion.div>

          {/* Trust indicators */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-night-50/65">
            {hero.trustItems.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-2"
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                  style={{ boxShadow: '0 0 10px rgba(212,175,55,0.7)' }}
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Right: image cluster ────────────────────────────────────────── */}
        <motion.div
          className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
          style={{ y: imageY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative pb-8 pr-0 sm:pb-10 sm:pr-6">
            {/* Main hero card */}
            <div
              className="premium-card-dark relative overflow-hidden rounded-3xl"
            >
              <SafeImage
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                loading="eager"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6] lg:min-h-[540px] transition-transform duration-[2s] ease-vayron hover:scale-105 translate-z-10"
              />
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/90 via-night-900/15 to-transparent translate-z-10" />

              {/* Card label */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-sand-50/10 bg-night-900/50 p-4 backdrop-blur-2xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5 translate-z-30">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-400">
                  {hero.primaryImageLabel}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-sand-50 sm:text-xl">
                  {hero.primaryImageLocation}
                </p>
              </div>

              {/* Card shine effect */}
              <div className="card-shine pointer-events-none absolute inset-0" />
            </div>

            {/* Floating mini card — Medina */}
            <motion.div
              className="absolute -bottom-2 right-0 z-10 w-[42%] overflow-hidden rounded-2xl border border-sand-50/15 shadow-2xl sm:-bottom-4 sm:w-[40%] lg:-right-4 translate-z-40"
              initial={reduceMotion ? false : { opacity: 0, x: 28, y: 28 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ boxShadow: '0 20px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12)' }}
            >
              <SafeImage
                src={hero.secondaryImage.src}
                alt={hero.secondaryImage.alt}
                width={hero.secondaryImage.width}
                height={hero.secondaryImage.height}
                loading="eager"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/85 to-transparent" />
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

            {/* Floating stats badge */}
            <motion.div
              className="glass-card stats-badge-float absolute -left-1 top-4 z-10 rounded-2xl px-5 py-3.5 sm:-left-4 sm:top-6 translate-z-50"
              initial={reduceMotion ? false : { opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <p
                className="font-heading text-2xl font-semibold text-gold-400"
                style={{ textShadow: '0 0 16px rgba(212,175,55,0.5)' }}
              >
                {hero.statsBadgeValue}
              </p>
              <p className="text-xs text-night-50/65">{hero.statsBadgeLabel}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-50/40">Scroll</p>
        <div className="relative h-10 w-5 rounded-full border border-night-50/20">
          <motion.div
            className="absolute top-1.5 left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-gold-400"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

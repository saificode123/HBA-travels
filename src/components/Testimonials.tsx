import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useState } from 'react'
import { testimonials } from '../config/testimonialsData'
import { siteConfig } from '../config/siteConfig'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const reduceMotion = useReducedMotion()
  const { testimonials: labels } = siteConfig

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  }
  const next = () => {
    setDirection(1)
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
  }

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.96,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      scale: 0.97,
      filter: 'blur(3px)',
    }),
  }

  return (
    <section
      id="testimonials"
      className="vayron-section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(175deg, #f9f4ea 0%, #f7f1e3 50%, #fdfbf6 100%)',
      }}
    >
      {/* Subtle radial bg accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} />

        {/* ── Featured testimonial ──────────────────────────────────────── */}
        <div className="relative mx-auto max-w-3xl">
          {/* Large quote icon */}
          <div
            className="pointer-events-none absolute -top-6 left-8 text-gold-400/12 select-none"
            aria-hidden="true"
          >
            <Quote className="h-24 w-24 fill-current" />
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={reduceMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="testimonial-card relative overflow-hidden rounded-3xl border border-sand-100 bg-sand-50 p-8 shadow-sm sm:p-10"
              style={{
                boxShadow:
                  '0 4px 32px -8px rgba(13,23,48,0.08), 0 1px 0 rgba(255,255,255,0.8) inset',
              }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-sand-50 shadow-md"
                  style={{ backgroundColor: testimonials[current].avatarColor }}
                  aria-hidden="true"
                  whileHover={{ scale: 1.08 }}
                >
                  {testimonials[current].initials}
                </motion.div>
                <div>
                  <p className="font-semibold text-night-900">{testimonials[current].name}</p>
                  <p className="text-sm text-ink/55">{testimonials[current].tripType}</p>
                </div>
              </div>

              {/* Stars */}
              <div
                className="mt-4 flex gap-1"
                aria-label={`${testimonials[current].rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={reduceMotion ? {} : { scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 16 }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        i < testimonials[current].rating
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-sand-100'
                      }`}
                      aria-hidden="true"
                    />
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative mt-6 text-[1.05rem] leading-[1.76] text-ink/78">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <motion.button
              type="button"
              onClick={prev}
              className="rounded-full border border-sand-100 bg-sand-50 p-2.5 text-night-700 shadow-sm transition-all duration-300 hover:border-gold-400/50 hover:bg-gold-50 hover:text-gold-600 hover:shadow-md"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <motion.button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    background:
                      i === current
                        ? 'linear-gradient(90deg, #D4AF37, #B8912C)'
                        : 'rgba(13,23,48,0.12)',
                    boxShadow: i === current ? '0 0 8px rgba(212,175,55,0.4)' : 'none',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  animate={{ width: i === current ? 24 : 8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={next}
              className="rounded-full border border-sand-100 bg-sand-50 p-2.5 text-night-700 shadow-sm transition-all duration-300 hover:border-gold-400/50 hover:bg-gold-50 hover:text-gold-600 hover:shadow-md"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* ── Secondary grid ────────────────────────────────────────────── */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              className="group cursor-pointer rounded-2xl border border-sand-100 bg-sand-50 p-5 shadow-sm transition-all duration-400"
              style={{
                boxShadow:
                  '0 2px 16px -6px rgba(13,23,48,0.06), 0 1px 0 rgba(255,255,255,0.8) inset',
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(212,175,55,0.35)',
                boxShadow:
                  '0 16px 40px -12px rgba(13,23,48,0.16), 0 0 0 1px rgba(212,175,55,0.12) inset',
              }}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-sand-50"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-night-900">{t.name}</p>
                  <p className="text-xs text-ink/55">{t.tripType}</p>
                </div>
              </div>
              {/* Mini stars */}
              <div className="mt-2.5 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-3 w-3 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink/68">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

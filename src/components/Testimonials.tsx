import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import { testimonials } from '../config/testimonialsData'
import { siteConfig } from '../config/siteConfig'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()
  const { testimonials: labels } = siteConfig

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section id="testimonials" className="vayron-section bg-sand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            key={current}
            className="rounded-2xl border border-sand-100 bg-sand-50 p-8 shadow-sm sm:p-10"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-sand-50"
                style={{ backgroundColor: testimonials[current].avatarColor }}
                aria-hidden="true"
              >
                {testimonials[current].initials}
              </div>
              <div>
                <p className="font-semibold text-night-900">{testimonials[current].name}</p>
                <p className="text-sm text-ink/60">{testimonials[current].tripType}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-1" aria-label={`${testimonials[current].rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonials[current].rating
                      ? 'fill-gold-400 text-gold-400'
                      : 'text-sand-100'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="mt-6 text-[1.05rem] leading-[1.7] text-ink/80">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-sand-100 bg-sand-50 p-2 text-night-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-gold-400' : 'w-2 bg-sand-100'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="rounded-full border border-sand-100 bg-sand-50 p-2 text-night-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-sand-100 bg-sand-50 p-5 shadow-sm"
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
                  <p className="text-xs text-ink/60">{t.tripType}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/70 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

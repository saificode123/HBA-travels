import { motion, useReducedMotion } from 'framer-motion'
import { Check, MapPin, MessageCircle, X, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { getPackageWhatsAppUrl, siteConfig } from '../config/siteConfig'
import type { Package } from '../config/packagesData'
import SafeImage from './SafeImage'

interface PackageCardProps {
  pkg: Package
  index: number
}

const badgeColors: Record<string, string> = {
  'Most Popular':
    'bg-gradient-to-r from-gold-400 to-gold-600 text-night-900 shadow-[0_4px_12px_-4px_rgba(212,175,55,0.5)]',
  Premium: 'bg-night-700 text-sand-50',
  Economy: 'bg-sage-100 text-sage-600',
  VIP: 'bg-gradient-to-r from-gold-600 to-gold-800 text-sand-50',
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { packages: pkgLabels } = siteConfig

  const currencySymbol = pkg.currency === 'USD' ? '$' : pkg.currency === 'GBP' ? '£' : 'SAR '

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <div
          className="premium-card-light group flex h-full flex-col overflow-hidden rounded-3xl"
        >
          {/* ── Card image ──────────────────────────────────────────────── */}
          <div className="arch-frame-top relative h-48 overflow-hidden sm:h-56">
            <SafeImage
              src={pkg.coverImage}
              alt={`${pkg.name} package cover`}
              width={800}
              height={400}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-vayron group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/60 via-night-900/15 to-transparent" />

            {/* Badge */}
            {pkg.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm translate-z-30 ${
                  badgeColors[pkg.badge] ?? 'bg-gold-400 text-night-900'
                }`}
              >
                {pkg.badge}
              </span>
            )}

            {/* Duration pill */}
            <span className="absolute bottom-4 right-4 rounded-full border border-sand-50/20 bg-night-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-sand-50/90 backdrop-blur-sm translate-z-20">
              {pkg.durationDays} days
            </span>

            {/* Shine */}
            <div className="card-shine absolute inset-0" />
          </div>

          {/* ── Card body ───────────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col p-5 sm:p-6 translate-z-20">
            <h3 className="font-heading text-lg font-semibold text-night-900 sm:text-xl translate-z-10">
              {pkg.name}
            </h3>
            <p className="mt-1 text-sm text-ink/60">{pkg.tagline}</p>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-baseline gap-2">
              <span
                className="font-heading text-2xl font-semibold sm:text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8912C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {currencySymbol}
                {pkg.priceFrom.toLocaleString()}
              </span>
              <span className="text-xs text-ink/50">{pkgLabels.perPersonNote}</span>
            </div>

            {/* Inclusions */}
            <ul className="mt-5 flex-1 space-y-2.5">
              {pkg.inclusions.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <Check className="h-3 w-3 text-sage-600" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 rounded-full border border-gold-400/30 bg-gold-50/60 px-4 py-3 text-sm font-semibold text-gold-600 transition-all duration-300 hover:border-gold-400 hover:bg-gold-50 hover:shadow-[0_4px_16px_-4px_rgba(212,175,55,0.35)]"
                onClick={() => setDetailsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {pkgLabels.viewDetails}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.button>
              <a
                href={getPackageWhatsAppUrl(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-sage-400/35 bg-sage-100 px-4 py-3 text-sm font-semibold text-sage-600 transition-all duration-300 hover:bg-sage-400/20 hover:border-sage-400/60 hover:shadow-[0_4px_16px_-4px_rgba(88,122,93,0.25)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {pkgLabels.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Details Modal ──────────────────────────────────────────────────── */}
      {detailsOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${pkg.name} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-night-900/70 backdrop-blur-xl"
            onClick={() => setDetailsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.div
            className="relative max-h-[93svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-sand-50 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 80, scale: 0.94, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-100 bg-sand-50/96 px-5 py-4 backdrop-blur-lg sm:px-6">
              <h3 className="font-heading text-lg font-semibold text-night-900 sm:text-xl">
                {pkg.name}
              </h3>
              <motion.button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-xl border border-sand-100 p-2 text-night-700 hover:border-gold-400/40 hover:bg-gold-50"
                aria-label={pkgLabels.closeDetails}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="space-y-7 p-5 sm:p-7">
              {/* Hotel info */}
              <div className="flex flex-col gap-2.5 text-sm text-ink/70 sm:flex-row sm:flex-wrap sm:gap-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                  Makkah: {pkg.hotelMakkah} ({pkg.hotelMakkahDistanceMeters}m)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                  Madinah: {pkg.hotelMadinah} ({pkg.hotelMadinahDistanceMeters}m)
                </span>
              </div>

              {/* Itinerary */}
              <div>
                <h4 className="font-semibold text-night-900">{pkgLabels.itineraryTitle}</h4>
                <ol className="mt-4 space-y-4">
                  {pkg.itinerary.map((day) => (
                    <li key={day.day} className="relative border-l-2 border-gold-200 pl-5">
                      <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-gold-400" />
                      <p className="text-sm font-semibold text-gold-600">
                        Day {day.day}: {day.title}
                      </p>
                      <p className="mt-1 text-sm text-ink/70">{day.description}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-night-900">{pkgLabels.inclusionsTitle}</h4>
                  <ul className="mt-3 space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sage-100">
                          <Check className="h-3 w-3 text-sage-600" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-night-900">{pkgLabels.exclusionsTitle}</h4>
                  <ul className="mt-3 space-y-2">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sand-100">
                          <X className="h-3 w-3 text-ink/40" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href={getPackageWhatsAppUrl(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-night-900 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8912C 100%)',
                  boxShadow: '0 8px 24px -6px rgba(212,175,55,0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px -8px rgba(212,175,55,0.55)' }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-4 w-4" />
                {pkgLabels.whatsappCta}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

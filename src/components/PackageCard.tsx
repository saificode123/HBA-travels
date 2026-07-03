import { motion, useReducedMotion } from 'framer-motion'
import { Check, MapPin, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { getPackageWhatsAppUrl, siteConfig } from '../config/siteConfig'
import type { Package } from '../config/packagesData'
import MagneticButton from './MagneticButton'
import SafeImage from './SafeImage'
import TiltCard from './TiltCard'

interface PackageCardProps {
  pkg: Package
  index: number
}

const badgeColors: Record<string, string> = {
  'Most Popular': 'bg-gold-400 text-night-900',
  Premium: 'bg-night-700 text-sand-50',
  Economy: 'bg-sage-100 text-sage-600',
  VIP: 'bg-gold-600 text-sand-50',
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { packages: pkgLabels } = siteConfig

  const currencySymbol = pkg.currency === 'USD' ? '$' : pkg.currency === 'GBP' ? '£' : 'SAR '

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <TiltCard
          className="premium-card-light group flex h-full flex-col overflow-hidden"
          maxTilt={8}
          glow
        >
          <div className="arch-frame-top relative h-44 overflow-hidden sm:h-52">
            <SafeImage
              src={pkg.coverImage}
              alt={`${pkg.name} package cover`}
              width={800}
              height={400}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-vayron group-hover:scale-110"
            />
            {pkg.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                  badgeColors[pkg.badge] ?? 'bg-gold-400 text-night-900'
                }`}
              >
                {pkg.badge}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="font-heading text-lg font-semibold text-night-900 sm:text-xl">{pkg.name}</h3>
            <p className="mt-1 text-sm text-ink/60">{pkg.tagline}</p>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="font-heading text-2xl font-semibold text-gold-600">
                {currencySymbol}
                {pkg.priceFrom.toLocaleString()}
              </span>
              <span className="text-xs text-ink/50">{pkgLabels.perPersonNote}</span>
            </div>

            <p className="mt-2 text-sm text-ink/70">{pkg.durationDays} days</p>

            <ul className="mt-4 flex-1 space-y-2">
              {pkg.inclusions.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                variant="ghost"
                className="flex-1 text-sm"
                onClick={() => setDetailsOpen(true)}
              >
                {pkgLabels.viewDetails}
              </MagneticButton>
              <a
                href={getPackageWhatsAppUrl(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-sage-400/40 bg-sage-100 px-4 py-3 text-sm font-semibold text-sage-600 transition-colors hover:bg-sage-400/20"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {pkgLabels.whatsappCta}
              </a>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {detailsOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${pkg.name} details`}
        >
          <div
            className="absolute inset-0 bg-night-900/60 backdrop-blur-md"
            onClick={() => setDetailsOpen(false)}
          />
          <motion.div
            className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-sand-50 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 60, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sand-100 bg-sand-50/95 px-5 py-4 backdrop-blur-md sm:px-6">
              <h3 className="font-heading text-lg font-semibold text-night-900 sm:text-xl">{pkg.name}</h3>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-lg p-2 text-night-700 hover:bg-sand-100"
                aria-label={pkgLabels.closeDetails}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex flex-col gap-2 text-sm text-ink/70 sm:flex-row sm:flex-wrap sm:gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                  Makkah: {pkg.hotelMakkah} ({pkg.hotelMakkahDistanceMeters}m)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                  Madinah: {pkg.hotelMadinah} ({pkg.hotelMadinahDistanceMeters}m)
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-night-900">{pkgLabels.itineraryTitle}</h4>
                <ol className="mt-3 space-y-4">
                  {pkg.itinerary.map((day) => (
                    <li key={day.day} className="border-l-2 border-gold-200 pl-4">
                      <p className="text-sm font-semibold text-gold-600">
                        Day {day.day}: {day.title}
                      </p>
                      <p className="mt-1 text-sm text-ink/70">{day.description}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-night-900">{pkgLabels.inclusionsTitle}</h4>
                  <ul className="mt-2 space-y-1">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                        <Check className="mt-0.5 h-4 w-4 text-sage-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-night-900">{pkgLabels.exclusionsTitle}</h4>
                  <ul className="mt-2 space-y-1">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                        <X className="mt-0.5 h-4 w-4 text-ink/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={getPackageWhatsAppUrl(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3 font-semibold text-night-900 transition-colors hover:bg-gold-600"
              >
                <MessageCircle className="h-4 w-4" />
                {pkgLabels.whatsappCta}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

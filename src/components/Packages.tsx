import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { packages } from '../config/packagesData'
import { siteConfig } from '../config/siteConfig'
import PackageCard from './PackageCard'
import SectionHeading, { StaggerContainer } from './SectionHeading'

type Category = 'umrah' | 'hajj'

export default function Packages() {
  const [category, setCategory] = useState<Category>('umrah')
  const reduceMotion = useReducedMotion()
  const { packages: labels } = siteConfig
  const filtered = packages.filter((pkg) => pkg.category === category)

  return (
    <section id="packages" className="premium-light-section vayron-section relative overflow-hidden">
      {/* Subtle geometric overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L48 32 L80 40 L48 48 L40 80 L32 48 L0 40 L32 32 Z' fill='none' stroke='%230D1730' stroke-width='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} premium />

        {/* ── Category Tabs ──────────────────────────────────────────────── */}
        <div className="mb-12 flex justify-center">
          <div
            className="relative inline-flex rounded-full border border-sand-100 bg-sand-50 p-1 shadow-sm"
            role="tablist"
            aria-label="Package category"
            style={{ boxShadow: '0 4px 16px -4px rgba(13,23,48,0.08), 0 1px 0 rgba(255,255,255,0.8) inset' }}
          >
            {(['umrah', 'hajj'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={`package-tab relative rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-350 ${
                  category === cat
                    ? 'package-tab-active text-night-900'
                    : 'text-ink/65 hover:text-night-900'
                }`}
              >
                {category === cat && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    layoutId="pkg-tab-active"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8912C 100%)',
                      boxShadow: '0 4px 16px -4px rgba(212,175,55,0.5), 0 1px 0 rgba(255,255,255,0.2) inset',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === 'umrah' ? labels.umrahTab : labels.hajjTab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Package Cards ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <StaggerContainer>
              <div className="grid gap-8 md:grid-cols-2">
                {filtered.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

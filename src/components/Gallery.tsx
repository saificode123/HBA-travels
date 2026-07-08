import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import SafeImage from './SafeImage'

const spanClasses = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1 sm:col-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  const { gallery } = siteConfig

  const goNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.images.length))
  const goPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + gallery.images.length) % gallery.images.length
    )

  return (
    <section
      id="gallery"
      className="premium-dark-section relative overflow-hidden vayron-section"
      aria-labelledby="gallery-heading"
    >
      {/* Subtle geometric overlay */}
      <div className="geo-pattern-overlay" aria-hidden="true" />
      <div
        className="mesh-gradient pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-heading"
          title={gallery.title}
          subtitle={gallery.subtitle}
          dark
          premium
        />

        <StaggerContainer
          className="grid grid-cols-2 auto-rows-[165px] gap-3 sm:auto-rows-[205px] sm:gap-4 lg:auto-rows-[225px] lg:grid-cols-4 lg:gap-5"
        >
          {gallery.images.map((image, index) => (
            <StaggerItem key={image.src} className={spanClasses[index] ?? 'col-span-1'}>
              <div className="h-full">
                <motion.button
                  type="button"
                  className="group relative h-full w-full overflow-hidden rounded-2xl bg-night-700/40 shadow-lg lg:rounded-3xl"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`View larger: ${image.alt}`}
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  style={{
                    boxShadow:
                      '0 8px 32px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(253,251,246,0.05)',
                  }}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[750ms] ease-vayron group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-night-900/15 to-transparent opacity-90 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Label */}
                  <p className="absolute bottom-3 left-3 right-10 line-clamp-2 text-left text-[10px] font-medium leading-snug text-sand-50 sm:bottom-4 sm:left-4 sm:text-xs">
                    {image.alt}
                  </p>

                  {/* Zoom icon */}
                  <motion.div
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-sand-50/20 bg-night-900/40 backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <ZoomIn className="h-4 w-4 text-sand-50" aria-hidden="true" />
                  </motion.div>

                  {/* Hover: zoom icon reveal via group */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-sand-50/20 bg-night-900/40 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                    <ZoomIn className="h-4 w-4 text-sand-50" aria-hidden="true" />
                  </div>

                  {/* Card shine */}
                  <div className="card-shine absolute inset-0 group-hover:animate-[shimmer-sweep_1s_ease]" />
                </motion.button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-2xl"
            style={{ background: 'rgba(13,23,48,0.97)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <motion.button
              type="button"
              className="absolute right-5 top-5 z-10 rounded-full border border-sand-50/15 bg-night-700/80 p-2.5 text-sand-50 backdrop-blur-sm hover:border-gold-400/40 hover:bg-night-600/80"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>

            {/* Prev button */}
            <motion.button
              type="button"
              className="absolute left-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-sand-50/15 bg-night-700/80 p-3 text-sand-50 backdrop-blur-sm hover:border-gold-400/40"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              aria-label="Previous image"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Next button */}
            <motion.button
              type="button"
              className="absolute right-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-sand-50/15 bg-night-700/80 p-3 text-sand-50 backdrop-blur-sm hover:border-gold-400/40"
              onClick={(e) => { e.stopPropagation(); goNext() }}
              aria-label="Next image"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>

            {/* Image */}
            <motion.div
              className="max-h-[88vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.84, rotateX: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? {} : { opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            >
              <SafeImage
                src={gallery.images[lightboxIndex].src}
                alt={gallery.images[lightboxIndex].alt}
                className="max-h-[78vh] w-full rounded-2xl object-contain"
                style={{
                  boxShadow:
                    '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)',
                }}
              />
              <p className="mt-5 text-center text-sm text-night-50/65">
                {gallery.images[lightboxIndex].alt}
              </p>
            </motion.div>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
              {gallery.images.map((_, i) => (
                <motion.button
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === lightboxIndex ? '20px' : '6px',
                    background:
                      i === lightboxIndex
                        ? 'linear-gradient(90deg, #D4AF37, #B8912C)'
                        : 'rgba(253,251,246,0.25)',
                  }}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                  aria-label={`Go to image ${i + 1}`}
                  animate={{ width: i === lightboxIndex ? 20 : 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

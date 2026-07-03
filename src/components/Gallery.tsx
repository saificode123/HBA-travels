import { motion, useReducedMotion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import TiltCard from './TiltCard'
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

  return (
    <section
      id="gallery"
      className="premium-light-section relative overflow-hidden py-20 lg:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={gallery.title} subtitle={gallery.subtitle} premium />

        <StaggerContainer className="grid grid-cols-2 auto-rows-[160px] gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-5">
          {gallery.images.map((image, index) => (
            <StaggerItem key={image.src} className={spanClasses[index] ?? 'col-span-1'}>
              <TiltCard className="h-full" maxTilt={8} glow>
                <button
                  type="button"
                  className="group relative h-full w-full overflow-hidden rounded-2xl border border-night-900/5 bg-night-900/5 shadow-md lg:rounded-3xl"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`View larger: ${image.alt}`}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-vayron group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-900/75 via-night-900/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  <p className="absolute bottom-3 left-3 right-10 line-clamp-2 text-left text-[10px] font-medium leading-snug text-sand-50 sm:bottom-4 sm:left-4 sm:text-xs">
                    {image.alt}
                  </p>
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-sand-50/20 bg-night-900/30 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4 text-sand-50" aria-hidden="true" />
                  </div>
                </button>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-night-900/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full border border-sand-50/10 bg-night-700/80 p-2.5 text-sand-50"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            className="max-h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <SafeImage
              src={gallery.images[lightboxIndex].src}
              alt={gallery.images[lightboxIndex].alt}
              className="max-h-[78vh] w-full rounded-2xl object-contain shadow-3d-lg"
            />
            <p className="mt-4 text-center text-sm text-night-50/75">
              {gallery.images[lightboxIndex].alt}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}

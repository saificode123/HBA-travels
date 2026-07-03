import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ImageEntry } from '../config/images'
import { resize, sacredImages } from '../config/images'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'
import GradientOrbs from './GradientOrbs'
import SafeImage from './SafeImage'
import TiltCard from './TiltCard'

const { sacredSites } = siteConfig

interface SiteCard {
  image: ImageEntry
  location: string
  title: string
  description: string
  index: string
  layout: 'feature' | 'standard'
}

const sites: SiteCard[] = [
  {
    image: resize(sacredImages.makkah.pilgrimsTawaf, 1200, 900),
    location: 'Mecca, Saudi Arabia',
    title: sacredSites.makkahTitle,
    description: sacredSites.makkahDescription,
    index: '01',
    layout: 'feature',
  },
  {
    image: resize(sacredImages.madinah.greenDome, 900, 720),
    location: 'Medina, Saudi Arabia',
    title: sacredSites.madinahTitle,
    description: sacredSites.madinahDescription,
    index: '02',
    layout: 'standard',
  },
  {
    image: resize(sacredImages.makkah.prayerInside, 900, 680),
    location: 'Mecca, Saudi Arabia',
    title: sacredSites.haramInteriorTitle,
    description: sacredSites.haramInteriorDescription,
    index: '03',
    layout: 'standard',
  },
  {
    image: resize(sacredImages.madinah.greenDomeMajestic, 1200, 720),
    location: sacredSites.nabawiArchitectureLocation,
    title: sacredSites.nabawiArchitectureTitle,
    description: sacredSites.nabawiArchitectureDescription,
    index: '04',
    layout: 'standard',
  },
]

function DestinationCard({ site }: { site: SiteCard }) {
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 })
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const isFeature = site.layout === 'feature'

  return (
    <TiltCard maxTilt={isFeature ? 8 : 6} glow fullHeight>
      <article
        className={`sacred-card group relative w-full overflow-hidden ${
          isFeature ? 'sacred-card-feature' : 'sacred-card-standard'
        }`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div className="absolute inset-0 overflow-hidden" style={{ x: imgX, y: imgY }}>
          <SafeImage
            src={site.image.src}
            alt={site.image.alt}
            width={site.image.width}
            height={site.image.height}
            loading="lazy"
            className="h-[115%] w-[115%] max-w-none object-cover transition-transform duration-700 ease-vayron group-hover:scale-105"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/55 to-night-900/15" />
        <div className="card-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-night-900/55 px-3 py-1.5 text-xs font-medium text-sand-50/95 backdrop-blur-xl">
              <MapPin className="h-3 w-3 text-gold-400" aria-hidden="true" />
              {site.location}
            </span>
            <span className="font-heading text-3xl font-semibold text-sand-50/15 sm:text-4xl">
              {site.index}
            </span>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-semibold text-sand-50 sm:text-[1.65rem]">
              {site.title}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-night-50/75 sm:text-base">
              {site.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Explore
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    </TiltCard>
  )
}

export default function SacredSites() {
  return (
    <section
      id="sacred-sites"
      className="premium-dark-section relative overflow-hidden py-20 lg:py-28"
      aria-labelledby="sacred-sites-heading"
    >
      <GradientOrbs variant="dark" />
      <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={sacredSites.title} subtitle={sacredSites.subtitle} dark premium />

        <StaggerContainer className="sacred-bento-grid">
          {sites.map((site) => (
            <StaggerItem
              key={site.index}
              className={`h-full ${site.layout === 'feature' ? 'sacred-bento-feature' : 'sacred-bento-item'}`}
            >
              <DestinationCard site={site} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

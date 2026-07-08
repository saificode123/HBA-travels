import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Building2, MapPin, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SafeImage from './SafeImage'

/* ─── Hotel data ───────────────────────────────────────────────────────────── */

interface Hotel {
  name: string
  stars?: number
  distance?: string
  tag?: string
  img: string
  alt: string
}

function u(id: string, w = 600, h = 400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`
}

const MAKKAH_HOTELS: Hotel[] = [
  {
    name: 'M Hotel Makkah by Millennium',
    stars: 5,
    distance: 'Shuttle Service',
    tag: '5-Star',
    img: u('photo-1566073771259-470ef2e48c53', 700, 480),
    alt: 'M Hotel Makkah by Millennium — 5-star luxury hotel',
  },
  {
    name: 'Voco Makkah',
    stars: 4,
    distance: 'Shuttle Service',
    tag: '4-Star',
    img: u('photo-1564501049412-61c2a3083791', 700, 480),
    alt: 'Voco Makkah — 4-star IHG hotel near the Haram',
  },
  {
    name: 'Novotel Thakher',
    stars: 4,
    distance: 'Ghaza Bus Station',
    tag: '4-Star',
    img: u('photo-1551882547-ff40c63fe2c0', 700, 480),
    alt: 'Novotel Thakher Makkah — 4-star Accor hotel',
  },
  {
    name: 'Four Points by Sheraton',
    stars: 4,
    distance: 'Shuttle Service',
    tag: '4-Star',
    img: u('photo-1520250497591-112f2f40a3f4', 700, 480),
    alt: 'Four Points by Sheraton Makkah',
  },
  {
    name: 'Al Kiswah Tower',
    stars: 4,
    distance: '300-M from Haram',
    tag: '4-Star · Al-Taysir',
    img: u('photo-1542314831-068cd1dbfeeb', 700, 480),
    alt: 'Al Kiswah Tower — 4-star hotel, Shahra Al-Taysir, Makkah',
  },
  {
    name: 'Badar Al Masa',
    distance: '600-M from Haram',
    img: u('photo-1571896349842-33c89424de2d', 700, 480),
    alt: 'Badar Al Masa hotel, Makkah',
  },
  {
    name: 'Fawad Nassa (Sawaid & Atkar)',
    distance: '800-M from Haram',
    img: u('photo-1578683010236-d716f9a3f461', 700, 480),
    alt: 'Fawad Nassa hotel, Shahra Ibrahim Khalil, Makkah',
  },
  {
    name: 'Shaza Al Wasam-2',
    distance: '600-M from Haram',
    tag: 'Shahra Ajiad',
    img: u('photo-1631049307264-da0ec9d70304', 700, 480),
    alt: 'Shaza Al Wasam-2, Shahra Ajiad, Makkah',
  },
  {
    name: 'Shaza Wasam-3/4 / Wahdat Al Khair',
    distance: '650-M from Haram',
    img: u('photo-1590490360182-c33d57733427', 700, 480),
    alt: 'Shaza Wasam 3/4 Wahdat Al Khair, Makkah',
  },
  {
    name: 'Fundaq Bilal',
    distance: '1100-M from Haram',
    tag: 'Shuttle Service',
    img: u('photo-1611892440504-42a792e24d32', 700, 480),
    alt: 'Fundaq Bilal hotel, Makkah',
  },
  {
    name: 'Diyar Mather',
    distance: '1200-M from Haram',
    tag: 'Shara\'bad Area',
    img: u('photo-1596436889106-be35e843f974', 700, 480),
    alt: 'Diyar Mather hotel, Sharabiad area, Makkah',
  },
  {
    name: 'Hiba Hijrah-6',
    distance: 'Shuttle Service',
    img: u('photo-1613490493576-7fde63acd811', 700, 480),
    alt: 'Hiba Hijrah-6 hotel, Makkah',
  },
  {
    name: 'Salam Addar / Equal',
    img: u('photo-1584132967334-10e028bd69f7', 700, 480),
    alt: 'Salam Addar Equal hotel, Makkah',
  },
  {
    name: 'Akabir Hijrah / Areej Wafa / Mather Elite',
    distance: '300-M from Haram',
    tag: 'Bakar Chowk Area',
    img: u('photo-1582719508461-905c673771fd', 700, 480),
    alt: 'Akabir Hijrah Areej Wafa Mather Elite, Makkah',
  },
]

const MADINA_HOTELS: Hotel[] = [
  {
    name: 'Retaj Rawdah',
    stars: 3,
    distance: 'Shumaila Side',
    img: u('photo-1595526114035-0d45ed16cfbf', 700, 480),
    alt: 'Retaj Rawdah 3-star hotel, Madina',
  },
  {
    name: 'Waqar International',
    distance: '700-M from Masjid',
    img: u('photo-1590490360182-c33d57733427', 700, 480),
    alt: 'Waqar International hotel, Madina',
  },
  {
    name: 'Marina Zahbi',
    distance: 'Walking Distance',
    tag: 'Near Masjid',
    img: u('photo-1566073771259-470ef2e48c53', 700, 480),
    alt: 'Marina Zahbi hotel, walking distance to Masjid an-Nabawi, Madina',
  },
  {
    name: 'Waqar Salmiya / Jood Marjan',
    distance: '700-M from Masjid',
    tag: 'Masjid Bilal Side',
    img: u('photo-1564501049412-61c2a3083791', 700, 480),
    alt: 'Waqar Salmiya Jood Marjan hotel, Madina',
  },
  {
    name: 'Rua Al Khair',
    distance: '300-M from Masjid',
    tag: 'Badal Salam Side',
    img: u('photo-1578683010236-d716f9a3f461', 700, 480),
    alt: 'Rua Al Khair hotel (formerly Amlaj Al Saleem), Madina',
  },
  {
    name: 'Ajiyal Taiba',
    distance: '500-M from Masjid',
    img: u('photo-1551882547-ff40c63fe2c0', 700, 480),
    alt: 'Ajiyal Taiba hotel, Madina',
  },
  {
    name: 'Nuzul Waqar',
    distance: '550-M from Masjid',
    tag: 'Masjid Bilal Side',
    img: u('photo-1596436889106-be35e843f974', 700, 480),
    alt: 'Nuzul Waqar hotel, Madina',
  },
  {
    name: 'Nida Taiba',
    tag: 'Masjid Bilal Side',
    img: u('photo-1571896349842-33c89424de2d', 700, 480),
    alt: 'Nida Taiba hotel, Madina',
  },
  {
    name: 'Shams Madinah',
    distance: '100-M after Al Baik',
    tag: 'Markazia Area',
    img: u('photo-1613490493576-7fde63acd811', 700, 480),
    alt: 'Shams Madinah hotel, Markazia area, Madina',
  },
  {
    name: 'Ajiyal-2',
    distance: '650-M from Masjid',
    tag: 'Shumaila Side',
    img: u('photo-1631049307264-da0ec9d70304', 700, 480),
    alt: 'Ajiyal-2 hotel, Shumaila side, Madina',
  },
  {
    name: 'Rua Luxury',
    distance: '70-M from Masjid',
    tag: 'Markazia · Golden Luxury',
    img: u('photo-1611892440504-42a792e24d32', 700, 480),
    alt: 'Rua Luxury hotel (formerly Golden Luxury), Markazia, Madina',
  },
  {
    name: 'Any Hotel in Markazia',
    distance: '250–300-M from Masjid',
    img: u('photo-1520250497591-112f2f40a3f4', 700, 480),
    alt: 'Markazia area hotels, near Masjid an-Nabawi, Madina',
  },
]

/* ─── Hotel Card ───────────────────────────────────────────────────────────── */

function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="hotel-card group"
      initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.94, rotateX: 8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 48, scale: 0.94, rotateX: 8 }
      }
      transition={{
        delay: (index % 4) * 0.08,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
    >
      {/* Image */}
      <div className="hotel-card-img-wrap">
        <SafeImage
          src={hotel.img}
          alt={hotel.alt}
          width={700}
          height={480}
          loading="lazy"
          className="hotel-card-img"
        />
        {/* Gradient overlay */}
        <div className="hotel-card-overlay" />

        {/* Stars badge */}
        {hotel.stars && (
          <div className="hotel-stars-badge">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-gold-400 text-gold-400" aria-hidden="true" />
            ))}
          </div>
        )}

        {/* Tag badge */}
        {hotel.tag && !hotel.stars && (
          <div className="hotel-tag-badge">{hotel.tag}</div>
        )}
        {hotel.tag && hotel.stars && (
          <div className="hotel-tag-badge hotel-tag-badge-bottom">{hotel.tag}</div>
        )}
      </div>

      {/* Info */}
      <div className="hotel-card-info">
        <h3 className="hotel-card-name">{hotel.name}</h3>
        {hotel.distance && (
          <p className="hotel-card-distance">
            <MapPin className="h-3 w-3 shrink-0 text-gold-400" aria-hidden="true" />
            {hotel.distance}
          </p>
        )}
      </div>

      {/* Gold bottom border on hover */}
      <div className="hotel-card-border" aria-hidden="true" />
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────────────────────── */

type Tab = 'makkah' | 'madina'

export default function HotelsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('makkah')
  const hotels = activeTab === 'makkah' ? MAKKAH_HOTELS : MADINA_HOTELS

  return (
    <section
      id="hotels"
      className="premium-dark-section relative overflow-hidden vayron-section"
      aria-labelledby="hotels-heading"
    >
      {/* Geometric overlay */}
      <div className="geo-pattern-overlay" aria-hidden="true" />
      <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Top decorative line */}
      <div className="section-divider absolute top-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="hotels-heading"
          title="Our Partner Hotels"
          subtitle="Carefully selected accommodations in Makkah and Madina — chosen for proximity, comfort, and pilgrim suitability"
          dark
          premium
        />

        {/* ── Tab switcher ────────────────────────────────────────────── */}
        <div className="hotels-tab-bar mb-12">
          {(['makkah', 'madina'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              id={`hotel-tab-${tab}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`hotel-panel-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`hotels-tab-btn ${activeTab === tab ? 'hotels-tab-btn-active' : ''}`}
            >
              <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              {tab === 'makkah' ? 'Makkah Hotels' : 'Madina Hotels'}
              <span className="hotels-tab-count">
                {tab === 'makkah' ? MAKKAH_HOTELS.length : MADINA_HOTELS.length}
              </span>
              {activeTab === tab && (
                <motion.span
                  className="hotels-tab-active-pill"
                  layoutId="hotels-tab-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Hotel grid ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`hotel-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`hotel-tab-${activeTab}`}
            className="hotels-grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {hotels.map((hotel, i) => (
              <HotelCard key={hotel.name} hotel={hotel} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer note ─────────────────────────────────────────────── */}
        <motion.p
          className="mt-14 text-center text-xs text-night-50/35 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          All hotels are verified for quality and pilgrim suitability. Availability subject to season and booking.
        </motion.p>
      </div>
    </section>
  )
}

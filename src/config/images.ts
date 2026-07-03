/** Verified image CDN helpers — swap for client-licensed photography before launch */

export type ImageEntry = {
  src: string
  alt: string
  width: number
  height: number
}

const FALLBACK_SRC =
  'https://images.unsplash.com/photo-1579305796538-03268c05b65c?auto=format&fit=crop&w=1200&q=80'

function unsplash(id: string, w: number, h?: number): string {
  const height = h ? `&h=${h}` : ''
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${height}&q=80`
}

/** Pexels IDs 35258791 & 34500891 verified as Masjid an-Nabawi green dome */
function pexels(id: 35258791 | 34500891, w: number, h?: number): string {
  const height = h ? `&h=${h}` : ''
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${height}&fit=crop`
}

/** Makkah / Kaaba — Unsplash (HTTP 200 verified) */
const makkah = {
  kaabaLandmark: {
    src: unsplash('photo-1579305796538-03268c05b65c', 1600, 900),
    alt: 'The Kaaba at Masjid al-Haram, Mecca — Islam\'s holiest site',
    width: 1600,
    height: 900,
  },
  pilgrimsTawaf: {
    src: unsplash('photo-1770786106021-52580470e31e', 1200, 800),
    alt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram, Mecca',
    width: 1200,
    height: 800,
  },
  prayerInside: {
    src: unsplash('photo-1744711815074-1f12a88cc5d1', 1200, 800),
    alt: 'Muslims praying inside Masjid al-Haram near the Kaaba, Mecca',
    width: 1200,
    height: 800,
  },
  worshipers: {
    src: unsplash('photo-1554794470-42d3cd193ecc', 1200, 800),
    alt: 'Worshipers surrounding the Kaaba at the Grand Mosque, Mecca',
    width: 1200,
    height: 800,
  },
  kaabaCourtyard: {
    src: unsplash('photo-1542521148-51306e7ffc1e', 1200, 800),
    alt: 'The Kaaba and courtyard of Masjid al-Haram, Mecca',
    width: 1200,
    height: 800,
  },
  approachMosque: {
    src: unsplash('photo-1579003223313-8053dc9d10aa', 1200, 800),
    alt: 'Pendant lamps beside a window overlooking Masjid al-Haram, Makkah, Saudi Arabia',
    width: 1200,
    height: 800,
  },
} as const satisfies Record<string, ImageEntry>

/** Medina — only verified Nabawi green-dome photos (Pexels) */
const madinah = {
  greenDome: {
    src: pexels(35258791, 1200, 900),
    alt: 'The iconic green dome of Al-Masjid an-Nabawi, the Prophet\'s Mosque in Medina',
    width: 1200,
    height: 900,
  },
  greenDomeMajestic: {
    src: pexels(34500891, 1200, 900),
    alt: 'Majestic view of the green dome at Al-Masjid an-Nabawi under a clear sky, Medina',
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, ImageEntry>

export const sacredImages = { makkah, madinah } as const

export function resize(entry: ImageEntry, width: number, height?: number): ImageEntry {
  const h = height ?? Math.round((entry.height / entry.width) * width)
  const base = entry.src.split('?')[0]
  if (base.includes('pexels.com')) {
    return { ...entry, src: `${base}?auto=compress&cs=tinysrgb&w=${width}&h=${h}&fit=crop`, width, height: h }
  }
  return { ...entry, src: `${base}?auto=format&fit=crop&w=${width}&h=${h}&q=80`, width, height: h }
}

export function getFallbackImage(): ImageEntry {
  return {
    src: FALLBACK_SRC,
    alt: 'The Kaaba at Masjid al-Haram, Mecca',
    width: 1200,
    height: 800,
  }
}

export const galleryImages: ImageEntry[] = [
  resize(makkah.kaabaLandmark, 900, 650),
  resize(madinah.greenDome, 700, 900),
  resize(makkah.pilgrimsTawaf, 900, 550),
  resize(madinah.greenDomeMajestic, 700, 700),
  resize(makkah.worshipers, 900, 650),
  resize(makkah.prayerInside, 700, 700),
  resize(makkah.kaabaCourtyard, 900, 550),
  resize(makkah.approachMosque, 700, 700),
]

export const packageCoverImages = {
  umrahEconomy: resize(makkah.worshipers, 800, 450),
  umrahPremium: resize(makkah.prayerInside, 800, 450),
  hajjStandard: resize(makkah.pilgrimsTawaf, 800, 450),
  hajjVip: resize(makkah.kaabaLandmark, 800, 450),
} as const

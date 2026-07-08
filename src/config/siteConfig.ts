import { galleryImages, resize, sacredImages } from './images'

export const siteConfig = {
  companyName: 'HBA Travels',
  sectionBadge: 'HBA Travels',
  tagline: 'Guiding pilgrims with care, clarity, and devotion since 2009.',
  phone: '+923369007932',
  phoneHref: 'tel:+923369007932',
  whatsappNumber: '+923369007932',
  email: 'inquiries@hbatravels.com',
  address: 'Al Andalus District, Jeddah 23326, Saudi Arabia',
  officeHours: 'Sunday – Thursday: 9:00 AM – 6:00 PM (AST)',
  defaultWhatsAppMessage: "Hi, I'm interested in Umrah/Hajj packages.",
  copyrightYear: 2026,

  social: {
    facebook: 'https://facebook.com/hbatravels',
    instagram: 'https://instagram.com/hbatravels',
    twitter: 'https://twitter.com/hbatravels',
    youtube: 'https://youtube.com/hbatravels',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29729.07008139702!2d39.1481541246736!3d21.541434313204936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d0f0eb210c49%3A0xa1969d72dc91a780!2sAl%20Andalus%2C%20Jeddah%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1717621000000!5m2!1sen!2sus',

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    arabicAccent: 'لبيك اللهم لبيك',
    title: 'Your Journey to the House of Allah, Perfected',
    subtitle:
      'Trusted Umrah and Hajj packages with verified hotels near the Haram, expert guides, and end-to-end support from visa to departure.',
    primaryCta: 'View Packages',
    secondaryCta: 'Chat on WhatsApp',
    badge: 'Premium Umrah & Hajj Travel',
    secondaryImage: resize(sacredImages.madinah.greenDome, 800, 1000),
    floatingCardLabel: 'Al-Masjid an-Nabawi',
    floatingCardLocation: 'Medina, Saudi Arabia',
    primaryImageLabel: 'Masjid al-Haram',
    primaryImageLocation: 'Mecca, Saudi Arabia',
    statsBadgeValue: '17+',
    statsBadgeLabel: 'Years of Service',
    trustItems: ['15,000+ Pilgrims Guided', 'IATA Certified', '24/7 Support'],
    ...resize(sacredImages.makkah.kaabaLandmark, 1600, 900),
  },

  trustStats: [
    { id: 'experience', label: 'Years of Experience', value: 17, suffix: '+' },
    { id: 'pilgrims', label: 'Pilgrims Served', value: 15000, suffix: '+' },
    { id: 'hotels', label: 'Partner Hotels in Makkah/Madinah', value: 45, suffix: '+' },
    { id: 'countries', label: 'Countries Served', value: 32, suffix: '' },
  ],

  about: {
    title: 'About HBA Travels',
    subtitle: 'A partner you can trust for sacred journeys',
    description:
      'HBA Travels was founded with a single purpose: to make the pilgrimage accessible, organized, and spiritually fulfilling. Our team combines decades of on-ground experience in Makkah and Madinah with transparent pricing and personalized care for every pilgrim.',
    values: [
      'Licensed and accredited pilgrimage operator',
      'Dedicated multilingual guides on every group',
      'Hotels verified for proximity and quality',
      'Transparent inclusions with no hidden fees',
    ],
    makkahImage: resize(sacredImages.makkah.pilgrimsTawaf, 900, 620),
    madinahImage: resize(sacredImages.madinah.greenDome, 700, 560),
    makkahLabel: 'Masjid al-Haram',
    makkahLocation: 'Mecca',
    madinahLabel: 'Al-Masjid an-Nabawi',
    madinahLocation: 'Medina',
    badges: [
      { label: 'Ministry of Hajj Licensed', description: 'Authorized pilgrimage operator' },
      { label: 'IATA Accredited', description: 'International travel standards' },
    ],
  },

  process: {
    title: 'How It Works',
    subtitle: 'Four simple steps from inquiry to departure',
    steps: [
      {
        title: 'Consultation',
        description: 'Share your dates, budget, and preferences. We recommend the best-fit package.',
      },
      {
        title: 'Documentation & Visa',
        description: 'We guide you through visa requirements, vaccinations, and travel documents.',
      },
      {
        title: 'Booking Confirmation',
        description: 'Secure your spot with flexible payment plans and receive your full itinerary.',
      },
      {
        title: 'Departure & On-Ground Support',
        description: 'Airport meet-and-greet, hotel check-in, and 24/7 support throughout your journey.',
      },
    ],
  },

  whyChooseUs: {
    title: 'Why Choose Us',
    subtitle: 'Everything you need for a worry-free pilgrimage',
    features: [
      {
        title: 'Experienced Guides',
        description: 'Scholars and veteran group leaders who know every ritual and ziyarat site.',
      },
      {
        title: 'Verified Hotels Near Haram',
        description: 'Every property is inspected for distance, cleanliness, and pilgrim suitability.',
      },
      {
        title: 'Group & Private Options',
        description: 'Join a guided group or arrange a private journey tailored to your family.',
      },
      {
        title: 'Visa Assistance',
        description: 'Step-by-step support for Umrah and Hajj visa applications and approvals.',
      },
      {
        title: '24/7 On-Ground Support',
        description: 'Dedicated coordinators available day and night in Makkah and Madinah.',
      },
      {
        title: 'Transparent Pricing',
        description: 'Clear package inclusions and exclusions — no surprise charges on arrival.',
      },
    ],
  },

  sacredSites: {
    title: 'Sacred Destinations',
    subtitle: 'Walk the paths of prophets — from Masjid al-Haram in Mecca to the Prophet\'s Mosque in Medina',
    makkahTitle: 'Masjid al-Haram',
    makkahDescription:
      'The Grand Mosque in Mecca surrounds the Kaaba — the qibla for Muslims worldwide and the heart of every Umrah and Hajj pilgrimage.',
    madinahTitle: 'Al-Masjid an-Nabawi',
    madinahDescription:
      'The Prophet\'s Mosque in Medina — the second mosque built by Prophet Muhammad ﷺ — welcomes millions with its iconic green dome and serene Rawdah.',
    haramInteriorTitle: 'Inside the Haram',
    haramInteriorDescription:
      'Experience the profound spirituality of prayer within the world\'s largest mosque, steps from the Kaaba.',
    nabawiArchitectureTitle: 'The Prophet\'s Mosque',
    nabawiArchitectureDescription:
      'Al-Masjid an-Nabawi — the second mosque built by Prophet Muhammad ﷺ in Medina — stands as a beacon of peace with its iconic green dome and expansive courtyards.',
    nabawiArchitectureLocation: 'Medina, Saudi Arabia',
  },

  gallery: {
    title: 'Moments from the Journey',
    subtitle: 'Sacred places and pilgrim experiences across Mecca, Medina, and beyond',
    images: galleryImages,
  },

  contact: {
    title: 'Get in Touch',
    subtitle: 'Start planning your pilgrimage today',
    formLabels: {
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      package: 'Package Interest',
      message: 'Your Message',
      submit: 'Send Inquiry',
      success: 'Thank you! Your inquiry has been sent. We will contact you shortly.',
      whatsappAlt: 'Prefer WhatsApp? Chat instantly',
      packagePlaceholder: 'Select a package',
      nameRequired: 'Name is required',
      phoneRequired: 'Phone is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
    },
    packageOptions: [
      { value: '', label: 'General Inquiry' },
      { value: 'umrah-economy', label: 'Umrah Economy' },
      { value: 'umrah-premium', label: 'Umrah Premium' },
      { value: 'hajj-standard', label: 'Hajj Standard Group' },
      { value: 'hajj-vip', label: 'Hajj VIP Private' },
    ],
  },

  footer: {
    newsletterPlaceholder: 'Your email address',
    newsletterButton: 'Subscribe',
    quickLinksTitle: 'Quick Links',
    packagesTitle: 'Packages',
    contactTitle: 'Contact Us',
  },

  packages: {
    title: 'Pilgrimage Packages',
    subtitle: 'Curated journeys for every budget and schedule',
    umrahTab: 'Umrah',
    hajjTab: 'Hajj',
    perPersonNote: 'per person, sharing',
    viewDetails: 'View Details',
    whatsappCta: 'Inquire on WhatsApp',
    closeDetails: 'Close',
    inclusionsTitle: 'Inclusions',
    exclusionsTitle: 'Exclusions',
    itineraryTitle: 'Day-by-Day Itinerary',
  },

  testimonials: {
    title: 'Pilgrim Stories',
    subtitle: 'Hear from those who traveled with us',
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to common questions about your pilgrimage',
  },
} as const

export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.defaultWhatsAppMessage)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}

export function getPackageWhatsAppUrl(packageName: string): string {
  const message = `${siteConfig.defaultWhatsAppMessage} I'm interested in the ${packageName} package.`
  return getWhatsAppUrl(message)
}

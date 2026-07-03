import { packageCoverImages } from './images'

export interface Package {
  id: string
  category: 'umrah' | 'hajj'
  name: string
  tagline: string
  durationDays: number
  priceFrom: number
  currency: 'USD' | 'SAR' | 'GBP'
  badge?: 'Most Popular' | 'Premium' | 'Economy' | 'VIP'
  coverImage: string
  hotelMakkah: string
  hotelMakkahDistanceMeters: number
  hotelMadinah: string
  hotelMadinahDistanceMeters: number
  inclusions: string[]
  exclusions: string[]
  itinerary: { day: number; title: string; description: string }[]
}

export const packages: Package[] = [
  {
    id: 'umrah-economy',
    category: 'umrah',
    name: 'Umrah Economy',
    tagline: 'Affordable spiritual journey with essential comforts',
    durationDays: 10,
    priceFrom: 1299,
    currency: 'USD',
    badge: 'Economy',
    coverImage: packageCoverImages.umrahEconomy.src,
    hotelMakkah: 'Dar Al Eiman Hotel',
    hotelMakkahDistanceMeters: 800,
    hotelMadinah: 'Al Eiman Royal Hotel',
    hotelMadinahDistanceMeters: 650,
    inclusions: [
      'Return economy flights from major hubs',
      '3-star hotels with daily breakfast',
      'Shared airport transfers',
      'Umrah visa processing assistance',
      'Group ziyarat in Makkah and Madinah',
    ],
    exclusions: [
      'Travel insurance (recommended)',
      'Personal shopping and meals outside hotels',
      'Single room supplement',
      'PCR or vaccination costs if required',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jeddah',
        description:
          'Meet our representative at King Abdulaziz International Airport. Transfer to Makkah hotel, rest, and prepare for Umrah with a briefing from your group leader.',
      },
      {
        day: 2,
        title: 'Perform Umrah',
        description:
          'Enter ihram and perform Umrah rituals at Masjid al-Haram with guided support. Evening free for personal worship and reflection.',
      },
      {
        day: 3,
        title: 'Makkah Ziyarat',
        description:
          'Visit Jabal al-Noor, Jabal Thawr, and the Cave of Hira. Return to hotel with time for prayers at the Haram.',
      },
      {
        day: 4,
        title: 'Makkah Free Day',
        description:
          'Day at leisure for additional tawaf, sa\'i, or personal worship. Optional shopping at local markets.',
      },
      {
        day: 5,
        title: 'Transfer to Madinah',
        description:
          'Check out and travel by coach to Madinah. Check in at hotel near Masjid an-Nabawi. Evening prayers at the Prophet\'s Mosque.',
      },
      {
        day: 6,
        title: 'Madinah Ziyarat',
        description:
          'Visit Quba Mosque, Uhud battlefield, and Masjid al-Qiblatain with our licensed guide.',
      },
      {
        day: 7,
        title: 'Madinah Worship Day',
        description:
          'Free day for prayers, Rawdah visit (subject to permit availability), and personal reflection.',
      },
      {
        day: 8,
        title: 'Return to Makkah',
        description:
          'Travel back to Makkah for final days. Optional farewell tawaf preparation with guide.',
      },
      {
        day: 9,
        title: 'Farewell Tawaf',
        description:
          'Perform farewell tawaf. Pack and prepare for departure. Group dinner and closing briefing.',
      },
      {
        day: 10,
        title: 'Departure',
        description:
          'Transfer to Jeddah airport for return flight. Assistance with check-in and baggage.',
      },
    ],
  },
  {
    id: 'umrah-premium',
    category: 'umrah',
    name: 'Umrah Premium',
    tagline: 'Luxury stay steps from the Haram with private transport',
    durationDays: 14,
    priceFrom: 2899,
    currency: 'USD',
    badge: 'Most Popular',
    coverImage: packageCoverImages.umrahPremium.src,
    hotelMakkah: 'Swissôtel Al Maqam',
    hotelMakkahDistanceMeters: 180,
    hotelMadinah: 'Anwar Al Madinah Mövenpick',
    hotelMadinahDistanceMeters: 150,
    inclusions: [
      'Return business-class flights available on request',
      '5-star hotels within 200m of both Harams',
      'Private airport and inter-city transfers',
      'Umrah visa and concierge support',
      'Private scholar-led ziyarat tours',
      'Daily buffet breakfast and dinner',
    ],
    exclusions: [
      'Travel insurance premium upgrades',
      'Spa and personal laundry services',
      'Single occupancy room (available at supplement)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'VIP Airport Arrival',
        description:
          'Fast-track meet-and-greet at Jeddah airport. Private transfer to Makkah 5-star hotel. Welcome refreshments and personal orientation.',
      },
      {
        day: 2,
        title: 'Guided Umrah',
        description:
          'Private scholar accompanies you through ihram, tawaf, and sa\'i. Dedicated time slots arranged to avoid peak crowds.',
      },
      {
        day: 3,
        title: 'Historical Makkah Tour',
        description:
          'Private vehicle tour of sacred sites including Jabal al-Noor and the birth place of the Prophet ﷺ (museum visit).',
      },
      {
        day: 4,
        title: 'Spiritual Retreat Day',
        description:
          'Unstructured day for worship at the Haram. Optional one-on-one spiritual consultation with resident scholar.',
      },
      {
        day: 5,
        title: 'Makkah Leisure',
        description:
          'Morning prayers at Haram. Afternoon rest. Evening shopping assistance with personal coordinator.',
      },
      {
        day: 6,
        title: 'Transfer to Madinah',
        description:
          'Private coach to Madinah. Premium hotel check-in. Evening Rawdah visit coordination (permit dependent).',
      },
      {
        day: 7,
        title: 'Madinah Heritage Tour',
        description:
          'Comprehensive ziyarat: Quba, Uhud, Seven Mosques, and dates market visit with historian guide.',
      },
      {
        day: 8,
        title: 'Prophet\'s Mosque Day',
        description:
          'Full day for prayers and reflection at Masjid an-Nabawi. Reserved seating area assistance where available.',
      },
      {
        day: 9,
        title: 'Madinah Free Day',
        description:
          'Personal worship time. Optional visit to nearby date farms and local artisan markets.',
      },
      {
        day: 10,
        title: 'Return to Makkah',
        description:
          'Private transfer back to Makkah. Re-check into Haram-view room. Evening tawaf.',
      },
      {
        day: 11,
        title: 'Extended Worship',
        description:
          'Additional days for repeated Umrah or personal ibadah with flexible scheduling.',
      },
      {
        day: 12,
        title: 'Makkah Exploration',
        description:
          'Visit Hira Cultural District and Mount Arafat exhibition center. Farewell dinner at hotel.',
      },
      {
        day: 13,
        title: 'Farewell Preparations',
        description:
          'Farewell tawaf with guide. Packing assistance. Pre-departure health and travel checklist review.',
      },
      {
        day: 14,
        title: 'Departure',
        description:
          'Private transfer to airport. Lounge access arranged where available. Until we meet again, in shā\' Allāh.',
      },
    ],
  },
  {
    id: 'hajj-standard',
    category: 'hajj',
    name: 'Hajj Standard Group',
    tagline: 'Full Hajj season experience with guided group of 40',
    durationDays: 21,
    priceFrom: 5499,
    currency: 'USD',
    badge: 'Premium',
    coverImage: packageCoverImages.hajjStandard.src,
    hotelMakkah: 'Makkah Clock Royal Tower (pre-Hajj)',
    hotelMakkahDistanceMeters: 250,
    hotelMadinah: 'Pullman Zamzam Madinah',
    hotelMadinahDistanceMeters: 300,
    inclusions: [
      'Return flights and Hajj visa processing',
      '4-star Makkah/Madinah hotels pre- and post-Hajj',
      'Azizia camp accommodation during Hajj days',
      'Mina standard tent (shared, air-cooled)',
      'Experienced mutawwif and group scholar',
      'All ritual guidance from 8th to 13th Dhul Hijjah',
      'Meals during Hajj days in Mina/Arafat/Muzdalifah',
    ],
    exclusions: [
      'Qurbani (sacrifice) — arranged separately',
      'Travel insurance (mandatory, not included)',
      'Personal wheelchair or mobility equipment',
      'Single room supplement for pre/post Hajj nights',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Makkah Orientation',
        description:
          'Airport reception and transfer to Makkah hotel. Hajj seminar covering ihram, rituals, and group schedule.',
      },
      {
        day: 2,
        title: 'Umrah & Preparation',
        description:
          'Perform Umrah if not yet completed. Collect ihram and Hajj kit. Medical check and emergency briefing.',
      },
      {
        day: 3,
        title: 'Makkah Ziyarat & Rest',
        description:
          'Guided visits to key sites. Rest day to acclimatize before Hajj days begin.',
      },
      {
        day: 4,
        title: 'Transfer to Azizia',
        description:
          'Move to Azizia residence (standard category). Final Hajj preparation lectures. Pack for Mina departure.',
      },
      {
        day: 5,
        title: '8th Dhul Hijjah — Departure to Mina',
        description:
          'Enter ihram for Hajj. Travel to Mina tents. Spend day and night in worship and talbiyah.',
      },
      {
        day: 6,
        title: '9th Dhul Hijjah — Day of Arafah',
        description:
          'Proceed to Arafat after Fajr. Stand at Arafah until sunset — the pinnacle of Hajj. Depart to Muzdalifah after Maghrib.',
      },
      {
        day: 7,
        title: '10th Dhul Hijjah — Eid & Stoning',
        description:
          'Collect pebbles at Muzdalifah. Return to Mina for stoning Jamarat al-Aqaba. Sacrifice arrangement. Trim hair. Tawaf al-Ifadah.',
      },
      {
        day: 8,
        title: '11th–12th Dhul Hijjah — Tashreeq Days',
        description:
          'Stone all three Jamarat after Dhuhr on 11th and 12th. Remain in Mina. Group lectures on significance of each ritual.',
      },
      {
        day: 9,
        title: '13th Dhul Hijjah — Farewell',
        description:
          'Optional third day stoning. Return to Makkah hotel. Farewell tawaf. Rest and recovery.',
      },
      {
        day: 10,
        title: 'Transfer to Madinah',
        description:
          'Coach to Madinah. Check in near Masjid an-Nabawi. Evening prayers and reflection on Hajj experience.',
      },
    ],
  },
  {
    id: 'hajj-vip',
    category: 'hajj',
    name: 'Hajj VIP Private',
    tagline: 'Premium Mina tents, private guide, and 5-star comfort',
    durationDays: 24,
    priceFrom: 12999,
    currency: 'USD',
    badge: 'VIP',
    coverImage: packageCoverImages.hajjVip.src,
    hotelMakkah: 'Raffles Makkah Palace',
    hotelMakkahDistanceMeters: 100,
    hotelMadinah: 'The Ritz-Carlton Madinah',
    hotelMadinahDistanceMeters: 120,
    inclusions: [
      'First-class flights and VIP Hajj visa',
      '5-star Haram-view suites pre- and post-Hajj',
      'Premium VIP Mina tents (private family unit)',
      'Dedicated private mutawwif and scholar',
      'Private air-conditioned transport throughout',
      'Gourmet meals during all Hajj days',
      'Personal coordinator and 24/7 medical liaison',
    ],
    exclusions: [
      'Qurbani premium grade selection',
      'Excess baggage fees',
      'Optional helicopter transfer (available on request)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'VIP Arrival Experience',
        description:
          'Private terminal meet-and-greet. Chauffeur transfer to Raffles Makkah. Personal butler orientation and Hajj planning session.',
      },
      {
        day: 2,
        title: 'Private Umrah & Briefing',
        description:
          'Exclusive time-slot Umrah with private scholar. Custom ihram fitting and ritual walkthrough for your family group.',
      },
      {
        day: 3,
        title: 'Bespoke Ziyarat',
        description:
          'Private luxury vehicle tour of Makkah heritage sites at your own pace with historian guide.',
      },
      {
        day: 4,
        title: 'Pre-Hajj Retreat',
        description:
          'Spiritual preparation day. Private lectures on Hajj fiqh. Medical screening with on-call physician.',
      },
      {
        day: 5,
        title: 'Move to Premium Azizia Villa',
        description:
          'Transfer to private Azizia accommodation. Final packing for Mina with personal assistant support.',
      },
      {
        day: 6,
        title: '8th Dhul Hijjah — Private Mina Camp',
        description:
          'Enter ihram at designated time. Private transport to VIP Mina tent complex with ensuite facilities and climate control.',
      },
      {
        day: 7,
        title: '9th Dhul Hijjah — Arafah VIP',
        description:
          'Private shaded camp at Arafah with catered meals and scholar present throughout wuquf. Premium Muzdalifah arrangement.',
      },
      {
        day: 8,
        title: '10th Dhul Hijjah — Rituals Day',
        description:
          'Guided stoning, sacrifice coordination, hair cutting, and tawaf al-Ifadah with minimal walking routes arranged.',
      },
      {
        day: 9,
        title: 'Tashreeq Days in VIP Comfort',
        description:
          'Remain in premium Mina tents for 11th and 12th. Private Jamarat access windows to avoid crowds.',
      },
      {
        day: 10,
        title: 'Return & Farewell Tawaf',
        description:
          'Return to Makkah suite. Farewell tawaf at optimal time. Celebration dinner arranged at hotel.',
      },
      {
        day: 11,
        title: 'Madinah in Luxury',
        description:
          'Private transfer to Ritz-Carlton Madinah. Rawdah visit priority coordination. Extended stay for worship.',
      },
    ],
  },
]

export interface Testimonial {
  id: string
  name: string
  tripType: string
  rating: number
  quote: string
  initials: string
  avatarColor: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Fatima A.',
    tripType: 'Umrah Premium — March 2025',
    rating: 5,
    quote:
      'From the moment we landed, everything was seamless. The hotel was genuinely two minutes from the Haram, and our guide made every ritual clear and meaningful. HBA Travels exceeded our expectations.',
    initials: 'FA',
    avatarColor: '#B8912C',
  },
  {
    id: 't2',
    name: 'Ahmed K.',
    tripType: 'Hajj Standard Group — June 2024',
    rating: 5,
    quote:
      'Performing Hajj with HBA was the most organized experience I could have hoped for. The Mina tents were clean, the scholars were knowledgeable, and support was available around the clock.',
    initials: 'AK',
    avatarColor: '#1B2A4A',
  },
  {
    id: 't3',
    name: 'Maryam S.',
    tripType: 'Umrah Economy — January 2025',
    rating: 4,
    quote:
      'As a first-time pilgrim on a budget, I was nervous about what to expect. The team answered every question patiently, and the group atmosphere made the journey feel safe and welcoming.',
    initials: 'MS',
    avatarColor: '#587A5D',
  },
  {
    id: 't4',
    name: 'Omar H.',
    tripType: 'Hajj VIP Private — June 2024',
    rating: 5,
    quote:
      'We traveled as a family of six and the private arrangement was worth every penny. Our mutawwif knew exactly how to pace the rituals for our elderly parents without compromising the experience.',
    initials: 'OH',
    avatarColor: '#3A4E6B',
  },
  {
    id: 't5',
    name: 'Aisha R.',
    tripType: 'Umrah Premium — November 2024',
    rating: 5,
    quote:
      'The attention to detail was remarkable — from visa paperwork to the farewell tawaf timing. I have already recommended HBA Travels to my entire community.',
    initials: 'AR',
    avatarColor: '#8C6B1F',
  },
  {
    id: 't6',
    name: 'Yusuf M.',
    tripType: 'Umrah Economy — Ramadan 2025',
    rating: 5,
    quote:
      'Experiencing Umrah during Ramadan with a well-organized group was unforgettable. Hotels, iftar arrangements, and taraweeh logistics were all handled professionally.',
    initials: 'YM',
    avatarColor: '#7FA184',
  },
]

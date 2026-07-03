export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'visa-timing',
    question: 'How far in advance should I apply for my Umrah or Hajj visa?',
    answer:
      'For Umrah, we recommend applying 4–6 weeks before your intended travel date, though express processing is available in 7–10 business days for eligible nationalities. Hajj visas are issued only during the official Hajj season and applications typically open 2–3 months before departure. Our team will guide you through the exact timeline for your country of residence.',
  },
  {
    id: 'whats-included',
    question: 'What is included in the package price?',
    answer:
      'Each package listing shows detailed inclusions: typically flights, hotels, ground transfers, visa assistance, and guided ziyarat. Meals, travel insurance, and personal expenses vary by package tier. Economy packages include breakfast only; Premium and VIP tiers often include half-board or full-board dining. Always review the inclusions and exclusions table in each package detail view.',
  },
  {
    id: 'single-supplement',
    question: 'Is there a single room supplement?',
    answer:
      'Yes. All quoted prices are based on twin/double sharing. Single occupancy is available at a supplement ranging from $400–$1,200 depending on the package and season. Contact us for an exact quote if you require a private room.',
  },
  {
    id: 'payment-plans',
    question: 'Do you offer payment plans?',
    answer:
      'We offer flexible installment plans: a 30% deposit secures your booking, with the balance payable in 2–3 installments before departure. Hajj packages require a higher initial deposit due to visa and accommodation commitments. We accept bank transfer, credit card, and certified cheque.',
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation and refund policy?',
    answer:
      'Cancellations more than 60 days before departure receive a full refund minus a $150 administrative fee. Between 30–60 days, 50% of the package cost is refundable. Within 30 days, refunds depend on non-recoverable costs (flights, visas, hotel deposits). We strongly recommend travel insurance to cover unforeseen cancellations.',
  },
  {
    id: 'fitness',
    question: 'Are there physical fitness requirements for Hajj?',
    answer:
      'Hajj involves significant walking — often 15–25 km over several days — often in heat. Pilgrims should be able to walk unaided for at least 30 minutes. Those with mobility needs should inform us at booking; we arrange wheelchairs, golf carts at the Haram (where permitted), and ground-floor tent assignments in Mina.',
  },
  {
    id: 'what-to-pack',
    question: 'What should I pack for Umrah or Hajj?',
    answer:
      'Essential items include ihram garments (two white unstitched cloths for men; modest abaya for women), comfortable sandals, a lightweight prayer mat, reusable water bottle, unscented soap (required during ihram), medications, copies of passport and visa, and a small backpack for Mina days. We provide a detailed packing checklist upon booking confirmation.',
  },
  {
    id: 'group-size',
    question: 'How large are your groups?',
    answer:
      'Umrah Economy groups average 25–35 pilgrims. Premium Umrah groups are capped at 15 for a more intimate experience. Hajj Standard groups are approximately 40 pilgrims with a ratio of one guide per 10 pilgrims. VIP Hajj packages are private — your family or group only.',
  },
  {
    id: 'children',
    question: 'Can children accompany parents on Umrah or Hajj?',
    answer:
      'Children of all ages are welcome on Umrah packages. Infants under 2 travel at a reduced rate without a separate seat. For Hajj, children who have reached the age of discernment may perform the rituals, but parents should assess their stamina carefully. We offer family room configurations and child-friendly meal options.',
  },
  {
    id: 'covid-health',
    question: 'Are there current health or vaccination requirements?',
    answer:
      'Saudi Arabia periodically updates entry health requirements. Currently, meningitis ACWY vaccination is required for Hajj and recommended for Umrah. Our team monitors official announcements and will inform you of any PCR, vaccination, or registration requirements at the time of booking.',
  },
]

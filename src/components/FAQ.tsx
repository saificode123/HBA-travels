import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { faqItems } from '../config/faqData'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)
  const { faq } = siteConfig

  return (
    <section id="faq" className="vayron-section bg-sand-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={faq.title} subtitle={faq.subtitle} />

        <StaggerContainer className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <StaggerItem key={item.id}>
                <div className="overflow-hidden rounded-xl border border-sand-100 bg-sand-50">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-night-900">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold-600 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-ink/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

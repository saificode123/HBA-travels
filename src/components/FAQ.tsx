import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { faqItems } from '../config/faqData'
import { siteConfig } from '../config/siteConfig'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)
  const { faq } = siteConfig
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="faq"
      className="vayron-section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(175deg, #f7f1e3 0%, #fdfbf6 50%, #f9f4ea 100%)',
      }}
    >
      {/* Subtle top & bottom gold lines */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.25) 35%, rgba(212,175,55,0.4) 50%, rgba(212,175,55,0.25) 65%, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={faq.title} subtitle={faq.subtitle} />

        <StaggerContainer className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <StaggerItem key={item.id}>
                <motion.div
                  className={`faq-item overflow-hidden rounded-2xl border bg-sand-50 ${
                    isOpen ? 'open' : ''
                  }`}
                  style={{
                    borderColor: isOpen
                      ? 'rgba(212,175,55,0.3)'
                      : 'rgba(247,241,227,0.8)',
                    boxShadow: isOpen
                      ? '0 8px 32px -10px rgba(13,23,48,0.12), 0 0 0 1px rgba(212,175,55,0.08) inset'
                      : '0 2px 12px -4px rgba(13,23,48,0.06)',
                  }}
                  animate={{
                    borderColor: isOpen ? 'rgba(212,175,55,0.3)' : 'rgba(247,241,227,0.8)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                        style={{
                          background: isOpen
                            ? 'linear-gradient(135deg, #D4AF37, #B8912C)'
                            : 'rgba(247,241,227,0.9)',
                          boxShadow: isOpen
                            ? '0 4px 12px -4px rgba(212,175,55,0.4)'
                            : 'none',
                        }}
                      >
                        <HelpCircle
                          className="h-4 w-4 transition-colors duration-300"
                          style={{ color: isOpen ? '#0D1730' : 'rgba(212,175,55,0.8)' }}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="font-medium text-night-900 transition-colors duration-300"
                        style={{ color: isOpen ? '#0D1730' : undefined }}
                      >
                        {item.question}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 pt-0 pl-[3.75rem]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

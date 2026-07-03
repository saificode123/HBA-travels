import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '../config/siteConfig'

export default function WhatsAppButton() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-sand-50 shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Chat on WhatsApp"
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.06, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }
      }
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" aria-hidden="true" />
    </motion.a>
  )
}

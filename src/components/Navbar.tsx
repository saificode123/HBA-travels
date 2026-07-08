import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useScrollSpy } from '../hooks/useScrollSpy'
import MagneticButton from './MagneticButton'

const sectionIds = ['home', 'packages', 'about', 'process', 'testimonials', 'faq', 'contact']

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeSection = useScrollSpy(sectionIds)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  // Parallax opacity for background blur transition
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    setMobileOpen(false)
  }

  const textClass = scrolled ? 'text-night-700' : 'text-sand-50'
  const logoAccent = 'text-gold-400'
  const logoMain = scrolled ? 'text-night-900' : 'text-sand-50'

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Dynamic background layer */}
        {reduceMotion ? (
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              scrolled ? 'navbar-glass-light shadow-sm' : 'bg-transparent'
            }`}
          />
        ) : (
          <motion.div
            className={`absolute inset-0 transition-all duration-500 ${
              scrolled ? 'navbar-glass-light' : 'navbar-glass-dark'
            }`}
            style={{ opacity: bgOpacity }}
          />
        )}

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400"
            style={{ width: `${scrollProgress}%`, originX: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 40 }}
          />
        </div>

        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="font-heading text-xl font-semibold sm:text-2xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className={logoAccent}>{siteConfig.companyName.split(' ')[0]}</span>{' '}
            <span className={`transition-colors duration-300 ${logoMain}`}>
              {siteConfig.companyName.split(' ').slice(1).join(' ')}
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((link, i) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-gold-600'
                      : `${textClass} hover:text-gold-600`
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-gold-50"
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gold-400"
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <motion.div
            className="hidden items-center gap-4 lg:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={siteConfig.phoneHref}
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-gold-600 ${textClass}`}
            >
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10"
                whileHover={{ scale: 1.1, borderColor: 'rgba(212,175,55,0.6)' }}
              >
                <Phone className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              </motion.span>
              {siteConfig.phone}
            </a>
            <MagneticButton variant="primary" onClick={() => scrollTo('#packages')} className="btn-shimmer">
              Book Now
            </MagneticButton>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            type="button"
            className={`rounded-xl p-2 lg:hidden transition-colors duration-300 ${scrolled ? 'text-night-900' : 'text-sand-50'}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <motion.div
        className="fixed inset-0 z-[60] lg:hidden"
        animate={mobileOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
        transition={{ duration: 0.25 }}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-night-900/60 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
          initial={{ opacity: 0 }}
          animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Drawer panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-[min(340px,88vw)] bg-sand-50 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ x: '100%' }}
          animate={mobileOpen ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-sand-100 p-5">
            <span className="font-heading text-lg font-semibold text-night-900">
              <span className="text-gold-400">{siteConfig.companyName.split(' ')[0]}</span>{' '}
              {siteConfig.companyName.split(' ').slice(1).join(' ')}
            </span>
            <motion.button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-sand-100 p-2 text-night-700 hover:border-gold-400/40 hover:bg-gold-50"
              aria-label="Close menu"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col gap-1 p-5">
            {siteConfig.navLinks.map((link, i) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-50 to-gold-50/50 text-gold-600 border border-gold-400/20'
                      : 'text-night-700 hover:bg-sand-100 hover:text-night-900'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              )
            })}

            {/* Phone */}
            <motion.a
              href={siteConfig.phoneHref}
              className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3.5 text-night-700 hover:bg-sand-100"
              initial={{ opacity: 0, x: 20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: siteConfig.navLinks.length * 0.05 + 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <Phone className="h-4 w-4" />
              </span>
              {siteConfig.phone}
            </motion.a>

            <MagneticButton
              variant="primary"
              className="mt-3 w-full btn-shimmer"
              onClick={() => scrollTo('#packages')}
            >
              Book Now
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

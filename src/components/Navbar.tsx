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
  const activeSection = useScrollSpy(sectionIds)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
    setMobileOpen(false)
  }

  const textClass = scrolled ? 'text-night-700' : 'text-sand-50'
  const logoAccent = 'text-gold-400'
  const logoMain = scrolled ? 'text-night-900' : 'text-sand-50'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {reduceMotion ? (
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              scrolled ? 'bg-sand-50/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
            }`}
          />
        ) : (
          <>
            <motion.div
              className="absolute inset-0 bg-sand-50/90 backdrop-blur-md shadow-sm"
              style={{ opacity: bgOpacity }}
            />
          </>
        )}

        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="font-heading text-xl font-semibold sm:text-2xl"
          >
            <span className={logoAccent}>{siteConfig.companyName.split(' ')[0]}</span>{' '}
            <span className={logoMain}>{siteConfig.companyName.split(' ').slice(1).join(' ')}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold-600 bg-gold-50'
                      : `${textClass} hover:text-gold-600`
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold-600 ${textClass}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <MagneticButton variant="primary" onClick={() => scrollTo('#packages')}>
              Book Now
            </MagneticButton>
          </div>

          <button
            type="button"
            className={`rounded-lg p-2 lg:hidden ${scrolled ? 'text-night-900' : 'text-sand-50'}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-night-900/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-sand-50 shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-sand-100 p-4">
            <span className="font-heading text-lg font-semibold text-night-900">
              {siteConfig.companyName}
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-night-700"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-1 p-4">
            {siteConfig.navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className={`rounded-lg px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-gold-50 text-gold-600' : 'text-night-700'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href={siteConfig.phoneHref}
              className="mt-4 flex items-center gap-2 px-4 py-3 text-night-700"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <MagneticButton
              variant="primary"
              className="mt-2 w-full"
              onClick={() => scrollTo('#packages')}
            >
              Book Now
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  )
}

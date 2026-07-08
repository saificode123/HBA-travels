import { motion } from 'framer-motion'
import { Camera, Globe, Mail, Phone, Play, Share2, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { packages } from '../config/packagesData'
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig'
import GeometricPattern from './GeometricPattern'

const socialIcons = {
  facebook: Share2,
  instagram: Camera,
  twitter: Globe,
  youtube: Play,
} as const

export default function Footer() {
  const [email, setEmail] = useState('')
  const { footer } = siteConfig

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="premium-dark-section relative overflow-hidden border-t border-sand-50/6 pb-28 pt-16 sm:pb-24 lg:pb-16">
      {/* Geometric overlay */}
      <GeometricPattern className="text-gold-400" opacity={0.04} />
      <div
        className="mesh-gradient pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      {/* Top gold divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 20%, rgba(212,175,55,0.45) 50%, rgba(212,175,55,0.2) 80%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* ── Brand + newsletter ──────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <motion.p
              className="font-heading text-2xl font-semibold"
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #EAD9A8, #D4AF37, #B8912C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {siteConfig.companyName.split(' ')[0]}
              </span>{' '}
              <span className="text-sand-50">
                {siteConfig.companyName.split(' ').slice(1).join(' ')}
              </span>
            </motion.p>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-night-50/60">
              {siteConfig.tagline}
            </p>

            {/* Newsletter form */}
            <form
              className="mt-7 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) {
                  window.location.href = `mailto:${siteConfig.email}?subject=Newsletter&body=Subscribe: ${email}`
                  setEmail('')
                }
              }}
            >
              <label htmlFor="newsletter" className="mb-2 block text-xs font-medium text-night-50/45">
                {footer.newsletterPlaceholder}
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.newsletterPlaceholder}
                  className="min-w-0 flex-1 rounded-xl border border-night-400/20 bg-night-800/60 px-4 py-2.5 text-sm text-sand-50 placeholder:text-night-50/30 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/25 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  className="shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-night-900 transition-all duration-300 btn-shimmer"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #B8912C)',
                    boxShadow: '0 4px 16px -4px rgba(212,175,55,0.4)',
                  }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(212,175,55,0.55)' }}
                  whileTap={{ scale: 0.96 }}
                >
                  {footer.newsletterButton}
                </motion.button>
              </div>
            </form>
          </div>

          {/* ── Quick Links ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-50/70">
              {footer.quickLinksTitle}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="footer-link text-night-50/55 hover:text-gold-400 flex items-center gap-1 group"
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Packages ────────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-50/70">
              {footer.packagesTitle}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <motion.a
                    href="#packages"
                    onClick={(e) => { e.preventDefault(); scrollTo('#packages') }}
                    className="footer-link text-night-50/55 hover:text-gold-400"
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    {pkg.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-50/70">
              {footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-night-50/60">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400 group"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-night-400/20 bg-night-800/40 text-gold-400/70 group-hover:border-gold-400/40 group-hover:text-gold-400 transition-all">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-gold-400 group"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-night-400/20 bg-night-800/40 text-gold-400/70 group-hover:border-gold-400/40 group-hover:text-gold-400 transition-all">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold-400/60" />
                  WhatsApp
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {Object.entries(siteConfig.social).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons]
                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-night-400/20 bg-night-800/40 text-night-50/55 transition-all duration-300 hover:border-gold-400/45 hover:bg-night-700/60 hover:text-gold-400"
                    aria-label={key}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Footer bottom ─────────────────────────────────────────────── */}
        <div className="mt-14 border-t border-night-700/60 pt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-xs text-night-50/35">
          <p>
            &copy; {siteConfig.copyrightYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B8912C)', boxShadow: '0 0 6px rgba(212,175,55,0.5)' }}
            />
            <span>Trusted Umrah & Hajj Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

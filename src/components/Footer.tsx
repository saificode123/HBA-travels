import { Camera, Globe, Mail, Phone, Play, Share2 } from 'lucide-react'
import { useState } from 'react'
import { packages } from '../config/packagesData'
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig'

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
    <footer className="premium-dark-section border-t border-sand-50/5 pb-28 pt-16 sm:pb-24 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + newsletter — contained column */}
          <div className="lg:col-span-4">
            <p className="font-heading text-2xl font-semibold text-sand-50">
              <span className="text-gold-400">{siteConfig.companyName.split(' ')[0]}</span>{' '}
              {siteConfig.companyName.split(' ').slice(1).join(' ')}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-night-50/65">
              {siteConfig.tagline}
            </p>

            <form
              className="mt-6 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) {
                  window.location.href = `mailto:${siteConfig.email}?subject=Newsletter&body=Subscribe: ${email}`
                  setEmail('')
                }
              }}
            >
              <label htmlFor="newsletter" className="mb-2 block text-xs font-medium text-night-50/50">
                {footer.newsletterPlaceholder}
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.newsletterPlaceholder}
                  className="min-w-0 flex-1 rounded-xl border border-night-400/20 bg-night-800/60 px-4 py-2.5 text-sm text-sand-50 placeholder:text-night-50/35 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-gold-400 px-5 py-2.5 text-sm font-semibold text-night-900 transition-colors hover:bg-gold-600"
                >
                  {footer.newsletterButton}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50">
              {footer.quickLinksTitle}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-night-50/65">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.href)
                    }}
                    className="transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50">
              {footer.packagesTitle}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-night-50/65">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <a
                    href="#packages"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo('#packages')
                    }}
                    className="transition-colors hover:text-gold-400"
                  >
                    {pkg.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50">
              {footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-night-50/65">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-400/80" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-gold-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-400/80" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-400"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {Object.entries(siteConfig.social).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons]
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-night-400/20 bg-night-800/40 text-night-50/60 transition-all hover:border-gold-400/40 hover:text-gold-400"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-night-700/80 pt-8 text-center text-xs text-night-50/40 sm:text-sm">
          &copy; {siteConfig.copyrightYear} {siteConfig.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

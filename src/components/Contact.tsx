import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig'
import MagneticButton from './MagneticButton'
import SectionHeading, { StaggerContainer, StaggerItem } from './SectionHeading'

interface FormState {
  name: string
  phone: string
  email: string
  package: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    render: (cfg: typeof siteConfig) => (
      <a
        href={cfg.phoneHref}
        className="font-medium text-night-900 transition-colors hover:text-gold-600"
      >
        {cfg.phone}
      </a>
    ),
  },
  {
    icon: Mail,
    label: 'Email',
    render: (cfg: typeof siteConfig) => (
      <a
        href={`mailto:${cfg.email}`}
        className="break-all font-medium text-night-900 transition-colors hover:text-gold-600"
      >
        {cfg.email}
      </a>
    ),
  },
  {
    icon: MapPin,
    label: 'Address',
    render: (cfg: typeof siteConfig) => (
      <span className="text-ink/75">{cfg.address}</span>
    ),
  },
  {
    icon: Clock,
    label: 'Hours',
    render: (cfg: typeof siteConfig) => (
      <span className="text-ink/75">{cfg.officeHours}</span>
    ),
  },
]

export default function Contact() {
  const { contact } = siteConfig
  const { formLabels } = contact

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    package: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = formLabels.nameRequired
    if (!form.phone.trim()) next.phone = formLabels.phoneRequired
    if (!form.email.trim()) {
      next.email = formLabels.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = formLabels.emailInvalid
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const body = encodeURIComponent(
      `*New Inquiry from HBA Travels*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Package:* ${form.package || 'General Inquiry'}\n\n*Message:*\n${form.message}`,
    )
    window.location.href = `https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${body}`
    setSubmitted(true)
  }

  const inputClass =
    'form-input-premium mt-1.5 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold-400/55 focus:outline-none focus:ring-2 focus:ring-gold-400/15 transition-all duration-300'

  return (
    <section
      id="contact"
      className="vayron-section relative overflow-hidden bg-sand-50"
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 50%, rgba(127,161,132,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ── Form ──────────────────────────────────────────────────────── */}
          <StaggerContainer>
            <StaggerItem>
              {submitted ? (
                <motion.div
                  className="rounded-2xl border border-sage-400/30 bg-sage-100 p-10 text-center"
                  role="status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-400/20">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="font-semibold text-sage-600 text-lg">{formLabels.success}</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-night-900">
                      {formLabels.name} <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-night-900">
                        {formLabels.phone} <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        placeholder="+92 300 0000000"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-night-900">
                        {formLabels.email} <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Package */}
                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-night-900">
                      {formLabels.package}
                    </label>
                    <select
                      id="package"
                      value={form.package}
                      onChange={(e) => setForm({ ...form, package: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      {contact.packageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-night-900">
                      {formLabels.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your journey plans…"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto btn-shimmer">
                      {formLabels.submit}
                    </MagneticButton>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-sage-400/35 bg-sage-100 px-6 py-3.5 text-sm font-semibold text-sage-600 transition-all duration-300 hover:border-sage-400/60 hover:bg-sage-400/20"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {formLabels.whatsappAlt}
                    </a>
                  </div>
                </form>
              )}
            </StaggerItem>
          </StaggerContainer>

          {/* ── Contact info + map ─────────────────────────────────────────── */}
          <StaggerContainer className="space-y-6">
            {/* Info card */}
            <StaggerItem>
              <motion.div
                className="premium-card-light space-y-5 rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              >
                {contactDetails.map(({ icon: Icon, label, render }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <motion.span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-50"
                      whileHover={{ scale: 1.12, rotate: -6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    >
                      <Icon className="h-4.5 w-4.5 text-gold-600" aria-hidden="true" />
                    </motion.span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                        {label}
                      </p>
                      <div className="mt-0.5 text-sm">{render(siteConfig)}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </StaggerItem>

            {/* Map */}
            <StaggerItem>
              <div
                className="overflow-hidden rounded-2xl border border-sand-100 arch-frame"
                style={{
                  boxShadow:
                    '0 8px 32px -8px rgba(13,23,48,0.1), 0 1px 0 rgba(255,255,255,0.7) inset',
                }}
              >
                <iframe
                  title="Office location map"
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="280"
                  loading="lazy"
                  className="border-0"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

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

    const subject = encodeURIComponent(`Inquiry from ${form.name} - HBA Travels`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPackage: ${form.package || 'General Inquiry'}\n\nMessage:\n${form.message}`,
    )

    // mailto: fallback for static deployment
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`

    // Future API / Formspree integration:
    // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // })

    setSubmitted(true)
  }

  return (
    <section id="contact" className="vayron-section bg-sand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} />

        <div className="grid gap-12 lg:grid-cols-2">
          <StaggerContainer>
            <StaggerItem>
              {submitted ? (
                <div
                  className="rounded-2xl border border-sage-400/30 bg-sage-100 p-8 text-center"
                  role="status"
                >
                  <p className="font-semibold text-sage-600">{formLabels.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-night-900">
                      {formLabels.name} <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-ink focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-night-900">
                      {formLabels.phone} <span className="text-gold-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-ink focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                      className="mt-1 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-ink focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-night-900">
                      {formLabels.package}
                    </label>
                    <select
                      id="package"
                      value={form.package}
                      onChange={(e) => setForm({ ...form, package: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-ink focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    >
                      {contact.packageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-night-900">
                      {formLabels.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-sand-100 bg-sand-50 px-4 py-3 text-ink focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 resize-none"
                    />
                  </div>

                  <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                    {formLabels.submit}
                  </MagneticButton>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-sage-600 hover:text-sage-400"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {formLabels.whatsappAlt}
                  </a>
                </form>
              )}
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="space-y-6">
            <StaggerItem className="space-y-4 rounded-2xl border border-sand-100 bg-sand-50 p-6">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-ink/80 hover:text-gold-600"
              >
                <Phone className="h-5 w-5 text-gold-600" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-ink/80 hover:text-gold-600"
              >
                <Mail className="h-5 w-5 text-gold-600" />
                {siteConfig.email}
              </a>
              <p className="flex items-start gap-3 text-ink/80">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                {siteConfig.address}
              </p>
              <p className="flex items-center gap-3 text-ink/80">
                <Clock className="h-5 w-5 text-gold-600" />
                {siteConfig.officeHours}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="overflow-hidden rounded-2xl border border-sand-100 arch-frame">
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

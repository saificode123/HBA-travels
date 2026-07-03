import { useState } from 'react'
import { packages } from '../config/packagesData'
import { siteConfig } from '../config/siteConfig'
import PackageCard from './PackageCard'
import SectionHeading, { StaggerContainer } from './SectionHeading'

type Category = 'umrah' | 'hajj'

export default function Packages() {
  const [category, setCategory] = useState<Category>('umrah')
  const { packages: labels } = siteConfig

  const filtered = packages.filter((pkg) => pkg.category === category)

  return (
    <section id="packages" className="premium-light-section vayron-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} premium />

        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex rounded-full border border-sand-100 bg-sand-50 p-1 shadow-sm"
            role="tablist"
            aria-label="Package category"
          >
            {(['umrah', 'hajj'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  category === cat
                    ? 'bg-gold-400 text-night-900 shadow-sm'
                    : 'text-ink/70 hover:text-night-900'
                }`}
              >
                {cat === 'umrah' ? labels.umrahTab : labels.hajjTab}
              </button>
            ))}
          </div>
        </div>

        <StaggerContainer>
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

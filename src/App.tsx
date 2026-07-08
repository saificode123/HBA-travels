import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HotelsSection from './components/HotelsSection'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Packages from './components/Packages'
import ProcessSteps from './components/ProcessSteps'
import SacredSites from './components/SacredSites'
import SmoothScroll from './components/SmoothScroll'
import StarField from './components/StarField'
import AnimatedGrid from './components/AnimatedGrid'
import TrustBar from './components/TrustBar'
import WhatsAppButton from './components/WhatsAppButton'
import WhyChooseUs from './components/WhyChooseUs'

const Testimonials = lazy(() => import('./components/Testimonials'))

function SectionFallback() {
  return <div className="py-20" aria-hidden="true" />
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* ── Sacred loading screen ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* ── Global ambient backgrounds (fixed, behind everything) ─────── */}
      {/* Star field — subtle cosmic depth */}
      <StarField />
      {/* Animated dot grid — anime.js-inspired signature element */}
      <AnimatedGrid className="animated-grid-fixed" goldRatio={0.065} spacing={32} />

      {/* ── Premium custom cursor ─────────────────────────────────────── */}
      <CustomCursor />

      {/* ── Main site content ─────────────────────────────────────────── */}
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <SacredSites />
          <About />
          <Packages />
          <ProcessSteps />
          <WhyChooseUs />
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
          {/* Hotels section replaces Gallery (Moments from the Journey removed) */}
          <HotelsSection />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </SmoothScroll>
    </>
  )
}

import { lazy, Suspense } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Packages from './components/Packages'
import ProcessSteps from './components/ProcessSteps'
import SacredSites from './components/SacredSites'
import TrustBar from './components/TrustBar'
import WhatsAppButton from './components/WhatsAppButton'
import WhyChooseUs from './components/WhyChooseUs'
import SmoothScroll from './components/SmoothScroll'

const Testimonials = lazy(() => import('./components/Testimonials'))
const Gallery = lazy(() => import('./components/Gallery'))

function SectionFallback() {
  return <div className="py-20" aria-hidden="true" />
}

export default function App() {
  return (
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
        <Suspense fallback={<SectionFallback />}>
          <Gallery />
        </Suspense>
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  )
}

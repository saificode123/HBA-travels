import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

/* ── Procedural Kaaba SVG ─────────────────────────────────────────── */
function KaabaIcon() {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="loader-kaaba-svg"
      aria-hidden="true"
    >
      {/* ── Defs: gold gradient + glow filter ── */}
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EAD9A8" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8912C" />
        </linearGradient>
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Main Kaaba cube — isometric front face ── */}
      {/* Front face */}
      <path
        d="M30 80 L100 50 L170 80 L170 180 L100 210 L30 180 Z"
        fill="rgba(10,16,38,0.95)"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        filter="url(#subtleGlow)"
      />
      {/* Top face */}
      <path
        d="M30 80 L100 50 L170 80 L100 110 Z"
        fill="rgba(18,28,55,0.9)"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
      />
      {/* Left face shading */}
      <path
        d="M30 80 L100 110 L100 210 L30 180 Z"
        fill="rgba(6,10,28,0.97)"
        stroke="url(#goldGrad)"
        strokeWidth="1"
      />
      {/* Right face shading */}
      <path
        d="M170 80 L100 110 L100 210 L170 180 Z"
        fill="rgba(12,20,45,0.95)"
        stroke="url(#goldGrad)"
        strokeWidth="1"
      />

      {/* ── Kiswah gold band (horizontal stripe across front) ── */}
      <path
        d="M30 118 L100 148 L170 118 L170 132 L100 162 L30 132 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        filter="url(#goldGlow)"
        opacity="0.9"
      />
      {/* Left face band continuation */}
      <path
        d="M30 118 L100 148 L100 162 L30 132 Z"
        fill="rgba(212,175,55,0.08)"
        stroke="none"
      />

      {/* ── Hajar al-Aswad (black stone) corner marker ── */}
      <ellipse
        cx="30"
        cy="129"
        rx="5"
        ry="7"
        fill="rgba(212,175,55,0.25)"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        filter="url(#goldGlow)"
      />

      {/* ── Door frame ── */}
      <rect
        x="78"
        y="140"
        width="28"
        height="40"
        rx="14"
        fill="rgba(5,8,22,0.97)"
        stroke="url(#goldGrad)"
        strokeWidth="1.4"
        filter="url(#subtleGlow)"
      />
      {/* Door arch detail */}
      <path
        d="M82 154 Q92 146 110 154"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="0.8"
        opacity="0.7"
      />

      {/* ── Minarets (simplified) ── */}
      {/* Left minaret */}
      <line x1="10" y1="175" x2="10" y2="80" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="10" cy="78" rx="5" ry="7" fill="url(#goldGrad)" filter="url(#goldGlow)" />
      <line x1="10" y1="110" x2="22" y2="108" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.6" />
      {/* Right minaret */}
      <line x1="190" y1="175" x2="190" y2="80" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="190" cy="78" rx="5" ry="7" fill="url(#goldGrad)" filter="url(#goldGlow)" />
      <line x1="190" y1="110" x2="178" y2="108" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.6" />

      {/* Back left minaret (smaller) */}
      <line x1="52" y1="160" x2="52" y2="58" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="52" cy="56" rx="3.5" ry="5" fill="url(#goldGrad)" opacity="0.55" />
      {/* Back right minaret */}
      <line x1="148" y1="160" x2="148" y2="58" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="148" cy="56" rx="3.5" ry="5" fill="url(#goldGrad)" opacity="0.55" />

      {/* ── Ground / courtyard arches ── */}
      <path
        d="M0 180 Q100 165 200 180"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.4"
      />
      <path
        d="M0 190 Q100 175 200 190"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="0.6"
        opacity="0.25"
      />

      {/* ── Glowing crescent moon top ── */}
      <g transform="translate(100, 30)" filter="url(#goldGlow)">
        <path
          d="M0,-12 A12,12 0 1,1 8.5,-8.5 A8,8 0 1,0 0,-12 Z"
          fill="url(#goldGrad)"
          opacity="0.9"
        />
      </g>
    </svg>
  )
}

/* ── Orbital ring particles ──────────────────────────────────────── */
function OrbitalRing({ radius, count, duration, delay = 0 }: {
  radius: number
  count: number
  duration: number
  delay?: number
}) {
  return (
    <div
      className="loader-orbital"
      style={{
        width: radius * 2,
        height: radius * 2,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360
        const x = radius + radius * Math.cos((angle * Math.PI) / 180) - 3
        const y = radius + radius * Math.sin((angle * Math.PI) / 180) - 3
        return (
          <div
            key={i}
            className="loader-orbital-dot"
            style={{
              left: x,
              top: y,
              opacity: 0.15 + (i / count) * 0.6,
            }}
          />
        )
      })}
    </div>
  )
}

/* ── Main LoadingScreen ──────────────────────────────────────────── */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const reduceMotion = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100)
      setDone(true)
      onComplete()
      return
    }

    // Smooth progress simulation
    const totalDuration = 2600
    const startTime = performance.now()

    const tick = () => {
      const elapsed = performance.now() - startTime
      const raw = Math.min(elapsed / totalDuration, 1)
      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - raw, 3)
      const p = Math.floor(eased * 100)
      setProgress(p)
      if (raw < 1) {
        timerRef.current = requestAnimationFrame(tick) as unknown as ReturnType<typeof setInterval>
      } else {
        setProgress(100)
        setTimeout(() => {
          setDone(true)
          onComplete()
        }, 500)
      }
    }
    timerRef.current = requestAnimationFrame(tick) as unknown as ReturnType<typeof setInterval>
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current as unknown as number)
    }
  }, [reduceMotion, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-root"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* ── Radial background ── */}
          <div className="loader-bg-radial" aria-hidden="true" />
          <div className="loader-bg-grid" aria-hidden="true" />

          {/* ── Orbital rings ── */}
          <div className="loader-rings-wrapper" aria-hidden="true">
            <OrbitalRing radius={120} count={24} duration={18} />
            <OrbitalRing radius={160} count={32} duration={26} delay={-8} />
            <OrbitalRing radius={90} count={16} duration={12} delay={-4} />
          </div>

          {/* ── Central content ── */}
          <div className="loader-center">
            {/* Glow halo behind Kaaba */}
            <div className="loader-halo" aria-hidden="true" />

            {/* Kaaba icon with entrance animation */}
            <motion.div
              className="loader-kaaba-wrapper"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <KaabaIcon />
            </motion.div>

            {/* Bismillah Arabic */}
            <motion.p
              className="loader-bismillah"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Bismillah ir-Rahman ir-Rahim"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.p>

            {/* Company name */}
            <motion.p
              className="loader-brand"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="loader-brand-accent">HBA</span>{' '}
              <span className="loader-brand-main">Travels</span>
            </motion.p>

            {/* Sub-tagline */}
            <motion.p
              className="loader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.95 }}
            >
              Your Sacred Journey Begins Here
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="loader-progress-wrapper"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="loader-progress-track">
                <motion.div
                  className="loader-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                {/* Shimmer on the fill */}
                <div
                  className="loader-progress-shimmer"
                  style={{ left: `${Math.max(0, progress - 8)}%` }}
                />
              </div>
              <span className="loader-progress-label">{progress}%</span>
            </motion.div>
          </div>

          {/* ── Corner ornaments ── */}
          <div className="loader-corner loader-corner-tl" aria-hidden="true" />
          <div className="loader-corner loader-corner-tr" aria-hidden="true" />
          <div className="loader-corner loader-corner-bl" aria-hidden="true" />
          <div className="loader-corner loader-corner-br" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

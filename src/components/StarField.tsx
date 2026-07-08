/**
 * StarField — lightweight CSS-only starfield.
 * Replaces the Three.js version for massive performance gain (~800KB saved).
 * Uses canvas for drawing, no heavy 3D library overhead.
 */
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
  gold: boolean
  twinklePhase: number
  twinkleFreq: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let stars: Star[] = []

    const STAR_COUNT = 280 // Was 1420 with Three.js — 5x fewer for perf

    function buildStars() {
      const w = canvas!.width
      const h = canvas!.height
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.08 ? 1.4 + Math.random() * 0.8 : 0.5 + Math.random() * 0.7,
        alpha: 0.2 + Math.random() * 0.55,
        speed: 0.015 + Math.random() * 0.025,
        gold: Math.random() < 0.06,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleFreq: 0.4 + Math.random() * 0.8,
      }))
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      buildStars()
    }

    let lastT = 0
    function draw(t: number) {
      const dt = Math.min(t - lastT, 32) // cap at ~30fps delta
      lastT = t

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      const ts = t / 1000

      for (const s of stars) {
        // Slow upward drift
        s.y -= s.speed * (dt / 16)
        if (s.y < -2) s.y = canvas!.height + 2

        const twinkle = 0.65 + Math.sin(ts * s.twinkleFreq + s.twinklePhase) * 0.35
        const a = s.alpha * twinkle

        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = s.gold
          ? `rgba(212,175,55,${a})`
          : `rgba(253,251,246,${a * 0.75})`
        ctx!.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize, { passive: true })
    resize()
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="star-field-canvas"
      aria-hidden="true"
      style={{ opacity: 0.35, position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

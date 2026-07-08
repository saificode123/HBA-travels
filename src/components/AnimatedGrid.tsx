import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  baseR: number
  phase: number
  freq: number
  gold: boolean
}

interface AnimatedGridProps {
  className?: string
  spacing?: number
  goldRatio?: number
}

/**
 * Anime.js-inspired animated dot grid.
 * A canvas of sine-wave-modulated dots that breathe and shimmer.
 * Rendered as a fixed canvas layer visible on dark sections.
 */
export default function AnimatedGrid({
  className = '',
  spacing = 34,
  goldRatio = 0.07,
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let dots: Dot[] = []

    function buildDots() {
      dots = []
      const cols = Math.ceil(canvas!.width / spacing) + 1
      const rows = Math.ceil(canvas!.height / spacing) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            baseR: Math.random() < 0.12 ? 1.6 : 0.95,
            phase: Math.random() * Math.PI * 2,
            freq: 0.28 + Math.random() * 0.35,
            gold: Math.random() < goldRatio,
          })
        }
      }
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      buildDots()
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const t = ts / 1000

      for (const d of dots) {
        const wave = Math.sin(t * d.freq + d.phase + d.x * 0.018 + d.y * 0.012)
        const alpha = d.gold
          ? 0.1 + (wave + 1) * 0.18
          : 0.04 + (wave + 1) * 0.075
        const r = d.baseR * (0.5 + (wave + 1) * 0.45)

        ctx!.beginPath()
        ctx!.arc(d.x, d.y, Math.max(r, 0.3), 0, Math.PI * 2)
        ctx!.fillStyle = d.gold
          ? `rgba(212,175,55,${Math.min(alpha, 0.55)})`
          : `rgba(253,251,246,${Math.min(alpha, 0.22)})`
        ctx!.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [spacing, goldRatio])

  return (
    <canvas
      ref={canvasRef}
      className={`animated-grid-canvas ${className}`}
      aria-hidden="true"
    />
  )
}

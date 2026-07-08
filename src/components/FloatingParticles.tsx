import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vy: number
  vx: number
  r: number
  alpha: number
  gold: boolean
  life: number
  maxLife: number
}

interface FloatingParticlesProps {
  className?: string
  count?: number
}

/**
 * Upward-drifting gold/white particle stream.
 * Used in the Hero section for sacred atmosphere.
 */
export default function FloatingParticles({
  className = '',
  count = 55,
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let particles: Particle[] = []

    function spawn(): Particle {
      const gold = Math.random() < 0.35
      return {
        x: Math.random() * canvas!.width,
        y: canvas!.height + 10,
        vy: -(0.35 + Math.random() * 0.85),
        vx: (Math.random() - 0.5) * 0.3,
        r: gold ? 1.4 + Math.random() * 1.6 : 0.6 + Math.random() * 1.0,
        alpha: 0,
        gold,
        life: 0,
        maxLife: 220 + Math.random() * 180,
      }
    }

    // Seed initial particles at different life stages
    for (let i = 0; i < count; i++) {
      const p = spawn()
      p.y = Math.random() * canvas.height
      p.life = Math.random() * p.maxLife
      p.alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.7
      particles.push(p)
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx + Math.sin(p.life * 0.03) * 0.18
        p.y += p.vy
        p.alpha = Math.sin((p.life / p.maxLife) * Math.PI) * (p.gold ? 0.75 : 0.45)

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = spawn()
          continue
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = p.gold
          ? `rgba(212,175,55,${p.alpha})`
          : `rgba(253,251,246,${p.alpha * 0.6})`
        ctx!.fill()

        // Glow for gold particles
        if (p.gold && p.alpha > 0.3) {
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(212,175,55,${p.alpha * 0.12})`
          ctx!.fill()
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`floating-particles-canvas ${className}`}
      aria-hidden="true"
    />
  )
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * StarField — a vanilla Three.js star particle canvas
 * fixed behind the entire page as an ambient depth layer.
 * No React Three Fiber overhead — just a raw <canvas> + requestAnimationFrame.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // perf: stars don't need AA
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 400

    // ── Star geometry — dual layers ───────────────────────────────────────────
    function makeStars(count: number, spread: number, size: number, color: number) {
      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * spread
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      })
      return new THREE.Points(geo, mat)
    }

    // White micro-stars (many)
    const whiteStars = makeStars(900, 1600, 1.2, 0xfdfbf6)
    // Gold accent stars (fewer, larger)
    const goldStars  = makeStars(220, 1400, 1.8, 0xd4af37)
    // Deep blue stars for depth
    const blueStars  = makeStars(300, 1800, 0.9, 0xa8bcd4)

    scene.add(whiteStars, goldStars, blueStars)

    // ── Gentle nebula / glow plane ────────────────────────────────────────────
    const nebulaGeo = new THREE.PlaneGeometry(1200, 1200)
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0x1a2a4a,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat)
    nebula.position.z = -300
    scene.add(nebula)

    // ── Scroll-linked parallax ────────────────────────────────────────────────
    let targetY = 0
    let currentY = 0
    const onScroll = () => {
      targetY = window.scrollY * 0.06
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────────
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth parallax
      currentY += (targetY - currentY) * 0.04

      // Slow drift rotation — different axes for each layer
      whiteStars.rotation.y = elapsed * 0.012
      whiteStars.rotation.x = Math.sin(elapsed * 0.007) * 0.05
      goldStars.rotation.y  = elapsed * -0.008
      goldStars.rotation.z  = elapsed * 0.005
      blueStars.rotation.y  = elapsed * 0.018
      blueStars.rotation.x  = Math.cos(elapsed * 0.006) * 0.04

      // Camera parallax from scroll
      camera.position.y = -currentY
      camera.position.x = Math.sin(elapsed * 0.04) * 8

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      whiteStars.geometry.dispose()
      ;(whiteStars.material as THREE.Material).dispose()
      goldStars.geometry.dispose()
      ;(goldStars.material as THREE.Material).dispose()
      blueStars.geometry.dispose()
      ;(blueStars.material as THREE.Material).dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="star-field-canvas"
      aria-hidden="true"
    />
  )
}

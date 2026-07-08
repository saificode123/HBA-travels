import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

/* ─── Kaaba Cube ──────────────────────────────────────────────────────────── */
function KaabaCube() {
  const groupRef = useRef<THREE.Group>(null!)
  const edgesRef = useRef<THREE.LineSegments>(null!)
  const bandRef  = useRef<THREE.Mesh>(null!)
  const glowRef  = useRef<THREE.Mesh>(null!)

  // Slow auto-rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.04
    }
    // Kiswah gold band subtle pulse
    if (bandRef.current) {
      const mat = bandRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.35 + Math.sin(t * 1.2) * 0.15
    }
    // Glow halo breathe
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.06)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.06 + Math.sin(t * 0.9) * 0.02
    }
  })

  // ── Kaaba main body ────────────────────────────────────────────────────────
  const bodyGeo  = useMemo(() => new THREE.BoxGeometry(2, 2.6, 2), [])
  const bodyMat  = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x050810,
    roughness: 0.9,
    metalness: 0.1,
  }), [])

  // ── Gold edge lines ────────────────────────────────────────────────────────
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(bodyGeo), [bodyGeo])
  const edgesMat = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xd4af37,
    linewidth: 1,
    transparent: true,
    opacity: 0.85,
  }), [])

  // ── Kiswah band (horizontal ring around cube) ──────────────────────────────
  const bandGeo = useMemo(() => new THREE.TorusGeometry(1.45, 0.06, 8, 64), [])
  const bandMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    emissive: 0xd4af37,
    emissiveIntensity: 0.4,
    roughness: 0.4,
    metalness: 0.8,
  }), [])

  // ── Glow halo disc ─────────────────────────────────────────────────────────
  const glowGeo = useMemo(() => new THREE.SphereGeometry(2.2, 32, 32), [])
  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.07,
    side: THREE.BackSide,
    depthWrite: false,
  }), [])

  // ── Small door ────────────────────────────────────────────────────────────
  const doorGeo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.18, -0.45)
    shape.lineTo(-0.18,  0.2)
    shape.quadraticCurveTo(0, 0.48, 0.18, 0.2)
    shape.lineTo(0.18, -0.45)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])
  const doorMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xb8912c,
    emissive: 0xd4af37,
    emissiveIntensity: 0.3,
    roughness: 0.3,
    metalness: 0.9,
    side: THREE.DoubleSide,
  }), [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Glow halo */}
      <mesh ref={glowRef} geometry={glowGeo} material={glowMat} />

      {/* Main cube */}
      <mesh geometry={bodyGeo} material={bodyMat} />

      {/* Gold edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeo} material={edgesMat} />

      {/* Kiswah band */}
      <mesh
        ref={bandRef}
        geometry={bandGeo}
        material={bandMat}
        position={[0, -0.25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Door on front face */}
      <mesh
        geometry={doorGeo}
        material={doorMat}
        position={[0, -0.15, 1.02]}
      />
    </group>
  )
}

/* ─── Gold particle cloud ─────────────────────────────────────────────────── */
function GoldParticles({ count = 1800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Spherical distribution biased toward the Kaaba
      const r     = 2.5 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = 0.5 + Math.random() * 1.8
    }
    return { positions, sizes }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: 0xd4af37,
    size: 0.045,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.07
      pointsRef.current.rotation.x = Math.sin(t * 0.04) * 0.12
    }
    const mat = pointsRef.current?.material as THREE.PointsMaterial
    if (mat) mat.opacity = 0.55 + Math.sin(t * 0.6) * 0.12
  })

  return <points ref={pointsRef} geometry={geo} material={mat} />
}

/* ─── Minaret pillars (simplified) ───────────────────────────────────────── */
function Minarets() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0a1428,
    roughness: 0.85,
    metalness: 0.2,
  }), [])
  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.55,
  }), [])
  const capMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    emissive: 0xd4af37,
    emissiveIntensity: 0.35,
    roughness: 0.3,
    metalness: 0.9,
  }), [])

  const minaretPositions: [number, number, number][] = [
    [-2.0,  0.0, -2.0],
    [ 2.0,  0.0, -2.0],
    [-2.0,  0.0,  2.0],
    [ 2.0,  0.0,  2.0],
  ]

  return (
    <>
      {minaretPositions.map(([x, , z], i) => {
        const shaftGeo = new THREE.CylinderGeometry(0.09, 0.11, 2.8, 8)
        const capGeo   = new THREE.ConeGeometry(0.14, 0.45, 8)
        const edgeGeo  = new THREE.EdgesGeometry(shaftGeo)
        return (
          <group key={i} position={[x, -0.2, z]}>
            <mesh geometry={shaftGeo} material={mat} />
            <lineSegments geometry={edgeGeo} material={edgeMat} />
            <mesh geometry={capGeo} material={capMat} position={[0, 1.6, 0]} />
          </group>
        )
      })}
    </>
  )
}

/* ─── Ambient scene lights ────────────────────────────────────────────────── */
function Lighting() {
  return (
    <>
      {/* Warm ambient */}
      <ambientLight color={0x1a2040} intensity={0.6} />
      {/* Gold key light from above-front */}
      <pointLight color={0xd4af37} intensity={3.5} position={[3, 5, 4]} distance={18} />
      {/* Cool fill from behind */}
      <pointLight color={0x3a5080} intensity={1.2} position={[-5, 2, -6]} distance={20} />
      {/* Rim light */}
      <pointLight color={0xead9a8} intensity={1.8} position={[0, -4, 3]} distance={14} />
      {/* Top directional */}
      <directionalLight color={0xfdfbf6} intensity={0.4} position={[0, 8, 0]} />
    </>
  )
}


/* ─── Public component ────────────────────────────────────────────────────── */
export default function KaabaScene() {
  return (
    <div className="kaaba-canvas-wrapper" aria-label="Interactive 3D Kaaba model">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Lighting />
          <GoldParticles count={1600} />
          <KaabaCube />
          <Minarets />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.72}
            rotateSpeed={0.55}
            dampingFactor={0.08}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

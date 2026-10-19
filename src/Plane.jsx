import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function flat(pts, depth) {
  const s = new THREE.Shape()
  pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)))
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false })
  g.translate(0, 0, -depth / 2)
  return g
}

export default function Plane({ open }) {
  const outer = useRef(), inner = useRef(), prog = useRef(0)
  const { viewport } = useThree()

  const g = useMemo(() => {
    const pts = new THREE.SplineCurve(
      [[0.05, -4.2], [0.3, -3.8], [0.55, -2.8], [0.7, -1.5], [0.72, 0], [0.72, 2], [0.64, 3.1], [0.42, 3.9], [0.12, 4.35], [0, 4.45]]
        .map(([r, y]) => new THREE.Vector2(r, y))
    ).getPoints(70)
    return {
      body: new THREE.LatheGeometry(pts, 48),
      wing: flat([[0.7, 0], [-1.9, 4.2], [-2.4, 4.2], [-0.9, 0]], 0.09),
      stab: flat([[0.5, 0], [-0.9, 1.9], [-1.2, 1.9], [-0.6, 0]], 0.06),
      fin: flat([[-2.9, 0.55], [-3.9, 2.2], [-4.4, 2.2], [-4.3, 0.4]], 0.09),
    }
  }, [])

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime, w = viewport.width, h = viewport.height
    const narrow = w < 9, L = THREE.MathUtils.lerp
    prog.current = THREE.MathUtils.damp(prog.current, open ? 1 : 0, 2, dt)
    const e = prog.current, k = e * e * (3 - 2 * e)
    const base = narrow ? w * 0.09 : Math.min(0.5, w * 0.027)
    const hx = narrow ? 0 : w * 0.2, hy = narrow ? h * 0.26 : h * 0.1
    const cx = narrow ? w * 0.3 : w * 0.38, cy = h * 0.38
    outer.current.scale.setScalar(base * (1 - k * 0.55))
    outer.current.position.set(L(hx, cx, k), L(hy, cy, k) + Math.sin(t * 0.9) * 0.12, -Math.sin(e * Math.PI) * 3)
    outer.current.rotation.set(0, L(-0.5, -0.25, k), L(0.25, 0.1, k) + Math.sin(e * Math.PI) * 0.3)
    inner.current.rotation.x = e * Math.PI * 2 + Math.sin(t * 0.7) * 0.07 // barrel roll
  })

  const white = { color: '#f4f7fb', metalness: 0.35, roughness: 0.3 }
  const grey = { color: '#c9d2de', metalness: 0.5, roughness: 0.35, side: THREE.DoubleSide }
  const windows = Array.from({ length: 12 }, (_, i) => -1.2 + i * 0.27)

  return (
    <group ref={outer}>
      <group ref={inner}>
        <mesh geometry={g.body} rotation={[0, 0, -Math.PI / 2]}><meshStandardMaterial {...white} /></mesh>
        {/* wings (mirrored) */}
        {[1, -1].map((m) => (
          <group key={m} scale={[1, 1, m]}>
            <mesh geometry={g.wing} rotation={[-Math.PI / 2, 0, 0.0]} position={[0.2, -0.32, 0]}><meshStandardMaterial {...grey} /></mesh>
            <mesh geometry={g.stab} rotation={[-Math.PI / 2, 0, 0]} position={[-3.5, 0.1, 0]}><meshStandardMaterial {...grey} /></mesh>
            <mesh position={[1.0, -0.78, 1.9]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.34, 0.38, 1.4, 28]} /><meshStandardMaterial color="#8c97a6" metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[1.72, -0.78, 1.9]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.26, 0.26, 0.05, 24]} /><meshStandardMaterial color="#15181d" />
            </mesh>
            {windows.map((x) => (
              <mesh key={x} position={[x, 0.28, 0.65]}><boxGeometry args={[0.1, 0.13, 0.05]} /><meshStandardMaterial color="#1b2a3d" roughness={0.1} metalness={0.6} /></mesh>
            ))}
          </group>
        ))}
        <mesh geometry={g.fin}><meshStandardMaterial color="#1e6fff" metalness={0.3} roughness={0.35} side={THREE.DoubleSide} /></mesh>
        <mesh position={[3.4, 0.3, 0]} scale={[0.4, 0.2, 0.52]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color="#0e1a2b" roughness={0.05} metalness={0.8} /></mesh>
        {/* livery stripe */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.725, 0.725, 0.12, 48, 1, true]} /><meshStandardMaterial color="#1e6fff" /></mesh>
      </group>
    </group>
  )
}

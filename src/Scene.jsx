import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Plane from './Plane'

const rand = (n, fn) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) fn().toArray(a, i * 3)
  return a
}
const Pts = ({ arr, size, color }) => (
  <points>
    <bufferGeometry><bufferAttribute attach="attributes-position" array={arr} count={arr.length / 3} itemSize={3} /></bufferGeometry>
    <pointsMaterial size={size} color={color} sizeAttenuation transparent opacity={0.9} />
  </points>
)

function Stars() {
  const arr = useMemo(() => rand(600, () => new THREE.Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, -8 - Math.random() * 14)), [])
  return <Pts arr={arr} size={0.06} color="#bcd4ff" />
}

function Globe() {
  const { viewport: { width: w, height: h } } = useThree()
  const narrow = w < 9, R = narrow ? 3.4 : 4.6
  const ref = useRef()
  const lights = useMemo(() => rand(1000, () => new THREE.Vector3().randomDirection().multiplyScalar(R * 1.003)), [R])
  const pins = useMemo(() => [[28, -12], [16, 22], [38, 8]].map(([la, lo]) => {
    const a = (la * Math.PI) / 180, b = (lo * Math.PI) / 180
    return [R * Math.cos(a) * Math.sin(b), R * Math.sin(a), R * Math.cos(a) * Math.cos(b)]
  }), [R])
  useFrame((s) => { ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.1) * 0.3 })
  return (
    <group position={[narrow ? w * 0.1 : w * 0.3, narrow ? -h * 0.3 - R : -h * 0.12 - R, -3]} rotation={[0, 0, 0.4]}>
      <group ref={ref}>
        <mesh><sphereGeometry args={[R, 64, 48]} /><meshStandardMaterial color="#06142e" emissive="#0a2a66" emissiveIntensity={0.4} roughness={0.8} /></mesh>
        <Pts arr={lights} size={0.04} color="#ffcf6b" />
        {pins.map((p, i) => (
          <group key={i} position={p}>
            <mesh><sphereGeometry args={[0.1, 16, 12]} /><meshBasicMaterial color="#60a5fa" /></mesh>
            <mesh><sphereGeometry args={[0.22, 16, 12]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.3} /></mesh>
          </group>
        ))}
      </group>
      <mesh><sphereGeometry args={[R * 1.05, 48, 36]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.16} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
    </group>
  )
}

function Trail({ open }) {
  const { viewport: { width: w, height: h } } = useThree()
  const line = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([[-0.5, -0.38], [-0.2, -0.2], [0.05, -0.02], [0.15, 0.08]].map(([x, y]) => new THREE.Vector3(x * w, y * h, -1)))
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(c.getPoints(80)),
      new THREE.LineDashedMaterial({ color: '#7aa7ff', dashSize: 0.3, gapSize: 0.25, transparent: true, opacity: 0.8 })
    )
    l.computeLineDistances()
    return l
  }, [w, h])
  useFrame((_, dt) => { line.material.opacity = THREE.MathUtils.damp(line.material.opacity, open ? 0 : 0.8, 3, dt) })
  return <primitive object={line} />
}

export default function Scene({ open }) {
  return (
    <>
      <hemisphereLight args={['#9db8ff', '#0a1630', 0.7]} />
      <directionalLight position={[-5, 6, 8]} intensity={3} color="#e3ecff" />
      <directionalLight position={[6, 2, -4]} intensity={2} color="#4f8bff" />
      <Stars />
      <Globe />
      <Trail open={open} />
      <Plane open={open} />
    </>
  )
}

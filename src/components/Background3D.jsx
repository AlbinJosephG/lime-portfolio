import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'

const isMobile = window.innerWidth < 768

function Cube(props) {
  const ref = useRef()
  useFrame((_, d) => {
    ref.current.rotation.x += d * 0.25
    ref.current.rotation.y += d * 0.35
  })
  return (
    <mesh ref={ref} {...props} scale={isMobile ? 0.7 : 1}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.3} />
    </mesh>
  )
}

function Pyramid(props) {
  const ref = useRef()
  useFrame((_, d) => {
    ref.current.rotation.x += d * 0.2
    ref.current.rotation.y += d * 0.3
  })
  return (
    <mesh ref={ref} {...props} scale={isMobile ? 0.7 : 1}>
      <coneGeometry args={[0.85, 1.25, 4]} />
      <meshStandardMaterial
        color="#6f7f1e"
        roughness={0.45}
        metalness={0.35}
        emissive="#9edc2a"
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

function Sphere(props) {
  const ref = useRef()
  const t = useRef(0)
  useFrame((_, d) => {
    t.current += d
    ref.current.rotation.y += d * 0.4
    ref.current.position.y =
      props.position[1] + Math.sin(t.current * 0.6) * 0.15
  })
  return (
    <mesh ref={ref} {...props} scale={isMobile ? 0.65 : 1}>
      <sphereGeometry args={[0.75, 48, 48]} />
      <meshStandardMaterial color="#2f3b4f" roughness={0.35} metalness={0.55} />
    </mesh>
  )
}

export default function Background3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <hemisphereLight
        skyColor="#b6ff2a"
        groundColor="#1a1a1a"
        intensity={0.55}
      />
      <directionalLight position={[5, 6, 4]} intensity={0.9} />
      <pointLight position={[0, 0, 5]} intensity={0.25} color="#aaff00" />

      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Pyramid position={isMobile ? [1.4, 1, -2] : [2.3, 1.2, -1.8]} />
      </Float>

      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.4}>
        <Cube position={isMobile ? [-1.6, -0.6, -2] : [-2.3, -0.4, -1.2]} />
      </Float>

      <Float speed={0.8} rotationIntensity={0.35} floatIntensity={0.4}>
        <Sphere position={isMobile ? [0.4, -1.4, -2.5] : [0.6, -1.5, -2.2]} />
      </Float>
    </Canvas>
  )
}

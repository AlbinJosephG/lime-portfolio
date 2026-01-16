import { motion } from 'framer-motion'
import GradientBlur from '../components/GradientBlur'
import ParticlesBackground from '../components/ParticlesBackground'
import AnimatedButton from '../components/AnimatedButton'

export default function CallToAction() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#0b0b0b', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <ParticlesBackground />
      <GradientBlur />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <h1 style={{ color: '#aaff00', marginBottom: '30px' }}>Looking to Work Together?</h1>
        <AnimatedButton text="Contact / Hire Me" link="/contact" />
      </motion.div>
    </div>
  )
}

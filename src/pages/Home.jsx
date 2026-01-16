import { motion } from 'framer-motion'
import AnimatedButton from '../components/AnimatedButton'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import Background3D from '../components/Background3D'

export default function Home() {
  return (
    <section className="hero">
      {/* 3D BACKGROUND */}
      <div className="hero-bg" aria-hidden="true">
        <Background3D />
      </div>

      {/* HERO CONTENT */}
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <span className="hero-badge">
          Artificial Intelligence & Data Science student
        </span>

        <h1 className="hero-title">
          <span className="title-white">Building</span>
          <span className="title-lime glow">Neural</span>
          <span className="title-lime glow">Dreams</span>
        </h1>

        <p className="hero-desc">
          I engineer high performance AI architectures that bridge the gap
          between raw data and impactful automations
        </p>

        <div className="hero-actions">
          <AnimatedButton text="View Work →" link="#projects" primary />
          <AnimatedButton text="Contact Me" link="#contact" />
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/AlbinJosephG"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/albin-joseph-3a73b8336/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </motion.div>
    </section>
  )
}


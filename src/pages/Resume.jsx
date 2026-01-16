import { motion } from 'framer-motion'

export default function Resume() {
  return (
    <motion.section className="page">
      <motion.a
        href="/resume.pdf"
        download
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px #aaff00' }}
        className="resume-btn"
      >
        Download Resume
      </motion.a>
    </motion.section>
  )
}

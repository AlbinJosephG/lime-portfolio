import { motion } from 'framer-motion'

export default function AnimatedButton({ text, link, primary }) {
  return (
    <motion.a
      href={link}
      className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  )
}



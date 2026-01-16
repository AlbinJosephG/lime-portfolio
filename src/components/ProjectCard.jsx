import { motion } from 'framer-motion'
import projectImage from '../assets/about/about-image.webp'

export default function ProjectCard({ title, description, tech, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="project-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* IMAGE */}
      <div className="project-image">
        <img src={projectImage} alt={title} />
      </div>

      {/* CONTENT */}
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="project-tech">
          {tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

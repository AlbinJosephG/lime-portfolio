import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: 'Neon E-Commerce',
    description:
      'A futuristic shopping experience built with Next.js and WebGL.',
    tech: ['React', 'Three.js', 'Tailwind'],
    link: 'https://github.com/AlbinJosephG/MCP-Resume-Analyzer',
  },
  {
    title: 'AI Chat Interface',
    description:
      'Real-time chat application with generative AI capabilities.',
    tech: ['TypeScript', 'OpenAI', 'WebSocket'],
    link: 'https://github.com/AlbinJosephG/MCP-Resume-Analyzer',
  },
  {
    title: 'Crypto Dashboard',
    description:
      'Live cryptocurrency tracking dashboard with advanced analytics.',
    tech: ['D3.js', 'React', 'Node.js'],
    link: 'https://github.com/AlbinJosephG/MCP-Resume-Analyzer',
  },
]

// Animation variants
const pageVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const gridVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <motion.section
      className="projects"
      variants={pageVariant}
      initial="hidden"
      animate="show"
    >
      {/* HEADER */}
      <div className="projects-header">
        <h2>
          My <span>Projects</span>
        </h2>
        <p>
          A curated collection of web applications, experiments, and open source
          contributions.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        className="projects-grid"
        variants={gridVariant}
      >
        {projects.map((p, i) => (
          <motion.div key={i} variants={cardVariant}>
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}


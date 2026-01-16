import { motion } from 'framer-motion'
import SkillBar from "../components/SkillBar"

// icons
import frontendIcon from "../assets/icons/img1.jpg"
import backendIcon from "../assets/icons/img2.jpg"

const skills = [
  { title: "React / Next.js", level: 95, category: "Frontend" },
  { title: "TypeScript", level: 90, category: "Frontend" },
  { title: "Three.js / WebGL", level: 80, category: "Frontend" },
  { title: "Framer Motion", level: 90, category: "Frontend" },

  { title: "Node.js", level: 85, category: "Backend" },
  { title: "PostgreSQL", level: 75, category: "Backend" },
]

// Page animation
const pageVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

// Grid stagger (ONLY for skill bars)
const gridVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Skills() {
  const frontendSkills = skills.filter(s => s.category === "Frontend")
  const backendSkills = skills.filter(s => s.category === "Backend")

  return (
    <motion.section
      className="skills-page"
      variants={pageVariant}
      initial="hidden"
      animate="show"
    >
      {/* SECTION HEADER — SAME AS PROJECTS / ABOUT / CONTACT */}
      <div className="projects-header">
        <h2>
          My <span>Skills</span>
        </h2>
        <p>
          A focused overview of the technologies and tools I use to design,
          build, and scale modern web applications.
        </p>
      </div>

      {/* Frontend */}
      <div className="skills-section">
        <div className="skills-header">
          <div className="skills-icon">
            <img
              src={frontendIcon}
              alt="Frontend & UI"
              className="skills-icon-img"
            />
          </div>
          <h2>Frontend & UI</h2>
        </div>

        <motion.div
          className="skills-grid"
          variants={gridVariant}
          initial="hidden"
          animate="show"
        >
          {frontendSkills.map((skill, i) => (
            <motion.div key={i} variants={itemVariant}>
              <SkillBar {...skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Backend */}
      <div className="skills-section">
        <div className="skills-header">
          <div className="skills-icon">
            <img
              src={backendIcon}
              alt="Backend & API"
              className="skills-icon-img"
            />
          </div>
          <h2>Backend & API</h2>
        </div>

        <motion.div
          className="skills-grid"
          variants={gridVariant}
          initial="hidden"
          animate="show"
        >
          {backendSkills.map((skill, i) => (
            <motion.div key={i} variants={itemVariant}>
              <SkillBar {...skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}




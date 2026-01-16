import { motion } from 'framer-motion'
import aboutImage from '../assets/about/about-image.webp'

export default function About() {
  return (
    
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      
    {/* LEFT IMAGE */}
<div className="about-image-wrapper">

  {/* IMAGE HEADER */}
  <div className="about-image-header">
    <h2 className="about-image-title">
     <span>About Me</span>
    </h2>
    <p className="about-image-subtitle">
      AI&DS Student
    </p>
  </div>

  {/* IMAGE */}
  <img src={aboutImage} alt="About me" />

</div>

      {/* RIGHT CONTENT */}
      <div className="about-content">
        <h2 className="about-title">Behind the Code</h2>

        <p className="about-text">
          I am a passionate developer who believes that code is poetry. With a
          background in design and engineering, I bridge the gap between
          aesthetics and functionality.
        </p>

        <p className="about-text">
          My toolkit includes React, TypeScript, Node.js, and WebGL. I’m obsessed
          with performance, accessibility, and creating user interfaces that
          feel alive.
        </p>

        <a
  href="/resume.pdf"
  className="resume-bar"
  target="_blank"
  rel="noreferrer"
>
  <span className="resume-icon">⬇</span>
  <span>Download Resume</span>
</a>

      </div>
    </motion.section>
  )
}


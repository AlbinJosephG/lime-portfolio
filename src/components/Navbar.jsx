import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'], // ✅ FIXED TYPO
  ['contact', 'Contact'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll spy (desktop + mobile)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          // ✅ FORCE HOME WHEN AT TOP
          if (window.scrollY < 100) {
            setActiveSection('home')
            return
          }

          setActiveSection(entry.target.id)
        })
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0,
      }
    )

    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className="navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="navbar-inner">
          <a href="#home" className="navbar-logo">
            DEV<span className="lime">.PORTFOLIO</span>
          </a>

          {/* Desktop */}
          <div className="navbar-links desktop-only">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${
                  activeSection === id ? 'active' : ''
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="mobile-links">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={
                    activeSection === id ? 'mobile-active' : ''
                  }
                >
                  {label}
                </a>
              ))}

              <a
                href="/resume.pdf"
                className="resume-btn"
                download
              >
                <FaDownload className="resume-icon" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}





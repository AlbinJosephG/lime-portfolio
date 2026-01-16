import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSuccess(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-page">
      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* LEFT */}
        <div className="contact-info">
          <h1 className="contact-title">
            <span className="title-white">Let&apos;s</span>{' '}
            <span className="title-lime glow">Connect</span>
          </h1>

          <p className="contact-desc">
            Have a project in mind? Looking for a developer to join your team?
            Or just want to say hi? Drop me a message!
          </p>

          <div className="contact-meta">
            <a
              href="mailto:albinedwards.g@gmail.com"
              className="contact-item contact-link"
            >
              <div className="contact-icon">
                <Mail size={18} strokeWidth={2} />
              </div>
              <span>albinedwards.g@gmail.com</span>
            </a>

            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          whileHover={{ y: -2 }}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && (
            <p className="form-success">Message sent successfully!</p>
          )}

          <motion.button
            className="btn btn-primary contact-btn"
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? 'Sending...' : 'Send Message →'}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}



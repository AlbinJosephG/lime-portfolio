// server/index.js
import express from 'express'
import cors from 'cors'
import dns from 'dns/promises'
import sgMail from '@sendgrid/mail'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.send('Server is running')
})

// Validate env
if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_USER) {
  console.error('Missing SENDGRID_API_KEY or EMAIL_USER')
  process.exit(1)
}

// Configure SendGrid (HTTP API — works on Render Free)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log('SendGrid configured')

// Contact API health check
app.get('/api/contact', (req, res) => {
  res.status(200).json({ message: 'Contact API is running' })
})

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Optional MX check
  try {
    const domain = email.split('@')[1]
    await dns.resolveMx(domain)
  } catch {
    return res.status(400).json({ error: 'Invalid email domain' })
  }

  try {
    await sgMail.send({
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER, // must be verified in SendGrid
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// server/index.js
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dns from 'dns/promises'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Middleware
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

// SendGrid transporter (API-based — works on Render free tier)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
})

// Verify on startup
transporter.verify((err) => {
  if (err) {
    console.error('Email server error:', err)
  } else {
    console.log('Email server ready')
  }
})

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

  // Optional MX validation
  try {
    const domain = email.split('@')[1]
    await dns.resolveMx(domain)
  } catch {
    return res.status(400).json({ error: 'Invalid email domain' })
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


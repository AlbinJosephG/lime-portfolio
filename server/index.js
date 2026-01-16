// server/index.js
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dns from 'dns/promises'
import 'dotenv/config'

const app = express()

// PORT assigned by Render automatically
const PORT = process.env.PORT || 5000

// Frontend URL for CORS (set in Render env variables)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Middleware
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running')
})

// Ensure required environment variables exist
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing EMAIL_USER or EMAIL_PASS in environment variables')
  process.exit(1)
}

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify mail server on startup
transporter.verify((err) => {
  if (err) {
    console.error('Email server error:', err)
  } else {
    console.log('Email server ready')
  }
})

// GET contact API health check
app.get('/api/contact', (req, res) => {
  res.status(200).json({ message: 'Contact API is running' })
})

// POST contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // MX record validation (optional, remove if causes issues)
  const domain = email.split('@')[1]
  try {
    const mxRecords = await dns.resolveMx(domain)
    if (!mxRecords || mxRecords.length === 0) {
      return res.status(400).json({ error: 'Email domain cannot receive mail' })
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or non-existent email domain' })
  }

  // Send email
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

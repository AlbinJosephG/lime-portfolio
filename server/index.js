import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dns from 'dns/promises'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running');
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing EMAIL_USER or EMAIL_PASS in .env')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify mail server
transporter.verify((err) => {
  if (err) {
    console.error('Email server error:', err)
  } else {
    console.log('Email server ready')
  }
})

// GET health check
app.get('/api/contact', (req, res) => {
  res.status(200).json({ message: 'Contact API is running' })
})

// POST contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // 🔍 MX DOMAIN VALIDATION
  const domain = email.split('@')[1]

  try {
    const mxRecords = await dns.resolveMx(domain)

    if (!mxRecords || mxRecords.length === 0) {
      return res
        .status(400)
        .json({ error: 'Email domain cannot receive mail' })
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid or non-existent email domain' })
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
  console.log(`Server running on http://localhost:${PORT}`)
})

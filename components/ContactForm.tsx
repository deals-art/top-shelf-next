'use client'
import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      (e.target as HTMLFormElement).reset()
      setSubmitted(false)
    }, 3500)
  }

  return (
    <section id="contact">
      <div className="container contact-grid">
        <motion.div
          className="contact-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-eyebrow">Get In Touch</p>
          <h2>Ready to Sell?<br />Let&apos;s Talk.</h2>
          <p>We buy properties in any condition, any situation. No repairs. No agents. No fees. Just a fair cash offer and a smooth closing.</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@topshelfacquisitions.com">info@topshelfacquisitions.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Tampa Bay, Florida</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.12, ease }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="(813) 555-0100" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Property Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St, Tampa, FL" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Property Type</label>
            <select id="type" name="type">
              <option value="">Select one...</option>
              <option value="sfr">Single Family Home</option>
              <option value="land">Vacant Land</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Tell Us More (Optional)</label>
            <textarea id="message" name="message" rows={4} placeholder="Condition of the property, your situation, timeline..." />
          </div>
          <button
            type="submit"
            className="btn-primary full-width"
            disabled={submitted}
            style={submitted ? { background: 'linear-gradient(90deg,#2a7a5a,#1d6b4c)', opacity: 1 } : {}}
          >
            {submitted ? "✓ We'll be in touch soon!" : 'Submit & Get My Offer'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-inner">
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Tampa Bay, Florida
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease }}
          >
            We Buy <span className="teal">Real Estate</span><br />With Purpose.
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            Top Shelf Acquisitions specializes in value-add single family homes and vacant
            land across Tampa Bay. Fast closings, fair offers, no hassle.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease }}
          >
            <a href="#contact" className="btn-primary">Get A Cash Offer</a>
            <a href="#portfolio" className="btn-ghost">See Our Deals</a>
          </motion.div>
        </div>

        <div className="hero-cards">
          <div className="hero-card">
            <span className="hero-card-icon">🏠</span>
            <div className="hero-card-text">
              <span className="hero-card-num">SFR</span>
              <span className="hero-card-label">Single Family Homes</span>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">🌿</span>
            <div className="hero-card-text">
              <span className="hero-card-num">Land</span>
              <span className="hero-card-label">Vacant &amp; Buildable Lots</span>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">⚡</span>
            <div className="hero-card-text">
              <span className="hero-card-num">Fast</span>
              <span className="hero-card-label">Cash Close</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const photos = [
  { src: '/sean/listening.jpg', alt: 'At a mastermind' },
  { src: '/sean/onsite.jpg', alt: 'Onsite walkthrough' },
  { src: '/sean/panel.jpg', alt: 'Speaking on a panel' },
  { src: '/sean/candid.jpg', alt: 'Underwriting deals' },
  { src: '/sean/friendly.jpg', alt: 'Closing day' },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="meet-grid">
          <motion.div
            className="meet-portrait"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease }}
          >
            <div className="meet-portrait-frame">
              <img src="/sean/headshot.jpg" alt="Sean Castro, founder of Top Shelf Acquisitions" />
              <div className="meet-portrait-ring" aria-hidden />
            </div>
            <div className="meet-tag">
              <span className="meet-tag-dot" aria-hidden />
              <span>Tampa, FL</span>
              <span className="meet-tag-sep">·</span>
              <span>Founder</span>
            </div>
          </motion.div>

          <motion.div
            className="meet-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
          >
            <p className="section-eyebrow">Meet the Owner</p>
            <h2 className="meet-h2">Hi, I&apos;m <span className="teal">Sean</span>.</h2>

            <p>I moved to Tampa in 2023 and started <strong>Top Shelf Acquisitions</strong>. We specialize in helping Tampa Bay realtors and their sellers navigate any difficult situation — probate, divorce, inheritance, fixer-uppers, distressed properties, or sellers who simply need speed and privacy.</p>

            <p>Over <span className="meet-stat">100 transactions</span> later, I&apos;m still focused on the same thing every day: giving agents a trusted partner for their hardest cases.</p>

            <p>I&apos;m also a proud member of a few local masterminds that continue to grow my network and sharpen my problem-solving — helping me better serve every realtor and seller I work with.</p>

            <a href="#contact" className="btn-primary">Send Me a Deal</a>
          </motion.div>
        </div>

        <div className="moments-block">
          <div className="moments-header">
            <p className="section-eyebrow">Moments</p>
            <h3 className="moments-title">A few stops along the way.</h3>
          </div>

          <Marquee />
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const loop = [...photos, ...photos]
  return (
    <div className="vm-frame">
      <div className="vm-track">
        {loop.map((p, i) => (
          <div key={i} className="vm-card">
            <img src={p.src} alt={p.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

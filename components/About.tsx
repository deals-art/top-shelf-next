'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    icon: '🏠',
    title: 'Value-Add Focus',
    body: 'We see potential where others see problems. Our expertise is identifying and acquiring undervalued properties — homes that need rehab, inherited estates, distressed situations — across the Tampa Bay market.',
  },
  {
    icon: '📍',
    title: 'Hyper-Local Expertise',
    body: 'We know the neighborhoods, the comps, and the opportunities. Our Tampa Bay focus means faster decisions, better offers, and a smoother process for every seller we work with.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-eyebrow">Who We Are</p>
          <h2>Real Estate Investors<br />Rooted in Tampa Bay</h2>
          <p>Top Shelf Acquisitions is a Tampa Bay-based real estate investment company with a focus on value-add opportunities. We buy single family properties that need work and vacant land with untapped potential — and we do it with speed, transparency, and respect.</p>
          <p>Whether you&apos;re a seller looking for a fast exit or a landowner ready to move on, we&apos;re the team that shows up, closes, and delivers.</p>
          <a href="#contact" className="btn-primary">Work With Us</a>
        </motion.div>

        <div className="about-cards">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="about-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
            >
              <div className="about-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

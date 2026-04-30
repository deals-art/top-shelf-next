'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    icon: '🏠',
    title: 'Single Family Homes',
    desc: 'We specialize in value-add single family residences — properties that need rehab, deferred maintenance, or sit in transitional neighborhoods with strong upside.',
    items: ['Distressed or dated properties', 'Inherited homes & estate sales', 'Pre-foreclosure situations', 'Off-market opportunities'],
    featured: false,
  },
  {
    icon: '🌿',
    title: 'Vacant Land',
    desc: 'From infill lots to larger parcels, we actively seek vacant and underutilized land across the Tampa Bay region with development or resale potential.',
    items: ['Infill residential lots', 'Buildable parcels', 'Overgrown or unused land', 'Rural and suburban tracts'],
    featured: true,
  },
]

export default function WhatWeBuy() {
  return (
    <section id="what-we-buy">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">What We Buy</p>
          <h2>Two Asset Classes.<br />One Standard of Excellence.</h2>
        </motion.div>

        <div className="buy-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`buy-card${card.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
            >
              <div className="buy-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <ul>{card.items.map(item => <li key={item}>{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

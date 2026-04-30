'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { num: '99+', label: 'Deals Closed' },
  { num: '$1.85M+', label: 'In Assignment Fees' },
  { num: '24hr', label: 'Offer Turnaround' },
  { num: '$0', label: 'Fees or Commissions' },
]

export default function ProofBar() {
  return (
    <section id="proof-bar">
      <div className="proof-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="proof-stat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
          >
            <span className="proof-num">{s.num}</span>
            <span className="proof-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

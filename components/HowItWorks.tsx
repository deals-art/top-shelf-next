'use client'
import { Fragment } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: '01',
    title: 'Tell Us About Your Property',
    body: "Fill out our quick form or send us an email. We'll gather the basic details — no obligation, no pressure.",
  },
  {
    num: '02',
    title: 'Receive a Cash Offer',
    body: "We analyze the property and send you a fair, no-nonsense cash offer — typically within 24 hours.",
  },
  {
    num: '03',
    title: 'Close On Your Schedule',
    body: "We close on your timeline — 10 days or 60 days. No repairs, no commissions, no surprises.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">The Process</p>
          <h2>Simple. Straightforward. Fast.</h2>
        </motion.div>

        <div className="steps">
          {steps.map((step, i) => (
            <Fragment key={step.num}>
              <motion.div
                className="step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
              >
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

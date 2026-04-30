'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const DealMap = dynamic(() => import('./DealMap'), {
  ssr: false,
  loading: () => <div id="deal-map" style={{ background: 'rgba(6,13,26,0.8)' }} />,
})

export default function Portfolio() {
  const [dealCount, setDealCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(counterRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || dealCount === 0) return
    const duration = 1800
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayCount(Math.floor(eased * dealCount))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplayCount(dealCount)
    }
    requestAnimationFrame(step)
  }, [isInView, dealCount])

  return (
    <section id="portfolio">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">Our Portfolio</p>
          <h2>Deals Closed Across Tampa Bay</h2>
        </motion.div>
      </div>

      <div className="map-wrapper">
        <div className="map-overlay-stat">
          <span ref={counterRef} className="map-stat-val">{displayCount || '—'}</span>
          <span className="map-stat-lbl">Closed Deals</span>
        </div>
        <DealMap onCountReady={setDealCount} />
      </div>
    </section>
  )
}

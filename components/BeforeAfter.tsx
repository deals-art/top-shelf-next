'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

// TODO: Replace with actual Dropbox direct image URL (dl=1) when provided
const IMAGE_URL = 'https://placehold.co/1200x600/0f1e38/5dd6db?text=Before+%E2%86%92+After'

export default function BeforeAfter() {
  return (
    <section id="before-after">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">Our Work</p>
          <h2>From Distressed to Delivered.</h2>
        </motion.div>

        <motion.div
          className="ba-image-wrap"
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          <Image
            src={IMAGE_URL}
            alt="Before and after renovation by Top Shelf Acquisitions"
            width={1200}
            height={600}
            style={{ width: '100%', height: 'auto' }}
            unoptimized
          />
          <div className="ba-label">Before → After</div>
        </motion.div>
      </div>
    </section>
  )
}

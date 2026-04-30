'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const ROOMS = [
  { name: 'Front', slug: 'front' },
  { name: 'Living Room', slug: 'living-room' },
  { name: 'Kitchen', slug: 'kitchen' },
  { name: 'Bathroom', slug: 'bathroom' },
  { name: 'Bedroom #1', slug: 'bedroom-1' },
  { name: 'Bedroom #2', slug: 'bedroom-2' },
  { name: 'Bedroom #3', slug: 'bedroom-3' },
  { name: 'Garage', slug: 'garage' },
  { name: 'Backyard', slug: 'backyard' },
]

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
          <p className="ba-subhead">79th Avenue North — a complete top-to-bottom transformation. Nine rooms, fully reimagined.</p>
        </motion.div>

        <div className="ba-rooms">
          {ROOMS.map((room, i) => (
            <RoomPair key={room.slug} name={room.name} slug={room.slug} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoomPair({ name, slug, index }: { name: string; slug: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const num = String(index + 1).padStart(2, '0')

  return (
    <div ref={ref} className="ba-pair">
      <motion.div
        className="ba-pair-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease }}
      >
        <span className="ba-pair-num">{num}</span>
        <h3 className="ba-pair-name">{name}</h3>
        <motion.div
          className="ba-pair-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        />
      </motion.div>

      <div className="ba-pair-grid">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <ParallaxCard label="Before" src={`/${slug}-before.jpg`} y={y} />
        </motion.div>

        <motion.div
          className="ba-arrow"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
        >
          →
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
        >
          <ParallaxCard label="After" src={`/${slug}-after.jpg`} y={y} highlight />
        </motion.div>
      </div>
    </div>
  )
}

function ParallaxCard({ label, src, y, highlight }: { label: string; src: string; y: any; highlight?: boolean }) {
  return (
    <motion.div
      className="ba-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.img
        src={src}
        alt={label}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ y }}
      />
      <div className="ba-card-vignette" />
      <span className={`ba-card-label ${highlight ? 'is-after' : ''}`}>{label}</span>
    </motion.div>
  )
}

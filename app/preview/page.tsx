'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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

export default function PreviewPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#060d1a', color: '#fff', padding: '80px 20px 140px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 80 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 14px',
            border: '1px solid rgba(93,214,219,0.4)',
            borderRadius: 99,
            color: '#5dd6db',
            fontSize: 11,
            letterSpacing: 2,
            marginBottom: 20,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>Featured Renovation</div>
          <h1 style={{ fontSize: 48, marginBottom: 8, fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: -0.5 }}>
            79th Avenue North
          </h1>
          <p style={{ color: '#a8b3c5', fontSize: 16, maxWidth: 600 }}>
            A complete top-to-bottom transformation. Nine rooms, fully reimagined.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 110 }}>
          {ROOMS.map((room, i) => (
            <RoomPair key={room.slug} name={room.name} slug={room.slug} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}

function RoomPair({ name, slug, index }: { name: string; slug: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yBefore = useTransform(scrollYProgress, [0, 1], [50, -50])
  const yAfter = useTransform(scrollYProgress, [0, 1], [50, -50])

  const num = String(index + 1).padStart(2, '0')

  return (
    <div ref={ref}>
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 14,
          color: '#5dd6db',
          letterSpacing: 3,
        }}>{num}</span>
        <h2 style={{
          fontSize: 34,
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          letterSpacing: -0.3,
          margin: 0,
        }}>{name}</h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(to right, rgba(93,214,219,0.6), transparent)',
            transformOrigin: 'left',
            minWidth: 100,
          }}
        />
      </motion.div>

      {/* Image grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 0,
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ParallaxCard label="Before" src={`/${slug}-before.jpg`} y={yBefore} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ padding: '0 18px', color: '#5dd6db', fontSize: 28 }}
        >
          →
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <ParallaxCard label="After" src={`/${slug}-after.jpg`} y={yAfter} highlight />
        </motion.div>
      </div>
    </div>
  )
}

function ParallaxCard({ label, src, y, highlight }: { label: string; src: string; y: any; highlight?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        aspectRatio: '4 / 3',
        background: '#0b1628',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        cursor: 'pointer',
      }}
    >
      <motion.img
        src={src}
        alt={label}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          y,
        }}
      />
      {/* Vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 40%)',
        pointerEvents: 'none',
      }} />
      <span style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: highlight ? 'rgba(93,214,219,0.92)' : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        color: highlight ? '#000' : '#fff',
        padding: '7px 16px',
        borderRadius: 99,
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: 600,
        textTransform: 'uppercase',
      }}>{label}</span>
    </motion.div>
  )
}

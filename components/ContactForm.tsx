'use client'
import { useState, useEffect, useRef, FormEvent } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const
const ACCESS_KEY = 'f9b966c7-4220-4d96-8590-41910ba3b6f2'
const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error'

type PlacesLib = {
  PlaceAutocompleteElement?: new (opts?: Record<string, unknown>) => HTMLElement
}

declare global {
  interface Window {
    google?: { maps?: { places?: PlacesLib } }
    __gmapsLoading?: Promise<void>
  }
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.maps?.places) return Promise.resolve()
  if (window.__gmapsLoading) return window.__gmapsLoading
  window.__gmapsLoading = new Promise((resolve, reject) => {
    if (!GOOGLE_KEY) {
      reject(new Error('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'))
      return
    }
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places&v=weekly`
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(s)
  })
  return window.__gmapsLoading
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [address, setAddress] = useState('')
  const [autocompleteReady, setAutocompleteReady] = useState(false)
  const placeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let element: HTMLElement | null = null

    async function init() {
      try {
        await loadGoogleMaps()
        if (cancelled || !placeContainerRef.current) return
        const places = window.google?.maps?.places
        if (!places?.PlaceAutocompleteElement) return

        const el = new places.PlaceAutocompleteElement({
          includedRegionCodes: ['us'],
        })
        el.id = 'place-autocomplete'
        ;(el as HTMLElement & { className: string }).className = 'place-autocomplete'

        el.addEventListener('gmp-select', async (ev: Event) => {
          const detail = (ev as Event & { placePrediction?: { toPlace: () => { fetchFields: (o: { fields: string[] }) => Promise<void>; formattedAddress?: string } } }).placePrediction
          if (!detail) return
          const place = detail.toPlace()
          await place.fetchFields({ fields: ['formattedAddress'] })
          setAddress(place.formattedAddress || '')
        })

        placeContainerRef.current.innerHTML = ''
        placeContainerRef.current.appendChild(el)
        element = el
        setAutocompleteReady(true)
      } catch (err) {
        console.warn('Address autocomplete unavailable:', err)
      }
    }

    init()
    return () => {
      cancelled = true
      if (element && element.parentNode) element.parentNode.removeChild(element)
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('access_key', ACCESS_KEY)
    data.set('subject', `New Lead — ${data.get('name') || 'Top Shelf Website'}`)
    data.set('from_name', 'Top Shelf Acquisitions Website')
    const email = data.get('email')
    if (typeof email === 'string' && email) data.set('replyto', email)

    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('sent')
        form.reset()
        setAddress('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMsg(json.message || 'Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again or email us directly.')
    }
  }

  const submitted = status === 'sent'
  const sending = status === 'sending'

  return (
    <section id="contact">
      <div className="container contact-grid">
        <motion.div
          className="contact-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-eyebrow">Get In Touch</p>
          <h2>Ready to Sell?<br />Let&apos;s Talk.</h2>
          <p>We buy properties in any condition, any situation. No repairs. No agents. No fees. Just a fair cash offer and a smooth closing.</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@topshelfacquisitions.com">info@topshelfacquisitions.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Tampa Bay, Florida</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.12, ease }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="(813) 555-0100" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Property Address</label>
            <div ref={placeContainerRef} className="place-autocomplete-wrap" aria-label="Property address autocomplete" />
            {!autocompleteReady && (
              <input
                type="text"
                id="address"
                name="address-fallback"
                placeholder="123 Main St, Tampa, FL"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
            <input type="hidden" name="address" value={address} readOnly />
            {address && autocompleteReady && (
              <p className="address-confirmed">✓ {address}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="type">Property Type</label>
            <select id="type" name="type">
              <option value="">Select one...</option>
              <option value="sfr">Single Family Home</option>
              <option value="land">Vacant Land</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Tell Us More (Optional)</label>
            <textarea id="message" name="message" rows={4} placeholder="Condition of the property, your situation, timeline..." />
          </div>
          <button
            type="submit"
            className="btn-primary full-width"
            disabled={submitted || sending}
            style={submitted ? { background: 'linear-gradient(90deg,#2a7a5a,#1d6b4c)', opacity: 1 } : {}}
          >
            {submitted
              ? "✓ We'll be in touch soon!"
              : sending
                ? 'Sending…'
                : 'Submit & Get My Offer'}
          </button>
          {status === 'error' && (
            <p className="form-error" role="alert">{errorMsg}</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

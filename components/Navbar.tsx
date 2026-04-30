'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMobileOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#" className="logo" aria-label="Top Shelf Acquisitions">
          <img src="/logo-script.png" alt="Top Shelf Acquisitions" className="logo-img" />
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#what-we-buy">What We Buy</a></li>
          <li><a href="#portfolio">Track Record</a></li>
          <li><a href="#contact" className="nav-cta">Get An Offer</a></li>
        </ul>
        <button className="hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#about" onClick={close}>About</a>
        <a href="#what-we-buy" onClick={close}>What We Buy</a>
        <a href="#portfolio" onClick={close}>Track Record</a>
        <a href="#contact" onClick={close}>Get An Offer</a>
      </div>
    </nav>
  )
}

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
          <svg className="logo-icon" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0" y="0" width="22" height="3.5" rx="1.75" fill="#5DD6DB"/>
            <rect x="0" y="7.25" width="16" height="3.5" rx="1.75" fill="#5DD6DB" fillOpacity="0.7"/>
            <rect x="0" y="14.5" width="10" height="3.5" rx="1.75" fill="#5DD6DB" fillOpacity="0.45"/>
          </svg>
          <span className="logo-wordmark">
            <span className="logo-name">Top Shelf</span>
            <span className="logo-sub">Acquisitions</span>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#what-we-buy">What We Buy</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact" className="nav-cta">Get An Offer</a></li>
        </ul>
        <button className="hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#about" onClick={close}>About</a>
        <a href="#what-we-buy" onClick={close}>What We Buy</a>
        <a href="#portfolio" onClick={close}>Portfolio</a>
        <a href="#contact" onClick={close}>Get An Offer</a>
      </div>
    </nav>
  )
}

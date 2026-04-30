'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { deals, TOTAL_DEALS } from '@/data/deals'

export default function DealMap({ onCountReady }: { onCountReady: (n: number) => void }) {
  const mapRef = useRef<LeafletMap | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet')

    const map = L.map(containerRef.current, {
      center: [27.85, -82.65],
      zoom: 10,
      zoomControl: false,
      preferCanvas: false,
    })
    mapRef.current = map

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    const makePinIcon = (delay: number) =>
      L.divIcon({
        className: '',
        html: `<div class="map-pin" style="animation-delay:${delay}ms">
          <svg width="28" height="38" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.716 0 0 6.716 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.716 23.284 0 15 0Z" fill="#5DD6DB"/>
            <circle cx="15" cy="15" r="7" fill="#0B1628"/>
            <circle cx="15" cy="15" r="3.5" fill="#5DD6DB"/>
          </svg>
        </div>`,
        iconSize: [28, 38],
        iconAnchor: [14, 38],
        popupAnchor: [0, -42],
      })

    deals.forEach((deal, i) => {
      if (!deal.lat || !deal.lng) return
      const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(deal.address)}&output=embed`
      const marker = L.marker([deal.lat, deal.lng], { icon: makePinIcon(i * 8), riseOnHover: true })
      marker.bindPopup(
        `<div class="deal-popup">
          <div class="popup-street-view">
            <iframe src="${mapsUrl}" width="100%" height="150" style="border:0;border-radius:8px 8px 0 0;display:block;" loading="lazy" allowfullscreen></iframe>
          </div>
          <div class="popup-body">
            <div class="popup-address">${deal.address}</div>
            ${deal.date ? `<div class="popup-date">Closed ${deal.date}</div>` : ''}
          </div>
        </div>`,
        { maxWidth: 300, minWidth: 280, className: 'custom-popup' }
      )
      marker.addTo(map)
    })

    onCountReady(TOTAL_DEALS)

    const portfolioSection = document.getElementById('portfolio')
    if (!portfolioSection) return
    let animated = false
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true
        document.querySelectorAll<HTMLElement>('.map-pin').forEach(el => {
          el.style.animationPlayState = 'running'
        })
      }
    }, { threshold: 0.15 })
    observer.observe(portfolioSection)
    return () => observer.disconnect()
  }, [onCountReady])

  return <div ref={containerRef} id="deal-map" />
}

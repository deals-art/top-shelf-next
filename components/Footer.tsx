import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Image src="/logo.png" alt="Top Shelf Acquisitions" className="footer-logo-img" width={160} height={64} unoptimized />
        <p className="footer-tagline">Tampa Bay Real Estate Investments</p>
        <p className="footer-copy">&copy; 2026 Top Shelf Acquisitions. All rights reserved.</p>
      </div>
    </footer>
  )
}

import Socials from './Socials'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/logo-script.png" alt="Top Shelf Acquisitions" className="footer-logo-img" />
        </div>
        <p className="footer-tagline">Tampa Bay Real Estate Investments</p>
        <Socials variant="icons" />
        <div className="footer-contact">
          <span>921 N Central Ave #4111, Tampa, FL 33602</span>
          <span aria-hidden="true">·</span>
          <a href="tel:+12399107746">(239) 910-7746</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:info@topshelfacquisitions.com">info@topshelfacquisitions.com</a>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms">Terms</a>
        </div>
        <p className="footer-copy">&copy; 2026 Top Shelf Acquisitions. All rights reserved.</p>
      </div>
    </footer>
  )
}

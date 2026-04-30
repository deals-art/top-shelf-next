export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          <svg width="28" height="23" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0" y="0" width="22" height="3.5" rx="1.75" fill="#5DD6DB"/>
            <rect x="0" y="7.25" width="16" height="3.5" rx="1.75" fill="#5DD6DB" fillOpacity="0.7"/>
            <rect x="0" y="14.5" width="10" height="3.5" rx="1.75" fill="#5DD6DB" fillOpacity="0.45"/>
          </svg>
          <span className="footer-logo-name">Top Shelf</span>
        </div>
        <p className="footer-tagline">Tampa Bay Real Estate Investments</p>
        <p className="footer-copy">&copy; 2026 Top Shelf Acquisitions. All rights reserved.</p>
      </div>
    </footer>
  )
}

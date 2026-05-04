type Variant = 'pills' | 'icons'

const links = [
  {
    name: 'Instagram',
    handle: '@seanthecloserr',
    href: 'https://www.instagram.com/seanthecloserr/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Sean Castro',
    href: 'https://www.facebook.com/sean.castro.3386',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
]

export default function Socials({ variant = 'pills' }: { variant?: Variant }) {
  if (variant === 'icons') {
    return (
      <ul className="socials-icons">
        {links.map((l) => (
          <li key={l.name}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${l.name} — ${l.handle}`}
              className="socials-icon-link"
            >
              {l.icon}
            </a>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className="socials-pills">
      {links.map((l) => (
        <li key={l.name}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="socials-pill"
          >
            <span className="socials-pill-icon">{l.icon}</span>
            <span className="socials-pill-text">
              <span className="socials-pill-name">{l.name}</span>
              <span className="socials-pill-handle">{l.handle}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

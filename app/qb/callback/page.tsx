'use client'

import { useEffect, useState } from 'react'

export default function QbCallbackPage() {
  const [status, setStatus] = useState<'redirecting' | 'failed'>('redirecting')

  useEffect(() => {
    const search = window.location.search
    const target = `http://localhost:5001/qb/callback${search}`
    const timer = setTimeout(() => setStatus('failed'), 3500)
    window.location.replace(target)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: 520, textAlign: 'center', color: 'var(--text-primary)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.5px',
            marginBottom: 16,
          }}
        >
          {status === 'redirecting' ? 'Returning you to TSA Bookkeeper…' : 'Local app not detected'}
        </h1>

        {status === 'redirecting' ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6 }}>
            Sending you back to the bookkeeper running on your computer.
          </p>
        ) : (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
              We couldn&rsquo;t reach the local TSA Bookkeeper at{' '}
              <code style={{ color: 'var(--teal)' }}>localhost:5001</code>. Make sure the app is
              running, then click the button below to retry.
            </p>
            <a
              href={`http://localhost:5001/qb/callback${
                typeof window !== 'undefined' ? window.location.search : ''
              }`}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, var(--teal), #3db8bd)',
                color: 'var(--bg-deep)',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: 8,
                fontSize: 14,
                letterSpacing: '0.3px',
              }}
            >
              Continue to local app
            </a>
          </>
        )}
      </div>
    </main>
  )
}

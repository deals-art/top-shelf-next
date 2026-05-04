import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'End User License Agreement',
  description: 'TSA Bookkeeper End User License Agreement.',
  robots: { index: false, follow: false },
}

export default function EulaPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '80px 20px 120px', background: 'var(--bg-deep)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', color: 'var(--text-primary)' }}>
        <a
          href="/"
          style={{
            color: 'var(--teal)',
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          ← Back to home
        </a>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 5vw, 48px)',
            margin: '32px 0 8px',
            letterSpacing: '-0.5px',
          }}
        >
          End User License Agreement
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 40 }}>
          TSA Bookkeeper · Last updated: May 3, 2026
        </p>

        <Section heading="1. License Grant">
          TSA Bookkeeper (&ldquo;the Software&rdquo;) is a proprietary application developed by Top Shelf
          Acquisitions LLC for internal, single-user use. The Software is licensed, not sold. Use is
          restricted to the operator of Top Shelf Acquisitions LLC.
        </Section>

        <Section heading="2. Restrictions">
          The Software may not be redistributed, sublicensed, sold, or used by any party other than
          the licensee. Reverse engineering, decompilation, or disassembly is prohibited.
        </Section>

        <Section heading="3. No Warranty">
          The Software is provided &ldquo;AS IS&rdquo; without warranty of any kind, express or implied,
          including but not limited to warranties of merchantability or fitness for a particular
          purpose.
        </Section>

        <Section heading="4. Limitation of Liability">
          In no event shall Top Shelf Acquisitions LLC be liable for any damages arising out of the
          use or inability to use the Software, including but not limited to data loss, business
          interruption, or financial loss.
        </Section>

        <Section heading="5. Termination">
          This license terminates automatically if the licensee fails to comply with any of its
          terms.
        </Section>

        <Section heading="6. Governing Law">
          This agreement is governed by the laws of the State of Florida, USA.
        </Section>

        <Section heading="Contact">
          <a href="mailto:deals@topshelfacquisitions.com" style={{ color: 'var(--teal)' }}>
            deals@topshelfacquisitions.com
          </a>
        </Section>
      </div>
    </main>
  )
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'var(--teal)',
          marginBottom: 10,
        }}
      >
        {heading}
      </h2>
      <p style={{ color: 'var(--text-primary)', fontSize: 16, lineHeight: 1.7 }}>{children}</p>
    </section>
  )
}

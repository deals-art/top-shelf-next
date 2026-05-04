import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TSA Bookkeeper Privacy Policy.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 40 }}>
          TSA Bookkeeper · Last updated: May 3, 2026
        </p>

        <Section heading="Overview">
          TSA Bookkeeper is a private, single-user, locally-installed application used internally by
          Top Shelf Acquisitions LLC for bookkeeping operations. This policy describes how data is
          handled.
        </Section>

        <Section heading="Data Collected">
          The application reads transaction data from the user&rsquo;s QuickBooks Online account,
          including transaction dates, amounts, payees, memos, and category assignments. It does not
          collect personal data beyond what is already present in the user&rsquo;s own QuickBooks
          records.
        </Section>

        <Section heading="Data Storage">
          All data is stored locally on the user&rsquo;s macOS computer in a SQLite database. No
          data is transmitted to or stored on any external server operated by Top Shelf Acquisitions
          LLC.
        </Section>

        <Section heading="Third-Party Services">
          The application sends transaction details (date, amount, payee, memo, category list) to
          Anthropic, PBC for the purpose of AI-assisted categorization. Anthropic does not use API
          request data to train models. See Anthropic&rsquo;s privacy policy for details.
          <br />
          <br />
          The application sends and receives transaction data to and from Intuit Inc.&rsquo;s
          QuickBooks Online API, governed by Intuit&rsquo;s privacy policy.
        </Section>

        <Section heading="User Rights">
          The application is operated by and for a single user (the developer/owner). The user has
          full control over their data and may delete the local database file at any time.
        </Section>

        <Section heading="Contact">
          For questions regarding this policy, contact{' '}
          <a href="mailto:deals@topshelfacquisitions.com" style={{ color: 'var(--teal)' }}>
            deals@topshelfacquisitions.com
          </a>
          .
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

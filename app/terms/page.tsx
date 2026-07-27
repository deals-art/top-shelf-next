import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Top Shelf Acquisitions LLC, including SMS/text messaging terms.',
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 40 }}>
          Top Shelf Acquisitions LLC · Last updated: June 29, 2026
        </p>

        <Section heading="Acceptance of Terms">
          By accessing topshelfacquisitions.com or submitting information through our contact form, you
          agree to these Terms of Service. If you do not agree, please do not use the website.
        </Section>

        <Section heading="Our Service">
          Top Shelf Acquisitions LLC is a real estate investment company that makes cash offers to purchase
          residential properties and vacant land in the Tampa Bay, Florida area. Information on this website
          is provided for general informational purposes and does not constitute a binding offer to purchase
          any property. Any offer is subject to a separate written agreement.
        </Section>

        <Section heading="SMS / Text Messaging Terms">
          By providing your phone number through the chat widget on this website and giving your consent
          there, you agree to receive text messages and phone calls from Top Shelf Acquisitions LLC
          regarding your property inquiry and our services. The chat widget is the only place on this
          website where we collect phone numbers and SMS consent.
          <br />
          <br />
          <strong style={{ color: 'var(--text-primary)' }}>Message frequency varies.</strong> Message and
          data rates may apply. Consent to receive messages is not a condition of any purchase or service.
          <br />
          <br />
          To stop receiving text messages at any time, reply <strong style={{ color: 'var(--text-primary)' }}>STOP</strong>.
          For help, reply <strong style={{ color: 'var(--text-primary)' }}>HELP</strong> or contact us using
          the details below. Carriers are not liable for delayed or undelivered messages.
        </Section>

        <Section heading="Limitation of Liability">
          The website and its content are provided &ldquo;as is&rdquo; without warranties of any kind. Top
          Shelf Acquisitions LLC is not liable for any damages arising from your use of the website or
          reliance on its content.
        </Section>

        <Section heading="Contact">
          For questions regarding these terms, contact{' '}
          <a href="mailto:info@topshelfacquisitions.com" style={{ color: 'var(--teal)' }}>
            info@topshelfacquisitions.com
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

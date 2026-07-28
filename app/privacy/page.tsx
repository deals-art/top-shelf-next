import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Top Shelf Acquisitions LLC, including how we handle SMS/text messaging consent.',
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
          Top Shelf Acquisitions LLC · Last updated: June 29, 2026
        </p>

        <Section heading="Overview">
          This Privacy Policy explains how Top Shelf Acquisitions LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;) collects, uses, and protects information you provide through our website,
          topshelfacquisitions.com. By using our website or submitting information through our contact
          form, you agree to this policy.
        </Section>

        <Section heading="Information We Collect">
          When you submit our contact form, we collect the information you provide, which may include your
          name, email address, property address, property type, and any details you share about your
          situation. The contact form does not collect phone numbers.
          <br />
          <br />
          If you contact us by phone, text message, or another channel outside this website, we may also
          collect your phone number and the details you share with us. We collect all of this information
          only when you voluntarily provide it.
        </Section>

        <Section heading="How We Use Your Information">
          We use the information you provide to respond to your inquiry, prepare and discuss a potential
          offer on your property, and communicate with you about your request by phone, text message, or
          email. We do not sell your personal information.
        </Section>

        <Section heading="SMS / Text Messaging">
          If you provide your phone number and consent to receive text messages, we may send you SMS/text
          messages related to your property inquiry and our services. Message frequency varies. Message and
          data rates may apply. You can opt out at any time by replying STOP, and you can reply HELP for
          assistance.
          <br />
          <br />
          <strong style={{ color: 'var(--text-primary)' }}>
            No mobile information will be shared with any third parties for marketing or
            promotional purposes.
          </strong>{' '}
          All other categories of information described in this policy exclude text messaging originator
          opt-in data and consent; this information will not be shared with any third parties.
        </Section>

        <Section heading="Third-Party Services">
          Our website uses third-party services to operate. Contact form submissions are processed by
          Web3Forms. Our property address field uses the Google Maps Places service, governed by
          Google&rsquo;s privacy policy. We use GoHighLevel (LeadConnector) to manage communications with
          you. These providers process data on our behalf and are not authorized to use your information
          for their own marketing.
        </Section>

        <Section heading="Data Sharing">
          We do not sell, rent, or trade your personal information. We may share information only with the
          service providers described above for the purpose of operating our business, or when required by
          law. As stated above, SMS/text messaging opt-in data and consent are never shared with third
          parties.
        </Section>

        <Section heading="Your Choices">
          You may opt out of text messages at any time by replying STOP. You may request that we delete the
          information you have submitted, or ask any questions about your data, by contacting us using the
          details below.
        </Section>

        <Section heading="Contact">
          For questions regarding this policy, contact{' '}
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

import type { Metadata } from 'next'
import { Inter, Playfair_Display, Satisfy, Josefin_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800'],
  display: 'swap',
})

const script = Satisfy({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400'],
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-futura',
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.topshelfacquisitions.com'),
  title: {
    default: 'Top Shelf Acquisitions | Tampa Bay Real Estate Investments',
    template: '%s | Top Shelf Acquisitions',
  },
  description: 'Top Shelf Acquisitions buys single family homes and vacant land across the Tampa Bay area. Fast cash closings, fair offers, zero fees or commissions. 99+ deals closed.',
  keywords: [
    'Tampa Bay real estate',
    'sell house fast Tampa',
    'cash home buyers Florida',
    'we buy houses Tampa',
    'real estate investors Tampa Bay',
    'sell vacant land Florida',
    'distressed property buyers',
  ],
  authors: [{ name: 'Top Shelf Acquisitions' }],
  openGraph: {
    title: 'Top Shelf Acquisitions | Tampa Bay Real Estate Investments',
    description: 'We buy single family homes and vacant land across Tampa Bay. Fast cash closings, fair offers, no fees.',
    url: 'https://www.topshelfacquisitions.com',
    siteName: 'Top Shelf Acquisitions',
    images: [{ url: '/icon.png', width: 512, height: 512, alt: 'Top Shelf Acquisitions' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Top Shelf Acquisitions | Tampa Bay Real Estate Investments',
    description: 'We buy single family homes and vacant land across Tampa Bay. Fast cash closings, fair offers, no fees.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'LCWGMLyWg_Hgs7yVHg7RcHimz9OPZp4dQCAv8C2mqwE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${script.variable} ${josefin.variable}`}>
      <body>{children}</body>
    </html>
  )
}

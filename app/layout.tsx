import type { Metadata } from 'next'
import { Inter, Playfair_Display, Great_Vibes } from 'next/font/google'
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

const script = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Top Shelf Acquisitions | Tampa Bay Real Estate Investments',
  description: 'Top Shelf Acquisitions buys single family homes and vacant land across the Tampa Bay area. Fast closings, fair cash offers, no hassle.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'
import { getMetaData } from '@/lib/data'
import SchemaMarkup from '@/components/SchemaMarkup'
import SmoothScroll from '@/components/SmoothScroll'

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['serif'],
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const metaData = getMetaData()
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://barber-premium.ru'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metaData.siteName,
    template: `%s | ${metaData.siteName}`,
  },
  description: metaData.siteDescription,
  keywords: metaData.keywords.split(', '),
  authors: [{ name: metaData.siteName }],
  creator: metaData.siteName,
  publisher: metaData.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: metaData.siteName,
    title: metaData.siteName,
    description: metaData.siteDescription,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: metaData.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaData.siteName,
    description: metaData.siteDescription,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте здесь коды верификации при необходимости
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfairDisplay.variable} ${manrope.variable}`}>
      <body className={`${manrope.className} antialiased`}>
        <SmoothScroll />
        <SchemaMarkup />
        {children}
      </body>
    </html>
  )
}


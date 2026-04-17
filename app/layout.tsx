import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ASBL Loft | Luxury 3BHK in Hyderabad',
  description: 'Experience premium luxury living at ASBL Loft, a G+45 residential project in Financial District, Gachibowli. 1,695 sq. ft. 3BHKs starting from ₹1.94 Cr.',
  generator: 'v0.app',
  icons: {
    icon: [ 
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-lato antialiased bg-[#1A1A1A] text-[#FAF7F2]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

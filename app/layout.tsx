import type { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: 'MerpatiNews Aggregator - by aslich • KambingCoding',
  description: 'Portal berita modern berbasis GNews API',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Mynerve, DM_Sans } from 'next/font/google'
import './globals.css'

const mynerve = Mynerve({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mynerve',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'mypantry',
  description: 'Generate recipes from ingredients you already have at home.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${mynerve.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: 'var(--cream)', color: 'var(--charcoal)' }}>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}

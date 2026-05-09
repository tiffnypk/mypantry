'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/pantry', label: 'My Pantry' },
  { href: '/recipes', label: 'Generate' },
  { href: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-10 border-b"
      style={{ backgroundColor: 'var(--cream)', borderColor: 'var(--cream-border)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl tracking-tight"
          style={{ fontFamily: 'var(--font-mynerve), cursive', color: 'var(--charcoal)', fontWeight: 700 }}
        >
          PantryChef
        </Link>
        <nav className="flex gap-0.5">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  active
                    ? { backgroundColor: 'var(--sage)', color: '#fff' }
                    : { color: 'var(--warm-gray)' }
                }
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

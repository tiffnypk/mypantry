'use client'

import Link from 'next/link'
import { useFavorites } from '@/hooks/useFavorites'
import FavoritesList from '@/components/favorites/FavoritesList'

const cardStyle = {
  backgroundColor: 'rgba(255,252,248,0.92)',
  border: '1px solid var(--cream-border)',
  backdropFilter: 'blur(6px)',
}

export default function FavoritesPage() {
  const { favorites, remove } = useFavorites()

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-4 py-50"
      style={{
        backgroundColor: 'var(--rose)',
        justifyContent: favorites.length > 0 ? 'flex-start' : 'center',
      }}
    >
      <div
        className="relative z-10 w-full flex flex-col gap-5"
        style={{ maxWidth: favorites.length > 0 ? 900 : 512 }}
      >

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm tracking-widest transition-opacity hover:opacity-60 self-start"
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--cream)' }}
        >
          <svg width="13" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5H1M5 1L1 5L5 9" />
          </svg>
          Back
        </Link>

        {favorites.length === 0 ? (
          <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-4" style={cardStyle}>
            <h2
              className="text-lg font-semibold tracking-widest"
              style={{ color: 'var(--charcoal)' }}
            >
              favorites
            </h2>
            <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
              no saved recipes yet — heart a recipe to save it here.
            </p>
            <Link
              href="/"
              className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--sage)' }}
            >
              generate recipes
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl p-7" style={cardStyle}>
            <h2
              className="text-xl font-semibold tracking-widest mb-5"
              style={{ color: 'var(--charcoal)' }}
            >
              favorites 
              {/* ({favorites.length}) */}
            </h2>
            <FavoritesList favorites={favorites} onRemove={remove} />
          </div>
        )}

      </div>
    </div>
  )
}

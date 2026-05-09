'use client'

import Link from 'next/link'
import { usePantry } from '@/hooks/usePantry'
import IngredientInput from '@/components/pantry/IngredientInput'
import IngredientTag from '@/components/pantry/IngredientTag'

const cardStyle = {
  backgroundColor: 'rgba(255,252,248,0.92)',
  border: '1px solid var(--cream-border)',
  backdropFilter: 'blur(6px)',
}

export default function PantryPage() {
  const { ingredients, add, remove, clear } = usePantry()

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: 'var(--rose)' }}
    >
      <div className="relative z-10 w-full flex flex-col gap-5" style={{ maxWidth: 512 }}>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm tracking-widest uppercase transition-opacity hover:opacity-60 self-start"
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--cream)' }}
        >
          <svg width="13" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5H1M5 1L1 5L5 9" />
          </svg>
          Back
        </Link>

        {/* Add ingredient card */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <h2
            className="text-xl font-semibold tracking-widest mb-4 ml-1"
            style={{ color: 'var(--charcoal)' }}
          >
            my pantry
          </h2>
          <IngredientInput placeholder="e.g. garlic, olive oil, eggs…" onAdd={add} />
          <p className="text-xs mt-2 ml-2" style={{ color: 'var(--warm-gray)', opacity: 0.7 }}>
            press enter or comma to add multiple
          </p>
        </div>

        {/* Ingredient list card */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--warm-gray)' }}
            >
              saved ingredients ({ingredients.length})
            </h2>
            {ingredients.length > 0 && (
              <button
                onClick={clear}
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: 'var(--warm-gray)' }}
              >
                clear all
              </button>
            )}
          </div>

          {ingredients.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {ingredients.map(ing => (
                <IngredientTag key={ing} label={ing} variant="pantry" onRemove={() => remove(ing)} />
              ))}
            </div>
          ) : (
            <p className="text-sm italic" style={{ color: 'var(--warm-gray)', opacity: 0.6 }}>
              no ingredients yet — add some above.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Recipe } from '@/types'

interface Props {
  recipe: Recipe
  isFavorited: boolean
  onToggleFavorite: (recipe: Recipe) => void
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
        fill={filled ? 'var(--rose)' : 'none'}
        stroke={filled ? 'var(--rose)' : 'currentColor'}
        strokeWidth="1.5"
      />
    </svg>
  )
}

const PASTEL_CHIPS = [
  { bg: '#FDDDD9', color: '#8B3A32' },
  { bg: '#D6E8D2', color: '#3A6040' },
  { bg: '#D4E3EE', color: '#2B5068' },
  { bg: '#F5EDCC', color: '#6B5020' },
  { bg: '#E6DFF5', color: '#4A3870' },
]

function StepsDrawer({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(44,34,22,0.45)' }}
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 'min(520px, 94vw)',
          maxHeight: '85vh',
          backgroundColor: 'var(--cream-card)',
          border: '1px solid var(--cream-border)',
          borderRadius: 20,
          animation: 'popIn 0.18s ease-out',
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 px-7 py-4"
          style={{ borderBottom: '1px solid var(--cream-border)' }}
        >
          <h2
            className="text-xl leading-snug mt-2"
            style={{ fontFamily: 'var(--font-serif), cursive', fontWeight: 700, color: 'var(--charcoal)' }}
          >
            {recipe.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close steps"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-opacity hover:opacity-60"
            style={{ backgroundColor: 'var(--cream-border)', color: 'var(--charcoal)' }}
          >
            ×
          </button>
        </div>

        {/* Steps — scrollable */}
        <ol className="overflow-y-auto px-7 py-6 space-y-5 text-sm" style={{ color: 'var(--charcoal)' }}>
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{color: 'var(--charcoal)' }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  )
}

export default function RecipeCard({ recipe, isFavorited, onToggleFavorite }: Props) {
  const [stepsOpen, setStepsOpen] = useState(false)

  return (
    <>
      <div
        className="rounded-2xl p-5 flex flex-col gap-4 transition-shadow hover:shadow-md"
        style={{ backgroundColor: 'var(--cream-card)', border: '1px solid var(--cream-border)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg leading-snug"
            style={{ fontFamily: 'var(--font-serif), cursive', fontWeight: 700, color: 'var(--charcoal)' }}
          >
            {recipe.name}
          </h3>
          <button
            onClick={() => onToggleFavorite(recipe)}
            aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base transition-all hover:scale-110 active:scale-95"
            style={isFavorited ? { backgroundColor: 'var(--rose-light)', color: 'var(--rose)' } : { backgroundColor: 'var(--cream-border)', color: 'var(--warm-gray)' }}
          >
            <HeartIcon filled={isFavorited} />
          </button>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
          {recipe.description}
        </p>

        {/* Dark pill badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: 'var(--ink)' }}>
            ⏱ {recipe.cookTimeMinutes} min
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: 'var(--ink)' }}>
            {recipe.difficulty}
          </span>
          {recipe.dietaryTags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--sage-light)', color: 'var(--sage)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredient chips */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--warm-gray)' }}>
            from your pantry
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recipe.usedIngredients.map((ing, i) => {
              const chip = PASTEL_CHIPS[i % PASTEL_CHIPS.length]
              return (
                <span key={ing} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: chip.bg, color: chip.color }}>
                  {ing}
                </span>
              )
            })}
          </div>
        </div>

        {/* Show steps button */}
        <button
          onClick={() => setStepsOpen(true)}
          className="self-start text-xs font-semibold transition-colors"
          style={{ color: 'var(--sage)' }}
        >
         Show steps ▶
        </button>
      </div>

      {stepsOpen && <StepsDrawer recipe={recipe} onClose={() => setStepsOpen(false)} />}
    </>
  )
}

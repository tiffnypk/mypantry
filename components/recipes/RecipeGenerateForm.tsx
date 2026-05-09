'use client'

import { useState } from 'react'
import type { DietaryFilter } from '@/types'
import IngredientInput from '@/components/pantry/IngredientInput'
import IngredientTag from '@/components/pantry/IngredientTag'
import DietaryFilters from './DietaryFilters'

interface Props {
  pantryIngredients: string[]
  onRemovePantryIngredient?: (ingredient: string) => void
  onGenerate: (ingredients: string[], filters: DietaryFilter[]) => void
  isLoading: boolean
}

export default function RecipeGenerateForm({ pantryIngredients, onRemovePantryIngredient, onGenerate, isLoading }: Props) {
  const [todayIngredients, setTodayIngredients] = useState<string[]>([])
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([])

  function addToday(ingredient: string) {
    const normalized = ingredient.trim().toLowerCase()
    if (!normalized || todayIngredients.includes(normalized)) return
    setTodayIngredients(prev => [...prev, normalized])
  }

  function removeToday(ingredient: string) {
    setTodayIngredients(prev => prev.filter(i => i !== ingredient))
  }

  function handleGenerate() {
    const merged = Array.from(new Set([...pantryIngredients, ...todayIngredients]))
    if (merged.length === 0) return
    onGenerate(merged, dietaryFilters)
  }

  const allIngredients = Array.from(new Set([...pantryIngredients, ...todayIngredients]))
  const canGenerate = allIngredients.length > 0 && !isLoading

  return (
    <div
      className="rounded-2xl p-7 space-y-6"
      style={{ backgroundColor: 'var(--cream-card)', border: '1px solid var(--cream-border)' }}
    >
      {/* Pantry pre-load */}
      {pantryIngredients.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--warm-gray)' }}>
            From your pantry
          </p>
          <div className="flex flex-wrap gap-2">
            {pantryIngredients.map(ing => (
              <IngredientTag
                key={ing}
                label={ing}
                variant="pantry"
                onRemove={onRemovePantryIngredient ? () => onRemovePantryIngredient(ing) : () => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Today's extras */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--warm-gray)' }}>
          Add today&apos;s ingredients
        </p>
        <IngredientInput placeholder="e.g. chicken breast, lemon…" onAdd={addToday} />
        {todayIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {todayIngredients.map(ing => (
              <IngredientTag key={ing} label={ing} onRemove={() => removeToday(ing)} variant="session" />
            ))}
          </div>
        )}
      </div>

      {/* Dietary filters */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--warm-gray)' }}>
          Dietary filters
        </p>
        <DietaryFilters selected={dietaryFilters} onChange={setDietaryFilters} />
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="w-full py-3.5 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--sage)' }}
      >
        {isLoading
          ? 'Generating recipes…'
          : `Generate Recipes (${allIngredients.length} ingredient${allIngredients.length !== 1 ? 's' : ''})`}
      </button>

      {pantryIngredients.length === 0 && todayIngredients.length === 0 && (
        <p className="text-sm text-center" style={{ color: 'var(--warm-gray)' }}>
          add ingredients above or{' '}
          <a href="/pantry" className="underline" style={{ color: 'var(--sage)' }}>
            save some to your pantry
          </a>{' '}
          first.
        </p>
      )}
    </div>
  )
}

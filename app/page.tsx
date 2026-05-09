'use client'

import Link from 'next/link'
import { usePantry } from '@/hooks/usePantry'
import { useFavorites } from '@/hooks/useFavorites'
import { useRecipeGeneration } from '@/hooks/useRecipeGeneration'
import RecipeGenerateForm from '@/components/recipes/RecipeGenerateForm'
import RecipeGrid from '@/components/recipes/RecipeGrid'

const cardStyle = {
  backgroundColor: 'rgba(255,252,248,0.92)',
  border: '1px solid var(--cream-border)',
  backdropFilter: 'blur(6px)',
}

export default function HomePage() {
  const { ingredients: pantryIngredients, remove: removePantryIngredient } = usePantry()
  const { favoritedIds, toggle } = useFavorites()
  const { recipes, isLoading, error, generate } = useRecipeGeneration()

  const hasResults = isLoading || recipes.length > 0 || !!error

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-4 overflow-x-hidden"
      style={{
        backgroundColor: 'var(--rose)',
        paddingTop: hasResults ? '3rem' : undefined,
        paddingBottom: '3rem',
        justifyContent: hasResults ? 'flex-start' : 'center',
      }}
    >
      {/* Page content */}
      <div
        className="relative z-10 w-full flex flex-col gap-5"
        style={{ maxWidth: hasResults ? 900 : 512 }}
      >
        {/* Generate Recipes card */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <h2
            className="text-xl font-semibold tracking-widest mb-2 ml-2"
            style={{ color: 'var(--charcoal)' }}
          >
            time to cook!
          </h2>
          <RecipeGenerateForm
            pantryIngredients={pantryIngredients}
            onRemovePantryIngredient={removePantryIngredient}
            onGenerate={(ingredients, filters) => generate(ingredients, filters)}
            isLoading={isLoading}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="p-4 rounded-2xl text-sm"
            style={{ backgroundColor: 'var(--rose-light)', color: 'var(--rose)', border: '1px solid #E8B4AE' }}
          >
            {error}
          </div>
        )}

        {/* Recipe results */}
        {hasResults && (
          <div className="rounded-2xl p-7" style={cardStyle}>
            {recipes.length > 0 && (
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--warm-gray)' }}>
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} — heart any to save
              </p>
            )}
            <RecipeGrid
              recipes={recipes}
              isLoading={isLoading}
              favoritedIds={favoritedIds}
              onToggleFavorite={toggle}
            />
          </div>
        )}

        {/* Action cards */}
        <div
          className="grid grid-cols-2 gap-4 w-full"
          style={{ maxWidth: 512, alignSelf: 'center' }}
        >
          <Link
            href="/pantry"
            className="group rounded-2xl p-5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            style={cardStyle}
          >
            <span
              className="text-xl tracking-widest leading-tight"
              style={{ fontFamily: 'var(--font-mynerve), cursive', alignSelf: 'center', fontWeight: 600, color: 'var(--charcoal)' }}
            >
              my pantry
            </span>
            {/* <span className="text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>
              Manage your saved ingredients →
            </span> */}
          </Link>

          <Link
            href="/favorites"
            className="group rounded-2xl p-5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            style={cardStyle}
          >
            <span
              className="text-xl tracking-widest leading-tight"
              style={{ fontFamily: 'var(--font-mynerve), cursive', alignSelf: 'center', fontWeight: 600, color: 'var(--charcoal)' }}
            >
              favorites
            </span>
            {/* <span className="text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>
              Your hearted recipes →
            </span> */}
          </Link>
        </div>

      </div>
    </div>
  )
}

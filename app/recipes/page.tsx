'use client'

import { usePantry } from '@/hooks/usePantry'
import { useFavorites } from '@/hooks/useFavorites'
import { useRecipeGeneration } from '@/hooks/useRecipeGeneration'
import RecipeGenerateForm from '@/components/recipes/RecipeGenerateForm'
import RecipeGrid from '@/components/recipes/RecipeGrid'
import EmptyState from '@/components/ui/EmptyState'
import HomeLink from '@/components/layout/HomeLink'
import type { DietaryFilter } from '@/types'

export default function RecipesPage() {
  const { ingredients: pantryIngredients } = usePantry()
  const { favoritedIds, toggle } = useFavorites()
  const { recipes, isLoading, error, generate } = useRecipeGeneration()

  function handleGenerate(ingredients: string[], filters: DietaryFilter[]) {
    generate(ingredients, filters)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <HomeLink />

      <div className="mb-10">
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: 'var(--font-mynerve), cursive', fontWeight: 700, color: 'var(--charcoal)' }}
        >
          Generate Recipes
        </h1>
      </div>

      <div className="mb-8">
        <RecipeGenerateForm
          pantryIngredients={pantryIngredients}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </div>

      {error && (
        <div
          className="mb-6 p-4 rounded-2xl text-sm"
          style={{ backgroundColor: 'var(--rose-light)', color: 'var(--rose)', border: '1px solid #E8B4AE' }}
        >
          {error}
        </div>
      )}

      {!isLoading && recipes.length === 0 && !error && (
        <EmptyState
          icon="🍳"
          title="No recipes yet"
          description="Add your ingredients above and click Generate to get recipe suggestions from Claude."
        />
      )}

      {(isLoading || recipes.length > 0) && (
        <div>
          {recipes.length > 0 && (
            <p className="text-sm mb-5" style={{ color: 'var(--warm-gray)' }}>
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} generated — heart any to save to favorites.
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
    </div>
  )
}

import type { Recipe } from '@/types'
import RecipeCard from './RecipeCard'
import RecipeSkeleton from './RecipeSkeleton'

interface Props {
  recipes: Recipe[]
  isLoading: boolean
  favoritedIds: Set<string>
  onToggleFavorite: (recipe: Recipe) => void
}

export default function RecipeGrid({ recipes, isLoading, favoritedIds, onToggleFavorite }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecipeSkeleton />
        <RecipeSkeleton />
        <RecipeSkeleton />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorited={favoritedIds.has(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

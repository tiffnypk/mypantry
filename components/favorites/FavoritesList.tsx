import type { Recipe } from '@/types'
import RecipeCard from '@/components/recipes/RecipeCard'

interface Props {
  favorites: Recipe[]
  onRemove: (id: string) => void
}

export default function FavoritesList({ favorites, onRemove }: Props) {
  const favoritedIds = new Set(favorites.map(r => r.id))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {favorites.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorited={favoritedIds.has(recipe.id)}
          onToggleFavorite={r => onRemove(r.id)}
        />
      ))}
    </div>
  )
}

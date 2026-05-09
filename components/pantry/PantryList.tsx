import IngredientTag from './IngredientTag'

interface Props {
  ingredients: string[]
  onRemove: (ingredient: string) => void
  onClear: () => void
}

export default function PantryList({ ingredients, onRemove, onClear }: Props) {
  if (ingredients.length === 0) {
    return (
      <p className="text-sm italic py-4" style={{ color: 'var(--warm-gray)' }}>
        No pantry items yet. Add ingredients you always keep at home.
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {ingredients.map(ing => (
          <IngredientTag key={ing} label={ing} onRemove={() => onRemove(ing)} variant="pantry" />
        ))}
      </div>
      <button
        onClick={onClear}
        className="text-xs font-medium transition-colors"
        style={{ color: 'var(--warm-gray)' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--rose)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)')}
      >
        Clear all
      </button>
    </div>
  )
}

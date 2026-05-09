import type { DietaryFilter } from '@/types'

const ALL_FILTERS: DietaryFilter[] = ['vegan', 'vegetarian', 'gluten-free', 'low-carb', 'dairy-free']

interface Props {
  selected: DietaryFilter[]
  onChange: (filters: DietaryFilter[]) => void
}

export default function DietaryFilters({ selected, onChange }: Props) {
  function toggle(filter: DietaryFilter) {
    if (selected.includes(filter)) {
      onChange(selected.filter(f => f !== filter))
    } else {
      onChange([...selected, filter])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ALL_FILTERS.map(filter => {
        const active = selected.includes(filter)
        return (
          <button
            key={filter}
            onClick={() => toggle(filter)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              active
                ? { backgroundColor: 'var(--sage)', color: '#fff' }
                : { backgroundColor: 'var(--cream)', border: '1.5px solid var(--cream-border)', color: 'var(--warm-gray)' }
            }
            onMouseEnter={e => {
              if (!active) {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'var(--sage-light)'
                el.style.color = 'var(--sage)'
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'var(--cream)'
                el.style.color = 'var(--warm-gray)'
              }
            }}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}

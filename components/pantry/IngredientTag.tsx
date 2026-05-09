interface Props {
  label: string
  onRemove: () => void
  variant?: 'pantry' | 'session'
}

export default function IngredientTag({ label, onRemove, variant = 'session' }: Props) {
  const style =
    variant === 'pantry'
      ? { backgroundColor: 'var(--sage)', color: '#ffffff' }
      : { backgroundColor: 'var(--rose)', color: '#ffffff' }

  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
      style={style}
    >
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity leading-none text-base"
      >
        ×
      </button>
    </span>
  )
}

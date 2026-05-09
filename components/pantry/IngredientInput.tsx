'use client'

import { useState, type KeyboardEvent } from 'react'

interface Props {
  placeholder?: string
  onAdd: (ingredient: string) => void
}

export default function IngredientInput({ placeholder = 'Add ingredient…', onAdd }: Props) {
  const [value, setValue] = useState('')

  function commit() {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 px-4 py-2. rounded-full text-sm focus:outline-none transition-shadow"
        style={{
          backgroundColor: 'var(--cream)',
          border: '1.5px solid var(--cream-border)',
          color: 'var(--charcoal)',
        }}
        onFocus={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--sage)')}
        onBlur={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--cream-border)')}
      />
      <button
        onClick={commit}
        className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95"
        style={{ backgroundColor: 'var(--rose)' }}
      >
        Add
      </button>
    </div>
  )
}

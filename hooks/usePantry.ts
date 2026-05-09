'use client'

import { useState, useEffect, useCallback } from 'react'
import { getPantry, setPantry } from '@/lib/storage'

export function usePantry() {
  const [ingredients, setIngredients] = useState<string[]>([])

  useEffect(() => {
    setIngredients(getPantry())
  }, [])

  const add = useCallback((ingredient: string) => {
    const normalized = ingredient.trim().toLowerCase()
    if (!normalized) return
    setIngredients(prev => {
      if (prev.includes(normalized)) return prev
      const next = [...prev, normalized]
      setPantry(next)
      return next
    })
  }, [])

  const remove = useCallback((ingredient: string) => {
    setIngredients(prev => {
      const next = prev.filter(i => i !== ingredient)
      setPantry(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setIngredients([])
    setPantry([])
  }, [])

  return { ingredients, add, remove, clear }
}

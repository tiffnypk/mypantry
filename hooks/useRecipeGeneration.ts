'use client'

import { useState, useCallback } from 'react'
import type { Recipe, DietaryFilter } from '@/types'

interface GenerationState {
  recipes: Recipe[]
  isLoading: boolean
  error: string | null
}

export function useRecipeGeneration() {
  const [state, setState] = useState<GenerationState>({
    recipes: [],
    isLoading: false,
    error: null,
  })

  const generate = useCallback(async (ingredients: string[], dietaryFilters: DietaryFilter[]) => {
    setState({ recipes: [], isLoading: true, error: null })
    try {
      const res = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, dietaryFilters }),
      })
      const data = await res.json()
      if (!res.ok) {
        setState({ recipes: [], isLoading: false, error: data.error ?? 'Generation failed.' })
        return
      }
      setState({ recipes: data.recipes, isLoading: false, error: null })
    } catch {
      setState({ recipes: [], isLoading: false, error: 'Network error. Please try again.' })
    }
  }, [])

  return { ...state, generate }
}

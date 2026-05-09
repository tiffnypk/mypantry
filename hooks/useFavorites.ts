'use client'

import { useState, useEffect, useCallback } from 'react'
import { getFavorites, setFavorites } from '@/lib/storage'
import type { Recipe } from '@/types'

export function useFavorites() {
  const [favorites, setFavoritesState] = useState<Recipe[]>([])

  useEffect(() => {
    setFavoritesState(getFavorites())
  }, [])

  const favoritedIds = new Set(favorites.map(r => r.id))

  const add = useCallback((recipe: Recipe) => {
    setFavoritesState(prev => {
      if (prev.some(r => r.id === recipe.id)) return prev
      const next = [recipe, ...prev]
      setFavorites(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setFavoritesState(prev => {
      const next = prev.filter(r => r.id !== id)
      setFavorites(next)
      return next
    })
  }, [])

  const toggle = useCallback((recipe: Recipe) => {
    setFavoritesState(prev => {
      const exists = prev.some(r => r.id === recipe.id)
      const next = exists ? prev.filter(r => r.id !== recipe.id) : [recipe, ...prev]
      setFavorites(next)
      return next
    })
  }, [])

  return { favorites, favoritedIds, add, remove, toggle }
}

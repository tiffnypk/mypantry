import type { Recipe } from '@/types'

const PANTRY_KEY = 'pantrychef_pantry'
const FAVORITES_KEY = 'pantrychef_favorites'

function isClient() {
  return typeof window !== 'undefined'
}

export function getPantry(): string[] {
  if (!isClient()) return []
  try {
    return JSON.parse(localStorage.getItem(PANTRY_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function setPantry(ingredients: string[]): void {
  if (!isClient()) return
  localStorage.setItem(PANTRY_KEY, JSON.stringify(ingredients))
}

export function getFavorites(): Recipe[] {
  if (!isClient()) return []
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function setFavorites(recipes: Recipe[]): void {
  if (!isClient()) return
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(recipes))
}

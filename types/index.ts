export type DietaryFilter =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'low-carb'
  | 'dairy-free'

export interface Recipe {
  id: string
  name: string
  description: string
  usedIngredients: string[]
  steps: string[]
  cookTimeMinutes: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  dietaryTags: DietaryFilter[]
  generatedAt: string
}

export interface GenerateRequest {
  ingredients: string[]
  dietaryFilters: DietaryFilter[]
}

export interface GenerateResponse {
  recipes: Recipe[]
}

export interface GenerateErrorResponse {
  error: string
}

export interface GenerateParams {
  todayIngredients: string[]
  dietaryFilters: DietaryFilter[]
}

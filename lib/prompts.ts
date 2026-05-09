import type { DietaryFilter } from '@/types'

export const SYSTEM_PROMPT = `You are a creative home chef assistant. Suggest practical recipes using ONLY the ingredients the user lists — no exotic substitutions or extra ingredients they haven't mentioned (pantry basics like salt, pepper, oil, and water are always assumed available).

Respond with valid JSON only. No prose, no markdown, no code fences before or after the JSON.`

export function buildUserPrompt(ingredients: string[], filters: DietaryFilter[]): string {
  const ingredientList = ingredients.join(', ')
  const filterText = filters.length > 0 ? filters.join(', ') : 'none'

  return `I have these ingredients available: ${ingredientList}

Dietary requirements: ${filterText}

Suggest exactly 3 recipes I can make. For each recipe return:
- A creative but clear name
- A 1–2 sentence description
- Which of my listed ingredients it uses (usedIngredients array)
- Step-by-step instructions, 4–7 steps max (steps array)
- Estimated cook time in minutes (cookTimeMinutes, number)
- Difficulty level: Easy, Medium, or Hard
- Relevant dietary tags — only include tags from this list if the recipe truly qualifies: vegan, vegetarian, gluten-free, low-carb, dairy-free

Return ONLY a JSON array matching this exact structure (no id field, no generatedAt field):
[
  {
    "name": "string",
    "description": "string",
    "usedIngredients": ["string"],
    "steps": ["string"],
    "cookTimeMinutes": number,
    "difficulty": "Easy" | "Medium" | "Hard",
    "dietaryTags": ["string"]
  }
]`
}

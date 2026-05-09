import { z } from 'zod'
import anthropic from '@/lib/claude'
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts'
import type { Recipe } from '@/types'

const RequestSchema = z.object({
  ingredients: z.array(z.string().min(1)).min(1, 'At least one ingredient is required.'),
  dietaryFilters: z.array(
    z.enum(['vegan', 'vegetarian', 'gluten-free', 'low-carb', 'dairy-free'])
  ),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const { ingredients, dietaryFilters } = parsed.data

  let rawText: string
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(ingredients, dietaryFilters) }],
    })
    const block = message.content[0]
    rawText = block.type === 'text' ? block.text : ''
  } catch (err) {
    console.error('Claude API error:', err)
    return Response.json({ error: 'Failed to reach AI. Please try again.' }, { status: 502 })
  }

  // Strip markdown code fences if Claude wraps the JSON despite instructions
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  let parsed_recipes: unknown[]
  try {
    parsed_recipes = JSON.parse(cleaned)
    if (!Array.isArray(parsed_recipes)) throw new Error('Not an array')
  } catch {
    console.error('Failed to parse Claude response:', rawText)
    return Response.json({ error: 'Failed to parse recipe data. Please try again.' }, { status: 500 })
  }

  const now = new Date().toISOString()
  const recipes: Recipe[] = parsed_recipes.map((r: unknown) => {
    const recipe = r as Omit<Recipe, 'id' | 'generatedAt'>
    return {
      ...recipe,
      id: crypto.randomUUID(),
      generatedAt: now,
    }
  })

  return Response.json({ recipes })
}

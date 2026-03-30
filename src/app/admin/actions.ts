'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function runMonthlyDraw() {
  const supabase = await createClient()
  
  // 1. Generate 5 unique random numbers between 1 and 45
  const numbers = new Set<number>()
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1)
  }
  const winningNumbers = Array.from(numbers).sort((a, b) => a - b)

  // 2. Create a draw name (e.g., "Draw for March 2026")
  const drawMonth = `Draw for ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`

  // 3. Save to database
  const { error } = await supabase.from('draws').insert({
    draw_month: drawMonth,
    winning_numbers: winningNumbers,
    is_published: true
  })

  if (error) return { error: error.message }
  
  revalidatePath('/admin')
  return { success: true, winningNumbers }
}
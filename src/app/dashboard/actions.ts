'use server' // This runs ONLY on the server
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitScore(scoreValue: number) {
  const supabase = await createClient()
  
  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  // 2. Get existing scores for this user, ordered by date
  const { data: existingScores } = await supabase
    .from('scores')
    .select('id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  // 3. Logic: If user already has 5 scores, delete the oldest one (index 0)
  if (existingScores && existingScores.length >= 5) {
    const oldestScoreId = existingScores[0].id
    await supabase.from('scores').delete().eq('id', oldestScoreId)
  }

  // 4. Insert the new score
  const { error } = await supabase.from('scores').insert({
    user_id: user.id,
    score: scoreValue,
  })

  if (error) return { error: error.message }

  // 5. Refresh the page data automatically
  revalidatePath('/dashboard')
  return { success: true }
}


export async function upgradeSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from('profiles')
    .update({ is_subscribed: true })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function selectCharity(charityId: string, percentage: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from('profiles')
    .update({ 
      charity_id: charityId,
      charity_percentage: percentage
    })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}
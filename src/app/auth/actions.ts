'use client' // We use 'use client' for the form handling, but the logic stays secure
import { createClient } from '@/utils/supabase/client'

export async function signup(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, // This maps to the trigger we just wrote
      },
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error: error.message }
  }

  return { success: true }
}
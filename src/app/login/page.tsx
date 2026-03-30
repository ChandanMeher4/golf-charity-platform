'use client'
import { useState, useTransition } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const action = isSignUp ? signup : login
      const result = await action(formData)
      
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? 'Join the Club' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isSignUp ? 'Sign up to track scores and win.' : 'Sign in to access your dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                required={isSignUp}
                className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
                placeholder="John Doe"
                disabled={isPending}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="golfer@example.com"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              disabled={isPending}
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 transition-colors"
          >
            {isPending ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
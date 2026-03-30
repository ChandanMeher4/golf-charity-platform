'use client'
import { useState, useTransition } from 'react'
import { submitScore } from '@/app/dashboard/actions'

export default function ScoreForm() {
  const [score, setScore] = useState('')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const numScore = parseInt(score)

    if (numScore < 1 || numScore > 45) {
      setMessage({ text: 'Score must be between 1 and 45', type: 'error' })
      return
    }

    startTransition(async () => {
      const result = await submitScore(numScore)
      if (result?.error) {
        setMessage({ text: result.error, type: 'error' })
      } else {
        setMessage({ text: 'Score logged successfully!', type: 'success' })
        setScore('') // Clear input
        setTimeout(() => setMessage({ text: '', type: '' }), 3000) // Clear message after 3s
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
          Stableford Score
        </label>
        <input
          id="score"
          type="number"
          min="1"
          max="45"
          required
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="e.g., 36"
          disabled={isPending}
        />
      </div>
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 transition-colors shadow-sm flex justify-center items-center"
      >
        {isPending ? (
          <span className="animate-pulse">Logging Score...</span>
        ) : (
          'Submit Score'
        )}
      </button>

      {message.text && (
        <p className={`text-sm text-center font-medium ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
'use client'
import { useTransition, useState } from 'react'
import { runMonthlyDraw } from '@/app/admin/actions'

export default function AdminDrawControl() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const handleDraw = () => {
    if (!confirm('Are you sure you want to execute a new draw? This will generate permanent winning numbers.')) return

    startTransition(async () => {
      const result = await runMonthlyDraw()
      if (result?.error) {
        setMessage('Error: ' + result.error)
      } else {
        setMessage('Draw executed successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Draw Engine</h2>
      <p className="text-sm text-gray-500 mb-6">
        Execute the monthly draw. This will generate 5 unique random numbers between 1 and 45.
      </p>

      <button
        onClick={handleDraw}
        disabled={isPending}
        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70 transition-colors shadow-sm flex justify-center items-center"
      >
        {isPending ? 'Generating Numbers...' : 'Run New Draw'}
      </button>

      {message && (
        <p className={`mt-4 text-sm font-medium text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
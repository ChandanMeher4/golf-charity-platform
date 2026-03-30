'use client'
import { useState, useTransition } from 'react'
import { upgradeSubscription, selectCharity } from '@/app/dashboard/actions'

export default function SubscriptionManager({ 
  profile, 
  charities 
}: { 
  profile: any, 
  charities: any[] 
}) {
  const [isPending, startTransition] = useTransition()
  const [selectedCharity, setSelectedCharity] = useState(profile?.charity_id || '')
  const [percentage, setPercentage] = useState(profile?.charity_percentage || 10)

  const handleSubscribe = () => {
    startTransition(async () => {
      await upgradeSubscription()
    })
  }

  const handleSaveCharity = () => {
    if (!selectedCharity) return
    startTransition(async () => {
      await selectCharity(selectedCharity, percentage)
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 md:col-span-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left Side: Subscription Status */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Subscription & Impact</h2>
          {profile?.is_subscribed ? (
             <p className="text-sm text-gray-500">
               Your <span className="font-semibold text-green-600">Pro Plan</span> is active. You are eligible for the monthly draws!
             </p>
          ) : (
             <div className="space-y-3">
               <p className="text-sm text-gray-500">
                 Subscribe to enter the monthly prize draws and support a great cause.
               </p>
               <button 
                 onClick={handleSubscribe}
                 disabled={isPending}
                 className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
               >
                 {isPending ? 'Processing...' : 'Upgrade to Pro ($10/mo)'}
               </button>
             </div>
          )}
        </div>

        {/* Right Side: Charity Selection (Only show if subscribed) */}
        {profile?.is_subscribed && (
          <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Charity</label>
            <div className="flex gap-2 mb-3">
              <select 
                title='subscribe'
                value={selectedCharity}
                onChange={(e) => setSelectedCharity(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option value="" disabled>Choose a cause...</option>
                {charities?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              
              <select 
                title='percent'
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-24 p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={50}>50%</option>
              </select>
            </div>
            
            <button 
              onClick={handleSaveCharity}
              disabled={isPending || !selectedCharity}
              className="w-full bg-white border border-gray-300 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {isPending ? 'Saving...' : 'Update Impact Settings'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
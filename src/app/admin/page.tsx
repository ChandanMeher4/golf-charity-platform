import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminDrawControl from '@/components/AdminDrawControl'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // 1. Verify Authentication (In a real app, you'd check if user.role === 'admin')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch System Stats
  const { data: profiles } = await supabase.from('profiles').select('*')
  const totalUsers = profiles?.length || 0
  const subscribedUsers = profiles?.filter(p => p.is_subscribed).length || 0

  // 3. Fetch past draws
  const { data: draws } = await supabase
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 mt-10">
      <header className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">System Admin</h1>
        <p className="text-gray-500 mt-1">Manage platform settings, users, and monthly draws.</p>
      </header>

      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Registered Users</h3>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Subscribers</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">{subscribedUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Draws Executed</h3>
          <p className="text-3xl font-bold mt-2">{draws?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Draw Control */}
        <div className="lg:col-span-1">
          <AdminDrawControl />
        </div>

        {/* Right Column: Draw History */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Draw History</h2>
          {draws && draws.length > 0 ? (
            <div className="space-y-4">
              {draws.map((draw) => (
                <div key={draw.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-semibold">{draw.draw_month}</p>
                    <p className="text-xs text-gray-500">{new Date(draw.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    {draw.winning_numbers.map((num: number, i: number) => (
                      <span key={i} className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold shadow-sm">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm py-8 text-center border border-dashed rounded-lg">No draws have been executed yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
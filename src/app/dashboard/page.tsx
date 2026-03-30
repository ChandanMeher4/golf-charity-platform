import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ScoreForm from "@/components/ScoreForm";
import SubscriptionManager from "@/components/SubscriptionManager";

export default async function Dashboard() {
  const supabase = await createClient();

  // 1. Verify User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login"); 
  }

  // 2. Fetch Profile Data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, charities(name)")
    .eq("id", user.id)
    .single();

  // 3. Fetch Recent Scores (Descending order)
  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: charities } = await supabase.from("charities").select("*");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 mt-10">
      <header className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Player Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {profile?.full_name || "Golfer"}
          </p>
        </div>
        <div
          className={`text-sm border px-4 py-2 rounded-full font-medium ${profile?.is_subscribed ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-600"}`}
        >
          {profile?.is_subscribed
            ? "✅ Active Subscription"
            : "Free Tier - Upgrade to Win"}
        </div>
      </header>

      <SubscriptionManager profile={profile} charities={charities || []} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Score Entry */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Log a New Score</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your Stableford score (1-45). We automatically maintain your
            latest 5 scores for the monthly draw.
          </p>
          <ScoreForm />
        </div>

        {/* Right Column: Rolling Score History */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Your Active Scores ({scores?.length || 0}/5)
          </h2>
          {scores && scores.length > 0 ? (
            <ul className="space-y-3">
              {scores.map((s, index) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-mono text-sm">
                      #{index + 1}
                    </span>
                    <span className="font-semibold text-lg">{s.score} pts</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(s.played_date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-sm text-gray-500">
                No scores entered yet. Hit the course!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

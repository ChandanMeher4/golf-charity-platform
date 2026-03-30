import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-gray-100">
        <div className="font-bold text-2xl tracking-tighter">
          IMPACT<span className="text-gray-400">GOLF</span>
        </div>
        <Link 
          href="/login" 
          className="text-sm font-semibold bg-gray-100 px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          Sign In / Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        
        {/* Subtle motion-enhanced badge */}
        <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Next Draw: End of Month
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl">
          Play with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">Purpose.</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
          The first subscription platform that turns your rolling Stableford scores into charitable impact and monthly cash prizes.
        </p>

        {/* Persuasive CTA */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/login" 
            className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center justify-center"
          >
            Join the Club
          </Link>
          <Link 
            href="#how-it-works" 
            className="bg-white text-black border border-gray-200 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            How it Works
          </Link>
        </div>
      </main>

      {/* Value Proposition / Mechanics */}
      <section id="how-it-works" className="bg-gray-50 py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Log Your Scores</h3>
              <p className="text-gray-500 leading-relaxed">
                Enter your latest Stableford scores (1-45). Our system automatically maintains your rolling top 5 for the draw algorithm.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">The Monthly Draw</h3>
              <p className="text-gray-500 leading-relaxed">
                Match 3, 4, or 5 numbers in our monthly draw. Match all 5 to take home the rolling jackpot.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Drive Impact</h3>
              <p className="text-gray-500 leading-relaxed">
                A guaranteed minimum of 10% of your subscription goes directly to the charity of your choice.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
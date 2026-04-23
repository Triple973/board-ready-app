import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const DIMS = [
  { icon: "⚖️", name: "Governance & Fiduciary Responsibility", desc: "Fiduciary duties, board structure, SEC requirements, director independence" },
  { icon: "📊", name: "Financial Oversight & Audit", desc: "Financial statement literacy, audit committee, GAAP/IFRS, capital allocation" },
  { icon: "♟️", name: "Strategy, Risk & Performance", desc: "Enterprise strategy, risk management, CEO succession, shareholder activism" },
  { icon: "👥", name: "Human Capital & ESG", desc: "Workforce strategy, executive comp, ESG reporting, future of work" },
  { icon: "🤝", name: "Board Dynamics & Executive Readiness", desc: "Boardroom influence, personal brand, search firm relationships, D&O readiness" },
];

const FEATURES = [
  { icon: "🎯", title: "20-Question Assessment", desc: "Calibrated questions across 5 board-critical competency dimensions. Know exactly where you stand today." },
  { icon: "🧠", title: "AI-Powered Analysis", desc: "Claude AI generates a personalized board readiness brief—your value proposition, gaps, and ideal board profile." },
  { icon: "🎓", title: "Curated Education", desc: "Targeted learning resources and certifications tailored to your specific gaps. NACD, WCD, Wharton, Harvard, and more." },
  { icon: "🗓️", title: "90-Day Sprint Plan", desc: "A week-by-week action plan converting your results into momentum toward your first board interview." },
  { icon: "🔗", title: "Board Search Strategy", desc: "Guidance on search firm relationships, board bio optimization, and sponsorship cultivation." },
  { icon: "📋", title: "Your Ideal Board Profile", desc: "Clarity on which company types, sectors, and committee roles are the best fit for your first seat." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 text-white px-6 py-20 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-300 text-sm font-semibold bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1.5 mb-6">
            ⭐ Designed for Fortune 1000 Board Readiness
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-5">
            Your Path to the<br />
            <span className="text-indigo-300">Corporate Boardroom</span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-xl mb-8">
            The boardroom needs CHROs. Human capital, culture, ESG, and CEO succession
            are now board-level imperatives — and you&apos;re uniquely positioned to contribute.
            This platform assesses your readiness, closes your gaps, and builds your
            personalized strategy for landing a Fortune 1000 board seat.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["20-Dimension Assessment", "AI-Powered Analysis", "90-Day Action Plan"].map(f => (
              <span key={f} className="text-sm font-medium text-indigo-100 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                {f}
              </span>
            ))}
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 bg-indigo-400 hover:bg-indigo-300 text-indigo-950 font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
          >
            Start Your Assessment →
          </Link>
          <p className="text-indigo-400 text-sm mt-4">⏱ Takes approximately 8–10 minutes</p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">What BoardReady Delivers</h2>
            <p className="text-gray-500 mt-2">A complete system for CHRO board seat attainment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 5 Dimensions */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">The 5 Board Readiness Dimensions</h2>
            <p className="text-gray-500 mt-2">The competencies Fortune 1000 nominating committees actually look for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIMS.map((d, i) => (
              <div key={d.name} className="bg-white border border-gray-100 rounded-2xl p-5 relative hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="absolute top-4 right-4 w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <div className="text-2xl mb-2">{d.icon}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{d.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-14 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-3">Ready to Claim Your Board Seat?</h2>
        <p className="text-indigo-300 mb-6">Join the CHROs actively preparing for governance leadership.</p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 bg-indigo-400 hover:bg-indigo-300 text-indigo-950 font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
        >
          Begin Your Board Readiness Assessment →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-center py-5 text-indigo-500 text-xs">
        BoardReady — Empowering CHROs to step into the boardroom with confidence. Powered by Claude AI.
      </footer>
    </div>
  );
}

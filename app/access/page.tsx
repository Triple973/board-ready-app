import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const SEARCH_FIRMS = [
  {
    name: "Korn Ferry",
    specialty: "Board Director Practice",
    desc: "The largest executive search firm globally with a dedicated board practice. Their board directors practice places 2,000+ directors annually across Fortune 500 companies.",
    how: "Request an introduction through your BetterUp program advisor. Prepare a 1-page board bio and optimized LinkedIn profile before outreach.",
    icon: "🏢",
  },
  {
    name: "Spencer Stuart",
    specialty: "Board & CEO Services",
    desc: "Top-tier board search firm known for placing directors at the most prestigious Fortune 100 companies. Especially strong in financial services, technology, and consumer.",
    how: "Spencer Stuart relationships require warm introductions. The Annual Summit includes direct roundtable access to Spencer Stuart partners.",
    icon: "🏛️",
  },
  {
    name: "Heidrick & Struggles",
    specialty: "Board & Governance Advisory",
    desc: "Global leadership advisory firm with a strong board practice. Known for speed-to-placement and deep sector expertise in technology and healthcare.",
    how: "Program alumni receive facilitated introductions. Prepare your board value proposition before any introductory meeting.",
    icon: "🔵",
  },
];

const COACHING_FOCUSES = [
  { icon: "📖", title: "Board Biography Development", desc: "Craft a compelling 1-page board bio that leads with governance value — not operating experience." },
  { icon: "🎯", title: "Value Proposition Refinement", desc: "Sharpen your 60-second and 5-minute board candidate pitch for search firm meetings and director conversations." },
  { icon: "🔍", title: "Target Company Identification", desc: "Develop a focused list of 10–15 target companies where your background creates the most compelling board fit." },
  { icon: "💼", title: "Board Interview Simulation", desc: "Practice governance-specific interview questions with real-time feedback from your coach." },
  { icon: "🌐", title: "LinkedIn Optimization", desc: "Reframe your LinkedIn profile to attract board search firm attention and signal governance ambition." },
  { icon: "📊", title: "Compensation Guidance", desc: "Understand director compensation structures, equity retainers, and norms across company sizes and sectors." },
];

const MILESTONES = [
  {
    time: "Month 1–2",
    label: "Foundation",
    items: [
      "Complete Board Readiness Assessment",
      "Start async curriculum modules 1–3",
      "First BetterUp coaching session — gap analysis",
    ],
  },
  {
    time: "Month 3–4",
    label: "Build",
    items: [
      "Complete curriculum modules 4–6",
      "Attend first Board Member Roundtable",
      "Draft board biography (version 1)",
      "LinkedIn optimization complete",
    ],
  },
  {
    time: "Month 5–6",
    label: "Accelerate",
    items: [
      "Warm search firm introductions",
      "Board narrative guide finalized",
      "Annual Summit attendance",
      "First target company shortlist created",
    ],
  },
  {
    time: "Month 7–12",
    label: "Access",
    items: [
      "Active search firm relationships",
      "Board interview preparation underway",
      "Advisory board opportunities explored",
      "Path to first board seat confirmed",
    ],
  },
];

export default function AccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-800 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1.5 mb-5">
            🚀 Phase 3 — Access
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Get in the Room.<br />
            <span className="text-indigo-300">Land the Seat.</span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-xl mb-8">
            Phase 3 converts your preparation and network into an actual board seat. Through
            1:1 coaching, search firm introductions, and your board narrative guide, you move
            from candidate to director.
          </p>
        </div>
      </section>

      {/* BetterUp Coaching */}
      <section className="bg-white px-6 py-14 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-block text-violet-600 text-xs font-bold tracking-widest uppercase bg-violet-50 border border-violet-100 rounded-full px-3 py-1 mb-4">
                1:1 BetterUp Coaching
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                Your Personal Board Readiness Coach
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Every participant in the Board Room Preparation Program receives dedicated 1:1
                coaching from a BetterUp certified coach with expertise in executive transitions
                and board placement. Your coach works specifically on the gaps identified in
                your diagnostic assessment.
              </p>
              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
                <div className="text-violet-700 font-bold text-sm mb-3">What your coach helps you achieve:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COACHING_FOCUSES.map((f) => (
                    <div key={f.title} className="flex items-start gap-2.5">
                      <span className="text-lg flex-shrink-0">{f.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{f.title}</div>
                        <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🧑‍💼</div>
              <div className="text-xl font-extrabold text-gray-900 mb-2">Dedicated Coaching Package</div>
              <div className="text-gray-500 text-sm mb-6">Included in the Board Room Preparation Program</div>
              <div className="space-y-3 text-left">
                {[
                  "8 coaching sessions over 6 months",
                  "Gap-based personalization from diagnostic",
                  "Async feedback between sessions",
                  "Board interview simulation included",
                  "Ongoing LinkedIn & bio review cycles",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Firm Introductions */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Search Firm Introductions</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Program graduates receive warm introductions to the three firms that dominate Fortune 500 board search
            </p>
          </div>
          <div className="space-y-5">
            {SEARCH_FIRMS.map((firm) => (
              <div key={firm.name} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
                    {firm.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-lg">{firm.name}</h3>
                        <div className="text-xs font-semibold text-indigo-600">{firm.specialty}</div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                        Warm Introduction Provided
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{firm.desc}</p>
                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">How it works</div>
                      <p className="text-sm text-gray-700">{firm.how}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12-Month Timeline */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Your 12-Month Journey</h2>
            <p className="text-gray-500 mt-2 text-sm">From first assessment to board seat candidacy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MILESTONES.map((m, i) => (
              <div key={m.time} className="bg-slate-50 border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{m.time}</div>
                    <div className="font-extrabold text-gray-900 text-sm">{m.label}</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <span className="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-indigo-950 to-violet-900 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🏛️</div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Your Board Seat Is Within Reach
          </h2>
          <p className="text-indigo-300 leading-relaxed mb-8">
            The boardroom needs what you bring. Human capital, culture, ESG, and CEO succession
            are governance imperatives — and CHROs are uniquely positioned to lead them.
            Start with your assessment and take the first step today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/educate"
              className="inline-flex items-center gap-2 text-indigo-300 bg-white/10 border border-white/20 hover:bg-white/20 font-semibold px-6 py-4 rounded-full transition-all text-sm"
            >
              ← Phase 1: Educate
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

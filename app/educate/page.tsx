import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const CURRICULUM_MODULES = [
  {
    num: "01",
    title: "Operator to Governor: The Mindset Shift",
    desc: "The fundamental difference between running an organization and governing one. CHROs make this transition better than almost any other C-suite leader — here's why, and how.",
    topics: ["Fiduciary vs. operational thinking", "Board governance fundamentals", "The CHRO value proposition in governance"],
    icon: "🔄",
  },
  {
    num: "02",
    title: "Board Governance & Legal Duties",
    desc: "The legal, regulatory, and structural frameworks governing Fortune 1000 corporate boards — what every independent director must know before stepping into the room.",
    topics: ["Duty of care and loyalty", "SEC disclosure requirements", "Director independence standards", "Board committee structures"],
    icon: "⚖️",
  },
  {
    num: "03",
    title: "Financial Literacy for Board Directors",
    desc: "Build the financial fluency expected of all board members — even those serving primarily on Human Capital or Compensation committees.",
    topics: ["Reading financial statements", "Audit committee fundamentals", "Capital allocation frameworks", "Risk-adjusted performance metrics"],
    icon: "📊",
  },
  {
    num: "04",
    title: "Strategy, Risk & CEO Oversight",
    desc: "How boards evaluate strategic direction, manage enterprise risk, and oversee CEO performance and succession planning.",
    topics: ["Board-level strategy review", "Enterprise Risk Management (ERM)", "CEO succession planning", "Activist shareholder dynamics"],
    icon: "♟️",
  },
  {
    num: "05",
    title: "Human Capital, ESG & Compensation",
    desc: "Your home turf — framed through the board lens. Translate your CHRO expertise into governance fluency that every nominating committee values.",
    topics: ["Executive compensation design", "ESG reporting standards (GRI, SASB)", "Workforce strategy at board level", "DEI as a governance imperative"],
    icon: "👥",
  },
  {
    num: "06",
    title: "Board Dynamics & Personal Positioning",
    desc: "Navigate boardroom culture, build influential director relationships, and position yourself as a compelling first-time candidate.",
    topics: ["Boardroom communication norms", "Board biography development", "Search firm relationship-building", "First-year director success factors"],
    icon: "🌟",
  },
];

const FIRESIDE_CHATS = [
  {
    role: "Fortune 500 Board Chair",
    sector: "Retail & Consumer Goods",
    topic: "What boards actually look for in CHRO candidates",
  },
  {
    role: "Lead Independent Director",
    sector: "Financial Services",
    topic: "Human capital as a board-level imperative post-COVID",
  },
  {
    role: "Nominating Committee Chair",
    sector: "Technology",
    topic: "How search firms evaluate first-time directors",
  },
  {
    role: "CHRO-turned-Board Director",
    sector: "Healthcare",
    topic: "My transition: From operating to governing",
  },
];

const DELIVERABLES = [
  { icon: "📋", title: "Board Readiness Diagnostic", desc: "AI-powered assessment across 5 board competency dimensions with a personalized gap analysis." },
  { icon: "📄", title: "Board Research Brief", desc: "A customized brief on target companies, committee needs, and your sector fit." },
  { icon: "🎓", title: "Curriculum Certificate", desc: "Completion credential recognized by NACD and governance search firms." },
  { icon: "📝", title: "Governance Readiness Roadmap", desc: "Your 90-day action plan to close gaps and accelerate board candidacy." },
];

export default function EducatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1.5 mb-5">
            🎓 Phase 1 — Educate
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Build Your Board<br />
            <span className="text-indigo-300">Knowledge Foundation</span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-xl mb-8">
            The Board Room Preparation Program equips CHROs with the governance fluency,
            financial literacy, and strategic perspective needed to serve as a world-class
            independent director on a Fortune 1000 board.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 bg-indigo-400 hover:bg-indigo-300 text-indigo-950 font-bold px-7 py-3.5 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
            >
              Take Your Board Readiness Assessment →
            </Link>
            <span className="inline-flex items-center text-indigo-300 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm font-semibold">
              ⏱ 6-month async curriculum
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white px-6 py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="text-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">6</div>
            <div className="text-sm font-bold text-gray-700">Core Modules</div>
            <div className="text-xs text-gray-500 mt-1">Self-paced, async format</div>
          </div>
          <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-4xl font-extrabold text-emerald-600 mb-1">4+</div>
            <div className="text-sm font-bold text-gray-700">Fireside Chats</div>
            <div className="text-xs text-gray-500 mt-1">With active Fortune 500 board members</div>
          </div>
          <div className="text-center p-6 bg-violet-50 rounded-2xl border border-violet-100">
            <div className="text-4xl font-extrabold text-violet-600 mb-1">1:1</div>
            <div className="text-sm font-bold text-gray-700">BetterUp Coaching</div>
            <div className="text-xs text-gray-500 mt-1">Personalized to your diagnostic gaps</div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">The Curriculum</h2>
            <p className="text-gray-500 mt-2 text-sm">Six modules designed specifically for the CHRO-to-board transition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CURRICULUM_MODULES.map((m) => (
              <div key={m.num} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm">
                    {m.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-xl mb-1">{m.icon}</div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{m.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.topics.map((t) => (
                        <span key={t} className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fireside Chats */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Fireside Chats</h2>
            <p className="text-gray-500 mt-2 text-sm">Live and recorded conversations with active Fortune 500 board members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FIRESIDE_CHATS.map((s) => (
              <div key={s.role} className="bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-lg mb-4">
                  🎙️
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1">{s.sector}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{s.role}</div>
                <p className="text-gray-500 text-sm italic">&ldquo;{s.topic}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll leave with */}
      <section className="bg-indigo-950 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">What You&apos;ll Leave With</h2>
            <p className="text-indigo-400 mt-2 text-sm">Concrete deliverables from Phase 1</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="bg-white/10 border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">{d.icon}</div>
                <div className="text-white font-bold text-sm mb-2">{d.title}</div>
                <div className="text-indigo-300 text-xs leading-relaxed">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-14 text-center border-t border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Start with Your Board Readiness Assessment</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
          Your diagnostic results are the foundation of Phase 1. Get your personalized gap analysis in 10 minutes.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-md transition-all hover:-translate-y-0.5"
          >
            Take the Free Assessment →
          </Link>
          <Link
            href="/convene"
            className="inline-flex items-center gap-2 text-indigo-600 border-2 border-indigo-200 hover:bg-indigo-50 font-bold px-6 py-4 rounded-full transition-all text-sm"
          >
            Phase 2: Convene →
          </Link>
        </div>
      </section>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

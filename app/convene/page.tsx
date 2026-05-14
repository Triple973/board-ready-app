import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const ROUNDTABLE_TOPICS = [
  "Human capital as a board-level imperative",
  "CEO succession: What boards get wrong",
  "ESG governance in a polarized environment",
  "First-year director dynamics and boardroom culture",
  "Compensation committee: The CHRO's natural home",
  "Managing activist investors and proxy season",
];

const SUMMIT_TRACKS = [
  {
    icon: "🏛️",
    title: "Governance Masterclass",
    desc: "Full-day intensive with sitting board chairs from the Fortune 500, focused on governance fundamentals and the emerging challenges facing independent directors today.",
  },
  {
    icon: "🔗",
    title: "Search Firm Roundtables",
    desc: "Small-group conversations with partners from Korn Ferry, Spencer Stuart, and Heidrick & Struggles on what they actually look for in first-time director candidates.",
  },
  {
    icon: "💡",
    title: "The CHRO Advantage",
    desc: "Interactive session on how to position your HR background as a board superpower — not a liability — in today's governance landscape. Led by CHROs already serving on boards.",
  },
  {
    icon: "🤝",
    title: "Board Member Speed Networking",
    desc: "Structured introductions with 20+ active independent directors across industries, designed to spark the warm relationships that lead to board candidacy.",
  },
];

const PARTNERS = [
  { name: "NACD", desc: "National Association of Corporate Directors — credentialing and governance education", type: "Education" },
  { name: "WCD", desc: "Women Corporate Directors — global network for women board candidates", type: "Network" },
  { name: "Korn Ferry", desc: "Premier executive search firm with a dedicated Fortune 500 board practice", type: "Search" },
  { name: "Spencer Stuart", desc: "Top-tier board search and advisory firm across Fortune 100 companies", type: "Search" },
  { name: "Heidrick & Struggles", desc: "Global leadership advisory and board director placement firm", type: "Search" },
  { name: "Harvard Law Forum", desc: "Corporate governance research and practitioner insights", type: "Education" },
  { name: "SHRM", desc: "Society for Human Resource Management — professional credentialing", type: "Professional" },
  { name: "The Conference Board", desc: "Executive research and peer roundtable network", type: "Research" },
];

const TYPE_COLORS: Record<string, string> = {
  Education: "bg-indigo-50 text-indigo-600 border-indigo-100",
  Network: "bg-violet-50 text-violet-600 border-violet-100",
  Search: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Professional: "bg-amber-50 text-amber-700 border-amber-100",
  Research: "bg-sky-50 text-sky-600 border-sky-100",
};

export default function ConvenePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-700 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1.5 mb-5">
            🤝 Phase 2 — Convene
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Connect with the People<br />
            <span className="text-indigo-300">Who Open Boardroom Doors</span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-xl mb-8">
            Board seats are rarely won through applications — they&apos;re earned through relationships.
            Phase 2 puts you in the room with the directors, search partners, and peers who
            shape board composition at the world&apos;s leading companies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-6 py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="text-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">70%</div>
            <div className="text-sm font-bold text-gray-700">of board seats filled via network</div>
            <div className="text-xs text-gray-500 mt-1">Not search firms, not job boards</div>
          </div>
          <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-4xl font-extrabold text-emerald-600 mb-1">4×</div>
            <div className="text-sm font-bold text-gray-700">faster placement with sponsorship</div>
            <div className="text-xs text-gray-500 mt-1">Warm introductions outperform cold outreach</div>
          </div>
          <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-4xl font-extrabold text-amber-600 mb-1">1</div>
            <div className="text-sm font-bold text-gray-700">Annual Summit per year</div>
            <div className="text-xs text-gray-500 mt-1">The only convening designed for CHRO board candidates</div>
          </div>
        </div>
      </section>

      {/* Board Member Roundtable */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block text-indigo-600 text-xs font-bold tracking-widest uppercase bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-4">
                Board Member Roundtable
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                Monthly Access to Active Board Directors
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Each month, a cohort of CHRO board candidates joins an intimate virtual roundtable
                with 2–3 sitting Fortune 500 board members. These aren&apos;t panels — they&apos;re
                conversations. Directors share what they look for, what surprises them, and how
                they&apos;d evaluate your candidacy.
              </p>
              <div className="space-y-2">
                {ROUNDTABLE_TOPICS.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-8">
              <div className="text-center text-6xl mb-4">🎙️</div>
              <div className="text-xl font-extrabold text-gray-900 mb-2 text-center">Monthly Roundtables</div>
              <div className="text-gray-500 text-sm mb-6 text-center">Intimate sessions with 2–3 active Fortune 500 directors</div>
              <div className="space-y-3">
                {[
                  "Virtual format, 90 minutes",
                  "Max 8 CHRO participants per session",
                  "Curated topic matching to cohort needs",
                  "Relationship follow-up support included",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Summit */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block text-emerald-600 text-xs font-bold tracking-widest uppercase bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 mb-4">
              Annual Summit
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">CHRO Board Readiness Summit</h2>
            <p className="text-gray-500 mt-2 text-sm">A full-day in-person event for CHROs actively pursuing their first board seat</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SUMMIT_TRACKS.map((t) => (
              <div key={t.title} className="bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{t.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Partner Ecosystem</h2>
            <p className="text-gray-500 mt-2 text-sm">The organizations and firms that comprise the CHRO board readiness network</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <div key={p.name} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
                <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${TYPE_COLORS[p.type] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  {p.type}
                </span>
                <div className="font-bold text-gray-900 text-sm mt-2 mb-1">{p.name}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-14 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">The Network Is the Path</h2>
        <p className="text-indigo-300 mb-6 max-w-md mx-auto text-sm">
          The right relationships accelerate everything. Phase 3 converts your network into an actual board seat.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/access"
            className="inline-flex items-center gap-2 text-indigo-300 bg-white/10 border border-white/20 hover:bg-white/20 font-semibold px-6 py-4 rounded-full transition-all text-sm"
          >
            Phase 3: Get Access →
          </Link>
        </div>
      </section>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

type Concept = { term: string; def: string };

type Module = {
  num: string;
  title: string;
  desc: string;
  topics: string[];
  icon: string;
  duration: string;
  insight: string;
  objectives: string[];
  keyConcepts: Concept[];
  action: string;
  resources: string[];
};

const CURRICULUM_MODULES: Module[] = [
  {
    num: "01",
    title: "Operator to Governor: The Mindset Shift",
    desc: "The fundamental difference between running an organization and governing one — and why CHROs make this transition better than almost any other C-suite leader.",
    topics: ["Fiduciary vs. operational thinking", "Board governance fundamentals", "The CHRO value proposition"],
    icon: "🔄",
    duration: "45 min",
    insight: "The shift from operator to governor is fundamentally about asking better questions, not having all the answers. Boards govern by challenging, probing, and holding management accountable — not by running the business. Your CHRO experience gives you a unique vantage point on the human systems that drive strategy. No other C-suite role provides it.",
    objectives: [
      "Distinguish governance from management — and why confusing them is the most common first-year director mistake",
      "Articulate your CHRO-specific value as a director candidate in a single, compelling sentence",
      "Command the core vocabulary of governance before your first search firm conversation",
    ],
    keyConcepts: [
      { term: "Business Judgment Rule", def: "The legal protection that shields directors from liability when they make informed, good-faith decisions. Your defense in the boardroom — but only if you were actually engaged and informed." },
      { term: "Fiduciary Duty", def: "The legal obligation to act in the best interest of shareholders. Not the CEO. Not the company. Not yourself. Shareholders. This distinction matters more than most executives realize until they're sitting in the room." },
      { term: "\"Noses In, Fingers Out\"", def: "The governing principle of effective board service: boards probe and challenge; management executes. Directors who slip into micromanagement lose the trust of both management and fellow directors — fast." },
      { term: "Duty of Obedience", def: "Often overlooked alongside care and loyalty — the obligation to act within the scope of the organization's stated purpose and governing documents. Boards that drift from strategic purpose violate this duty." },
    ],
    action: "Write a 3-sentence answer to: 'What do I bring to a board that no other director candidate can?' This becomes the foundation of your board value proposition — you'll use it in every search firm conversation. Be specific. \"Human capital expertise\" is not specific enough.",
    resources: [
      "NACD Director Professionalism Course — gold standard credentialing program, recognized by every major search firm",
      "The Director's Handbook (NACD) — practical governance reference used by sitting directors",
      "McKinsey Quarterly: \"What Makes a Great Board Director\" — free, 15-minute read that reframes the entire role",
    ],
  },
  {
    num: "02",
    title: "Board Governance & Legal Duties",
    desc: "The legal, regulatory, and structural frameworks governing Fortune 1000 corporate boards — what every independent director must know cold before stepping into the room.",
    topics: ["Duty of care and loyalty", "SEC disclosure requirements", "Director independence standards", "Committee mandates"],
    icon: "⚖️",
    duration: "60 min",
    insight: "Read one proxy statement from a company in your target sector before any board interview. Nominating committees are genuinely impressed — and surprised — when candidates demonstrate they've done this homework. It signals governance fluency, not just management experience. This single habit separates serious candidates from aspirational ones.",
    objectives: [
      "Explain the three fiduciary duties fluently — in plain English, without legalese",
      "Navigate a proxy statement and extract the intelligence that reveals how a board actually operates",
      "Know the NYSE/Nasdaq director independence standards before you're ever asked about your eligibility",
    ],
    keyConcepts: [
      { term: "Duty of Care", def: "The obligation to be informed and engaged. Attend meetings. Read board materials in advance. Ask probing questions. Courts evaluate whether you acted as a 'reasonably prudent' director — not whether the decision turned out right." },
      { term: "Duty of Loyalty", def: "Put shareholder interests above your own. Disclose potential conflicts. Recuse yourself when necessary. The most frequently litigated fiduciary duty — and the most reputationally dangerous to get wrong." },
      { term: "Director Independence", def: "NYSE and Nasdaq rules require most directors to have no material relationship with the company. Understand what creates a disqualifying relationship before you ever discuss a specific board opportunity." },
      { term: "Say-on-Pay", def: "The annual shareholder advisory vote on executive compensation. Votes below 70% approval are a governance red flag that triggers significant board scrutiny. Compensation committees live with this — your comp design expertise is directly translatable here." },
    ],
    action: "Download a proxy statement (DEF 14A) from SEC EDGAR for a Fortune 500 company in your sector. Identify: board committee composition, director independence disclosures, CEO pay ratio, and the skills matrix. Time yourself: can you find all four in under 20 minutes? This exercise reveals more about governance than any course.",
    resources: [
      "SEC EDGAR (edgar.sec.gov) — free access to every public company's proxy statement, immediately",
      "Harvard Law School Forum on Corporate Governance (corpgov.law.harvard.edu) — cutting-edge governance analysis",
      "NACD Blue Ribbon Commission Reports — the most authoritative guidance on board governance best practices",
    ],
  },
  {
    num: "03",
    title: "Financial Literacy for Board Directors",
    desc: "Build the financial fluency boards expect of every director — including those who aren't financial experts. Audit committee-ready is the standard.",
    topics: ["Reading financial statements", "Audit committee oversight", "Capital allocation", "Risk-adjusted performance metrics"],
    icon: "📊",
    duration: "75 min",
    insight: "You don't need a CPA to be financially credible in the boardroom. You need to ask the right questions: 'What's driving the margin compression?', 'How does this acquisition change our capital structure?', 'Why is free cash flow diverging from net income?' This fluency is learnable in weeks — and it's the most frequently cited gap in CHRO board candidates.",
    objectives: [
      "Read an income statement, balance sheet, and cash flow statement — and identify what specifically to probe in each",
      "Understand Audit Committee responsibilities well enough to serve as a contributing non-expert member",
      "Speak credibly about capital allocation trade-offs without deferring to the CFO in the room",
    ],
    keyConcepts: [
      { term: "Free Cash Flow", def: "Operating cash flow minus capital expenditures. The metric boards use to evaluate business health and management credibility. If earnings look strong but FCF is weak, ask why — every time. It's one of the most revealing divergences in any financial package." },
      { term: "ROIC vs. WACC", def: "Return on Invested Capital vs. Weighted Average Cost of Capital. If ROIC consistently falls below WACC, the company is destroying shareholder value — regardless of what the earnings press release says. This is the lens boards use to evaluate capital allocation strategy." },
      { term: "EBITDA vs. Net Income", def: "EBITDA strips out financing decisions and accounting choices; net income includes all of them. Watch the gap between them — it often reveals how management presents performance versus how the business actually performs on a cash basis." },
      { term: "Audit Committee Financial Expert", def: "An SEC-required designation for at least one audit committee member with deep accounting expertise. You don't need to qualify — but understanding what they evaluate makes you a stronger colleague and a more credible committee member." },
    ],
    action: "Pull the last two annual reports (10-K) for a company you know well. Compare year-over-year: revenue growth, gross margin, operating margin, and free cash flow. Identify one specific question you'd ask management as an outside director — write it down. This is the kind of question that impresses nominating committees in interviews.",
    resources: [
      "NACD Financial Literacy for Directors — purpose-built for non-CFO directors seeking Audit committee readiness",
      "KPMG Audit Committee Institute (kpmg.com/aci) — free webcasts, practical guides, and annual surveys",
      "PwC Governance Insights Center — annual director surveys and financial oversight frameworks used by boards",
    ],
  },
  {
    num: "04",
    title: "Strategy, Risk & CEO Oversight",
    desc: "How boards evaluate strategic direction, manage enterprise risk, and oversee CEO performance and succession — the responsibilities boards consider most consequential.",
    topics: ["Board-level strategy review", "Enterprise Risk Management", "CEO succession planning", "Activist shareholders"],
    icon: "♟️",
    duration: "60 min",
    insight: "CHROs are uniquely positioned on CEO succession — widely considered the board's single most important responsibility. You've observed leaders under pressure, built leadership pipelines, managed the CEO relationship directly, and often been the board's most trusted source on organizational health. In board interviews, own this explicitly. Most candidates can't come close.",
    objectives: [
      "Understand how effective boards distinguish strategy oversight from micromanagement — and where the line actually sits",
      "Frame enterprise risk in the vocabulary boards use: risk appetite, risk register, risk tolerance, risk committee",
      "Prepare a board-ready narrative on your CEO succession experience before your first search firm conversation",
    ],
    keyConcepts: [
      { term: "Risk Appetite Statement", def: "The board's formal declaration of how much risk it's willing to accept in pursuit of strategy. The board approves it; management operates within it. If a company can't produce its risk appetite statement, that's a governance gap worth probing." },
      { term: "CEO Succession", def: "Widely considered the board's most important single responsibility — and the area where CHROs have deeper, more credible expertise than any other director candidate. Frame your succession work in governance terms: board involvement, candidate assessment methodology, outcome, what you'd do differently." },
      { term: "Activist Investor", def: "A shareholder who acquires a meaningful stake and publicly pushes for strategic or governance changes. Boards spend significant preparation time on activist scenarios. Your change management and stakeholder communication experience is directly applicable." },
      { term: "Board Strategy Session", def: "Typically a 1–2 day annual offsite where the board stress-tests management's long-range plan. Your role as director: challenge assumptions about organizational capability, talent pipeline, and culture — not just validate the financial projections." },
    ],
    action: "Prepare a 3-minute narrative on your direct involvement in CEO or senior executive succession. Structure it for a board audience: What was the governance structure? What was your specific role? What assessment methodology did the board use? What was the outcome, and what did you learn? Practice until it's fluent — this is your most powerful interview answer.",
    resources: [
      "Spencer Stuart Board Index (spencerstuart.com) — free annual report benchmarking S&P 500 board composition and director search trends",
      "COSO ERM Framework (coso.org) — the standard enterprise risk framework that boards reference and expect directors to know",
      "Russell Reynolds Associates CEO Succession Best Practices — free annual research on the board's most important responsibility",
    ],
  },
  {
    num: "05",
    title: "Human Capital, ESG & Compensation",
    desc: "Your home turf — reframed through the governance lens. Translate your CHRO expertise into the boardroom language that nominating committees and institutional investors actually value.",
    topics: ["Executive compensation design", "ESG reporting (GRI, SASB, TCFD)", "Workforce strategy at board level", "Human capital disclosure"],
    icon: "👥",
    duration: "60 min",
    insight: "The most underclaimed advantage in your board candidacy: you've built the human capital metrics the SEC now requires companies to disclose, managed the workforce risks proxy advisory firms now flag, and owned the talent strategy that drives long-term shareholder value. This isn't an HR background — it's governance expertise. Use governance language to claim it, every time.",
    objectives: [
      "Reframe your CHRO expertise as governance capability — not operational background that \"translates\" to the board",
      "Understand Compensation Committee mechanics well enough to be a productive member in year one",
      "Speak to ESG reporting frameworks at the level institutional investors and proxy advisors expect from directors",
    ],
    keyConcepts: [
      { term: "Human Capital Disclosure", def: "The SEC now requires companies to disclose material human capital resources and objectives in their 10-K. CHROs who've built these disclosures — workforce metrics, attrition risk, talent pipeline depth — have rare, institutionally valued governance expertise." },
      { term: "Compensation Committee", def: "Oversees executive compensation design, incentive structure alignment, pay equity, and say-on-pay strategy. Your most natural first committee assignment — and where nominating committees most often place CHRO candidates." },
      { term: "SASB Standards", def: "Industry-specific ESG disclosure standards used by institutional investors to evaluate material non-financial risk. Knowing which SASB metrics matter in your sector signals ESG governance fluency well beyond most director candidates." },
      { term: "Workforce Risk", def: "The board-level framing of talent, culture, and labor strategy — including key person dependencies, organizational health, human capital ROI, and reskilling exposure. This is your terrain. Govern it with precision and authority." },
    ],
    action: "Draft a one-paragraph 'Compensation Committee Value Proposition' — what specific governance contributions would you make in year one? Be concrete: which metrics would you add to the committee's dashboard, which risks would you probe that the current committee likely isn't tracking, what would change because you joined?",
    resources: [
      "SASB Standards (sasb.org) — free; find your industry's material ESG metrics in under 10 minutes",
      "ISO 30414 Human Capital Reporting Standard — the emerging global framework for human capital disclosure to boards and investors",
      "FW Cook Annual Director Compensation Survey (fwcook.com) — free benchmarking data that Compensation Committees rely on",
    ],
  },
  {
    num: "06",
    title: "Board Dynamics & Personal Positioning",
    desc: "Navigate boardroom culture, position yourself as a compelling candidate, and build the search firm relationships that actually convert into board seats.",
    topics: ["Boardroom communication norms", "Board biography development", "Search firm strategy", "First-year director success"],
    icon: "🌟",
    duration: "45 min",
    insight: "Search firms place directors they trust will add value and not create problems. They want three things: governance knowledge, collaborative temperament, and a clear articulation of what you bring that the current board lacks. Your board bio is their first filter. Treat it like the most important one-pager of your career — because for this specific purpose, it is.",
    objectives: [
      "Write a board bio that leads with governance value, not operating scope, team size, or company revenue",
      "Understand the director skills matrix and articulate exactly which gaps you fill on your target boards",
      "Build a focused, three-firm search strategy — not a broadcast campaign, but a targeted relationship approach",
    ],
    keyConcepts: [
      { term: "Board Bio vs. Executive Bio", def: "Your executive bio leads with company scope and team size. Your board bio leads with governance value — what you contribute to oversight, what risks you identify that others miss, what the board gains when you join. These are fundamentally different documents." },
      { term: "Director Skills Matrix", def: "The tool boards use to identify competency gaps and structure director searches. Standard categories: financial expertise, industry knowledge, human capital, ESG, digital/cyber, international. Know exactly which cells you fill on each target board — and be ready to articulate it." },
      { term: "Nominating & Governance Committee", def: "The committee that controls board composition. Search firms present candidates; the N&G committee decides. Understanding their evaluation criteria — not just relationship-building with the search firm — is the real competitive advantage in your search." },
      { term: "First-Year Director Principle", def: "Listen more than you speak in your first year. Learn the culture, understand the dynamics, build trust with fellow directors. Influence is earned before it's spent. Directors who challenge everything in month one rarely earn the platform to change anything by month twelve." },
    ],
    action: "Draft your board bio using this exact structure: Paragraph 1 — current role described in governance language, not operational scope. Paragraph 2 — your top two expertise areas framed as director contributions, not career accomplishments. Paragraph 3 — board or advisory experience and target committees. Keep it under 275 words. Then use the Board Bio Builder in your Dashboard to generate a polished AI version.",
    resources: [
      "Spencer Stuart Board Practice (spencerstuart.com) — relationship-driven; always approach via a warm introduction, never cold outreach",
      "Heidrick & Struggles Board & CEO Services (heidrick.com) — strong placement track record in technology and healthcare sectors",
      "WCD (Women Corporate Directors) (womencorporatedirectors.com) — the most effective board placement network for women director candidates",
    ],
  },
];

const FIRESIDE_CHATS = [
  { role: "Fortune 500 Board Chair", sector: "Retail & Consumer Goods", topic: "What boards actually look for in CHRO candidates — and the three questions every nominating committee asks" },
  { role: "Lead Independent Director", sector: "Financial Services", topic: "Human capital as a board-level imperative: why CHROs are becoming the most sought-after directors of the decade" },
  { role: "Nominating Committee Chair", sector: "Technology", topic: "Inside the search process: how firms evaluate first-time directors and what makes a CHRO stand out" },
  { role: "CHRO-turned-Board Director", sector: "Healthcare", topic: "My transition from operator to governor — what I wish I'd known before my first board meeting" },
];

const DELIVERABLES = [
  { icon: "📋", title: "Board Readiness Diagnostic", desc: "AI-powered assessment across 5 dimensions with a personalized gap analysis and 90-day action plan." },
  { icon: "📄", title: "Board Research Brief", desc: "A customized brief on target companies, committee needs, and your sector fit — built from your assessment profile." },
  { icon: "🎓", title: "Curriculum Certificate", desc: "Completion credential for the Board Room Preparation Program, recognized by governance search firms." },
  { icon: "✍️", title: "AI Board Biography", desc: "A Spencer Stuart-ready 275-word board biography, generated and refined using your assessment scores and profile." },
];

export default function EducatePage() {
  const [openModule, setOpenModule] = useState<string | null>(null);

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
            Six self-paced modules covering every competency dimension boards evaluate in director candidates.
            Each module includes the key concepts, real governance frameworks, and one concrete action to take immediately.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center text-indigo-300 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm font-semibold">
              ⏱ ~5.5 hours total
            </span>
            <span className="inline-flex items-center text-indigo-300 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm font-semibold">
              📖 Self-paced, async
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
            <p className="text-gray-500 mt-2 text-sm">Six modules for the CHRO-to-board transition. Click any module to expand the full content.</p>
          </div>
          <div className="space-y-3">
            {CURRICULUM_MODULES.map((m) => {
              const isOpen = openModule === m.num;
              return (
                <div
                  key={m.num}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                    isOpen ? "border-indigo-300 shadow-md" : "border-gray-100 hover:border-indigo-200 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : m.num)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex-shrink-0 w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm border border-indigo-100">
                      {m.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-lg">{m.icon}</span>
                        <h3 className="font-bold text-gray-900 text-base">{m.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-snug line-clamp-1">{m.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="hidden sm:block text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                        ⏱ {m.duration}
                      </span>
                      <span className={`text-gray-400 text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-6 pb-7 pt-5 space-y-6">
                      {/* Topic chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {m.topics.map((t) => (
                          <span key={t} className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Key insight */}
                      <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl px-5 py-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1.5">Key Insight</div>
                        <p className="text-gray-700 text-sm leading-relaxed">{m.insight}</p>
                      </div>

                      {/* Learning objectives */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Learning Objectives</h4>
                        <ul className="space-y-2">
                          {m.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key concepts */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Key Concepts to Master</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {m.keyConcepts.map((c) => (
                            <div key={c.term} className="bg-slate-50 border border-gray-100 rounded-xl p-4">
                              <div className="font-bold text-gray-900 text-sm mb-1">{c.term}</div>
                              <p className="text-gray-500 text-xs leading-relaxed">{c.def}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action item */}
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">⚡</span>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Your Action This Week</div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{m.action}</p>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Recommended Resources</h4>
                        <ul className="space-y-2">
                          {m.resources.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Ready for Phase 2?</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
          Once you&apos;ve built your knowledge foundation, connect with the directors and search partners who open boardroom doors.
        </p>
        <Link
          href="/convene"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          Phase 2: Convene →
        </Link>
      </section>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

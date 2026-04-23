"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DIMENSIONS, QUESTIONS, EDUCATION, computeScores, readinessLevel, dimLevel, type Profile } from "@/lib/data";
import Navbar from "@/app/components/Navbar";

const DIM_ICONS = ["⚖️", "📊", "♟️", "👥", "🤝"];

// ── Simple SVG radar chart ────────────────────────────────────────────────────
function RadarChart({ scores }: { scores: number[] }) {
  const cx = 160, cy = 160, r = 120;
  const N = scores.length;
  const MAX = 16;

  function point(i: number, val: number) {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    const d = (val / MAX) * r;
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) };
  }

  function labelPoint(i: number) {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    const d = r + 28;
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) };
  }

  const polygonPoints = scores.map((s, i) => {
    const p = point(i, s);
    return `${p.x},${p.y}`;
  }).join(" ");

  const benchPoints = Array(N).fill(12).map((s, i) => {
    const p = point(i, s);
    return `${p.x},${p.y}`;
  }).join(" ");

  const DIM_LABELS = ["Governance", "Financial", "Strategy", "Human\nCapital", "Board\nReadiness"];

  return (
    <svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: 320 }}>
      {/* Grid rings */}
      {[4, 8, 12, 16].map((v) => (
        <polygon
          key={v}
          points={Array(N).fill(0).map((_, i) => {
            const p = point(i, v);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="1"
        />
      ))}
      {/* Spokes */}
      {scores.map((_, i) => {
        const p = point(i, MAX);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e0e7ff" strokeWidth="1" />;
      })}
      {/* Benchmark polygon */}
      <polygon points={benchPoints} fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Score polygon */}
      <polygon points={polygonPoints} fill="rgba(255,2,110,0.12)" stroke="rgba(204,2,84,0.9)" strokeWidth="2.5" />
      {/* Score dots */}
      {scores.map((s, i) => {
        const p = point(i, s);
        return <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#ff026e" stroke="white" strokeWidth="2" />;
      })}
      {/* Labels */}
      {DIM_LABELS.map((label, i) => {
        const lp = labelPoint(i);
        const lines = label.split("\n");
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" fontSize="10" fontWeight="600" fill="#374151">
            {lines.map((line, li) => (
              <tspan key={li} x={lp.x} dy={li === 0 ? (lines.length > 1 ? "-0.5em" : "0.35em") : "1.2em"}>{line}</tspan>
            ))}
          </text>
        );
      })}
      {/* Legend */}
      <rect x="10" y="295" width="10" height="3" fill="rgba(204,2,84,0.9)" rx="2" />
      <text x="25" y="299" fontSize="9" fill="#6b7280" fontWeight="500">Your Score</text>
      <line x1="100" y1="297" x2="110" y2="297" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="115" y="299" fontSize="9" fill="#6b7280" fontWeight="500">Benchmark (12/16)</text>
    </svg>
  );
}

// ── Render markdown to HTML ───────────────────────────────────────────────────
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>(\n|$))+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hulo])/gm, "")
    .replace(/(<p><\/p>)/g, "");
}

export default function ResultsPage() {
  const router = useRouter();
  const [dimScores, setDimScores] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [openEdu, setOpenEdu] = useState<number | null>(0);
  const analysisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rawProfile = sessionStorage.getItem("br_profile");
    const rawAnswers = sessionStorage.getItem("br_answers");
    if (!rawProfile || !rawAnswers) { router.replace("/profile"); return; }

    const p = JSON.parse(rawProfile) as Profile;
    const a = JSON.parse(rawAnswers) as Record<string, number>;
    const numericAnswers: Record<number, number> = {};
    Object.entries(a).forEach(([k, v]) => { numericAnswers[Number(k)] = v; });

    const { dimScores: ds, total } = computeScores(numericAnswers);
    setProfile(p);
    setAnswers(numericAnswers);
    setDimScores(ds);
    setTotalScore(total);
  }, [router]);

  useEffect(() => {
    if (!dimScores.length || analyzing || analysisDone) return;
    runAnalysis();
    saveToAirtable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimScores]);

  async function saveToAirtable() {
    try {
      const res = await fetch("/api/airtable/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, dimScores, totalScore }),
      });
      const { recordId } = await res.json();
      if (recordId) sessionStorage.setItem("br_record_id", recordId);
    } catch {
      // Silently fail — Airtable save is non-blocking
    }
  }

  async function runAnalysis() {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, dimScores, answers }),
      });
      if (!res.ok || !res.body) throw new Error("API error");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        setAnalysis(buf);
        analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      setAnalysisDone(true);
    } catch (err) {
      setAnalysis("**Error generating analysis.** Please ensure your ANTHROPIC_API_KEY is set in `.env.local` and restart the server.");
      setAnalysisDone(true);
    } finally {
      setAnalyzing(false);
    }
  }

  if (!dimScores.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your results…</p>
        </div>
      </div>
    );
  }

  const pct = Math.round((totalScore / 80) * 100);
  const level = readinessLevel(pct);
  const levelColors: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    indigo: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    amber: "bg-amber-100 text-amber-700 border border-amber-200",
    sky: "bg-sky-100 text-sky-700 border border-sky-200",
  };

  const dimLevelColors: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    indigo: "bg-indigo-100 text-indigo-700",
    amber: "bg-amber-100 text-amber-700 text-xs",
    red: "bg-red-100 text-red-700",
  };

  const dimBarColors: Record<string, string> = {
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-400",
    red: "bg-red-400",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Results hero */}
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 text-white px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left: score info */}
            <div className="flex-1 text-center lg:text-left">
              <span className={`inline-block text-xs font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4 ${levelColors[level.color]}`}>
                {level.label}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3">
                {profile?.name ? `${profile.name}, Your Results Are In` : "Your Results Are In"}
              </h1>
              <p className="text-indigo-200 leading-relaxed mb-6 max-w-lg">
                You scored <strong className="text-white">{totalScore} out of 80</strong> across five board readiness dimensions.
                Here&apos;s what it means for your path to the boardroom.
              </p>
              {/* Big score ring */}
              <div className="inline-flex items-center gap-4">
                <div className="relative" style={{ width: 120, height: 120 }}>
                  <svg viewBox="0 0 120 120" width="120" height="120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10"
                      strokeDasharray={`${(pct / 100) * 314.2} 314.2`}
                      strokeDashoffset="78.5"
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-white leading-none">{pct}%</span>
                    <span className="text-indigo-300 text-[10px] font-semibold uppercase tracking-wider">Ready</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">{totalScore} / 80</div>
                  <div className="text-indigo-300 text-sm">Overall Score</div>
                </div>
              </div>
            </div>
            {/* Right: radar chart */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-shrink-0" style={{ width: 300 }}>
              <RadarChart scores={dimScores} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-slate-50 px-4 py-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Dimension breakdown */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Dimension Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DIMENSIONS.map((dim, i) => {
                const score = dimScores[i] ?? 0;
                const dpct = Math.round((score / 16) * 100);
                const dl = dimLevel(score);
                return (
                  <div key={dim} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="text-sm font-bold text-gray-800 leading-snug">{DIM_ICONS[i]} {dim}</div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${dimLevelColors[dl.color]}`}>{dl.label}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-2xl font-extrabold text-indigo-600 leading-none">{score}</span>
                      <span className="text-gray-400 text-sm font-medium">/16</span>
                      <div className="flex-1">
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${dimBarColors[dl.color]}`}
                            style={{ width: `${dpct}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5 text-right">{dpct}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Analysis */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-indigo-100 px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                🧠
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">AI-Powered Board Readiness Analysis</h2>
                <p className="text-gray-500 text-sm">
                  {analysisDone ? "Analysis complete" : analyzing ? "Claude AI is generating your personalized analysis…" : "Preparing analysis…"}
                </p>
              </div>
            </div>
            <div ref={analysisRef} className="px-6 py-6 min-h-[200px]">
              {!analysis && analyzing && (
                <div className="flex items-center gap-3 text-gray-500 py-8">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Analyzing your profile and building your personalized action plan…</span>
                </div>
              )}
              {analysis && (
                <div
                  className={`prose-analysis ${!analysisDone ? "cursor-blink" : ""}`}
                  dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(analysis)}</p>` }}
                />
              )}
            </div>
          </section>

          {/* Education Resources */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">🎓 Curated Learning Resources</h2>
            <p className="text-gray-500 text-sm mb-5">Targeted education recommendations across your five board readiness dimensions.</p>
            <div className="space-y-3">
              {Object.entries(EDUCATION).map(([dimName, resources], di) => {
                const score = dimScores[di] ?? 0;
                const dl = dimLevel(score);
                const isOpen = openEdu === di;
                return (
                  <div key={dimName} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenEdu(isOpen ? null : di)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{DIM_ICONS[di]}</span>
                        <span className="font-bold text-gray-900 text-sm">{dimName}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${dimLevelColors[dl.color]}`}>
                          {score}/16
                        </span>
                      </div>
                      <span className={`text-gray-400 text-lg transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 border-t border-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                          {resources.map((res) => (
                            <div key={res.title} className="bg-slate-50 border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-white transition-all">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
                                {res.type}
                              </span>
                              <h4 className="font-bold text-gray-900 text-sm mt-2 mb-1">{res.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed mb-2">{res.description}</p>
                              <p className="text-gray-400 text-[11px]">🏷 {res.focus}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 no-print pb-4">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all"
            >
              📊 Track My Progress
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full border-2 border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-all"
            >
              ↩ Start Over
            </Link>
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
            >
              🖨 Print Results
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs no-print">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

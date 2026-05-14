"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const MODULES = [
  { field: "Module 1 Complete", label: "Operator to Governor: The Mindset Shift", phase: 1 },
  { field: "Module 2 Complete", label: "Board Governance & Legal Duties", phase: 1 },
  { field: "Module 3 Complete", label: "Financial Literacy for Board Directors", phase: 1 },
  { field: "Module 4 Complete", label: "Strategy, Risk & CEO Oversight", phase: 1 },
  { field: "Module 5 Complete", label: "Human Capital, ESG & Compensation", phase: 1 },
  { field: "Module 6 Complete", label: "Board Dynamics & Personal Positioning", phase: 1 },
];

const MILESTONES = [
  { field: "Assessment Completed", label: "Board Readiness Assessment", icon: "📋", phase: 1 },
  { field: "Module 1 Complete", label: "Module 1: Operator to Governor", icon: "🔄", phase: 1 },
  { field: "Module 2 Complete", label: "Module 2: Board Governance", icon: "⚖️", phase: 1 },
  { field: "Module 3 Complete", label: "Module 3: Financial Literacy", icon: "📊", phase: 1 },
  { field: "Module 4 Complete", label: "Module 4: Strategy & Risk", icon: "♟️", phase: 1 },
  { field: "Module 5 Complete", label: "Module 5: Human Capital & ESG", icon: "👥", phase: 1 },
  { field: "Module 6 Complete", label: "Module 6: Board Dynamics", icon: "🌟", phase: 1 },
  { field: "Attended Roundtable", label: "Attended Board Member Roundtable", icon: "🎙️", phase: 2 },
  { field: "Board Bio Drafted", label: "Board Biography Drafted", icon: "📝", phase: 2 },
  { field: "Search Firm Intro Done", label: "Search Firm Introduction", icon: "🔗", phase: 3 },
];

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

export default function DashboardPage() {
  const [record, setRecord] = useState<AirtableRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [lookupEmail, setLookupEmail] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // Bio builder state
  const [bio, setBio] = useState("");
  const [bioLoading, setBioLoading] = useState(false);
  const [bioCopied, setBioCopied] = useState(false);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const recordId = sessionStorage.getItem("br_record_id");
    if (recordId) {
      fetchByRecordId(recordId);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchByRecordId(recordId: string) {
    setLoading(true);
    const res = await fetch(`/api/airtable/participant?recordId=${recordId}`);
    const data = await res.json();
    if (data?.id) {
      setRecord(data);
    }
    setLoading(false);
  }

  async function fetchByEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    const res = await fetch(`/api/airtable/participant?email=${encodeURIComponent(lookupEmail)}`);
    const data = await res.json();
    if (data?.id) {
      setRecord(data);
      sessionStorage.setItem("br_record_id", data.id);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  async function toggleMilestone(field: string, current: boolean) {
    if (!record) return;
    setUpdating(field);
    const res = await fetch("/api/airtable/milestone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: record.id, field, value: !current }),
    });
    const updated = await res.json();
    if (updated?.id) {
      setRecord({ ...record, fields: { ...record.fields, [field]: !current } });
    }
    setUpdating(null);
  }

  async function generateBio() {
    if (!record) return;
    setBio("");
    setBioLoading(true);
    try {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId: record.id }),
      });
      if (!res.body) return;
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setBio(prev => prev + dec.decode(value));
        bioRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      // Auto-mark "Board Bio Drafted" milestone
      if (!record.fields["Board Bio Drafted"]) {
        await fetch("/api/airtable/milestone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recordId: record.id, field: "Board Bio Drafted", value: true }),
        });
        setRecord(r => r ? { ...r, fields: { ...r.fields, "Board Bio Drafted": true } } : r);
      }
    } finally {
      setBioLoading(false);
    }
  }

  async function copyBio() {
    await navigator.clipboard.writeText(bio);
    setBioCopied(true);
    setTimeout(() => setBioCopied(false), 2000);
  }

  const f = record?.fields ?? {};
  const completedMilestones = MILESTONES.filter(m => f[m.field]).length;
  const progressPct = Math.round((completedMilestones / MILESTONES.length) * 100);
  const scorePercent = (f["Score Percent"] as number) ?? 0;

  const DIM_SCORE_KEYS = [
    { key: "Governance Score", label: "Governance & Fiduciary", module: "Module 2: Governance & Legal Duties", icon: "⚖️" },
    { key: "Financial Score", label: "Financial Oversight", module: "Module 3: Financial Literacy for Board Directors", icon: "📊" },
    { key: "Strategy Score", label: "Strategy & Risk", module: "Module 4: Strategy, Risk & CEO Oversight", icon: "♟️" },
    { key: "Human Capital Score", label: "Human Capital & ESG", module: "Module 5: Human Capital, ESG & Compensation", icon: "👥" },
    { key: "Board Dynamics Score", label: "Board Dynamics", module: "Module 6: Board Dynamics & Personal Positioning", icon: "🌟" },
  ];
  const lowestDim = DIM_SCORE_KEYS.reduce(
    (min, d) => ((f[d.key] as number ?? 0) < (f[min.key] as number ?? 0) ? d : min),
    DIM_SCORE_KEYS[0]
  );
  const nextMilestone = MILESTONES.find(m => !f[m.field]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // No record found — show lookup form
  if (!record) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-slate-50 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="text-5xl mb-4">📊</div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Track Your Progress</h1>
            <p className="text-gray-500 text-sm mb-6">
              Enter the email you used when you took your assessment.
            </p>
            <form onSubmit={fetchByEmail} className="space-y-4">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={lookupEmail}
                onChange={e => setLookupEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              {notFound && (
                <p className="text-red-500 text-xs">No record found. Make sure you&apos;ve completed the assessment first.</p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-all"
              >
                Look Up My Progress →
              </button>
            </form>
            <div className="mt-4">
              <Link href="/profile" className="text-indigo-600 text-sm font-semibold hover:underline">
                Haven&apos;t taken the assessment yet? Start here →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-950 to-indigo-800 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1 mb-4">
            {(f["Cohort"] as string) || "BoardReady Program"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Welcome back, {(f["Participant Name"] as string)?.split(" ")[0] || ""}
          </h1>
          <p className="text-indigo-300 text-sm mb-6">{f["Current Title"] as string} — Board Readiness Program</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">{scorePercent}%</div>
              <div className="text-indigo-300 text-xs mt-0.5">Board Readiness</div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">{completedMilestones}/{MILESTONES.length}</div>
              <div className="text-indigo-300 text-xs mt-0.5">Milestones Done</div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">{progressPct}%</div>
              <div className="text-indigo-300 text-xs mt-0.5">Program Progress</div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white">{(f["Coaching Sessions Completed"] as number) || 0}</div>
              <div className="text-indigo-300 text-xs mt-0.5">Coaching Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-semibold">Overall Program Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="flex-1 bg-slate-50 px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Your Next Step */}
          <section className="bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">⚡</span>
              <h2 className="font-extrabold text-lg">Your Next Step</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-wide text-indigo-300 mb-2">Highest-Leverage Gap</div>
                <div className="text-base font-extrabold mb-1">{lowestDim.icon} {lowestDim.label}</div>
                <div className="text-indigo-300 text-xs mb-4">
                  Score: {(f[lowestDim.key] as number) ?? 0}/16 — focus here to move your readiness score fastest
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-indigo-400 mb-0.5">Recommended Module</div>
                  <div className="text-sm font-semibold text-white">{lowestDim.module}</div>
                </div>
                <Link href="/educate" className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
                  Go to Educate →
                </Link>
              </div>
              {nextMilestone && (
                <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-indigo-300 mb-2">Next Milestone</div>
                  <div className="text-base font-extrabold mb-1">{nextMilestone.icon} {nextMilestone.label}</div>
                  <div className="text-indigo-300 text-xs mb-4">
                    Mark it complete below when done — each milestone unlocks the next phase
                  </div>
                  <Link
                    href={["/educate", "/convene", "/access"][nextMilestone.phase - 1]}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                  >
                    Go to Phase {nextMilestone.phase} →
                  </Link>
                </div>
              )}
            </div>
          </section>

          {[1, 2, 3].map(phase => {
            const phaseLabels = ["Phase 1: Educate", "Phase 2: Convene", "Phase 3: Access"];
            const phaseLinks = ["/educate", "/convene", "/access"];
            const phaseMilestones = MILESTONES.filter(m => m.phase === phase);
            const phaseComplete = phaseMilestones.filter(m => f[m.field]).length;
            return (
              <section key={phase}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-extrabold">{phase}</div>
                    <h2 className="font-extrabold text-gray-900">{phaseLabels[phase - 1]}</h2>
                    <span className="text-xs text-gray-500 font-medium">{phaseComplete}/{phaseMilestones.length} complete</span>
                  </div>
                  <Link href={phaseLinks[phase - 1]} className="text-xs text-indigo-600 font-semibold hover:underline">
                    View phase →
                  </Link>
                </div>
                <div className="space-y-2">
                  {phaseMilestones.map(m => {
                    const done = !!f[m.field];
                    const isUpdating = updating === m.field;
                    return (
                      <div
                        key={m.field}
                        className={`bg-white border rounded-xl px-5 py-4 flex items-center gap-4 transition-all ${done ? "border-indigo-100 bg-indigo-50/30" : "border-gray-100 hover:border-indigo-200"}`}
                      >
                        <button
                          onClick={() => toggleMilestone(m.field, done)}
                          disabled={isUpdating}
                          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            done
                              ? "bg-indigo-500 border-indigo-500 text-white"
                              : "border-gray-300 hover:border-indigo-400"
                          } ${isUpdating ? "opacity-50" : ""}`}
                        >
                          {done && <span className="text-xs font-bold">✓</span>}
                        </button>
                        <span className="text-lg">{m.icon}</span>
                        <span className={`text-sm font-medium flex-1 ${done ? "line-through text-gray-400" : "text-gray-800"}`}>
                          {m.label}
                        </span>
                        {done && <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">Done</span>}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Scores summary */}
          <section>
            <h2 className="font-extrabold text-gray-900 mb-4">Your Assessment Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Governance & Fiduciary", key: "Governance Score" },
                { label: "Financial Oversight", key: "Financial Score" },
                { label: "Strategy & Risk", key: "Strategy Score" },
                { label: "Human Capital & ESG", key: "Human Capital Score" },
                { label: "Board Dynamics", key: "Board Dynamics Score" },
              ].map(dim => {
                const score = (f[dim.key] as number) ?? 0;
                const pct = Math.round((score / 16) * 100);
                return (
                  <div key={dim.key} className="bg-white border border-gray-100 rounded-xl p-4">
                    <div className="text-xs font-semibold text-gray-500 mb-2">{dim.label}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-extrabold text-indigo-600">{score}</span>
                      <span className="text-gray-400 text-sm">/16</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Board Bio Builder */}
          <section>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">✍️</span>
                    <h2 className="text-white font-extrabold text-lg">Board Biography Builder</h2>
                    <span className="text-[10px] font-bold bg-indigo-400/30 text-indigo-200 border border-indigo-400/30 rounded-full px-2 py-0.5 uppercase tracking-wide">AI-Powered</span>
                  </div>
                  <p className="text-indigo-300 text-xs">A board-ready biography tailored to your profile and assessment scores</p>
                </div>
                {bio && !bioLoading && (
                  <button
                    onClick={copyBio}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    {bioCopied ? "✓ Copied!" : "Copy Bio"}
                  </button>
                )}
              </div>

              <div className="p-6">
                {!bio && !bioLoading && (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-5">
                      Claude will draft a 250–300 word biography in third person, grounded in your assessment scores — ready for board search firms and nominating committees.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {["Third-person prose", "Spencer Stuart ready", "Governance language", "Score-informed strengths"].map(tag => (
                        <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-3 py-1 font-medium">{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={generateBio}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
                    >
                      ✨ Generate My Board Bio
                    </button>
                  </div>
                )}

                {bioLoading && !bio && (
                  <div className="flex items-center gap-3 py-8 text-gray-500 text-sm">
                    <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    Drafting your biography…
                  </div>
                )}

                {bio && (
                  <div ref={bioRef}>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-serif text-[15px]">
                      {bio}
                      {bioLoading && <span className="inline-block w-0.5 h-4 bg-indigo-400 animate-pulse ml-0.5 align-text-bottom" />}
                    </div>
                    {!bioLoading && (
                      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                        <button
                          onClick={copyBio}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                        >
                          {bioCopied ? "✓ Copied!" : "📋 Copy to Clipboard"}
                        </button>
                        <button
                          onClick={generateBio}
                          className="bg-white hover:bg-slate-50 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                        >
                          ↻ Regenerate
                        </button>
                        <span className="text-xs text-gray-400 ml-auto">Milestone &quot;Board Biography Drafted&quot; marked complete ✓</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs no-print">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS } from "@/lib/data";
import Navbar from "@/app/components/Navbar";

const DIM_ICONS = ["⚖️", "📊", "♟️", "👥", "🤝"];

export default function AssessmentPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Guard: profile must exist
  useEffect(() => {
    if (!sessionStorage.getItem("br_profile")) router.replace("/profile");
  }, [router]);

  const q = QUESTIONS[current];
  const totalAnswered = Object.keys(answers).length;
  const pct = Math.round((totalAnswered / QUESTIONS.length) * 100);
  const isLast = current === QUESTIONS.length - 1;

  function selectAnswer(val: number) {
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    setError(false);
    // Auto-advance after short delay unless last question
    if (!isLast) {
      setTimeout(() => goTo(current + 1, newAnswers), 350);
    }
  }

  function goTo(next: number, ans = answers) {
    if (next > current && !ans[q.id]) {
      setError(true);
      cardRef.current?.classList.add("shake");
      setTimeout(() => cardRef.current?.classList.remove("shake"), 400);
      return;
    }
    setError(false);
    setCurrent(Math.max(0, Math.min(QUESTIONS.length - 1, next)));
  }

  function handleSubmit() {
    if (!answers[q.id]) {
      setError(true);
      return;
    }
    sessionStorage.setItem("br_answers", JSON.stringify(answers));
    router.push("/results");
  }

  // Dim completion tracking
  const dimAnswered = DIMENSIONS.map((_, di) =>
    QUESTIONS.filter((x) => x.dim === di).every((x) => !!answers[x.id])
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header with progress */}
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-800 text-white px-6 py-10 text-center">
        <div className="inline-block text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1 mb-4">
          Step 2 of 2
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Board Readiness Assessment</h1>
        <p className="text-indigo-200 text-sm max-w-md mx-auto mb-6">
          20 questions across 5 competency dimensions. Answer honestly — this is your personal baseline, not a test.
        </p>
        {/* Progress bar */}
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between text-xs text-indigo-300 mb-1.5">
            <span>Question {current + 1} of {QUESTIONS.length}</span>
            <span>{pct}% complete</span>
          </div>
          <div className="h-2 bg-indigo-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-300 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dimension tabs */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10 shadow-sm no-print">
        <div className="max-w-2xl mx-auto flex gap-2 overflow-x-auto">
          {DIMENSIONS.map((dim, di) => {
            const isActive = QUESTIONS[current].dim === di;
            const isDone = dimAnswered[di];
            return (
              <button
                key={dim}
                onClick={() => {
                  const firstInDim = QUESTIONS.findIndex(x => x.dim === di);
                  if (firstInDim >= 0) setCurrent(firstInDim);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isDone
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                <span>{DIM_ICONS[di]}</span>
                <span className="hidden sm:inline">{dim.split(" & ")[0].split(" ").slice(0, 2).join(" ")}</span>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                  bg-white/30 border border-white/20">{di + 1}</span>
                {isDone && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 bg-slate-50 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div
            ref={cardRef}
            key={current}
            className="bg-white rounded-2xl shadow-md p-7 slide-up"
          >
            {/* Question header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
                {DIM_ICONS[q.dim]} {DIMENSIONS[q.dim]}
              </span>
              <span className="text-xs text-gray-400 font-semibold">{current + 1} / {QUESTIONS.length}</span>
            </div>

            <h2 className={`text-lg font-bold leading-snug mb-6 transition-colors ${error ? "text-red-500" : "text-gray-900"}`}>
              {q.text}
            </h2>
            {error && (
              <p className="text-red-500 text-xs mb-4 font-medium">Please select an answer to continue.</p>
            )}

            {/* Options */}
            <div className="space-y-3">
              {q.options.map(([val, label]) => {
                const selected = answers[q.id] === val;
                return (
                  <button
                    key={val}
                    onClick={() => selectAnswer(val)}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                      selected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                    }`}>
                      {selected && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wide mb-0.5 ${selected ? "text-indigo-600" : "text-gray-400"}`}>
                        Level {val}
                      </div>
                      <div className="text-sm text-gray-700 leading-snug">{label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5 no-print">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {isLast ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-2.5 rounded-full text-sm transition-all shadow-md hover:-translate-y-0.5"
              >
                ✓ View My Results
              </button>
            ) : (
              <button
                onClick={() => goTo(current + 1)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all hover:-translate-y-0.5"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs no-print">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

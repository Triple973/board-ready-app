"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";
import Navbar from "@/app/components/Navbar";

export default function ProfilePage() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const profile = Object.fromEntries(fd.entries());
    sessionStorage.setItem("br_profile", JSON.stringify(profile));
    router.push("/assessment");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-800 text-white px-6 py-12 text-center">
        <div className="inline-block text-indigo-300 text-xs font-bold tracking-widest uppercase bg-indigo-900/40 border border-indigo-700/40 rounded-full px-4 py-1 mb-4">
          Step 1 of 2
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Tell Us About You</h1>
        <p className="text-indigo-200 max-w-md mx-auto leading-relaxed">
          This context helps BoardReady and Claude AI give you a truly personalized analysis.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 bg-slate-50 px-4 py-10">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
              <input name="name" type="text" required placeholder="e.g., Jennifer Martinez"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Work Email</label>
              <input name="email" type="email" required placeholder="e.g., jennifer@company.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Title</label>
              <input name="title" type="text" placeholder="e.g., Chief People Officer" defaultValue="CHRO"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
              <input name="company" type="text" required placeholder="e.g., Acme Corporation"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Years in CHRO / CPO Role</label>
              <select name="years_chro" required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white">
                <option value="" disabled>Select range</option>
                <option>Less than 2 years</option>
                <option>2–4 years</option>
                <option>5–9 years</option>
                <option>10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Industry</label>
              <input name="industry" type="text" required placeholder="e.g., Technology, Healthcare, Financial Services"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Size</label>
              <select name="company_size" required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white">
                <option value="" disabled>Select size</option>
                <option>Small (&lt;$500M revenue)</option>
                <option>Mid-market ($500M–$2B revenue)</option>
                <option>Large ($2B–$10B revenue)</option>
                <option>Fortune 500 ($10B+ revenue)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Board / Advisory Experience</label>
              <select name="board_exp" required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white">
                <option value="" disabled>Select experience level</option>
                <option>None — this will be my first board seat</option>
                <option>Advisory board(s) only</option>
                <option>Nonprofit board(s)</option>
                <option>Private company board</option>
                <option>Public company board</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Goal: When do you want to be on a board?</label>
              <select name="goal_timeline" required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white">
                <option value="" disabled>Select timeline</option>
                <option>Within 12 months — actively searching now</option>
                <option>1–2 years — building toward it</option>
                <option>2–3 years — early preparation stage</option>
                <option>Exploring — not sure of timeline yet</option>
              </select>
            </div>

            <button type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md mt-2">
              Continue to Assessment →
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-indigo-950 text-center py-4 text-indigo-500 text-xs no-print">
        BoardReady — Powered by Claude AI
      </footer>
    </div>
  );
}

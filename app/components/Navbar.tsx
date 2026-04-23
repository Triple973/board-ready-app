"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/educate", label: "Educate", icon: "🎓", desc: "Phase 1" },
  { href: "/convene", label: "Convene", icon: "🤝", desc: "Phase 2" },
  { href: "/access",  label: "Access",  icon: "🚀", desc: "Phase 3" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-950 to-indigo-800 shadow-lg no-print">
      {/* Top bar */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-indigo-700/40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-indigo-300 text-xl">♟</span>
          <span className="text-white font-extrabold text-lg tracking-tight">BoardReady</span>
          <span className="text-xs text-indigo-300 bg-indigo-900/50 border border-indigo-700/50 rounded-full px-2.5 py-0.5 font-semibold hidden sm:inline">for CHROs</span>
        </Link>
        <Link
          href="/profile"
          className="text-xs font-bold text-indigo-200 bg-indigo-700/50 border border-indigo-600/50 hover:bg-indigo-600/60 px-4 py-1.5 rounded-full transition-all"
        >
          Take Assessment →
        </Link>
      </div>

      {/* Phase tabs */}
      <div className="px-6 flex gap-1 overflow-x-auto">
        <Link
          href="/"
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
            path === "/"
              ? "border-indigo-300 text-white"
              : "border-transparent text-indigo-400 hover:text-indigo-200"
          }`}
        >
          Overview
        </Link>
        {TABS.map((t) => {
          const active = path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                active
                  ? "border-indigo-300 text-white"
                  : "border-transparent text-indigo-400 hover:text-indigo-200"
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline text-[10px] text-indigo-500 font-normal">{t.desc} —</span>
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const ADMIN_PIN = "boardready";

// ── Types ─────────────────────────────────────────────────────────────────────
type Participant = { id: string; fields: Record<string, unknown> };
type Touchpoint = { id: string; fields: Record<string, unknown> };
type Executive = { id: string; fields: Record<string, unknown> };

// ── Constants ─────────────────────────────────────────────────────────────────
const MILESTONES = [
  "Assessment Completed", "Module 1 Complete", "Module 2 Complete",
  "Module 3 Complete", "Module 4 Complete", "Module 5 Complete",
  "Module 6 Complete", "Attended Roundtable", "Board Bio Drafted",
  "Search Firm Intro Done",
];
const DIM_KEYS = ["Governance Score", "Financial Score", "Strategy Score", "Human Capital Score", "Board Dynamics Score"];
const STATUS_COLORS: Record<string, string> = {
  "In Progress":  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Not Started":  "bg-gray-50 text-gray-500 border-gray-200",
  "Completed":    "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Deferred":     "bg-amber-50 text-amber-700 border-amber-200",
  "Withdrawn":    "bg-red-50 text-red-600 border-red-200",
};
const TOUCHPOINT_TYPES = ["Call", "Email", "In-Person", "Slack", "Coaching Session", "Event"];
const COHORT_OPTIONS = ["Cohort 1 — Spring 2026", "Cohort 2 — Fall 2026", "Cohort 3 — Spring 2027"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysAgo(dateStr: string) {
  if (!dateStr) return 999;
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}
function getCompany(notes: string) {
  return (notes || "").match(/Company: (.+)/)?.[1] || "";
}

// ── PIN Gate ──────────────────────────────────────────────────────────────────
function PinGate({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) { onAuth(); } else { setErr(true); }
  }
  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🏛️</div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Program Admin</h1>
        <p className="text-gray-400 text-sm mb-6">BoardReady Cohort Management</p>
        <form onSubmit={submit} className="space-y-4">
          <input type="password" placeholder="Enter PIN" value={pin}
            onChange={e => { setPin(e.target.value); setErr(false); }}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center tracking-widest transition" />
          {err && <p className="text-red-500 text-xs">Incorrect PIN.</p>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
            Enter →
          </button>
        </form>
        <Link href="/" className="block mt-4 text-xs text-gray-400 hover:text-gray-600">← Back to app</Link>
      </div>
    </div>
  );
}

// ── Touchpoint Form ───────────────────────────────────────────────────────────
function TouchpointForm({ participant, onSaved }: { participant: Participant; onSaved: () => void }) {
  const [form, setForm] = useState({ type: "Call", date: new Date().toISOString().split("T")[0], notes: "", actionItem: "", followUpDate: "", loggedBy: "" });
  const [saving, setSaving] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/airtable/touchpoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, participantId: participant.id, participantName: participant.fields["Participant Name"] }),
    });
    setSaving(false);
    setForm({ type: "Call", date: new Date().toISOString().split("T")[0], notes: "", actionItem: "", followUpDate: "", loggedBy: "" });
    onSaved();
  }
  return (
    <form onSubmit={submit} className="space-y-3 bg-slate-50 border border-gray-100 rounded-xl p-4">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Log Touchpoint</div>
      <div className="grid grid-cols-2 gap-2">
        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
          {TOUCHPOINT_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      </div>
      <textarea placeholder="Notes from this interaction…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
      <input placeholder="Action item (optional)" value={form.actionItem} onChange={e => setForm(f => ({ ...f, actionItem: e.target.value }))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div className="grid grid-cols-2 gap-2">
        <input type="date" placeholder="Follow-up date" value={form.followUpDate} onChange={e => setForm(f => ({ ...f, followUpDate: e.target.value }))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input placeholder="Logged by" value={form.loggedBy} onChange={e => setForm(f => ({ ...f, loggedBy: e.target.value }))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      </div>
      <button type="submit" disabled={saving}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-sm transition-all disabled:opacity-50">
        {saving ? "Saving…" : "Save Touchpoint"}
      </button>
    </form>
  );
}

// ── Participant Drawer ────────────────────────────────────────────────────────
function ParticipantDrawer({
  participant, executives, onClose, onUpdate,
}: {
  participant: Participant;
  executives: Executive[];
  onClose: () => void;
  onUpdate: (id: string, fields: Record<string, unknown>) => void;
}) {
  const f = participant.fields;
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([]);
  const [notes, setNotes] = useState((f["Admin Notes"] as string) || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [status, setStatus] = useState((f["Program Status"] as string) || "Not Started");
  const [tab, setTab] = useState<"overview" | "touchpoints" | "milestones">("overview");

  const loadTouchpoints = useCallback(async () => {
    const res = await fetch(`/api/airtable/touchpoints?participantId=${participant.id}`);
    setTouchpoints(await res.json());
  }, [participant.id]);

  useEffect(() => { loadTouchpoints(); }, [loadTouchpoints]);

  async function saveNotes() {
    setSavingNotes(true);
    await fetch("/api/airtable/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: participant.id, fields: { "Admin Notes": notes } }),
    });
    onUpdate(participant.id, { "Admin Notes": notes });
    setSavingNotes(false);
  }

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    await fetch("/api/airtable/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: participant.id, fields: { "Program Status": newStatus } }),
    });
    onUpdate(participant.id, { "Program Status": newStatus });
  }

  async function toggleMilestone(field: string, current: boolean) {
    await fetch("/api/airtable/milestone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: participant.id, field, value: !current }),
    });
    onUpdate(participant.id, { [field]: !current });
  }

  const score = (f["Score Percent"] as number) || 0;
  const doneMilestones = MILESTONES.filter(m => f[m]).length;
  const company = getCompany(f["Notes"] as string);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Drawer header */}
        <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white font-extrabold text-lg">{f["Participant Name"] as string}</div>
              <div className="text-indigo-300 text-sm">{f["Current Title"] as string}{company ? ` · ${company}` : ""}</div>
              {!!f["Email"] && <div className="text-indigo-400 text-xs mt-0.5">{f["Email"] as string}</div>}
            </div>
            <button onClick={onClose} className="text-indigo-300 hover:text-white text-xl mt-1">✕</button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <div className="text-white font-extrabold text-xl">{score}%</div>
              <div className="text-indigo-400 text-[10px]">Readiness</div>
            </div>
            <div className="text-center">
              <div className="text-white font-extrabold text-xl">{doneMilestones}/10</div>
              <div className="text-indigo-400 text-[10px]">Milestones</div>
            </div>
            <div className="text-center">
              <div className="text-white font-extrabold text-xl">{touchpoints.length}</div>
              <div className="text-indigo-400 text-[10px]">Touchpoints</div>
            </div>
            <div className="ml-auto">
              <select value={status} onChange={e => updateStatus(e.target.value)}
                className="text-xs font-bold rounded-full px-3 py-1.5 border bg-white/10 text-white border-white/20 focus:outline-none">
                {["Not Started", "In Progress", "Completed", "Deferred", "Withdrawn"].map(s => (
                  <option key={s} value={s} className="text-gray-900">{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          {(["overview", "touchpoints", "milestones"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-bold capitalize transition-colors ${tab === t ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-400 hover:text-gray-600"}`}>
              {t === "touchpoints" ? `Touchpoints (${touchpoints.length})` : t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {tab === "overview" && (
            <>
              {/* Dimension scores */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Assessment Scores</div>
                <div className="space-y-2">
                  {DIM_KEYS.map(key => {
                    const s = (f[key] as number) || 0;
                    const pct = Math.round((s / 16) * 100);
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div className="text-xs text-gray-500 w-36 flex-shrink-0 leading-tight">{key.replace(" Score", "")}</div>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct >= 75 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${pct}%` }} />
                        </div>
                        <div className="text-xs font-bold text-gray-700 w-8 text-right">{s}/16</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin notes */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Admin Notes</div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                  placeholder="Internal notes visible only to admins…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
                <button onClick={saveNotes} disabled={savingNotes}
                  className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50">
                  {savingNotes ? "Saving…" : "Save Notes"}
                </button>
              </div>

              {/* Profile info */}
              {!!f["Notes"] && (
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Profile</div>
                  <div className="bg-slate-50 rounded-xl p-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {f["Notes"] as string}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "touchpoints" && (
            <>
              <TouchpointForm participant={participant} onSaved={loadTouchpoints} />
              {touchpoints.length > 0 && (
                <div className="space-y-3">
                  {touchpoints.map(tp => {
                    const tf = tp.fields;
                    return (
                      <div key={tp.id} className="bg-white border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5">
                            {tf["Type"] as string}
                          </span>
                          <span className="text-xs text-gray-400">{tf["Date"] as string}</span>
                        </div>
                        {!!tf["Notes"] && <p className="text-sm text-gray-700 leading-relaxed">{tf["Notes"] as string}</p>}
                        {!!tf["Action Item"] && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <span className="text-indigo-500 text-xs mt-0.5">→</span>
                            <span className="text-xs font-semibold text-gray-700">{tf["Action Item"] as string}</span>
                          </div>
                        )}
                        {!!tf["Follow Up Date"] && (
                          <div className="mt-1.5 text-[11px] text-amber-600 font-semibold">
                            📅 Follow up: {tf["Follow Up Date"] as string}
                          </div>
                        )}
                        {!!tf["Logged By"] && (
                          <div className="mt-1.5 text-[11px] text-gray-400">Logged by {tf["Logged By"] as string}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {touchpoints.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-6">No touchpoints logged yet.</div>
              )}
            </>
          )}

          {tab === "milestones" && (
            <div className="space-y-2">
              {MILESTONES.map(m => {
                const done = !!f[m];
                return (
                  <div key={m} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${done ? "bg-indigo-50/40 border-indigo-100" : "bg-white border-gray-100"}`}>
                    <button onClick={() => toggleMilestone(m, done)}
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all text-xs font-bold ${done ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-300 hover:border-indigo-400"}`}>
                      {done && "✓"}
                    </button>
                    <span className={`text-sm flex-1 ${done ? "line-through text-gray-400" : "text-gray-700"}`}>{m}</span>
                    {done && <span className="text-[10px] font-bold text-indigo-500">Done</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"cohort" | "alerts" | "enroll" | "cohorts">("cohort");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Participant | null>(null);
  const [enrollForm, setEnrollForm] = useState({ name: "", email: "", title: "CHRO", company: "", industry: "", company_size: "", sfdc_id: "", cohort: "Cohort 1 — Spring 2026" });
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [cohortRes, execRes] = await Promise.all([
      fetch("/api/airtable/cohort"),
      fetch("/api/airtable/executives"),
    ]);
    setParticipants(await cohortRes.json());
    setExecutives(await execRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  function updateParticipant(id: string, fields: Record<string, unknown>) {
    setParticipants(prev => prev.map(p =>
      p.id === id ? { ...p, fields: { ...p.fields, ...fields } } : p
    ));
    if (selected?.id === id) {
      setSelected(prev => prev ? { ...prev, fields: { ...prev.fields, ...fields } } : prev);
    }
  }

  async function enroll(e: React.FormEvent) {
    e.preventDefault();
    setEnrolling(true);
    await fetch("/api/airtable/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollForm),
    });
    setEnrolling(false);
    setEnrollSuccess(true);
    setEnrollForm({ name: "", email: "", title: "CHRO", company: "", industry: "", company_size: "", sfdc_id: "", cohort: "Cohort 1 — Spring 2026" });
    setTimeout(() => setEnrollSuccess(false), 3000);
    fetchAll();
  }

  async function toggleFlag(p: Participant) {
    const current = !!p.fields["Flag for Attention"];
    await fetch("/api/airtable/milestone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: p.id, field: "Flag for Attention", value: !current }),
    });
    updateParticipant(p.id, { "Flag for Attention": !current });
  }

  if (!authed) return <PinGate onAuth={() => setAuthed(true)} />;

  const filtered = participants.filter(p => {
    const q = search.toLowerCase();
    return (
      ((p.fields["Participant Name"] as string) || "").toLowerCase().includes(q) ||
      getCompany(p.fields["Notes"] as string).toLowerCase().includes(q) ||
      ((p.fields["Email"] as string) || "").toLowerCase().includes(q)
    );
  });

  const flagged = participants.filter(p => p.fields["Flag for Attention"]);
  const stalled = participants.filter(p => daysAgo(p.fields["Last Active"] as string) > 7 && p.fields["Program Status"] === "In Progress");
  const notStarted = participants.filter(p => !p.fields["Assessment Completed"]);
  const avgScore = participants.length
    ? Math.round(participants.reduce((a, p) => a + ((p.fields["Score Percent"] as number) || 0), 0) / participants.length)
    : 0;

  const cohortGroups = COHORT_OPTIONS.reduce<Record<string, Participant[]>>((acc, c) => {
    acc[c] = participants.filter(p => p.fields["Cohort"] === c);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-indigo-300 text-xl">♟</span>
            <span className="text-white font-extrabold text-lg tracking-tight">BoardReady</span>
          </Link>
          <span className="text-xs text-indigo-300 bg-indigo-900/50 border border-indigo-700/40 rounded-full px-3 py-0.5 font-bold">Program Admin</span>
        </div>
        <button onClick={fetchAll} className="text-xs font-semibold text-indigo-300 hover:text-white transition-colors">↻ Refresh</button>
      </header>

      {/* Tab nav */}
      <div className="bg-white border-b border-gray-100 px-6 flex gap-1">
        {([
          { key: "cohort", label: "Cohort", count: participants.length },
          { key: "alerts", label: "Alerts", count: flagged.length + stalled.length },
          { key: "enroll", label: "Enroll Participant" },
          { key: "cohorts", label: "Cohort Management" },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${tab === t.key ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
            {t.label}
            {"count" in t && t.count > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${t.key === "alerts" && t.count > 0 ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-600"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full">

        {/* ── COHORT TAB ── */}
        {tab === "cohort" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: "Enrolled", value: participants.length, color: "text-gray-900" },
                { label: "Active", value: participants.filter(p => p.fields["Program Status"] === "In Progress").length, color: "text-indigo-600" },
                { label: "Assessment Done", value: participants.filter(p => p.fields["Assessment Completed"]).length, color: "text-emerald-600" },
                { label: "Need Attention", value: flagged.length + stalled.length, color: "text-amber-600" },
                { label: "Avg Readiness", value: `${avgScore}%`, color: "text-violet-600" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                  <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400 font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
                <h2 className="font-extrabold text-gray-900">All Participants</h2>
                <input type="text" placeholder="Search name, company, email…" value={search} onChange={e => setSearch(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64 transition" />
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">
                  {participants.length === 0 ? "No participants yet. Use the Enroll tab to add someone." : "No results."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-slate-50/50">
                        <th className="px-6 py-3">Participant</th>
                        <th className="px-4 py-3">Readiness</th>
                        <th className="px-4 py-3 hidden lg:table-cell">Dimensions</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Last Active</th>
                        <th className="px-4 py-3">Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filtered.map(p => {
                        const f = p.fields;
                        const isFlagged = !!f["Flag for Attention"];
                        const isStalled = daysAgo(f["Last Active"] as string) > 7 && f["Program Status"] === "In Progress";
                        const status = (f["Program Status"] as string) || "Not Started";
                        const score = (f["Score Percent"] as number) || 0;
                        const done = MILESTONES.filter(m => f[m]).length;
                        const company = getCompany(f["Notes"] as string);
                        const lastActive = f["Last Active"] as string;
                        const days = daysAgo(lastActive);
                        return (
                          <tr key={p.id}
                            onClick={() => setSelected(p)}
                            className={`hover:bg-indigo-50/30 cursor-pointer transition-colors ${isFlagged ? "bg-amber-50/40" : ""} ${isStalled ? "bg-orange-50/20" : ""}`}>
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900">{f["Participant Name"] as string}</div>
                              <div className="text-xs text-gray-400">{f["Current Title"] as string}{company ? ` · ${company}` : ""}</div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-extrabold text-indigo-600">{score}%</span>
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1">
                                <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${score}%` }} />
                              </div>
                            </td>
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <div className="flex gap-1 items-end h-8">
                                {DIM_KEYS.map(key => {
                                  const s = (f[key] as number) || 0;
                                  const pct = Math.round((s / 16) * 100);
                                  const color = pct >= 75 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400";
                                  return (
                                    <div key={key} title={`${key}: ${s}/16`} className="w-3 h-8 bg-gray-100 rounded-sm overflow-hidden flex flex-col-reverse">
                                      <div className={`${color} rounded-sm`} style={{ height: `${pct}%` }} />
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-gray-700 font-semibold">{done}</span>
                              <span className="text-gray-400 text-xs"> / 10</span>
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1">
                                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.round((done / 10) * 100)}%` }} />
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[status] || STATUS_COLORS["Not Started"]}`}>
                                {status}
                              </span>
                              {isStalled && <div className="text-[10px] text-orange-500 font-semibold mt-0.5">Stalled</div>}
                            </td>
                            <td className="px-4 py-4 text-xs text-gray-400">
                              {lastActive ? (days === 0 ? "Today" : `${days}d ago`) : "—"}
                            </td>
                            <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                              <button onClick={() => toggleFlag(p)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${isFlagged ? "bg-amber-100 text-amber-600 hover:bg-amber-200" : "bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-500"}`}
                                title={isFlagged ? "Remove flag" : "Flag for attention"}>
                                🚩
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                <span>{filtered.length} participants</span>
                <a href="https://airtable.com/appG2E5PU2uVczwaz/tblpXZ3iPpyakwKyi" target="_blank" rel="noreferrer" className="underline hover:text-gray-600">
                  Open in Airtable →
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── ALERTS TAB ── */}
        {tab === "alerts" && (
          <div className="space-y-6">
            {/* Flagged */}
            <section>
              <h2 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                🚩 Flagged for Attention
                <span className="text-sm font-semibold text-amber-600">({flagged.length})</span>
              </h2>
              {flagged.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 text-sm">No flagged participants.</div>
              ) : flagged.map(p => (
                <div key={p.id} onClick={() => setSelected(p)} className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-2 cursor-pointer hover:border-amber-300 transition-all flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{p.fields["Participant Name"] as string}</div>
                    <div className="text-xs text-gray-500">{p.fields["Current Title"] as string} · {getCompany(p.fields["Notes"] as string)}</div>
                  </div>
                  <span className="text-xs text-amber-600 font-semibold">View →</span>
                </div>
              ))}
            </section>

            {/* Stalled */}
            <section>
              <h2 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                ⏸ Stalled (no activity in 7+ days)
                <span className="text-sm font-semibold text-orange-600">({stalled.length})</span>
              </h2>
              {stalled.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 text-sm">No stalled participants.</div>
              ) : stalled.map(p => (
                <div key={p.id} onClick={() => setSelected(p)} className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-2 cursor-pointer hover:border-orange-300 transition-all flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{p.fields["Participant Name"] as string}</div>
                    <div className="text-xs text-gray-500">{daysAgo(p.fields["Last Active"] as string)} days since last activity</div>
                  </div>
                  <span className="text-xs text-orange-600 font-semibold">View →</span>
                </div>
              ))}
            </section>

            {/* Not started assessment */}
            <section>
              <h2 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                📋 Assessment Not Completed
                <span className="text-sm font-semibold text-gray-500">({notStarted.length})</span>
              </h2>
              {notStarted.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 text-sm">Everyone has completed the assessment.</div>
              ) : notStarted.map(p => (
                <div key={p.id} onClick={() => setSelected(p)} className="bg-white border border-gray-100 rounded-2xl p-4 mb-2 cursor-pointer hover:border-indigo-200 transition-all flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{p.fields["Participant Name"] as string}</div>
                    <div className="text-xs text-gray-500">{p.fields["Email"] as string}</div>
                  </div>
                  <span className="text-xs text-indigo-600 font-semibold">View →</span>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ── ENROLL TAB ── */}
        {tab === "enroll" && (
          <div className="max-w-xl">
            <h2 className="font-extrabold text-gray-900 mb-1">Enroll a CHRO</h2>
            <p className="text-gray-500 text-sm mb-6">Add a participant manually — they&apos;ll complete the assessment themselves after enrollment.</p>
            {enrollSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm rounded-xl px-4 py-3 mb-4">
                ✓ Participant enrolled successfully.
              </div>
            )}
            <form onSubmit={enroll} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input required value={enrollForm.name} onChange={e => setEnrollForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jennifer Martinez"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Work Email *</label>
                  <input required type="email" value={enrollForm.email} onChange={e => setEnrollForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jennifer@company.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input value={enrollForm.title} onChange={e => setEnrollForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="CHRO"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                  <input value={enrollForm.company} onChange={e => setEnrollForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Acme Corp"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
                  <input value={enrollForm.industry} onChange={e => setEnrollForm(f => ({ ...f, industry: e.target.value }))}
                    placeholder="Technology"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Size</label>
                  <select value={enrollForm.company_size} onChange={e => setEnrollForm(f => ({ ...f, company_size: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white transition">
                    <option value="">Select…</option>
                    <option>Small (&lt;$500M revenue)</option>
                    <option>Mid-market ($500M–$2B revenue)</option>
                    <option>Large ($2B–$10B revenue)</option>
                    <option>Fortune 500 ($10B+ revenue)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">SFDC Account ID</label>
                  <input value={enrollForm.sfdc_id} onChange={e => setEnrollForm(f => ({ ...f, sfdc_id: e.target.value }))}
                    placeholder="0013000000ABC"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Assign to Cohort</label>
                  <select value={enrollForm.cohort} onChange={e => setEnrollForm(f => ({ ...f, cohort: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white transition">
                    {COHORT_OPTIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={enrolling}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50">
                {enrolling ? "Enrolling…" : "Enroll Participant →"}
              </button>
            </form>
          </div>
        )}

        {/* ── COHORTS TAB ── */}
        {tab === "cohorts" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-extrabold text-gray-900 mb-1">Cohort Overview</h2>
              <p className="text-gray-500 text-sm mb-6">Track enrollment across all program cohorts.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {COHORT_OPTIONS.map(c => {
                  const members = cohortGroups[c] || [];
                  const active = members.filter(p => p.fields["Program Status"] === "In Progress").length;
                  return (
                    <div key={c} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <div className="font-extrabold text-gray-900 text-sm mb-3">{c}</div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-extrabold text-indigo-600">{members.length}</div>
                          <div className="text-[10px] text-gray-400 font-semibold">Enrolled</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-extrabold text-emerald-600">{active}</div>
                          <div className="text-[10px] text-gray-400 font-semibold">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-extrabold text-gray-400">{15 - members.length}</div>
                          <div className="text-[10px] text-gray-400 font-semibold">Spots Left</div>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${Math.min((members.length / 15) * 100, 100)}%` }} />
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 text-right">{members.length}/15 capacity</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="max-w-sm">
              <h3 className="font-extrabold text-gray-900 mb-3">Add New Cohort</h3>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
                <input value={newCohortName} onChange={e => setNewCohortName(e.target.value)}
                  placeholder="e.g., Cohort 4 — Fall 2027"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
                <button
                  onClick={() => {
                    if (newCohortName) {
                      COHORT_OPTIONS.push(newCohortName);
                      setNewCohortName("");
                    }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all">
                  Create Cohort
                </button>
                <p className="text-xs text-gray-400">New cohort will appear in the Enroll tab dropdown immediately.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Participant drawer */}
      {selected && (
        <ParticipantDrawer
          participant={selected}
          executives={executives}
          onClose={() => setSelected(null)}
          onUpdate={updateParticipant}
        />
      )}
    </div>
  );
}

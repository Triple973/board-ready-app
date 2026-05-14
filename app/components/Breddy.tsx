"use client";

import { useEffect, useRef, useState } from "react";
import { computeScores, type Profile } from "@/lib/data";

type Message = { role: "user" | "assistant"; content: string };

type UserContext = {
  name?: string;
  title?: string;
  company?: string;
  industry?: string;
  years_chro?: string;
  company_size?: string;
  goal_timeline?: string;
  board_exp?: string;
  dimScores?: number[];
};

const QUICK_CHIPS = [
  { label: "📊 Explain my scores", prompt: "Can you walk me through what my assessment scores mean and what they say about my board readiness?" },
  { label: "✉️ Draft search firm email", prompt: "Help me draft an outreach email to a board search partner — I'm ready to start positioning myself for a board seat." },
  { label: "🎯 What should I do next?", prompt: "Based on my profile and where I am right now, what's the single highest-priority thing I should do to move toward a board seat?" },
  { label: "⚖️ How do boards work?", prompt: "Give me a concise primer on how corporate boards are structured, key committees, and what independent directors are actually responsible for." },
];

function renderBubble(text: string): string {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
}

function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/#{1,6}\s*/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Mic SVG
function MicIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill={active ? "currentColor" : "none"} />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

// Speaker SVG
function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

export default function Breddy() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({});
  const [hasContext, setHasContext] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef("");
  // Keep a ref to sendMessage so toggleRecording can always call the latest version
  const sendMessageRef = useRef<(text: string) => Promise<void>>(async () => {});

  // Load user context from sessionStorage
  useEffect(() => {
    try {
      const rawProfile = sessionStorage.getItem("br_profile");
      const rawAnswers = sessionStorage.getItem("br_answers");
      if (!rawProfile) return;
      const profile = JSON.parse(rawProfile) as Profile;
      const ctx: UserContext = {
        name: profile.name, title: profile.title, company: profile.company,
        industry: profile.industry, years_chro: profile.years_chro,
        company_size: profile.company_size, goal_timeline: profile.goal_timeline,
        board_exp: profile.board_exp,
      };
      if (rawAnswers) {
        const a = JSON.parse(rawAnswers) as Record<string, number>;
        const numericAnswers: Record<number, number> = {};
        Object.entries(a).forEach(([k, v]) => { numericAnswers[Number(k)] = Number(v); });
        ctx.dimScores = computeScores(numericAnswers).dimScores;
      }
      setUserContext(ctx);
      setHasContext(true);
    } catch { /* sessionStorage unavailable */ }
  }, []);

  // Check for Web Speech API support (client only)
  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    );
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (open) setTimeout(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); inputRef.current?.focus(); }, 60);
  }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // ── Text-to-speech ────────────────────────────────────────────────────────────
  function speak(text: string) {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = cleanForSpeech(text);
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const voices = window.speechSynthesis.getVoices();
    // Prefer high-quality online voices, then any en-US, then any English
    const best =
      voices.find(v => v.lang.startsWith("en") && /natural|online|aria|jenny|zira/i.test(v.name)) ||
      voices.find(v => v.lang === "en-US" && !v.localService) ||
      voices.find(v => v.lang.startsWith("en-US")) ||
      voices.find(v => v.lang.startsWith("en"));
    if (best) utterance.voice = best;
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  // ── Send message ──────────────────────────────────────────────────────────────
  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    // Cancel any ongoing speech when user sends
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    const userMsg: Message = { role: "user", content: text.trim() };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/breddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, userContext }),
      });
      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: full }]);
      }

      // Speak the completed response if voice is on
      speak(full);
    } catch {
      setMessages([...history, { role: "assistant", content: "I ran into a connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  // Keep ref in sync on every render so toggleRecording always sees latest closure
  useEffect(() => { sendMessageRef.current = sendMessage; });

  // ── Speech recognition ────────────────────────────────────────────────────────
  function toggleRecording() {
    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }

    // Cancel TTS before listening
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transcript = Array.from(e.results as any[])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("");
      transcriptRef.current = transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      const text = transcriptRef.current;
      transcriptRef.current = "";
      if (text.trim()) {
        setInput("");
        sendMessageRef.current(text.trim());
      }
    };

    recognition.onerror = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function closePanel() {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
    setIsRecording(false);
    setIsSpeaking(false);
    setOpen(false);
  }

  const firstName = userContext.name?.split(" ")[0];

  return (
    <>
      {/* ── Chat panel ───────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-[60] flex flex-col bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden"
          style={{ width: "min(400px, calc(100vw - 2rem))", maxHeight: "calc(100vh - 130px)" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-indigo-400/20 border border-indigo-400/30 flex items-center justify-center text-base leading-none flex-shrink-0 transition-all ${isSpeaking ? "animate-pulse bg-indigo-400/40" : ""}`}>
                ♟
              </div>
              <div>
                <div className="text-white font-extrabold text-sm leading-none">Breddy</div>
                <div className="text-indigo-400 text-[10px] mt-0.5 font-medium">
                  {isSpeaking ? "Speaking…" : isRecording ? "Listening…" : "Board readiness AI advisor"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasContext && (
                <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-300 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-2 py-0.5">
                  ✓ Profile
                </span>
              )}
              {/* Voice output toggle */}
              <button
                onClick={() => {
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (!next) { window.speechSynthesis?.cancel(); setIsSpeaking(false); }
                }}
                title={voiceEnabled ? "Voice on — click to mute" : "Voice off — click to enable"}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  voiceEnabled
                    ? "bg-indigo-400/30 text-indigo-200 border border-indigo-400/40"
                    : "bg-white/10 text-indigo-400 hover:bg-white/20"
                }`}
              >
                <SpeakerIcon muted={!voiceEnabled} />
              </button>
              <button
                onClick={closePanel}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Voice status bar */}
          {(isRecording || isSpeaking) && (
            <div className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold flex-shrink-0 ${isRecording ? "bg-red-50 text-red-600 border-b border-red-100" : "bg-indigo-50 text-indigo-600 border-b border-indigo-100"}`}>
              {isRecording ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                  Listening — speak now, I&apos;ll send automatically
                </>
              ) : (
                <>
                  <span className="flex gap-0.5 items-end h-3">
                    {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                      <span key={i} className="w-0.5 bg-indigo-500 rounded-full animate-bounce" style={{ height: `${h * 3}px`, animationDelay: `${i * 60}ms` }} />
                    ))}
                  </span>
                  Breddy is speaking…
                  <button onClick={() => { window.speechSynthesis?.cancel(); setIsSpeaking(false); }} className="ml-auto text-indigo-400 hover:text-indigo-600 font-semibold">
                    Stop
                  </button>
                </>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50 min-h-0">
            {/* Welcome bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 shadow-sm">♟</div>
              <div className="bg-white border border-indigo-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed shadow-sm" style={{ maxWidth: "82%" }}>
                {hasContext && firstName
                  ? `Hi ${firstName} 👋 — I'm Breddy. I can explain your assessment scores, answer governance questions, or draft search firm outreach. ${voiceEnabled ? "Voice is on — I'll speak my responses." : "Tap 🔊 in the header to enable voice."}`
                  : `Hi 👋 — I'm Breddy, your board readiness AI advisor. Ask me anything about getting a Fortune 1000 board seat. ${speechSupported ? "Tap the mic to speak to me." : ""}`}
              </div>
            </div>

            {/* Conversation */}
            {messages.map((msg, i) => {
              const isLastAssistant = msg.role === "assistant" && i === messages.length - 1;
              const showDots = loading && isLastAssistant && msg.content === "";
              return (
                <div key={i} className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className={`w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-sm flex-shrink-0 mb-0.5 shadow-sm ${isSpeaking && isLastAssistant ? "animate-pulse" : ""}`}>♟</div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm"
                    }`}
                    style={{ maxWidth: "82%" }}
                  >
                    {showDots ? (
                      <span className="inline-flex items-center gap-1 py-0.5">
                        {[0, 150, 300].map((d) => (
                          <span key={d} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                    ) : msg.role === "assistant" ? (
                      <span dangerouslySetInnerHTML={{ __html: renderBubble(msg.content) }} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips — only before first message */}
          {messages.length === 0 && (
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex flex-wrap gap-1.5 flex-shrink-0">
              {QUICK_CHIPS.map((chip) => (
                <button key={chip.label} onClick={() => sendMessage(chip.prompt)}
                  className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 rounded-full px-3 py-1.5 transition-all">
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-end gap-2 flex-shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening…" : "Ask Breddy anything…"}
              rows={1}
              disabled={loading || isRecording}
              className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all disabled:opacity-60"
              style={{ maxHeight: 100 }}
            />

            {/* Mic button — only shown if SpeechRecognition is available */}
            {speechSupported && (
              <button
                onClick={toggleRecording}
                disabled={loading}
                title={isRecording ? "Stop listening" : "Speak to Breddy"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-40 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg shadow-red-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                }`}
              >
                <MicIcon active={isRecording} />
              </button>
            )}

            {/* Send button */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || isRecording}
              className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ───────────────────────────────────────────────────── */}
      <button
        onClick={() => open ? closePanel() : setOpen(true)}
        className="fixed bottom-4 right-4 sm:right-6 z-[60] flex items-center gap-2.5 bg-gradient-to-br from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white px-4 py-3 rounded-full shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
      >
        <span className="text-base leading-none font-bold">{open ? "✕" : "♟"}</span>
        <span className="text-sm font-bold tracking-tight">{open ? "Close" : "Breddy"}</span>
        {!open && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />}
      </button>
    </>
  );
}

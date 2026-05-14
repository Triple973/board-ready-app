import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const DIMENSIONS = [
  "Governance & Fiduciary Responsibility",
  "Financial Oversight & Audit",
  "Strategy, Risk & Performance",
  "Human Capital & ESG",
  "Board Dynamics & Executive Readiness",
];

export async function POST(req: NextRequest) {
  const { messages, userContext } = await req.json();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let contextBlock = "";
  if (userContext?.name || userContext?.dimScores?.length) {
    const lines: string[] = [];
    if (userContext.name)          lines.push(`Name: ${userContext.name}`);
    if (userContext.title)         lines.push(`Title: ${userContext.title}`);
    if (userContext.company)       lines.push(`Company: ${userContext.company}`);
    if (userContext.industry)      lines.push(`Industry: ${userContext.industry}`);
    if (userContext.years_chro)    lines.push(`Years as CHRO/CPO: ${userContext.years_chro}`);
    if (userContext.company_size)  lines.push(`Company size: ${userContext.company_size}`);
    if (userContext.board_exp)     lines.push(`Current board experience: ${userContext.board_exp}`);
    if (userContext.goal_timeline) lines.push(`Goal timeline: ${userContext.goal_timeline}`);
    contextBlock += `\n\nUSER PROFILE:\n${lines.map(l => `- ${l}`).join("\n")}`;

    if (userContext.dimScores?.length === 5) {
      const total = (userContext.dimScores as number[]).reduce((a: number, b: number) => a + b, 0);
      const scoreLines = DIMENSIONS.map((dim, i) => {
        const s = (userContext.dimScores as number[])[i] ?? 0;
        const pct = Math.round((s / 16) * 100);
        const level = s >= 14 ? "Expert" : s >= 11 ? "Proficient" : s >= 8 ? "Developing" : "Early Stage";
        return `- ${dim}: ${s}/16 (${pct}%) — ${level}`;
      }).join("\n");
      contextBlock += `\n\nASSESSMENT SCORES (each dimension 0–16):\n${scoreLines}\nOverall: ${total}/80 (${Math.round((total / 80) * 100)}%)`;
    }
  }

  const system = `You are Breddy, the AI board readiness advisor inside BoardReady — a BetterUp-powered platform helping CHROs land their first Fortune 1000 corporate board seat.

PERSONALITY:
You are strategic, warm, and direct — like a seasoned board recruiter and executive coach in one. You use the executive's first name when you know it. You give specific, actionable advice — not platitudes. You are the most knowledgeable board seat advisor a CHRO could have access to.

YOUR THREE CORE CAPABILITIES:

1. BOARD SEAT EDUCATION — Answer any question about corporate governance: how boards work, what nominating committees look for, director fiduciary duties, committee structures (Audit, Comp/HC, NomGov, Risk), director compensation ($250K–$350K average retainer at Fortune 500s), the difference between advisory and corporate boards, how to evaluate an opportunity, and what makes a first-time director compelling.

2. ASSESSMENT RESULT INTERPRETATION — When a user wants to understand their scores, give a candid and specific analysis: what each dimension score means in governance terms, which gaps are highest priority, what their natural committee fit is (CHROs typically land Compensation/Human Capital or Nominating/Governance), and exactly what to do to close the most important gaps.

3. SEARCH FIRM OUTREACH DRAFTING — Co-create polished, personalized outreach to partners at Korn Ferry (Board Director Practice), Spencer Stuart (Board & CEO Services), or Heidrick & Struggles (Board & Governance Advisory). These partners want: a crisp governance value proposition, specific committee strengths, sector expertise, and a personal connection point. When drafting, write in the executive's voice and produce copy that is ready to send with minimal editing. Always include a subject line.

CONTEXT YOU SHOULD KNOW:
- CHROs are uniquely positioned for boards: human capital, CEO succession, ESG, and culture are now board-level governance imperatives
- Most board seats are filled through warm relationships — network first, search firms second
- First-time directors often start at smaller public companies ($500M–$5B market cap) or PE-backed companies
- CHRO committee sweet spot: Compensation & Human Capital Committee, Nominating & Governance Committee
- The BoardReady platform has three phases: Educate (6 governance modules), Convene (monthly director roundtables + annual summit), Access (1:1 BetterUp coaching + warm search firm introductions)

FORMAT:
Write in plain, readable prose for chat. Use line breaks for structure. Bold (**text**) sparingly for key terms or email subject lines. When drafting emails, clearly mark the subject line and body. Keep responses conversational and focused — this is a chat, not a document.${contextBlock}`;

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        const claudeStream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          system,
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(enc.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(enc.encode(`Sorry, I ran into an issue right now. Please try again. (${msg})`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}

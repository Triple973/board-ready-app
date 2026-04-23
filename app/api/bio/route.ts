import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";

function parseNotes(notes: string) {
  const get = (key: string) =>
    (notes || "").split("\n").find(l => l.startsWith(key + ":"))?.slice(key.length + 1).trim() ?? "";
  return {
    company:     get("Company"),
    industry:    get("Industry"),
    companySize: get("Company Size"),
    yearsChro:   get("Years as CHRO"),
    boardExp:    get("Board Experience"),
    goalTimeline: get("Goal Timeline"),
  };
}

function dimLevel(score: number) {
  if (score >= 14) return "Expert";
  if (score >= 11) return "Proficient";
  if (score >= 8)  return "Developing";
  return "Early Stage";
}

export async function POST(req: NextRequest) {
  const { recordId } = await req.json();
  if (!recordId) return new Response("Missing recordId", { status: 400 });

  // Fetch participant from Airtable
  const atRes = await fetch(
    `https://api.airtable.com/v0/${BASE}/${TABLE}/${recordId}`,
    { headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` } }
  );
  const participant = await atRes.json();
  const f = participant?.fields ?? {};

  const notes = parseNotes(f["Notes"] as string ?? "");
  const name        = (f["Participant Name"] as string) || "Executive";
  const title       = (f["Current Title"] as string) || "CHRO";
  const govScore    = (f["Governance Score"] as number) ?? 0;
  const finScore    = (f["Financial Score"] as number) ?? 0;
  const stratScore  = (f["Strategy Score"] as number) ?? 0;
  const hcScore     = (f["Human Capital Score"] as number) ?? 0;
  const bdScore     = (f["Board Dynamics Score"] as number) ?? 0;
  const totalScore  = (f["Overall Score"] as number) ?? 0;
  const scorePct    = Math.round((totalScore / 80) * 100);

  // Rank dimensions to identify top strengths
  const dims = [
    { name: "Governance & Fiduciary Responsibility", score: govScore },
    { name: "Financial Oversight & Audit",            score: finScore },
    { name: "Strategy, Risk & Performance",           score: stratScore },
    { name: "Human Capital & ESG",                   score: hcScore },
    { name: "Board Dynamics & Executive Readiness",  score: bdScore },
  ].sort((a, b) => b.score - a.score);

  const prompt = `You are an elite executive communications specialist who writes board biographies for Fortune 500 CHROs pursuing their first or next corporate board seat. Your bios are read by nominating committee chairs, board search partners at Spencer Stuart and Korn Ferry, and sitting directors.

EXECUTIVE PROFILE:
- Name: ${name}
- Current Title: ${title}
- Company: ${notes.company || "a Fortune 500 company"}
- Industry: ${notes.industry || "N/A"}
- Company Scale: ${notes.companySize || "large enterprise"}
- Years as CHRO/CPO: ${notes.yearsChro || "several"}
- Existing Board/Advisory Experience: ${notes.boardExp || "None listed"}
- Goal Timeline for Board Seat: ${notes.goalTimeline || "12-18 months"}

BOARD READINESS SCORES (each out of 16):
${dims.map(d => `- ${d.name}: ${d.score}/16 — ${dimLevel(d.score)}`).join("\n")}
Overall Readiness: ${totalScore}/80 (${scorePct}%)

TOP STRENGTHS (use to anchor the bio):
1. ${dims[0].name} — ${dimLevel(dims[0].score)}
2. ${dims[1].name} — ${dimLevel(dims[1].score)}
3. ${dims[2].name} — ${dimLevel(dims[2].score)}

Write a polished, 250–300 word board biography in third person. Follow this structure precisely:

**Paragraph 1 — Positioning Statement + Current Role**
Open with a single powerful sentence that captures their unique value proposition as a director — specific to their background, not generic. Then describe their current role and scope in board-fluent language: translate CHRO responsibilities into governance terms (workforce governance, executive compensation oversight, human capital risk, organizational resilience, culture as enterprise risk). Name the company and scale (employee count, revenue tier, geographic complexity if relevant).

**Paragraph 2 — Board-Relevant Expertise**
Draw on their top 2–3 scoring dimensions. Frame HR expertise as governance expertise — a Compensation Committee asset, a Human Capital Committee voice, a risk oversight contributor. If they have financial or strategy strengths, call those out explicitly. Mention any industries, board types, or strategic situations (transformation, M&A, AI disruption) where they're especially positioned to add value.

**Paragraph 3 — Board Experience + Forward Positioning**
If they have existing board or advisory experience, reference it directly. If not, frame their external leadership, speaking, or governance engagement. Close with a crisp sentence naming the types of boards and committees where they intend to contribute — specific enough to be useful to a search partner.

CRITICAL RULES:
- Never use: "passionate," "results-driven," "dynamic," "seasoned," "collaborative leader," or any other corporate filler
- No bullet points — flowing prose only
- Every claim must be grounded in the profile data above
- Write as if this will be submitted to Spencer Stuart tomorrow`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        const msgStream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        for await (const event of msgStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(enc.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Bio generation failed";
        controller.enqueue(enc.encode(`Error: ${msg}`));
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

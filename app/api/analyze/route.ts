import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { DIMENSIONS, QUESTIONS } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { profile, dimScores, answers } = await req.json();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const scoreDetails = DIMENSIONS.map((dim, i) => {
    const score = dimScores[i] ?? 0;
    const pct = Math.round((score / 16) * 100);
    const level =
      score >= 14 ? "Expert" :
      score >= 11 ? "Proficient" :
      score >= 8  ? "Developing" : "Early Stage";
    return `- ${dim}: ${score}/16 (${pct}%) — ${level}`;
  }).join("\n");

  const questionContext = QUESTIONS.map((q) => {
    const val = answers[q.id] ?? 0;
    const label = q.options.find(([v]) => v === val)?.[1] ?? "Not answered";
    return `Q${q.id} (${DIMENSIONS[q.dim]}): ${label}`;
  }).join("\n");

  const totalScore = dimScores.reduce((a: number, b: number) => a + b, 0);
  const pct = Math.round((totalScore / 80) * 100);

  const prompt = `You are an expert in corporate governance, board recruitment, and executive development.
You are advising a CHRO who aspires to serve on a Fortune 1000 corporate board.

EXECUTIVE PROFILE:
- Name: ${profile?.name || "Executive"}
- Current Role: ${profile?.title || "CHRO"}
- Company: ${profile?.company || "N/A"}
- Years as CHRO/CPO: ${profile?.years_chro || "N/A"}
- Industry: ${profile?.industry || "N/A"}
- Company Size: ${profile?.company_size || "N/A"}
- Current Board Experience: ${profile?.board_exp || "None"}
- Goal Timeline: ${profile?.goal_timeline || "N/A"}

ASSESSMENT RESULTS (each dimension scored 0–16):
${scoreDetails}

Overall Board Readiness Score: ${totalScore}/80 (${pct}%)

DETAILED RESPONSES:
${questionContext}

Provide a comprehensive, personalized board readiness analysis. Be specific, practical, and encouraging. Use the executive's actual name and context throughout. Use markdown formatting with ## and ### headers.

## Executive Summary
2–3 paragraphs: overall board readiness, what makes this CHRO a compelling board candidate, and primary focus areas.

## Your Board-Ready Strengths
3–4 specific strengths to leverage in board interviews and positioning.

## Critical Development Areas
For each dimension scoring below 11/16, cover:
- What the gap means in board terms
- The specific risk if unaddressed
- 1–2 concrete actions to close it within 90 days

## Your Ideal Board Profile
Based on their background, recommend:
- Company type and size (public vs. private, market cap range)
- Industry sectors where they'll be most compelling
- Committee fit (Compensation, Human Capital, Audit, Nominating/Governance)
- Geography considerations

## 90-Day Board Readiness Sprint
A specific, prioritized action plan:
- **Week 1–2:** Immediate actions
- **Week 3–4:** Network and education priorities
- **Month 2:** Building credentials
- **Month 3:** Active board search preparation

## Board Search Strategy
Specific advice on:
- Which search firms to target and how to approach them
- Board bio and LinkedIn optimization
- Sponsorship and reference cultivation
- Advisory/nonprofit board as stepping stones (if applicable)

## Long-Term Positioning (6–18 Months)
What success looks like at 6, 12, and 18 months on the path to a board seat.`;

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        const stream = client.messages.stream({
          model: "claude-opus-4-6",
          max_tokens: 4000,
          thinking: { type: "adaptive" },
          messages: [{ role: "user", content: prompt }],
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(enc.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Analysis failed";
        controller.enqueue(enc.encode(`\n\n**Error:** ${msg}`));
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

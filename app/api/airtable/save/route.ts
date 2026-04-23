import { NextRequest, NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";
const KEY = () => process.env.AIRTABLE_API_KEY!;
const headers = () => ({
  Authorization: `Bearer ${KEY()}`,
  "Content-Type": "application/json",
});

export async function POST(req: NextRequest) {
  const { profile, dimScores, totalScore } = await req.json();
  const pct = Math.round((totalScore / 80) * 100);
  const today = new Date().toISOString().split("T")[0];

  const fields: Record<string, unknown> = {
    "Participant Name": profile.name || "Unknown",
    "Current Title": profile.title || "CHRO",
    "Email": profile.email || "",
    "Cohort": "Cohort 1 — Spring 2026",
    "Overall Score": totalScore,
    "Score Percent": pct,
    "Governance Score": dimScores[0] ?? 0,
    "Financial Score": dimScores[1] ?? 0,
    "Strategy Score": dimScores[2] ?? 0,
    "Human Capital Score": dimScores[3] ?? 0,
    "Board Dynamics Score": dimScores[4] ?? 0,
    "Assessment Completed": true,
    "Program Status": "In Progress",
    "Last Active": today,
    "Notes": [
      `Company: ${profile.company || ""}`,
      `Industry: ${profile.industry || ""}`,
      `Company Size: ${profile.company_size || ""}`,
      `Years as CHRO: ${profile.years_chro || ""}`,
      `Board Experience: ${profile.board_exp || ""}`,
      `Goal Timeline: ${profile.goal_timeline || ""}`,
    ].join("\n"),
  };

  // Check if participant already exists by email
  if (profile.email) {
    const filter = encodeURIComponent(`LOWER({Email})=LOWER("${profile.email}")`);
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${BASE}/${TABLE}?filterByFormula=${filter}`,
      { headers: headers() }
    );
    const searchData = await searchRes.json();
    const existing = searchData.records?.[0];

    if (existing) {
      const updateRes = await fetch(
        `https://api.airtable.com/v0/${BASE}/${TABLE}/${existing.id}`,
        { method: "PATCH", headers: headers(), body: JSON.stringify({ fields }) }
      );
      const updated = await updateRes.json();
      return NextResponse.json({ recordId: updated.id });
    }
  }

  // Create new record
  const createRes = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  const created = await createRes.json();
  return NextResponse.json({ recordId: created.id });
}

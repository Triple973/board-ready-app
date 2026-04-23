import { NextRequest, NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";
const headers = () => ({
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const today = new Date().toISOString().split("T")[0];

  const fields: Record<string, unknown> = {
    "Participant Name": body.name,
    "Current Title": body.title || "CHRO",
    "Email": body.email || "",
    "Cohort": body.cohort || "Cohort 1 — Spring 2026",
    "Program Status": "Not Started",
    "Last Active": today,
    "Notes": [
      body.company ? `Company: ${body.company}` : "",
      body.industry ? `Industry: ${body.industry}` : "",
      body.company_size ? `Company Size: ${body.company_size}` : "",
      body.sfdc_id ? `SFDC Account ID: ${body.sfdc_id}` : "",
    ].filter(Boolean).join("\n"),
  };

  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

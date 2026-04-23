import { NextRequest, NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";
const authHeader = () => ({ Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` });

export async function GET(req: NextRequest) {
  const recordId = req.nextUrl.searchParams.get("recordId");
  const email = req.nextUrl.searchParams.get("email");

  if (recordId) {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE}/${TABLE}/${recordId}`,
      { headers: authHeader(), cache: "no-store" }
    );
    return NextResponse.json(await res.json());
  }

  if (email) {
    const filter = encodeURIComponent(`LOWER({Email})=LOWER("${email}")`);
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE}/${TABLE}?filterByFormula=${filter}`,
      { headers: authHeader(), cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json(data.records?.[0] || null);
  }

  return NextResponse.json({ error: "Provide recordId or email" }, { status: 400 });
}

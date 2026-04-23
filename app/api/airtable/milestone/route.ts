import { NextRequest, NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";

export async function POST(req: NextRequest) {
  const { recordId, field, value } = await req.json();
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE}/${TABLE}/${recordId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { [field]: value, "Last Active": today } }),
    }
  );
  return NextResponse.json(await res.json());
}

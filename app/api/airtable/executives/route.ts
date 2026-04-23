import { NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblox65tplcFDYIKD";

export async function GET() {
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE}/${TABLE}?fields[]=Executive+Name&fields[]=Title&fields[]=fldc8fPHVR7xuVeA3`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return NextResponse.json(data.records || []);
}

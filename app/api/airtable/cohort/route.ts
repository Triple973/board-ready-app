import { NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblpXZ3iPpyakwKyi";

export async function GET() {
  const sort = encodeURIComponent("sort[0][field]") + "=Participant+Name&" +
               encodeURIComponent("sort[0][direction]") + "=asc";
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE}/${TABLE}?${sort}`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return NextResponse.json(data.records || []);
}

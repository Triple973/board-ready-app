import { NextRequest, NextResponse } from "next/server";

const BASE = "appG2E5PU2uVczwaz";
const TABLE = "tblI4kzGNgnDXM1Qx";
const authHeader = () => ({ Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` });
const jsonHeaders = () => ({ ...authHeader(), "Content-Type": "application/json" });

export async function GET(req: NextRequest) {
  const participantId = req.nextUrl.searchParams.get("participantId");
  if (!participantId) return NextResponse.json([], { status: 400 });

  const filter = encodeURIComponent(`{Participant Record ID}="${participantId}"`);
  const sort = encodeURIComponent("sort[0][field]") + "=Date&" +
               encodeURIComponent("sort[0][direction]") + "=desc";
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE}/${TABLE}?filterByFormula=${filter}&${sort}`,
    { headers: authHeader(), cache: "no-store" }
  );
  const data = await res.json();
  return NextResponse.json(data.records || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const fields: Record<string, unknown> = {
    "Title": `${body.type} — ${body.participantName}`,
    "Date": body.date || new Date().toISOString().split("T")[0],
    "Type": body.type,
    "Participant Name": body.participantName,
    "Participant Record ID": body.participantId,
    "Notes": body.notes || "",
    "Action Item": body.actionItem || "",
    "Logged By": body.loggedBy || "Admin",
  };
  if (body.followUpDate) fields["Follow Up Date"] = body.followUpDate;

  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ fields }),
  });
  return NextResponse.json(await res.json());
}

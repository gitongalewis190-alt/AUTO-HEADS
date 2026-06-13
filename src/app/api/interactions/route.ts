import { NextResponse } from "next/server";

// POST /api/interactions — log call/message/whatsapp events
export async function POST() {
  // TODO: Validate session, write to /interactions collection
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

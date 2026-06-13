import { NextResponse } from "next/server";

// POST /api/upload — validate and trigger Firebase Storage upload
export async function POST() {
  // TODO: Verify session, validate file type/size, return signed upload URL
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

import { NextResponse } from "next/server";

// GET /api/projects — paginated project list
export async function GET() {
  // TODO: Parse query params (cursor, category, status, limit)
  // Call listProjects() and return PaginatedResponse<Project>
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

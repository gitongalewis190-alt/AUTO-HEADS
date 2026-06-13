import { NextResponse } from "next/server";

// GET /api/projects/[id]
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  void params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// PATCH /api/projects/[id]
export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  void params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/projects/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  void params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

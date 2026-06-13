import { NextResponse } from "next/server";
import { stkPush } from "@/lib/payments/mpesa";

// POST /api/payments/mpesa — trigger M-Pesa STK push
export async function POST(req: Request) {
  try {
    const { phone, amount, reference } = await req.json();
    const result = await stkPush(phone, amount, reference);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

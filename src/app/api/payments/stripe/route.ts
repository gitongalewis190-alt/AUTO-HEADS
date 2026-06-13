import { NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/payments/stripe";

// POST /api/payments/stripe — create Stripe PaymentIntent
export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();
    const intent = await createPaymentIntent(amount, currency);
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

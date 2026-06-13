import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/payments/stripe";

// POST /api/payments/webhook — Stripe webhook handler
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  try {
    const event = constructWebhookEvent(body, signature);

    if (event.type === "payment_intent.succeeded") {
      // TODO: Update transaction status to "completed" via Cloud Function trigger
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}

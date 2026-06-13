import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function createPaymentIntent(amount: number, currency = "kes") {
  return stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  });
}

export function constructWebhookEvent(body: string | Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}

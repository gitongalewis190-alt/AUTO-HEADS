import * as functions from "firebase-functions";

export const sendSMS = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  const { to, body } = data as { to: string; body: string };

  // TODO: Initialize Twilio client with TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN,
  // call client.messages.create({ to, from: TWILIO_PHONE_NUMBER, body })
  void to; void body;
  return { success: true };
});

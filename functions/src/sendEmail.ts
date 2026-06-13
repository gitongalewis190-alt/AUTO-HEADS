import * as functions from "firebase-functions";

export const sendEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  const { to, subject, html } = data as { to: string; subject: string; html: string };

  // TODO: Initialize SendGrid with SENDGRID_API_KEY,
  // call sgMail.send({ to, from: SENDGRID_FROM_EMAIL, subject, html })
  void to; void subject; void html;
  return { success: true };
});

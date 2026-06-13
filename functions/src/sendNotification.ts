import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const sendNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  const { uid, title, body } = data as { uid: string; title: string; body: string };

  // TODO: Look up user FCM token, call admin.messaging().send()
  void uid; void title; void body;
  functions.logger.info("Notification triggered for", uid);
  return { success: true };
});

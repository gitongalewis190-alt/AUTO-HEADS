import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Admin-only callable functions — ban user, bulk delete, etc.
export const adminActions = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Must be logged in");

  const callerDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();
  if (callerDoc.data()?.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admin only");
  }

  const { action, targetId } = data as { action: string; targetId: string };

  if (action === "banUser") {
    await admin.auth().updateUser(targetId, { disabled: true });
    await admin.firestore().collection("users").doc(targetId).update({ banned: true });
    return { success: true };
  }

  if (action === "unbanUser") {
    await admin.auth().updateUser(targetId, { disabled: false });
    await admin.firestore().collection("users").doc(targetId).update({ banned: false });
    return { success: true };
  }

  throw new functions.https.HttpsError("invalid-argument", `Unknown action: ${action}`);
});

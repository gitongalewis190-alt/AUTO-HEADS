import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Callable function — atomic like toggle.
// Avoids race conditions by using a Firestore transaction.
export const onLike = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  const { projectId } = data as { projectId: string };
  const uid = context.auth.uid;

  const ref = admin.firestore().collection("projects").doc(projectId);
  await admin.firestore().runTransaction(async (t) => {
    const doc = await t.get(ref);
    const likedBy: string[] = doc.data()?.likedBy ?? [];
    const liked = likedBy.includes(uid);

    t.update(ref, {
      likedBy: liked
        ? admin.firestore.FieldValue.arrayRemove(uid)
        : admin.firestore.FieldValue.arrayUnion(uid),
      "engagement.likes": admin.firestore.FieldValue.increment(liked ? -1 : 1),
    });
  });

  return { success: true };
});

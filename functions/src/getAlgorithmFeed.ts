import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Returns ranked project IDs for a user's feed.
export const getAlgorithmFeed = functions.https.onCall(async (data, context) => {
  void context;
  const { limit = 12, cursor } = data as { limit?: number; cursor?: string };

  let query = admin.firestore()
    .collection("projects")
    .where("status", "!=", "sold")
    .orderBy("status")
    .orderBy("createdAt", "desc")
    .limit(limit);

  if (cursor) {
    const cursorDoc = await admin.firestore().collection("projects").doc(cursor).get();
    query = query.startAfter(cursorDoc);
  }

  const snap = await query.get();
  const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // TODO: Apply ranking algorithm — sort by score(likes, comments, views, recency)
  return { projects, nextCursor: snap.docs[snap.docs.length - 1]?.id ?? null };
});

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Triggered when a new project document is created.
// Sends a confirmation email to the creator via SendGrid.
export const onProjectCreate = functions.firestore
  .document("projects/{projectId}")
  .onCreate(async (snap) => {
    const project = snap.data();
    const userDoc = await admin.firestore().collection("users").doc(project.creatorId).get();
    const email = userDoc.data()?.email;
    if (!email) return;

    // TODO: Call sendEmail() callable with confirmation email template
    functions.logger.info("Project created, sending confirmation to", email);
  });

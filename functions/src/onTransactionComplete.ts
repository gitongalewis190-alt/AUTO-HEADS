import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Triggered on Stripe webhook — updates seller earnings and sends receipts.
export const onTransactionComplete = functions.firestore
  .document("transactions/{transactionId}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.paymentStatus !== "pending" || after.paymentStatus !== "completed") return;

    await admin.firestore().collection("users").doc(after.sellerId).update({
      "stats.totalEarnings": admin.firestore.FieldValue.increment(after.amount),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // TODO: Send receipt emails to buyer and seller via sendEmail()
    functions.logger.info("Transaction completed", change.after.id);
  });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();

// Triggered when a new Firebase Auth user is created.
// Creates the Firestore /users/{uid} document with default stats.
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email ?? "",
    username: "",
    displayName: user.displayName ?? "",
    bio: "",
    logoUrl: user.photoURL ?? "",
    phoneNumber: user.phoneNumber ?? "",
    walletAddress: "",
    role: "user",
    stats: {
      totalEarnings: 0,
      totalLikes: 0,
      totalInteractions: 0,
      followers: 0,
      following: 0,
      monthlyGrowth: 0,
    },
    socialLinks: {},
    preferences: {
      theme: "dark",
      notifications: true,
      privateProfile: false,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

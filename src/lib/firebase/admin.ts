import type { App } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import type { Auth } from "firebase-admin/auth";
import type { Storage } from "firebase-admin/storage";

// Lazy initialisation — never runs at build/import time, only on first call.
let _app: App | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: Storage | null = null;

function getApp(): App {
  if (_app) return _app;
  // Dynamic require keeps this out of the client bundle and away from build time.
  const { initializeApp, getApps, cert } = require("firebase-admin/app") as typeof import("firebase-admin/app");
  if (getApps().length > 0) {
    _app = getApps()[0];
  } else {
    _app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return _app;
}

export function getAdminDb(): Firestore {
  if (!_db) {
    const { getFirestore } = require("firebase-admin/firestore") as typeof import("firebase-admin/firestore");
    _db = getFirestore(getApp());
  }
  return _db;
}

export function getAdminAuth(): Auth {
  if (!_auth) {
    const { getAuth } = require("firebase-admin/auth") as typeof import("firebase-admin/auth");
    _auth = getAuth(getApp());
  }
  return _auth;
}

export function getAdminStorage(): Storage {
  if (!_storage) {
    const { getStorage } = require("firebase-admin/storage") as typeof import("firebase-admin/storage");
    _storage = getStorage(getApp());
  }
  return _storage;
}

// Convenience re-exports for code that expects direct references.
// These are getters so they remain lazy.
export const adminDb = new Proxy({} as Firestore, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getAdminDb() as any)[prop];
  },
});

export const adminAuth = new Proxy({} as Auth, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getAdminAuth() as any)[prop];
  },
});

export const adminStorage = new Proxy({} as Storage, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getAdminStorage() as any)[prop];
  },
});

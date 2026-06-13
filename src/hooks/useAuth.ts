"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/types/user";

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);
      const unsubUser = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          setUser({ uid: snap.id, ...snap.data() } as User);
        }
        setLoading(false);
      });

      return unsubUser;
    });

    return unsubAuth;
  }, [setUser, setLoading]);

  return { user, loading, isAdmin: user?.role === "admin" };
}

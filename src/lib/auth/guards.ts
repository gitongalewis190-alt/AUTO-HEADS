import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";
import { adminDb } from "@/lib/firebase/admin";
import type { UserRole } from "@/types/user";

export async function requireAuth(sessionCookie: string | undefined) {
  if (!sessionCookie) redirect("/login");
  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch {
    redirect("/login");
  }
}

export async function requireAdmin(sessionCookie: string | undefined) {
  const decoded = await requireAuth(sessionCookie);
  const userDoc = await adminDb.collection("users").doc(decoded.uid).get();
  const role = userDoc.data()?.role as UserRole | undefined;
  if (role !== "admin") redirect("/feed");
  return decoded;
}

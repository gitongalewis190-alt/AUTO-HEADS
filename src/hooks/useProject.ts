"use client";

// TODO: Real-time Firestore subscription for a single project.
export function useProject(_id: string) {
  return { project: null, loading: true, error: null };
}

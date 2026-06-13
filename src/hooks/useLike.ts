"use client";

// TODO: Optimistic like toggle with rollback on Firestore failure.
export function useLike(_projectId: string) {
  return { liked: false, count: 0, toggle: async () => {} };
}

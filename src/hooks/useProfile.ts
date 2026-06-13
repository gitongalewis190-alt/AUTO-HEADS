"use client";

// TODO: Fetch user profile by uid, or own profile if uid omitted.
export function useProfile(_uid?: string) {
  return { profile: null, loading: true };
}

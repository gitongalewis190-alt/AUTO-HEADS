"use client";

// TODO: Debounced Firestore search on projectName and category.
export function useSearch() {
  return { results: [], loading: false, query: "", setQuery: (_q: string) => {} };
}

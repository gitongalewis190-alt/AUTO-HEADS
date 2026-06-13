"use client";

// TODO: Load and update platform customization settings from Firestore /settings/platform.
export function useAdminSettings() {
  return { settings: null, loading: true, update: async (_patch: unknown) => {} };
}

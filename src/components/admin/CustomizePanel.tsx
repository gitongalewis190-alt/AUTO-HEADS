"use client";

import { useAdminSettings } from "@/hooks/useAdminSettings";

export function CustomizePanel() {
  const { settings, loading } = useAdminSettings();
  void settings;
  if (loading) return <div className="glass p-6 animate-pulse h-40 rounded-glass" />;
  // TODO: Slogan editor, color pickers, font selector — all saved to Firestore /settings/platform
  return <div className="glass p-6 text-text-muted text-body-sm">Customization panel — Week 7</div>;
}

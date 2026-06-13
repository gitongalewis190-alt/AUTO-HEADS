"use client";

import { useProfile } from "@/hooks/useProfile";

export function ProfileHeader({ uid }: { uid?: string }) {
  const { profile, loading } = useProfile(uid);
  if (loading) return <div className="h-24 glass animate-pulse rounded-glass" />;
  if (!profile) return null;
  // TODO: Render avatar, displayName, username, bio, follow button (if viewing other user)
  return (
    <div className="glass p-6 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-h2">👤</div>
      <div>
        <p className="font-heading font-bold text-h3">Profile</p>
        <p className="text-text-muted text-body-sm">Coming soon</p>
      </div>
    </div>
  );
}

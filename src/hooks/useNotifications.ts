"use client";

// TODO: Real-time notification stream for the current user.
export function useNotifications() {
  return { notifications: [], unreadCount: 0, loading: true };
}

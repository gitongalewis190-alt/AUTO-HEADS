"use client";

// Top navigation — search bar, notification bell, profile avatar
export function Navbar() {
  return (
    <header className="h-16 bg-surface border-b border-white/10 flex items-center px-6 gap-4 sticky top-0 z-50">
      <span className="text-h3 font-heading font-bold text-gradient">AUTO HEADS</span>
      <div className="flex-1" />
      {/* TODO: SearchBar */}
      {/* TODO: Notification bell with unreadCount badge */}
      {/* TODO: Profile avatar dropdown */}
    </header>
  );
}

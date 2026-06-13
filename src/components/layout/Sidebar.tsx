"use client";

import Link from "next/link";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/upload", label: "Upload" },
  { href: "/profile", label: "Profile" },
  { href: "/notifications", label: "Notifications" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="w-56 bg-surface border-r border-white/10 min-h-full p-4 flex flex-col gap-2">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="px-4 py-2 rounded-lg text-body text-text-muted hover:bg-white/5 hover:text-white transition"
        >
          {l.label}
        </Link>
      ))}
    </aside>
  );
}

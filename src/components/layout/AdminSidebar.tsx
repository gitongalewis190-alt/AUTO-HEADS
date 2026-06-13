"use client";

import Link from "next/link";

const links = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/transactions", label: "Transactions" },
  { href: "/admin/customize", label: "Customize" },
  { href: "/admin/supporters", label: "Supporters" },
];

export function AdminSidebar() {
  return (
    <aside className="w-56 bg-surface border-r border-white/10 min-h-full p-4 flex flex-col gap-2">
      <p className="text-caption text-text-muted uppercase tracking-widest px-4 mb-2">Admin</p>
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

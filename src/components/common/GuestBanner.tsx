import Link from "next/link";

export function GuestBanner() {
  return (
    <div className="glass border-accent/30 p-4 flex items-center justify-between gap-4">
      <p className="text-body-sm text-text-muted">Login to like, comment, buy, and interact with creators.</p>
      <Link href="/login" className="px-4 py-1.5 bg-accent text-white rounded-full text-body-sm font-heading font-semibold whitespace-nowrap hover:opacity-90">
        Login
      </Link>
    </div>
  );
}

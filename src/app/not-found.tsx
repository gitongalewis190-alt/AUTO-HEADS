import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <h1 className="text-display font-heading font-bold text-gradient">404</h1>
      <p className="text-body-lg text-text-muted">Page not found</p>
      <Link href="/" className="px-6 py-2 bg-accent text-white rounded-full hover:opacity-90">
        Go home
      </Link>
    </div>
  );
}

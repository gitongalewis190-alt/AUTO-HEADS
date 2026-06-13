import Link from "next/link";

export function EmptyState({ message, ctaLabel, ctaHref }: {
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-h3 font-heading text-text-muted">🚗</p>
      <p className="text-body text-text-muted">{message}</p>
      {ctaLabel && ctaHref && (
        <Link href={ctaHref} className="px-6 py-2 bg-accent text-white rounded-full text-body-sm font-heading font-semibold hover:opacity-90">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

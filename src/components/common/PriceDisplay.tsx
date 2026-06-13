import { formatCurrency } from "@/lib/utils/format";

export function PriceDisplay({ amount, currency = "KES" }: { amount: number; currency?: string }) {
  if (!amount) return <span className="text-text-muted text-body-sm">Free / Not for sale</span>;
  return <span className="text-accent font-heading font-bold text-body">{formatCurrency(amount, currency)}</span>;
}

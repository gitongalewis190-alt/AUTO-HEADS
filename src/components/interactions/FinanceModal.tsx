"use client";

// Buy whole / Buy shares / Donate flow with Stripe + M-Pesa
export function FinanceModal({ open, onClose, projectId }: {
  open: boolean;
  onClose: () => void;
  projectId: string;
}) {
  void open; void onClose; void projectId;
  // TODO: Three-step flow: select type → select payment method → confirm
  return null;
}

"use client";

// Call / WhatsApp / Email / SMS / In-app message selector
export function InteractModal({ open, onClose, phone, email }: {
  open: boolean;
  onClose: () => void;
  phone?: string;
  email?: string;
}) {
  void open; void onClose; void phone; void email;
  // TODO: Render modal with five contact options, log to /interactions on click
  return null;
}

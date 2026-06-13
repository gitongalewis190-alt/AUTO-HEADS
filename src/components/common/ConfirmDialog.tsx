"use client";

export function ConfirmDialog({ open, title, description, onConfirm, onCancel }: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="glass p-6 max-w-sm w-full space-y-4">
        <h2 className="text-h3 font-heading font-bold">{title}</h2>
        <p className="text-body-sm text-text-muted">{description}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-text-muted hover:text-white transition text-body-sm">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-error text-white rounded-full text-body-sm font-semibold hover:opacity-90">Confirm</button>
        </div>
      </div>
    </div>
  );
}

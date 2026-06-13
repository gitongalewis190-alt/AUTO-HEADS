"use client";

import { useToastStore } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="alert"
          className={[
            "flex items-start gap-3 rounded-xl px-4 py-3 shadow-lg text-sm",
            "border border-white/10 backdrop-blur-sm",
            t.variant === "destructive"
              ? "bg-error/90 text-white"
              : "bg-surface/95 text-text-primary",
          ].join(" ")}
        >
          <div className="flex-1">
            {t.title && <p className="font-heading font-semibold">{t.title}</p>}
            {t.description && <p className="text-text-muted text-xs mt-0.5">{t.description}</p>}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="text-text-muted hover:text-white transition shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

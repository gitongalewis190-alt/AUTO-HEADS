"use client";

import { create } from "zustand";

export type ToastVariant = "default" | "destructive";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  toast(t) {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
      t.duration ?? 4000
    );
  },
  dismiss(id) {
    set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }));
  },
}));

export function useToast() {
  const { toast, dismiss } = useToastStore();
  return { toast, dismiss };
}

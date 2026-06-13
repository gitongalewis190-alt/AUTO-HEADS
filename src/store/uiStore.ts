import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  theme: "light" | "dark";
  setSidebarOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeModal: null,
  theme: "dark",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setTheme: (theme) => set({ theme }),
}));

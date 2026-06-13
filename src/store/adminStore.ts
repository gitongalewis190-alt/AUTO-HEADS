import { create } from "zustand";

interface PlatformSettings {
  slogan: string;
  featuredTitle: string;
  feedPageSize: number;
  defaultTheme: "light" | "dark";
  accentColor: string;
  secondaryColor: string;
  headingFont: string;
}

interface AdminState {
  settings: PlatformSettings | null;
  setSettings: (settings: PlatformSettings) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
}));

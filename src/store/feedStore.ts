import { create } from "zustand";
import type { Project } from "@/types/project";

interface FeedState {
  projects: Project[];
  cursor: string | null;
  lastFetched: number | null;
  setProjects: (projects: Project[]) => void;
  appendProjects: (projects: Project[]) => void;
  setCursor: (cursor: string | null) => void;
  setLastFetched: (ts: number) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  projects: [],
  cursor: null,
  lastFetched: null,
  setProjects: (projects) => set({ projects }),
  appendProjects: (newItems) =>
    set((s) => ({ projects: [...s.projects, ...newItems] })),
  setCursor: (cursor) => set({ cursor }),
  setLastFetched: (ts) => set({ lastFetched: ts }),
}));

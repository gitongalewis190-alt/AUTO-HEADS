import type { ProjectCategory, ProjectStatus } from "@/types/project";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Engine",
  "Tire",
  "Component",
  "Accessory",
  "Full Vehicle",
  "Project",
  "Other",
];

export const PROJECT_STATUSES: ProjectStatus[] = [
  "available",
  "featured",
  "sold",
];

export const MAX_IMAGE_SIZE_MB = 50;
export const MAX_VIDEO_SIZE_MB = 200;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MAX_PROJECT_NAME_LENGTH = 100;
export const MAX_COMMENT_LENGTH = 500;
export const FEED_PAGE_SIZE = 12;
export const SEARCH_DEBOUNCE_MS = 300;
export const ANIMATION_SKIP_KEY = "autoheads_skip_animation";
export const DEFAULT_CURRENCY = "KES";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "AUTO HEADS";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const APP_TAGLINE = "Where automotive passion meets commerce";

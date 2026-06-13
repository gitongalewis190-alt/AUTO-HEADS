export type ProjectCategory =
  | "Engine"
  | "Tire"
  | "Component"
  | "Accessory"
  | "Full Vehicle"
  | "Project"
  | "Other";

export type ProjectStatus = "available" | "featured" | "sold";

export type MediaType = "video" | "image" | "sketch" | "document";

export interface ProjectMedia {
  type: MediaType;
  url: string;
  thumbnail?: string;
}

export interface ProjectEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface BuySharesOptions {
  enabled: boolean;
  totalShares: number;
  pricePerShare: number;
  availableShares: number;
}

export interface BuyableOptions {
  buyWhole: boolean;
  buyShares: BuySharesOptions;
}

export interface Project {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorLogo?: string;
  projectName: string;
  description: string;
  category: ProjectCategory;
  media: ProjectMedia;
  status: ProjectStatus;
  price?: number;
  currency: string;
  engagement: ProjectEngagement;
  likedBy: string[];
  buyableOptions: BuyableOptions;
  createdAt: Date;
  updatedAt: Date;
  featuredAt?: Date;
}

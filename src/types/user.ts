export type UserRole = "user" | "admin";

export interface UserStats {
  totalEarnings: number;
  totalLikes: number;
  totalInteractions: number;
  followers: number;
  following: number;
  monthlyGrowth: number;
}

export interface UserSocialLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

export interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  privateProfile: boolean;
}

export interface User {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  logoUrl?: string;
  phoneNumber: string;
  walletAddress?: string;
  role: UserRole;
  stats: UserStats;
  socialLinks: UserSocialLinks;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

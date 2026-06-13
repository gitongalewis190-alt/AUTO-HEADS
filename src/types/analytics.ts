export interface ProfileAnalytics {
  totalEarnings: number;
  totalLikes: number;
  totalInteractions: number;
  totalViews: number;
  monthlyGrowth: number;
  followers: number;
  following: number;
  projectCount: number;
  soldCount: number;
}

export interface PlatformAnalytics {
  totalUsers: number;
  totalProjects: number;
  totalRevenue: number;
  dailyActiveUsers: number;
  newSignupsToday: number;
  projectsByCategory: Record<string, number>;
  revenueByMonth: Array<{ month: string; amount: number }>;
}

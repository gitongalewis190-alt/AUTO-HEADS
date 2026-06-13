/**
 * AUTO HEADS — Mandatory Smoke Tests
 *
 * These tests run on every push (CI) and every "let's go live" deploy.
 * They verify the critical utility layer — the functions that touch data,
 * money, and formatting — without requiring Firebase or Stripe credentials.
 */

import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatNumber,
} from "@/lib/utils/format";

import { cn } from "@/lib/utils/cn";
import { rankProjects } from "@/lib/projects/algorithm";
import {
  loginSchema,
  registerSchema,
  uploadProjectSchema,
} from "@/lib/utils/validate";
import { isAdmin, canEditProject, canDeleteProject } from "@/lib/auth/roles";
import type { Project } from "@/types/project";

// ─── formatCurrency ───────────────────────────────────────────────────────────

describe("formatCurrency", () => {
  it("formats KES amounts with the currency symbol", () => {
    const result = formatCurrency(50000);
    expect(result).toContain("50,000");
  });

  it("formats USD amounts when currency is overridden", () => {
    const result = formatCurrency(1200, "USD");
    expect(result).toContain("1,200");
  });

  it("formats zero without crashing", () => {
    expect(() => formatCurrency(0)).not.toThrow();
  });
});

// ─── formatNumber ─────────────────────────────────────────────────────────────

describe("formatNumber", () => {
  it("leaves small numbers as-is", () => {
    expect(formatNumber(42)).toBe("42");
  });

  it("abbreviates thousands", () => {
    expect(formatNumber(1500)).toBe("1.5K");
  });

  it("abbreviates millions", () => {
    expect(formatNumber(2_400_000)).toBe("2.4M");
  });
});

// ─── formatDate ───────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("returns a non-empty string for a valid date", () => {
    const result = formatDate(new Date("2024-01-15"));
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("accepts ISO string input", () => {
    expect(() => formatDate("2025-06-01T00:00:00Z")).not.toThrow();
  });
});

// ─── formatRelativeTime ───────────────────────────────────────────────────────

describe("formatRelativeTime", () => {
  it("shows 'just now' for very recent timestamps", () => {
    expect(formatRelativeTime(new Date())).toBe("just now");
  });

  it("shows minutes ago", () => {
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
    expect(formatRelativeTime(tenMinsAgo)).toBe("10m ago");
  });

  it("shows hours ago", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoHoursAgo)).toBe("2h ago");
  });

  it("shows days ago", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeDaysAgo)).toBe("3d ago");
  });
});

// ─── cn (class merger) ────────────────────────────────────────────────────────

describe("cn", () => {
  it("merges class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });
});

// ─── Validation schemas ───────────────────────────────────────────────────────

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "david@autoheads.com",
      password: "securePass123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "pass1234" });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({ email: "a@b.com", password: "short" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("accepts a valid registration payload", () => {
    const result = registerSchema.safeParse({
      displayName: "David Abel",
      username: "david_abel",
      email: "david@autoheads.com",
      password: "securePass123",
      phoneNumber: "0712345678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects usernames with spaces or capitals", () => {
    const result = registerSchema.safeParse({
      displayName: "David",
      username: "David Abel",
      email: "d@a.com",
      password: "pass1234",
      phoneNumber: "0712345678",
    });
    expect(result.success).toBe(false);
  });
});

describe("uploadProjectSchema", () => {
  const base = {
    projectName: "V8 Engine Block",
    description: "A well-maintained V8 engine block from a 2019 Land Cruiser.",
    category: "Engine" as const,
    status: "available" as const,
    buyableOptions: { buyWhole: false, buyShares: { enabled: false } },
  };

  it("accepts a valid project upload payload", () => {
    expect(uploadProjectSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a project name that is too short", () => {
    expect(uploadProjectSchema.safeParse({ ...base, projectName: "V8" }).success).toBe(false);
  });

  it("rejects an invalid category", () => {
    expect(uploadProjectSchema.safeParse({ ...base, category: "Spaceship" }).success).toBe(false);
  });
});

// ─── Role-based access ────────────────────────────────────────────────────────

describe("isAdmin", () => {
  it("returns true for admin role", () => expect(isAdmin("admin")).toBe(true));
  it("returns false for user role", () => expect(isAdmin("user")).toBe(false));
});

describe("canEditProject", () => {
  it("allows creator to edit their own project", () => {
    expect(canEditProject("uid1", "uid1", "user")).toBe(true);
  });

  it("allows admin to edit any project", () => {
    expect(canEditProject("adminUid", "creatorUid", "admin")).toBe(true);
  });

  it("denies regular user editing someone else's project", () => {
    expect(canEditProject("uid1", "uid2", "user")).toBe(false);
  });
});

describe("canDeleteProject", () => {
  it("allows creator to delete their own project", () => {
    expect(canDeleteProject("uid1", "uid1", "user")).toBe(true);
  });

  it("allows admin to delete any project", () => {
    expect(canDeleteProject("admin", "creator", "admin")).toBe(true);
  });
});

// ─── Feed ranking algorithm ───────────────────────────────────────────────────

const makeProject = (overrides: Partial<Project>): Project => ({
  id: "p1",
  creatorId: "u1",
  creatorName: "Tester",
  projectName: "Test Project",
  description: "Test",
  category: "Engine",
  media: { type: "image", url: "https://example.com/img.jpg" },
  status: "available",
  currency: "KES",
  engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
  likedBy: [],
  buyableOptions: {
    buyWhole: false,
    buyShares: { enabled: false, totalShares: 0, pricePerShare: 0, availableShares: 0 },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe("rankProjects (feed algorithm)", () => {
  it("places featured projects first", () => {
    const projects = [
      makeProject({ id: "a", status: "available", engagement: { likes: 1000, comments: 500, shares: 100, views: 5000 } }),
      makeProject({ id: "b", status: "featured", engagement: { likes: 1, comments: 0, shares: 0, views: 1 } }),
    ];
    const ranked = rankProjects(projects);
    expect(ranked[0].id).toBe("b");
  });

  it("ranks a high-engagement project above a low-engagement project", () => {
    const recent = new Date();
    const highEngagement = makeProject({
      id: "high",
      engagement: { likes: 200, comments: 100, shares: 50, views: 1000 },
      createdAt: recent,
    });
    const lowEngagement = makeProject({
      id: "low",
      engagement: { likes: 1, comments: 0, shares: 0, views: 5 },
      createdAt: recent,
    });
    const ranked = rankProjects([lowEngagement, highEngagement]);
    expect(ranked[0].id).toBe("high");
  });

  it("returns an empty array for empty input", () => {
    expect(rankProjects([])).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const projects = [
      makeProject({ id: "x" }),
      makeProject({ id: "y" }),
    ];
    const copy = [...projects];
    rankProjects(projects);
    expect(projects[0].id).toBe(copy[0].id);
  });
});

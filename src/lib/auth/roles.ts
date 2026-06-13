import type { UserRole } from "@/types/user";

export const ROLES = {
  USER: "user" as UserRole,
  ADMIN: "admin" as UserRole,
};

export function isAdmin(role: UserRole): boolean {
  return role === ROLES.ADMIN;
}

export function canEditProject(userUid: string, creatorId: string, role: UserRole): boolean {
  return userUid === creatorId || isAdmin(role);
}

export function canDeleteProject(userUid: string, creatorId: string, role: UserRole): boolean {
  return userUid === creatorId || isAdmin(role);
}

export function canManageUsers(role: UserRole): boolean {
  return isAdmin(role);
}

export function canAccessAdminPanel(role: UserRole): boolean {
  return isAdmin(role);
}

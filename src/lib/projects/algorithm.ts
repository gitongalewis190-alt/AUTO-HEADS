import type { Project } from "@/types/project";

// Feed ranking: featured first, then by weighted score.
// Score = (likes * 2) + (comments * 1.5) + (views * 0.5) + recency bonus.
export function rankProjects(projects: Project[]): Project[] {
  const featured = projects.filter((p) => p.status === "featured");
  const rest = projects
    .filter((p) => p.status !== "featured")
    .sort((a, b) => score(b) - score(a));
  return [...featured, ...rest];
}

function score(p: Project): number {
  const ageHours = (Date.now() - new Date(p.createdAt).getTime()) / 3_600_000;
  const recency = Math.max(0, 72 - ageHours) * 0.3;
  return (
    p.engagement.likes * 2 +
    p.engagement.comments * 1.5 +
    p.engagement.views * 0.5 +
    recency
  );
}

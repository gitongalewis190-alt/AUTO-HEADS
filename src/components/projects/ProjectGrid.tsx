"use client";

import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { EmptyState } from "../common/EmptyState";

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
}

export function ProjectGrid({ projects, loading }: ProjectGridProps) {
  if (loading) return <LoadingSkeleton count={12} />;
  if (projects.length === 0) return <EmptyState message="No projects yet" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

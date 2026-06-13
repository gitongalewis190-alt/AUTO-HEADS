"use client";

import type { Project } from "@/types/project";
import { formatCurrency, formatRelativeTime } from "@/lib/utils/format";
import { StatusBadge } from "./StatusBadge";
import { LikeButton } from "../interactions/LikeButton";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass overflow-hidden hover:border-accent/40 transition group cursor-pointer">
      <div className="aspect-video bg-surface relative overflow-hidden">
        {/* TODO: MediaViewer thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center text-text-muted text-caption">
          {project.media.type}
        </div>
        <div className="absolute top-2 right-2">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-body font-heading font-semibold truncate">{project.projectName}</h3>
        <p className="text-caption text-text-muted">{project.creatorName} · {formatRelativeTime(project.createdAt)}</p>
        <div className="flex items-center justify-between">
          {project.price ? (
            <span className="text-body-sm font-heading font-bold text-accent">
              {formatCurrency(project.price)}
            </span>
          ) : (
            <span className="text-caption text-text-muted">No price set</span>
          )}
          <LikeButton projectId={project.id} count={project.engagement.likes} />
        </div>
      </div>
    </article>
  );
}

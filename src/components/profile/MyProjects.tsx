"use client";

import { ProjectGrid } from "../projects/ProjectGrid";

export function MyProjects({ uid }: { uid?: string }) {
  void uid;
  // TODO: Load projects filtered by creatorId == uid || own uid
  return (
    <div>
      <h2 className="text-h3 font-heading font-bold mb-4">Projects</h2>
      <ProjectGrid projects={[]} loading={false} />
    </div>
  );
}

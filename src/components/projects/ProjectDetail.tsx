"use client";

// Full project view — gallery, description, interactions, comments
export function ProjectDetail({ projectId }: { projectId: string }) {
  void projectId;
  // TODO: useProject(projectId), render MediaViewer, InteractModal, FinanceModal, CommentThread
  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-text-muted">Loading project...</p>
    </div>
  );
}

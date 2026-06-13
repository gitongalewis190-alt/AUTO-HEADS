"use client";

import { useComments } from "@/hooks/useComments";

export function CommentThread({ projectId }: { projectId: string }) {
  const { comments, loading } = useComments(projectId);
  if (loading) return <p className="text-text-muted text-body-sm">Loading comments...</p>;
  if (comments.length === 0) return <p className="text-text-muted text-body-sm">No comments yet. Be the first!</p>;
  // TODO: Render comments + reply threads + like button per comment
  return <div>{comments.length} comments</div>;
}

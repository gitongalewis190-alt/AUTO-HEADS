"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatNumber } from "@/lib/utils/format";
import { useLike } from "@/hooks/useLike";

export function LikeButton({ projectId, count }: { projectId: string; count: number }) {
  const { liked, toggle } = useLike(projectId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); void toggle(); }}
      className="flex items-center gap-1 text-caption text-text-muted hover:text-error transition"
    >
      <Heart className={cn("w-4 h-4", liked && "fill-error text-error")} />
      <span>{formatNumber(count)}</span>
    </button>
  );
}

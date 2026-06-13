"use client";

import type { ProjectMedia } from "@/types/project";

export function MediaViewer({ media }: { media: ProjectMedia }) {
  if (media.type === "video") {
    return <video src={media.url} controls className="w-full rounded-glass" />;
  }
  if (media.type === "image" || media.type === "sketch") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.url} alt="Project media" className="w-full rounded-glass object-cover" />;
  }
  return (
    <a href={media.url} target="_blank" rel="noreferrer" className="text-accent underline">
      View document
    </a>
  );
}

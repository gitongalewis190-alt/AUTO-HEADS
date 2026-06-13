"use client";

// TODO: Manage media upload state — progress, preview URL, error.
export function useUpload() {
  return { progress: 0, uploading: false, previewUrl: null, error: null, upload: async (_file: File, _path: string) => "" };
}

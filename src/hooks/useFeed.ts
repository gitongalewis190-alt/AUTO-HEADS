"use client";

// TODO: Infinite-scroll feed with algorithm ranking.
export function useFeed() {
  return { projects: [], loading: true, loadMore: () => {}, hasMore: false };
}

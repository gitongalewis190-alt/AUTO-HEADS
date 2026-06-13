"use client";

import { Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

export function SearchBar() {
  const { query, setQuery } = useSearch();
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-9 pr-4 py-2 bg-surface border border-white/10 rounded-full text-body-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition"
      />
    </div>
  );
}

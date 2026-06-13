"use client";

export function AnalyticsCard() {
  // TODO: useAnalytics() — render earnings, likes, interactions, growth stats
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {["Earnings", "Likes", "Interactions", "Growth"].map((label) => (
        <div key={label} className="glass p-4 text-center">
          <p className="text-h2 font-heading font-bold">—</p>
          <p className="text-text-muted text-caption">{label}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

const KPIs = ["Total Users", "Total Projects", "Total Revenue", "Daily Active Users", "New Signups Today"];

export function StatsOverview() {
  // TODO: Fetch PlatformAnalytics from Cloud Function or Firestore aggregation
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {KPIs.map((label) => (
        <div key={label} className="glass p-4 text-center">
          <p className="text-h2 font-heading font-bold">—</p>
          <p className="text-text-muted text-caption">{label}</p>
        </div>
      ))}
    </div>
  );
}

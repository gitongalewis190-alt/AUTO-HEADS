import { generateMetadata as gm } from "@/lib/utils/seo";
import { StatsOverview } from "@/components/admin/StatsOverview";

export const metadata = gm({ title: "Admin Dashboard", noIndex: true });

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Platform Overview</h1>
      <StatsOverview />
    </div>
  );
}

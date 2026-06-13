import { generateMetadata as gm } from "@/lib/utils/seo";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AnalyticsCard } from "@/components/profile/AnalyticsCard";
import { MyProjects } from "@/components/profile/MyProjects";

export const metadata = gm({ title: "My Profile" });

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <AnalyticsCard />
      <MyProjects />
    </div>
  );
}

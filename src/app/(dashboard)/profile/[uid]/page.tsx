import { generateMetadata as gm } from "@/lib/utils/seo";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { MyProjects } from "@/components/profile/MyProjects";

export const metadata = gm({ title: "Profile" });

export default function PublicProfilePage({ params }: { params: { uid: string } }) {
  return (
    <div className="space-y-6">
      <ProfileHeader uid={params.uid} />
      <MyProjects uid={params.uid} />
    </div>
  );
}

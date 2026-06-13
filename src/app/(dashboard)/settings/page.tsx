import { generateMetadata as gm } from "@/lib/utils/seo";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export const metadata = gm({ title: "Settings" });

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-h2 font-heading font-bold mb-6">Settings</h1>
      <EditProfileForm />
    </div>
  );
}

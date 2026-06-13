import { generateMetadata as gm } from "@/lib/utils/seo";
import { CustomizePanel } from "@/components/admin/CustomizePanel";

export const metadata = gm({ title: "Admin — Customize", noIndex: true });

export default function AdminCustomizePage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Platform Customization</h1>
      <CustomizePanel />
    </div>
  );
}

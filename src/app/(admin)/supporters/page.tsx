import { generateMetadata as gm } from "@/lib/utils/seo";

export const metadata = gm({ title: "Admin — Supporters", noIndex: true });

export default function AdminSupportersPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Supporters</h1>
      {/* TODO: SupportersTable component — add/remove/reorder */}
    </div>
  );
}

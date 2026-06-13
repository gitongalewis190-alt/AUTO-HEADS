import { generateMetadata as gm } from "@/lib/utils/seo";
import { UsersTable } from "@/components/admin/UsersTable";

export const metadata = gm({ title: "Admin — Users", noIndex: true });

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">All Users</h1>
      <UsersTable />
    </div>
  );
}

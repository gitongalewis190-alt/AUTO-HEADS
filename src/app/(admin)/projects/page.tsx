import { generateMetadata as gm } from "@/lib/utils/seo";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const metadata = gm({ title: "Admin — Projects", noIndex: true });

export default function AdminProjectsPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">All Projects</h1>
      <ProjectsTable />
    </div>
  );
}

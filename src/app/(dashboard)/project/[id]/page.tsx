import { generateMetadata as gm } from "@/lib/utils/seo";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

export const metadata = gm({ title: "Project" });

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetail projectId={params.id} />;
}

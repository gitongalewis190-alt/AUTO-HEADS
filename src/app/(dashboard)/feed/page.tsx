import { generateMetadata as gm } from "@/lib/utils/seo";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = gm({ title: "Feed" });

export default function FeedPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Feed</h1>
      {/* TODO: Wire useFeed() hook — ProjectGrid renders fetched projects */}
      <ProjectGrid projects={[]} loading />
    </div>
  );
}

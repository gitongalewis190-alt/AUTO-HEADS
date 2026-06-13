import { generateMetadata as gm } from "@/lib/utils/seo";
import { UploadForm } from "@/components/projects/UploadForm";

export const metadata = gm({ title: "Upload Project" });

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-h2 font-heading font-bold mb-6">Upload Project</h1>
      <UploadForm />
    </div>
  );
}

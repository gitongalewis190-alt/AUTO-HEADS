import { generateMetadata as gm } from "@/lib/utils/seo";

export const metadata = gm({ title: "Search" });

export default function SearchPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Search</h1>
      {/* TODO: SearchBar + results grid */}
    </div>
  );
}

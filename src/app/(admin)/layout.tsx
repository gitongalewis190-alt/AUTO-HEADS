import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth/guards";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Navbar } from "@/components/layout/Navbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = cookies().get("session")?.value;
  await requireAdmin(session);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

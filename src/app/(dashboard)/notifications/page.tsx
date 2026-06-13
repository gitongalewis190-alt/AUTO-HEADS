import { generateMetadata as gm } from "@/lib/utils/seo";

export const metadata = gm({ title: "Notifications" });

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">Notifications</h1>
      {/* TODO: useNotifications() hook + list */}
    </div>
  );
}

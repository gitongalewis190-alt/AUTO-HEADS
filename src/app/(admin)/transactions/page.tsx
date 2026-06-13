import { generateMetadata as gm } from "@/lib/utils/seo";
import { TransactionsTable } from "@/components/admin/TransactionsTable";

export const metadata = gm({ title: "Admin — Transactions", noIndex: true });

export default function AdminTransactionsPage() {
  return (
    <div>
      <h1 className="text-h2 font-heading font-bold mb-6">All Transactions</h1>
      <TransactionsTable />
    </div>
  );
}

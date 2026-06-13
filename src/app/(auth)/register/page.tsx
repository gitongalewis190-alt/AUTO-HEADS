import { generateMetadata as gm } from "@/lib/utils/seo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = gm({ title: "Create Account" });

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}

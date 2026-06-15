import { generateMetadata as gm } from "@/lib/utils/seo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = gm({ title: "Create Account" });

export default function RegisterPage() {
  return <RegisterForm />;
}

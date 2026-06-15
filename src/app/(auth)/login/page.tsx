import { generateMetadata as gm } from "@/lib/utils/seo";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = gm({ title: "Login" });

export default function LoginPage() {
  return <LoginForm />;
}

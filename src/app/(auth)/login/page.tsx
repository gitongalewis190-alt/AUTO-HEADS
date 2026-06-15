import dynamic from "next/dynamic";
import { generateMetadata as gm } from "@/lib/utils/seo";

// ssr: false — prevents Firebase from initialising during Next.js prerender
const LoginForm = dynamic(
  () => import("@/components/auth/LoginForm").then(m => ({ default: m.LoginForm })),
  { ssr: false }
);

export const metadata = gm({ title: "Sign In" });

export default function LoginPage() {
  return <LoginForm />;
}

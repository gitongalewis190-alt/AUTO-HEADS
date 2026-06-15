import dynamic from "next/dynamic";
import { generateMetadata as gm } from "@/lib/utils/seo";

// ssr: false — prevents Firebase from initialising during Next.js prerender
const RegisterForm = dynamic(
  () => import("@/components/auth/RegisterForm").then(m => ({ default: m.RegisterForm })),
  { ssr: false }
);

export const metadata = gm({ title: "Create Account" });

export default function RegisterPage() {
  return <RegisterForm />;
}

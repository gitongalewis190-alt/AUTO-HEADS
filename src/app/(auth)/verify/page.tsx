import { generateMetadata as gm } from "@/lib/utils/seo";

export const metadata = gm({ title: "Verify Email", noIndex: true });

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-h1 font-heading font-bold">Check your email</h1>
      <p className="text-body text-text-muted text-center max-w-md">
        We sent a verification link to your email address. Click it to activate your account.
      </p>
      <p className="text-body-sm text-text-muted">
        Did not receive it? Check your spam folder or{" "}
        <button className="text-accent hover:underline">resend the email</button>.
      </p>
    </div>
  );
}

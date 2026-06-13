import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_PATHS = ["/feed", "/project", "/upload", "/profile", "/search", "/notifications", "/settings"];
const ADMIN_PATHS = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  const isDashboard = DASHBOARD_PATHS.some((p) => pathname.startsWith(p));
  const isAdmin = ADMIN_PATHS.some((p) => pathname.startsWith(p));

  if (!isDashboard && !isAdmin) return NextResponse.next();

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin routes: verify role server-side in the layout instead of here
  // (Edge Middleware cannot import Firebase Admin SDK).
  // The (admin)/layout.tsx calls requireAdmin() via a Server Component.

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/project/:path*",
    "/upload/:path*",
    "/profile/:path*",
    "/search/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};

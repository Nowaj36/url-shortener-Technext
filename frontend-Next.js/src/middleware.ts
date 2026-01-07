import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isHomePage = req.nextUrl.pathname === "/";
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (isHomePage || isLoginPage)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
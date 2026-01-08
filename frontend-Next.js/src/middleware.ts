import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  
  const { pathname } = req.nextUrl;
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname === "/";

  // if token don't exist and trying to access dashboard, redirect to login
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if token exists, check if it's valid
  if (token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isValid = response.ok;

      if (!isValid && isDashboardPage) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("access_token");
        return response;
      }

      if (isValid && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

    } catch (error) {
      console.error("Middleware Auth Error:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
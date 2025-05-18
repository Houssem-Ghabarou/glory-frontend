import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";
import { envconf } from "./lib/env/envconf";

// Create i18n middleware instance
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip i18n middleware for paths starting with /studio
  if (pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  // First apply the i18n middleware (for locale detection and redirects)
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    // If i18n middleware returns a response, proceed with that
    // unless we need to do auth (based on pathname)

    // Apply auth only on admin or home paths
    if (pathname.startsWith("/admin") || pathname.startsWith("/home")) {
      const token = req.cookies.get("token")?.value;

      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      try {
        const decoded = jwt.verify(token, envconf.JWT_SECRET || "");

        if (typeof decoded === "object" && "role" in decoded) {
          const { role } = decoded as JwtPayload;

          if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/home", req.url));
          }

          if (pathname.startsWith("/home") && role !== "user") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
          }

          return intlResponse; // Auth passed and i18n processed
        } else {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } catch (err: unknown) {
        console.error("JWT verification failed:", err);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // If not a protected route, return the i18n response directly
    return intlResponse;
  }

  // Fallback
  return NextResponse.next();
}

// Combined matcher to handle both i18n and protected routes
export const config = {
  matcher: [
    // i18n matcher: everything except static and API paths
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",

    // Auth protected routes
    "/admin/:path*",
    "/home/:path*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envconf } from "./lib/env/envconf";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, envconf.JWT_SECRET);

    // Vérification de type
    if (typeof decoded === "object" && "role" in decoded) {
      const { role } = decoded as JwtPayload;

      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/home", req.url));
      }

      if (pathname.startsWith("/home") && role !== "user") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/home/:path*"],
};

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const STATIC_EXTENSIONS = /\.(png|jpg|jpeg|gif|svg|ico|mp4|webm|pdf|gpx|webp|avif|woff|woff2)$/i;

// NextAuth v5 uses different cookie names than v4
const NEXTAUTH_COOKIE_NAMES = [
  "__Secure-authjs.session-token", // production (HTTPS)
  "authjs.session-token",          // development (HTTP)
  "next-auth.session-token",       // legacy fallback
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    let token = null;
    for (const cookieName of NEXTAUTH_COOKIE_NAMES) {
      token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        cookieName,
      });
      if (token) break;
    }
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Preview password protection for public routes
  const previewPassword = process.env.PREVIEW_PASSWORD;
  if (
    previewPassword &&
    !pathname.startsWith("/access") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !STATIC_EXTENSIONS.test(pathname)
  ) {
    const cookie = request.cookies.get("preview-access");
    if (cookie?.value !== previewPassword) {
      const url = request.nextUrl.clone();
      url.pathname = "/access";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/_auth/session/auth-session";
import { isAuthRoute, isProtectedRoute } from "./_routes/routes";

export async function middleware(request: NextRequest) {
  const sessionResponse = await updateSession(request);
  if (!sessionResponse.ok) {
    return isProtectedRoute(request.nextUrl.pathname)
      ? NextResponse.redirect(new URL("/entrar", request.url))
      : sessionResponse.response;
  }

  const isAuthenticated = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  if (isAuthenticated && isAuthRoute(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthenticated && isProtectedRoute(path)) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  return sessionResponse.response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

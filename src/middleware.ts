import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware stub for future authentication integration.
 * When NextAuth is added, check session and redirect unauthenticated users.
 */
export function middleware(_request: NextRequest) {
  // Future: check auth session here
  // const session = await getToken({ req: request });
  // if (!session && isProtectedRoute(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API health checks
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

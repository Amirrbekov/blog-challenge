import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/"];
const authRoutes = ["/signIn", "/signUp"];

function isAuthenticated(request: NextRequest): boolean {
  return true;
}

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route.includes("*")) {
      const routePattern = route.replace("*", "");
      return pathname.startsWith(routePattern);
    }
    return pathname === route || pathname.startsWith(route + "/");
  });
}
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = isAuthenticated(request);

  console.log(`🔍 Middleware: ${pathname} | Authenticated: ${isAuth}`);

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (matchesRoute(pathname, protectedRoutes)) {
    if (!isAuth) {
      console.log(`🚫 Access denied to ${pathname} - redirecting to login`);
      const loginUrl = new URL("/signIn", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (matchesRoute(pathname, authRoutes)) {
    if (isAuth) {
      console.log(
        `🔄 Already authenticated - redirecting from ${pathname} to home`
      );
      const redirectTo = request.nextUrl.searchParams.get("redirect") || "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

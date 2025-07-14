import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/notes", "/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));


  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

 
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};

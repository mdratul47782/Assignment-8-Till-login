
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Redirect to /guest if the user is at the root URL
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/guest", request.url));
  }

  // Allow other paths to continue
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/"], // This ensures middleware only applies to the root URL
};
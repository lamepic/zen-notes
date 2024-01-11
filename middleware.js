import { NextResponse } from "next/server";

export default function middleware(request) {
  const authenticated = request.cookies.get("zen-notes-auth")?.value;

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard"],
};

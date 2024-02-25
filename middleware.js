import { NextResponse } from 'next/server';

export default function middleware(request) {
  const authenticated = request.cookies.get('zen-notes-auth')?.value ?? false;

  if (request.nextUrl.pathname.startsWith('/dashboard') && !authenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/login') && authenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

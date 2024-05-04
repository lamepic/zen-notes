import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    const hasCookie = cookies().has('zen-note');
    if (hasCookie) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}

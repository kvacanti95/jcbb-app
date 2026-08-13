import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // FIGHTER accounts can only reach their own profile editor — everything
  // else under /admin redirects there, enforced here (not just hidden in
  // the UI) so it can't be bypassed by typing a URL directly.
  if (token.role === 'FIGHTER' && pathname !== '/admin/my-profile') {
    return NextResponse.redirect(new URL('/admin/my-profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

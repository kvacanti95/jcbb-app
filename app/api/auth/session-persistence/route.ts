import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NextAuth v4's session maxAge is fixed config, not something the sign-in
// flow can vary per request — so "Remember me" is implemented by rewriting
// the session cookie NextAuth already set. Checked (default): leave it
// alone, keeping the persistent expiry. Unchecked: re-set it with no
// Max-Age/Expires, turning it into a session-only cookie that clears when
// the browser fully closes.
const SESSION_COOKIE_NAMES = ['__Secure-next-auth.session-token', 'next-auth.session-token'];

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  for (const name of SESSION_COOKIE_NAMES) {
    const existing = request.cookies.get(name);
    if (existing) {
      response.cookies.set(name, existing.value, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: name.startsWith('__Secure-'),
      });
      break;
    }
  }

  return response;
}

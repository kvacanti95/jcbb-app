import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== 'string' ||
    typeof body.email !== 'string' ||
    typeof body.message !== 'string' ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }

  console.log('New JCBB contact submission:', {
    name: body.name,
    email: body.email,
    phone: body.phone ?? '',
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}

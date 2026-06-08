import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';

// verifyAdminToken lives in @/lib/adminAuth — exported from there, not from a route file

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(`admin-auth:${ip}`, 5, 300_000)) {
    return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 });
  }

  const { password } = await req.json().catch(() => ({ password: '' }));

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  // Simple token: base64(timestamp:secret_hash) — no JWT dep needed
  const token = Buffer.from(
    `${Date.now()}:${process.env.ADMIN_SECRET ?? 'secret'}`
  ).toString('base64');

  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('admin_token');
  return res;
}


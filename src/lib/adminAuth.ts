import type { NextRequest } from 'next/server';

export function verifyAdminToken(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [ts] = decoded.split(':');
    const age = Date.now() - parseInt(ts, 10);
    return age < 8 * 60 * 60 * 1000; // 8 hours
  } catch {
    return false;
  }
}

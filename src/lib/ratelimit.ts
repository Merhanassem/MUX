// Simple in-memory rate limiter — good enough for a portfolio
// For high-traffic production, swap this for @upstash/ratelimit with Redis

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (entry.count >= limit) return false; // blocked

  entry.count++;
  return true; // allowed
}

// Hash IP for privacy — never store raw IPs
export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + (process.env.ADMIN_SECRET ?? 'salt'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('').slice(0, 16);
}

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation';
import { checkRateLimit, hashIp } from '@/lib/ratelimit';
import { ownerNotificationHtml, visitorConfirmationHtml } from '@/lib/email/templates';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ────────────────────────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown';

    if (!checkRateLimit(ip, 3, 60_000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    // ── Parse & validate ─────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Validation failed.';
      return NextResponse.json({ error: firstError }, { status: 422 });
    }

    const { name, email, company, topic, budget, message, website } = result.data;

    // ── Honeypot bot check ───────────────────────────────────────────────────
    if (website) {
      // Silently succeed — don't reveal honeypot
      return NextResponse.json({ success: true });
    }

    const ipHash = await hashIp(ip);

    // ── Save to Supabase ─────────────────────────────────────────────────────
    let leadId: string | null = null;
    try {
      const { createServerClient } = await import('@/lib/supabase/server');
      const db = createServerClient();
      const { data } = await db.from('leads').insert({
        name, email, company, topic, budget, message,
        status: 'new',
        ip_hash: ipHash,
      }).select('id').single();
      leadId = data?.id ?? null;
    } catch (dbErr) {
      // Non-fatal — log but continue so user isn't blocked if DB is down
      console.error('[contact] DB error:', dbErr);
    }

    // ── Send emails ──────────────────────────────────────────────────────────
    const fromEmail = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
    const toEmail   = process.env.CONTACT_EMAIL ?? 'merhanassem22@gmail.com';

    try {
      await Promise.all([
        // Notification to owner
        resend.emails.send({
          from: `MUX Portfolio <${fromEmail}>`,
          to:   toEmail,
          subject: `New inquiry from ${name}${topic ? ` — ${topic}` : ''}`,
          html: ownerNotificationHtml({ name, email, company, topic, budget, message }),
          replyTo: email,
        }),
        // Confirmation to visitor
        resend.emails.send({
          from: `Merhan Assem <${fromEmail}>`,
          to:   email,
          subject: 'Got your message — talk soon',
          html: visitorConfirmationHtml({ name }),
        }),
      ]);
    } catch (emailErr) {
      console.error('[contact] Email error:', emailErr);
      // If email fails but DB succeeded, still return success
      // The lead is saved and owner can follow up manually
    }

    return NextResponse.json({ success: true, id: leadId });

  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email directly.' },
      { status: 500 }
    );
  }
}

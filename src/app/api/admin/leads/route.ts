import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/adminAuth';
import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

export const runtime = 'nodejs';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// GET /api/admin/leads?status=new&search=john&page=1
export async function GET(req: NextRequest) {
  if (!verifyAdminToken(req)) return unauthorized();

  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.trim();
  const page   = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit  = 20;

  const db = createServerClient();
  let query = db.from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (status && ['new','replied','closed'].includes(status)) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ leads: data, total: count, page, limit });
}

// PATCH /api/admin/leads — update status or notes
const patchSchema = z.object({
  id:     z.string().uuid(),
  status: z.enum(['new','replied','closed']).optional(),
  notes:  z.string().max(2000).optional(),
});

export async function PATCH(req: NextRequest) {
  if (!verifyAdminToken(req)) return unauthorized();

  const body = await req.json().catch(() => null);
  const result = patchSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: 'Invalid input' }, { status: 422 });

  const { id, ...updates } = result.data;
  const db = createServerClient();
  const { error } = await db.from('leads').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

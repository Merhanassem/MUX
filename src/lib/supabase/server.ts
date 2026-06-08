import { createClient } from '@supabase/supabase-js';

// Server-only client — never expose service role key to browser
export function createServerClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  topic: string | null;
  budget: string | null;
  message: string;
  status: 'new' | 'replied' | 'closed';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Supabase singleton client.
 * Safe to import on both client and server.
 * Returns null gracefully when env vars are missing (offline/localStorage mode).
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!_client) {
    _client = createClient(url, key);
  }

  return _client;
}

export type { SupabaseClient };

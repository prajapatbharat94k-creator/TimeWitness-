/**
 * admin.ts — Privileged Supabase Admin Client
 *
 * SECURITY RULES:
 *  - This file MUST only be imported by Next.js API Route handlers
 *    (files under src/app/api/) or server-only utility modules.
 *  - NEVER import this file in:
 *    · Client components ('use client')
 *    · Pages that render client-side
 *    · Any file that ends up in the browser bundle
 *  - The SUPABASE_SERVICE_ROLE_KEY env var must NOT have the
 *    NEXT_PUBLIC_ prefix — that would expose it to the browser.
 */

import { createClient } from '@supabase/supabase-js'

/**
 * Returns a Supabase client authenticated with the service-role key.
 * Bypasses Row Level Security — use only for trusted admin operations.
 * Throws if the required environment variables are not set.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Use the industry-standard env var name SUPABASE_SERVICE_ROLE_KEY.
  // Must NOT have the NEXT_PUBLIC_ prefix.
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error(
      '[admin.ts] NEXT_PUBLIC_SUPABASE_URL is not set. Add it to .env.local.'
    )
  }

  if (!serviceRoleKey) {
    throw new Error(
      '[admin.ts] SUPABASE_SERVICE_ROLE_KEY is not set. ' +
        'Add it to .env.local — never prefix with NEXT_PUBLIC_.'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

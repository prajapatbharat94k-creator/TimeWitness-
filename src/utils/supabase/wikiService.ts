/**
 * wikiService.ts
 *
 * SERVER-SIDE ONLY — imported exclusively by Next.js API route handlers.
 * Never import this file in client components or pages.
 *
 * Key architecture:
 *  - Public Supabase READ  → anon key  (NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *  - Admin  Supabase WRITE → service role key (SUPABASE_SERVICE_ROLE_KEY)
 *    kept in createAdminClient(), never exposed to the browser.
 */

import { createClient as createSupabaseJS } from '@supabase/supabase-js'
import localCache from '@/data/wikiKnowledgeCache.json'
import { createAdminClient } from '@/utils/supabase/admin'

export interface HistoricalKnowledgeRecord {
  slug: string
  title: string
  description?: string
  extract: string
  thumbnail_url?: string | null
  page_url?: string
  era?: string
  tags?: string[]
  source?: 'supabase' | 'local-cache' | 'wikipedia-live'
}

// ─── Server-side anon client (no secret key) ─────────────────────────────────
// Used for public READ queries that respect Row Level Security.
function createServerAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null

  return createSupabaseJS(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * Clean query string for keyword matching
 */
function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim()
}

/**
 * Search pre-populated local JSON cache for a matching historical topic.
 * Zero network calls — <1ms.
 */
function findInLocalCache(query: string): HistoricalKnowledgeRecord | null {
  const normQuery = normalizeString(query)
  if (!normQuery) return null

  const match = (localCache as HistoricalKnowledgeRecord[]).find((item) => {
    const normTitle = normalizeString(item.title)
    const normSlug = normalizeString(item.slug)

    if (normQuery.includes(normTitle) || normTitle.includes(normQuery)) return true
    if (normQuery.includes(normSlug) || normSlug.includes(normQuery)) return true

    if (item.tags && Array.isArray(item.tags)) {
      return item.tags.some((tag) => normQuery.includes(normalizeString(tag)))
    }

    return false
  })

  return match ? { ...match, source: 'local-cache' } : null
}

/**
 * Fetch summary directly from Wikipedia REST API.
 * Falls back gracefully — no error thrown to caller.
 */
export async function fetchLiveWikipedia(topic: string): Promise<HistoricalKnowledgeRecord | null> {
  try {
    const cleanTopic = topic.trim().replace(/\s+/g, '_')
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTopic)}`,
      {
        headers: { 'User-Agent': 'TimeWitness/1.0 (historical-learning-app)' },
        next: { revalidate: 86400 }, // Cache 24 hours in Next.js data cache
      }
    )

    if (!res.ok) return null

    const data = await res.json()
    if (!data.extract) return null

    const record: HistoricalKnowledgeRecord = {
      slug: cleanTopic.toLowerCase(),
      title: data.title,
      description: data.description || '',
      extract: data.extract,
      thumbnail_url: data.thumbnail?.source || null,
      page_url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${cleanTopic}`,
      source: 'wikipedia-live',
    }

    // Fire-and-forget: persist to Supabase without blocking the response
    persistToSupabaseAsync(record).catch(() => {})

    return record
  } catch {
    return null
  }
}

/**
 * Fire-and-forget: persist a Wikipedia record to Supabase using the
 * admin/service-role client. This runs ONLY server-side in API routes.
 * The service-role key is NEVER sent to the browser.
 */
async function persistToSupabaseAsync(record: HistoricalKnowledgeRecord) {
  try {
    const admin = createAdminClient()
    await admin.from('historical_knowledge').upsert(
      {
        slug: record.slug,
        title: record.title,
        description: record.description,
        extract: record.extract,
        thumbnail_url: record.thumbnail_url,
        page_url: record.page_url,
        era: record.era || 'Historical Era',
        tags: record.tags || [record.slug],
      },
      { onConflict: 'slug' }
    )
  } catch {
    // Graceful: table might not exist yet — local cache still works
  }
}

/**
 * Primary knowledge retrieval function (server-side only):
 *
 * Priority:
 *  1. Supabase public READ with anon key + RLS  (<30ms when table exists)
 *  2. Pre-populated local JSON cache             (<1ms, always available)
 *  3. Live Wikipedia REST API                   (<200ms, no API key needed)
 */
export async function getHistoricalKnowledge(
  query: string
): Promise<HistoricalKnowledgeRecord | null> {
  if (!query || !query.trim()) return null

  // 1. Try Supabase (anon key, RLS-protected public read)
  try {
    const supabase = createServerAnonClient()
    if (supabase) {
      const clean = query.trim().toLowerCase()
      const { data, error } = await supabase
        .from('historical_knowledge')
        .select('slug, title, description, extract, thumbnail_url, page_url, era, tags')
        .or(`title.ilike.%${clean}%,slug.ilike.%${clean}%`)
        .limit(1)

      if (!error && data && data.length > 0) {
        return { ...data[0], source: 'supabase' }
      }
    }
  } catch {
    // Continue to local cache on any Supabase error
  }

  // 2. Try pre-populated local cache (28 core historical topics)
  const cached = findInLocalCache(query)
  if (cached) return cached

  // 3. Try live Wikipedia REST API
  return fetchLiveWikipedia(query)
}

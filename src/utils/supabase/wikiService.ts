import localCache from '@/data/wikiKnowledgeCache.json'
import { createClient } from '@/utils/supabase/client'
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

/**
 * Clean query string for keyword matching
 */
function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim()
}

/**
 * Search local cache for a matching historical topic
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
      const tagMatch = item.tags.some((tag) => normQuery.includes(normalizeString(tag)))
      if (tagMatch) return true
    }

    return false
  })

  return match ? { ...match, source: 'local-cache' } : null
}

/**
 * Fetch summary directly from Wikipedia REST API
 */
export async function fetchLiveWikipedia(topic: string): Promise<HistoricalKnowledgeRecord | null> {
  try {
    const cleanTopic = topic.trim().replace(/\s+/g, '_')
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTopic)}`, {
      headers: {
        'User-Agent': 'TimeWitness/1.0 (historical-learning-app)'
      },
      next: { revalidate: 86400 } // Cache for 24 hours in Next.js
    })

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
      source: 'wikipedia-live'
    }

    // Attempt background persistence to Supabase without blocking
    persistToSupabaseAsync(record).catch(() => {})

    return record
  } catch {
    return null
  }
}

/**
 * Fire-and-forget save to Supabase
 */
async function persistToSupabaseAsync(record: HistoricalKnowledgeRecord) {
  try {
    const admin = createAdminClient()
    await admin.from('historical_knowledge').upsert({
      slug: record.slug,
      title: record.title,
      description: record.description,
      extract: record.extract,
      thumbnail_url: record.thumbnail_url,
      page_url: record.page_url,
      era: record.era || 'Historical Era',
      tags: record.tags || [record.slug]
    }, { onConflict: 'slug' })
  } catch {
    // Graceful: Table might not exist yet
  }
}

/**
 * Primary retrieval function:
 * 1. Queries Supabase for fast cached record (<30ms)
 * 2. Falls back to pre-populated local cache (<1ms)
 * 3. Falls back to live Wikipedia API (<200ms)
 */
export async function getHistoricalKnowledge(query: string): Promise<HistoricalKnowledgeRecord | null> {
  if (!query || !query.trim()) return null

  // 1. Try Supabase
  try {
    const supabase = createClient()
    const clean = query.trim().toLowerCase()

    const { data, error } = await supabase
      .from('historical_knowledge')
      .select('*')
      .or(`title.ilike.%${clean}%,slug.ilike.%${clean}%`)
      .limit(1)

    if (!error && data && data.length > 0) {
      return { ...data[0], source: 'supabase' }
    }
  } catch {
    // Continue to local cache on any error
  }

  // 2. Try pre-populated local cache (28 core historical topics)
  const cached = findInLocalCache(query)
  if (cached) {
    return cached
  }

  // 3. Try live Wikipedia REST API
  const live = await fetchLiveWikipedia(query)
  if (live) {
    return live
  }

  return null
}

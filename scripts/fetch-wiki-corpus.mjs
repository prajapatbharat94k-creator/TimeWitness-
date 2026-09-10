import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// SECURITY: Read credentials from environment only — never hardcode keys here.
// Set these in your shell before running this script:
//   $env:NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
//   $env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY ' +
    'environment variables must be set before running this script.\n' +
    'These are server-side only — never commit them to source control.'
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const HISTORICAL_TOPICS = [
  { slug: 'shivaji-maharaj', title: 'Shivaji', era: '1630–1680 AD', tags: ['maratha', 'swarajya', 'shivaji', 'raigad'] },
  { slug: 'rani-lakshmibai', title: 'Rani_of_Jhansi', era: '1828–1858 AD', tags: ['jhansi', '1857', 'freedom', 'sepoy'] },
  { slug: 'napoleon-bonaparte', title: 'Napoleon', era: '1769–1821 AD', tags: ['france', 'waterloo', 'emperor', 'europe'] },
  { slug: 'ashoka-the-great', title: 'Ashoka', era: '304–232 BCE', tags: ['maurya', 'buddhism', 'kalinga', 'magadha'] },
  { slug: 'indus-valley-civilisation', title: 'Indus_Valley_Civilisation', era: '3300–1300 BCE', tags: ['harappa', 'mohenjo-daro', 'bronze age'] },
  { slug: 'battle-of-panipat', title: 'First_Battle_of_Panipat', era: '1526 AD', tags: ['panipat', 'babar', 'ibrahim lodi', 'mughal'] },
  { slug: 'french-revolution', title: 'French_Revolution', era: '1789–1799 AD', tags: ['bastille', 'liberty', 'france', 'monarchy'] },
  { slug: 'chandragupta-maurya', title: 'Chandragupta_Maurya', era: '340–295 BCE', tags: ['chanakya', 'maurya', 'pataliputra'] },
  { slug: 'maharana-pratap', title: 'Maharana_Pratap', era: '1540–1597 AD', tags: ['mewar', 'haldighati', 'rajput'] },
  { slug: 'subhas-chandra-bose', title: 'Subhas_Chandra_Bose', era: '1897–1945 AD', tags: ['netaji', 'ina', 'freedom fighter'] },
  { slug: 'bhagat-singh', title: 'Bhagat_Singh', era: '1907–1931 AD', tags: ['revolution', 'independence', 'socialism'] },
  { slug: 'alexander-the-great', title: 'Alexander_the_Great', era: '356–323 BCE', tags: ['macedon', 'greece', 'conquest', 'persia'] },
  { slug: 'julius-caesar', title: 'Julius_Caesar', era: '100–44 BCE', tags: ['rome', 'senate', 'empire', 'republic'] },
  { slug: 'genghis-khan', title: 'Genghis_Khan', era: '1162–1227 AD', tags: ['mongol', 'steppe', 'empire'] },
  { slug: 'american-revolution', title: 'American_Revolutionary_War', era: '1775–1783 AD', tags: ['america', 'independence', 'washington'] },
  { slug: 'renaissance', title: 'Renaissance', era: '14th–17th Century', tags: ['art', 'florence', 'science', 'humanism'] },
  { slug: 'fall-of-constantinople', title: 'Fall_of_Constantinople', era: '1453 AD', tags: ['ottoman', 'byzantine', 'mehmed ii'] },
  { slug: 'battle-of-plassey', title: 'Battle_of_Plassey', era: '1757 AD', tags: ['clive', 'siraj-ud-daulah', 'east india company'] },
  { slug: 'mughal-empire', title: 'Mughal_Empire', era: '1526–1857 AD', tags: ['akbar', 'shah jahan', 'agra', 'delhi'] },
  { slug: 'chola-dynasty', title: 'Chola_dynasty', era: '300 BCE–1279 CE', tags: ['rajaraja', 'rajendra', 'maritime', 'tamil'] },
  { slug: 'tipu-sultan', title: 'Tipu_Sultan', era: '1751–1799 AD', tags: ['mysore', 'tiger of mysore', 'anglo-mysore'] },
  { slug: 'maratha-empire', title: 'Maratha_Empire', era: '1674–1818 AD', tags: ['peshwa', 'deccan', 'pune', 'swarajya'] },
  { slug: 'world-war-i', title: 'World_War_I', era: '1914–1918 AD', tags: ['great war', 'allies', 'trenches', 'versailles'] },
  { slug: 'world-war-ii', title: 'World_War_II', era: '1939–1945 AD', tags: ['axis', 'allies', 'd-day', 'atomic bomb'] },
  { slug: 'magna-carta', title: 'Magna_Carta', era: '1215 AD', tags: ['england', 'charter', 'rights', 'king john'] },
  { slug: 'leonardo-da-vinci', title: 'Leonardo_da_Vinci', era: '1452–1519 AD', tags: ['mona lisa', 'renaissance', 'polymath'] },
  { slug: 'gautama-buddha', title: 'Gautama_Buddha', era: 'c. 6th–5th Century BCE', tags: ['buddhism', 'dharma', 'enlightenment'] },
  { slug: 'mahatma-gandhi', title: 'Mahatma_Gandhi', era: '1869–1948 AD', tags: ['ahimsa', 'satyagraha', 'independence', 'dandi'] }
]

async function fetchWikipediaSummary(wikiTitle) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'TimeWitness-HistoricalApp/1.0 (https://timewitness.dev)'
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${wikiTitle} (status: ${res.status})`)
  }

  const data = await res.json()
  return {
    title: data.title,
    description: data.description || '',
    extract: data.extract || '',
    thumbnail_url: data.thumbnail?.source || null,
    page_url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${wikiTitle}`
  }
}

async function main() {
  console.log(`Starting Wikipedia Ingestion for ${HISTORICAL_TOPICS.length} historical topics...\n`)

  const collectedData = []

  for (let i = 0; i < HISTORICAL_TOPICS.length; i++) {
    const item = HISTORICAL_TOPICS[i]
    try {
      const summary = await fetchWikipediaSummary(item.title)
      const record = {
        slug: item.slug,
        title: summary.title,
        description: summary.description,
        extract: summary.extract,
        thumbnail_url: summary.thumbnail_url,
        page_url: summary.page_url,
        era: item.era,
        tags: item.tags,
        updated_at: new Date().toISOString()
      }
      collectedData.push(record)
      console.log(`[${i + 1}/${HISTORICAL_TOPICS.length}] ✓ ${record.title} (${item.era})`)
    } catch (err) {
      console.warn(`[${i + 1}/${HISTORICAL_TOPICS.length}] ✗ Error fetching ${item.title}:`, err.message)
    }

    // Small delay to be polite to Wikipedia API
    await new Promise((resolve) => setTimeout(resolve, 150))
  }

  // 1. Save locally to src/data/wikiKnowledgeCache.json
  const outDir = path.join(__dirname, '..', 'src', 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const cachePath = path.join(outDir, 'wikiKnowledgeCache.json')
  fs.writeFileSync(cachePath, JSON.stringify(collectedData, null, 2), 'utf-8')
  console.log(`\nSuccessfully cached ${collectedData.length} topics in: ${cachePath}`)

  // 2. Try inserting into Supabase if table exists
  console.log('\nChecking Supabase table `historical_knowledge`...')
  try {
    const { error } = await supabase.from('historical_knowledge').upsert(collectedData, { onConflict: 'slug' })
    if (error) {
      console.log(`Notice: Supabase upsert responded with [${error.code}]: ${error.message}`)
      console.log('Local high-speed cache is active. Once the table is created in Supabase SQL Editor, re-run this script to sync!')
    } else {
      console.log(`✓ Successfully synced all ${collectedData.length} records to Supabase!`)
    }
  } catch (err) {
    console.log('Supabase sync skipped (will use local cache):', err.message)
  }
}

main()

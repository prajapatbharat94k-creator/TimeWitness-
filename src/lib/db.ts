/**
 * Server-side Supabase database helpers.
 * All functions degrade gracefully (return null/[]) when Supabase is unavailable.
 * Never throws — callers always get a safe fallback value.
 */
import { getSupabaseClient } from './supabase';
import type { HistoricalScene } from '@/app/api/generate-story/route';

export interface DbExperience {
  id: string;
  title: string;
  slug: string;
  subject: string;
  event: string;
  year: string | null;
  location: string | null;
  category: string | null;
  description: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbScene {
  id: string;
  experience_id: string;
  scene_number: number;
  title: string;
  narration: string;
  image_url: string | null;
  historical_fact: string | null;
  reconstruction_note: string | null;
  simulation_note: string | null;
  created_at: string;
}

export interface DbSource {
  id: string;
  experience_id: string;
  title: string;
  publisher: string | null;
  year: string | null;
  url: string | null;
  relevance: string | null;
  source_type: string | null;
  created_at: string;
}

/** Slugify a topic string for use as a DB key */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

/**
 * Check if a cached experience exists in Supabase for the given topic+language.
 * Returns the scenes array if found, null otherwise.
 */
export async function getCachedExperience(
  topic: string,
  language: string
): Promise<{ scenes: HistoricalScene[]; experienceId: string } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const slug = slugify(`${topic}-${language}`);

    const { data: experience, error: expError } = await supabase
      .from('historical_experiences')
      .select('id, title')
      .eq('slug', slug)
      .maybeSingle();

    if (expError || !experience) return null;

    const { data: dbScenes, error: scenesError } = await supabase
      .from('historical_scenes')
      .select('*')
      .eq('experience_id', experience.id)
      .order('scene_number', { ascending: true });

    if (scenesError || !dbScenes || dbScenes.length === 0) return null;

    const scenes: HistoricalScene[] = dbScenes.map((s: DbScene) => ({
      sceneNumber: s.scene_number,
      era: s.title,
      title: s.title,
      narration: s.narration,
      imagePrompt: s.image_url || '',
      ambientTag: 'palace_ambience',
      historicalFact: s.historical_fact || undefined,
      reconstructionNote: s.reconstruction_note || undefined,
      simulationNote: s.simulation_note || undefined,
    }));

    return { scenes, experienceId: experience.id };
  } catch {
    return null;
  }
}

/**
 * Persist a generated experience and its scenes to Supabase.
 * Silently no-ops on failure.
 */
export async function saveExperience(
  topic: string,
  language: string,
  scenes: HistoricalScene[]
): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase || scenes.length === 0) return null;

  try {
    const slug = slugify(`${topic}-${language}`);
    const title = scenes[0]?.title || topic;

    // Upsert experience
    const { data: experience, error: expError } = await supabase
      .from('historical_experiences')
      .upsert(
        {
          slug,
          title: topic,
          subject: topic,
          event: topic,
          description: title,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select('id')
      .single();

    if (expError || !experience) return null;

    const experienceId = experience.id;

    // Delete old scenes and re-insert
    await supabase
      .from('historical_scenes')
      .delete()
      .eq('experience_id', experienceId);

    const sceneRows = scenes.map((s) => ({
      experience_id: experienceId,
      scene_number: s.sceneNumber,
      title: s.title,
      narration: s.narration,
      image_url: s.imagePrompt || null,
      historical_fact: s.historicalFact || null,
      reconstruction_note: s.reconstructionNote || null,
      simulation_note: s.simulationNote || null,
    }));

    await supabase.from('historical_scenes').insert(sceneRows);

    return experienceId;
  } catch {
    return null;
  }
}

/**
 * Fetch sources for a given experience from Supabase.
 */
export async function getSources(experienceId: string): Promise<DbSource[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('historical_sources')
      .select('*')
      .eq('experience_id', experienceId)
      .order('created_at', { ascending: true });

    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/**
 * Record a user history entry (no-op if not authenticated).
 */
export async function recordUserHistory(
  userId: string | null,
  experienceId: string
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase || !userId) return;

  try {
    await supabase.from('user_history').upsert(
      { user_id: userId, experience_id: experienceId, last_viewed_at: new Date().toISOString() },
      { onConflict: 'user_id,experience_id' }
    );
  } catch {
    // Silent — non-critical
  }
}

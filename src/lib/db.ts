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

import {
  getUserFavorites,
  setUserFavorite,
  getUserSaved,
  setUserSaved,
  getUserHistory,
  addUserHistory,
  getUserActivities,
  getLocalProfile,
  updateLocalProfile,
  ExperienceCardData,
  ActivityEntry
} from './localStorage';

export type { ExperienceCardData, ActivityEntry };

/**
 * Record a user history entry (graceful offline / Supabase).
 */
export async function recordUserHistory(
  userId: string | null,
  experienceId: string,
  cardData?: ExperienceCardData
): Promise<void> {
  // Always update local cache/history
  if (cardData) {
    addUserHistory(cardData, userId);
  }

  const supabase = getSupabaseClient();
  if (!supabase || !userId) return;

  try {
    await supabase.from('user_history').upsert(
      { user_id: userId, experience_id: experienceId, last_viewed_at: new Date().toISOString() },
      { onConflict: 'user_id,experience_id' }
    );
  } catch {
    // Silent fallback
  }
}

/** Profile and Preferences */
export interface DbProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  language: string;
  voice_enabled: boolean;
  autoplay: boolean;
  theme: string;
}

export async function getProfile(userId: string | null | undefined): Promise<DbProfile> {
  const targetId = userId || 'guest';
  const localProf = getLocalProfile(targetId);
  if (!userId) {
    return localProf;
  }
  const supabase = getSupabaseClient();
  if (!supabase) return localProf;

  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error || !data) return localProf;
    return {
      ...localProf,
      ...data,
    };
  } catch {
    return localProf;
  }
}

export async function updateProfile(userId: string | null | undefined, updates: Partial<DbProfile>): Promise<boolean> {
  const targetId = userId || 'guest';
  // Save locally first
  updateLocalProfile(targetId, updates);

  if (!userId) return true;

  const supabase = getSupabaseClient();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('profiles').upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });
    return !error;
  } catch {
    return true; // Local update was successful
  }
}

/** Favorites */
export async function getFavorites(userId?: string | null): Promise<ExperienceCardData[]> {
  const localData = getUserFavorites(userId);
  const supabase = getSupabaseClient();
  if (!supabase || !userId) return localData;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, historical_experiences(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return localData;
    return data.map(d => ({
      id: d.historical_experiences?.id || d.experience_id,
      title: d.historical_experiences?.title || 'Historical Event',
      subject: d.historical_experiences?.subject || d.historical_experiences?.title || 'History',
      year: d.historical_experiences?.year || undefined,
      location: d.historical_experiences?.location || undefined,
      cover_image: d.historical_experiences?.cover_image || undefined,
      slug: d.historical_experiences?.slug || d.experience_id,
      added_at: d.created_at,
    }));
  } catch {
    return localData;
  }
}

export async function toggleFavorite(
  userId: string | null | undefined, 
  experienceId: string, 
  isFavorite: boolean,
  cardData?: ExperienceCardData
): Promise<boolean> {
  if (cardData) {
    setUserFavorite(cardData, isFavorite, userId);
  } else {
    setUserFavorite({
      id: experienceId,
      title: experienceId,
      subject: experienceId,
      slug: experienceId,
    }, isFavorite, userId);
  }

  const supabase = getSupabaseClient();
  if (!supabase || !userId) return true;

  try {
    if (isFavorite) {
      const { error } = await supabase.from('favorites').insert({ user_id: userId, experience_id: experienceId });
      return !error;
    } else {
      const { error } = await supabase.from('favorites').delete().match({ user_id: userId, experience_id: experienceId });
      return !error;
    }
  } catch {
    return true;
  }
}

/** Saved Experiences */
export async function getSavedExperiences(userId?: string | null): Promise<ExperienceCardData[]> {
  const localData = getUserSaved(userId);
  const supabase = getSupabaseClient();
  if (!supabase || !userId) return localData;

  try {
    const { data, error } = await supabase
      .from('saved_experiences')
      .select('*, historical_experiences(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return localData;
    return data.map(d => ({
      id: d.historical_experiences?.id || d.experience_id,
      title: d.historical_experiences?.title || 'Historical Event',
      subject: d.historical_experiences?.subject || d.historical_experiences?.title || 'History',
      year: d.historical_experiences?.year || undefined,
      location: d.historical_experiences?.location || undefined,
      cover_image: d.historical_experiences?.cover_image || undefined,
      slug: d.historical_experiences?.slug || d.experience_id,
      added_at: d.created_at,
    }));
  } catch {
    return localData;
  }
}

export async function toggleSaved(
  userId: string | null | undefined, 
  experienceId: string, 
  isSaved: boolean,
  cardData?: ExperienceCardData
): Promise<boolean> {
  if (cardData) {
    setUserSaved(cardData, isSaved, userId);
  } else {
    setUserSaved({
      id: experienceId,
      title: experienceId,
      subject: experienceId,
      slug: experienceId,
    }, isSaved, userId);
  }

  const supabase = getSupabaseClient();
  if (!supabase || !userId) return true;

  try {
    if (isSaved) {
      const { error } = await supabase.from('saved_experiences').insert({ user_id: userId, experience_id: experienceId });
      return !error;
    } else {
      const { error } = await supabase.from('saved_experiences').delete().match({ user_id: userId, experience_id: experienceId });
      return !error;
    }
  } catch {
    return true;
  }
}

/** History Details */
export async function getUserHistoryDetails(userId?: string | null): Promise<ExperienceCardData[]> {
  const localData = getUserHistory(userId);
  const supabase = getSupabaseClient();
  if (!supabase || !userId) return localData;

  try {
    const { data, error } = await supabase
      .from('user_history')
      .select('*, historical_experiences(*)')
      .eq('user_id', userId)
      .order('last_viewed_at', { ascending: false });

    if (error || !data || data.length === 0) return localData;
    return data.map(d => ({
      id: d.historical_experiences?.id || d.experience_id,
      title: d.historical_experiences?.title || 'Historical Event',
      subject: d.historical_experiences?.subject || d.historical_experiences?.title || 'History',
      year: d.historical_experiences?.year || undefined,
      location: d.historical_experiences?.location || undefined,
      cover_image: d.historical_experiences?.cover_image || undefined,
      slug: d.historical_experiences?.slug || d.experience_id,
      last_viewed_at: d.last_viewed_at,
    }));
  } catch {
    return localData;
  }
}

/** Fetch user activities */
export async function getUserActivityHistory(userId?: string | null): Promise<ActivityEntry[]> {
  return getUserActivities(userId);
}


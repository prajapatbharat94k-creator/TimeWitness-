/**
 * Client-side localStorage helpers for TimeWitness.
 * All functions are safe to call during SSR (typeof window guard).
 * Never throws — every function has a try/catch.
 * Serves as persistent offline storage and cache for Supabase.
 */

export interface ExperienceCardData {
  id: string;
  title: string;
  subject: string;
  year?: string;
  location?: string;
  cover_image?: string;
  slug: string;
  progress?: number;
  added_at?: string;
  last_viewed_at?: string;
}

export interface ActivityEntry {
  id: string;
  type: 'witnessed' | 'saved' | 'favorited';
  title: string;
  subject: string;
  timestamp: string;
}

export interface DbProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  language: string;
  voice_enabled: boolean;
  autoplay: boolean;
  theme: string;
}

// ─── Storage Keys ────────────────────────────────────────────────────────────
const KEYS = {
  FAVORITES: 'tw_favorites',
  SAVED: 'tw_saved_experiences',
  HISTORY: 'tw_user_history',
  ACTIVITIES: 'tw_activities',
  AUTH_USER: 'tw_auth_user',
  PROFILE_PREFIX: 'tw_profile_',
} as const;

// ─── Safe localStorage access ─────────────────────────────────────────────────
function getItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage full or unavailable — silent
  }
}

function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Silent
  }
}

function parseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getKey(base: string, userId?: string | null): string {
  return userId ? `${base}_${userId}` : base;
}

// ─── Auth User Storage ────────────────────────────────────────────────────────
export function getLocalAuthUser(): any | null {
  return parseJSON(getItem(KEYS.AUTH_USER), null);
}

export function setLocalAuthUser(user: any): void {
  setItem(KEYS.AUTH_USER, JSON.stringify(user));
}

export function clearLocalAuthUser(): void {
  removeItem(KEYS.AUTH_USER);
}

// ─── Profile Storage ──────────────────────────────────────────────────────────
export function getLocalProfile(userId: string, defaultName?: string, defaultEmail?: string): DbProfile {
  const stored = parseJSON<Partial<DbProfile> | null>(getItem(`${KEYS.PROFILE_PREFIX}${userId}`), null);
  return {
    id: userId,
    name: stored?.name || defaultName || (defaultEmail ? defaultEmail.split('@')[0] : 'Historian'),
    avatar_url: stored?.avatar_url || null,
    language: stored?.language || 'English',
    voice_enabled: stored?.voice_enabled ?? true,
    autoplay: stored?.autoplay ?? false,
    theme: stored?.theme || 'dark',
  };
}

export function updateLocalProfile(userId: string, updates: Partial<DbProfile>): DbProfile {
  const current = getLocalProfile(userId);
  const updated: DbProfile = { ...current, ...updates };
  setItem(`${KEYS.PROFILE_PREFIX}${userId}`, JSON.stringify(updated));
  return updated;
}

// ─── Favorites ────────────────────────────────────────────────────────────────
export function getUserFavorites(userId?: string | null): ExperienceCardData[] {
  return parseJSON<ExperienceCardData[]>(getItem(getKey(KEYS.FAVORITES, userId)), []);
}

export function isUserFavorited(id: string, userId?: string | null): boolean {
  const favs = getUserFavorites(userId);
  return favs.some((f) => f.id === id || f.slug === id || f.subject.toLowerCase() === id.toLowerCase());
}

export function setUserFavorite(card: ExperienceCardData, isFav: boolean, userId?: string | null): void {
  const current = getUserFavorites(userId);
  const key = getKey(KEYS.FAVORITES, userId);

  if (isFav) {
    const exists = current.some((f) => f.id === card.id || f.subject === card.subject);
    if (!exists) {
      const item: ExperienceCardData = {
        ...card,
        added_at: new Date().toISOString(),
      };
      setItem(key, JSON.stringify([item, ...current]));
      recordActivity('favorited', card.title, card.subject, userId);
    }
  } else {
    const updated = current.filter((f) => f.id !== card.id && f.subject !== card.subject);
    setItem(key, JSON.stringify(updated));
  }
}

// ─── Saved Experiences ────────────────────────────────────────────────────────
export function getUserSaved(userId?: string | null): ExperienceCardData[] {
  return parseJSON<ExperienceCardData[]>(getItem(getKey(KEYS.SAVED, userId)), []);
}

export function isUserSaved(id: string, userId?: string | null): boolean {
  const saved = getUserSaved(userId);
  return saved.some((s) => s.id === id || s.slug === id || s.subject.toLowerCase() === id.toLowerCase());
}

export function setUserSaved(card: ExperienceCardData, isSaved: boolean, userId?: string | null): void {
  const current = getUserSaved(userId);
  const key = getKey(KEYS.SAVED, userId);

  if (isSaved) {
    const exists = current.some((s) => s.id === card.id || s.subject === card.subject);
    if (!exists) {
      const item: ExperienceCardData = {
        ...card,
        added_at: new Date().toISOString(),
      };
      setItem(key, JSON.stringify([item, ...current]));
      recordActivity('saved', card.title, card.subject, userId);
    }
  } else {
    const updated = current.filter((s) => s.id !== card.id && s.subject !== card.subject);
    setItem(key, JSON.stringify(updated));
  }
}

// ─── User History ─────────────────────────────────────────────────────────────
const MAX_HISTORY = 30;

export function getUserHistory(userId?: string | null): ExperienceCardData[] {
  return parseJSON<ExperienceCardData[]>(getItem(getKey(KEYS.HISTORY, userId)), []);
}

export function addUserHistory(card: ExperienceCardData, userId?: string | null): void {
  const current = getUserHistory(userId);
  const key = getKey(KEYS.HISTORY, userId);

  const existing = current.filter((h) => h.id !== card.id && h.subject.toLowerCase() !== card.subject.toLowerCase());
  const entry: ExperienceCardData = {
    ...card,
    last_viewed_at: new Date().toISOString(),
  };

  const updated = [entry, ...existing].slice(0, MAX_HISTORY);
  setItem(key, JSON.stringify(updated));
  recordActivity('witnessed', card.title, card.subject, userId);
}

// ─── Activity Log ─────────────────────────────────────────────────────────────
const MAX_ACTIVITIES = 20;

export function getUserActivities(userId?: string | null): ActivityEntry[] {
  return parseJSON<ActivityEntry[]>(getItem(getKey(KEYS.ACTIVITIES, userId)), []);
}

export function recordActivity(
  type: 'witnessed' | 'saved' | 'favorited',
  title: string,
  subject: string,
  userId?: string | null
): void {
  const current = getUserActivities(userId);
  const key = getKey(KEYS.ACTIVITIES, userId);

  const entry: ActivityEntry = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type,
    title,
    subject,
    timestamp: new Date().toISOString(),
  };

  const updated = [entry, ...current].slice(0, MAX_ACTIVITIES);
  setItem(key, JSON.stringify(updated));
}

// ─── Utility ─────────────────────────────────────────────────────────────────
export function buildId(topic: string, language: string = 'en'): string {
  return `${topic.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').substring(0, 80)}-${language.toLowerCase()}`;
}

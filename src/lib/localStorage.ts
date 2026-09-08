/**
 * Client-side localStorage helpers for TimeWitness.
 * All functions are safe to call during SSR (typeof window guard).
 * Never throws — every function has a try/catch.
 */

export interface LocalExperience {
  id: string; // topic-language slug
  topic: string;
  language: string;
  savedAt: string;
  scenes: unknown[];
}

export interface RecentlyViewedEntry {
  id: string;
  topic: string;
  language: string;
  viewedAt: string;
}

// ─── Storage Keys ────────────────────────────────────────────────────────────
const KEYS = {
  FAVORITES: 'tw_favorites',
  RECENTLY_VIEWED: 'tw_recently_viewed',
  SAVED_EXPERIENCES: 'tw_saved_experiences',
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

function parseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ─── Favorites ────────────────────────────────────────────────────────────────
export function getFavorites(): string[] {
  return parseJSON<string[]>(getItem(KEYS.FAVORITES), []);
}

export function isFavorited(id: string): boolean {
  return getFavorites().includes(id);
}

export function addFavorite(id: string): void {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    setItem(KEYS.FAVORITES, JSON.stringify([...favs, id]));
  }
}

export function removeFavorite(id: string): void {
  const favs = getFavorites().filter((f) => f !== id);
  setItem(KEYS.FAVORITES, JSON.stringify(favs));
}

export function toggleFavorite(id: string): boolean {
  if (isFavorited(id)) {
    removeFavorite(id);
    return false;
  } else {
    addFavorite(id);
    return true;
  }
}

// ─── Recently Viewed ─────────────────────────────────────────────────────────
const MAX_RECENT = 10;

export function getRecentlyViewed(): RecentlyViewedEntry[] {
  return parseJSON<RecentlyViewedEntry[]>(getItem(KEYS.RECENTLY_VIEWED), []);
}

export function addRecentlyViewed(topic: string, language: string): void {
  const id = buildId(topic, language);
  const existing = getRecentlyViewed().filter((e) => e.id !== id);
  const entry: RecentlyViewedEntry = {
    id,
    topic,
    language,
    viewedAt: new Date().toISOString(),
  };
  const updated = [entry, ...existing].slice(0, MAX_RECENT);
  setItem(KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
}

// ─── Saved Experiences ────────────────────────────────────────────────────────
export function getSavedExperiences(): LocalExperience[] {
  return parseJSON<LocalExperience[]>(getItem(KEYS.SAVED_EXPERIENCES), []);
}

export function saveExperienceLocally(
  topic: string,
  language: string,
  scenes: unknown[]
): void {
  const id = buildId(topic, language);
  const existing = getSavedExperiences().filter((e) => e.id !== id);
  const entry: LocalExperience = {
    id,
    topic,
    language,
    savedAt: new Date().toISOString(),
    scenes,
  };
  setItem(KEYS.SAVED_EXPERIENCES, JSON.stringify([entry, ...existing].slice(0, 20)));
}

export function isExperienceSaved(topic: string, language: string): boolean {
  const id = buildId(topic, language);
  return getSavedExperiences().some((e) => e.id === id);
}

export function removeSavedExperience(topic: string, language: string): void {
  const id = buildId(topic, language);
  const updated = getSavedExperiences().filter((e) => e.id !== id);
  setItem(KEYS.SAVED_EXPERIENCES, JSON.stringify(updated));
}

// ─── Utility ─────────────────────────────────────────────────────────────────
export function buildId(topic: string, language: string): string {
  return `${topic.toLowerCase().replace(/\s+/g, '-').substring(0, 80)}-${language}`;
}

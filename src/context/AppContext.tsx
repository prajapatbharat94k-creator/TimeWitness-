'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SavedJourney {
  id: string;
  topic: string;
  era?: string;
  savedAt: string;
  title?: string;
  thumbnailUrl?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  avatarIcon: string;
  joinedDate: string;
  preferredEra: string;
}

interface AppContextType {
  currentLang: 'EN' | 'HI';
  setLanguage: (lang: 'EN' | 'HI') => void;
  isMuted: boolean;
  toggleMute: () => void;
  setIsMuted: (val: boolean) => void;
  
  // Search history
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  
  // Saved journeys / bookmarks
  savedJourneys: SavedJourney[];
  toggleSaveJourney: (journey: SavedJourney) => void;
  isJourneySaved: (topic: string) => boolean;
  
  // View count / history log
  historyLog: { topic: string; timestamp: string }[];
  addToHistoryLog: (topic: string) => void;
  
  // User Profile & Preferences
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Global Talk to History Modal
  isTalkModalOpen: boolean;
  talkDefaultFigure?: string;
  openTalkModal: (figure?: string) => void;
  closeTalkModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'timewitness_app_state_v1';

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');
  const [isMuted, setIsMuted] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Coronation of Chhatrapati Shivaji Maharaj',
    'Rani Lakshmibai 1857',
    'Napoleon Bonaparte at Waterloo',
    'Indus Valley Civilization',
    'Julius Caesar crossing the Rubicon'
  ]);
  const [savedJourneys, setSavedJourneys] = useState<SavedJourney[]>([
    {
      id: 'shivaji-coronation',
      topic: 'Coronation of Chhatrapati Shivaji Maharaj',
      era: '17th Century AD',
      savedAt: 'Archived Chronicle',
      title: 'Coronation of Chhatrapati Shivaji Maharaj'
    },
    {
      id: 'napoleon-waterloo',
      topic: 'Napoleon Bonaparte at the Battle of Waterloo',
      era: '1815 AD',
      savedAt: 'Archived Chronicle',
      title: 'Battle of Waterloo'
    }
  ]);
  const [historyLog, setHistoryLog] = useState<{ topic: string; timestamp: string }[]>([
    { topic: 'Coronation of Chhatrapati Shivaji Maharaj', timestamp: 'Recent' },
    { topic: 'Rani Lakshmibai 1857', timestamp: 'Recent' },
    { topic: 'Napoleon Bonaparte at Waterloo', timestamp: 'Recent' }
  ]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Archival Chronicler',
    title: 'Grand Witness of Antiquity',
    avatarIcon: 'Hourglass',
    joinedDate: 'September 2026',
    preferredEra: 'Ancient & Classical'
  });

  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkDefaultFigure, setTalkDefaultFigure] = useState<string | undefined>(undefined);

  const openTalkModal = (figure?: string) => {
    setTalkDefaultFigure(figure);
    setIsTalkModalOpen(true);
  };

  const closeTalkModal = () => {
    setIsTalkModalOpen(false);
    setTalkDefaultFigure(undefined);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.currentLang) setCurrentLang(parsed.currentLang);
        if (typeof parsed.isMuted === 'boolean') setIsMuted(parsed.isMuted);
        if (Array.isArray(parsed.recentSearches)) setRecentSearches(parsed.recentSearches);
        if (Array.isArray(parsed.savedJourneys)) setSavedJourneys(parsed.savedJourneys);
        if (Array.isArray(parsed.historyLog)) setHistoryLog(parsed.historyLog);
        if (parsed.profile) setProfile(prev => ({ ...prev, ...parsed.profile }));
      }
    } catch {
      // Ignore parse errors on first load
    }
  }, []);

  // Sync back to localStorage
  const persistState = (overrides?: Partial<any>) => {
    try {
      const stateToSave = {
        currentLang,
        isMuted,
        recentSearches,
        savedJourneys,
        historyLog,
        profile,
        ...overrides
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Storage quota or disabled storage
    }
  };

  const setLanguage = (lang: 'EN' | 'HI') => {
    setCurrentLang(lang);
    persistState({ currentLang: lang });
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      persistState({ isMuted: next });
      return next;
    });
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      const updated = [query.trim(), ...filtered].slice(0, 10);
      persistState({ recentSearches: updated });
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    persistState({ recentSearches: [] });
  };

  const toggleSaveJourney = (journey: SavedJourney) => {
    setSavedJourneys(prev => {
      const exists = prev.some(item => item.topic.toLowerCase() === journey.topic.toLowerCase());
      let updated: SavedJourney[];
      if (exists) {
        updated = prev.filter(item => item.topic.toLowerCase() !== journey.topic.toLowerCase());
      } else {
        updated = [journey, ...prev];
      }
      persistState({ savedJourneys: updated });
      return updated;
    });
  };

  const isJourneySaved = (topic: string) => {
    return savedJourneys.some(item => item.topic.toLowerCase() === topic.toLowerCase());
  };

  const addToHistoryLog = (topic: string) => {
    if (!topic.trim()) return;
    setHistoryLog(prev => {
      const newEntry = { topic: topic.trim(), timestamp: new Date().toLocaleDateString() };
      const filtered = prev.filter(p => p.topic.toLowerCase() !== topic.toLowerCase());
      const updated = [newEntry, ...filtered].slice(0, 20);
      persistState({ historyLog: updated });
      return updated;
    });
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      persistState({ profile: next });
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentLang,
        setLanguage,
        isMuted,
        toggleMute,
        setIsMuted,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        savedJourneys,
        toggleSaveJourney,
        isJourneySaved,
        historyLog,
        addToHistoryLog,
        profile,
        updateProfile,
        isTalkModalOpen,
        talkDefaultFigure,
        openTalkModal,
        closeTalkModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}

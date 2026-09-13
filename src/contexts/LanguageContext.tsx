'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageInfo, LANGUAGES, TRANSLATIONS } from '@/lib/translations';

interface LanguageContextType {
  currentLang: LanguageCode;
  languageInfo: LanguageInfo;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('EN');

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem('tw_language') as LanguageCode;
    if (saved && TRANSLATIONS[saved]) {
      setCurrentLang(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('tw_language', lang);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['EN'];
    return dict[key] || TRANSLATIONS['EN'][key] || key;
  };

  const languageInfo = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ currentLang, languageInfo, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

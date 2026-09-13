'use client';

import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Clock, ScrollText, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  activeQuery: string;
}

export default function SearchBar({ onSearch, activeQuery }: SearchBarProps) {
  const { t, currentLang } = useLanguage();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const sampleTags = [
    { 
      labelEn: 'Coronation of Shivaji Maharaj, 1674',
      labelLocal: currentLang === 'HI' ? 'शिवाजी महाराज का राज्याभिषेक, 1674' :
                  currentLang === 'MR' ? 'शिवाजी महाराजांचा राज्याभिषेक, 1674' :
                  currentLang === 'TE' ? 'శివాజీ మహారాజ్ పట్టాభిషేకం, 1674' :
                  currentLang === 'GU' ? 'શિવાજી મહારાજનો રાજ્યાભિષેક, 1674' :
                  currentLang === 'TA' ? 'சிவாஜி மகாராஜா முடிசூட்டு விழா, 1674' :
                  currentLang === 'BN' ? 'শিবাজী মহারাজের রাজ্যাভিষেক, 1674' : 'Coronation of Shivaji Maharaj, 1674',
      icon: <Clock className="w-3 h-3" /> 
    },
    { 
      labelEn: 'Battle of Waterloo, 1815',
      labelLocal: currentLang === 'HI' ? 'वाटरलू का युद्ध, 1815' :
                  currentLang === 'MR' ? 'वॉटरलूची लढाई, 1815' :
                  currentLang === 'TE' ? 'వాటర్లూ యుద్ధం, 1815' :
                  currentLang === 'GU' ? 'વોટરલૂનું યુદ્ધ, 1815' :
                  currentLang === 'TA' ? 'வாட்டர்லூ போர், 1815' :
                  currentLang === 'BN' ? 'ওয়াটারলু যুদ্ধ, 1815' : 'Battle of Waterloo, 1815',
      icon: <MapPin className="w-3 h-3" /> 
    },
    { 
      labelEn: 'Apollo 11 Moon Landing, 1969',
      labelLocal: currentLang === 'HI' ? 'अपोलो 11 मून लैंडिंग, 1969' :
                  currentLang === 'MR' ? 'अपोलो 11 चंद्र मोहीम, 1969' :
                  currentLang === 'TE' ? 'అపోలో 11 మూన్ ల్యాండింగ్, 1969' :
                  currentLang === 'GU' ? 'અપોલો 11 ચંદ્ર ઉતરાણ, 1969' :
                  currentLang === 'TA' ? 'அப்பல்லோ 11 நிலவில் தரையிறக்கம், 1969' :
                  currentLang === 'BN' ? 'অ্যাপোলো ১১ চাঁদ অবতরণ, 1969' : 'Apollo 11 Moon Landing, 1969',
      icon: <Sparkles className="w-3 h-3" /> 
    },
  ];

  return (
    <section id="search-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-8 sm:-mt-12 mb-12 sm:mb-20">
      
      {/* Main Search Container */}
      <div className={`relative rounded-2xl sm:rounded-3xl p-1.5 transition-all duration-500 ${
        isFocused 
          ? 'bg-gradient-to-r from-[#D4AF37]/40 via-[#242434] to-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] scale-[1.01]' 
          : 'bg-[#242434] hover:bg-[#2A2A3C] shadow-2xl'
      }`}>
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center w-full bg-[#0D0D11] rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <div className="pl-4 sm:pl-6 text-[#64748B]">
            <Search className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isFocused ? 'text-[#D4AF37]' : ''}`} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t('searchPlaceholder')}
            className="w-full px-3 sm:px-4 py-4 sm:py-5 lg:py-6 bg-transparent text-sm sm:text-base lg:text-lg text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none font-medium"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-2 text-[#64748B] hover:text-[#F8FAFC] transition-colors"
              aria-label="Clear query"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <div className="pr-2 sm:pr-3">
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89220] hover:from-[#FFF3C4] hover:to-[#D4AF37] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="hidden xs:inline">{t('searchButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Pills */}
      <div className="mt-6 sm:mt-8">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#64748B] flex items-center gap-2">
            <ScrollText className="w-3.5 h-3.5 text-[#D4AF37]" />
            {t('popularCoordinates')}
          </span>
          <span className="text-[10px] text-[#475569]">{t('clickPill')}</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {sampleTags.map((tag, idx) => {
            const label = tag.labelLocal;
            const isActive = activeQuery === tag.labelEn;
            
            return (
              <button
                key={idx}
                onClick={() => onSearch(tag.labelEn)} // Always pass English query to backend for consistency unless requested otherwise
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#D4AF37] text-[#0A0A0E] shadow-gold-glow' 
                    : 'bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#1B1B26]'
                }`}
              >
                {tag.icon}
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

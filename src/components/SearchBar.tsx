'use client';

import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Clock, ScrollText, ArrowRight, Swords, Crown, Flag } from 'lucide-react';
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
      onSearch(query.trim());
    }
  };

  // The 6 exact required example chips (Requirement 12)
  const sampleChips = [
    {
      query: 'Shivaji Maharaj',
      label: currentLang === 'HI' ? 'शिवाजी महाराज' :
             currentLang === 'MR' ? 'शिवाजी महाराज' :
             currentLang === 'TE' ? 'శివాజీ మహారాజ్' :
             currentLang === 'GU' ? 'શિવાજી મહારાજ' :
             currentLang === 'TA' ? 'சிவாஜி மகாராஜா' :
             currentLang === 'BN' ? 'শিবাজী মহারাজ' : 'Shivaji Maharaj',
      icon: <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
    {
      query: 'Rani Lakshmibai',
      label: currentLang === 'HI' ? 'रानी लक्ष्मीबाई' :
             currentLang === 'MR' ? 'राणी लक्ष्मीबाई' :
             currentLang === 'TE' ? 'రాణీ లక్ష్మీబాయి' :
             currentLang === 'GU' ? 'રાણી લક્ષ્મીબાઈ' :
             currentLang === 'TA' ? 'ராணி லட்சுமிபாய்' :
             currentLang === 'BN' ? 'রানী লক্ষ্মীবাঈ' : 'Rani Lakshmibai',
      icon: <Swords className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
    {
      query: 'Napoleon at Waterloo',
      label: currentLang === 'HI' ? 'नेपोलियन (वाटरलू)' :
             currentLang === 'MR' ? 'नेपोलियन (वॉटरलू)' :
             currentLang === 'TE' ? 'నెపోలియన్ (వాటర్లూ)' :
             currentLang === 'GU' ? 'નેપોલિયન (વોટરલૂ)' :
             currentLang === 'TA' ? 'நெப்போலியன் (வாட்டர்லூ)' :
             currentLang === 'BN' ? 'নেপোলিয়ন (ওয়াটারলু)' : 'Napoleon at Waterloo',
      icon: <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
    {
      query: 'Cleopatra',
      label: currentLang === 'HI' ? 'क्लियोपेट्रा' :
             currentLang === 'MR' ? 'क्लियोपॅत्रा' :
             currentLang === 'TE' ? 'క్లియోపాత్రా' :
             currentLang === 'GU' ? 'ક્લિયોપેટ્રા' :
             currentLang === 'TA' ? 'கிளியோபாட்ரா' :
             currentLang === 'BN' ? 'ক্লিওপেট্রা' : 'Cleopatra',
      icon: <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
    {
      query: 'French Revolution',
      label: currentLang === 'HI' ? 'फ्रांसीसी क्रांति' :
             currentLang === 'MR' ? 'फ्रेंच क्रांती' :
             currentLang === 'TE' ? 'ఫ్రెంచ్ విప్లవం' :
             currentLang === 'GU' ? 'ફ્રેન્ચ ક્રાંતિ' :
             currentLang === 'TA' ? 'பிரெஞ்சுப் புரட்சி' :
             currentLang === 'BN' ? 'ফরাসি বিপ্লব' : 'French Revolution',
      icon: <Flag className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
    {
      query: 'Apollo 11',
      label: currentLang === 'HI' ? 'अपोलो 11' :
             currentLang === 'MR' ? 'अपोलो 11' :
             currentLang === 'TE' ? 'అపోలో 11' :
             currentLang === 'GU' ? 'અપોલો 11' :
             currentLang === 'TA' ? 'அப்பல்லோ 11' :
             currentLang === 'BN' ? 'অ্যাপোলো ১১' : 'Apollo 11',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />,
    },
  ];

  return (
    <section id="search-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-8 mb-12 sm:mb-16">
      
      {/* Main Search Container */}
      <div className={`relative rounded-2xl sm:rounded-3xl p-1.5 transition-all duration-300 ${
        isFocused 
          ? 'bg-gradient-to-r from-[#D4AF37]/50 via-[#242434] to-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.2)] scale-[1.01]' 
          : 'bg-[#1B1B26] hover:bg-[#242434] shadow-2xl'
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
            placeholder="Search a person, event, civilization or place..."
            className="w-full px-3 sm:px-4 py-4 sm:py-5 lg:py-5 bg-transparent text-sm sm:text-base lg:text-lg text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none font-medium"
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
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89220] hover:from-[#FFF3C4] hover:to-[#D4AF37] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-gold-glow"
            >
              <span className="hidden xs:inline">Witness</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Example Chips (Requirement 12) */}
      <div className="mt-5 sm:mt-6">
        <div className="flex flex-col items-center justify-center gap-1.5 mb-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#64748B] flex items-center gap-2">
            <ScrollText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Witness Example Coordinates:</span>
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {sampleChips.map((chip, idx) => {
            const isActive = activeQuery.toLowerCase().includes(chip.query.toLowerCase());
            
            return (
              <button
                key={idx}
                onClick={() => onSearch(chip.query)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-[#D4AF37] text-[#0A0A0E] font-bold shadow-gold-glow' 
                    : 'bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#1B1B26]'
                }`}
              >
                {chip.icon}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

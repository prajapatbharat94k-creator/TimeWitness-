'use client';

import React, { useState } from 'react';
import { Search, Sparkles, X, History, Compass, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SampleTag {
  id: string;
  labelEn: string;
  labelHi: string;
  era: string;
  query: string;
  imagePreview?: string;
}

export const SAMPLE_TAGS: SampleTag[] = [
  {
    id: '1',
    labelEn: 'Coronation of Shivaji Maharaj',
    labelHi: 'छत्रपति शिवाजी महाराज का राज्याभिषेक',
    era: '1674 AD • Raigad Fort',
    query: 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD',
  },
  {
    id: '2',
    labelEn: 'Rani Lakshmibai 1857',
    labelHi: 'रानी लक्ष्मीबाई १८५७',
    era: '1857 AD • Jhansi Fort',
    query: 'Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence',
  },
  {
    id: '3',
    labelEn: 'Napoleon at Waterloo',
    labelHi: 'वाटरलू में नेपोलियन',
    era: '1815 AD • Belgium',
    query: 'Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815',
  },
  {
    id: '4',
    labelEn: "Cleopatra's Reign",
    labelHi: 'क्लिओपेट्रा का शासन',
    era: '41 BC • Alexandria',
    query: 'Cleopatra VII entering Alexandria harbour on her royal golden barge',
  },
  {
    id: '5',
    labelEn: 'Dandi March 1930',
    labelHi: 'दांडी मार्च १९३०',
    era: '1930 AD • Gujarat',
    query: 'Mahatma Gandhi leading thousands on the Salt March to Dandi shore in 1930',
  },
  {
    id: '6',
    labelEn: 'Apollo 11 Landing',
    labelHi: 'अपोलो ११ लैंडिंग',
    era: '1969 AD • Tranquility Base',
    query: 'Neil Armstrong and Buzz Aldrin stepping onto the lunar surface during Apollo 11 mission',
  },
];

interface SearchBarProps {
  currentLang: 'EN' | 'HI';
  onSearch: (query: string) => void;
  activeQuery: string;
}

export default function SearchBar({ currentLang, onSearch, activeQuery }: SearchBarProps) {
  const [inputVal, setInputVal] = useState(activeQuery || '');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleSelectTag = (tag: SampleTag) => {
    setInputVal(tag.query);
    setSelectedTagId(tag.id);
    onSearch(tag.query);
  };

  const handleClear = () => {
    setInputVal('');
    setSelectedTagId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative z-20 mb-12">
      
      {/* Search Input Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`relative glass-panel rounded-2xl sm:rounded-full p-2 transition-all duration-300 ${
          isFocused ? 'ring-2 ring-[#D4AF37] shadow-gold-glow-lg border-[#D4AF37]' : 'hover:border-[#D4AF37]/50'
        }`}
      >
        <div className="flex items-center gap-3 px-3 py-1 sm:px-4 sm:py-2">
          <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-[#D4AF37]' : 'text-[#64748B]'}`} />
          
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (selectedTagId) setSelectedTagId(null);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              currentLang === 'EN'
                ? "Enter any historical event, era, or figure (e.g. Coronation of Shivaji Maharaj)..."
                : "कोई भी ऐतिहासिक घटना, युग या व्यक्तित्व दर्ज करें (जैसे छत्रपति शिवाजी का राज्याभिषेक)..."
            }
            className="w-full bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-sm sm:text-base focus:outline-none py-2 font-sans"
          />

          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-[#64748B] hover:text-[#F8FAFC] hover:bg-[#242434] transition-colors"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Action CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#0D0D11] font-bold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:shadow-gold-glow-lg transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#0D0D11]" />
            <span>{currentLang === 'EN' ? 'Witness Event' : 'दृश्य बनाएं'}</span>
            <ArrowRight className="w-4 h-4 text-[#0D0D11] hidden sm:block" />
          </motion.button>
        </div>
      </motion.form>

      {/* Interactive Sample Tag Pills Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 flex items-center justify-between px-1"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
          <History className="w-3.5 h-3.5" />
          <span>{currentLang === 'EN' ? 'Popular Historical Coordinates' : 'लोकप्रिय ऐतिहासिक घटनाएँ'}</span>
        </div>
        <span className="text-[11px] text-[#64748B] hidden sm:inline">
          {currentLang === 'EN' ? 'Click any pill to generate scene' : 'दृश्य बनाने के लिए किसी टैग पर क्लिक करें'}
        </span>
      </motion.div>

      {/* Sample Tag Pills List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-3 flex flex-wrap gap-2 sm:gap-2.5"
      >
        {SAMPLE_TAGS.map((tag) => {
          const isSelected = selectedTagId === tag.id || activeQuery === tag.query;
          const label = currentLang === 'EN' ? tag.labelEn : tag.labelHi;

          return (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectTag(tag)}
              className={`group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#14141C] border-[#D4AF37] text-[#FFF3C4] shadow-gold-glow'
                  : 'bg-[#14141C]/80 border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/50 hover:text-[#F8FAFC] hover:bg-[#1B1B26]'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-[#D4AF37]' : 'text-[#64748B] group-hover:text-[#D4AF37]'}`} />
              <span>{label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0D0D11]/60 text-[#64748B] group-hover:text-[#94A3B8] border border-[#242434]">
                {tag.era.split('•')[0].trim()}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

    </div>
  );
}

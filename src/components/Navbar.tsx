'use client';

import React, { useState } from 'react';
import { Hourglass, Globe, MessageSquare, ChevronDown, Compass, ScrollText, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentLang: 'EN' | 'HI';
  onLanguageChange: (lang: 'EN' | 'HI') => void;
  onOpenTalkToHistory: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function Navbar({ currentLang, onLanguageChange, onOpenTalkToHistory, isMuted, onToggleMute }: NavbarProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0D0D11]/80 border-b border-[#242434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#14141C] border border-[#D4AF37]/40 shadow-gold-glow group-hover:border-[#D4AF37] transition-all duration-300">
            <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] animate-pulse-slow group-hover:rotate-180 transition-transform duration-700" />
            <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/10 filter blur-sm group-hover:blur-md transition-all opacity-50" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-gold-gradient">
              TIMEWITNESS
            </span>
            <span className="hidden sm:block text-[10px] tracking-widest text-[#64748B] uppercase font-sans font-medium">
              Historical AI Engine
            </span>
          </div>
        </a>

        {/* Quick Nav Links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          <a href="#eras" className="text-[#94A3B8] hover:text-[#F8FAFC] flex items-center gap-1.5 transition-colors">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'EN' ? 'Explore Eras' : 'युग खोजें'}</span>
          </a>
          <a href="#scene-viewer" className="text-[#94A3B8] hover:text-[#F8FAFC] flex items-center gap-1.5 transition-colors">
            <ScrollText className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'EN' ? 'Witness Scenes' : 'दृश्य देखें'}</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Talk to History Feature Badge */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenTalkToHistory}
            className="relative group flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#1E1B10] to-[#14141C] border border-[#D4AF37]/50 text-xs sm:text-sm font-semibold text-[#FFF3C4] shadow-gold-glow hover:border-[#D4AF37] hover:shadow-gold-glow-lg transition-all"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <span className="hidden xs:inline">{currentLang === 'EN' ? 'Talk to History' : 'इतिहास से बात'}</span>
            <span className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              AI VOICE
            </span>
          </motion.button>

          {/* Global Mute / Unmute Toggle */}
          <motion.button
            id="navbar-mute-toggle"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
            title={isMuted ? (currentLang === 'EN' ? 'Unmute Ambience' : 'ध्वनि चालू करें') : (currentLang === 'EN' ? 'Mute Ambience' : 'ध्वनि बंद करें')}
            className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all ${
              isMuted
                ? 'bg-[#14141C] border-[#242434] text-[#4A5568] hover:border-[#D4AF37]/40 hover:text-[#94A3B8]'
                : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] shadow-gold-glow'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-lg bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/40 text-xs sm:text-sm text-[#CBD5E1] transition-all"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <span className="font-semibold">{currentLang === 'EN' ? 'EN' : 'HI'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-[#14141C] border border-[#D4AF37]/30 shadow-2xl overflow-hidden z-50 p-1"
                >
                  <button
                    onClick={() => {
                      onLanguageChange('EN');
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      currentLang === 'EN' 
                        ? 'bg-[#D4AF37]/20 text-[#FFF3C4] font-bold border border-[#D4AF37]/40' 
                        : 'text-[#94A3B8] hover:bg-[#1B1B26] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[10px] text-[#64748B]">EN</span>
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('HI');
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors mt-1 ${
                      currentLang === 'HI' 
                        ? 'bg-[#D4AF37]/20 text-[#FFF3C4] font-bold border border-[#D4AF37]/40' 
                        : 'text-[#94A3B8] hover:bg-[#1B1B26] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>हिन्दी</span>
                    <span className="text-[10px] text-[#64748B]">HI</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
}

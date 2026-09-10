'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Hourglass, 
  Globe, 
  Search, 
  Volume2, 
  VolumeX, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  ScrollText, 
  BookOpen, 
  Info,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const { currentLang, setLanguage, isMuted, toggleMute, openTalkModal } = useApp();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/explore', labelEn: 'Explore', labelHi: 'खोजें', icon: Compass },
    { href: '/witness', labelEn: 'Witness', labelHi: 'साक्षी बनें', icon: ScrollText },
    { href: '/how-it-works', labelEn: 'How It Works', labelHi: 'कार्यप्रणाली', icon: BookOpen },
    { href: '/about', labelEn: 'About', labelHi: 'परिचय', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0D0D11]/90 border-b border-[#242434] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          aria-label="TimeWitness Home"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#14141C] border border-[#D4AF37]/40 shadow-gold-glow group-hover:border-[#D4AF37] transition-all duration-300">
            <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] transition-transform duration-700 group-hover:rotate-180" />
            <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/10 filter blur-sm group-hover:blur-md transition-all opacity-50" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors leading-tight">
              TIMEWITNESS
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#D4AF37] uppercase font-mono font-medium leading-none mt-0.5">
              HISTORICAL AI ENGINE
            </span>
          </div>
        </Link>

        {/* Global Desktop Navigation: Explore | Witness | How It Works | About */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#FFF3C4] border-b-2 border-[#D4AF37] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1A1A26]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#64748B]'}`} />
                <span>{currentLang === 'EN' ? item.labelEn : item.labelHi}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls: Search | Language | Audio | Dashboard | Profile | CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Search Trigger */}
          <Link
            href="/search"
            aria-label="Search History"
            title={currentLang === 'EN' ? 'Search People, Events, Civilizations' : 'इतिहास खोजें'}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:text-[#FFF3C4] hover:border-[#D4AF37]/50 transition-all"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#14141C] border border-[#242434] text-[#CBD5E1] hover:border-[#D4AF37]/50 text-xs font-medium transition-all"
              aria-label="Select Language"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono uppercase">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-32 rounded-xl bg-[#14141C] border border-[#242434] shadow-2xl py-1.5 z-50"
                >
                  <button
                    onClick={() => {
                      setLanguage('EN');
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors ${
                      currentLang === 'EN'
                        ? 'bg-[#D4AF37]/15 text-[#FFF3C4] font-bold'
                        : 'text-[#94A3B8] hover:bg-[#1E1E2D] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>English</span>
                    {currentLang === 'EN' && <span className="text-[#D4AF37] text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('HI');
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors ${
                      currentLang === 'HI'
                        ? 'bg-[#D4AF37]/15 text-[#FFF3C4] font-bold'
                        : 'text-[#94A3B8] hover:bg-[#1E1E2D] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>हिन्दी</span>
                    {currentLang === 'HI' && <span className="text-[#D4AF37] text-[10px]">✓</span>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Audio Toggle (Mute / Sound) */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            title={isMuted ? (currentLang === 'EN' ? 'Unmute Ambience' : 'ध्वनि चालू करें') : (currentLang === 'EN' ? 'Mute Ambience' : 'ध्वनि बंद करें')}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all ${
              isMuted
                ? 'bg-[#14141C] border-[#242434] text-[#64748B] hover:text-[#94A3B8] hover:border-[#D4AF37]/30'
                : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] shadow-gold-glow'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse-slow" />}
          </button>

          {/* Dashboard Icon Link */}
          <Link
            href="/dashboard"
            aria-label="Chronicler Dashboard"
            title={currentLang === 'EN' ? 'Chronicler Dashboard' : 'डैशबोर्ड'}
            className={`hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all ${
              pathname === '/dashboard'
                ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFF3C4]'
                : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#D4AF37]/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </Link>

          {/* Profile Icon Link */}
          <Link
            href="/profile"
            aria-label="Scholar Profile"
            title={currentLang === 'EN' ? 'Scholar Profile' : 'प्रोफ़ाइल'}
            className={`hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all ${
              pathname === '/profile'
                ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFF3C4]'
                : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#D4AF37]/40'
            }`}
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Primary CTA: Start Witnessing */}
          <Link
            href="/witness"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <span>{currentLang === 'EN' ? 'Start Witnessing' : 'साक्षी बनें'}</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:text-white"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation (360px - 1023px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#242434] bg-[#0D0D11]/95 backdrop-blur-2xl overflow-hidden px-4 py-4 space-y-3"
          >
            {/* Nav links */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFF3C4]'
                        : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span>{currentLang === 'EN' ? item.labelEn : item.labelHi}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Profile & Dashboard links for mobile */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C1C28]">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#14141C] border border-[#242434] text-xs text-[#94A3B8] hover:text-[#FFF3C4]"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLang === 'EN' ? 'Dashboard' : 'डैशबोर्ड'}</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#14141C] border border-[#242434] text-xs text-[#94A3B8] hover:text-[#FFF3C4]"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLang === 'EN' ? 'Profile' : 'प्रोफ़ाइल'}</span>
              </Link>
            </div>

            {/* Talk to History Trigger in Drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openTalkModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1B1B26] border border-[#D4AF37]/40 text-xs font-semibold text-[#FFF3C4] hover:border-[#D4AF37]"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>{currentLang === 'EN' ? 'Talk to History (AI Figure)' : 'इतिहास से संवाद (एआई)'}</span>
            </button>

            {/* Mobile Start Witnessing CTA */}
            <Link
              href="/witness"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs shadow-gold-glow"
            >
              <ScrollText className="w-4 h-4" />
              <span>{currentLang === 'EN' ? 'Start Witnessing Now' : 'अभी साक्षी बनें'}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

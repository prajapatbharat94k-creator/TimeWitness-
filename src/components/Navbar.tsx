'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hourglass, Globe, ChevronDown, Check, Volume2, VolumeX, 
  Menu, X, BookOpen, Clock, MessageCircle, LayoutDashboard, 
  User as UserIcon, LogOut, Settings, Bookmark, Compass
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTalkToHistory } from '@/contexts/TalkToHistoryContext';
import { LANGUAGES } from '@/lib/translations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onOpenTalkToHistory?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function Navbar({ onOpenTalkToHistory, isMuted: propIsMuted, onToggleMute }: NavbarProps) {
  const { currentLang, languageInfo, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { openTalkToHistory } = useTalkToHistory();
  const router = useRouter();

  const [localMuted, setLocalMuted] = useState(false);
  const isMuted = propIsMuted !== undefined ? propIsMuted : localMuted;
  const handleToggleMute = onToggleMute || (() => setLocalMuted(!localMuted));
  const handleOpenTalk = onOpenTalkToHistory || (() => openTalkToHistory());

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { icon: <Compass className="w-4 h-4" />, label: 'Explore Epochs', href: '/explore' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'How It Works', href: '/how-it-works' },
    { icon: <Clock className="w-4 h-4" />, label: t('witnessScenes'), href: '/#hero' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const displayName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Historian');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D11]/85 backdrop-blur-xl border-b border-[#242434] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#D4AF37]/20 transition-all shadow-gold-glow">
              <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] animate-pulse-slow" />
            </div>
            <span className="font-cinzel text-lg sm:text-xl font-extrabold tracking-widest text-gold-gradient hidden xs:block">
              TIMEWITNESS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Talk to History Button */}
            <button
              onClick={handleOpenTalk}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] transition-all text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('talkToHistory')}</span>
            </button>

            {/* Mute Ambience Button */}
            <button
              onClick={handleToggleMute}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
              title={isMuted ? t('unmuteAmbience') : t('muteAmbience')}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 transition-all group"
              >
                <Globe className="w-4 h-4 text-[#94A3B8] group-hover:text-[#D4AF37]" />
                <span className="font-semibold text-xs sm:text-sm text-[#E2E8F0]">{languageInfo.nativeName}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748B] group-hover:text-[#D4AF37]" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0A0A0E] border border-[#242434] shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#1B1B26] transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${currentLang === lang.code ? 'text-[#D4AF37]' : 'text-[#F8FAFC]'}`}>
                            {lang.nativeName}
                          </span>
                          <span className="text-[10px] text-[#64748B] uppercase tracking-wider">{lang.name}</span>
                        </div>
                        {currentLang === lang.code && <Check className="w-4 h-4 text-[#D4AF37]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons: Authenticated vs Guest */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#14141C] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-cinzel text-xs font-bold">
                    {displayName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-semibold text-xs sm:text-sm text-[#F8FAFC] max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#D4AF37]" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-[#14141C] border border-[#242434] shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-[#242434]">
                        <p className="text-xs font-bold text-[#F8FAFC] truncate">{displayName}</p>
                        <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#1B1B26] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                          <span>Dashboard Overview</span>
                        </Link>
                        <Link
                          href="/dashboard/experiences"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#1B1B26] transition-colors"
                        >
                          <Compass className="w-4 h-4" />
                          <span>My Experiences</span>
                        </Link>
                        <Link
                          href="/dashboard/saved"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#1B1B26] transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Saved Vault</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#1B1B26] transition-colors"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#1B1B26] transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="border-t border-[#242434] pt-1 mt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#14141C] border border-transparent hover:border-[#242434] transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/auth/signin"
                  className="px-3 sm:px-4 py-2 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#0A0A0E] transition-all text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#14141C] border border-[#242434] text-[#94A3B8]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[#242434] bg-[#0D0D11] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold text-[#F8FAFC] hover:text-[#D4AF37] p-2.5 rounded-lg hover:bg-[#1B1B26] transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenTalk();
                }}
                className="flex items-center gap-3 text-sm font-semibold text-[#D4AF37] p-2.5 rounded-lg hover:bg-[#1B1B26] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t('talkToHistory')}
              </button>

              <div className="border-t border-[#242434] pt-3 mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 p-2.5 rounded-lg border border-[#D4AF37]/30"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>User Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-semibold text-[#F8FAFC] p-2.5 rounded-lg hover:bg-[#1B1B26]"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-semibold text-[#F8FAFC] p-2.5 rounded-lg hover:bg-[#1B1B26]"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 text-sm font-semibold text-red-400 p-2.5 rounded-lg hover:bg-red-500/10 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl bg-[#1B1B26] border border-[#242434] text-[#F8FAFC] font-semibold text-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl bg-[#D4AF37] text-[#0A0A0E] font-bold text-sm"
                    >
                      Start Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

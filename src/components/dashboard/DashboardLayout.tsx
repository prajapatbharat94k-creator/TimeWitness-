'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hourglass, LayoutDashboard, Compass, Heart, Bookmark, 
  History, Settings, User as UserIcon, LogOut, Menu, X, Globe
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon, label, isActive, onClick }: NavItemProps) => (
  <Link 
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
      isActive 
        ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.12)] font-semibold' 
        : 'text-[#94A3B8] hover:bg-[#1B1B26] hover:text-[#F8FAFC]'
    }`}
  >
    <div className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#D4AF37]' : 'group-hover:scale-110 text-[#94A3B8] group-hover:text-[#F8FAFC]'}`}>
      {icon}
    </div>
    <span>{label}</span>
    {isActive && (
      <span className="ml-auto w-1.5 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
    )}
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Guest users are allowed! We do not redirect away to /auth/signin.

  const navItems = [
    { href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
    { href: '/dashboard/experiences', icon: <Compass className="w-5 h-5" />, label: 'My Experiences' },
    { href: '/dashboard/favorites', icon: <Heart className="w-5 h-5" />, label: 'Favorites' },
    { href: '/dashboard/saved', icon: <Bookmark className="w-5 h-5" />, label: 'Saved' },
    { href: '/dashboard/history', icon: <History className="w-5 h-5" />, label: 'Recently Viewed' },
    { href: '/explore', icon: <Globe className="w-5 h-5" />, label: 'Explore' },
  ];

  const bottomItems = [
    { href: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { href: '/profile', icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0E] flex flex-col items-center justify-center gap-3">
        <Hourglass className="w-9 h-9 text-[#D4AF37] animate-pulse-slow" />
        <span className="text-xs font-mono tracking-widest text-[#64748B] uppercase">Loading Archives...</span>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const isGuest = !user;
  const displayName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Guest Historian');

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-[#94A3B8] flex flex-col md:flex-row antialiased overflow-x-hidden">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3.5 bg-[#14141C] border-b border-[#242434] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center shadow-gold-glow">
            <Hourglass className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="font-cinzel text-base font-extrabold tracking-widest text-gold-gradient">
            TIMEWITNESS
          </span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1B1B26] border border-[#242434] text-[#F8FAFC]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-[#14141C] border-r border-[#242434] z-[101] md:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-4 flex items-center justify-between border-b border-[#242434]">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center">
                    <Hourglass className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span className="font-cinzel text-base font-bold text-gold-gradient">TIMEWITNESS</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1B1B26] text-[#94A3B8]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User summary card in mobile drawer */}
              <div className="p-4 mx-4 my-3 rounded-xl bg-[#0A0A0E] border border-[#242434] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-cinzel font-bold text-sm">
                  {displayName.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#F8FAFC] truncate">{displayName}</p>
                  <p className="text-[10px] text-[#64748B] truncate">{user?.email || 'Local Archives'}</p>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1.5">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 mb-1">Time Witness Menu</div>
                {navItems.map((item) => (
                  <NavItem 
                    key={item.href} 
                    {...item} 
                    isActive={pathname === item.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                  />
                ))}
                
                <div className="my-3 border-t border-[#242434]" />

                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 mb-1">Account & Preferences</div>
                {bottomItems.map((item) => (
                  <NavItem 
                    key={item.href} 
                    {...item} 
                    isActive={pathname === item.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                  />
                ))}
              </div>

              {/* Drawer Sign Out / Sign In */}
              <div className="p-4 border-t border-[#242434]">
                {user ? (
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link 
                    href="/auth/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0A0E] transition-all duration-200 shadow-gold-glow"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign In to Sync</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-[#14141C] border-r border-[#242434] flex-col sticky top-0 h-screen shrink-0">
        {/* Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#D4AF37]/20 transition-all shadow-gold-glow">
              <Hourglass className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-cinzel text-xl font-extrabold tracking-widest text-gold-gradient">
              TIMEWITNESS
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 mb-4">
          <div className="p-3.5 rounded-xl bg-[#0A0A0E] border border-[#242434] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-cinzel font-bold text-sm">
              {displayName.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#F8FAFC] truncate">{displayName}</p>
              <p className="text-[11px] text-[#64748B] truncate">{user?.email || 'Local Archives'}</p>
            </div>
          </div>
        </div>

        {/* Main Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1.5">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-4 mb-1">
            Dashboard
          </div>
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </div>

        {/* Bottom Items: Settings, Profile, Sign In / Sign Out */}
        <div className="p-4 border-t border-[#242434] flex flex-col gap-1.5">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-4 mb-1">
            Settings & Profile
          </div>
          {bottomItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} />
          ))}
          
          {user ? (
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm text-[#64748B] hover:bg-[#1B1B26] hover:text-red-400 transition-all duration-200 mt-1 text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link 
              href="/auth/signin"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all duration-200 mt-1"
            >
              <UserIcon className="w-5 h-5" />
              <span>Sign In / Register</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#0A0A0E] overflow-x-hidden min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {isGuest && (
            <div className="mb-6 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-xs tracking-wider">
                  GUEST
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">Guest Historian Mode</p>
                  <p className="text-xs text-[#94A3B8]">Your saved archives, favorites, and history are preserved locally in this browser.</p>
                </div>
              </div>
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0A0E] text-xs font-bold transition-all shadow-gold-glow flex-shrink-0"
              >
                Sign In to Sync
              </Link>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

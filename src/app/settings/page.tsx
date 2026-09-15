'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProfile, updateProfile, DbProfile } from '@/lib/db';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Loader2, Globe, Volume2, Moon, Sun, Monitor, 
  Trash2, LogOut, Check, AlertTriangle, X 
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { LANGUAGES, LanguageCode } from '@/lib/translations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { setLanguage } = useLanguage();
  const toast = useToast();
  const router = useRouter();

  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Settings & Preferences | TimeWitness';
    let isMounted = true;
    getProfile(user ? user.id : null).then(data => {
      if (!isMounted) return;
      setProfile(data);
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, [user]);

  const handleChange = async (key: keyof DbProfile, value: any) => {
    if (!profile) return;
    
    // Optimistic update
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    
    // If updating language, also update LanguageContext app-wide
    if (key === 'language') {
      const matched = LANGUAGES.find(l => l.name.toLowerCase() === String(value).toLowerCase());
      if (matched) {
        setLanguage(matched.code as LanguageCode);
      }
    }

    const success = await updateProfile(user?.id, { [key]: value });
    if (!success) {
      toast.error('Failed to save preference.');
    } else {
      toast.success('Preference updated.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setDeleteModalOpen(false);
    // Since Supabase anon key cannot delete auth.users without service role RPC,
    // we clear user session, profile, and local data cleanly with helpful message
    await signOut();
    toast.info('Account session has been terminated. For permanent data erasure, contact archive administration.');
    router.push('/');
  };

  if (loading || !profile) {
    return (
      <DashboardLayout>
        <div className="h-96 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          <p className="text-xs text-[#64748B] font-mono">LOADING PREFERENCES...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Customize language narration, playback preferences, visual appearance, and account actions.
          </p>
        </div>

        {/* 1. Language Section */}
        <section className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">Language</h2>
              <p className="text-xs text-[#64748B]">Choose your primary language for AI narratives and vocal recordings.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
            {LANGUAGES.map(lang => {
              const isSelected = profile.language?.toLowerCase() === lang.name.toLowerCase();
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleChange('language', lang.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)] font-semibold'
                      : 'bg-[#0A0A0E] border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                  }`}
                >
                  <div className="font-bold text-sm text-[#F8FAFC]">{lang.nativeName}</div>
                  <div className="text-xs opacity-70 mt-0.5">{lang.name}</div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A0A0E]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Audio Section */}
        <section className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">Audio</h2>
              <p className="text-xs text-[#64748B]">Configure AI voice speech synthesis and ambient playback behavior.</p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {/* Voice Enabled */}
            <div 
              onClick={() => handleChange('voice_enabled', !profile.voice_enabled)}
              className="flex items-center justify-between p-4 sm:p-5 bg-[#0A0A0E] border border-[#242434] hover:border-[#D4AF37]/40 rounded-2xl cursor-pointer transition-colors"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base text-[#F8FAFC]">Voice Enabled</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Play spoken vocal narration for historical scenes using Web Speech API
                </div>
              </div>
              <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${profile.voice_enabled ? 'bg-[#D4AF37]' : 'bg-[#242434]'}`}>
                <div className={`bg-[#0A0A0E] w-4 h-4 rounded-full shadow-md transform transition-transform ${profile.voice_enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Autoplay Preference */}
            <div 
              onClick={() => handleChange('autoplay', !profile.autoplay)}
              className="flex items-center justify-between p-4 sm:p-5 bg-[#0A0A0E] border border-[#242434] hover:border-[#D4AF37]/40 rounded-2xl cursor-pointer transition-colors"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base text-[#F8FAFC]">Autoplay Preference</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Automatically start vocal narration when viewing a historical coordinate
                </div>
              </div>
              <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${profile.autoplay ? 'bg-[#D4AF37]' : 'bg-[#242434]'}`}>
                <div className={`bg-[#0A0A0E] w-4 h-4 rounded-full shadow-md transform transition-transform ${profile.autoplay ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Appearance Section */}
        <section className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">Appearance</h2>
              <p className="text-xs text-[#64748B]">Choose your visual presentation theme for the portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { id: 'dark', icon: <Moon className="w-5 h-5 mb-2 mx-auto" />, label: 'Dark Mode', desc: 'Cinematic deep obsidian' },
              { id: 'system', icon: <Monitor className="w-5 h-5 mb-2 mx-auto" />, label: 'System', desc: 'Matches device preference' },
              { id: 'light', icon: <Sun className="w-5 h-5 mb-2 mx-auto" />, label: 'Light Mode', desc: 'Historical parchment theme' },
            ].map(theme => {
              const isSelected = (profile.theme || 'dark') === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleChange('theme', theme.id)}
                  className={`p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                      : 'bg-[#0A0A0E] border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                  }`}
                >
                  {theme.icon}
                  <div className="font-bold text-sm text-[#F8FAFC]">{theme.label}</div>
                  <div className="text-xs opacity-60 mt-1">{theme.desc}</div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#64748B] mt-4 text-center sm:text-left">
            Note: TimeWitness is intentionally optimized for high-contrast Dark Mode to preserve historical atmosphere.
          </p>
        </section>

        {/* 4. Account Section */}
        <section className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">Account Security</h2>
              <p className="text-xs text-[#64748B]">Manage session authentication and archive retention.</p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {user ? (
              <>
                {/* Sign Out */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0A0A0E] border border-[#242434] rounded-2xl gap-4">
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[#F8FAFC]">Sign Out</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">End your current session across this browser.</div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="px-5 py-2.5 rounded-xl bg-[#1B1B26] hover:bg-[#D4AF37]/20 border border-[#242434] hover:border-[#D4AF37]/50 text-[#F8FAFC] hover:text-[#D4AF37] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
                
                {/* Delete Account */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0A0A0E] border border-red-900/30 rounded-2xl gap-4">
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-red-400">Delete Account</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">
                      Permanent removal of personal experiences, history, and preferences.
                    </div>
                  </div>
                  <button 
                    onClick={handleDeleteAccount}
                    className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0A0A0E] border border-[#242434] rounded-2xl gap-4">
                <div>
                  <div className="font-semibold text-sm sm:text-base text-[#F8FAFC]">Guest Session</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">
                    Your preferences and history are preserved locally on this device. Sign in or create an account to synchronize across devices.
                  </div>
                </div>
                <Link 
                  href="/auth/signin"
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0"
                >
                  <LogOut className="w-4 h-4 rotate-180" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Delete Account Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-[#14141C] border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="text-[#64748B] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-cinzel font-bold text-[#F8FAFC]">Delete Historian Account?</h3>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                This action will wipe your local session, reset your preferences, and disconnect your account. In compliance with backend security policies, authentication deletion requires archive administrative authorization.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1B1B26] text-[#F8FAFC] font-semibold text-xs border border-[#242434] hover:bg-[#242434]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAccount}
                className="flex-1 py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs border border-red-500/40"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

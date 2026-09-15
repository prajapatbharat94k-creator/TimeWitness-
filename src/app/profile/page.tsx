'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getProfile, 
  updateProfile, 
  getUserHistoryDetails, 
  getSavedExperiences, 
  getFavorites, 
  DbProfile 
} from '@/lib/db';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Loader2, User as UserIcon, Save, Mail, Calendar, 
  ShieldCheck, Globe, Compass, Heart, Bookmark, Sparkles, Check
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { LANGUAGES, LanguageCode } from '@/lib/translations';
import Link from 'next/link';

const PRESET_AVATARS = [
  { id: '1', label: 'Historian', icon: '🏛️' },
  { id: '2', label: 'Scholar', icon: '📜' },
  { id: '3', label: 'Archon', icon: '👑' },
  { id: '4', label: 'Chrononaut', icon: '⏳' },
  { id: '5', label: 'Witness', icon: '⚔️' },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { setLanguage } = useLanguage();
  const toast = useToast();

  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🏛️');
  const [witnessedCount, setWitnessedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Historian Profile | TimeWitness';
    let isMounted = true;

    async function loadData() {
      try {
        const userId = user ? user.id : null;
        const [prof, hist, savedList, favList] = await Promise.all([
          getProfile(userId),
          getUserHistoryDetails(userId),
          getSavedExperiences(userId),
          getFavorites(userId),
        ]);

        if (!isMounted) return;
        setProfile(prof);
        setName(prof.name || user?.user_metadata?.full_name || 'Guest Historian');
        setSelectedLanguage(prof.language || 'English');
        if (prof.avatar_url) {
          setSelectedAvatar(prof.avatar_url);
        }
        setWitnessedCount(hist.length);
        setSavedCount(savedList.length);
        setFavCount(favList.length);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    try {
      const success = await updateProfile(user ? user.id : null, { 
        name: name.trim(),
        language: selectedLanguage,
        avatar_url: selectedAvatar,
      });

      // Also sync app-wide language context if language code matches
      const matchedLang = LANGUAGES.find(l => l.name.toLowerCase() === selectedLanguage.toLowerCase());
      if (matchedLang) {
        setLanguage(matchedLang.code as LanguageCode);
      }

      if (success) {
        toast.success('Profile updated successfully.');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch {
      toast.error('An error occurred while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <DashboardLayout>
        <div className="h-96 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          <p className="text-xs text-[#64748B] font-mono">LOADING HISTORIAN PROFILE...</p>
        </div>
      </DashboardLayout>
    );
  }

  const initials = (name || user?.email || 'GH').substring(0, 2).toUpperCase();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
            Historian Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Manage your account credentials, avatar, and preferred language.
          </p>
        </div>

        {!user && (
          <div className="p-4 rounded-2xl bg-[#14141C] border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-sm text-[#F8FAFC]">Guest Historian Profile</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">
                Your profile information and preferences are saved locally on this browser. Sign in to synchronize your history and favorites to the cloud.
              </div>
            </div>
            <Link
              href="/auth/signin"
              className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-xs transition-all text-center shrink-0"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Profile Card & Form */}
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Avatar Selection Area */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#242434]">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#14141C] border-2 border-[#D4AF37]/40 flex items-center justify-center text-4xl shadow-gold-glow shrink-0">
                {selectedAvatar.length <= 4 ? selectedAvatar : initials}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#F8FAFC]">{name || 'Historian'}</h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 w-fit mx-auto sm:mx-0">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{user ? 'Verified Historian' : 'Guest Historian'}</span>
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mb-3">{user?.email || 'Local Session'}</p>

                {/* Avatar Presets */}
                <div className="mt-3">
                  <label className="text-xs font-semibold text-[#94A3B8] block mb-2">
                    Choose Profile Insignia:
                  </label>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setSelectedAvatar(av.icon)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedAvatar === av.icon
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-[#0A0A0E] border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span className="text-sm">{av.icon}</span>
                        <span>{av.label}</span>
                        {selectedAvatar === av.icon && <Check className="w-3 h-3 ml-0.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#94A3B8] ml-1">Display Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#94A3B8] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="email"
                    value={user?.email || 'guest@timewitness.local'}
                    disabled
                    className="w-full bg-[#0A0A0E]/50 border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-sm text-[#64748B] cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-[#475569] ml-1">
                  {user ? 'Email is managed by authentication provider.' : 'Guest session active on this browser.'}
                </p>
              </div>

              {/* Preferred Language */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#94A3B8] ml-1">Preferred Language</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all appearance-none cursor-pointer"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.name} className="bg-[#14141C] text-[#F8FAFC]">
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] text-[#475569] ml-1">
                  Default language for AI narration and primary source translations.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm disabled:opacity-60 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Real Account Information Card */}
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-6">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-cinzel font-bold text-[#F8FAFC]">
              Account Archive Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#0A0A0E] border border-[#242434]">
              <p className="text-xs text-[#64748B] mb-1">Account ID</p>
              <p className="text-xs font-mono text-[#F8FAFC] truncate">{user?.id || 'Local Guest Historian'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0A0E] border border-[#242434]">
              <p className="text-xs text-[#64748B] mb-1">Member Since</p>
              <p className="text-sm font-semibold text-[#F8FAFC]">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Active Session'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0A0E] border border-[#242434]">
              <p className="text-xs text-[#64748B] mb-1">Witnessed Records</p>
              <p className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>{witnessedCount} Experiences</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0A0E] border border-[#242434]">
              <p className="text-xs text-[#64748B] mb-1">Vault Collection</p>
              <p className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
                <Bookmark className="w-4 h-4" />
                <span>{savedCount + favCount} Saved & Favs</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

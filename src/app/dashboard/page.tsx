'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getProfile, 
  getUserHistoryDetails, 
  getSavedExperiences, 
  getFavorites, 
  getUserActivityHistory,
  DbProfile, 
  ExperienceCardData, 
  ActivityEntry 
} from '@/lib/db';
import ExperienceCard from '@/components/dashboard/ExperienceCard';
import { 
  Loader2, ArrowRight, Compass, Heart, Bookmark, 
  History, Sparkles, Clock, Crown, Swords, ScrollText 
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function formatRelativeTime(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(isoString).toLocaleDateString();
  } catch {
    return 'Recent';
  }
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [history, setHistory] = useState<ExperienceCardData[]>([]);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Historian Portal & Overview | TimeWitness';
    let isMounted = true;

    async function loadData() {
      try {
        const userId = user ? user.id : null;
        const [prof, hist, savedList, favList, acts] = await Promise.all([
          getProfile(userId),
          getUserHistoryDetails(userId),
          getSavedExperiences(userId),
          getFavorites(userId),
          getUserActivityHistory(userId),
        ]);

        if (!isMounted) return;
        setProfile(prof);
        setHistory(hist);
        setSavedCount(savedList.length);
        setFavCount(favList.length);
        setActivities(acts);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [user]);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <p className="text-xs text-[#64748B] font-mono">RETRIEVING HISTORICAL RECORDS...</p>
      </div>
    );
  }

  const displayName = profile?.name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Historian');
  const recentExperiences = history.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#14141C] via-[#1A1A26] to-[#14141C] border border-[#242434] p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Historian Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-[#F8FAFC] tracking-wide mb-3">
            Welcome back, <span className="text-gold-gradient">{displayName}</span>
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Continue your journey through history.
          </p>
        </div>

        {/* Real Summary Metrics (Calculated only from actual user data, no fake XP/streaks) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#242434]/80">
          <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0E]/60 border border-[#242434]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8] mb-1">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden xs:inline">Witnessed</span>
            </div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
              {history.length}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0E]/60 border border-[#242434]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8] mb-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden xs:inline">Favorites</span>
            </div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
              {favCount}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0E]/60 border border-[#242434]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8] mb-1">
              <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden xs:inline">Saved Vault</span>
            </div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
              {savedCount}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue Witnessing (Based on actual recently viewed experiences) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-full bg-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
              Continue Witnessing
            </h2>
          </div>
          {history.length > 0 && (
            <Link 
              href="/dashboard/history" 
              className="text-xs sm:text-sm font-bold text-[#D4AF37] hover:text-[#FFF3C4] flex items-center gap-1 transition-colors"
            >
              <span>View All History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {recentExperiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentExperiences.map((exp) => (
              <ExperienceCard key={exp.id} data={exp} />
            ))}
          </div>
        ) : (
          <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-[#F8FAFC] mb-2">
              Your journey awaits
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto mb-6">
              You haven&apos;t witnessed any historical events yet. Step back into time and relive iconic moments.
            </p>
            <Link 
              href="/explore"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm"
            >
              <span>Explore History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Activity Timeline (Real activity recorded from actual user events) */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-full bg-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
              Recent Activity
            </h2>
          </div>
        </div>

        {activities.length > 0 ? (
          <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-5 sm:p-6 divide-y divide-[#242434]">
            {activities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activity.type === 'favorited' 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : activity.type === 'saved'
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {activity.type === 'favorited' && <Heart className="w-4 h-4 fill-current" />}
                    {activity.type === 'saved' && <Bookmark className="w-4 h-4 fill-current" />}
                    {activity.type === 'witnessed' && <Compass className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#F8FAFC] truncate">
                      {activity.type === 'favorited' && 'Favorited '}
                      {activity.type === 'saved' && 'Saved '}
                      {activity.type === 'witnessed' && 'Witnessed '}
                      <span className="text-[#D4AF37]">{activity.title}</span>
                    </p>
                    <p className="text-xs text-[#64748B] capitalize truncate">
                      {activity.type} experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-[#64748B] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                  <Link
                    href={`/?witness=${encodeURIComponent(activity.subject || activity.title)}`}
                    className="p-1.5 rounded-lg bg-[#1B1B26] hover:bg-[#D4AF37]/20 text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                    title="Open experience"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#1B1B26] border border-[#242434] flex items-center justify-center mx-auto mb-3 text-[#64748B]">
              <History className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-[#F8FAFC] mb-1">No recorded activity yet</p>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              As you witness historical epochs, bookmark moments, or mark favorites, your activity timeline will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Epoch Highlights (Quick launcher) */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-6 rounded-full bg-[#D4AF37]" />
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
            Explore Landmark Epochs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/?witness=Coronation%20of%20Chhatrapati%20Shivaji%20Maharaj%20at%20Raigad%20Fort%20in%201674%20AD"
            className="p-5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/60 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider block mb-1">1674 AD • MARATHA</span>
              <h3 className="font-cinzel font-bold text-base text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors mb-1">
                Coronation of Shivaji Maharaj
              </h3>
              <p className="text-xs text-[#94A3B8] line-clamp-2">
                The grand ascension ceremony at Raigad Fort inaugurating Hindavi Swarajya.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37]">
              <span>Witness Event</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/?witness=Rani%20Lakshmibai%20leading%20defense%20at%20Jhansi%20Fort%20during%201857%20war%20of%20independence"
            className="p-5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/60 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Swords className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider block mb-1">1857 AD • REVOLUTION</span>
              <h3 className="font-cinzel font-bold text-base text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors mb-1">
                Rani Lakshmibai at Jhansi
              </h3>
              <p className="text-xs text-[#94A3B8] line-clamp-2">
                Defending the historic ramparts of Jhansi during India&apos;s First War of Independence.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37]">
              <span>Witness Event</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/?witness=Napoleon%20Bonaparte%20commanding%20the%20French%20army%20at%20the%20Battle%20of%20Waterloo%20in%201815"
            className="p-5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/60 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <ScrollText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-wider block mb-1">1815 AD • EUROPE</span>
              <h3 className="font-cinzel font-bold text-base text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors mb-1">
                Battle of Waterloo
              </h3>
              <p className="text-xs text-[#94A3B8] line-clamp-2">
                Napoleon Bonaparte commanding the French forces in the mud-soaked fields of Belgium.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37]">
              <span>Witness Event</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

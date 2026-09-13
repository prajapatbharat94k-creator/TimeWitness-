'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserHistoryDetails, ExperienceCardData } from '@/lib/db';
import ExperienceCard from '@/components/dashboard/ExperienceCard';
import { Loader2, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ExperienceCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Recently Viewed History | TimeWitness';
    if (!user) return;
    let isMounted = true;
    getUserHistoryDetails(user.id).then(data => {
      if (!isMounted) return;
      // Sort newest first by last_viewed_at or added_at
      const sorted = [...data].sort((a, b) => {
        const timeA = new Date(a.last_viewed_at || a.added_at || 0).getTime();
        const timeB = new Date(b.last_viewed_at || b.added_at || 0).getTime();
        return timeB - timeA;
      });
      setHistory(sorted);
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, [user]);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <p className="text-xs text-[#64748B] font-mono">RETRIEVING VIEWING HISTORY...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
            Recently Viewed
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Chronological log of your recently witnessed historical moments.
          </p>
        </div>
        {history.length > 0 && (
          <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            {history.length} {history.length === 1 ? 'Record' : 'Records'}
          </span>
        )}
      </div>
      
      {/* Grid or Empty State */}
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {history.map((exp) => (
            <ExperienceCard 
              key={exp.id} 
              data={exp} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto mt-8">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-gold-glow">
            <History className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-cinzel font-bold text-[#F8FAFC] mb-2">
            No history yet.
          </h2>
          <p className="text-sm text-[#94A3B8] mb-6 max-w-md mx-auto">
            Your recently witnessed experiences will appear here in chronological order so you can easily resume where you left off.
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
    </div>
  );
}

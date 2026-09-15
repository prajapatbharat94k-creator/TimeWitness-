'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserHistoryDetails, ExperienceCardData } from '@/lib/db';
import ExperienceCard from '@/components/dashboard/ExperienceCard';
import { Loader2, Search, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MyExperiencesPage() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState<ExperienceCardData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'My Experiences | TimeWitness';
    let isMounted = true;
    getUserHistoryDetails(user?.id || null).then(data => {
      if (!isMounted) return;
      setExperiences(data);
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, [user]);

  const filteredExperiences = experiences.filter(exp => 
    exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (exp.location && exp.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (exp.year && exp.year.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <p className="text-xs text-[#64748B] font-mono">LOADING YOUR EXPERIENCES...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
            My Experiences
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Historical journeys and reconstructions witnessed by your account.
          </p>
        </div>

        {/* Search Bar if experiences exist */}
        {experiences.length > 0 && (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences..."
              className="w-full bg-[#14141C] border border-[#242434] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard 
              key={exp.id} 
              data={exp} 
            />
          ))}
        </div>
      ) : experiences.length > 0 && searchQuery ? (
        <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
          <p className="text-[#94A3B8] mb-4">No experiences match &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-[#D4AF37] hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto mt-8">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-gold-glow">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-cinzel font-bold text-[#F8FAFC] mb-2">
            You haven&apos;t witnessed any history yet.
          </h2>
          <p className="text-sm text-[#94A3B8] mb-6 max-w-md mx-auto">
            Explore epoch-defining moments in world history to build your permanent collection of immersive experiences.
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

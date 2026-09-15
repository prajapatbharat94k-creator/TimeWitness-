'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getFavorites, toggleFavorite, ExperienceCardData } from '@/lib/db';
import ExperienceCard from '@/components/dashboard/ExperienceCard';
import { Loader2, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import Link from 'next/link';

export default function FavoritesPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [favorites, setFavorites] = useState<ExperienceCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Favorites Vault | TimeWitness';
    let isMounted = true;
    getFavorites(user?.id || null).then(data => {
      if (!isMounted) return;
      setFavorites(data);
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, [user]);

  const handleRemove = async (id: string) => {
    const itemToRemove = favorites.find(f => f.id === id);
    setFavorites(prev => prev.filter(f => f.id !== id));
    await toggleFavorite(user?.id || null, id, false, itemToRemove);
    toast.success('Removed from Favorites.');
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <p className="text-xs text-[#64748B] font-mono">FETCHING FAVORITES...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
            Favorites
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Historical experiences and moments you have marked as your favorites.
          </p>
        </div>
        {favorites.length > 0 && (
          <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'}
          </span>
        )}
      </div>
      
      {/* Grid or Empty State */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((exp) => (
            <ExperienceCard 
              key={exp.id} 
              data={exp} 
              onRemoveFavorite={handleRemove}
              showFavoriteRemove={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto mt-8">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-xl font-cinzel font-bold text-[#F8FAFC] mb-2">
            You haven&apos;t added any favorites yet.
          </h2>
          <p className="text-sm text-[#94A3B8] mb-6 max-w-md mx-auto">
            Click the heart icon on any historical scene or experience to collect your most cherished historical moments.
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

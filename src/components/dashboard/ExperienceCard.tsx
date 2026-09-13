/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Play, Heart, Bookmark, ArrowUpRight, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ExperienceCardData } from '@/lib/localStorage';

export type { ExperienceCardData };

interface ExperienceCardProps {
  data: ExperienceCardData;
  onRemoveFavorite?: (id: string) => void;
  onRemoveSaved?: (id: string) => void;
  showFavoriteRemove?: boolean;
  showSavedRemove?: boolean;
}

export default function ExperienceCard({ 
  data, 
  onRemoveFavorite, 
  onRemoveSaved,
  showFavoriteRemove,
  showSavedRemove
}: ExperienceCardProps) {
  const router = useRouter();

  const handleOpen = () => {
    const query = data.subject || data.title;
    router.push(`/?witness=${encodeURIComponent(query)}`);
  };

  // Calculate or display progress
  const progressValue = typeof data.progress === 'number' 
    ? Math.min(Math.max(data.progress, 0), 100) 
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] flex flex-col h-full"
    >
      {/* Image / Visual Header */}
      <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0E] cursor-pointer" onClick={handleOpen}>
        {data.cover_image ? (
          <img 
            src={data.cover_image} 
            alt={data.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1B1B26] via-[#14141C] to-[#0A0A0E] p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-2 text-[#D4AF37]">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37]/60 font-semibold line-clamp-1">
              {data.year || 'Historical Archive'}
            </span>
          </div>
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A0A0E] shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Top-Right Action Controls (Remove Favorite / Saved) */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          {showFavoriteRemove && onRemoveFavorite && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onRemoveFavorite(data.id); 
              }}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all shadow-md"
              title="Remove from Favorites"
              aria-label="Remove favorite"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
          )}

          {showSavedRemove && onRemoveSaved && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onRemoveSaved(data.id); 
              }}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all shadow-md"
              title="Remove from Saved"
              aria-label="Remove saved"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>

        {/* Era / Year Tag */}
        {data.year && (
          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[#242434] text-[11px] font-mono text-[#D4AF37] flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{data.year}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 
          onClick={handleOpen}
          className="font-cinzel font-bold text-base sm:text-lg text-[#F8FAFC] mb-2 line-clamp-2 cursor-pointer group-hover:text-[#D4AF37] transition-colors leading-snug"
        >
          {data.title}
        </h3>
        
        {/* Metadata */}
        <div className="flex flex-col gap-1.5 mb-3 text-xs text-[#64748B]">
          {data.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="line-clamp-1">{data.location}</span>
            </div>
          )}
        </div>

        {/* Progress Bar (Actual progress from data) */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-[10px] text-[#64748B] mb-1">
            <span>Progress</span>
            <span className="font-mono text-[#D4AF37]">{progressValue}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0A0A0E] rounded-full overflow-hidden border border-[#242434]">
            <div 
              className="h-full bg-gradient-to-r from-[#D4AF37]/80 to-[#D4AF37] rounded-full transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3 border-t border-[#242434] flex items-center justify-between gap-2">
          <button 
            onClick={handleOpen}
            className="text-xs sm:text-sm font-bold text-[#D4AF37] hover:text-[#FFF3C4] transition-colors flex items-center gap-1.5 group/btn"
          >
            <span>{showFavoriteRemove || showSavedRemove ? 'Open' : 'Continue'}</span>
            <Play className="w-3 h-3 fill-current group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {showFavoriteRemove && onRemoveFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(data.id);
              }}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
              title="Remove from Favorites"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Remove Favorite</span>
            </button>
          )}

          {showSavedRemove && onRemoveSaved && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSaved(data.id);
              }}
              className="text-xs font-semibold text-[#94A3B8] hover:text-red-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B1B26] border border-[#242434] hover:border-red-500/30 transition-all"
              title="Remove from Saved"
            >
              <Bookmark className="w-3 h-3 fill-current" />
              <span>Remove</span>
            </button>
          )}
          
          {!showFavoriteRemove && !showSavedRemove && (data.added_at || data.last_viewed_at) && (
            <span className="text-[10px] text-[#475569]">
              {data.last_viewed_at ? 'Viewed ' : 'Saved '}
              {new Date(data.last_viewed_at || data.added_at!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

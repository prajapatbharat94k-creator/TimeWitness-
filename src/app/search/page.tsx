'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Search, X, Sparkles, Clock, MapPin, ArrowRight, 
  Compass, Calendar, Landmark, BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';

const CURATED_RECORDS = [
  {
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    query: 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD',
    era: '17th Century (1674 AD)',
    location: 'Raigad Fort, Maharashtra',
    tags: ['Maratha', 'Coronation', 'Raigad', 'Swarajya'],
    description: 'Sacred consecration rites establishing the independent sovereign Maratha realm.',
  },
  {
    title: 'Rani Lakshmibai Defense of Jhansi',
    query: 'Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence',
    era: '19th Century (1857 AD)',
    location: 'Jhansi Fort, India',
    tags: ['1857', 'Jhansi', 'Revolution', 'Lakshmibai'],
    description: 'Fierce battle for the fortress walls during India’s First War of Independence.',
  },
  {
    title: 'Battle of Waterloo',
    query: 'Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815',
    era: '19th Century (1815 AD)',
    location: 'Waterloo, Belgium',
    tags: ['Napoleon', 'Waterloo', 'Wellington', 'War'],
    description: 'Decisive tactical confrontation between the French Empire and Coalition armies.',
  },
  {
    title: 'Great Library of Alexandria',
    query: 'Scholars working in the Great Library of Alexandria during the reign of Ptolemy II Philadelphus in 260 BC',
    era: '3rd Century BC (260 BC)',
    location: 'Alexandria, Egypt',
    tags: ['Alexandria', 'Ptolemy', 'Library', 'Ancient'],
    description: 'Ancient center of scholarship, mathematics, astronomy, and classical literature.',
  },
  {
    title: 'Apollo 11 Lunar Landing',
    query: 'Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969',
    era: '20th Century (1969 AD)',
    location: 'Sea of Tranquility, Moon',
    tags: ['Apollo', 'NASA', 'Moon', 'Armstrong'],
    description: 'The first crewed touchdown on lunar soil, broadcasting history across Earth.',
  },
  {
    title: 'Major Rock Edicts of Ashoka',
    query: 'Emperor Ashoka inscribing the Major Rock Edicts promoting Dhamma after the Kalinga War in 261 BC',
    era: '3rd Century BC (261 BC)',
    location: 'Dhauli, Odisha, India',
    tags: ['Ashoka', 'Kalinga', 'Mauryan', 'Dhamma'],
    description: 'Imperial proclamations of non-violence, civic righteousness, and religious tolerance.',
  },
];

const SUGGESTIONS = [
  'Coronation of Shivaji Maharaj',
  'Battle of Waterloo',
  'Rani Lakshmibai Jhansi',
  'Apollo 11 Moon Landing',
  'Library of Alexandria',
  'Emperor Ashoka Edicts',
  'Fall of Constantinople',
  'Cleopatra and Mark Antony',
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      setSubmittedQuery(initialQuery);
      document.title = `Search: "${initialQuery}" | TimeWitness`;
    } else {
      document.title = 'Search Historical Archives | TimeWitness';
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      setSubmittedQuery(searchTerm.trim());
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSubmittedQuery('');
    router.push('/search');
  };

  const handleOpenExperience = (query: string) => {
    router.push(`/?witness=${encodeURIComponent(query)}`);
  };

  const results = submittedQuery.trim()
    ? CURATED_RECORDS.filter(record => 
        record.title.toLowerCase().includes(submittedQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(submittedQuery.toLowerCase()) ||
        record.location.toLowerCase().includes(submittedQuery.toLowerCase()) ||
        record.tags.some(tag => tag.toLowerCase().includes(submittedQuery.toLowerCase()))
      )
    : CURATED_RECORDS;

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>Archive Search</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-black text-[#F8FAFC]">
            Search Historical Archives
          </h1>
        </div>

        {/* Input Container */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-[#14141C] border border-[#242434] focus-within:border-[#D4AF37]/60 rounded-2xl sm:rounded-3xl p-1.5 shadow-2xl transition-all">
            <div className="pl-4 text-[#64748B]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search historical events, figures, or locations..."
              className="w-full bg-transparent px-4 py-3.5 text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-[#64748B] hover:text-[#F8FAFC] transition-colors mr-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="px-5 py-2.5 sm:py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[11px] font-semibold text-[#64748B] mr-1">Suggested:</span>
            {SUGGESTIONS.slice(0, 5).map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchTerm(sug);
                  setSubmittedQuery(sug);
                  router.push(`/search?q=${encodeURIComponent(sug)}`);
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-[#94A3B8] hover:text-[#D4AF37] transition-all"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#242434]">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#64748B]">
            {submittedQuery ? `Results for "${submittedQuery}"` : 'Curated Historical Coordinates'}
          </h2>
          <span className="text-xs font-mono text-[#D4AF37]">
            {results.length} {results.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>

        {/* Results Grid or No Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                onClick={() => handleOpenExperience(item.query)}
                className="p-6 rounded-3xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 transition-all shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#D4AF37] mb-3">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {item.era}</span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-[#0A0A0E] text-[#64748B] px-2 py-0.5 rounded border border-[#242434]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                  <span className="flex items-center gap-1 text-[#64748B] text-[11px]">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Witness <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-12 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-[#F8FAFC] mb-2">
              No matching archive records
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
              We couldn&apos;t find records matching &quot;{submittedQuery}&quot;. You can explore directly with our AI engine:
            </p>
            <button
              onClick={() => handleOpenExperience(submittedQuery)}
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3 px-6 rounded-xl transition-all text-xs sm:text-sm shadow-gold-glow"
            >
              <span>Witness &quot;{submittedQuery}&quot; via AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Historical Search Archive
      </footer>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D11] flex items-center justify-center">
        <Compass className="w-8 h-8 text-[#D4AF37] animate-pulse-slow" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

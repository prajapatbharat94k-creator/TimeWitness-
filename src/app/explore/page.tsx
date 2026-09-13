'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Search,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Landmark,
  Clock,
  Globe,
  Shield,
  Crown,
  Swords,
  ScrollText,
  Filter,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  REGIONS,
  EPOCHS,
  RegionCategory,
  EpochEra,
  INDIAN_CATEGORIES,
  WORLD_CATEGORIES,
  FEATURED_EXPERIENCES,
  HistoricalFigureOrEvent,
  HistoricalCategory
} from '@/data/historicalCatalog';

export default function ExplorePage() {
  const { currentLang, isJourneySaved, toggleSaveJourney } = useApp();

  const [selectedRegion, setSelectedRegion] = useState<RegionCategory>('ALL HISTORY');
  const [selectedEpoch, setSelectedEpoch] = useState<EpochEra>('All Eras');
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'india' | 'world'>('all');

  // Filter categories
  const filteredIndianCats = useMemo(() => {
    return INDIAN_CATEGORIES.filter(cat => {
      const matchesRegion = selectedRegion === 'ALL HISTORY' || selectedRegion === 'INDIA' || (selectedRegion === 'ANCIENT WORLD' && cat.epoch === 'Ancient') || (selectedRegion === 'MODERN WORLD' && (cat.epoch === 'Modern' || cat.epoch === 'Contemporary'));
      const matchesEpoch = selectedEpoch === 'All Eras' || cat.epoch === selectedEpoch;
      const matchesQuery = !filterQuery ||
        cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
        cat.sampleQuery.toLowerCase().includes(filterQuery.toLowerCase());
      return matchesRegion && matchesEpoch && matchesQuery;
    });
  }, [selectedRegion, selectedEpoch, filterQuery]);

  const filteredWorldCats = useMemo(() => {
    return WORLD_CATEGORIES.filter(cat => {
      const matchesRegion = selectedRegion === 'ALL HISTORY' ||
        cat.region === selectedRegion ||
        (selectedRegion === 'ANCIENT WORLD' && cat.epoch === 'Ancient') ||
        (selectedRegion === 'MODERN WORLD' && (cat.epoch === 'Modern' || cat.epoch === 'Contemporary'));
      const matchesEpoch = selectedEpoch === 'All Eras' || cat.epoch === selectedEpoch;
      const matchesQuery = !filterQuery ||
        cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
        cat.sampleQuery.toLowerCase().includes(filterQuery.toLowerCase());
      return matchesRegion && matchesEpoch && matchesQuery;
    });
  }, [selectedRegion, selectedEpoch, filterQuery]);

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    return FEATURED_EXPERIENCES.filter(exp => {
      const matchesRegion = selectedRegion === 'ALL HISTORY' ||
        exp.region === selectedRegion ||
        (selectedRegion === 'ANCIENT WORLD' && exp.epoch === 'Ancient') ||
        (selectedRegion === 'MODERN WORLD' && (exp.epoch === 'Modern' || exp.epoch === 'Contemporary'));
      const matchesEpoch = selectedEpoch === 'All Eras' || exp.epoch === selectedEpoch;
      const matchesQuery = !filterQuery ||
        exp.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
        exp.tags.some(t => t.toLowerCase().includes(filterQuery.toLowerCase()));
      const matchesTab = activeTab === 'all' ||
        (activeTab === 'india' && exp.isIndianHistory) ||
        (activeTab === 'world' && !exp.isIndianHistory);
      return matchesRegion && matchesEpoch && matchesQuery && matchesTab;
    });
  }, [selectedRegion, selectedEpoch, filterQuery, activeTab]);

  return (
    <div className="min-h-screen pb-24">

      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-[#242434] bg-radial-gradient overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Global Archival Portal' : 'वैश्विक ऐतिहासिक अभिलेखागार'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] tracking-tight">
            {currentLang === 'EN' ? 'EXPLORE HISTORY' : 'इतिहास अन्वेषण'}
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#94A3B8] font-sans leading-relaxed">
            {currentLang === 'EN'
              ? 'Explore the people, places, civilizations and events that shaped our world.'
              : 'उन महान व्यक्तियों, स्थानों, सभ्यताओं और घटनाओं का अन्वेषण करें जिन्होंने हमारी दुनिया को रचा।'}
          </p>

          {/* Quick Filter Search within Catalog */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={currentLang === 'EN' ? 'Filter by civilizaton, figure, dynasty, or battle...' : 'सभ्यता, शासक, राजवंश या युद्ध खोजें...'}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#14141C] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] placeholder-[#64748B] text-sm outline-none transition-all shadow-xl"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Filter Controls */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#0D0D11]/95 backdrop-blur-xl border-b border-[#242434] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

          {/* Region Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[#64748B] font-mono shrink-0 hidden sm:inline mr-1 uppercase text-[10px]">
              Region:
            </span>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${selectedRegion === region
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-gold-glow'
                    : 'bg-[#14141C] text-[#94A3B8] border border-[#242434] hover:border-[#D4AF37]/50 hover:text-white'
                  }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Epoch Chronological Filter */}
          <div className="flex items-center justify-between gap-4 flex-wrap text-xs pt-1 border-t border-[#1C1C28]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[#64748B] font-mono shrink-0 uppercase text-[10px]">
                Epoch:
              </span>
              {EPOCHS.map((epoch) => (
                <button
                  key={epoch}
                  onClick={() => setSelectedEpoch(epoch)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-xs transition-all ${selectedEpoch === epoch
                      ? 'bg-[#FFF3C4] text-black font-bold'
                      : 'bg-[#1A1A24] text-[#94A3B8] hover:text-white'
                    }`}
                >
                  {epoch}
                </button>
              ))}
            </div>

            {/* View Scope Toggle */}
            <div className="flex items-center gap-1 bg-[#14141C] p-1 rounded-xl border border-[#242434] text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTab === 'all' ? 'bg-[#242434] text-[#FFF3C4] font-medium' : 'text-[#94A3B8]'}`}
              >
                {currentLang === 'EN' ? 'All Experiences' : 'सभी अनुभव'}
              </button>
              <button
                onClick={() => setActiveTab('india')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTab === 'india' ? 'bg-[#D4AF37]/20 text-[#FFF3C4] border border-[#D4AF37]/40 font-medium' : 'text-[#94A3B8]'}`}
              >
                {currentLang === 'EN' ? 'India' : 'भारत'}
              </button>
              <button
                onClick={() => setActiveTab('world')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTab === 'world' ? 'bg-[#38BDF8]/20 text-[#E0F2FE] border border-[#38BDF8]/40 font-medium' : 'text-[#94A3B8]'}`}
              >
                {currentLang === 'EN' ? 'World' : 'विश्व'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">

        {/* ─── SECTION 1: FEATURED EXPERIENCES (CINEMATIC CARDS) ────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                Primary-Source Reconstructions
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'Featured Historical Experiences' : 'प्रमुख ऐतिहासिक अनुभव'}
              </h2>
            </div>
            <span className="text-xs text-[#64748B] font-mono">
              {filteredExperiences.length} {currentLang === 'EN' ? 'archived moments' : 'अभिलेख उपलब्ध'}
            </span>
          </div>

          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16 bg-[#14141C] rounded-3xl border border-[#242434]">
              <Clock className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
              <p className="text-base text-[#94A3B8]">
                {currentLang === 'EN' ? 'No experiences match this combination of region and epoch.' : 'इस फ़िल्टर से मेल खाने वाला कोई अनुभव नहीं मिला।'}
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('ALL HISTORY');
                  setSelectedEpoch('All Eras');
                  setFilterQuery('');
                  setActiveTab('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#1B1B26] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium hover:border-[#D4AF37]"
              >
                {currentLang === 'EN' ? 'Reset All Filters' : 'फ़िल्टर रीसेट करें'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((item) => {
                const isSaved = isJourneySaved(item.searchQuery);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    className="group relative bg-[#14141C] rounded-3xl border border-[#242434] hover:border-[#D4AF37]/50 overflow-hidden flex flex-col justify-between shadow-2xl transition-all"
                  >
                    {/* Visual Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#1B1B26]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14141C] via-[#14141C]/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.isIndianHistory
                            ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF3C4]'
                            : 'bg-[#38BDF8]/20 border border-[#38BDF8]/50 text-[#E0F2FE]'
                          }`}>
                          {item.region}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 text-[#CBD5E1] backdrop-blur-md">
                          {item.timeframe}
                        </span>
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSaveJourney({
                            id: item.id,
                            topic: item.searchQuery,
                            era: item.timeframe,
                            savedAt: new Date().toLocaleDateString(),
                            title: item.title,
                            thumbnailUrl: item.imageUrl
                          });
                        }}
                        aria-label={isSaved ? 'Remove Bookmark' : 'Save Bookmark'}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors line-clamp-1">
                          {currentLang === 'EN' ? item.title : item.titleHi}
                        </h3>
                        <p className="text-xs font-mono text-[#D4AF37] mt-1 mb-2.5 line-clamp-1">
                          {currentLang === 'EN' ? item.subtitle : item.subtitleHi}
                        </p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                          {currentLang === 'EN' ? item.description : item.descriptionHi}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1B1B26] border border-[#242434] text-[#64748B]">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="pt-4 border-t border-[#242434] flex items-center gap-2">
                        <Link
                          href={`/witness?topic=${encodeURIComponent(item.searchQuery)}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
                        >
                          <span>{currentLang === 'EN' ? 'Witness Story' : 'साक्षी बनें'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/experience/${item.id}`}
                          className="py-2 px-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/40 text-xs text-[#CBD5E1] hover:text-white transition-all font-medium"
                          title="View Chronicle Details"
                        >
                          {currentLang === 'EN' ? 'Details' : 'विवरण'}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── SECTION 2: INDIAN HISTORY CATEGORIES ───────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'india') && filteredIndianCats.length > 0 && (
          <section className="pt-6 border-t border-[#242434]">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2">
                <Crown className="w-3.5 h-3.5" />
                <span>Bharata Itihasa • 5,000+ Years</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'Indian History Disciplines & Dynasties' : 'भारतीय इतिहास: कालक्रम एवं राजवंश'}
              </h2>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl">
                {currentLang === 'EN'
                  ? 'Comprehensive archival trajectories from the Indus Valley urbanization through imperial unifications, medieval resurgences, and the independence struggle.'
                  : 'सिंधु घाटी सभ्यता से लेकर मौर्य, गुप्त, मराठा और स्वतंत्रता संग्राम तक के 10 प्रमुख ऐतिहासिक युग।'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIndianCats.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#14141C] rounded-2xl p-5 border border-[#242434] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                        {cat.epoch} • {cat.timeRange}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-1.5">
                      {currentLang === 'EN' ? cat.name : cat.nameHi}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                      {currentLang === 'EN' ? cat.description : cat.descriptionHi}
                    </p>
                  </div>

                  <Link
                    href={`/witness?topic=${encodeURIComponent(cat.sampleQuery)}`}
                    className="flex items-center justify-between text-xs font-bold text-[#D4AF37] group-hover:underline pt-3 border-t border-[#1F1F2C]"
                  >
                    <span>{currentLang === 'EN' ? 'Explore Era' : 'कालखंड देखें'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── SECTION 3: WORLD HISTORY CATEGORIES ────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'world') && filteredWorldCats.length > 0 && (
          <section className="pt-6 border-t border-[#242434]">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-mono uppercase tracking-wider mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Human Civilization</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'World History Epochs & Civilizations' : 'विश्व इतिहास: प्रमुख युग एवं सभ्यताएं'}
              </h2>
              <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl">
                {currentLang === 'EN'
                  ? 'Key civilizational crossroads spanning the Mediterranean, Europe, the Americas, Asia, and modern global geopolitical turning points.'
                  : 'प्राचीन मिस्र, रोम, पुनर्जागरण, विश्व युद्धों और अंतरिक्ष युग तक विश्व इतिहास की 16 प्रमुख श्रेणियां।'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredWorldCats.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#14141C] rounded-2xl p-5 border border-[#242434] hover:border-[#38BDF8]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                        {cat.region} • {cat.timeRange}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-base font-bold text-[#F8FAFC] group-hover:text-[#E0F2FE] transition-colors mb-1.5">
                      {currentLang === 'EN' ? cat.name : cat.nameHi}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                      {currentLang === 'EN' ? cat.description : cat.descriptionHi}
                    </p>
                  </div>

                  <Link
                    href={`/witness?topic=${encodeURIComponent(cat.sampleQuery)}`}
                    className="flex items-center justify-between text-xs font-bold text-[#38BDF8] group-hover:underline pt-3 border-t border-[#1F1F2C]"
                  >
                    <span>{currentLang === 'EN' ? 'Witness Era' : 'युग देखें'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

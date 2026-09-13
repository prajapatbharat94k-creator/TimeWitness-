'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, Crown, Swords, ScrollText, Landmark, 
  ArrowRight, Search, Filter, Calendar, MapPin, Sparkles, Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EpochCard {
  id: string;
  title: string;
  query: string;
  year: string;
  location: string;
  era: string;
  region: string;
  category: string;
  description: string;
  badge: string;
}

const EPOCHS: EpochCard[] = [
  {
    id: 'shivaji-coronation',
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    query: 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD',
    year: '1674 AD',
    location: 'Raigad Fort, Maharashtra',
    era: 'Early Modern',
    region: 'South Asia',
    category: 'Crowns & Sovereignty',
    description: 'The monumental ceremony establishing Hindavi Swarajya with sacred coronation rites atop Raigad.',
    badge: 'Maratha Empire',
  },
  {
    id: 'jhansi-defense',
    title: 'Rani Lakshmibai Defense of Jhansi',
    query: 'Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence',
    year: '1857 AD',
    location: 'Jhansi Fort, Bundelkhand',
    era: 'Modern',
    region: 'South Asia',
    category: 'Revolutions & Battles',
    description: 'The iconic resistance of the Warrior Queen defending the battlements of Jhansi against besieging forces.',
    badge: '1857 Revolution',
  },
  {
    id: 'waterloo',
    title: 'Battle of Waterloo',
    query: 'Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815',
    year: '1815 AD',
    location: 'Waterloo, Belgium',
    era: 'Modern',
    region: 'Europe',
    category: 'Revolutions & Battles',
    description: 'The climax of the Napoleonic Wars where empires collided across the rain-soaked plains of Belgium.',
    badge: 'Napoleonic Wars',
  },
  {
    id: 'alexandria-library',
    title: 'The Great Library of Alexandria',
    query: 'Scholars working in the Great Library of Alexandria during the reign of Ptolemy II Philadelphus in 260 BC',
    year: '260 BC',
    location: 'Alexandria, Egypt',
    era: 'Ancient',
    region: 'Middle East & Africa',
    category: 'Knowledge & Culture',
    description: 'The intellectual capital of the classical world preserving ancient papyrus scrolls and philosophical treatises.',
    badge: 'Ptolemaic Kingdom',
  },
  {
    id: 'ashoka-kalinga',
    title: 'Edicts of Emperor Ashoka',
    query: 'Emperor Ashoka inscribing the Major Rock Edicts promoting Dhamma after the Kalinga War in 261 BC',
    year: '261 BC',
    location: 'Dhauli, Odisha',
    era: 'Ancient',
    region: 'South Asia',
    category: 'Crowns & Sovereignty',
    description: 'The moral transformation of the Mauryan Emperor leading to peace and rock-inscribed edicts across the subcontinent.',
    badge: 'Mauryan Empire',
  },
  {
    id: 'apollo-11',
    title: 'Apollo 11 First Lunar Landing',
    query: 'Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969',
    year: '1969 AD',
    location: 'Sea of Tranquility, Moon',
    era: 'Contemporary',
    region: 'Americas',
    category: 'Science & Exploration',
    description: 'Humanity taking its first profound steps onto another celestial world broadcast across the globe.',
    badge: 'Space Exploration',
  },
  {
    id: 'constantinople-1453',
    title: 'Fall of Constantinople',
    query: 'Sultan Mehmed II entering Constantinople after the siege of 1453',
    year: '1453 AD',
    location: 'Constantinople, Byzantine Empire',
    era: 'Medieval',
    region: 'Europe',
    category: 'Revolutions & Battles',
    description: 'The end of the Byzantine Empire and the historic transformation of the ancient capital into Istanbul.',
    badge: 'Ottoman Empire',
  },
  {
    id: 'akbar-ibadat-khana',
    title: 'Akbar at the Ibadat Khana',
    query: 'Emperor Akbar hosting multi-faith philosophical debates at the Ibadat Khana in Fatehpur Sikri in 1575 AD',
    year: '1575 AD',
    location: 'Fatehpur Sikri, India',
    era: 'Early Modern',
    region: 'South Asia',
    category: 'Knowledge & Culture',
    description: 'Scholars of Hindu, Jain, Muslim, Christian, and Zoroastrian faiths convening for theological dialogue.',
    badge: 'Mughal Empire',
  },
];

const ERAS = ['All Eras', 'Ancient', 'Medieval', 'Early Modern', 'Modern', 'Contemporary'];
const CATEGORIES = ['All Categories', 'Revolutions & Battles', 'Crowns & Sovereignty', 'Knowledge & Culture', 'Science & Exploration'];

export default function ExplorePage() {
  const router = useRouter();
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    document.title = 'Explore Historical Epochs | TimeWitness';
  }, []);

  const filteredEpochs = EPOCHS.filter(epoch => {
    const matchesEra = selectedEra === 'All Eras' || epoch.era === selectedEra;
    const matchesCat = selectedCategory === 'All Categories' || epoch.category === selectedCategory;
    const matchesSearch = !searchFilter.trim() || 
      epoch.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.year.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesEra && matchesCat && matchesSearch;
  });

  const handleWitness = (query: string) => {
    router.push(`/?witness=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Historical Catalog</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-[#F8FAFC] tracking-tight mb-4">
            Explore Historical Epochs
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Traverse curated pivotal moments across ancient kingdoms, revolutionary battles, and cultural milestones grounded in primary source evidence.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-4 sm:p-6 mb-10 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search epochs, figures, or locations..."
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 px-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-[#14141C] text-[#F8FAFC]">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Era Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#242434]">
            <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Era:</span>
            </span>
            {ERAS.map(era => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedEra === era
                    ? 'bg-[#D4AF37] text-[#0A0A0E] font-bold shadow-gold-glow'
                    : 'bg-[#0A0A0E] border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>

        {/* Epochs Grid */}
        {filteredEpochs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEpochs.map((epoch) => (
              <motion.div
                key={epoch.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleWitness(epoch.query)}
                className="bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/60 rounded-3xl p-6 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md border border-[#D4AF37]/20 uppercase tracking-wider">
                      {epoch.badge}
                    </span>
                    <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {epoch.year}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                    {epoch.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                    {epoch.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{epoch.location}</span>
                  </div>

                  <div className="pt-4 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37] group-hover:text-[#FFF3C4]">
                    <span>Witness Epoch</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-[#94A3B8] mb-4">No epochs found matching your filters.</p>
            <button
              onClick={() => { setSelectedEra('All Eras'); setSelectedCategory('All Categories'); setSearchFilter(''); }}
              className="text-xs font-bold text-[#D4AF37] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Historical Epoch Explorer
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { 
  Compass, ArrowRight, Search, Calendar, MapPin, Clock, 
  Sparkles, Globe2, ShieldCheck, Cpu
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSceneVisual } from '@/lib/historicalVisuals';

interface EpochCard {
  id: string;
  title: string;
  query: string;
  year: string;
  location: string;
  era: string;
  region: 'India & South Asia' | 'Europe' | 'Middle East & Africa' | 'Global & Americas';
  category: 'Revolutions & Battles' | 'Crowns & Sovereignty' | 'Knowledge & Culture' | 'Science & Exploration';
  description: string;
  badge: string;
  visualType: 'archival' | 'reconstruction';
  image: string;
}

const EPOCHS: EpochCard[] = [
  {
    id: 'shivaji-coronation',
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    query: 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD',
    year: '1674 AD',
    location: 'Raigad Fort, Maharashtra',
    era: 'Early Modern',
    region: 'India & South Asia',
    category: 'Crowns & Sovereignty',
    description: 'The monumental coronation ceremony establishing sovereign Hindavi Swarajya atop Raigad.',
    badge: 'Maratha Swarajya',
    visualType: 'reconstruction',
    image: getSceneVisual('Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD', 1).url,
  },
  {
    id: 'jhansi-defense',
    title: 'Rani Lakshmibai Defense of Jhansi',
    query: 'Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence',
    year: '1857 AD',
    location: 'Jhansi Fort, Bundelkhand',
    era: 'Modern',
    region: 'India & South Asia',
    category: 'Revolutions & Battles',
    description: 'The legendary defense of Jhansi ramparts against besieging British imperial forces.',
    badge: '1857 Revolution',
    visualType: 'reconstruction',
    image: getSceneVisual('Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence', 1).url,
  },
  {
    id: 'gandhi-dandi',
    title: 'Mahatma Gandhi & The Salt March',
    query: 'Mahatma Gandhi leading the Dandi Salt March in 1930',
    year: '1930 AD',
    location: 'Dandi Beach, Gujarat',
    era: 'Modern',
    region: 'India & South Asia',
    category: 'Revolutions & Battles',
    description: 'The iconic 240-mile march against the colonial salt tax, awakening civil disobedience.',
    badge: 'Satyagraha Movement',
    visualType: 'archival',
    image: getSceneVisual('Mahatma Gandhi leading the Dandi Salt March in 1930', 1).url,
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
    description: 'The climactic clash between Napoleon Bonaparte and the Seventh Coalition reshaping Europe.',
    badge: 'Napoleonic Wars',
    visualType: 'reconstruction',
    image: getSceneVisual('Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815', 1).url,
  },
  {
    id: 'cleopatra-alexandria',
    title: 'Cleopatra VII & Fall of Alexandria',
    query: 'Cleopatra VII in Alexandria navigating Roman diplomacy and the Battle of Actium in 30 BC',
    year: '30 BC',
    location: 'Alexandria, Egypt',
    era: 'Ancient',
    region: 'Middle East & Africa',
    category: 'Crowns & Sovereignty',
    description: 'The sovereign queen defending Egyptian autonomy amidst the Mediterranean power struggles.',
    badge: 'Ptolemaic Egypt',
    visualType: 'reconstruction',
    image: getSceneVisual('Cleopatra VII in Alexandria navigating Roman diplomacy and the Battle of Actium in 30 BC', 1).url,
  },
  {
    id: 'french-revolution',
    title: 'Storming of the Bastille',
    query: 'Storming of the Bastille during the French Revolution in 1789',
    year: '1789 AD',
    location: 'Paris, France',
    era: 'Early Modern',
    region: 'Europe',
    category: 'Revolutions & Battles',
    description: 'The Parisian uprising that toppled the royal fortress and sparked the French Revolution.',
    badge: 'French Revolution',
    visualType: 'reconstruction',
    image: getSceneVisual('Storming of the Bastille during the French Revolution in 1789', 1).url,
  },
  {
    id: 'apollo-11',
    title: 'Apollo 11 First Lunar Landing',
    query: 'Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969',
    year: '1969 AD',
    location: 'Sea of Tranquility, Moon',
    era: 'Contemporary',
    region: 'Global & Americas',
    category: 'Science & Exploration',
    description: 'Humanity taking its historic first steps on another celestial body in the Sea of Tranquility.',
    badge: 'Space Exploration',
    visualType: 'archival',
    image: getSceneVisual('Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969', 1).url,
  },
  {
    id: 'ashoka-kalinga',
    title: 'Edicts of Emperor Ashoka',
    query: 'Emperor Ashoka inscribing the Major Rock Edicts promoting Dhamma after the Kalinga War in 261 BC',
    year: '261 BC',
    location: 'Dhauli, Odisha',
    era: 'Ancient',
    region: 'India & South Asia',
    category: 'Crowns & Sovereignty',
    description: 'The moral transformation of the Mauryan Emperor proclaiming peace across ancient Asia.',
    badge: 'Mauryan Empire',
    visualType: 'archival',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
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
    description: 'The intellectual hub of the Mediterranean preserving classical science and philosophy.',
    badge: 'Hellenistic World',
    visualType: 'reconstruction',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'akbar-ibadat-khana',
    title: 'Akbar at the Ibadat Khana',
    query: 'Emperor Akbar hosting multi-faith philosophical debates at the Ibadat Khana in Fatehpur Sikri in 1575 AD',
    year: '1575 AD',
    location: 'Fatehpur Sikri, India',
    era: 'Early Modern',
    region: 'India & South Asia',
    category: 'Knowledge & Culture',
    description: 'Scholars of Hindu, Jain, Muslim, Christian, and Zoroastrian traditions convening in dialogue.',
    badge: 'Mughal Empire',
    visualType: 'reconstruction',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
  },
];

const REGIONS = ['All Regions', 'India & South Asia', 'Europe', 'Middle East & Africa', 'Global & Americas'];
const ERAS = ['All Eras', 'Ancient', 'Early Modern', 'Modern', 'Contemporary'];
const CATEGORIES = ['All Categories', 'Revolutions & Battles', 'Crowns & Sovereignty', 'Knowledge & Culture', 'Science & Exploration'];
const SORTS = ['Featured', 'Chronological (Oldest First)', 'Chronological (Newest First)'];

export default function ExplorePage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Featured');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    document.title = 'Explore Historical Epochs | TimeWitness';
  }, []);

  const filteredEpochs = EPOCHS.filter(epoch => {
    const matchesRegion = selectedRegion === 'All Regions' || epoch.region === selectedRegion;
    const matchesEra = selectedEra === 'All Eras' || epoch.era === selectedEra;
    const matchesCat = selectedCategory === 'All Categories' || epoch.category === selectedCategory;
    const matchesSearch = !searchFilter.trim() || 
      epoch.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      epoch.year.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesRegion && matchesEra && matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Chronological (Oldest First)') {
      const getYearVal = (yr: string) => {
        if (yr.includes('BC')) return -parseInt(yr.replace(/[^\d]/g, ''), 10);
        return parseInt(yr.replace(/[^\d]/g, ''), 10);
      };
      return getYearVal(a.year) - getYearVal(b.year);
    }
    if (sortBy === 'Chronological (Newest First)') {
      const getYearVal = (yr: string) => {
        if (yr.includes('BC')) return -parseInt(yr.replace(/[^\d]/g, ''), 10);
        return parseInt(yr.replace(/[^\d]/g, ''), 10);
      };
      return getYearVal(b.year) - getYearVal(a.year);
    }
    return 0; // Featured order
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
            <span>PRIMARY ARCHIVE & RECONSTRUCTIONS</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-[#F8FAFC] tracking-tight mb-4">
            Explore Historical Epochs
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Traverse key turning points of human civilization. Select any epoch to enter an immersive 5-scene historical journey with real-time narration and dialogue.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-5 sm:p-6 mb-10 shadow-2xl space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search epochs, leaders, battles, or places..."
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
              />
            </div>

            {/* Region Dropdown */}
            <div className="w-full lg:w-56">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 px-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
              >
                {REGIONS.map(reg => (
                  <option key={reg} value={reg} className="bg-[#14141C] text-[#F8FAFC]">{reg}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="w-full lg:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 px-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-[#14141C] text-[#F8FAFC]">{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 px-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
              >
                {SORTS.map(sort => (
                  <option key={sort} value={sort} className="bg-[#14141C] text-[#F8FAFC]">{sort}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Era Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#242434]">
            <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Era Filter:</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEpochs.map((epoch) => (
              <motion.div
                key={epoch.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleWitness(epoch.query)}
                className="bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/60 rounded-3xl overflow-hidden transition-all shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.14)] flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0A0A0E]">
                    <Image
                      src={epoch.image}
                      alt={epoch.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14141C] via-[#14141C]/20 to-transparent" />
                    
                    {/* Visual Type Pill */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border backdrop-blur-md ${
                        epoch.visualType === 'archival'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                          : 'bg-[#0A0A0E]/80 text-[#D4AF37] border-[#D4AF37]/30'
                      }`}>
                        {epoch.visualType === 'archival' ? (
                          <>
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>ARCHIVAL RECORD</span>
                          </>
                        ) : (
                          <>
                            <Cpu className="w-3 h-3 text-[#D4AF37]" />
                            <span>AI RECONSTRUCTION</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs font-mono text-[#F8FAFC] bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {epoch.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md border border-[#D4AF37]/20 uppercase tracking-wider">
                        {epoch.badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {epoch.region}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2 line-clamp-2">
                      {epoch.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                      {epoch.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{epoch.location}</span>
                  </div>

                  <div className="pt-4 border-t border-[#242434] flex items-center justify-between text-xs font-bold text-[#D4AF37] group-hover:text-[#FFF3C4]">
                    <span>Witness Epoch</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-[#94A3B8] mb-4">No epochs found matching your filters.</p>
            <button
              onClick={() => { setSelectedRegion('All Regions'); setSelectedEra('All Eras'); setSelectedCategory('All Categories'); setSearchFilter(''); }}
              className="text-xs font-bold text-[#D4AF37] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Historical Epoch Explorer • AI Reconstruction Platform Grounded in Evidence
      </footer>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';
import { HistoricalScene } from './api/generate-story/route';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  ArrowUpRight,
  Landmark,
  Crown,
  Swords,
  ScrollText
} from 'lucide-react';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');
  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkDefaultFigure, setTalkDefaultFigure] = useState<string | undefined>(undefined);

  const handleSearch = async (query: string) => {
    setActiveQuery(query);
    setIsLoading(true);

    // Scroll smoothly to scene viewer
    const el = document.getElementById('scene-viewer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query, language: currentLang }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate historical story from API');
      }

      const data = await res.json();
      if (data.scenes && Array.isArray(data.scenes)) {
        setGeneratedScenes(data.scenes);
      }
    } catch (err) {
      console.error('Error fetching historical story:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTalkToHistory = (figureName?: string) => {
    setTalkDefaultFigure(figureName);
    setIsTalkModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] relative selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenTalkToHistory={() => handleOpenTalkToHistory()}
      />

      {/* Main Container */}
      <main className="relative">
        
        {/* Hero Section */}
        <HeroSection currentLang={currentLang} />

        {/* Central Search Bar with Interactive Sample Tag Pills */}
        <SearchBar
          currentLang={currentLang}
          onSearch={handleSearch}
          activeQuery={activeQuery}
        />

        {/* Scene Viewport Component (5-Scene Journey Powered by Gemini) */}
        <ScenePlaceholder
          currentLang={currentLang}
          searchQuery={activeQuery}
          scenes={generatedScenes}
          isLoading={isLoading}
          onOpenTalkToHistory={handleOpenTalkToHistory}
        />

        {/* Featured Historical Eras Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#242434] relative">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-3">
              <Landmark className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLang === 'EN' ? 'EXPLORE HISTORICAL EPOCHS' : 'ऐतिहासिक युगों की खोज'}</span>
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'Traverse Key Eras of Human History' : 'मानव इतिहास के प्रमुख युगों का भ्रमण करें'}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-3">
              {currentLang === 'EN'
                ? 'From ancient empires to modern revolutions, experience primary-source verified moments.'
                : 'प्राचीन साम्राज्यों से लेकर आधुनिक क्रांतियों तक, सत्यापित ऐतिहासिक क्षणों का अनुभव करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Era Card 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => handleSearch('Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD')}
              className="glass-panel rounded-3xl p-6 border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-[11px] font-mono text-[#D4AF37] tracking-wider block mb-1">17TH CENTURY • MARATHA EMPIRE</span>
              <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                {currentLang === 'EN' ? 'Swarajya & Fortification Era' : 'स्वराज्य एवं दुर्ग युग'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {currentLang === 'EN'
                  ? 'Witness the naval expansion, hill-fort strategies, and grand coronation of Shivaji Maharaj.'
                  : 'शिवाजी महाराज के नौसैनिक विस्तार, दुर्ग रणनीतियों और भव्य राज्याभिषेक के साक्षी बनें।'}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{currentLang === 'EN' ? 'Witness Era' : 'युग देखें'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Era Card 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => handleSearch('Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence')}
              className="glass-panel rounded-3xl p-6 border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-[11px] font-mono text-[#D4AF37] tracking-wider block mb-1">1857 AD • REVOLUTION OF INDIA</span>
              <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                {currentLang === 'EN' ? 'First War of Independence' : 'प्रथम स्वतंत्रता संग्राम'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {currentLang === 'EN'
                  ? 'Step onto the ramparts of Jhansi as Rani Lakshmibai defends her nation against imperial forces.'
                  : 'झांसी के प्राचीरों पर कदम रखें जब रानी लक्ष्मीबाई साम्राज्यवादी सेना के खिलाफ अपने राष्ट्र की रक्षा करती हैं।'}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{currentLang === 'EN' ? 'Witness Era' : 'युग देखें'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Era Card 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => handleSearch('Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815')}
              className="glass-panel rounded-3xl p-6 border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ScrollText className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-[11px] font-mono text-[#D4AF37] tracking-wider block mb-1">1815 AD • NAPOLEONIC EUROPE</span>
              <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                {currentLang === 'EN' ? 'Napoleonic Campaign' : 'नेपोलियन अभियान'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {currentLang === 'EN'
                  ? 'Stand in the mud of Waterloo during the decisive clashes that reshaped modern Europe.'
                  : 'वाटरलू के युद्धक्षेत्र में खड़े होकर आधुनिक यूरोप को आकार देने वाले निर्णायक संघर्षों को देखें।'}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{currentLang === 'EN' ? 'Witness Era' : 'युग देखें'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-cinzel text-lg font-bold text-gold-gradient">TIMEWITNESS</span>
          </div>

          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} TimeWitness Engine. Powered by Google Gen AI SDK (@google/genai). All archival records verified.
          </p>

          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Archive</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Gemini API Docs</a>
          </div>
        </div>
      </footer>

      {/* Talk to History Modal */}
      <TalkToHistoryModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        currentLang={currentLang}
        defaultFigure={talkDefaultFigure}
      />

    </div>
  );
}

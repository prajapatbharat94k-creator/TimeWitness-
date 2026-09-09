'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';
import { ToastProvider, useToast } from '@/components/ToastProvider';
import { HistoricalScene, HistoricalKnowledgeContext } from '@/types/story';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  ArrowUpRight,
  Landmark,
  Crown,
  Swords,
  ScrollText
} from 'lucide-react';

// ─── Inner app (needs access to toast context) ────────────────────────────────
function AppInner() {
  const toast = useToast();

  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');
  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkDefaultFigure, setTalkDefaultFigure] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [storySource, setStorySource] = useState<string>('');
  const [wikiContext, setWikiContext] = useState<HistoricalKnowledgeContext | null>(null);

  // ── Deep-link: auto-load from ?witness= query param on mount ──────────────
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const witnessParam = params.get('witness');
      if (witnessParam) {
        const decoded = decodeURIComponent(witnessParam);
        if (decoded.trim()) {
          toast.info(
            currentLang === 'EN'
              ? `📜 Loading shared journey: "${decoded.slice(0, 50)}..."`
              : `📜 साझा यात्रा लोड हो रही है...`
          );
          handleSearch(decoded.trim());
        }
      }
    } catch {
      // Silently ignore URL parse errors
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error(
        currentLang === 'EN'
          ? 'Please enter a historical topic to search.'
          : 'कृपया एक ऐतिहासिक विषय दर्ज करें।'
      );
      return;
    }

    setActiveQuery(query);
    setIsLoading(true);
    setGeneratedScenes([]);
    setStorySource('');
    setWikiContext(null);

    // Scroll smoothly to scene viewer
    const el = document.getElementById('scene-viewer');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query, language: currentLang }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.scenes && Array.isArray(data.scenes)) {
        setGeneratedScenes(data.scenes);
        setStorySource(data.source ?? '');
        setWikiContext(data.wikiContext ?? null);

        // ── Toast based on source ───────────────────────────────────────────
        if (data.source === 'demo') {
          toast.info(
            currentLang === 'EN'
              ? '🎭 Demo Mode: Loading curated sample story.'
              : '🎭 डेमो मोड: क्यूरेटेड नमूना कहानी लोड हो रही है।'
          );
        } else if (data.source === 'fallback') {
          toast.info(
            currentLang === 'EN'
              ? '⚡ Offline Mode: Showing structured fallback story.'
              : '⚡ ऑफ़लाइन मोड: संरचित फ़ॉलबैक कहानी दिखाई जा रही है।'
          );
        } else {
          toast.success(
            currentLang === 'EN'
              ? '✨ 5-scene historical journey generated successfully!'
              : '✨ 5-दृश्य ऐतिहासिक यात्रा सफलतापूर्वक तैयार की गई!'
          );
        }
      }
    } catch (err: any) {
      console.error('Error fetching historical story:', err);
      toast.error(
        currentLang === 'EN'
          ? `❌ API error: ${err?.message ?? 'Unknown error'}. Please try again.`
          : '❌ API त्रुटि: कृपया पुनः प्रयास करें।'
      );
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
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((m) => !m)}
      />

      {/* Main Container */}
      <main className="relative" id="hero">
        
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
          source={storySource}
          wikiContext={wikiContext}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((m) => !m)}
          onToastSuccess={toast.success}
          onToastError={toast.error}
        />

        {/* Featured Historical Eras Showcase Section */}
        <section id="eras" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#242434] relative">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-3">
              <Landmark className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLang === 'EN' ? 'EXPLORE HISTORICAL EPOCHS' : 'ऐतिहासिक युगों की खोज'}</span>
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'Traverse Key Eras of Human History' : 'मानव इतिहास के प्रमुख युगों का भ्रमण करें'}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-3">
              {currentLang === 'EN'
                ? 'From ancient empires to modern revolutions, experience primary-source verified moments.'
                : 'प्राचीन साम्राज्यों से लेकर आधुनिक क्रांतियों तक, सत्यापित ऐतिहासिक क्षणों का अनुभव करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Era Card 1 — Shivaji */}
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

            {/* Era Card 2 — Rani Lakshmibai */}
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

            {/* Era Card 3 — Napoleon */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => handleSearch('Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815')}
              className="glass-panel rounded-3xl p-6 border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl relative overflow-hidden sm:col-span-2 md:col-span-1"
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
      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-10 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-cinzel text-lg font-bold text-gold-gradient">TIMEWITNESS</span>
          </div>

          <p className="text-xs text-[#64748B] text-center">
            © {new Date().getFullYear()} TimeWitness Engine. Powered by Google Gen AI SDK (@google/genai). All archival records verified.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#94A3B8]">
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

// ─── Root export — wraps in ToastProvider ─────────────────────────────────────
export default function Home() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}

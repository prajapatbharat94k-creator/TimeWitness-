'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';
import { ToastProvider, useToast } from '@/components/ToastProvider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { HistoricalScene } from '@/types/story';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  ArrowUpRight,
  Landmark,
  Crown,
  Swords,
  ScrollText
} from 'lucide-react';

function AppInner() {
  const toast = useToast();
  const { t, currentLang, languageInfo } = useLanguage();

  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [experienceId, setExperienceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkDefaultFigure, setTalkDefaultFigure] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [storySource, setStorySource] = useState<string>('');

  useEffect(() => {
    document.title = 'TimeWitness | AI-Powered Cinematic Historical Time Machine';
    try {
      const params = new URLSearchParams(window.location.search);
      const witnessParam = params.get('witness');
      if (witnessParam) {
        const decoded = decodeURIComponent(witnessParam);
        if (decoded.trim()) {
          toast.info(`${t('loadingJourney')} "${decoded.slice(0, 50)}..."`);
          handleSearch(decoded.trim());
        }
      }
    } catch {
      // Silently ignore URL parse errors
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error(t('emptySearch'));
      return;
    }

    setActiveQuery(query);
    setIsLoading(true);
    setGeneratedScenes([]);
    setExperienceId(null);
    setStorySource('');

    // Scroll smoothly to scene viewer
    const el = document.getElementById('scene-viewer');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    // Show preparation toast if language is not English
    if (currentLang !== 'EN') {
      toast.info(`${t('preparing')} ${languageInfo.nativeName}...`);
    }

    try {
      // Pass the full language native name to the API
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query, language: languageInfo.nativeName }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.scenes && Array.isArray(data.scenes)) {
        setGeneratedScenes(data.scenes);
        setStorySource(data.source ?? '');
        setExperienceId(data.experienceId ?? null);

        if (data.source === 'demo') {
          toast.info(t('demoMode'));
        } else if (data.source === 'fallback') {
          toast.info(t('offlineMode'));
        } else {
          toast.success(t('successJourney'));
        }
      }
    } catch (err: any) {
      console.error('Error fetching historical story:', err);
      toast.error(t('apiError'));
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
      <Navbar
        onOpenTalkToHistory={() => handleOpenTalkToHistory()}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((m) => !m)}
      />

      <main className="relative" id="hero">
        <HeroSection />

        <SearchBar
          onSearch={handleSearch}
          activeQuery={activeQuery}
        />

        <ScenePlaceholder
          searchQuery={activeQuery}
          scenes={generatedScenes}
          experienceId={experienceId}
          isLoading={isLoading}
          onOpenTalkToHistory={handleOpenTalkToHistory}
          source={storySource}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((m) => !m)}
          onToastSuccess={toast.success}
          onToastError={toast.error}
        />

        <section id="eras" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#242434] relative">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-3">
              <Landmark className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLang === 'EN' ? 'EXPLORE HISTORICAL EPOCHS' : t('exploreEras')}</span>
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC]">
              {t('traverseEras')}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-3">
              {t('traverseErasDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
                {t('swarajya')}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {t('swarajyaDesc')}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{t('witnessEra')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

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
                {t('firstWar')}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {t('firstWarDesc')}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{t('witnessEra')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>

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
                {t('napoleonic')}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {t('napoleonicDesc')}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:underline">
                <span>{t('witnessEra')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-10 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-cinzel text-lg font-bold text-gold-gradient">TIMEWITNESS</span>
          </div>
          <p className="text-xs text-[#64748B] text-center">
            © {new Date().getFullYear()} TimeWitness Engine. Powered by Google Gen AI SDK.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#94A3B8]">
            <Link href="/explore" className="hover:text-[#D4AF37] transition-colors">Explore Epochs</Link>
            <Link href="/how-it-works" className="hover:text-[#D4AF37] transition-colors">How It Works</Link>
            <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Mission</Link>
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Archive</Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      <TalkToHistoryModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        defaultFigure={talkDefaultFigure}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AppInner />
  );
}

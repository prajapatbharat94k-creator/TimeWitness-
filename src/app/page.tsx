'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';
import { useToast } from '@/components/ToastProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { HistoricalScene } from '@/types/story';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  ArrowUpRight,
  Landmark,
  Globe2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getSceneVisual } from '@/lib/historicalVisuals';
import { getLocalizedTopicTitle } from '@/lib/multilingual';

const INDIA_CHRONICLES = [
  {
    id: 'shivaji',
    title: 'Coronation of Shivaji Maharaj',
    epoch: '1674 AD • Maratha Swarajya',
    desc: 'The sacred crowning of Chhatrapati Shivaji Maharaj at Raigad Fort, establishing an independent sovereign realm.',
    query: 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD',
    image: getSceneVisual('Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD', 1).url,
  },
  {
    id: 'jhansi',
    title: 'Rani Lakshmibai & Defense of Jhansi',
    epoch: '1857 AD • First War of Independence',
    desc: 'The valiant Queen of Jhansi mounting a fierce defense atop the stone fortress ramparts against colonial forces.',
    query: 'Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence',
    image: getSceneVisual('Rani Lakshmibai leading defense at Jhansi Fort during 1857 war of independence', 1).url,
  },
  {
    id: 'gandhi',
    title: 'Mahatma Gandhi & The Salt March',
    epoch: '1930 AD • Satyagraha Campaign',
    desc: 'The historic 240-mile march to Dandi breaking the colonial salt tax through peaceful mass defiance.',
    query: 'Mahatma Gandhi leading the Dandi Salt March in 1930',
    image: getSceneVisual('Mahatma Gandhi leading the Dandi Salt March in 1930', 1).url,
  },
];

const WORLD_CHRONICLES = [
  {
    id: 'waterloo',
    title: 'Battle of Waterloo',
    epoch: '1815 AD • Napoleonic Wars',
    desc: 'Napoleon Bonaparte facing Wellington and Blücher across the mud-soaked fields in the decisive clash of Europe.',
    query: 'Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815',
    image: getSceneVisual('Napoleon Bonaparte commanding the French army at the Battle of Waterloo in 1815', 1).url,
  },
  {
    id: 'cleopatra',
    title: 'Cleopatra & Fall of Alexandria',
    epoch: '30 BC • Hellenistic Egypt',
    desc: 'The last sovereign pharaoh maneuvering Roman naval forces and court diplomacy amidst the fall of Ptolemaic rule.',
    query: 'Cleopatra VII in Alexandria navigating Roman diplomacy and the Battle of Actium in 30 BC',
    image: getSceneVisual('Cleopatra VII in Alexandria navigating Roman diplomacy and the Battle of Actium in 30 BC', 1).url,
  },
  {
    id: 'bastille',
    title: 'Storming of the Bastille',
    epoch: '1789 AD • French Revolution',
    desc: 'Citizens of Paris storming the medieval fortress prison, igniting the revolution that transformed the modern world.',
    query: 'Storming of the Bastille during the French Revolution in 1789',
    image: getSceneVisual('Storming of the Bastille during the French Revolution in 1789', 1).url,
  },
  {
    id: 'apollo11',
    title: 'Apollo 11 Lunar Landing',
    epoch: '1969 AD • The Space Age',
    desc: 'Neil Armstrong and Buzz Aldrin touching down on the lunar surface, marking humanity’s first steps beyond Earth.',
    query: 'Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969',
    image: getSceneVisual('Neil Armstrong and Buzz Aldrin landing Apollo 11 Lunar Module Eagle at Sea of Tranquility on July 20 1969', 1).url,
  },
];

function AppInner() {
  const toast = useToast();
  const { t, currentLang, languageInfo } = useLanguage();

  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [experienceId, setExperienceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkDefaultFigure, setTalkDefaultFigure] = useState<string | undefined>(undefined);
  const [talkHistoricalContext, setTalkHistoricalContext] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [storySource, setStorySource] = useState<string>('');

  const prevLangRef = useRef(currentLang);

  useEffect(() => {
    document.title = 'TimeWitness — Witness History As It Happened';
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

  // Seamless language switching: re-load active query in new language
  useEffect(() => {
    if (prevLangRef.current !== currentLang) {
      prevLangRef.current = currentLang;
      if (activeQuery.trim() && !isLoading) {
        handleSearch(activeQuery.trim());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

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
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query, language: languageInfo.code }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.scenes && Array.isArray(data.scenes)) {
        setGeneratedScenes(data.scenes);
        setStorySource(data.source ?? '');
        setExperienceId(data.experienceId ?? null);
        toast.success(t('successJourney'));
      }
    } catch (err: any) {
      console.error('Error fetching historical story:', err);
      toast.error(t('apiError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTalkToHistory = (figureName?: string, historicalContext?: string) => {
    setTalkDefaultFigure(figureName);
    setTalkHistoricalContext(historicalContext);
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

        {/* SECTION 1: India's Epic Chronicles */}
        <section id="india-chronicles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#242434] relative">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-2">
              <Landmark className="w-4 h-4 text-[#D4AF37]" />
              <span>PRIMARY ARCHIVE</span>
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC]">
              India&apos;s Epic Chronicles
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-2">
              Step directly into sovereign courts, fortress ramparts, and civil resistance movements across the subcontinent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {INDIA_CHRONICLES.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6 }}
                onClick={() => handleSearch(card.query)}
                className="bg-[#14141C] rounded-3xl overflow-hidden border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0E]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14141C] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[10px] font-mono text-[#D4AF37] bg-black/60 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                      {card.epoch}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                      {getLocalizedTopicTitle(card.query, languageInfo.code) || card.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] group-hover:underline">
                    <span>Witness Chronicle</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: World History Turning Points */}
        <section id="world-chronicles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#242434] relative">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-2">
              <Globe2 className="w-4 h-4 text-[#D4AF37]" />
              <span>GLOBAL EPOCHS</span>
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC]">
              World History Turning Points
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-2">
              Decisive battles, classical empires, revolutions, and interplanetary milestones reconstructed with evidence fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {WORLD_CHRONICLES.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6 }}
                onClick={() => handleSearch(card.query)}
                className="bg-[#14141C] rounded-3xl overflow-hidden border border-[#242434] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0E]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14141C] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {card.epoch}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-cinzel text-base font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2 line-clamp-2">
                      {getLocalizedTopicTitle(card.query, languageInfo.code) || card.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] group-hover:underline">
                    <span>Witness Milestone</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/50 text-sm font-semibold text-[#F8FAFC] hover:text-[#FFF3C4] transition-all group shadow-lg"
            >
              <span>Explore Complete Historical Archive</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </Link>
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
            © {new Date().getFullYear()} TimeWitness Engine. AI Reconstructed Historical Scenes Grounded in Evidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#94A3B8]">
            <Link href="/explore" className="hover:text-[#D4AF37] transition-colors">Explore Archive</Link>
            <Link href="/how-it-works" className="hover:text-[#D4AF37] transition-colors">How It Works</Link>
            <Link href="/about" className="hover:text-[#D4AF37] transition-colors">Mission</Link>
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Archive</Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      <TalkToHistoryModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        defaultFigure={talkDefaultFigure}
        historicalContext={talkHistoricalContext}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AppInner />
  );
}

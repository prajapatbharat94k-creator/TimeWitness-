'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import { useToast } from '@/components/ToastProvider';
import { useApp } from '@/context/AppContext';
import { HistoricalScene, HistoricalKnowledgeContext } from '@/types/story';
import { 
  Hourglass, 
  ArrowUpRight,
  Landmark,
  Crown,
  Swords,
  ScrollText,
  Globe,
  Sparkles,
  Compass,
  Flame,
  Rocket,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const toast = useToast();
  const { 
    currentLang, 
    isMuted, 
    toggleMute, 
    openTalkModal, 
    addRecentSearch, 
    addToHistoryLog 
  } = useApp();

  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storySource, setStorySource] = useState<string>('');
  const [wikiContext, setWikiContext] = useState<HistoricalKnowledgeContext | null>(null);

  // Deep-link: auto-load from ?witness= or ?topic= query param on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const witnessParam = params.get('witness') || params.get('topic');
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

    addRecentSearch(query);
    addToHistoryLog(query);

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

  return (
    <main className="relative" id="hero">
      
      {/* Hero Section */}
      <HeroSection currentLang={currentLang} />

      {/* Central Search Bar */}
      <SearchBar
        currentLang={currentLang}
        onSearch={handleSearch}
        activeQuery={activeQuery}
      />

      {/* 5-Scene Interactive Historical Viewport */}
      <ScenePlaceholder
        currentLang={currentLang}
        searchQuery={activeQuery}
        scenes={generatedScenes}
        isLoading={isLoading}
        onOpenTalkToHistory={(fig) => openTalkModal(fig || activeQuery)}
        source={storySource}
        wikiContext={wikiContext}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onToastSuccess={toast.success}
        onToastError={toast.error}
      />

      {/* ─── DUAL SPOTLIGHT: INDIAN & WORLD HISTORY ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#242434] relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Global & Indian Civilizations' : 'वैश्विक एवं भारतीय सभ्यताएं'}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'Two Epic Tapestries of Human History' : 'मानव इतिहास की दो महान धाराएं'}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] mt-3">
            {currentLang === 'EN'
              ? 'From the sacred rivers of the Indus Valley to the marble forums of Rome, witness human courage across continents.'
              : 'सिंधु घाटी की पावन धाराओं से लेकर रोम के भव्य मंचों तक, महाद्वीपों के पार मानव शौर्य के साक्षी बनें।'}
          </p>
        </div>

        {/* 2 Column Dual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Column 1: Indian History */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-[#D4AF37]/30 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#D4AF37]/15 text-[#FFF3C4] border border-[#D4AF37]/40">
                  5,000+ Years • Indian Continuum
                </span>
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-3">
                {currentLang === 'EN' ? 'Indian History & Dynasties' : 'भारतीय इतिहास एवं राजवंश'}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                {currentLang === 'EN'
                  ? 'Explore the planned cities of Harappa, Chanakya’s statecraft, Ashoka’s Dhamma, Shivaji Maharaj’s Swarajya, and the unyielding independence movement.'
                  : 'हड़प्पा की नगरीय योजना, चाणक्य की कूटनीति, अशोक का धम्म, शिवाजी महाराज का स्वराज्य और स्वाधीनता संग्राम के साक्षी बनें।'}
              </p>

              {/* Sample cards */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSearch('Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#FFF3C4] block">Chhatrapati Shivaji Maharaj</span>
                    <span className="text-[10px] text-[#64748B]">1674 AD · Raigad Coronation & Swarajya</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => handleSearch('Rani Lakshmibai in the 1857 First War of Independence')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#FFF3C4] block">Rani Lakshmibai of Jhansi</span>
                    <span className="text-[10px] text-[#64748B]">1857 AD · Defiance on Jhansi Ramparts</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => handleSearch('Edicts of Emperor Ashoka and the Kalinga War')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#FFF3C4] block">Ashoka the Great</span>
                    <span className="text-[10px] text-[#64748B]">261 BCE · Kalinga & Edicts of Dhamma</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            <Link
              href="/explore?tab=india"
              className="inline-flex items-center justify-between text-xs font-bold text-[#D4AF37] hover:underline pt-4 border-t border-[#242434]"
            >
              <span>{currentLang === 'EN' ? 'Explore all 10 Indian Eras in Catalog' : 'कैटलॉग में सभी 10 भारतीय युग देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Column 2: World History */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-[#38BDF8]/30 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#38BDF8]/15 text-[#E0F2FE] border border-[#38BDF8]/40">
                  Global Civilization • 16 Epochs
                </span>
                <Globe className="w-5 h-5 text-[#38BDF8]" />
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-3">
                {currentLang === 'EN' ? 'World History & Turning Points' : 'विश्व इतिहास एवं निर्णायक मोड़'}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                {currentLang === 'EN'
                  ? 'Traverse the pharaohs of Egypt, Caesar’s Roman legions, Leonardo’s Renaissance masterpieces, the French Revolution, and Apollo 11.'
                  : 'मिस्र के फिरौन, सीज़र की रोमन सेनाएं, दा विंची की कला, फ्रांसीसी क्रांति और अपोलो 11 के साक्षी बनें।'}
              </p>

              {/* Sample cards */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSearch('Napoleon Bonaparte at the Battle of Waterloo')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#38BDF8]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#E0F2FE] block">Napoleon Bonaparte</span>
                    <span className="text-[10px] text-[#64748B]">1815 AD · The Mud of Waterloo</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#38BDF8] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => handleSearch('Cleopatra VII and the Fall of Ptolemaic Egypt')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#38BDF8]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#E0F2FE] block">Cleopatra VII of Egypt</span>
                    <span className="text-[10px] text-[#64748B]">30 BCE · Last Pharaoh of Alexandria</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#38BDF8] opacity-60 group-hover:opacity-100" />
                </button>

                <button
                  onClick={() => handleSearch('Apollo 11 Moon Landing and Neil Armstrong')}
                  className="w-full text-left p-3 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#38BDF8]/60 text-xs flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="font-bold text-[#E0F2FE] block">Neil Armstrong & Apollo 11</span>
                    <span className="text-[10px] text-[#64748B]">1969 CE · One Giant Leap for Mankind</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#38BDF8] opacity-60 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            <Link
              href="/explore?tab=world"
              className="inline-flex items-center justify-between text-xs font-bold text-[#38BDF8] hover:underline pt-4 border-t border-[#242434]"
            >
              <span>{currentLang === 'EN' ? 'Explore all 16 World Eras in Catalog' : 'कैटलॉग में सभी 16 विश्व युग देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Global Catalog Navigation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1E1B10] via-[#14141C] to-[#0D0D11] border border-[#D4AF37]/40 text-center space-y-4 shadow-2xl">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block">
            Comprehensive Archival Taxonomy
          </span>
          <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FFF3C4]">
            {currentLang === 'EN' ? 'Step Into Any Civilizational Era' : 'किसी भी सभ्यता के युग में प्रवेश करें'}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'Filter through Ancient, Medieval, Early Modern, and Contemporary eras across Asia, Europe, the Americas, Africa, and the Middle East.'
              : 'एशिया, यूरोप, अमेरिका, अफ्रीका और मध्य पूर्व के प्राचीन से समकालीन युगों का अन्वेषण करें।'}
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{currentLang === 'EN' ? 'Open Global Discovery Portal' : 'अन्वेषण पोर्टल खोलें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

    </main>
  );
}

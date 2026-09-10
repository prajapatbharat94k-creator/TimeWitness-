'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ScrollText, 
  Search, 
  Sparkles, 
  RefreshCw, 
  Compass, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import { HistoricalScene, HistoricalKnowledgeContext } from '@/types/story';
import { useToast } from '@/components/ToastProvider';
import { useApp } from '@/context/AppContext';

const WITNESS_SUGGESTIONS = [
  'Coronation of Chhatrapati Shivaji Maharaj',
  'Rani Lakshmibai in the 1857 First War of Independence',
  'Napoleon Bonaparte at the Battle of Waterloo',
  'Cleopatra VII and the Fall of Ptolemaic Egypt',
  'Edicts of Emperor Ashoka and the Kalinga War',
  'Julius Caesar crossing the Rubicon in 49 BCE',
  'Mahatma Gandhi and the Salt March to Dandi 1930',
  'Apollo 11 Moon Landing and Neil Armstrong'
];

function WitnessContent() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const { currentLang, isMuted, toggleMute, openTalkModal, addRecentSearch, addToHistoryLog } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [generatedScenes, setGeneratedScenes] = useState<HistoricalScene[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storySource, setStorySource] = useState<string>('');
  const [wikiContext, setWikiContext] = useState<HistoricalKnowledgeContext | null>(null);

  // Read URL query param on mount or change
  useEffect(() => {
    const topicParam = searchParams.get('topic') || searchParams.get('witness') || searchParams.get('q');
    if (topicParam && topicParam.trim()) {
      const decoded = decodeURIComponent(topicParam).trim();
      setInputQuery(decoded);
      triggerStoryGeneration(decoded);
    } else if (!activeQuery && generatedScenes.length === 0) {
      // Default to Coronation of Shivaji or first suggestion for immediate engagement
      const defaultTopic = 'Coronation of Chhatrapati Shivaji Maharaj at Raigad Fort in 1674 AD';
      setInputQuery('Coronation of Chhatrapati Shivaji Maharaj');
      triggerStoryGeneration(defaultTopic);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const triggerStoryGeneration = async (topic: string) => {
    if (!topic.trim()) return;

    setActiveQuery(topic);
    setIsLoading(true);
    setGeneratedScenes([]);
    setStorySource('');
    setWikiContext(null);

    // Track in state
    addRecentSearch(topic);
    addToHistoryLog(topic);

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language: currentLang }),
      });

      if (!res.ok) {
        throw new Error(`Archival server responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.scenes && Array.isArray(data.scenes)) {
        setGeneratedScenes(data.scenes);
        setStorySource(data.source ?? '');
        setWikiContext(data.wikiContext ?? null);

        if (data.source === 'demo') {
          toast.info(
            currentLang === 'EN'
              ? '📜 Curated primary demo chronicle loaded.'
              : '📜 क्यूरेटेड प्राथमिक नमूना आख्यान लोड हुआ।'
          );
        } else {
          toast.success(
            currentLang === 'EN'
              ? '✨ 5-scene historical journey reconstructed successfully.'
              : '✨ 5-दृश्य ऐतिहासिक यात्रा सफलतापूर्वक तैयार की गई।'
          );
        }
      }
    } catch (err: any) {
      console.error('Error generating chronicle:', err);
      toast.error(
        currentLang === 'EN'
          ? `❌ Reconstitution failed: ${err.message || 'Unknown error'}`
          : '❌ आख्यान निर्माण विफल रहा। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) {
      toast.error(currentLang === 'EN' ? 'Please enter a historical topic.' : 'कृपया एक ऐतिहासिक विषय दर्ज करें।');
      return;
    }
    triggerStoryGeneration(inputQuery.trim());
  };

  return (
    <div className="min-h-screen pb-24">
      
      {/* Witness Header & Search Bar */}
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
            <ScrollText className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Historical Witnessing Chamber' : 'ऐतिहासिक साक्षी कक्ष'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'WITNESS HUMAN HISTORY' : 'मानव इतिहास के साक्षी बनें'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            {currentLang === 'EN'
              ? 'Step directly into verified historical moments across Indian and World civilizations with 5-chapter cinematic narratives and period-accurate voices.'
              : 'भारतीय और विश्व इतिहास के निर्णायक क्षणों में सीधे प्रवेश करें—5 अध्यायों की सिनेमैटिक कथाओं और मूल स्रोतों के साथ।'}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={currentLang === 'EN' ? 'Search any person, battle, event, or treaty...' : 'कोई भी व्यक्ति, युद्ध, घटना या संधि खोजें...'}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#14141C] border border-[#242434] focus:border-[#D4AF37] text-[#F8FAFC] placeholder-[#64748B] text-sm outline-none transition-all shadow-xl"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 shrink-0"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{currentLang === 'EN' ? 'Witness' : 'देखें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Preset Exploration Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            <span className="text-[11px] font-mono text-[#64748B] uppercase mr-1">
              {currentLang === 'EN' ? 'Historical Presets:' : 'सुझाव:'}
            </span>
            {WITNESS_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInputQuery(suggestion);
                  triggerStoryGeneration(suggestion);
                }}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeQuery.toLowerCase().includes(suggestion.slice(0, 15).toLowerCase())
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF3C4]'
                    : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/40'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main 5-Scene Immersive Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
      </main>

    </div>
  );
}

export default function WitnessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-[#D4AF37]">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    }>
      <WitnessContent />
    </Suspense>
  );
}

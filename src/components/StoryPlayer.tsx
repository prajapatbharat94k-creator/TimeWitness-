'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HistoricalScene } from '@/types/story';
import { Film, RefreshCw, MessageCircle, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface StoryPlayerProps {
  currentLang: 'EN' | 'HI';
  searchQuery: string;
  scenes: HistoricalScene[]; // Use proper type for scenes
  isLoading: boolean;
  onOpenTalkToHistory: (figure?: string) => void;
}

export default function StoryPlayer({ 
  currentLang, 
  searchQuery, 
  scenes = [], 
  isLoading, 
  onOpenTalkToHistory 
}: StoryPlayerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    setActiveIdx(0);
    setPlayingAudio(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [scenes]);

  const currentScene = scenes[activeIdx] || (scenes.length > 0 ? scenes[0] : null);

  // Handle SpeechSynthesis audio narration
  useEffect(() => {
    if (!playingAudio || !currentScene) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentScene.narration);
      utterance.lang = currentLang === 'HI' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingAudio(false);
      utterance.onerror = () => setPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [playingAudio, currentScene, currentLang]);

  const handlePrev = () => {
    setPlayingAudio(false);
    setActiveIdx(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPlayingAudio(false);
    setActiveIdx(prev => Math.min(scenes.length - 1, prev + 1));
  };

  return (
    <section id="scene-viewer" className="w-full max-w-6xl mx-auto px-4 pb-20">
      {/* Placeholder when no scenes */}
      {!isLoading && scenes.length === 0 && (
        <motion.div className="py-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Film className="w-12 h-12 mx-auto text-[#D4AF37]" />
          <h3 className="mt-4 text-xl font-cinzel text-[#F8FAFC]">
            {currentLang === 'EN' ? 'Awaiting Historical Coordinates' : 'ऐतिहासिक निर्देशांक प्रतीक्षारत'}
          </h3>
        </motion.div>
      )}

      {/* Loading */}
      {isLoading && (
        <motion.div className="py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <RefreshCw className="w-12 h-12 mx-auto text-[#D4AF37] animate-spin" />
          <h3 className="mt-4 text-lg text-[#FFF3C4]">
            {currentLang === 'EN' ? 'Generating story...' : 'कहानी बन रही है...'}
          </h3>
        </motion.div>
      )}

      {/* Story view */}
      {!isLoading && scenes.length > 0 && currentScene && (
        <div className="bg-[#14141C] p-6 rounded-2xl border border-[#D4AF37]/30 text-[#F8FAFC] shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase">
              {currentScene.era || `Scene ${currentScene.sceneNumber || activeIdx + 1} of ${scenes.length}`}
            </span>
            <span className="text-xs text-[#94A3B8]">
              {activeIdx + 1} / {scenes.length}
            </span>
          </div>

          <h4 className="font-cinzel text-2xl font-bold mb-3 text-[#FFF3C4]">{currentScene.title}</h4>
          <p className="mb-6 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">{currentScene.narration}</p>

          <div className="flex items-center justify-between pt-4 border-t border-[#242434]">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPlayingAudio(!playingAudio)} 
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                  playingAudio 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                    : 'bg-[#1B1B26] text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37]'
                }`}
                title={playingAudio ? 'Pause Narration' : 'Play Narration'}
              >
                {playingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{playingAudio ? (currentLang === 'EN' ? 'Pause' : 'विराम') : (currentLang === 'EN' ? 'Listen' : 'सुनें')}</span>
              </button>

              <button 
                onClick={() => onOpenTalkToHistory(searchQuery)} 
                className="p-2.5 bg-[#1B1B26] text-[#F8FAFC] hover:text-[#D4AF37] border border-[#242434] hover:border-[#D4AF37]/50 rounded-xl transition-all flex items-center gap-2 text-xs"
                title="Talk to History"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">{currentLang === 'EN' ? 'Talk to Figure' : 'संवाद करें'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev} 
                disabled={activeIdx === 0} 
                className="p-2 rounded-xl bg-[#1B1B26] border border-[#242434] text-[#94A3B8] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext} 
                disabled={activeIdx === scenes.length - 1} 
                className="p-2 rounded-xl bg-[#1B1B26] border border-[#242434] text-[#94A3B8] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

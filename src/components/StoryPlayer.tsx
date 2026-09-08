'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HistoricalScene } from '@/types/story';
import { Film, Sparkles, RefreshCw, Clock, MessageCircle, ChevronLeft, ChevronRight, Play, Pause, Volume2, Radio, Wand2 } from 'lucide-react';

interface StoryPlayerProps {
  currentLang: 'EN' | 'HI';
  searchQuery: string;
  scenes: HistoricalScene[]; // Use proper type for scenes
  isLoading: boolean;
  onOpenTalkToHistory: (figure?: string) => void;
}

export default function StoryPlayer({ currentLang, searchQuery, scenes, isLoading, onOpenTalkToHistory }: StoryPlayerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    setActiveIdx(0);
  }, [scenes]);

  const currentScene = scenes[activeIdx];

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
        <div className="bg-[#14141C] p-6 rounded-xl text-[#F8FAFC]">
          <h4 className="font-cinzel text-2xl mb-2">{currentScene.title}</h4>
          <p className="mb-4">{currentScene.narration}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlayingAudio(!playingAudio)} className="p-2 bg-[#D4AF37] rounded">
              {playingAudio ? <Pause /> : <Play />}
            </button>
            <button onClick={() => onOpenTalkToHistory(searchQuery)} className="p-2 bg-[#D4AF37] rounded">
              <MessageCircle />
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={() => setActiveIdx(prev => Math.max(0, prev - 1))} disabled={activeIdx === 0} className="px-3 py-1 bg-[#242434] rounded disabled:opacity-40">
              <ChevronLeft />
            </button>
            <button onClick={() => setActiveIdx(prev => Math.min(scenes.length - 1, prev + 1))} disabled={activeIdx === scenes.length - 1} className="px-3 py-1 bg-[#242434] rounded disabled:opacity-40">
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  RefreshCw, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Wand2, 
  Beaker 
} from 'lucide-react';
import { HistoricalScene } from '@/types/story';
import AmbientAudioPlayer from './AmbientAudioPlayer';
import ShareExportPanel from './ShareExportPanel';

interface ScenePlaceholderProps {
  currentLang: 'EN' | 'HI';
  searchQuery: string;
  scenes: HistoricalScene[];
  isLoading: boolean;
  onOpenTalkToHistory: (figure?: string) => void;
  /** Data source — 'gemini-api' | 'demo' | 'fallback' */
  source?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onToastSuccess: (msg: string) => void;
  onToastError: (msg: string) => void;
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
];

export default function ScenePlaceholder({ 
  currentLang, 
  searchQuery, 
  scenes, 
  isLoading, 
  onOpenTalkToHistory,
  source,
  isMuted,
  onToggleMute,
  onToastSuccess,
  onToastError,
}: ScenePlaceholderProps) {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setActiveSceneIdx(0);
    // Auto-pause audio when a new story loads
    setIsPlayingAudio(false);
  }, [scenes]);

  const currentScene = scenes[activeSceneIdx] || null;
  const isOnLastScene = activeSceneIdx === scenes.length - 1 && scenes.length === 5;
  const isDemoMode = source === 'demo';
  const isFallback = source === 'fallback';

  // Real narration speech playback using Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio && currentScene) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentScene.narration);
        utterance.lang = currentLang === 'HI' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.92;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAudio, currentScene, currentLang]);

  return (
    <section id="scene-viewer" className="w-full max-w-6xl mx-auto px-4 pb-20 relative z-10">
      
      {/* Ambient Audio (invisible, purely functional) */}
      {currentScene && (
        <AmbientAudioPlayer
          ambientTag={currentScene.ambientTag}
          isMuted={isMuted}
          isPlaying={isPlayingAudio}
        />
      )}

      {/* Outer Golden Border Frame */}
      <div className="relative rounded-3xl p-px bg-gradient-to-b from-[#D4AF37]/40 via-[#242434] to-[#14141C] shadow-2xl">
        <div className="rounded-[23px] bg-[#0D0D11] p-4 sm:p-6 md:p-8 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Grid in background */}
          <div className="absolute inset-0 bg-[radial-gradient(#242434_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

          {/* Header Bar inside Viewport */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#242434] gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-[#64748B] tracking-wider uppercase truncate max-w-[180px] sm:max-w-none">
                TIMEWITNESS // GEMINI AI 5-SCENE RECONSTRUCTION
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Demo Mode Badge */}
              {isDemoMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-[11px] font-bold text-amber-400">
                  <Beaker className="w-3 h-3" />
                  {currentLang === 'EN' ? 'Demo Mode · Sample Story' : 'डेमो मोड'}
                </span>
              )}
              {/* Fallback Badge */}
              {isFallback && !isDemoMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/40 text-[11px] font-medium text-slate-400">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {currentLang === 'EN' ? 'Offline · Fallback Story' : 'ऑफ़लाइन मोड'}
                </span>
              )}
              {scenes.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161622] border border-[#D4AF37]/40 text-[11px] font-medium text-[#FFF3C4] shadow-gold-glow">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">5-Scene Historical Journey Active</span>
                  <span className="sm:hidden">5-Scene Active</span>
                </span>
              )}
            </div>
          </div>

          {/* MAIN CONTENT CANVAS */}
          <div className="my-6 relative z-10 flex-1 flex flex-col justify-center">

            {/* STATE 1: IDLE / EMPTY PLACEHOLDER STATE */}
            {!isLoading && scenes.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center max-w-2xl mx-auto"
              >
                <div className="relative w-20 h-20 rounded-2xl bg-[#14141C] border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-gold-glow">
                  <Film className="w-10 h-10 text-[#D4AF37] animate-pulse-slow" />
                  <Sparkles className="w-4 h-4 text-[#FFF3C4] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-3">
                  {currentLang === 'EN' ? 'Awaiting Historical Coordinates' : 'ऐतिहासिक निर्देशांक प्रतीक्षारत'}
                </h3>
                
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8">
                  {currentLang === 'EN' 
                    ? 'Enter any topic or select a sample pill above to generate a 5-scene AI historical narrative powered by Gemini.'
                    : 'ऊपर दिए गए टैग पर क्लिक करें या जेमिनी द्वारा 5-दृश्य कथा बनाने के लिए कोई भी विषय खोजें।'}
                </p>

                {/* Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
                  <div className="glass-panel p-3.5 rounded-xl text-left border border-[#242434]">
                    <Eye className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <h4 className="text-xs font-bold text-[#F8FAFC]">5 Sequential Scenes</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Origin to Legacy arc</p>
                  </div>
                  <div className="glass-panel p-3.5 rounded-xl text-left border border-[#242434]">
                    <Volume2 className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <h4 className="text-xs font-bold text-[#F8FAFC]">Ambient Audio Tags</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Web Audio soundscapes</p>
                  </div>
                  <div className="glass-panel p-3.5 rounded-xl text-left border border-[#242434]">
                    <Wand2 className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <h4 className="text-xs font-bold text-[#F8FAFC]">Detailed Art Prompts</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Historical visual renders</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE 2: LOADING CINEMATIC GENERATION ANIMATION */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 px-4 text-center flex flex-col items-center justify-center max-w-xl mx-auto"
              >
                <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/30 border-l-transparent animate-spin" />
                  <RefreshCw className="w-6 h-6 text-[#D4AF37] animate-pulse" />
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF3C4] mb-2">
                  {currentLang === 'EN' ? 'Gemini AI Generating 5-Scene Journey...' : 'जेमिनी AI 5-दृश्य यात्रा तैयार कर रहा है...'}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#D4AF37] font-mono mb-6 animate-pulse">
                  Synthesizing Origin, Rise, Climax, Victory &amp; Legacy...
                </p>

                <div className="w-full h-2 rounded-full bg-[#1B1B26] border border-[#242434] overflow-hidden mb-3">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#B89220] via-[#D4AF37] to-[#FFF3C4] animate-shimmer"
                    style={{ width: '85%' }}
                  />
                </div>
                <span className="text-xs text-[#64748B] font-mono">Gemini 2.5 Flash Engine Active</span>
              </motion.div>
            )}

            {/* STATE 3: 5-SCENE INTERACTIVE JOURNEY VIEW */}
            {!isLoading && scenes.length > 0 && currentScene && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                
                {/* 5-Scene Navigation Stepper Tabs — horizontal scroll on mobile */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-[#242434] scrollbar-none snap-x snap-mandatory">
                  {scenes.map((sc, idx) => {
                    const isActive = idx === activeSceneIdx;
                    return (
                      <button
                        key={sc.sceneNumber || idx}
                        onClick={() => {
                          setActiveSceneIdx(idx);
                          setIsPlayingAudio(false);
                        }}
                        className={`flex-none sm:flex-1 min-w-[100px] sm:min-w-[110px] snap-start p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#14141C] border-[#D4AF37] text-[#FFF3C4] shadow-gold-glow'
                            : 'bg-[#14141C]/60 border-[#242434] text-[#94A3B8] hover:bg-[#1B1B26] hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#D4AF37] mb-0.5">
                          <span>Scene {sc.sceneNumber}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />}
                        </div>
                        <h5 className="text-xs font-bold truncate text-[#F8FAFC]">{sc.title}</h5>
                      </button>
                    );
                  })}
                </div>

                {/* Scene Content Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSceneIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    
                    {/* Left Column: Visual Artwork Frame */}
                    <div className="lg:col-span-6 relative group rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-video bg-[#14141C]">
                      <Image
                        src={DEFAULT_IMAGES[activeSceneIdx % DEFAULT_IMAGES.length]}
                        alt={currentScene.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={activeSceneIdx === 0}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-transparent to-black/30" />

                      {/* Overlaid Era Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#0D0D11]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] font-semibold text-[#FFF3C4] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="truncate max-w-[160px]">{currentScene.era}</span>
                        </span>
                      </div>

                      {/* Audio Ambient Tag Bar */}
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0D0D11]/90 backdrop-blur-xl border border-[#D4AF37]/30 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Play / Pause ambient audio */}
                          <button
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D0D11] flex items-center justify-center hover:scale-105 transition-transform shadow-gold-glow shrink-0"
                            aria-label={isPlayingAudio ? 'Pause ambient audio' : 'Play ambient audio'}
                          >
                            {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                          </button>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-[#F8FAFC] truncate">Ambient: #{currentScene.ambientTag}</span>
                            <span className="text-[10px] text-[#D4AF37] flex items-center gap-1">
                              <Radio className="w-3 h-3 animate-pulse" />
                              <span>Spatial Soundscape</span>
                            </span>
                          </div>
                        </div>
                        {/* Mute toggle inside player */}
                        <button
                          onClick={onToggleMute}
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isMuted
                              ? 'border-[#242434] text-[#4A5568] hover:text-[#94A3B8]'
                              : 'border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37]'
                          }`}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Narration & Scene Details */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-extrabold text-[#D4AF37]">
                            SCENE {currentScene.sceneNumber} OF 5
                          </span>
                          <span className="text-xs text-[#94A3B8] font-mono">{currentScene.era}</span>
                        </div>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC] leading-snug">
                          {currentScene.title}
                        </h3>
                      </div>

                      {/* Dramatic Narration Text */}
                      <div className="glass-panel p-4 rounded-xl border border-[#D4AF37]/20 relative">
                        <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed font-sans">
                          &ldquo;{currentScene.narration}&rdquo;
                        </p>
                      </div>

                      {/* Image Art Prompt Box */}
                      <div className="bg-[#14141C] p-3 rounded-xl border border-[#242434]">
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                          Visual Concept Art Prompt:
                        </span>
                        <p className="text-[11px] text-[#94A3B8] italic line-clamp-2">
                          {currentScene.imagePrompt}
                        </p>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between pt-2 gap-2">
                        <button
                          onClick={() => {
                            setActiveSceneIdx(prev => Math.max(0, prev - 1));
                            setIsPlayingAudio(false);
                          }}
                          disabled={activeSceneIdx === 0}
                          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                            activeSceneIdx === 0
                              ? 'opacity-40 border-[#242434] text-[#64748B] cursor-not-allowed'
                              : 'border-[#242434] hover:border-[#D4AF37] text-[#94A3B8] hover:text-[#F8FAFC] bg-[#14141C]'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">Previous Scene</span>
                          <span className="sm:hidden">Prev</span>
                        </button>

                        <button
                          onClick={() => onOpenTalkToHistory(searchQuery)}
                          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0D0D11] font-bold text-xs hover:bg-[#FFF3C4] transition-all shadow-gold-glow"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Talk to Witness</span>
                          <span className="sm:hidden">Talk</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveSceneIdx(prev => Math.min(scenes.length - 1, prev + 1));
                            setIsPlayingAudio(false);
                          }}
                          disabled={activeSceneIdx === scenes.length - 1}
                          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                            activeSceneIdx === scenes.length - 1
                              ? 'opacity-40 border-[#242434] text-[#64748B] cursor-not-allowed'
                              : 'border-[#242434] hover:border-[#D4AF37] text-[#94A3B8] hover:text-[#F8FAFC] bg-[#14141C]'
                          }`}
                        >
                          <span className="hidden sm:inline">Next Scene</span>
                          <span className="sm:hidden">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Share & Export Panel — visible on last scene */}
                {isOnLastScene && (
                  <ShareExportPanel
                    scenes={scenes}
                    searchQuery={searchQuery}
                    currentLang={currentLang}
                    onToastSuccess={onToastSuccess}
                    onToastError={onToastError}
                  />
                )}

              </motion.div>
            )}

          </div>

          {/* Footer Bar inside Viewport */}
          <div className="pt-4 border-t border-[#242434] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B] relative z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isDemoMode ? 'bg-amber-400' : isFallback ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                <span>
                  {isDemoMode
                    ? 'Demo Mode · Curated Sample Story'
                    : isFallback
                    ? 'Fallback Mode · Offline Story'
                    : 'Gemini API Strict JSON Pipeline Active'}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>TimeWitness Engine v2.0</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

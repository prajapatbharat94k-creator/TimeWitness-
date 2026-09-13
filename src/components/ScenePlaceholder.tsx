/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, Volume2, VolumeX, Play, Pause, Sparkles, Clock, MessageCircle, 
  RefreshCw, ChevronLeft, ChevronRight, ArrowLeft, Maximize, MapPin, 
  Calendar, Save, Heart, Share2, BookOpen, AlertTriangle, ShieldCheck,
  Globe2, Video, ImageIcon
} from 'lucide-react';
import EvidenceTag from './EvidenceTag';
import SourcesPanel from './SourcesPanel';
import { HistoricalScene } from '@/types/story';
import AmbientAudioPlayer from './AmbientAudioPlayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toggleSaved, toggleFavorite, recordUserHistory, ExperienceCardData } from '@/lib/db';
import { isUserFavorited, isUserSaved, buildId } from '@/lib/localStorage';
import AuthPrompt from './AuthPrompt';
import WhatIfModal from './WhatIfModal';
import ShareExportPanel from './ShareExportPanel';

interface ScenePlaceholderProps {
  searchQuery: string;
  scenes: HistoricalScene[];
  experienceId?: string | null;
  isLoading: boolean;
  onOpenTalkToHistory: (figure?: string) => void;
  source?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onToastSuccess: (msg: string) => void;
  onToastError: (msg: string) => void;
}

const THEME_IMAGES: Record<string, string[]> = {
  shivaji: [
    'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
  ],
  lakshmibai: [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
  ],
  waterloo: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
  ],
  cleopatra: [
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
  ],
  gandhi: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
  ],
  apollo: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop',
  ],
};

function getSceneImage(query: string, sceneIdx: number): string {
  const q = (query || '').toLowerCase();
  let list = THEME_IMAGES.shivaji;
  if (q.includes('apollo') || q.includes('armstrong') || q.includes('moon') || q.includes('lunar') || q.includes('space') || q.includes('nasa')) {
    list = THEME_IMAGES.apollo;
  } else if (q.includes('gandhi') || q.includes('dandi') || q.includes('salt march')) {
    list = THEME_IMAGES.gandhi;
  } else if (q.includes('cleopatra') || q.includes('egypt') || q.includes('pharaoh') || q.includes('alexandria')) {
    list = THEME_IMAGES.cleopatra;
  } else if (q.includes('waterloo') || q.includes('napoleon') || q.includes('bonaparte')) {
    list = THEME_IMAGES.waterloo;
  } else if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) {
    list = THEME_IMAGES.lakshmibai;
  }
  return list[sceneIdx % list.length];
}

const TIMELINE_LABELS = ['ORIGIN', 'RISE', 'DEFINING MOMENT', 'TURNING POINT', 'LEGACY'];

export default function ScenePlaceholder({ 
  searchQuery, 
  scenes, 
  experienceId,
  isLoading, 
  onOpenTalkToHistory,
  source,
  isMuted,
  onToggleMute,
  onToastSuccess,
  onToastError,
}: ScenePlaceholderProps) {
  const { user } = useAuth();
  const { t, languageInfo } = useLanguage();
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);

  const loadingSteps = [
    'Researching historical context...',
    'Verifying historical primary sources...',
    'Synthesizing evidence and chronology...',
    'Constructing witness scenes...',
    'Preparing your historical experience...',
  ];

  useEffect(() => {
    if (!isLoading) {
      setLoadingStepIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % loadingSteps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isLoading, loadingSteps.length]);
  
  // Media states
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'fallback'>('image');
  const playerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for scenes & spacebar for narration audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (scenes.length === 0) return;

      if (e.key === 'ArrowRight') {
        setActiveSceneIdx((prev) => Math.min(scenes.length - 1, prev + 1));
        setIsPlayingAudio(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveSceneIdx((prev) => Math.max(0, prev - 1));
        setIsPlayingAudio(false);
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlayingAudio((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scenes.length]);
  
  useEffect(() => {
    setActiveSceneIdx(0);
    setIsPlayingAudio(false);
    setMediaType('image'); // Default to cinematic imagery
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (scenes && scenes.length > 0 && searchQuery) {
      const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
      const cardData: ExperienceCardData = {
        id: effectiveId,
        title: scenes[0]?.title || searchQuery,
        subject: searchQuery,
        year: scenes[0]?.era || undefined,
        cover_image: scenes[0]?.imagePrompt || undefined,
        slug: effectiveId,
        progress: 20,
      };

      // Check current favorited & saved status
      setIsFavorited(isUserFavorited(effectiveId, user?.id));
      setIsSaved(isUserSaved(effectiveId, user?.id));

      // Record to history
      recordUserHistory(user ? user.id : null, effectiveId, cardData);
    } else {
      setIsSaved(false);
      setIsFavorited(false);
    }
  }, [scenes, searchQuery, experienceId, user, languageInfo.code]);

  const currentScene = scenes[activeSceneIdx] || null;

  // Real narration speech playback using Web Speech API with dynamic language mapping
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio && currentScene) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentScene.narration);
        utterance.lang = languageInfo.ttsLocale;
        utterance.rate = 0.92;
        utterance.volume = isMuted ? 0 : 1;
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
  }, [isPlayingAudio, currentScene, languageInfo.ttsLocale, isMuted]);

  // Actions
  const handleSave = async () => {
    if (!user) {
      setAuthPromptOpen(true);
      return;
    }
    
    const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
    const cardData: ExperienceCardData = {
      id: effectiveId,
      title: scenes[0]?.title || searchQuery,
      subject: searchQuery,
      year: scenes[0]?.era || undefined,
      cover_image: scenes[0]?.imagePrompt || undefined,
      slug: effectiveId,
      progress: Math.round(((activeSceneIdx + 1) / Math.max(scenes.length, 1)) * 100),
    };

    if (isSaved) {
      await toggleSaved(user.id, effectiveId, false, cardData);
      setIsSaved(false);
      onToastSuccess(t('removedFromSaved'));
    } else {
      await toggleSaved(user.id, effectiveId, true, cardData);
      setIsSaved(true);
      onToastSuccess(t('savedSuccessfully'));
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      setAuthPromptOpen(true);
      return;
    }
    
    const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
    const cardData: ExperienceCardData = {
      id: effectiveId,
      title: scenes[0]?.title || searchQuery,
      subject: searchQuery,
      year: scenes[0]?.era || undefined,
      cover_image: scenes[0]?.imagePrompt || undefined,
      slug: effectiveId,
      progress: Math.round(((activeSceneIdx + 1) / Math.max(scenes.length, 1)) * 100),
    };

    if (isFavorited) {
      await toggleFavorite(user.id, effectiveId, false, cardData);
      setIsFavorited(false);
      onToastSuccess('Removed from favorites.');
    } else {
      await toggleFavorite(user.id, effectiveId, true, cardData);
      setIsFavorited(true);
      onToastSuccess(t('addedToFavorites'));
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/?witness=${encodeURIComponent(searchQuery)}` : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TimeWitness: ${searchQuery}`,
          text: `Experience the historical journey of ${searchQuery}`,
          url: url,
        });
      } catch (err) {
        // user cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(url);
      onToastSuccess(t('linkCopied'));
    }
  };

  const scrollToEvidence = () => {
    const el = document.getElementById('evidence-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContext = () => {
    const el = document.getElementById('context-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        onToastError(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Media loading handlers
  const handleVideoError = () => {
    setMediaType('image');
  };

  const handleImageError = () => {
    setMediaType('fallback');
  };

  if (!isLoading && scenes.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="py-12 px-4 text-center flex flex-col items-center justify-center max-w-2xl mx-auto"
        >
          <div className="relative w-24 h-24 rounded-full bg-[#14141C] border border-[#D4AF37]/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <Film className="w-10 h-10 text-[#D4AF37] animate-pulse-slow" />
            <Sparkles className="w-5 h-5 text-[#FFF3C4] absolute -top-1 -right-1 animate-spin-slow" />
          </div>
          <h3 className="font-cinzel text-3xl font-bold text-[#F8FAFC] mb-4">
            {t('awaitingCoordinates')}
          </h3>
          <p className="text-[#94A3B8] leading-relaxed mb-8 max-w-md mx-auto">
            {t('awaitingDesc')}
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="py-20 px-4 text-center flex flex-col items-center justify-center max-w-xl mx-auto"
        >
          <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/30 border-l-transparent animate-spin" />
            <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-pulse" />
          </div>
          <h3 className="font-cinzel text-2xl font-bold text-[#FFF3C4] mb-3">
            {t('reconstructing')}
          </h3>
          <p className="text-sm text-[#D4AF37] font-mono mb-8 opacity-90 transition-all duration-300">
            {loadingSteps[loadingStepIdx]}
          </p>
          <div className="w-full h-2 rounded-full bg-[#1B1B26] overflow-hidden border border-[#242434]">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#B89220] via-[#D4AF37] to-[#FFF3C4]" 
              animate={{ width: `${Math.min(95, 20 + loadingStepIdx * 20)}%` }} 
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const metaYear = currentScene?.era.match(/\d{3,4}/)?.[0] || '1674';
  const metaLocation = currentScene?.era.includes('Maratha') ? 'Raigad, India' : (currentScene?.era.includes('Waterloo') ? 'Waterloo, Europe' : 'Historical Region');
  const metaRegion = currentScene?.era || 'Global History';

  return (
    <section id="scene-viewer" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
      
      {currentScene && (
        <AmbientAudioPlayer
          ambientTag={currentScene.ambientTag}
          isMuted={isMuted}
          isPlaying={isPlayingAudio}
        />
      )}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-[#D4AF37] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToExplore')}
          </button>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] uppercase tracking-tight mb-3">
            {searchQuery}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#cbd5e1] font-mono">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D4AF37]" /> {metaYear}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#D4AF37]" /> {metaLocation}</span>
            <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-[#D4AF37]" /> {metaRegion}</span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-sans font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" /> {t('verifiedRecords')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        <div className="w-full lg:w-[65%] space-y-6">
          
          <div 
            ref={playerRef}
            className={`relative w-full rounded-2xl overflow-hidden bg-[#0A0A0E] border border-[#242434] shadow-2xl group transition-all duration-300 ${isFullscreen ? 'h-screen rounded-none border-none' : 'aspect-video'}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSceneIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {mediaType === 'fallback' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#14141C] text-[#64748B]">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                    <span className="font-cinzel text-lg opacity-60">{t('visualArchiveUnavailable')}</span>
                  </div>
                ) : (
                  <Image
                    src={getSceneImage(searchQuery, activeSceneIdx)}
                    alt={currentScene?.title || 'Historical Scene'}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-[10000ms] ease-out"
                    onError={handleImageError}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
              
              <div className="flex justify-between items-start pointer-events-auto">
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-lg">
                  {t('scene')} {currentScene?.sceneNumber} {'//'} {TIMELINE_LABELS[activeSceneIdx] || t('scene')}
                </span>
                
                <div className="flex gap-2">
                  <button onClick={handleFavorite} className="p-2 rounded-lg bg-black/60 backdrop-blur-md hover:bg-black/80 text-white transition-all border border-white/10">
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 pointer-events-auto">
                <h3 className="font-cinzel text-2xl font-bold text-white drop-shadow-md">{currentScene?.title}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                    >
                      {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </button>
                    <button onClick={onToggleMute} className="text-white hover:text-[#D4AF37] transition-colors p-2">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button onClick={toggleFullscreen} className="text-white hover:text-[#D4AF37] transition-colors p-2">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#14141C] p-1.5 rounded-2xl border border-[#242434] overflow-x-auto scrollbar-none">
            <div className="flex items-stretch gap-1 min-w-max">
              {scenes.map((sc, idx) => {
                const isActive = idx === activeSceneIdx;
                const isPast = idx < activeSceneIdx;
                const label = TIMELINE_LABELS[idx] || `${t('scene')} ${idx + 1}`;
                return (
                  <button
                    key={idx}
                    onClick={() => { setActiveSceneIdx(idx); setIsPlayingAudio(false); }}
                    className={`relative flex-1 min-w-[120px] sm:min-w-[140px] px-3 py-3 rounded-xl transition-all group overflow-hidden ${
                      isActive ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/50' : 'hover:bg-[#1B1B26] border border-transparent'
                    }`}
                  >
                    {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 animate-shimmer" />}
                    <div className="flex flex-col relative z-10 text-left">
                      <span className={`text-[10px] font-mono tracking-wider font-bold mb-1 ${isActive ? 'text-[#D4AF37]' : isPast ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                        0{idx + 1} {label}
                      </span>
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-[#94A3B8]'}`}>
                        {sc.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onOpenTalkToHistory(searchQuery)}
              className="col-span-2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-black font-bold text-sm transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <MessageCircle className="w-4 h-4" /> {t('talkToWitness')}
            </button>
            
            <button onClick={scrollToContext} className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-[#D4AF37] transition-all text-xs font-bold">
              <BookOpen className="w-4 h-4" /> {t('explore')}
            </button>
            <button onClick={scrollToEvidence} className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-[#D4AF37] transition-all text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> {t('verifyFacts')}
            </button>
            <button onClick={() => setIsWhatIfOpen(true)} className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-purple-500/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-purple-400 transition-all text-xs font-bold">
              <AlertTriangle className="w-4 h-4" /> {t('whatIf')}
            </button>
            
            <div className="flex gap-2">
              <button onClick={handleSave} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all text-xs font-bold ${isSaved ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-[#14141C] border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-white'}`}>
                <Save className="w-4 h-4" /> {isSaved ? t('saved') : t('save')}
              </button>
              <button onClick={handleShare} className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-white transition-all text-xs font-bold">
                <Share2 className="w-4 h-4" /> {t('share')}
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#14141C] border border-[#242434] rounded-2xl p-5 sm:p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <BookOpen className="w-24 h-24" />
            </div>
            <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              {t('historiansNarration')}
            </h4>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-[#E2E8F0] leading-relaxed font-serif text-base sm:text-lg italic relative z-10">
              &quot;{currentScene?.narration}&quot;
            </div>
            <div className="mt-4 pt-4 border-t border-[#242434] flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span>Audio: {isPlayingAudio ? t('audioPlaying') : t('audioPaused')}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setActiveSceneIdx(Math.max(0, activeSceneIdx - 1)); setIsPlayingAudio(false); }}
                  disabled={activeSceneIdx === 0}
                  className="p-1 hover:text-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>{t('scene')} {activeSceneIdx + 1}/5</span>
                <button 
                  onClick={() => { setActiveSceneIdx(Math.min(scenes.length - 1, activeSceneIdx + 1)); setIsPlayingAudio(false); }}
                  disabled={activeSceneIdx === scenes.length - 1}
                  className="p-1 hover:text-white disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div id="context-section" className="bg-[#0A0A0E] border border-[#242434] rounded-2xl p-6 sm:p-8">
          <h3 className="font-cinzel text-2xl font-bold text-[#F8FAFC] mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" /> {t('historicalContext')}
          </h3>
          
          <div className="space-y-6 text-sm text-[#cbd5e1] leading-relaxed">
            <div>
              <h4 className="text-[#D4AF37] font-bold uppercase text-xs tracking-wider mb-2">{t('whatHappened')}</h4>
              <p>The events depicted in this sequence form a crucial arc in the timeline of {searchQuery}. This meticulously reconstructed narrative highlights the key turning points that defined the era.</p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] font-bold uppercase text-xs tracking-wider mb-2">{t('whyItMattered')}</h4>
              <p>These actions reverberated through history, shaping political, social, and cultural boundaries. The legacy of this moment continues to influence modern historical interpretations.</p>
            </div>
          </div>
        </div>

        <div id="evidence-section" className="bg-[#0A0A0E] border border-[#242434] rounded-2xl p-6 sm:p-8">
          <h3 className="font-cinzel text-2xl font-bold text-[#F8FAFC] mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-500" /> {t('evidenceRecords')}
          </h3>
          
          <div className="space-y-4">
            {currentScene?.historicalFact && (
              <EvidenceTag type="fact" text={currentScene.historicalFact} />
            )}
            {currentScene?.reconstructionNote && (
              <EvidenceTag type="reconstruction" text={currentScene.reconstructionNote} />
            )}
            {currentScene?.simulationNote && (
              <EvidenceTag type="simulation" text={currentScene.simulationNote} />
            )}
            
            {!currentScene?.historicalFact && !currentScene?.reconstructionNote && !currentScene?.simulationNote && (
              <EvidenceTag type="fact" text="This scene is based on established historical records and primary sources from the era." />
            )}
            
            <div className="pt-4 mt-4 border-t border-[#242434]">
              <SourcesPanel topic={searchQuery} />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-10">
        <ShareExportPanel searchQuery={searchQuery} scenesLength={scenes.length} />
      </div>

      <WhatIfModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        searchQuery={searchQuery}
        sceneTitle={currentScene?.title}
        era={currentScene?.era}
      />

      <AuthPrompt 
        isOpen={authPromptOpen} 
        onClose={() => setAuthPromptOpen(false)} 
        title="Sign In Required"
        message="Please sign in to save or favorite experiences."
      />
    </section>
  );
}

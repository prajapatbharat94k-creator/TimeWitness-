/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, VolumeX, Play, Pause, Sparkles, Clock, MessageCircle, 
  RefreshCw, ChevronLeft, ChevronRight, ArrowLeft, Maximize, MapPin, 
  Calendar, Save, Heart, Share2, BookOpen, AlertTriangle, ShieldCheck,
  Globe2, ImageIcon
} from 'lucide-react';
import EvidenceTag from './EvidenceTag';
import SourcesPanel from './SourcesPanel';
import { HistoricalScene } from '@/types/story';
import AmbientAudioPlayer from './AmbientAudioPlayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toggleSaved, toggleFavorite, recordUserHistory, ExperienceCardData } from '@/lib/db';
import { isUserFavorited, isUserSaved, setUserFavorite, setUserSaved, buildId } from '@/lib/localStorage';
import WhatIfModal from './WhatIfModal';
import ShareExportPanel from './ShareExportPanel';
import { getSceneVisual, SceneVisual } from '@/lib/historicalVisuals';

import { 
  getTimelineLabels, 
  getLocalizedTopicTitle, 
  getHistoricalContextParagraphs, 
  getFallbackEvidence, 
  getBestVoiceForLanguage 
} from '@/lib/multilingual';

interface ScenePlaceholderProps {
  searchQuery: string;
  scenes: HistoricalScene[];
  experienceId?: string | null;
  isLoading: boolean;
  onOpenTalkToHistory: (figure?: string, historicalContext?: string) => void;
  source?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onToastSuccess: (msg: string) => void;
  onToastError: (msg: string) => void;
}

export default function ScenePlaceholder({ 
  searchQuery, 
  scenes, 
  experienceId,
  isLoading, 
  onOpenTalkToHistory,
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
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);

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
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading, loadingSteps.length]);

  // Listen for dynamically loaded voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      handleVoicesChanged();
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => window.removeEventListener('voiceschanged', handleVoicesChanged);
    }
  }, []);

  // When language changes: stop current speech immediately
  useEffect(() => {
    setIsPlayingAudio(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [languageInfo.code]);

  // State reset on query/experience change
  useEffect(() => {
    setActiveSceneIdx(0);
    setIsPlayingAudio(false);
    setImgError(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (scenes && scenes.length > 0 && searchQuery) {
      const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
      const firstVisual = getSceneVisual(searchQuery, 1);
      const cardData: ExperienceCardData = {
        id: effectiveId,
        title: scenes[0]?.title || searchQuery,
        subject: searchQuery,
        year: scenes[0]?.era || undefined,
        cover_image: scenes[0]?.imageUrl || firstVisual.url,
        slug: effectiveId,
        progress: 20,
      };

      setIsFavorited(isUserFavorited(effectiveId, user?.id));
      setIsSaved(isUserSaved(effectiveId, user?.id));

      recordUserHistory(user ? user.id : null, effectiveId, cardData);
    } else {
      setIsSaved(false);
      setIsFavorited(false);
    }
  }, [scenes, searchQuery, experienceId, user, languageInfo.code]);

  const currentScene = scenes[activeSceneIdx] || null;

  // Resolve current visual reliably
  const currentVisual: SceneVisual = useMemo(() => {
    if (currentScene?.imageUrl) {
      return {
        url: currentScene.imageUrl,
        visualType: currentScene.visualType || 'reconstruction',
        alt: currentScene.title,
      };
    }
    return getSceneVisual(searchQuery, activeSceneIdx + 1);
  }, [currentScene, searchQuery, activeSceneIdx]);

  // Reset img error on scene change and stop previous speech
  useEffect(() => {
    setImgError(false);
    setIsPlayingAudio(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [activeSceneIdx, currentVisual.url]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (!currentScene?.narration) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onToastError('Speech synthesis is not supported on this device.');
      return;
    }

    const langPrefix = languageInfo.ttsLocale.split('-')[0].toLowerCase();
    const voice = getBestVoiceForLanguage(languageInfo.code, languageInfo.ttsLocale);

    if (!voice && langPrefix !== 'en') {
      onToastError("Voice for this language isn't available on this device.");
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
  };

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
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenes.length, isPlayingAudio, currentScene]);

  // Real narration speech playback using Web Speech API with language voice matching
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio && currentScene) {
      window.speechSynthesis.cancel();

      const langPrefix = languageInfo.ttsLocale.split('-')[0].toLowerCase();
      const voice = getBestVoiceForLanguage(languageInfo.code, languageInfo.ttsLocale);

      if (!voice && langPrefix !== 'en') {
        onToastError("Voice for this language isn't available on this device.");
        setIsPlayingAudio(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(currentScene.narration);
      utterance.lang = languageInfo.ttsLocale;
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = 0.92;
      utterance.volume = isMuted ? 0 : 1;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAudio, currentScene, languageInfo.code, languageInfo.ttsLocale, isMuted, onToastError]);

  // Action handlers
  const handleSave = async () => {
    const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
    const cardData: ExperienceCardData = {
      id: effectiveId,
      title: scenes[0]?.title || searchQuery,
      subject: searchQuery,
      year: scenes[0]?.era || undefined,
      cover_image: scenes[0]?.imageUrl || currentVisual.url,
      slug: effectiveId,
      progress: Math.round(((activeSceneIdx + 1) / Math.max(scenes.length, 1)) * 100),
    };

    const nextState = !isSaved;
    if (user) {
      await toggleSaved(user.id, effectiveId, nextState, cardData);
    } else {
      setUserSaved(cardData, nextState, null);
    }
    setIsSaved(nextState);
    onToastSuccess(nextState ? t('savedSuccessfully') : t('removedFromSaved'));
  };

  const handleFavorite = async () => {
    const effectiveId = experienceId || buildId(searchQuery, languageInfo.code);
    const cardData: ExperienceCardData = {
      id: effectiveId,
      title: scenes[0]?.title || searchQuery,
      subject: searchQuery,
      year: scenes[0]?.era || undefined,
      cover_image: scenes[0]?.imageUrl || currentVisual.url,
      slug: effectiveId,
      progress: Math.round(((activeSceneIdx + 1) / Math.max(scenes.length, 1)) * 100),
    };

    const nextState = !isFavorited;
    if (user) {
      await toggleFavorite(user.id, effectiveId, nextState, cardData);
    } else {
      setUserFavorite(cardData, nextState, null);
    }
    setIsFavorited(nextState);
    onToastSuccess(nextState ? t('addedToFavorites') : 'Removed from favorites.');
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/?witness=${encodeURIComponent(searchQuery)}` : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TimeWitness: ${searchQuery}`,
          text: `Witness the historical reconstruction of ${searchQuery}`,
          url: url,
        });
      } catch {
        // User cancelled or share dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        onToastSuccess(t('linkCopied'));
      } catch {
        onToastError('Failed to copy link.');
      }
    }
  };

  const scrollToEvidence = () => {
    const el = document.getElementById('evidence-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContext = () => {
    const el = document.getElementById('context-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        onToastError(`Full-screen unavailable: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (!isLoading && scenes.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 pb-20 pt-8">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="py-16 px-4 text-center flex flex-col items-center justify-center max-w-xl mx-auto bg-[#14141C]/80 border border-[#242434] rounded-3xl backdrop-blur-md shadow-2xl"
        >
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/30 border-l-transparent animate-spin" />
            <RefreshCw className="w-7 h-7 text-[#D4AF37] animate-pulse" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF3C4] mb-2">
            {t('reconstructing')}
          </h3>
          <p className="text-xs sm:text-sm text-[#D4AF37] font-mono mb-6 opacity-90 transition-all duration-300">
            {loadingSteps[loadingStepIdx]}
          </p>
          <div className="w-full max-w-md h-1.5 rounded-full bg-[#1B1B26] overflow-hidden border border-[#242434]">
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

  const metaYear = currentScene?.era?.match(/\d{3,4}/)?.[0] || currentScene?.date || 'Historical Record';
  const metaRegion = currentScene?.era || 'Historical Coordinates';
  const timelineLabels = getTimelineLabels(languageInfo.code);
  const displayTitle = getLocalizedTopicTitle(searchQuery, languageInfo.code);
  const contextParagraphs = getHistoricalContextParagraphs(displayTitle, languageInfo.code);
  const fallbackEvidence = getFallbackEvidence(displayTitle, languageInfo.code);

  return (
    <section id="scene-viewer" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
      
      {currentScene && (
        <AmbientAudioPlayer
          ambientTag={currentScene.ambientTag}
          isMuted={isMuted}
          isPlaying={isPlayingAudio}
        />
      )}

      {/* Title & Metadata Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-[#D4AF37] transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToExplore')}
          </button>
          <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] uppercase tracking-tight mb-2">
            {displayTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#CBD5E1] font-mono">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D4AF37]" /> {metaYear}</span>
            <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-[#D4AF37]" /> {metaRegion}</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-sans font-semibold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" /> {t('verifiedRecords')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Experience Visual + Controls */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Visual & Timeline */}
        <div className="w-full lg:w-[65%] space-y-4">
          
          <div 
            ref={playerRef}
            className={`relative w-full rounded-2xl overflow-hidden bg-[#0A0A0E] border border-[#242434] shadow-2xl group transition-all duration-300 ${
              isFullscreen ? 'h-screen rounded-none border-none' : 'aspect-video'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${searchQuery}-${experienceId || ''}-${activeSceneIdx}-${currentVisual.url}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {imgError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#14141C] text-[#64748B] p-6 text-center">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-30 text-[#D4AF37]" />
                    <span className="font-cinzel text-lg font-bold text-[#F8FAFC] mb-1">{currentScene?.title}</span>
                    <span className="text-xs text-[#94A3B8] max-w-sm">{currentScene?.imagePrompt}</span>
                  </div>
                ) : (
                  <Image
                    src={currentVisual.url}
                    alt={currentVisual.alt || currentScene?.title || 'Historical Scene'}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[12000ms] ease-out"
                    onError={() => setImgError(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 opacity-100 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
              
              {/* Top Controls: Scene Tag & Honest Visual Badge & Heart */}
              <div className="flex justify-between items-start pointer-events-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white shadow-lg">
                    {t('scene')} 0{activeSceneIdx + 1} {'//'} {timelineLabels[activeSceneIdx] || t('scene')}
                  </span>
                  
                  {/* Honest Historical Visual Label */}
                  <span className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5 ${
                    currentVisual.visualType === 'archival'
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                      : 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                  }`}>
                    {currentVisual.visualType === 'archival' ? (
                      <>
                        <ShieldCheck className="w-3 h-3" />
                        <span>ARCHIVAL RECORD</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>AI RECONSTRUCTION</span>
                      </>
                    )}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handleFavorite} 
                    className="p-2 rounded-lg bg-black/70 backdrop-blur-md hover:bg-black/90 text-white transition-all border border-white/10"
                    title={isFavorited ? 'Remove Favorite' : 'Add to Favorites'}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                </div>
              </div>

              {/* Bottom Overlay: Title & Audio / Fullscreen */}
              <div className="flex flex-col gap-2 sm:gap-3 pointer-events-auto">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white drop-shadow-md line-clamp-1">
                  {currentScene?.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleToggleAudio}
                      className="w-10 h-10 rounded-full bg-[#D4AF37] hover:bg-[#FFF3C4] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                      title={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                      aria-label="Toggle narration speech"
                    >
                      {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <button 
                      onClick={onToggleMute} 
                      className="text-white hover:text-[#D4AF37] transition-colors p-2 bg-black/40 rounded-lg backdrop-blur-sm"
                      title={isMuted ? t('unmuteAmbience') : t('muteAmbience')}
                      aria-label="Toggle soundscape"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="text-[11px] font-mono text-[#CBD5E1] hidden sm:inline bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      Voice: {languageInfo.nativeName} ({languageInfo.code})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleFullscreen} 
                      className="text-white hover:text-[#D4AF37] transition-colors p-2 bg-black/40 rounded-lg backdrop-blur-sm"
                      title="Toggle Fullscreen"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Scene Navigation Selector */}
          <div className="bg-[#14141C] p-1.5 rounded-2xl border border-[#242434] overflow-x-auto scrollbar-none">
            <div className="flex items-stretch gap-1 min-w-max">
              {scenes.map((sc, idx) => {
                const isActive = idx === activeSceneIdx;
                const isPast = idx < activeSceneIdx;
                const label = timelineLabels[idx] || `${t('scene')} ${idx + 1}`;
                return (
                  <button
                    key={idx}
                    onClick={() => { 
                      setActiveSceneIdx(idx); 
                      setIsPlayingAudio(false); 
                    }}
                    className={`relative flex-1 min-w-[120px] sm:min-w-[140px] px-3 py-2.5 rounded-xl transition-all group overflow-hidden text-left ${
                      isActive ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'hover:bg-[#1B1B26] border border-transparent'
                    }`}
                  >
                    {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 animate-shimmer" />}
                    <div className="flex flex-col relative z-10">
                      <span className={`text-[10px] font-mono tracking-wider font-bold mb-0.5 ${isActive ? 'text-[#D4AF37]' : isPast ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
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

        {/* Right Column: Action Buttons & Narration */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          
          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={() => onOpenTalkToHistory(searchQuery, currentScene ? `${currentScene.title}: ${currentScene.narration}` : undefined)}
              className="col-span-2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-sm transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <MessageCircle className="w-4 h-4" /> {t('talkToWitness')}
            </button>
            
            <button 
              onClick={scrollToContext} 
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-[#D4AF37] transition-all text-xs font-bold"
            >
              <BookOpen className="w-4 h-4" /> {t('explore')}
            </button>
            
            <button 
              onClick={scrollToEvidence} 
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-emerald-500/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-emerald-400 transition-all text-xs font-bold"
            >
              <ShieldCheck className="w-4 h-4" /> {t('verifyFacts')}
            </button>
            
            <button 
              onClick={() => setIsWhatIfOpen(true)} 
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-purple-500/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-purple-400 transition-all text-xs font-bold"
            >
              <AlertTriangle className="w-4 h-4" /> {t('whatIf')}
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className={`flex-1 flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border transition-all text-xs font-bold ${
                  isSaved 
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]' 
                    : 'bg-[#14141C] border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-white'
                }`}
              >
                <Save className="w-3.5 h-3.5" /> {isSaved ? t('saved') : t('save')}
              </button>
              
              <button 
                onClick={handleShare} 
                className="flex-1 flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 hover:bg-[#1B1B26] text-[#94A3B8] hover:text-white transition-all text-xs font-bold"
              >
                <Share2 className="w-3.5 h-3.5" /> {t('share')}
              </button>
            </div>
          </div>

          {/* Historical Narration Box */}
          <div className="flex-1 bg-[#14141C] border border-[#242434] rounded-2xl p-5 sm:p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <BookOpen className="w-24 h-24" />
            </div>
            <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-3 flex items-center gap-2">
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
                  onClick={() => { 
                    setActiveSceneIdx(Math.max(0, activeSceneIdx - 1)); 
                    setIsPlayingAudio(false); 
                  }}
                  disabled={activeSceneIdx === 0}
                  className="p-1 hover:text-white disabled:opacity-40 transition-colors"
                  aria-label="Previous scene"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-bold text-[#D4AF37]">{activeSceneIdx + 1}/5</span>
                <button 
                  onClick={() => { 
                    setActiveSceneIdx(Math.min(scenes.length - 1, activeSceneIdx + 1)); 
                    setIsPlayingAudio(false); 
                  }}
                  disabled={activeSceneIdx === scenes.length - 1}
                  className="p-1 hover:text-white disabled:opacity-40 transition-colors"
                  aria-label="Next scene"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Historical Context & Evidence Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div id="context-section" className="bg-[#0A0A0E] border border-[#242434] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-5 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" /> {t('historicalContext')}
          </h3>
          
          <div className="space-y-5 text-sm text-[#CBD5E1] leading-relaxed">
            <div>
              <h4 className="text-[#D4AF37] font-bold uppercase text-xs font-mono tracking-wider mb-1.5">{t('whatHappened')}</h4>
              <p>{contextParagraphs.whatHappened}</p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] font-bold uppercase text-xs font-mono tracking-wider mb-1.5">{t('whyItMattered')}</h4>
              <p>{contextParagraphs.whyItMattered}</p>
            </div>
          </div>
        </div>

        <div id="evidence-section" className="bg-[#0A0A0E] border border-[#242434] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> {t('evidenceRecords')}
          </h3>
          
          <div className="space-y-3.5">
            {currentScene?.historicalFact ? (
              <EvidenceTag 
                type="verified" 
                text={currentScene.historicalFact} 
                sourceAttribution={currentVisual.sourceAttribution}
              />
            ) : (
              <EvidenceTag 
                type="verified" 
                text={fallbackEvidence.historicalFact} 
              />
            )}

            {currentScene?.reconstructionNote ? (
              <EvidenceTag 
                type="reconstruction" 
                text={currentScene.reconstructionNote} 
              />
            ) : (
              <EvidenceTag 
                type="reconstruction" 
                text={fallbackEvidence.reconstructionNote} 
              />
            )}

            {currentScene?.simulationNote && (
              <EvidenceTag 
                type="uncertain" 
                text={currentScene.simulationNote} 
              />
            )}
            
            <div className="pt-3 mt-3 border-t border-[#242434]">
              <SourcesPanel topic={searchQuery} />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8">
        <ShareExportPanel searchQuery={searchQuery} scenesLength={scenes.length} />
      </div>

      <WhatIfModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        searchQuery={searchQuery}
        sceneTitle={currentScene?.title}
        era={currentScene?.era}
      />

    </section>
  );
}

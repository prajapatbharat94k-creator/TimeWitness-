'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToSearch = () => {
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
      
      {/* Small Label (Requirement 12) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 shadow-gold-glow"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>AI-POWERED HISTORICAL EXPERIENCE</span>
      </motion.div>

      {/* Main Title (Requirement 12) */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#94A3B8] leading-[1.1] mb-6 sm:mb-8 drop-shadow-2xl max-w-5xl tracking-tight"
      >
        WITNESS HISTORY<br />
        <span className="text-gold-gradient">AS IT HAPPENED</span>
      </motion.h1>

      {/* Subtext (Requirement 12) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-sm sm:text-lg text-[#CBD5E1] leading-relaxed mb-8 sm:mb-10 font-normal"
      >
        Step into historical moments through evidence-aware reconstruction, cinematic scenes and interactive AI witnesses.
      </motion.p>

      {/* Primary & Secondary CTAs (Requirement 12) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <button
          onClick={scrollToSearch}
          className="w-full sm:w-auto group relative px-7 sm:px-9 py-3.5 sm:py-4 bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            START EXPLORING
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <Link
          href="/explore"
          className="w-full sm:w-auto group px-7 sm:px-9 py-3.5 sm:py-4 bg-[#14141C] hover:bg-[#1B1B26] text-[#F8FAFC] border border-[#242434] hover:border-[#D4AF37]/50 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8] group-hover:text-[#D4AF37] transition-colors" />
          <span>EXPLORE HISTORY</span>
        </Link>
      </motion.div>

      {/* Honest Product Capabilities Bar (Requirement 13: Replaces fake numbers) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-12 sm:mt-16 pt-8 border-t border-[#242434]/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[#94A3B8]"
      >
        <span className="flex items-center gap-1.5 text-[#CBD5E1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          Evidence-Aware Reconstruction
        </span>
        <span className="flex items-center gap-1.5 text-[#CBD5E1]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Interactive Historical Scenes
        </span>
        <span className="flex items-center gap-1.5 text-[#CBD5E1]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Multilingual Narration (7 Languages)
        </span>
        <span className="flex items-center gap-1.5 text-[#CBD5E1]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Global + Indian History
        </span>
      </motion.div>
    </div>
  );
}

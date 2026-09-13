'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Video } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToSearch = () => {
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 shadow-gold-glow"
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        {t('heroSubtitle')}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#94A3B8] leading-[1.1] mb-6 sm:mb-8 drop-shadow-2xl"
      >
        {t('heroTitle')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-sm sm:text-lg text-[#94A3B8] leading-relaxed mb-10 sm:mb-12 font-medium"
      >
        {t('heroDesc')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <button
          onClick={scrollToSearch}
          className="w-full sm:w-auto group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            {t('startJourney')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById('eras');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-auto group px-6 sm:px-8 py-3.5 sm:py-4 bg-[#14141C] hover:bg-[#1B1B26] text-[#F8FAFC] border border-[#242434] hover:border-[#D4AF37]/50 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8] group-hover:text-[#D4AF37] transition-colors" />
          {t('viewArchive')}
        </button>
      </motion.div>
    </div>
  );
}

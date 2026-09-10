'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Flame, History } from 'lucide-react';

interface HeroSectionProps {
  currentLang: 'EN' | 'HI';
}

export default function HeroSection({ currentLang }: HeroSectionProps) {
  const content = {
    EN: {
      badge: "AI-POWERED ARCHIVAL RECONSTRUCTION ENGINE",
      titleStart: "Witness History",
      titleHighlight: "As It Happened",
      subtitle: "Step into the boots of historical observers. Experience photorealistic scenes, ambient audio atmospheres, and eyewitness testimonies generated from verified primary historical records.",
      stat1: "24,000+",
      stat1Label: "Verified Historical Events",
      stat2: "4K AI",
      stat2Label: "Cinematic Visual Reconstruction",
      stat3: "99.8%",
      stat3Label: "Primary Source Fidelity",
    },
    HI: {
      badge: "एआई-संचालित ऐतिहासिक अभिलेख पुनर्निर्माण इंजन",
      titleStart: "इतिहास को देखें",
      titleHighlight: "ठीक वैसे ही जैसे हुआ",
      subtitle: "ऐतिहासिक प्रत्यक्षदर्शियों के स्थान पर खड़े हों। सत्यापित प्राथमिक ऐतिहासिक अभिलेखों से निर्मित प्रामाणिक दृश्यों, इमर्सिव ऑडियो ध्वनियों और गवाहों के बयानों का अनुभव करें।",
      stat1: "24,000+",
      stat1Label: "सत्यापित ऐतिहासिक घटनाएँ",
      stat2: "4K AI",
      stat2Label: "सिनेमैटिक दृश्य पुनर्निर्माण",
      stat3: "99.8%",
      stat3Label: "प्राथमिक स्रोत शुद्धता",
    }
  };

  const t = content[currentLang];

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="ambient-glow-top" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Feature Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161622] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] shadow-gold-glow mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-widest uppercase text-[11px]">{t.badge}</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15] mb-6"
        >
          {t.titleStart}{' '}
          <span className="block sm:inline text-gold-gradient drop-shadow-sm">
            {t.titleHighlight}
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#94A3B8] font-normal leading-relaxed mb-10"
        >
          {t.subtitle}
        </motion.p>

        {/* Mini Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6"
        >
          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center border border-[#242434] hover:border-[#D4AF37]/30 transition-all">
            <span className="font-cinzel text-2xl font-bold text-[#FFF3C4]">{t.stat1}</span>
            <span className="text-xs text-[#64748B] mt-1 font-medium">{t.stat1Label}</span>
          </div>

          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center border border-[#242434] hover:border-[#D4AF37]/30 transition-all">
            <span className="font-cinzel text-2xl font-bold text-[#D4AF37]">{t.stat2}</span>
            <span className="text-xs text-[#64748B] mt-1 font-medium">{t.stat2Label}</span>
          </div>

          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center border border-[#242434] hover:border-[#D4AF37]/30 transition-all">
            <span className="font-cinzel text-2xl font-bold text-[#FFF3C4]">{t.stat3}</span>
            <span className="text-xs text-[#64748B] mt-1 font-medium">{t.stat3Label}</span>
          </div>
        </motion.div>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="/witness"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{currentLang === 'EN' ? 'Start Witnessing' : 'साक्षी बनना शुरू करें'}</span>
          </a>
          <a
            href="/explore"
            className="px-6 py-3.5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-[#CBD5E1] hover:text-white text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
          >
            <span>{currentLang === 'EN' ? 'Explore Global History' : 'इतिहास अन्वेषण'}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

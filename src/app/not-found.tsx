'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Hourglass, ArrowLeft, Compass, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Lost in the Sands of Time | TimeWitness';
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-xl mx-auto text-center relative z-10 space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto shadow-gold-glow">
            <Hourglass className="w-10 h-10 text-[#D4AF37] animate-pulse-slow" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Temporal Coordinate 404</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-[#F8FAFC] tracking-tight">
            Lost in the Sands of Time
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-md mx-auto">
            The historical epoch or archive coordinate you requested does not exist in our historical timeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Timeline</span>
            </Link>

            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14141C] hover:bg-[#1B1B26] text-[#F8FAFC] border border-[#242434] hover:border-[#D4AF37]/50 font-semibold py-3.5 px-6 rounded-xl transition-all text-sm"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Explore Epochs</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-6 text-center text-xs text-[#64748B]">
        TimeWitness Temporal Navigation Engine
      </footer>
    </div>
  );
}

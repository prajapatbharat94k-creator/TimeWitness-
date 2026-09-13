'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowLeft, Hourglass } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    document.title = 'Temporal Disruption | TimeWitness';
    console.error('Temporal engine disruption:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Temporal Disruption Encountered
          </span>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC] mt-3">
            Chronological Stream Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
            A temporary disruption occurred while synchronizing historical records. Your local archive remains safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-xs sm:text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-Synchronize</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14141C] hover:bg-[#1B1B26] text-[#F8FAFC] border border-[#242434] hover:border-[#D4AF37]/50 font-semibold py-3 px-6 rounded-xl transition-all text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home Timeline</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

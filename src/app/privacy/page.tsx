'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PrivacyPage() {
  const { currentLang } = useApp();

  return (
    <div className="min-h-screen pb-24">
      
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Data Privacy & Ethics' : 'गोपनीयता नीति'}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'PRIVACY POLICY' : 'गोपनीयता नीति'}
          </h1>
          <p className="mt-1 text-xs text-[#64748B] font-mono">
            Last updated: September 2026 • TimeWitness Historical Engine
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-10 border border-[#242434] space-y-8 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              1. Information We Collect and Store
            </h2>
            <p>
              TimeWitness is designed with privacy-first principles. Your viewing history, search terms, and bookmarked chronicles are stored solely within your local browser storage (`localStorage`). We do not require account creation, track personal identities, or sell browsing data to advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              2. Artificial Intelligence Processing
            </h2>
            <p>
              When generating 5-scene historical storylines or engaging with historical personas, search topics and user messages are transmitted securely via serverless API routes to the Google Gemini API. Transmitted prompts are sanitized of personal identifiable information and used solely for generating responses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              3. Speech Synthesis & Audio
            </h2>
            <p>
              Narration speech playback utilizes the standard W3C Web Speech API built into your browser. No voice audio is recorded or stored on TimeWitness servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              4. Data Control and Deletion
            </h2>
            <p>
              You maintain total control over your archival data. You can clear your local search history and bookmarked journeys at any time via the <Link href="/settings" className="text-[#D4AF37] hover:underline">Settings</Link> page.
            </p>
          </section>

        </div>
      </main>

    </div>
  );
}

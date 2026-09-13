'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Database, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Archive & Data Policy | TimeWitness';
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#D4AF37] transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to TimeWitness</span>
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">Legal & Governance</span>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-black text-[#F8FAFC]">
            Privacy Archive & Data Policy
          </h1>
          <p className="text-xs text-[#64748B] mt-2">Effective Date: September 2026</p>
        </div>

        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-[#cbd5e1] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              1. Overview & Principles
            </h2>
            <p className="text-xs text-[#94A3B8]">
              TimeWitness respects your privacy. We collect minimal personal information strictly necessary to provide personalized historical bookmarks, recent viewing logs, and custom audio narration preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#D4AF37]" />
              2. Data Storage & Local Persistence
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Your favorites, saved experiences, and viewing history are stored securely in your browser&apos;s local storage and, when authenticated, synchronized with our secure Supabase database. You can clear your local data at any time from your browser settings or via the Account Settings panel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              3. AI Query Processing
            </h2>
            <p className="text-xs text-[#94A3B8]">
              When you generate historical stories or converse with historical figures, your search query and message inputs are processed via the Google GenAI SDK strictly to produce historical dialogue and educational narratives. We do not sell your search queries to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#D4AF37]" />
              4. Cookies & Session Management
            </h2>
            <p className="text-xs text-[#94A3B8]">
              We use essential session tokens to maintain authentication states across page reloads. No third-party behavioral advertising trackers are utilized.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Privacy Archive • Inquiries: privacy@timewitness.ai
      </footer>
    </div>
  );
}

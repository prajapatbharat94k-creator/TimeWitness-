'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ScrollText, ArrowLeft, BookOpen, Scale, Award } from 'lucide-react';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service | TimeWitness';
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">Terms of Service</span>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-black text-[#F8FAFC]">
            Terms of Research & Exploration
          </h1>
          <p className="text-xs text-[#64748B] mt-2">Effective Date: September 2026</p>
        </div>

        <div className="bg-[#14141C] border border-[#242434] rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-[#cbd5e1] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              1. Educational & Research Purpose
            </h2>
            <p className="text-xs text-[#94A3B8]">
              TimeWitness is an educational exploration platform synthesizing historical accounts, primary documentation, and generative reconstructions. Reconstructed dialogue, audio, and imagery represent artistic simulations based on historical scholarship rather than actual archival photographs or voice recordings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              2. User Conduct & Acceptable Use
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Users agree not to misuse the platform to generate defamatory hate speech, propagate historical revisionism that denies well-documented genocides or atrocities, or bypass security restrictions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              3. Intellectual Property
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Historical facts, public domain texts, and verified historical artifacts remain in the public domain. The TimeWitness interface, source code, neural scene orchestration, and branding are protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-cinzel font-bold text-[#F8FAFC] flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-[#D4AF37]" />
              4. Disclaimer of Warranties
            </h2>
            <p className="text-xs text-[#94A3B8]">
              While TimeWitness makes every effort to verify primary sources and align with historiographical consensus, we provide the platform &quot;as is&quot; without warranty of absolute historical perfection. Researchers are encouraged to cross-reference our cited sources.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Terms of Service • Inquiries: legal@timewitness.ai
      </footer>
    </div>
  );
}

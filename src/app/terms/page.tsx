'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function TermsPage() {
  const { currentLang } = useApp();

  return (
    <div className="min-h-screen pb-24">
      
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-2">
            <FileText className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Terms & Fair Use' : 'सेवा की शर्तें'}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'TERMS OF SERVICE' : 'सेवा की शर्तें'}
          </h1>
          <p className="mt-1 text-xs text-[#64748B] font-mono">
            Last updated: September 2026 • TimeWitness Educational Platform
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-10 border border-[#242434] space-y-8 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              1. Educational and Cultural Purpose
            </h2>
            <p>
              TimeWitness is provided for educational, research, and cultural discovery purposes. Historical scenarios, persona dialogues, and visual scene prompts are generated through AI modeling anchored in historical records. While we aim for rigorous accuracy, AI narratives represent pedagogical dramatizations and should not be used as legal or formal judicial citations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              2. Acceptable Use Policy
            </h2>
            <p>
              Users agree not to utilize TimeWitness to generate hateful, defamatory, or intentionally false historical propaganda. Personas must not be manipulated into generating illegal advice or hate speech.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              3. Intellectual Property and Open Knowledge
            </h2>
            <p>
              Encyclopedic summaries are sourced from Wikipedia under the Creative Commons Attribution-ShareAlike License (CC BY-SA). Original software code is distributed under the open MIT License.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3C4]">
              4. Service Availability
            </h2>
            <p>
              TimeWitness provides serverless and client-side fallbacks. We reserve the right to modify or adjust rate limits to prevent denial of service and ensure equitable educational access for all users globally.
            </p>
          </section>

        </div>
      </main>

    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Hourglass, Globe, Compass, ScrollText, ShieldCheck, FileText, Heart, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { currentLang } = useApp();

  return (
    <footer className="w-full bg-[#09090D] border-t border-[#242434] text-[#94A3B8] text-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                <Hourglass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold tracking-wider text-[#F8FAFC]">
                  TIMEWITNESS
                </span>
                <span className="text-[9px] tracking-widest text-[#D4AF37] uppercase font-mono">
                  Historical AI Engine
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {currentLang === 'EN'
                ? 'An AI-powered archival reconstruction engine bringing human history to life through primary-source narrative and interactive documentary.'
                : 'प्राथमिक स्रोतों और संवादात्मक वृत्तचित्र के माध्यम से मानव इतिहास को जीवंत बनाने वाला ऐतिहासिक एआई इंजन।'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono">Gemini 2.0 Flash • Supabase Archive</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF3C4] font-cinzel mb-4">
              {currentLang === 'EN' ? 'Navigation' : 'नेविगेशन'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/explore" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Explore History' : 'इतिहास खोजें'}</span>
                </Link>
              </li>
              <li>
                <Link href="/witness" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ScrollText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Witness Engine' : 'साक्षी कक्ष'}</span>
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Global Search' : 'वैश्विक खोज'}</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Chronicler Dashboard' : 'डैशबोर्ड'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF3C4] font-cinzel mb-4">
              {currentLang === 'EN' ? 'Methodology & Platform' : 'पद्धति एवं मंच'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'How It Works' : 'यह कैसे कार्य करता है'}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  {currentLang === 'EN' ? 'About TimeWitness' : 'टाइमविटनेस के बारे में'}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#D4AF37] transition-colors">
                  {currentLang === 'EN' ? 'Scholar Profile' : 'विद्वान प्रोफाइल'}
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-[#D4AF37] transition-colors">
                  {currentLang === 'EN' ? 'Preferences & Audio' : 'प्राथमिकताएं एवं ध्वनि'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF3C4] font-cinzel mb-4">
              {currentLang === 'EN' ? 'Ethics & Policy' : 'नीति एवं शर्तें'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Privacy Policy' : 'गोपनीयता नीति'}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Terms of Service' : 'सेवा की शर्तें'}</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-[#64748B]">
                {currentLang === 'EN'
                  ? 'All historical reconstructions are grounded in primary historical records and verified encyclopedic archives.'
                  : 'सभी ऐतिहासिक पुनर्निर्माण प्राथमिक अभिलेखों और सत्यापित विश्वकोशों पर आधारित हैं।'}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C1C28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} TimeWitness. All rights reserved. Crafted for historical discovery.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#D4AF37] transition-colors">Archival Neutrality</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

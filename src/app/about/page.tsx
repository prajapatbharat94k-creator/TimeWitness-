'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Hourglass, ShieldCheck, Globe, BookOpen, 
  Sparkles, MessageCircle, ArrowRight, HeartHandshake 
} from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Our Mission | TimeWitness';
  }, []);

  const capabilities = [
    {
      title: 'AI Historical Research',
      desc: 'Automated synthesis of multi-source historical consensus, scholarly chronologies, and historical facts powered by Google GenAI SDK.',
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: 'Evidence-Aware Reconstruction',
      desc: 'Clear visual delineation between verified documentary facts, primary manuscripts, and neural atmospheric reconstructions.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Interactive Historical Witnesses',
      desc: 'Engaging character dialogues constrained by preserved historical correspondence, court chronicles, and autobiographical accounts.',
      icon: <MessageCircle className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Multilingual Experiences',
      desc: 'Native-language narration and transcriptions supporting English, Hindi, Marathi, Telugu, Gujarati, Tamil, and Bengali.',
      icon: <Globe className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <Hourglass className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">Our Mission</span>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-[#F8FAFC] tracking-tight mb-4">
            Preserving History Through Living Memory
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            TimeWitness is designed to make world history accessible, experiential, and deeply grounded in real evidence. We believe the past is not a static textbook, but a tapestry of human courage, tragedy, and insight.
          </p>
        </div>

        {/* Capability Statements */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-cinzel font-bold text-[#F8FAFC]">
              Core Engine Capabilities
            </h2>
            <p className="text-xs text-[#64748B] mt-1">Honest, verifiable features powering our time travel interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#14141C] border border-[#242434] shadow-xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0E] border border-[#242434] flex items-center justify-center">
                  {cap.icon}
                </div>
                <h3 className="font-cinzel text-lg font-bold text-[#F8FAFC]">{cap.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ethics & Historiography Statement */}
        <div className="p-8 rounded-3xl bg-[#14141C] border border-[#242434] space-y-4">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <HeartHandshake className="w-6 h-6" />
            <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              Ethical Historiography & Transparency
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Historical events often contain diverse interpretations, contested dates, and regional traditions. TimeWitness endeavors to represent diverse viewpoints with dignity and academic integrity. We do not invent historical claims; our AI models cite verified sources and present multi-faceted contexts so users can examine history with curiosity and critical analysis.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#D4AF37]">
            <Link href="/how-it-works" className="hover:underline flex items-center gap-1">
              <span>Read Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/privacy" className="hover:underline flex items-center gap-1">
              <span>Privacy Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Engine • Built for Historians, Students, and Curious Minds
      </footer>
    </div>
  );
}

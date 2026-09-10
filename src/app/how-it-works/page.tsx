'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Sparkles, 
  Database, 
  Cpu, 
  Languages, 
  Volume2, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ScrollText
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function HowItWorksPage() {
  const { currentLang } = useApp();

  const steps = [
    {
      num: '01',
      icon: Database,
      titleEn: 'Primary Archival Verification',
      titleHi: 'प्राथमिक अभिलेखीय सत्यापन',
      descEn: 'Every user inquiry queries a dual-layer knowledge repository: our pre-indexed Supabase Postgres database and the live Wikipedia encyclopedic corpus. Key dates, participants, and geographical coordinates are locked in.',
      descHi: 'प्रत्येक खोज सुपरबेस पोस्टग्रेस और विकिपीडिया कॉर्पस से प्राथमिक तिथियों और संदर्भों को सत्यापित करती है।'
    },
    {
      num: '02',
      icon: Cpu,
      titleEn: '5-Scene Narrative Decomposition',
      titleHi: '5-दृश्य कथा संरचना',
      descEn: 'Powered by Google Gemini 2.0 Flash via structured JSON schema, historical arcs are divided into five dramatic, chronological chapters: Dawn & Origins, The Gathering Storm, The Defining Climax, Sovereign Triumph, and Immortal Legacy.',
      descHi: 'जेमिनी 2.0 फ्लैश के माध्यम से इतिहास 5 सुनियोजित अध्यायों में विभाजित होता है—आरंभ से अमर विरासत तक।'
    },
    {
      num: '03',
      icon: Languages,
      titleEn: 'Linguistic Parity & Hindi Synthesis',
      titleHi: 'द्विभाषी प्रामाणिकता (हिंदी एवं अंग्रेजी)',
      descEn: 'TimeWitness ensures cultural fidelity by translating and adapting primary narrations into literary Hindi (हिन्दी) or English without loss of historical nuance.',
      descHi: 'सांस्कृतिक निष्ठा के साथ अंग्रेजी और साहित्यिक हिंदी में समान रूप से समृद्ध प्रस्तुति।'
    },
    {
      num: '04',
      icon: Volume2,
      titleEn: 'Acoustic & Ambient Atmosphere',
      titleHi: 'ध्वनि एवं परिवेशीय अनुभूति',
      descEn: 'Synthesized Web Speech narration is paired with period-accurate ambient soundscapes—temple bells, marching drums, cannon roar, and courtroom fanfares.',
      descHi: 'ऐतिहासिक माहौल रचने के लिए नगाड़ों, तोपों की गूंज और मंदिर की घंटियों का परिवेशीय संगीत।'
    },
    {
      num: '05',
      icon: MessageSquare,
      titleEn: 'Interactive Historical Persona Dialogue',
      titleHi: 'ऐतिहासिक पात्रों से जीवंत संवाद',
      descEn: 'Talk to History provides grounded persona roleplay with figures like Shivaji Maharaj, Rani Lakshmibai, Napoleon, and Cleopatra, maintaining period-accurate perspective and ethical boundaries.',
      descHi: 'छत्रपति शिवाजी महाराज, रानी लक्ष्मीबाई और नेपोलियन जैसे पात्रों से वास्तविक कालखंडीय संवाद।'
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      
      {/* Header */}
      <section className="relative py-16 sm:py-24 border-b border-[#242434] bg-radial-gradient overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Archival Engineering Methodology' : 'कार्यप्रणाली एवं प्रौद्योगिकी'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'HOW TIMEWITNESS WORKS' : 'टाइमविटनेस कैसे कार्य करता है'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'From verified archival evidence to 5-chapter cinematic historical experiences powered by Gemini 2.0 Flash.'
              : 'प्राथमिक ऐतिहासिक साक्ष्यों से लेकर जेमिनी 2.0 फ्लैश द्वारा संचालित 5-अध्यायी संवादात्मक वृत्तचित्र तक।'}
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        
        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 transition-all flex flex-col sm:flex-row items-start gap-6 group"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-cinzel font-bold text-[#64748B]">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors">
                    {currentLang === 'EN' ? step.titleEn : step.titleHi}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {currentLang === 'EN' ? step.descEn : step.descHi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/witness"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <ScrollText className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Experience the Engine in Action' : 'अभी इंजन का अनुभव करें'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

    </div>
  );
}

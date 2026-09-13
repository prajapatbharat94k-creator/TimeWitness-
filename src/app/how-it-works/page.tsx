'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Sparkles, ShieldCheck, MessageCircle, Volume2, 
  GitBranch, ArrowRight, BookOpen, Compass, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    step: '01',
    icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    title: 'AI Historical Research',
    desc: 'Our engine queries Google Gemini SDK to synthesize broad academic consensus, verified chronologies, and cultural nuances into coherent chronological scenes.',
    features: ['Real-time scene construction', 'Verified timeline grounding', 'Architectural & regalia detail'],
  },
  {
    step: '02',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: 'Evidence-Aware Reconstruction',
    desc: 'Every historical scene is explicitly classified into verified historical facts, AI reconstructions, and speculative simulations so historians know what is documented.',
    features: ['Citation of primary manuscripts', 'Clear reconstruction disclaimers', 'Transparent source methodology'],
  },
  {
    step: '03',
    icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
    title: 'Interactive Historical Witnesses',
    desc: 'Engage in conversational dialogue with historical figures whose perspectives are grounded in attested letters, court chronicles, and preserved autobiographies.',
    features: ['In-character period voice', 'Historical dialect sensitivity', 'Factually constrained discourse'],
  },
  {
    step: '04',
    icon: <Volume2 className="w-6 h-6 text-purple-400" />,
    title: 'Multilingual Vocal Synthesis',
    desc: 'Experience vocal narration rendered through the Web Speech API in native accents across English, Hindi, Marathi, Telugu, Gujarati, Tamil, and Bengali.',
    features: ['7 native language engines', 'Atmospheric ambient soundscapes', 'Customizable speech cadence'],
  },
  {
    step: '05',
    icon: <GitBranch className="w-6 h-6 text-amber-400" />,
    title: 'Counterfactual Simulations',
    desc: 'Explore historical turning points with "What If" scenarios, examining how differing decisions might have altered the trajectory of empires and revolutions.',
    features: ['Plausible divergence trees', 'Historiographical analysis', 'Critical thinking prompts'],
  },
];

export default function HowItWorksPage() {
  useEffect(() => {
    document.title = 'How It Works & Methodology | TimeWitness';
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Methodology & Architecture</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black text-[#F8FAFC] tracking-tight mb-4">
            How TimeWitness Works
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Bridging rigorous historical inquiry with modern neural models to reconstruct pivotal human moments with authenticity, transparency, and immersive atmosphere.
          </p>
        </div>

        {/* Pillars List */}
        <div className="space-y-8 mb-16">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all flex flex-col md:flex-row gap-6 md:items-start"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start shrink-0">
                <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                  STEP {pillar.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] border border-[#242434] flex items-center justify-center">
                  {pillar.icon}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#F8FAFC]">
                  {pillar.title}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
                  {pillar.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-[#cbd5e1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#14141C] via-[#1B1B26] to-[#14141C] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F8FAFC]">
              Ready to Step Into the Past?
            </h3>
            <p className="text-sm text-[#94A3B8]">
              Witness historical events with voice narration, primary evidence citations, and interactive historical dialogues.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3.5 px-8 rounded-xl transition-all shadow-gold-glow text-sm"
              >
                <span>Explore Historical Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#242434] bg-[#0A0A0E] py-8 text-center text-xs text-[#64748B]">
        TimeWitness Methodology & Architecture Documentation
      </footer>
    </div>
  );
}

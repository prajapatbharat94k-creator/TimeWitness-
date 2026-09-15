'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, FileCheck, HelpCircle, Sparkles } from 'lucide-react';

export type EvidenceType = 
  | 'verified' 
  | 'supported' 
  | 'uncertain' 
  | 'reconstruction' 
  | 'fact' 
  | 'simulation';

interface EvidenceTagProps {
  type: EvidenceType;
  text?: string;
  className?: string;
  sourceAttribution?: string;
}

interface EvidenceConfig {
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  glow: string;
}

const EVIDENCE_CONFIG: Record<string, EvidenceConfig> = {
  verified: {
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
    color: 'text-emerald-300',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/40',
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  },
  supported: {
    icon: <FileCheck className="w-4 h-4 text-blue-400 shrink-0" />,
    color: 'text-blue-300',
    bg: 'bg-blue-950/40',
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.15)]',
  },
  uncertain: {
    icon: <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />,
    color: 'text-amber-300',
    bg: 'bg-amber-950/40',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]',
  },
  reconstruction: {
    icon: <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />,
    color: 'text-purple-300',
    bg: 'bg-purple-950/40',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_12px_rgba(168,85,247,0.15)]',
  },
  fact: {
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
    color: 'text-emerald-300',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/40',
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  },
  simulation: {
    icon: <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />,
    color: 'text-cyan-300',
    bg: 'bg-cyan-950/40',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_12px_rgba(6,182,212,0.15)]',
  },
};

const LABELS: Record<string, Record<string, string>> = {
  EN: {
    verified: 'VERIFIED RECORD',
    supported: 'SUPPORTED BY ARCHIVES',
    uncertain: 'UNCERTAIN EVIDENCE',
    reconstruction: 'AI HISTORICAL RECONSTRUCTION',
    fact: 'HISTORICAL FACT',
    simulation: 'SIMULATION',
  },
  HI: {
    verified: 'सत्यापित साक्ष्य',
    supported: 'अभिलेख समर्थित',
    uncertain: 'अनिश्चित साक्ष्य',
    reconstruction: 'एआई ऐतिहासिक पुनर्निर्माण',
    fact: 'ऐतिहासिक तथ्य',
    simulation: 'सिमुलेशन',
  },
  MR: {
    verified: 'प्रमाणित पुरावा',
    supported: 'नोंदींनी समर्थित',
    uncertain: 'अनिश्चित पुरावा',
    reconstruction: 'एआय ऐतिहासिक पुनर्निर्माण',
    fact: 'ऐतिहासिक तथ्य',
    simulation: 'सिम्युलेशन',
  },
  TE: {
    verified: 'ధృవీకరించబడిన ఆధారాలు',
    supported: 'రికార్డుల మద్దతు ఉంది',
    uncertain: 'అనిశ్చిత ఆధారాలు',
    reconstruction: 'AI చారిత్రక పునర్నిర్మాణం',
    fact: 'చారిత్రక వాస్తవం',
    simulation: 'సిమ్యులేషన్',
  },
  GU: {
    verified: 'પ્રમાણિત પુરાવા',
    supported: 'દસ્તાવેજી સમર્થિત',
    uncertain: 'અનિશ્ચિત પુરાવા',
    reconstruction: 'AI ઐતિહાસિક પુનર્નિર્માણ',
    fact: 'ઐતિહાસિક હકીકત',
    simulation: 'સિમ્યુલેશન',
  },
  TA: {
    verified: 'சரிபார்க்கப்பட்ட சான்று',
    supported: 'ஆவணப்படுத்தப்பட்டது',
    uncertain: 'நிச்சயமற்ற சான்று',
    reconstruction: 'AI வரலாற்று மறுசீரமைப்பு',
    fact: 'வரலாற்று உண்மை',
    simulation: 'உருவகப்படுத்துதல்',
  },
  BN: {
    verified: 'যাচাইকৃত ঐতিহাসিক প্রমাণ',
    supported: 'নথি সমর্থিত',
    uncertain: 'অনিশ্চিত প্রমাণ',
    reconstruction: 'AI ঐতিহাসিক পুনর্গঠন',
    fact: 'ঐতিহাসিক তথ্য',
    simulation: 'সিমুলেশন',
  },
};

export default function EvidenceTag({ type = 'verified', text, className = '', sourceAttribution }: EvidenceTagProps) {
  const { currentLang } = useLanguage();
  const normalizedType = type === 'fact' ? 'verified' : (type === 'simulation' ? 'reconstruction' : type);
  const config = EVIDENCE_CONFIG[type] || EVIDENCE_CONFIG.verified;

  const label = LABELS[currentLang]?.[type] || LABELS.EN[type] || LABELS.EN[normalizedType] || 'VERIFIED';

  return (
    <div
      className={`
        flex items-start gap-3 p-3.5 rounded-xl
        ${config.bg} border ${config.border} ${config.glow}
        ${className}
      `}
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className={`text-[10px] font-extrabold tracking-widest uppercase font-mono ${config.color}`}>
          {label}
        </span>
        {text && (
          <p className="text-xs text-[#CBD5E1] leading-relaxed break-words">{text}</p>
        )}
        {sourceAttribution && (
          <span className="text-[10px] text-[#64748B] font-mono mt-0.5">
            Source: {sourceAttribution}
          </span>
        )}
      </div>
    </div>
  );
}

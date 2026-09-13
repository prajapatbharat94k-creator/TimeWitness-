'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export type EvidenceType = 'fact' | 'reconstruction' | 'simulation';

interface EvidenceTagProps {
  type: EvidenceType;
  text?: string;
  className?: string;
}

const EVIDENCE_CONFIG: Record<
  EvidenceType,
  { icon: string; labelKey: string; color: string; bg: string; border: string; glow: string }
> = {
  fact: {
    icon: '📜',
    labelKey: 'historicalFact',
    color: 'text-amber-300',
    bg: 'bg-amber-900/20',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_8px_rgba(217,119,6,0.25)]',
  },
  reconstruction: {
    icon: '🎭',
    labelKey: 'aiReconstruction',
    color: 'text-purple-300',
    bg: 'bg-purple-900/20',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_8px_rgba(168,85,247,0.25)]',
  },
  simulation: {
    icon: '🔮',
    labelKey: 'simulation',
    color: 'text-cyan-300',
    bg: 'bg-cyan-900/20',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_8px_rgba(6,182,212,0.25)]',
  },
};

export default function EvidenceTag({ type = 'fact', text, className = '' }: EvidenceTagProps) {
  const { currentLang } = useLanguage();
  const config = EVIDENCE_CONFIG[type] || EVIDENCE_CONFIG.fact;

  const getLabel = () => {
    const labels: Record<string, Record<EvidenceType, string>> = {
      EN: { fact: 'HISTORICAL FACT', reconstruction: 'AI RECONSTRUCTION', simulation: 'SIMULATION' },
      HI: { fact: 'ऐतिहासिक तथ्य', reconstruction: 'एआई पुनर्निर्माण', simulation: 'सिमुलेशन' },
      MR: { fact: 'ऐतिहासिक तथ्य', reconstruction: 'एआय पुनर्निर्माण', simulation: 'सिम्युलेशन' },
      TE: { fact: 'చారిత్రక వాస్తవం', reconstruction: 'AI పునర్నిర్మాణం', simulation: 'సిమ్యులేషన్' },
      GU: { fact: 'ઐતિહાસિક હકીકત', reconstruction: 'AI પુનર્નિર્માણ', simulation: 'સિમ્યુલેશન' },
      TA: { fact: 'வரலாற்று உண்மை', reconstruction: 'AI மறுசீரமைப்பு', simulation: 'உருவகப்படுத்துதல்' },
      BN: { fact: 'ঐতিহাসিক তথ্য', reconstruction: 'AI পুনর্নির্মাণ', simulation: 'সিমুলেশন' },
    };
    return labels[currentLang]?.[type] || labels.EN[type] || config.labelKey;
  };

  return (
    <div
      className={`
        inline-flex items-start gap-2 px-3 py-2 rounded-xl
        ${config.bg} border ${config.border} ${config.glow}
        ${className}
      `}
    >
      <span className="text-base leading-none mt-0.5 flex-shrink-0">{config.icon}</span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={`text-[10px] font-extrabold tracking-widest uppercase ${config.color}`}>
          {getLabel()}
        </span>
        {text && (
          <p className="text-[11px] text-slate-300 leading-relaxed break-words">{text}</p>
        )}
      </div>
    </div>
  );
}

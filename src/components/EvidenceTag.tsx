'use client';

import React from 'react';

export type EvidenceType = 'fact' | 'reconstruction' | 'simulation';

interface EvidenceTagProps {
  type: EvidenceType;
  text?: string;
  className?: string;
}

const EVIDENCE_CONFIG: Record<
  EvidenceType,
  { icon: string; label: string; color: string; bg: string; border: string; glow: string }
> = {
  fact: {
    icon: '📜',
    label: 'HISTORICAL FACT',
    color: 'text-amber-300',
    bg: 'bg-amber-900/20',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_8px_rgba(217,119,6,0.25)]',
  },
  reconstruction: {
    icon: '🎭',
    label: 'AI RECONSTRUCTION',
    color: 'text-purple-300',
    bg: 'bg-purple-900/20',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_8px_rgba(168,85,247,0.25)]',
  },
  simulation: {
    icon: '🔮',
    label: 'SIMULATION',
    color: 'text-cyan-300',
    bg: 'bg-cyan-900/20',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_8px_rgba(6,182,212,0.25)]',
  },
};

export default function EvidenceTag({ type, text, className = '' }: EvidenceTagProps) {
  const config = EVIDENCE_CONFIG[type];

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
          {config.label}
        </span>
        {text && (
          <p className="text-[11px] text-slate-300 leading-relaxed break-words">{text}</p>
        )}
      </div>
    </div>
  );
}

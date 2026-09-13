'use client';

import React, { useState } from 'react';
import { Share2, Download, Check, MapPin, Calendar, ScrollText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareExportPanelProps {
  searchQuery: string;
  scenesLength: number;
}

export default function ShareExportPanel({ searchQuery, scenesLength }: ShareExportPanelProps) {
  const { t, languageInfo } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?witness=${encodeURIComponent(searchQuery)}` : '';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TimeWitness: ${searchQuery}`,
          text: `Experience the historical journey of ${searchQuery}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to copy
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Create a mock summary text
      const summaryText = `
TIMEWITNESS HISTORICAL REPORT
===========================
Topic: ${searchQuery}
Scenes: ${scenesLength}
Language: ${languageInfo.nativeName}
Generated on: ${new Date().toLocaleDateString()}

This is an AI-generated historical reconstruction.
`;
      const blob = new Blob([summaryText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `timewitness-${searchQuery.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-20 relative z-10">
      <div className="bg-[#0A0A0E] border border-[#242434] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex-1 flex flex-col gap-4">
          <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-[#D4AF37]" />
            {t('successJourney')}
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141C] border border-[#242434] text-xs text-[#94A3B8]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{searchQuery}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141C] border border-[#242434] text-xs text-[#94A3B8]">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{scenesLength} {t('scene')}s</span>
            </div>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <button
            onClick={handleShare}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{t('linkCopied')}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{t('share')}</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0D0D11] font-bold transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-[#0D0D11]/30 border-t-[#0D0D11] rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}

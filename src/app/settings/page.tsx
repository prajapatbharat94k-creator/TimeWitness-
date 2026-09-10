'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sliders, 
  Volume2, 
  VolumeX, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { 
    currentLang, 
    setLanguage, 
    isMuted, 
    toggleMute, 
    clearRecentSearches, 
    savedJourneys 
  } = useApp();

  const [narrationSpeed, setNarrationSpeed] = useState('0.95');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your local search history and reset cached preferences?')) {
      clearRecentSearches();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      
      {/* Header */}
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-2">
            <Sliders className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Platform Configuration' : 'प्लेटफ़ॉर्म सेटिंग्स'}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'SYSTEM SETTINGS' : 'सिस्टम सेटिंग्स'}
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {currentLang === 'EN'
              ? 'Customize acoustic synthesis, narration playback speed, and archival data storage.'
              : 'ध्वनि संश्लेषण, वाचन गति और डेटा भंडारण को अनुकूलित करें।'}
          </p>
        </div>
      </section>

      {/* Main Settings Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Audio & Acoustic Synthesis */}
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-8 border border-[#242434] space-y-6">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'Audio & Acoustic Engine' : 'ध्वनि एवं वाचन इंजन'}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D0D11] border border-[#242434]">
              <div>
                <span className="font-bold text-[#F8FAFC] block">
                  {currentLang === 'EN' ? 'Ambient Soundscape Playback' : 'परिवेशीय ध्वनि (Ambient Sound)'}
                </span>
                <span className="text-xs text-[#64748B]">
                  {currentLang === 'EN' ? 'Toggle historical temple bells, war drums, and courtyard audio' : 'युद्ध के नगाड़े, मंदिर की घंटियां और दरबारी संगीत'}
                </span>
              </div>
              <button
                onClick={toggleMute}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  !isMuted 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                    : 'bg-[#14141C] text-[#94A3B8] border-[#242434]'
                }`}
              >
                {!isMuted ? 'Enabled (चालू)' : 'Muted (बंद)'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D0D11] border border-[#242434]">
              <div>
                <span className="font-bold text-[#F8FAFC] block">
                  {currentLang === 'EN' ? 'Speech Narration Speed' : 'वाचन गति (Speech Rate)'}
                </span>
                <span className="text-xs text-[#64748B]">
                  {currentLang === 'EN' ? 'Adjust Web Speech narration pacing for historical scenes' : 'ऐतिहासिक दृश्यों के वाचन की गति निर्धारित करें'}
                </span>
              </div>
              <select
                value={narrationSpeed}
                onChange={(e) => setNarrationSpeed(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#14141C] border border-[#242434] text-[#FFF3C4] text-xs font-mono outline-none"
              >
                <option value="0.85">0.85x (Solemn / शांत)</option>
                <option value="0.95">0.95x (Default / संतुलित)</option>
                <option value="1.05">1.05x (Brisk / तीव्र)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Archival Cache & Storage */}
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-8 border border-[#242434] space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#38BDF8]" />
            <h2 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'Local Archival Cache' : 'स्थानीय अभिलेखागार डेटा'}
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {currentLang === 'EN'
              ? 'Your research history and bookmarked chronicles are persisted locally in your browser sandbox, ensuring instant response and privacy.'
              : 'आपका शोध इतिहास और सहेजे गए आख्यान आपके ब्राउज़र में सुरक्षित रूप से संग्रहीत हैं।'}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#242434]">
            <button
              onClick={handleClearAll}
              className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/60 text-xs font-medium transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{currentLang === 'EN' ? 'Clear Local Search History' : 'खोज इतिहास साफ़ करें'}</span>
            </button>

            {resetSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Search cache reset!</span>
              </span>
            )}
          </div>
        </div>

        {/* System Architecture Diagnostics */}
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-8 border border-[#242434] space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-cinzel text-lg font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'Engine Architecture Status' : 'इंजन स्थिति'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0D0D11] border border-[#242434]">
              <span className="text-[#64748B] block">AI Narrative Model:</span>
              <span className="text-[#D4AF37] font-bold">Gemini 2.0 Flash</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D0D11] border border-[#242434]">
              <span className="text-[#64748B] block">Encyclopedic Archive:</span>
              <span className="text-emerald-400 font-bold">Wikipedia & Supabase</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D0D11] border border-[#242434]">
              <span className="text-[#64748B] block">Acoustics & Voice:</span>
              <span className="text-[#38BDF8] font-bold">Web Speech API</span>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Bookmark, 
  History, 
  Trash2, 
  ArrowUpRight, 
  Clock, 
  Compass, 
  ScrollText, 
  User, 
  Award, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { 
    currentLang, 
    profile, 
    savedJourneys, 
    toggleSaveJourney, 
    historyLog,
    openTalkModal
  } = useApp();

  return (
    <div className="min-h-screen pb-24">
      
      {/* Dashboard Header */}
      <section className="relative py-12 sm:py-16 border-b border-[#242434] bg-[#0A0A0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentLang === 'EN' ? 'Archival Command Center' : 'अभिलेखागार कमान केंद्र'}</span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'CHRONICLER DASHBOARD' : 'इतिहासकार डैशबोर्ड'}
              </h1>
              <p className="mt-1 text-sm text-[#94A3B8]">
                {currentLang === 'EN'
                  ? `Welcome, ${profile.name} — ${profile.title}`
                  : `स्वागत है, ${profile.name} — ${profile.title}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/witness"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow flex items-center gap-1.5"
              >
                <ScrollText className="w-4 h-4" />
                <span>{currentLang === 'EN' ? 'New Witnessing Journey' : 'नई यात्रा शुरू करें'}</span>
              </Link>
              <Link
                href="/profile"
                className="p-2.5 rounded-xl bg-[#14141C] border border-[#242434] text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/40 text-xs"
                title="Edit Profile"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-[#14141C] border border-[#242434]">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                <span>{currentLang === 'EN' ? 'Saved Dossiers' : 'सहेजे गए आख्यान'}</span>
                <Bookmark className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-2xl font-cinzel font-bold text-[#F8FAFC]">
                {savedJourneys.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141C] border border-[#242434]">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                <span>{currentLang === 'EN' ? 'Witness Log' : 'साक्षी इतिहास'}</span>
                <History className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="text-2xl font-cinzel font-bold text-[#F8FAFC]">
                {historyLog.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141C] border border-[#242434]">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                <span>{currentLang === 'EN' ? 'Scholar Rank' : 'विद्वान उपाधि'}</span>
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-sm font-bold text-[#FFF3C4] truncate">
                Grand Witness
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141C] border border-[#242434]">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                <span>{currentLang === 'EN' ? 'AI Persona Engine' : 'एआई संवाद'}</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-emerald-400">
                Active & Ready
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dashboard Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Saved Historical Journeys */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'Bookmarked Historical Journeys' : 'सहेजी गई ऐतिहासिक यात्राएं'}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              {savedJourneys.length} {currentLang === 'EN' ? 'saved' : 'सहेजे गए'}
            </span>
          </div>

          {savedJourneys.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#14141C] border border-[#242434] text-center">
              <ScrollText className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
              <p className="text-sm text-[#94A3B8]">
                {currentLang === 'EN' ? 'You have not bookmarked any historical journeys yet.' : 'आपने अभी तक कोई यात्रा नहीं सहेजी है।'}
              </p>
              <Link
                href="/explore"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B1B26] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium hover:border-[#D4AF37]"
              >
                <span>{currentLang === 'EN' ? 'Discover Experiences' : 'अनुभव खोजें'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedJourneys.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-2">
                      <span className="text-[#D4AF37]">{item.era || 'Historical Era'}</span>
                      <span>{item.savedAt}</span>
                    </div>
                    <h3 className="font-cinzel text-base font-bold text-[#F8FAFC] group-hover:text-[#FFF3C4] transition-colors mb-2">
                      {item.title || item.topic}
                    </h3>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1C1C28] flex items-center justify-between">
                    <Link
                      href={`/witness?topic=${encodeURIComponent(item.topic)}`}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-xs flex items-center gap-1 shadow-gold-glow"
                    >
                      <span>Resume</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => toggleSaveJourney(item)}
                      className="p-1.5 text-[#64748B] hover:text-red-400 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Chronological Activity Log */}
        <section className="pt-6 border-t border-[#242434]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                {currentLang === 'EN' ? 'Recent Archival Inquiries' : 'हालिया अभिलेखीय अन्वेषण'}
              </h2>
            </div>
          </div>

          <div className="bg-[#14141C] rounded-2xl border border-[#242434] divide-y divide-[#1C1C28] overflow-hidden">
            {historyLog.slice(0, 8).map((log, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between hover:bg-[#1A1A26]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs sm:text-sm text-[#CBD5E1] font-medium">
                    {log.topic}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {log.timestamp}
                  </span>
                  <Link
                    href={`/witness?topic=${encodeURIComponent(log.topic)}`}
                    className="text-xs text-[#D4AF37] hover:underline font-bold"
                  >
                    Witness
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Talk to History Quick Access */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E1B10] to-[#14141C] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
              Interactive Dialogue
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF3C4]">
              {currentLang === 'EN' ? 'Converse with Historical Icons' : 'ऐतिहासिक महापुरुषों से संवाद करें'}
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-xl mt-1">
              {currentLang === 'EN'
                ? 'Engage with Chhatrapati Shivaji Maharaj, Rani Lakshmibai, Napoleon Bonaparte, Cleopatra, and Neil Armstrong.'
                : 'छत्रपति शिवाजी महाराज, रानी लक्ष्मीबाई, नेपोलियन और नील आर्मस्ट्रांग से सीधा संवाद करें।'}
            </p>
          </div>

          <button
            onClick={() => openTalkModal()}
            className="px-5 py-3 rounded-2xl bg-[#D4AF37] text-black font-cinzel font-bold text-xs tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Launch Dialogue' : 'संवाद शुरू करें'}</span>
          </button>
        </section>

      </main>

    </div>
  );
}

'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TalkToHistoryModal from './TalkToHistoryModal';
import { useApp } from '@/context/AppContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isTalkModalOpen, closeTalkModal, currentLang, talkDefaultFigure } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D11] text-[#94A3B8] relative selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />

      {/* Global Talk to History Modal accessible from any button or route */}
      {isTalkModalOpen && (
        <TalkToHistoryModal
          isOpen={isTalkModalOpen}
          onClose={closeTalkModal}
          currentLang={currentLang}
          defaultFigure={talkDefaultFigure}
        />
      )}
    </div>
  );
}

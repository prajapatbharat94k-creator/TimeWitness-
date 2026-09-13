'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ToastProvider } from '@/components/ToastProvider';
import { TalkToHistoryProvider } from '@/contexts/TalkToHistoryContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <TalkToHistoryProvider>
            {children}
          </TalkToHistoryProvider>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

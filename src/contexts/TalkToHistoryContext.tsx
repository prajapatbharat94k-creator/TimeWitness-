'use client';

import React, { createContext, useContext, useState } from 'react';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';

interface TalkToHistoryContextType {
  isOpen: boolean;
  openTalkToHistory: (topic?: string, figureId?: string, historicalContext?: string) => void;
  closeTalkToHistory: () => void;
}

const TalkToHistoryContext = createContext<TalkToHistoryContextType>({
  isOpen: false,
  openTalkToHistory: () => {},
  closeTalkToHistory: () => {},
});

export function TalkToHistoryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<string | undefined>(undefined);
  const [figureId, setFigureId] = useState<string | undefined>(undefined);
  const [context, setContext] = useState<string | undefined>(undefined);

  const openTalkToHistory = (t?: string, fId?: string, hCtx?: string) => {
    setTopic(t);
    setFigureId(fId);
    setContext(hCtx);
    setIsOpen(true);
  };

  const closeTalkToHistory = () => {
    setIsOpen(false);
  };

  return (
    <TalkToHistoryContext.Provider value={{ isOpen, openTalkToHistory, closeTalkToHistory }}>
      {children}
      <TalkToHistoryModal
        isOpen={isOpen}
        onClose={closeTalkToHistory}
        initialTopic={topic}
        initialFigureId={figureId}
        historicalContext={context}
      />
    </TalkToHistoryContext.Provider>
  );
}

export function useTalkToHistory() {
  return useContext(TalkToHistoryContext);
}

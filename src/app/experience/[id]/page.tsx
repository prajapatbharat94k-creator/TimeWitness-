'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScenePlaceholder from '@/components/ScenePlaceholder';
import { useToast } from '@/components/ToastProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { HistoricalScene } from '@/types/story';
import { Hourglass } from 'lucide-react';
import TalkToHistoryModal from '@/components/TalkToHistoryModal';

function formatSlugToTopic(slug: string): string {
  return slug
    .replace(/-en$|-hi$|-mr$|-te$|-gu$|-ta$|-bn$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function ExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const { languageInfo, t } = useLanguage();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [topic, setTopic] = useState('');
  const [scenes, setScenes] = useState<HistoricalScene[]>([]);
  const [experienceId, setExperienceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [talkHistoricalContext, setTalkHistoricalContext] = useState<string | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const resolvedTopic = formatSlugToTopic(id);
    setTopic(resolvedTopic);
    document.title = `${resolvedTopic} | TimeWitness Experience`;

    async function loadStory() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/generate-story', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: resolvedTopic, language: languageInfo.code }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.scenes && Array.isArray(data.scenes)) {
          setScenes(data.scenes);
          setExperienceId(data.experienceId || id);
        }
      } catch {
        toast.error('Unable to retrieve historical coordinate archive.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStory();
  }, [id, languageInfo.code, toast]);

  const handleOpenTalkToHistory = (figureName?: string, context?: string) => {
    if (figureName) setTopic(figureName);
    setTalkHistoricalContext(context);
    setIsTalkModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
      <Navbar 
        onOpenTalkToHistory={() => handleOpenTalkToHistory()}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(m => !m)}
      />

      <main className="pt-28 pb-20">
        <ScenePlaceholder
          searchQuery={topic}
          scenes={scenes}
          experienceId={experienceId}
          isLoading={isLoading}
          onOpenTalkToHistory={handleOpenTalkToHistory}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(m => !m)}
          onToastSuccess={toast.success}
          onToastError={toast.error}
        />
      </main>

      <TalkToHistoryModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        defaultFigure={topic}
        historicalContext={talkHistoricalContext}
      />
    </div>
  );
}

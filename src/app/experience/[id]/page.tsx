'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FEATURED_EXPERIENCES, 
  HistoricalFigureOrEvent 
} from '@/data/historicalCatalog';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  ScrollText, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Globe, 
  Clock, 
  Tag, 
  ExternalLink,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentLang, isJourneySaved, toggleSaveJourney, openTalkModal } = useApp();
  
  const id = params?.id as string;
  const experience = FEATURED_EXPERIENCES.find(e => e.id === id) || FEATURED_EXPERIENCES[0];
  const isSaved = isJourneySaved(experience.searchQuery);

  const [wikiData, setWikiData] = useState<any>(null);
  const [isFetchingWiki, setIsFetchingWiki] = useState(false);

  useEffect(() => {
    async function fetchWiki() {
      if (!experience) return;
      setIsFetchingWiki(true);
      try {
        const res = await fetch(`/api/wiki-history?query=${encodeURIComponent(experience.title)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.found && json.data) {
            setWikiData(json.data);
          }
        }
      } catch {
        // Fallback silently to catalogue data
      } finally {
        setIsFetchingWiki(false);
      }
    }
    fetchWiki();
  }, [experience]);

  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-cinzel text-2xl text-[#F8FAFC]">Experience not found</h2>
        <Link href="/explore" className="mt-4 text-[#D4AF37] hover:underline">
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      
      {/* Back button header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#D4AF37] transition-colors py-2 px-3 rounded-xl bg-[#14141C] border border-[#242434]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLang === 'EN' ? 'Back to Discovery' : 'वापस जाएं'}</span>
        </button>
      </div>

      {/* Main Experience Hero & Dossier */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Banner */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#242434] bg-[#14141C] shadow-2xl">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src={experience.imageUrl}
                alt={experience.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14141C] via-transparent to-black/40" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37] text-black">
                  {experience.region}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/70 backdrop-blur-md text-[#FFF3C4]">
                  {experience.epoch}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#64748B] font-mono">
                <span>Timeframe:</span>
                <span className="text-[#D4AF37] font-bold">{experience.timeframe}</span>
              </div>

              <div className="pt-2 border-t border-[#242434] flex flex-col gap-2.5">
                <Link
                  href={`/witness?topic=${encodeURIComponent(experience.searchQuery)}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-sm tracking-wide text-center shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ScrollText className="w-4 h-4" />
                  <span>{currentLang === 'EN' ? 'Launch 5-Scene Witnessing' : '5-दृश्य साक्षी यात्रा शुरू करें'}</span>
                </Link>

                <button
                  onClick={() => openTalkModal(experience.title)}
                  className="w-full py-3 px-4 rounded-xl bg-[#1B1B26] border border-[#D4AF37]/40 text-[#FFF3C4] hover:border-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>{currentLang === 'EN' ? 'Talk to Historical Persona' : 'ऐतिहासिक पात्र से संवाद करें'}</span>
                </button>

                <button
                  onClick={() => toggleSaveJourney({
                    id: experience.id,
                    topic: experience.searchQuery,
                    era: experience.timeframe,
                    savedAt: new Date().toLocaleDateString(),
                    title: experience.title,
                    thumbnailUrl: experience.imageUrl
                  })}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#14141C] border border-[#242434] text-xs text-[#94A3B8] hover:text-white flex items-center justify-center gap-2"
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? (currentLang === 'EN' ? 'Saved to Chronicler Dossier' : 'दस्तावेज़ सहेजा गया') : (currentLang === 'EN' ? 'Save to Dossier' : 'दस्तावेज़ में सहेजें')}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Historical Dossier & Verification Details */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#14141C] rounded-3xl p-6 sm:p-8 border border-[#242434] space-y-6">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Archival Chronicle Record #{experience.id}
                </span>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                  {currentLang === 'EN' ? experience.title : experience.titleHi}
                </h1>
                <p className="text-sm font-mono text-[#FFF3C4] mt-2">
                  {currentLang === 'EN' ? experience.subtitle : experience.subtitleHi}
                </p>
              </div>

              <div className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed space-y-4">
                <p>{currentLang === 'EN' ? experience.description : experience.descriptionHi}</p>
                {wikiData?.extract && (
                  <div className="p-4 rounded-2xl bg-[#0D0D11] border border-[#242434] text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase block mb-1">
                      Primary Archival Extract (Wikipedia verified)
                    </span>
                    {wikiData.extract}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-[#242434] flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#64748B] font-mono flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Tags:
                </span>
                {experience.tags.map(t => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#1B1B26] border border-[#242434] text-[#CBD5E1]">
                    #{t}
                  </span>
                ))}
              </div>

              {wikiData?.page_url && (
                <div className="pt-2">
                  <a
                    href={wikiData.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-mono"
                  >
                    <span>View Encyclopedic Primary Entry</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Related Exploration Callout */}
            <div className="bg-[#14141C]/60 rounded-3xl p-6 border border-[#242434] flex items-center justify-between gap-4">
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#F8FAFC]">
                  {currentLang === 'EN' ? 'Want to explore more in this epoch?' : 'इस युग के और आख्यान देखना चाहते हैं?'}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {currentLang === 'EN' ? `Discover all chronicles from the ${experience.epoch} era.` : `${experience.epoch} काल के सभी अभिलेख खोजें।`}
                </p>
              </div>
              <Link
                href="/explore"
                className="px-4 py-2 rounded-xl bg-[#1B1B26] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] text-xs font-semibold shrink-0"
              >
                {currentLang === 'EN' ? 'Explore Portal' : 'पोर्टल खोलें'}
              </Link>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

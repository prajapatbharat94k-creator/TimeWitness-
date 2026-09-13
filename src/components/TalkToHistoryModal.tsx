/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mic, Volume2, Send, Shield, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Figure {
  id: string;
  name: string; // Internal/EN name
  title: string;
  era: string;
  avatar: string;
  greetingEn: string;
}

const HISTORICAL_FIGURES: Figure[] = [
  {
    id: 'shivaji',
    name: 'Chhatrapati Shivaji Maharaj',
    title: 'Founder of the Maratha Empire',
    era: '1630 – 1680 AD',
    avatar: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Greetings, traveler. I welcome you to Raigad. What query brings you to speak with the Chhatrapati?',
  },
  {
    id: 'lakshmibai',
    name: 'Rani Lakshmibai',
    title: 'Queen of Jhansi & Revolutionary Leader',
    era: '1828 – 1858 AD',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'I stand atop Jhansi ramparts. Speak swiftly—the cannons are being primed, but I shall hear your voice.',
  },
  {
    id: 'napoleon',
    name: 'Napoleon Bonaparte',
    title: 'Emperor of the French',
    era: '1769 – 1821 AD',
    avatar: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Impossible is a word found only in the dictionary of fools. Ask your question regarding military strategy or statecraft.',
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra VII',
    title: 'Pharaoh of Ptolemaic Egypt',
    era: '69 – 30 BC',
    avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Welcome to Alexandria. Step forward into the hall of Ptolemies and speak.',
  },
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation & Apostle of Non-Violence',
    era: '1869 – 1948 AD',
    avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Namaste, my friend. Truth and non-violence are my guideposts. What thoughts wish you to share today?',
  },
  {
    id: 'armstrong',
    name: 'Neil Armstrong',
    title: 'Apollo 11 Commander & Lunar Explorer',
    era: '1930 – 2012 AD',
    avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Tranquility Base here. The Eagle has landed. What coordinates of the lunar voyage would you like to explore?',
  },
];

const matchHistoricalFigure = (query?: string): Figure => {
  if (!query) return HISTORICAL_FIGURES[0];
  const q = query.toLowerCase();
  if (q.includes('shivaji') || q.includes('maratha') || q.includes('raigad') || q.includes('swarajya')) return HISTORICAL_FIGURES[0];
  if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) return HISTORICAL_FIGURES[1];
  if (q.includes('napoleon') || q.includes('bonaparte') || q.includes('waterloo') || q.includes('french')) return HISTORICAL_FIGURES[2];
  if (q.includes('cleopatra') || q.includes('egypt') || q.includes('alexandria') || q.includes('pharaoh')) return HISTORICAL_FIGURES[3];
  if (q.includes('gandhi') || q.includes('dandi') || q.includes('salt') || q.includes('satyagraha')) return HISTORICAL_FIGURES[4];
  if (q.includes('apollo') || q.includes('armstrong') || q.includes('moon') || q.includes('lunar') || q.includes('space')) return HISTORICAL_FIGURES[5];
  return HISTORICAL_FIGURES[0];
};

interface TalkToHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFigure?: string;
  initialTopic?: string;
  initialFigureId?: string;
}

export default function TalkToHistoryModal({ isOpen, onClose, defaultFigure, initialTopic, initialFigureId }: TalkToHistoryModalProps) {
  const { t, currentLang, languageInfo } = useLanguage();
  const figureQuery = defaultFigure || initialTopic || initialFigureId;
  const [selectedFigure, setSelectedFigure] = useState<Figure>(() => matchHistoricalFigure(figureQuery));
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'figure'; text: string }>>([
    {
      sender: 'figure',
      text: selectedFigure.greetingEn,
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (figureQuery) {
      const matched = matchHistoricalFigure(figureQuery);
      setSelectedFigure(matched);
      setMessages([{
        sender: 'figure',
        text: matched.greetingEn,
      }]);
    }
  }, [figureQuery]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playVoice = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageInfo.ttsLocale;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (typeof window === 'undefined') return;

    interface SpeechEvent {
      results: Array<Array<{ transcript: string }>>;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onstart: (() => void) | null;
        onresult: ((event: SpeechEvent) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
        start: () => void;
      };
      webkitSpeechRecognition?: new () => {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onstart: (() => void) | null;
        onresult: ((event: SpeechEvent) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
        start: () => void;
      };
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use keyboard input.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = languageInfo.ttsLocale;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: SpeechEvent) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        setInputText(transcript);
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } catch (e) {
      console.error('Speech recognition failed to start:', e);
      setIsRecording(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/talk-to-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figureId: selectedFigure.id,
          figureName: selectedFigure.name,
          message: userMsg,
          language: languageInfo.nativeName, // Send the full language name to the backend
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      const reply = data.reply || `I am ${selectedFigure.name}, and I have received your message.`;
      setMessages(prev => [...prev, { sender: 'figure', text: reply }]);
      setIsLoading(false);
      playVoice(reply);
    } catch {
      const reply = `I am ${selectedFigure.name}, and I have received your message.`;
      setMessages(prev => [...prev, { sender: 'figure', text: reply }]);
      setIsLoading(false);
      playVoice(reply);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl h-[90vh] max-h-[700px] rounded-3xl bg-[#0D0D11] border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
          >
            {/* Left Column: Personality Switcher Panel */}
            <div className="w-full md:w-80 bg-[#14141C] p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#242434] flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-cinzel text-lg font-bold text-[#F8FAFC]">
                      {t('talkModalTitle')}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-extrabold text-[#D4AF37]">
                    AI VOICE
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-3">
                  {t('talkModalSubtitle')}
                </span>

                {/* Figure Buttons */}
                <div className="space-y-2 max-h-[280px] md:max-h-[420px] overflow-y-auto pr-1 mt-4">
                  {HISTORICAL_FIGURES.map((fig) => {
                    const isSelected = selectedFigure.id === fig.id;

                    return (
                      <button
                        key={fig.id}
                        onClick={() => {
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                          }
                          setSelectedFigure(fig);
                          setMessages([{
                            sender: 'figure',
                            text: fig.greetingEn,
                          }]);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#1B1B26] border border-[#D4AF37] text-[#FFF3C4] shadow-gold-glow'
                            : 'bg-[#0D0D11]/60 border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                        }`}
                      >
                        <Image
                          src={fig.avatar}
                          alt={fig.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold truncate text-[#F8FAFC]">{fig.name}</h4>
                          <p className="text-[10px] text-[#64748B] truncate">{fig.title}</p>
                          <span className="text-[9px] text-[#D4AF37] font-mono block mt-0.5">{fig.era}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Chat Interface */}
            <div className="flex-1 flex flex-col justify-between bg-[#0D0D11] p-4 sm:p-6 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#242434]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={selectedFigure.avatar}
                      alt={selectedFigure.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0D11] absolute bottom-0 right-0" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-[#F8FAFC]">
                      {selectedFigure.name}
                    </h3>
                    <span className="text-xs text-[#D4AF37]">{selectedFigure.era}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 my-2 pr-2">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#D4AF37] text-[#0D0D11] font-semibold rounded-tr-none shadow-gold-glow'
                          : 'glass-panel text-[#F8FAFC] rounded-tl-none border border-[#D4AF37]/30'
                      }`}
                    >
                      {msg.sender === 'figure' && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] font-mono mb-1">
                          <Volume2 className="w-3 h-3 animate-pulse cursor-pointer" onClick={() => playVoice(msg.text)} />
                          <span>Voice Output</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-3.5 rounded-2xl glass-panel border border-[#D4AF37]/30">
                      <div className="flex items-center gap-2 text-[#D4AF37]">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-mono animate-pulse">
                          {t('generating')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Input Field */}
              <div className="pt-2 border-t border-[#242434]">
                <div className="flex items-center gap-2 bg-[#14141C] p-2 rounded-2xl border border-[#242434] focus-within:border-[#D4AF37] transition-all">
                  <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-xl transition-colors ${
                      isRecording 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' 
                        : 'text-[#64748B] hover:text-[#D4AF37]'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t('typeMessage')}
                    className="w-full bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none px-2"
                  />

                  <button
                    onClick={handleSend}
                    disabled={isLoading || !inputText.trim()}
                    className="p-2.5 rounded-xl bg-[#D4AF37] text-[#0D0D11] hover:bg-[#FFF3C4] font-bold transition-all shadow-gold-glow disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mic, Volume2, Sparkles, Send, UserCheck, Shield } from 'lucide-react';

interface Figure {
  id: string;
  nameEn: string;
  nameHi: string;
  titleEn: string;
  titleHi: string;
  era: string;
  avatar: string;
  greetingEn: string;
  greetingHi: string;
}

const HISTORICAL_FIGURES: Figure[] = [
  {
    id: 'shivaji',
    nameEn: 'Chhatrapati Shivaji Maharaj',
    nameHi: 'छत्रपति शिवाजी महाराज',
    titleEn: 'Founder of the Maratha Empire',
    titleHi: 'मराठा साम्राज्य के संस्थापक',
    era: '1630 – 1680 AD',
    avatar: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Greetings, traveler. I welcome you to Raigad. What query brings you to speak with the Chhatrapati?',
    greetingHi: 'नमस्कार, यात्री। रायगढ़ में आपका स्वागत है। छत्रपति से बात करने की क्या इच्छा है?',
  },
  {
    id: 'lakshmibai',
    nameEn: 'Rani Lakshmibai',
    nameHi: 'रानी लक्ष्मीबाई',
    titleEn: 'Queen of Jhansi & Revolutionary Leader',
    titleHi: 'झांसी की रानी एवं महान क्रांतीकारी',
    era: '1828 – 1858 AD',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'I stand atop Jhansi ramparts. Speak swiftly—the cannons are being primed, but I shall hear your voice.',
    greetingHi: 'मैं झांसी के प्राचीर पर खड़ी हूं। शीघ्र कहें—तोपें तैयार की जा रही हैं, पर मैं आपकी बात सुनूंगी।',
  },
  {
    id: 'napoleon',
    nameEn: 'Napoleon Bonaparte',
    nameHi: 'नेपोलियन बोनापार्ट',
    titleEn: 'Emperor of the French',
    titleHi: 'फ्रांसीसी सम्राट',
    era: '1769 – 1821 AD',
    avatar: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Impossible is a word found only in the dictionary of fools. Ask your question regarding military strategy or statecraft.',
    greetingHi: 'असंभव शब्द केवल मूर्खों के शब्दकोश में मिलता है। सैन्य रणनीति या शासनकला पर अपना प्रश्न पूछें।',
  },
  {
    id: 'cleopatra',
    nameEn: 'Cleopatra VII',
    nameHi: 'क्लिओपेट्रा सातवीं',
    titleEn: 'Pharaoh of Ptolemaic Egypt',
    titleHi: 'मिस्र की महारानी',
    era: '69 – 30 BC',
    avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=200&auto=format&fit=crop',
    greetingEn: 'Welcome to Alexandria. Step forward into the hall of Ptolemies and speak.',
    greetingHi: 'अलेक्जेंड्रिया में आपका स्वागत है। टोलमी के दरबार में आगे आएं और अपनी बात रखें।',
  },
];

const matchHistoricalFigure = (query?: string): Figure => {
  if (!query) return HISTORICAL_FIGURES[0];
  const q = query.toLowerCase();
  if (q.includes('shivaji') || q.includes('maratha') || q.includes('raigad') || q.includes('swarajya')) {
    return HISTORICAL_FIGURES[0];
  }
  if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) {
    return HISTORICAL_FIGURES[1];
  }
  if (q.includes('napoleon') || q.includes('bonaparte') || q.includes('waterloo') || q.includes('french')) {
    return HISTORICAL_FIGURES[2];
  }
  if (q.includes('cleopatra') || q.includes('egypt') || q.includes('alexandria') || q.includes('pharaoh')) {
    return HISTORICAL_FIGURES[3];
  }
  return HISTORICAL_FIGURES[0];
};

interface TalkToHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'EN' | 'HI';
  defaultFigure?: string;
}

export default function TalkToHistoryModal({ isOpen, onClose, currentLang, defaultFigure }: TalkToHistoryModalProps) {
  const [selectedFigure, setSelectedFigure] = useState<Figure>(() => matchHistoricalFigure(defaultFigure));
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'figure'; text: string }>>([
    {
      sender: 'figure',
      text: currentLang === 'EN' ? selectedFigure.greetingEn : selectedFigure.greetingHi,
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (defaultFigure) {
      const matched = matchHistoricalFigure(defaultFigure);
      setSelectedFigure(matched);
      setMessages([{
        sender: 'figure',
        text: currentLang === 'EN' ? matched.greetingEn : matched.greetingHi,
      }]);
    }
  }, [defaultFigure, currentLang]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const playVoice = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'HI' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    // Historical AI voice reply tailored to character
    setTimeout(() => {
      let reply = '';
      if (selectedFigure.id === 'shivaji') {
        reply = currentLang === 'EN'
          ? `Regarding "${userMsg}": Freedom and Swarajya are built upon righteousness, naval vigilance, and fortifying the motherland for future generations.`
          : `"${userMsg}" के संदर्भ में: स्वराज्य की नींव धर्म, नौसेना की सतर्कता और भावी पीढ़ियों के लिए मातृभूमि को सशक्त बनाने पर टिकी है।`;
      } else if (selectedFigure.id === 'lakshmibai') {
        reply = currentLang === 'EN'
          ? `Regarding "${userMsg}": We shall fight till our last breath! Bravery and unity will always shatter imperial tyranny.`
          : `"${userMsg}" के संदर्भ में: हम अंतिम सांस तक लड़ेंगे! मातृभूमि के स्वाभिमान की रक्षा में भय का कोई स्थान नहीं।`;
      } else if (selectedFigure.id === 'napoleon') {
        reply = currentLang === 'EN'
          ? `Regarding "${userMsg}": Victory belongs to the most persevering. Discipline, timing, and bold maneuver decide the destiny of empires.`
          : `"${userMsg}" के संदर्भ में: विजय उसी की होती है जो सबसे अधिक दृढ़ रहता है। अनुशासन और सही समय ही साम्राज्य का भाग्य तय करते हैं।`;
      } else if (selectedFigure.id === 'cleopatra') {
        reply = currentLang === 'EN'
          ? `Regarding "${userMsg}": True sovereign power is governed by intellect, diplomatic mastery, and navigating alliances with unwavering poise.`
          : `"${userMsg}" के संदर्भ में: संप्रभु सत्ता केवल सेनाओं से नहीं, बल्कि कूटनीति, तीक्ष्ण बुद्धि और गरिमापूर्ण संकल्प से चलाई जाती है।`;
      } else {
        reply = currentLang === 'EN'
          ? `Regarding "${userMsg}": History is written by those who dare to forge their own fate.`
          : `"${userMsg}" के संदर्भ में: इतिहास वही रचते हैं जो अपने भाग्य का निर्माण स्वयं करते हैं।`;
      }
      setMessages(prev => [...prev, { sender: 'figure', text: reply }]);
      playVoice(reply);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl bg-[#0D0D11] border border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[700px]"
        >
          
          {/* Left Column: Historical Figures Selector */}
          <div className="w-full md:w-80 bg-[#14141C] border-b md:border-b-0 md:border-r border-[#242434] p-4 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-cinzel text-base font-bold text-[#F8FAFC]">
                    {currentLang === 'EN' ? 'Talk to History' : 'इतिहास संवाद'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-extrabold text-[#D4AF37]">
                  AI VOICE
                </span>
              </div>

              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-3">
                {currentLang === 'EN' ? 'Select Historical Personality' : 'ऐतिहासिक व्यक्तित्व चुनें'}
              </span>

              {/* Figure Buttons */}
              <div className="space-y-2 max-h-[280px] md:max-h-[420px] overflow-y-auto pr-1">
                {HISTORICAL_FIGURES.map((fig) => {
                  const isSelected = selectedFigure.id === fig.id;
                  const name = currentLang === 'EN' ? fig.nameEn : fig.nameHi;
                  const title = currentLang === 'EN' ? fig.titleEn : fig.titleHi;

                  return (
                    <button
                      key={fig.id}
                      onClick={() => {
                        setSelectedFigure(fig);
                        setMessages([{
                          sender: 'figure',
                          text: currentLang === 'EN' ? fig.greetingEn : fig.greetingHi,
                        }]);
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#1B1B26] border border-[#D4AF37] text-[#FFF3C4] shadow-gold-glow'
                          : 'bg-[#0D0D11]/60 border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                      }`}
                    >
                      <img
                        src={fig.avatar}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold truncate text-[#F8FAFC]">{name}</h4>
                        <p className="text-[10px] text-[#64748B] truncate">{title}</p>
                        <span className="text-[9px] text-[#D4AF37] font-mono block mt-0.5">{fig.era}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#242434] text-[11px] text-[#64748B] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Voice synthesized from historical memoirs</span>
            </div>
          </div>

          {/* Right Column: Interactive Chat Interface */}
          <div className="flex-1 flex flex-col justify-between bg-[#0D0D11] p-4 sm:p-6 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#242434]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedFigure.avatar}
                    alt={selectedFigure.nameEn}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0D11] absolute bottom-0 right-0" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#F8FAFC]">
                    {currentLang === 'EN' ? selectedFigure.nameEn : selectedFigure.nameHi}
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
                <div
                  key={idx}
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
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        <span>Voice Output Active</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Input Field */}
            <div className="pt-2 border-t border-[#242434]">
              <div className="flex items-center gap-2 bg-[#14141C] p-2 rounded-2xl border border-[#242434] focus-within:border-[#D4AF37] transition-all">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-xl transition-colors ${
                    isRecording 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' 
                      : 'text-[#64748B] hover:text-[#D4AF37]'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    currentLang === 'EN'
                      ? `Ask ${selectedFigure.nameEn.split(' ')[0]} anything about their life or era...`
                      : `${selectedFigure.nameHi} से उनके जीवन या युग के बारे में कुछ भी पूछें...`
                  }
                  className="w-full bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none px-2"
                />

                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-xl bg-[#D4AF37] text-[#0D0D11] hover:bg-[#FFF3C4] font-bold transition-all shadow-gold-glow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

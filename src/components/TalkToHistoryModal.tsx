/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mic, Volume2, Send, Shield, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Figure {
  id: string;
  name: string;
  title: string;
  era: string;
  avatar: string;
  greetings: Record<string, string>;
}

const HISTORICAL_FIGURES: Figure[] = [
  {
    id: 'shivaji',
    name: 'Chhatrapati Shivaji Maharaj',
    title: 'Founder of the Maratha Empire',
    era: '1630 – 1680 AD · Deccan, India',
    avatar: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Greetings, traveler. I welcome you to Raigad. What query brings you to speak with the Chhatrapati?',
      HI: 'प्रणाम, यात्री। रायगढ़ में आपका स्वागत है। आप छत्रपति से क्या जानना चाहते हैं?',
      MR: 'जय शिवराय, प्रवाशा! रायगडावर आपले स्वागत आहे. आपण छत्रपतींशी कोणत्या विषयावर चर्चा करू इच्छिता?',
      GU: 'પ્રણામ, યાત્રી. રાયગઢમાં આપનું સ્વાગત છે. આપ છત્રપતિ સાથે શું ચર્ચા કરવા માંગો છો?',
      TE: 'నమస్కారం, యాత్రికుడా. రాయగఢ్‌కు స్వాగతం. మీరు ఛత్రపతితో ఏమి మాట్లాడాలనుకుంటున్నారు?',
      TA: 'வணக்கம், பயணியே! ராய்கட் கோட்டைக்கு உங்களை வரவேற்கிறேன். என்னுடன் என்ன பேச விரும்புகிறீர்கள்?',
      BN: 'নমস্কার, পরিব্রাজক। রায়গড়ে আপনাকে স্বাগত। আপনি ছত্রপতির সাথে কী আলোচনা করতে চান?',
    },
  },
  {
    id: 'lakshmibai',
    name: 'Rani Lakshmibai',
    title: 'Queen of Jhansi & Revolutionary Leader',
    era: '1828 – 1858 AD · Bundelkhand, India',
    avatar: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'I stand atop Jhansi ramparts. Speak swiftly — the battlements are alert, but I shall hear your voice.',
      HI: 'मैं झाँसी के प्राचीर पर खड़ी हूँ। शीघ्र कहें — हम अपनी झाँसी के आत्मसम्मान की रक्षा कर रहे हैं।',
      MR: 'मी झाशीच्या तटबंदीवर उभी आहे. बोला — आम्ही आमच्या झाशीच्या स्वातंत्र्यासाठी सज्ज आहोत.',
      GU: 'હું ઝાંસીના કિલ્લા પર ઊભી છું. બોલો — અમે ઝાંસીના સન્માન માટે લડી રહ્યા છીએ.',
      TE: 'నేను ఝాన్సీ కోట బురుజుపై నిలబడి ఉన్నాను. త్వరగా చెప్పండి — నేను మీ స్వరాన్ని వింటాను.',
      TA: 'நான் ஜான்சி கோட்டையின் கொத்தளத்தில் நிற்கிறேன். விரைவாகப் பேசுங்கள் — நான் கேட்கிறேன்.',
      BN: 'আমি ঝাঁসির প্রাচীরে দাঁড়িয়ে আছি। দ্রুত বলুন — আমি আপনার কথা শুনব।',
    },
  },
  {
    id: 'napoleon',
    name: 'Napoleon Bonaparte',
    title: 'Emperor of the French',
    era: '1769 – 1821 AD · France & Europe',
    avatar: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Impossible is a word found only in the dictionary of fools. Ask your question regarding strategy, law, or destiny.',
      HI: 'असंभव केवल मूर्खों के शब्दकोश में मिलने वाला शब्द है। रणनीति या साम्राज्य पर अपना प्रश्न पूछें।',
      MR: 'अशक्य हा शब्द केवळ मूर्खांच्या शब्दकोशात असतो. युद्धनीती किंवा साम्राज्याविषयी प्रश्न विचारा.',
      GU: 'અસંભવ શબ્દ માત્ર મૂર્ખાઓના શબ્દકોશમાં હોય છે. રણનીતિ અથવા શાસન પર આપનો પ્રશ્ન પૂછો.',
      TE: 'అసాధ్యం అనేది మూర్ఖుల నిఘంటువులో మాత్రమే ఉండే పదం. మీ ప్రశ్న అడగండి.',
      TA: 'இயலாது என்பது முட்டாள்களின் அகராதியில் மட்டுமே இருக்கும் சொல். உங்கள் கேள்வியைக் கேளுங்கள்.',
      BN: 'অসম্ভব শব্দটি কেবল বোকাদের অভিধানেই পাওয়া যায়। আপনার কৌশলগত প্রশ্ন করুন।',
    },
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra VII Philopator',
    title: 'Last Pharaoh of Ptolemaic Egypt',
    era: '69 – 30 BC · Alexandria, Egypt',
    avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Welcome to Alexandria. Step forward into the halls of the Ptolemies and speak with the Queen of Egypt.',
      HI: 'अलेक्जेंड्रिया में आपका स्वागत है। टॉलेमी वंश के दरबार में आगे आएं और मिस्र की रानी से बात करें।',
      MR: 'अलेक्झांड्रियामध्ये आपले स्वागत आहे. टॉलेमी दरबारात या आणि इजिप्तच्या राणीशी संवाद साधा.',
      GU: 'એલેક્ઝાન્ડ્રિયામાં આપનું સ્વાગત છે. ટોલેમી દરબારમાં આવો અને વાત કરો.',
      TE: 'అలెగ్జాండ్రియాకు స్వాగతం. ఈజిప్ట్ రాణితో ధైర్యంగా మాట్లాడండి.',
      TA: 'அலெக்ஸாண்ட்ரியாவுக்கு வரவேற்கிறேன். எகிப்தின் ராணியுடன் உரையாடுங்கள்.',
      BN: 'আলেকজান্দ্রিয়ায় আপনাকে স্বাগত। মিসরের রানীর সাথে কথা বলুন।',
    },
  },
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    title: 'Apostle of Non-Violence (Ahimsa)',
    era: '1869 – 1948 AD · India',
    avatar: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Namaste, my friend. Truth and non-violence are my guideposts. What thoughts wish you to share today?',
      HI: 'नमस्ते मित्र। सत्य और अहिंसा मेरे मार्गदर्शक हैं। आज आप कौन से विचार साझा करना चाहते हैं?',
      MR: 'नमस्कार मित्रा! सत्य आणि अहिंसा ही माझी जीवनसूत्रे आहेत. आज आपण काय विचारू इच्छिता?',
      GU: 'નમસ્તે મિત્ર. સત્ય અને અહિંસા મારા માર્ગદર્શક છે. આજે આપ શું વિચારવા માંગો છો?',
      TE: 'నమస్కారం మిత్రమా. సత్యం మరియు అహింస నా మార్గదర్శకాలు. ఏమి చర్చించాలనుకుంటున్నారు?',
      TA: 'வணக்கம் நண்பரே! வாய்மையும் அகிம்சையுமே எனது வழிகாட்டிகள். உங்கள் எண்ணங்களைப் பகிருங்கள்.',
      BN: 'নমস্কার বন্ধু। সত্য ও অহিংসা আমার পাথেয়। আজ আপনি কী বলতে চান?',
    },
  },
  {
    id: 'french_revolution',
    name: 'Maximilien Robespierre',
    title: 'Voice of the French Republic',
    era: '1758 – 1794 AD · Paris, France',
    avatar: 'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Citizens of the future, welcome to Paris. What principles of the Republic and the Revolution do you wish to examine?',
      HI: 'भविष्य के नागरिकों, पेरिस में आपका स्वागत है। गणतंत्र और स्वतंत्रता के किन सिद्धांतों पर आप चर्चा करना चाहते हैं?',
      MR: 'भविष्यातील नागरिकांनो, पॅरिसमध्ये आपले स्वागत आहे. प्रजासत्ताक आणि स्वातंत्र्याबद्दल काय विचारू इच्छिता?',
      GU: 'ભવિષ્યના નાગરિકો, પેરિસમાં આપનું સ્વાગત છે. ગણતંત્રના સિદ્ધાંતો પર આપ શું જાણવા માંગો છો?',
      TE: 'భవిష్యత్తు పౌరులారా, ప్యారిస్‌కు స్వాగతం. గణతంత్ర సూత్రాలపై ఏమి మాట్లాడాలనుకుంటున్నారు?',
      TA: 'எதிர்கால குடிமக்களே, பாரிசுக்கு வரவேற்கிறேன். குடியரசு கொள்கைகள் பற்றி என்ன பேச விரும்புகிறீர்கள்?',
      BN: 'ভবিষ্যতের নাগরিকরা, প্যারিসে স্বাগত। প্রজাতন্ত্র ও স্বাধীনতার আদর্শ নিয়ে কী জানতে চান?',
    },
  },
  {
    id: 'armstrong',
    name: 'Neil Armstrong',
    title: 'Apollo 11 Commander & Lunar Explorer',
    era: '1930 – 2012 AD · United States / Sea of Tranquility',
    avatar: 'https://images.unsplash.com/photo-1517976487502-d596bf71b312?q=80&w=200&auto=format&fit=crop',
    greetings: {
      EN: 'Tranquility Base here. The Eagle has landed. What coordinates of the lunar voyage would you like to explore?',
      HI: 'ट्रैंक्विलिटी बेस से नमस्कार। ईगल उतर चुका है। चंद्र यात्रा के किन पहलुओं पर आप चर्चा करना चाहते हैं?',
      MR: 'ट्रॅंक्विलिटी बेसवरून नमस्कार. ईगल चंद्रावर उतरले आहे. चांद्र मोहिमेबद्दल काय जाणून घ्यायचे आहे?',
      GU: 'ટ્રેન્ક્વિલિટી બેઝથી નમસ્તે. ઈગલ ઉતરી ચૂક્યું છે. ચંદ્ર યાત્રા વિશે આપ શું જાણવા માંગો છો?',
      TE: 'ట్రాంక్విలిటీ బేస్ నుండి నమస్కారం. చంద్రయానం గురించి ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
      TA: 'டிரான்குவிலிட்டி தளத்திலிருந்து வணக்கம். நிலவுப் பயணம் பற்றி என்ன விவாதிக்க விரும்புகிறீர்கள்?',
      BN: 'ট্র্যাঙ্কুইলিটি বেস থেকে স্বাগত। চাঁদের অভিযান সম্পর্কে আপনি কী জানতে চান?',
    },
  },
];

const SUGGESTED_QUESTIONS = [
  'What did you see here?',
  'What happened next?',
  'Why was this decision important?',
  'How did people react?',
];

const matchHistoricalFigure = (query?: string): Figure => {
  if (!query) return HISTORICAL_FIGURES[0];
  const q = query.toLowerCase();
  if (q.includes('shivaji') || q.includes('maratha') || q.includes('raigad') || q.includes('swarajya')) return HISTORICAL_FIGURES[0];
  if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) return HISTORICAL_FIGURES[1];
  if (q.includes('napoleon') || q.includes('bonaparte') || q.includes('waterloo')) return HISTORICAL_FIGURES[2];
  if (q.includes('cleopatra') || q.includes('egypt') || q.includes('alexandria') || q.includes('pharaoh')) return HISTORICAL_FIGURES[3];
  if (q.includes('gandhi') || q.includes('dandi') || q.includes('salt') || q.includes('satyagraha')) return HISTORICAL_FIGURES[4];
  if (q.includes('french') || q.includes('bastille') || q.includes('revolution') || q.includes('robespierre')) return HISTORICAL_FIGURES[5];
  if (q.includes('apollo') || q.includes('armstrong') || q.includes('moon') || q.includes('lunar') || q.includes('space')) return HISTORICAL_FIGURES[6];
  return HISTORICAL_FIGURES[0];
};

import { getSuggestedQuestions, getBestVoiceForLanguage } from '@/lib/multilingual';

interface TalkToHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFigure?: string;
  initialTopic?: string;
  initialFigureId?: string;
  historicalContext?: string;
}

export default function TalkToHistoryModal({ 
  isOpen, 
  onClose, 
  defaultFigure, 
  initialTopic, 
  initialFigureId,
  historicalContext,
}: TalkToHistoryModalProps) {
  const { currentLang, languageInfo } = useLanguage();
  const figureQuery = defaultFigure || initialTopic || initialFigureId;
  const [selectedFigure, setSelectedFigure] = useState<Figure>(() => matchHistoricalFigure(figureQuery));
  
  const getGreeting = (fig: Figure) => {
    return fig.greetings[currentLang] || fig.greetings.EN;
  };

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'figure'; text: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [playingMsgIdx, setPlayingMsgIdx] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync selected figure on query change or open
  useEffect(() => {
    if (isOpen && figureQuery) {
      const matched = matchHistoricalFigure(figureQuery);
      setSelectedFigure(matched);
      setMessages([{
        sender: 'figure',
        text: getGreeting(matched),
      }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, figureQuery, currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up speech synthesis on close
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/talk-to-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figureId: selectedFigure.id,
          figureName: selectedFigure.name,
          message: text,
          language: languageInfo.code,
          historicalContext: historicalContext || undefined,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const replyText = data.reply || getGreeting(selectedFigure);
      setMessages((prev) => [...prev, { sender: 'figure', text: replyText }]);

      // Voice read with strict language voice matching (no silent English fallback!)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const langPrefix = languageInfo.ttsLocale.split('-')[0].toLowerCase();
        const voice = getBestVoiceForLanguage(languageInfo.code, languageInfo.ttsLocale);

        if (voice || langPrefix === 'en') {
          const utterance = new SpeechSynthesisUtterance(replyText);
          utterance.lang = languageInfo.ttsLocale;
          if (voice) utterance.voice = voice;
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'figure',
          text: getGreeting(selectedFigure),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakMessage = (text: string, idx: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (playingMsgIdx === idx) {
        window.speechSynthesis.cancel();
        setPlayingMsgIdx(null);
        return;
      }

      window.speechSynthesis.cancel();
      const langPrefix = languageInfo.ttsLocale.split('-')[0].toLowerCase();
      const voice = getBestVoiceForLanguage(languageInfo.code, languageInfo.ttsLocale);

      if (!voice && langPrefix !== 'en') {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageInfo.ttsLocale;
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingMsgIdx(null);
      utterance.onerror = () => setPlayingMsgIdx(null);
      window.speechSynthesis.speak(utterance);
      setPlayingMsgIdx(idx);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-5xl h-[85vh] max-h-[780px] rounded-3xl bg-[#0D0D11] border border-[#242434] shadow-[0_0_60px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row relative"
        >
          {/* Left Column: Figures List */}
          <div className="w-full md:w-80 bg-[#14141C] border-b md:border-b-0 md:border-r border-[#242434] p-4 sm:p-5 flex flex-col shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-[#242434] mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-cinzel text-sm font-bold text-[#F8FAFC]">
                  TALK TO HISTORY
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-[9px] font-mono font-bold text-purple-300">
                AI RECONSTRUCTION
              </span>
            </div>

            <p className="text-[11px] text-[#94A3B8] mb-3 leading-relaxed">
              Engage with historical witnesses grounded in primary records and period correspondence.
            </p>

            {/* Figures Roster */}
            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
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
                        text: getGreeting(fig),
                      }]);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#1B1B26] border border-[#D4AF37]/60 text-[#FFF3C4] shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                        : 'bg-[#0D0D11]/60 border border-[#242434] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Image
                      src={fig.avatar}
                      alt={fig.name}
                      width={38}
                      height={38}
                      className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                    />
                    <div className="overflow-hidden min-w-0">
                      <h4 className="text-xs font-bold truncate text-[#F8FAFC]">{fig.name}</h4>
                      <p className="text-[10px] text-[#64748B] truncate">{fig.title}</p>
                      <span className="text-[9px] text-[#D4AF37] font-mono block mt-0.5 truncate">{fig.era}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Feed & Controls */}
          <div className="flex-1 flex flex-col justify-between bg-[#0D0D11] p-4 sm:p-6 relative overflow-hidden">
            
            {/* Header with Active Persona Details & Close */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#242434]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={selectedFigure.avatar}
                    alt={selectedFigure.name}
                    width={44}
                    height={44}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0D11] absolute bottom-0 right-0" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F8FAFC]">
                      {selectedFigure.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/40 text-[9px] font-mono font-bold text-purple-300">
                      AI RECONSTRUCTION
                    </span>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] font-mono block">{selectedFigure.title} · {selectedFigure.era}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#14141C] border border-[#242434] hover:border-[#D4AF37]/50 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 my-1 pr-1 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                      msg.sender === 'user'
                        ? 'bg-[#D4AF37] text-[#0D0D11] font-semibold rounded-tr-none shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#14141C] border border-[#242434] text-[#E2E8F0] font-serif italic rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'figure' && (
                      <button
                        onClick={() => handleSpeakMessage(msg.text, idx)}
                        className="absolute -right-8 top-2 p-1.5 rounded-lg bg-[#1B1B26] border border-[#242434] text-[#94A3B8] hover:text-[#D4AF37] transition-colors opacity-0 group-hover:opacity-100"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#14141C] border border-[#242434] p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-[#D4AF37] font-mono">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>
                      {currentLang === 'HI' ? 'साक्षी बोल रहे हैं...' :
                       currentLang === 'MR' ? 'ऐतिहासिक साक्षी बोलत आहेत...' :
                       currentLang === 'TE' ? 'చారిత్రక సాక్షి మాట్లాడుతున్నారు...' :
                       currentLang === 'GU' ? 'સાક્ષી બોલી રહ્યા છે...' :
                       currentLang === 'TA' ? 'வரலாற்று சாட்சி பேசுகிறார்...' :
                       currentLang === 'BN' ? 'ঐতিহাসিক সাক্ষী বলছেন...' :
                       'Witness is speaking...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="pt-2 border-t border-[#242434] mb-2">
              <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                <HelpCircle className="w-3 h-3 text-[#D4AF37]" />
                <span>
                  {currentLang === 'HI' ? 'सुझाए गए ऐतिहासिक प्रश्न:' :
                   currentLang === 'MR' ? 'सुचवलेले ऐतिहासिक प्रश्न:' :
                   currentLang === 'TE' ? 'సూచించిన చారిత్రక ప్రశ్నలు:' :
                   currentLang === 'GU' ? 'સૂચવેલા ઐતિહાસિક પ્રશ્નો:' :
                   currentLang === 'TA' ? 'பரிந்துரைக்கப்பட்ட வரலாற்று கேள்விகள்:' :
                   currentLang === 'BN' ? 'প্রস্তাবিত ঐতিহাসিক প্রশ্ন:' :
                   'Suggested Historical Inquiries:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {getSuggestedQuestions(currentLang).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg bg-[#14141C] hover:bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/50 text-[11px] text-[#94A3B8] hover:text-[#F8FAFC] transition-all disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                handleSendMessage(); 
              }}
              className="flex items-center gap-2 bg-[#14141C] border border-[#242434] rounded-2xl p-1.5 focus-within:border-[#D4AF37]/60 transition-all"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  currentLang === 'HI' ? `${selectedFigure.name} से इस क्षण के बारे में पूछें...` :
                  currentLang === 'MR' ? `${selectedFigure.name} यांना या क्षणाबद्दल विचारा...` :
                  currentLang === 'TE' ? `${selectedFigure.name} ను ఈ ఘట్టం గురించి అడగండి...` :
                  currentLang === 'GU' ? `${selectedFigure.name} ને આ ક્ષણ વિશે પૂછો...` :
                  currentLang === 'TA' ? `${selectedFigure.name} அவர்களிடம் கேளுங்கள்...` :
                  currentLang === 'BN' ? `${selectedFigure.name}-কে এই মুহূর্ত সম্পর্কে জিজ্ঞাসা করুন...` :
                  `Ask ${selectedFigure.name} about this moment...`
                }
                disabled={isLoading}
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none font-medium"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFF3C4] text-[#0A0A0E] transition-all disabled:opacity-40 disabled:hover:bg-[#D4AF37]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

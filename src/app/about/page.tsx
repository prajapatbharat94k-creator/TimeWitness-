'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Info, 
  Hourglass, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Heart, 
  ArrowRight,
  Landmark
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AboutPage() {
  const { currentLang } = useApp();

  return (
    <div className="min-h-screen pb-24">
      
      {/* Header */}
      <section className="relative py-16 sm:py-24 border-b border-[#242434] bg-radial-gradient overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
            <Info className="w-3.5 h-3.5" />
            <span>{currentLang === 'EN' ? 'Archival Philosophy & Mission' : 'अभिलेखागार दर्शन एवं उद्देश्य'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC]">
            {currentLang === 'EN' ? 'ABOUT TIMEWITNESS' : 'टाइमविटनेस परिचय'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {currentLang === 'EN'
              ? 'We believe history should not be trapped in static textbooks. It should be witnessed as lived, breathing reality.'
              : 'हमारा विश्वास है कि इतिहास केवल धूल भरी किताबों में बंद नहीं होना चाहिए, बल्कि इसे जीवंत अनुभूति के रूप में देखा जाना चाहिए।'}
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        <div className="bg-[#14141C] rounded-3xl p-6 sm:p-10 border border-[#242434] space-y-6 text-[#CBD5E1] text-sm sm:text-base leading-relaxed">
          <h2 className="font-cinzel text-2xl font-bold text-[#FFF3C4]">
            {currentLang === 'EN' ? 'The Vision: The Boots of the Historical Observer' : 'हमारा दृष्टिकोण: इतिहास के प्रत्यक्षदर्शी के रूप में'}
          </h2>
          <p>
            {currentLang === 'EN'
              ? 'TimeWitness was engineered to solve a fundamental problem with how humans learn history: detachment. When we read a date like "June 6, 1674" or "July 14, 1789", the human heartbeat behind those moments is easily lost.'
              : 'टाइमविटनेस का निर्माण इतिहास सीखने की मूलभूत समस्या को दूर करने के लिए किया गया था: दूरी। जब हम कोई तिथि पढ़ते हैं, तो उन क्षणों के पीछे की मानवीय धड़कन खो जाती है।'}
          </p>
          <p>
            {currentLang === 'EN'
              ? 'By blending primary historical records from Supabase and Wikipedia with Google Gemini 2.0 Flash structured JSON modeling, TimeWitness reconstructs moments from the ground up: the smell of rain on fort ramparts, the clamor of crowds in the Agora, the hush before cannon fire, and the philosophical dilemmas faced by monarchs and revolutionaries.'
              : 'सुपरबेस और विकिपीडिया के प्राथमिक अभिलेखों को जेमिनी 2.0 फ्लैश के साथ जोड़कर, टाइमविटनेस इतिहास को प्रामाणिकता के साथ साकार करता है।'}
          </p>
        </div>

        {/* Dual Pillar: India & World */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-[#242434] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase">
              <Landmark className="w-4 h-4" />
              <span>Indian Civilizational Heritage</span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? '5,000+ Years of Continuum' : '5,000+ वर्षों की निरंतरता'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {currentLang === 'EN'
                ? 'From Harappan grid cities to Ashoka\'s Dharma edicts, Shivaji Maharaj\'s Swarajya, and the modern constitutional democratic journey.'
                : 'हड़प्पा की योजनाबद्ध सभ्यता से लेकर अशोक के शिलालेख, शिवाजी महाराज के स्वराज्य और आधुनिक संविधान तक।'}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-[#242434] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase">
              <Globe className="w-4 h-4" />
              <span>Global Human Epochs</span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8FAFC]">
              {currentLang === 'EN' ? 'World History Crossroads' : 'विश्व इतिहास के चौराहे'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {currentLang === 'EN'
                ? 'Ancient Egypt, Roman legions, Renaissance masterworks, democratic revolutions, world wars, and humanity\'s first footprint on the Moon.'
                : 'प्राचीन मिस्र, रोमन साम्राज्य, पुनर्जागरण, क्रांतियां, विश्व युद्ध और चंद्रमा पर मानव के प्रथम कदम।'}
            </p>
          </div>
        </div>

        {/* Archival Ethics Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1B1B26] border border-[#D4AF37]/40 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-cinzel font-bold text-[#FFF3C4]">
              {currentLang === 'EN' ? 'Archival Ethics & Neutrality' : 'अभिलेखीय नैतिकता एवं निष्पक्षता'}
            </h4>
            <p className="text-[#94A3B8] leading-relaxed">
              {currentLang === 'EN'
                ? 'TimeWitness avoids modern anachronisms, sensationalism, and caricature. Persona dialogues maintain period-appropriate perspective while adhering to strict safety and educational guidelines.'
                : 'टाइमविटनेस आधुनिक पूर्वाग्रहों और अतिरंजना से बचते हुए प्राथमिक ऐतिहासिक संदर्भ का सम्मान करता है।'}
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-cinzel font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{currentLang === 'EN' ? 'Explore the Global Archives' : 'वैश्विक अभिलेखागार खोजें'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

    </div>
  );
}

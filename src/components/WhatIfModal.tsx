'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, GitBranch, ShieldCheck, Sparkles, CheckCircle2, 
  ShieldAlert, BookOpen 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedCounterfactuals, BranchScenario, getLocalizedTopicTitle } from '@/lib/multilingual';

interface WhatIfModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  sceneTitle?: string;
  era?: string;
}

export default function WhatIfModal({
  isOpen,
  onClose,
  searchQuery,
  sceneTitle,
  era,
}: WhatIfModalProps) {
  const { currentLang } = useLanguage();
  const scenarios = useMemo(
    () => getLocalizedCounterfactuals(searchQuery, currentLang),
    [searchQuery, currentLang]
  );
  const [selectedBranch, setSelectedBranch] = useState<BranchScenario>(scenarios[0]);

  useEffect(() => {
    if (scenarios.length > 0) {
      setSelectedBranch(scenarios[0]);
    }
  }, [scenarios]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Localized UI strings
  const labels = {
    engine: currentLang === 'HI' ? 'काल्पनिक इतिहास इंजन' :
            currentLang === 'MR' ? 'पर्यायी इतिहास इंजिन' :
            currentLang === 'TE' ? 'ప్రత్యామ్నాయ కాలరేఖ ఇంజిన్' :
            currentLang === 'GU' ? 'કાલ્પનિક ઇતિહાસ એન્જિન' :
            currentLang === 'TA' ? 'மாற்று வரலாற்று இயந்திரம்' :
            currentLang === 'BN' ? 'বিকল্প সময়রেখা ইঞ্জিন' :
            'COUNTERFACTUAL ENGINE',

    title: currentLang === 'HI' ? 'क्या होता अगर? वैकल्पिक इतिहास सिमुलेशन' :
           currentLang === 'MR' ? 'काय झाले असते तर? पर्यायी कालरेषा सिम्युलेशन' :
           currentLang === 'TE' ? 'ఒకవేళ జరిగితే? ప్రత్యామ్నాయ కాలరేఖ సిమ్యులేషన్' :
           currentLang === 'GU' ? 'શું થયું હોत જો? કાલ્પનિક સમયરેખા સિમ્યુલેશન' :
           currentLang === 'TA' ? 'ஒருவேளை நடந்திருந்தால்? மாற்று வரலாற்று உருவகப்படுத்துதல்' :
           currentLang === 'BN' ? 'কী হতে পারত যদি? বিকল্প সময়রেখা সিমুলেশন' :
           'What If? Divergent Timeline Simulation',

    disclosure: currentLang === 'HI' ? 'पद्धति संबंधी प्रकटीकरण: काल्पनिक इतिहास ऐतिहासिक कार्य-कारण संबंधों की जांच करने का एक विश्लेषणात्मक उपकरण है। यह सिमुलेशन प्रमाणित ऐतिहासिक तथ्यों से स्पष्ट रूप से अलग है।' :
                currentLang === 'MR' ? 'पद्धतीविषयक खुलासा: पर्यायी इतिहास हे कार्यकारणभाव तपासण्याचे विश्लेषणात्मक साधन आहे. हे सिम्युलेशन प्रमाणित ऐतिहासिक तथ्यांपेक्षा वेगळे ठेवले आहे.' :
                currentLang === 'TE' ? 'పద్ధతి ప్రకటన: ప్రత్యామ్నాయ చరిత్ర అనేది కారణాలను పరీక్షించే విశ్లేషణాత్మక సాధనం. ఈ సిమ్యులేషన్లు ధృవీకరించిన వాస్తవాల నుండి ప్రత్యేకించబడ్డాయి.' :
                currentLang === 'GU' ? 'પદ્ધતિ વિષયક ખુલાસો: કાલ્પનિક ઇતિહાસ એ કારણ અને પરિણામ ચકાસવાનું વિશ્લેષણાત્મક સાધન છે. આ સિમ્યુલેશન પ્રમાણિત તથ્યોથી અલગ છે.' :
                currentLang === 'TA' ? 'முறைமை அறிவிப்பு: மாற்று வரலாறு என்பது வரலாற்று காரண காரியங்களை ஆராயும் ஒரு கருவி. இந்த உருவகப்படுத்துதல்கள் உண்மையான ஆவணங்களிலிருந்து வேறுபட்டவை.' :
                currentLang === 'BN' ? 'পদ্ধতিগত প্রকাশ: বিকল্প ইতিহাস হলো কার্যকারণ বিশ্লেষণের একটি তাত্ত্বিক অনুসন্ধান। এই সিমুলেশনটি সংরক্ষিত ঐতিহাসিক সত্য থেকে সম্পূর্ণ পৃথক।' :
                'Methodological Disclosure: Counterfactual history is a speculative analytical tool to test causality and structural factors. Simulations explore alternate branches and are strictly separated from verified documentary facts.',

    activeCoordinate: currentLang === 'HI' ? 'सक्रिय ऐतिहासिक घटना' :
                      currentLang === 'MR' ? 'सक्रिय ऐतिहासिक नोंद' :
                      currentLang === 'TE' ? 'ప్రస్తుత చారిత్రక అంశం' :
                      currentLang === 'GU' ? 'સક્રિય ઐતિહાસિક વિષય' :
                      currentLang === 'TA' ? 'செயலில் உள்ள வரலாற்று நிகழ்வு' :
                      currentLang === 'BN' ? 'সক্রিয় ঐতিহাসিক অধ্যায়' :
                      'Active Coordinate',

    selectScenario: currentLang === 'HI' ? 'वैकल्पिक इतिहास परिदृश्य चुनें:' :
                    currentLang === 'MR' ? 'पर्यायी इतिहास प्रसंग निवडा:' :
                    currentLang === 'TE' ? 'ప్రత్యామ్నాయ దృష్టాంతాన్ని ఎంచుకోండి:' :
                    currentLang === 'GU' ? 'વૈકલ્પિક પરિદ્રશ્ય પસંદ કરો:' :
                    currentLang === 'TA' ? 'மாற்று சூழ்நிலையைத் தேர்ந்தெடுக்கவும்:' :
                    currentLang === 'BN' ? 'বিকল্প পরিস্থিতি নির্বাচন করুন:' :
                    'Select Divergence Scenario:',

    branch: currentLang === 'HI' ? 'शाखा' :
            currentLang === 'MR' ? 'पर्याय' :
            currentLang === 'TE' ? 'శాఖ' :
            currentLang === 'GU' ? 'શાખા' :
            currentLang === 'TA' ? 'பிரிவு' :
            currentLang === 'BN' ? 'শাখা' :
            'BRANCH',

    historicalRecord: currentLang === 'HI' ? 'ऐतिहासिक साक्ष्य' :
                      currentLang === 'MR' ? 'प्रमाणित इतिहास' :
                      currentLang === 'TE' ? 'చారిత్రక రికార్డు' :
                      currentLang === 'GU' ? 'ઐતિહાસિક દસ્તાવેજ' :
                      currentLang === 'TA' ? 'வரலாற்றுப் பதிவு' :
                      currentLang === 'BN' ? 'ঐতিহাসিক প্রমাণ' :
                      'HISTORICAL RECORD',

    whatActuallyHappened: currentLang === 'HI' ? 'वास्तव में क्या हुआ था' :
                          currentLang === 'MR' ? 'प्रत्यक्षात काय घडले होते' :
                          currentLang === 'TE' ? 'వాస్తవానికి ఏమి జరిగింది' :
                          currentLang === 'GU' ? 'વાસ્તવમાં શું બન્યું હતું' :
                          currentLang === 'TA' ? 'உண்மையில் என்ன நடந்தது' :
                          currentLang === 'BN' ? 'প্রকৃতপক্ষে কী ঘটেছিল' :
                          'What Actually Happened',

    simulation: currentLang === 'HI' ? 'सिमुलेशन' :
                currentLang === 'MR' ? 'सिम्युलेशन' :
                currentLang === 'TE' ? 'సిమ్యులేషన్' :
                currentLang === 'GU' ? 'સિમ્યુલેશન' :
                currentLang === 'TA' ? 'உருவகப்படுத்துதல்' :
                currentLang === 'BN' ? 'সিমুলেশন' :
                'SIMULATION',

    whatMightHaveHappened: currentLang === 'HI' ? 'क्या हो सकता था यदि:' :
                           currentLang === 'MR' ? 'काय घडू शकले असते जर:' :
                           currentLang === 'TE' ? 'ఒకవేళ ఇలా జరిగి ఉంటే:' :
                           currentLang === 'GU' ? 'શું બની શક્યું હોત જો:' :
                           currentLang === 'TA' ? 'ஒருவேளை இப்படி நடந்திருந்தால்:' :
                           currentLang === 'BN' ? 'কী ঘটতে পারত যদি:' :
                           'What Might Have Happened If:',

    analysis: currentLang === 'HI' ? 'इतिहासशास्त्रीय विश्लेषण' :
              currentLang === 'MR' ? 'इतिहासशास्त्रीय विश्लेषण' :
              currentLang === 'TE' ? 'చారిత్రక విశ్లేషణ' :
              currentLang === 'GU' ? 'ઇતિહાસશાસ્ત્રીય વિશ્લેષણ' :
              currentLang === 'TA' ? 'வரலாற்று ஆய்வு' :
              currentLang === 'BN' ? 'ঐতিহাসিক কার্যকারণ বিশ্লেষণ' :
              'Historiographical Analysis',

    returnButton: currentLang === 'HI' ? 'प्राथमिक अभिलेख पर वापस जाएं' :
                  currentLang === 'MR' ? 'मूळ ऐतिहासिक नोंदीवर परत जा' :
                  currentLang === 'TE' ? 'ప్రాథమిక రికార్డుకు తిరిగి వెళ్ళండి' :
                  currentLang === 'GU' ? 'મૂળ દસ્તાવેજ પર પાછા ફરો' :
                  currentLang === 'TA' ? 'முதன்மைப் பதிவுக்குத் திரும்பு' :
                  currentLang === 'BN' ? 'মূল ঐতিহাসিক রেকর্ডে ফিরে যান' :
                  'Return to Primary Record',
  };

  const localizedSubject = getLocalizedTopicTitle(searchQuery, currentLang);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0D0D11] border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.18)] overflow-hidden flex flex-col relative"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#14141C] border-b border-[#242434] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                    {labels.engine}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] hidden sm:inline">{era || 'Historical Timeline'}</span>
                </div>
                <h2 className="text-base sm:text-xl font-cinzel font-bold text-[#F8FAFC]">
                  {labels.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#0A0A0E] border border-[#242434] hover:border-purple-500/50 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
            {/* Methodological Disclosure Notice */}
            <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/30 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-xs text-purple-200 leading-relaxed">
                {labels.disclosure}
              </p>
            </div>

            {/* Active Subject */}
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                {labels.activeCoordinate}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F8FAFC]">
                {localizedSubject} {sceneTitle ? `— ${sceneTitle}` : ''}
              </h3>
            </div>

            {/* Branch Selection Selector */}
            <div>
              <span className="text-xs font-semibold text-[#94A3B8] block mb-2.5">
                {labels.selectScenario}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {scenarios.map((branch, idx) => {
                  const isSelected = selectedBranch?.id === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-purple-900/25 border-purple-500 text-[#FFF3C4] shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                          : 'bg-[#14141C] border-[#242434] text-[#94A3B8] hover:border-purple-500/40 hover:text-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-mono text-purple-400 font-bold">
                          {labels.branch} 0{idx + 1}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                      </div>
                      <h4 className="font-cinzel font-bold text-xs sm:text-sm text-[#F8FAFC] line-clamp-2">
                        {branch.title}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Strict Separation: Historical Record vs Simulation */}
            {selectedBranch && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* 1. HISTORICAL RECORD */}
                <div className="p-5 rounded-2xl bg-[#0A0A0E] border border-emerald-500/40 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-emerald-400">
                      {labels.historicalRecord}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wide mb-1">
                      {labels.whatActuallyHappened}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {selectedBranch.actualHistory}
                    </p>
                  </div>
                </div>

                {/* 2. SIMULATION */}
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/40 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-purple-500/20">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-purple-400">
                      {labels.simulation}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wide mb-1">
                      {labels.whatMightHaveHappened}
                    </h4>
                    <p className="text-xs text-purple-300 font-medium italic mb-2">
                      &quot;{selectedBranch.divergencePoint}&quot;
                    </p>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {selectedBranch.simulatedOutcome}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Historiographical Analysis Note */}
            {selectedBranch && (
              <div className="bg-[#14141C] border border-[#242434] rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                    {labels.analysis}
                  </span>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {selectedBranch.historiographicalNote}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-[#14141C] border-t border-[#242434] flex items-center justify-between text-xs text-[#64748B]">
            <span>TimeWitness Counterfactual Simulation Framework</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#0A0A0E] hover:bg-[#1B1B26] border border-[#242434] text-[#F8FAFC] font-bold transition-colors"
            >
              {labels.returnButton}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

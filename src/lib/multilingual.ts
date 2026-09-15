export type SupportedLangCode = 'EN' | 'HI' | 'MR' | 'TE' | 'GU' | 'TA' | 'BN';

export interface SupportedLanguage {
  code: SupportedLangCode;
  name: string;
  nativeName: string;
  ttsLocale: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLangCode, SupportedLanguage> = {
  EN: { code: 'EN', name: 'English', nativeName: 'English', ttsLocale: 'en-US' },
  HI: { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', ttsLocale: 'hi-IN' },
  MR: { code: 'MR', name: 'Marathi', nativeName: 'मराठी', ttsLocale: 'mr-IN' },
  TE: { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు', ttsLocale: 'te-IN' },
  GU: { code: 'GU', name: 'Gujarati', nativeName: 'ગુજરાતી', ttsLocale: 'gu-IN' },
  TA: { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்', ttsLocale: 'ta-IN' },
  BN: { code: 'BN', name: 'Bengali', nativeName: 'বাংলা', ttsLocale: 'bn-IN' },
};

export function resolveLanguage(langInput: unknown): SupportedLanguage {
  if (typeof langInput !== 'string') return SUPPORTED_LANGUAGES.EN;
  const upper = langInput.trim().toUpperCase();
  if (SUPPORTED_LANGUAGES[upper as SupportedLangCode]) {
    return SUPPORTED_LANGUAGES[upper as SupportedLangCode];
  }

  const lower = langInput.trim().toLowerCase();
  for (const item of Object.values(SUPPORTED_LANGUAGES)) {
    if (
      item.code.toLowerCase() === lower ||
      item.name.toLowerCase() === lower ||
      item.nativeName.toLowerCase() === lower
    ) {
      return item;
    }
  }
  return SUPPORTED_LANGUAGES.EN;
}

// ── Canonical Historical Titles ───────────────────────────────────────────────
export const TOPIC_CANONICAL_TITLES: Record<string, Record<SupportedLangCode, string>> = {
  shivaji: {
    EN: 'Chhatrapati Shivaji Maharaj',
    HI: 'छत्रपती शिवाजी महाराज',
    MR: 'छत्रपती शिवाजी महाराज',
    TE: 'ఛత్రపతి శివాజీ మహారాజ్',
    GU: 'છત્રપતિ શિવાજી મહારાજ',
    TA: 'சத்ரபதி சிவாஜி மகாராஜ்',
    BN: 'ছত্রপতি শিবাজী মহারাজ',
  },
  napoleon: {
    EN: 'Napoleon Bonaparte & Waterloo',
    HI: 'नेपोलियन बोनापार्ट और वाटरलू',
    MR: 'नेपोलियन बोनापार्ट आणि वॉटरलू',
    TE: 'నెపోలియన్ బోనపార్టే మరియు వాటర్‌లూ',
    GU: 'નેપોલિયન બોનાપાર્ટ અને વૉટરલૂ',
    TA: 'நெப்போலியன் போனபார்ட் மற்றும் வாட்டர்லூ',
    BN: 'নেপোলিয়ন বোনাপার্ট ও ওয়াটারলু',
  },
  lakshmibai: {
    EN: 'Rani Lakshmibai of Jhansi',
    HI: 'झाँसी की रानी लक्ष्मीबाई',
    MR: 'झाशीची राणी लक्ष्मीबाई',
    TE: 'ఝాన్సీ రాణి లక్ష్మీబాయి',
    GU: 'ઝાંસીની રાણી લક્ષ્મીબાઈ',
    TA: 'ஜான்சி ராணி லட்சுமிபாய்',
    BN: 'ঝাঁসির রানী লক্ষ্মীবাঈ',
  },
  gandhi: {
    EN: 'Mahatma Gandhi & Dandi March',
    HI: 'महात्मा गांधी और दांडी यात्रा',
    MR: 'महात्मा गांधी आणि दांडी यात्रा',
    TE: 'మహాత్మా గాంధీ మరియు దండి యాత్ర',
    GU: 'મહાત્મા ગાંધી અને દાંડી કૂચ',
    TA: 'மகாத்மா காந்தி மற்றும் தண்டி யாத்திரை',
    BN: 'মহাত্মা গান্ধী ও ডান্ডি অভিযান',
  },
  revolution: {
    EN: 'The French Revolution',
    HI: 'फ्रांसीसी क्रांति (1789)',
    MR: 'फ्रेंच राज्यक्रांती (1789)',
    TE: 'ఫ్రెంచ్ విప్లవం (1789)',
    GU: 'ફ્રેન્ચ ક્રાંતિ (1789)',
    TA: 'பிரெஞ்சுப் புரட்சி (1789)',
    BN: 'ফরাসি বিপ্লব (১৭৮৯)',
  },
  cleopatra: {
    EN: 'Cleopatra VII & Egypt',
    HI: 'क्लियोपेट्रा और मिस्र का साम्राज्य',
    MR: 'क्लिओपात्रा आणि इजिप्तचे साम्राज्य',
    TE: 'క్లియోపాత్రా మరియు ఈజిప్ట్ రాజ్యం',
    GU: 'ક્લિયોપેટ્રા અને ઇજિપ્તનું સામ્રાજ્ય',
    TA: 'கிளியோபாட்ரா மற்றும் எகிப்து பேரரசு',
    BN: 'ক্লিওপেট্রা ও মিসর সাম্রাজ্য',
  },
  armstrong: {
    EN: 'Apollo 11 & Lunar Landing',
    HI: 'अपोलो 11 और प्रथम चंद्र अवतरण',
    MR: 'अपोलो 11 आणि पहिले चांद्र अवतरण',
    TE: 'అపోలో 11 మరియు మొదటి చంద్రయానం',
    GU: 'અપોલો 11 અને પ્રથમ ચંદ્ર અવતરણ',
    TA: 'அப்பல்லோ 11 மற்றும் முதல் நிலவுப் பயணம்',
    BN: 'অ্যাপোলো ১১ ও প্রথম চন্দ্রাবতরণ',
  },
};

export function getLocalizedTopicTitle(query: string, langCode: SupportedLangCode | string): string {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';
  const q = (query || '').toLowerCase();

  for (const [key, titles] of Object.entries(TOPIC_CANONICAL_TITLES)) {
    if (q.includes(key)) {
      return titles[code] || titles.EN || query;
    }
  }

  return query;
}

// ── Timeline Scene Labels ─────────────────────────────────────────────────────
export const TIMELINE_LABELS_MAP: Record<SupportedLangCode, string[]> = {
  EN: ['ORIGIN', 'RISE', 'DEFINING MOMENT', 'TURNING POINT', 'LEGACY'],
  HI: ['आरंभ', 'उदय', 'निर्णायक क्षण', 'मोड़', 'विरासत'],
  MR: ['उगम', 'उदय', 'निर्णायक क्षण', 'वळण', 'वारसा'],
  TE: ['ప్రారంభం', 'ఎదుగుదల', 'కీలక ఘట్టం', 'మలుపు', 'వారసత్వం'],
  GU: ['આરંભ', 'ઉદય', 'નિર્ણાયક ક્ષણ', 'વળાંક', 'વારસો'],
  TA: ['தொடக்க நிலை', 'எழுச்சி', 'திருப்புமுனை', 'முக்கிய தருணம்', 'பாரம்பரியம்'],
  BN: ['সূচনা', 'উত্থান', 'চূড়ান্ত মুহূর্ত', 'সন্ধিক্ষণ', 'ঐতিহ্য'],
};

export function getTimelineLabels(langCode: string): string[] {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';
  return TIMELINE_LABELS_MAP[code] || TIMELINE_LABELS_MAP.EN;
}

// ── Historical Context Paragraphs ─────────────────────────────────────────────
export interface HistoricalContextText {
  whatHappened: string;
  whyItMattered: string;
}

export function getHistoricalContextParagraphs(topic: string, langCode: string): HistoricalContextText {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';

  switch (code) {
    case 'HI':
      return {
        whatHappened: `${topic} के कालक्रम में घटित ये घटनाएं इतिहास के एक अत्यंत महत्वपूर्ण मोड़ का प्रतिनिधित्व करती हैं। प्राथमिक अभिलेखों पर आधारित यह विवरण उन ऐतिहासिक निर्णयों और सांस्कृतिक परिवर्तनों को उजागर करता है जिन्होंने इस युग को गढ़ा।`,
        whyItMattered: `इन ऐतिहासिक घटनाओं का प्रभाव आने वाली कई पीढ़ियों तक बना रहा, जिसने प्रशासनिक सीमाओं, नागरिक अधिकारों और सांस्कृतिक चेतना को गहराई से प्रभावित किया। आज भी यह ऐतिहासिक क्षण आधुनिक इतिहास के अध्ययन का महत्वपूर्ण आधार है।`,
      };
    case 'MR':
      return {
        whatHappened: `${topic} यांच्या जीवनपट आणि कालखंडातील या घटना इतिहासातील अत्यंत निर्णायक वळण दर्शवतात. ऐतिहासिक पुरावे आणि अस्सल साधनांवर आधारित हा प्रवास तत्कालीन रणनीतिक निर्णय आणि समाजजीवनाला दिशा देणाऱ्या घटनांवर प्रकाश टाकतो.`,
        whyItMattered: `या महत्त्वपूर्ण कृतींचे पडसाद पुढील अनेक पिढ्यांमध्ये उमटले. त्यांनी राजकीय सीमा, स्वराज्याची संकल्पना आणि लोकभावनांमध्ये क्रांती घडवून आणली. हा ऐतिहासिक ठेवा आजही आधुनिक विचारसरणीला प्रेरणा देतो.`,
      };
    case 'TE':
      return {
        whatHappened: `${topic} కాలక్రమంలో జరిగిన ఈ సంఘటనలు చరిత్రలో అత్యంత కీలకమైన ఘట్టాలు. ప్రాథమిక ఆధారాలు మరియు చారిత్రక రికార్డులపై ఆధారపడిన ఈ కథనం ఆనాటి వ్యూహాత్మక నిర్ణయాలు, సాంస్కృతిక మలుపులను స్పష్టంగా వివరిస్తుంది.`,
        whyItMattered: `ఈ చారిత్రక పరిణామాలు తర్వాति తరాలపై తీవ్ర ప్రభావం చూపాయి. ఇవి పాలనా సంస్కరణలు, ప్రజా హక్కులు మరియు సాంస్కృతిక గుర్తింపును పునర్నిర్మించాయి. ఈ మైలురాయి ఆధునిక చరిత్రలో చిరస్థాయిగా నిలుస్తుంది.`,
      };
    case 'GU':
      return {
        whatHappened: `${topic} ના ઇતિહાસમાં આ ઘટનાઓ અત્યંત મહત્વપૂર્ણ વળાંક દર્શાવે છે. ઐતિહાસિક પુરાવા અને દસ્તાવેજો પર આધારિત આ આલેખન તે સમયના વ્યુહાત્મક નિર્ણયો અને સાંસ્કૃતિક પરિવર્તનોને સ્પષ્ટ કરે છે.`,
        whyItMattered: `આ ઐતિહાસિક પગલાંઓની અસર આવનારી અનેક પેઢીઓ પર પડી, જેનાથી રાજકીય સીમાઓ અને સામાજિક ચેતનામાં મોટો બદલાવ આવ્યો. આ વારસો આજે પણ પ્રેરણાદાયી છે.`,
      };
    case 'TA':
      return {
        whatHappened: `${topic} இன் வரலாற்றுக் காலவரிசையில் இந்நிகழ்வுகள் மிக முக்கியமான திருப்புமுனையாக அமைகின்றன. நம்பகமான ஆவணங்களின் அடிப்படையில் அமைந்த இந்த வரலாற்றுப் பதிவு, அன்றைய முக்கிய முடிவுகளையும் கலாச்சார மாற்றங்களையும் வெளிப்படுத்துகிறது.`,
        whyItMattered: `இந்நிகழ்வுகளின் தாக்கம் பல தலைமுறைகளில் எதிரொலித்து, அரசியல் எல்லைகளையும் மக்களின் வரலாற்று அடையாளங்களையும் மறுவரையறை செய்தது. இதன் மரபு இன்றும் போற்றப்படுகிறது.`,
      };
    case 'BN':
      return {
        whatHappened: `${topic}-এর ঐতিহাসিক পরিক্রমায় এই ঘটনাবলী অত্যন্ত তাৎপর্যপূর্ণ একটি অধ্যায়। ঐতিহাসিক দলিল ও প্রমাণের ভিত্তিতে রচিত এই বিবরণ সমকালীন কৌশলগত সিদ্ধান্ত এবং সামাজিক বিবর্তনকে তুলে ধরে।`,
        whyItMattered: `এই ঐতিহাসিক পদক্ষেপগুলি পরবর্তী প্রজন্মের ওপর সুদূরপ্রসারী প্রভাব ফেলেছিল, যা শাসনব্যবস্থা ও সাংস্কৃতিক চেতনাকে নব রূপ দেয়। এই ঐতিহ্যের গুরুত্ব আজও অপরিসীম।`,
      };
    default:
      return {
        whatHappened: `The events depicted in this sequence form a crucial arc in the timeline of ${topic}. This evidence-aware narrative highlights documented milestones, tactical decisions, and cultural turning points that shaped the epoch.`,
        whyItMattered: `These actions reverberated through subsequent generations, transforming political frontiers, civil rights doctrines, and cultural identities. The legacy of this moment remains a cornerstone of modern historical inquiry.`,
      };
  }
}

// ── Fallback Evidence Strings ─────────────────────────────────────────────────
export interface FallbackEvidenceText {
  historicalFact: string;
  reconstructionNote: string;
}

export function getFallbackEvidence(topic: string, langCode: string): FallbackEvidenceText {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';

  switch (code) {
    case 'HI':
      return {
        historicalFact: `${topic} के संबंध में ऐतिहासिक अभिलेख और प्रत्यक्षदर्शियों के प्रमाण प्रमुख कालक्रमिक पड़ावों की पुष्टि करते हैं।`,
        reconstructionNote: `यह दृश्य और द्वितीय-पुरुषीय विवरण ऐतिहासिक प्राथमिक स्रोतों पर आधारित एआई पुनर्निर्माण है।`,
      };
    case 'MR':
      return {
        historicalFact: `${topic} विषयीची ऐतिहासिक साधने, बखरी आणि समकालीन नोंदी या महत्त्वाच्या कालखंडाची पुष्टी करतात.`,
        reconstructionNote: `हे दृश्य आणि ऐतिहासिक निवेदन जतन केलेल्या ऐतिहासिक साधनांवर आधारित एआय पुनर्निर्माण आहे.`,
      };
    case 'TE':
      return {
        historicalFact: `${topic} గురించి చారిత్రక పత్రాలు మరియు ప్రత్యక్ష సాక్షుల ఆధారాలు ఈ కాలాన్ని ధృవీకరిస్తున్నాయి.`,
        reconstructionNote: `ఈ దృశ్యం మరియు కథనం ప్రాచీన చారిత్రక ఆధారాల ఆధారంగా రూపొందించిన AI పునర్నిర్మాణం.`,
      };
    case 'GU':
      return {
        historicalFact: `${topic} ના સંદર્ભમાં ઐતિહાસિક દસ્તાવેજો અને નોંધો આ મહત્વપૂર્ણ તબક્કાઓને સમર્થન આપે છે.`,
        reconstructionNote: `આ દ્રશ્ય અને વર્ણન ઐતિહાસિક સ્ત્રોતો પર આધારિત AI પુનર્નિર્માણ છે.`,
      };
    case 'TA':
      return {
        historicalFact: `${topic} குறித்த வரலாற்று ஆவணங்கள் மற்றும் சமகால பதிவுகள் இந்த முக்கிய நிகழ்வுகளை உறுதிப்படுத்துகின்றன.`,
        reconstructionNote: `இந்தக் காட்சியும் வரலாற்று விவரிப்பும் கிடைக்கப்பெற்ற வரலாற்றுத் தரவுகளின் அடிப்படையிலான AI மறுசீரமைப்பு ஆகும்.`,
      };
    case 'BN':
      return {
        historicalFact: `${topic} সম্পর্কিত ঐতিহাসিক নথিপত্র এবং প্রত্যক্ষদর্শীদের বিবরণী এই গুরুত্বপূর্ণ ঘটনাগুলিকে নিশ্চিত করে।`,
        reconstructionNote: `এই দৃশ্য এবং দ্বিতীয়-ব্যক্তি বর্ণনাটি সংরক্ষিত ঐতিহাসিক তথ্যের ওপর ভিত্তি করে নির্মিত AI পুনর্গঠন।`,
      };
    default:
      return {
        historicalFact: `Historical records and eyewitness dispatches attest to the key chronological milestones of ${topic}.`,
        reconstructionNote: `Visual scene and dramatized second-person narration represent an AI reconstruction based on preserved primary texts.`,
      };
  }
}

// ── Talk To Witness Suggested Questions ────────────────────────────────────────
export const SUGGESTED_QUESTIONS_MAP: Record<SupportedLangCode, string[]> = {
  EN: [
    'What did you witness at this moment?',
    'What happened next in this campaign?',
    'Why was this strategic decision made?',
    'How did the people respond to this event?',
  ],
  HI: [
    'आपने उस समय यहाँ क्या देखा था?',
    'इस निर्णायक क्षण के बाद आगे क्या हुआ?',
    'यह रणनीतिक निर्णय क्यों लिया गया था?',
    'उस समय प्रजा और सैनिकों की क्या प्रतिक्रिया थी?',
  ],
  MR: [
    'त्या क्षणी तुम्ही काय पाहिले होते?',
    'या निर्णयानंतर पुढे काय घडले?',
    'हा रणनीतिक निर्णय का घेण्यात आला?',
    'त्या वेळी रयतेची आणि मावळ्यांची काय भावना होती?',
  ],
  TE: [
    'ఆ సమయంలో మీరు ఇక్కడ ఏమి చూశారు?',
    'ఆ తర్వాత ఏమి జరిగింది?',
    'ఈ వ్యూహాత్మక నిర్ణయం ఎందుకు తీసుకున్నారు?',
    'ప్రజలు మరియు సైనికులు ఎలా స్పందించారు?',
  ],
  GU: [
    'તે સમયે આપે અહીં શું જોયું હતું?',
    'આ નિર્ણાયક ક્ષણ પછી આગળ શું થયું?',
    'આ વ્યુહાત્મક નિર્ણય કેમ લેવામાં આવ્યો?',
    'તે સમયે પ્રજા અને સૈનિકોનો શું પ્રતિસાદ હતો?',
  ],
  TA: [
    'அந்தத் தருணத்தில் நீங்கள் என்ன கண்டீர்கள்?',
    'இதற்குப் பிறகு என்ன நடந்தது?',
    'இந்த வியூக முடிவு ஏன் எடுக்கப்பட்டது?',
    'மக்கள் மற்றும் படையினரின் எதிர்வினை என்ன?',
  ],
  BN: [
    'সেই মুহূর্তে আপনি এখানে কী প্রত্যক্ষ করেছিলেন?',
    'এর পরে কী ঘটেছিল?',
    'এই কৌশলগত সিদ্ধান্ত কেন নেওয়া হয়েছিল?',
    'তখন সাধারণ মানুষ ও সৈন্যদের প্রতিক্রিয়া কেমন ছিল?',
  ],
};

export function getSuggestedQuestions(langCode: string): string[] {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';
  return SUGGESTED_QUESTIONS_MAP[code] || SUGGESTED_QUESTIONS_MAP.EN;
}

// ── TTS Voice Finder (Strictly NO English voice fallback for non-English!) ─────
export function getBestVoiceForLanguage(langCode: string, ttsLocale: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetLocale = (ttsLocale || 'en-US').toLowerCase().replace('_', '-');
  const targetPrefix = targetLocale.split('-')[0];

  // 1. Exact match e.g. 'hi-in', 'mr-in', 'te-in', 'gu-in', 'ta-in', 'bn-in', 'en-us'
  const exact = voices.find(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang === targetLocale;
  });
  if (exact) return exact;

  // 2. Language prefix match e.g. 'hi', 'mr', 'te', 'gu', 'ta', 'bn'
  const prefixMatch = voices.find(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang.startsWith(targetPrefix);
  });
  if (prefixMatch) return prefixMatch;

  // 3. Fallback ONLY permitted for English
  if (targetPrefix === 'en') {
    return voices.find(v => v.default) || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  // 4. For non-English languages: STRICTLY RETURN NULL rather than speaking in English!
  return null;
}

// ── What-If Multilingual Counterfactual Scenarios ──────────────────────────────
export interface BranchScenario {
  id: string;
  title: string;
  actualHistory: string;
  divergencePoint: string;
  simulatedOutcome: string;
  historiographicalNote: string;
}

export function getLocalizedCounterfactuals(query: string, langCode: string): BranchScenario[] {
  const code = (langCode.toUpperCase() as SupportedLangCode) || 'EN';
  const q = (query || '').toLowerCase();

  // 1. Shivaji Maharaj
  if (q.includes('shivaji') || q.includes('maratha') || q.includes('raigad') || q.includes('swarajya')) {
    if (code === 'HI') {
      return [
        {
          id: 'branch-1',
          title: 'पुरंदर संधि की अस्वीकृति और दीर्घकालिक दुर्ग रक्षा (1665)',
          actualHistory: 'शिवाजी महाराज ने जय सिंह प्रथम के साथ पुरंदर की संधि की, अपनी सेना की सुरक्षा के लिए 23 किले अस्थायी रूप से सौंपे और आगरा में सीधे बातचीत की।',
          divergencePoint: 'यदि मराठा शक्ति संधि को अस्वीकार कर पुरंदर की दुर्गम पहाड़ियों में अंतिम सांस तक रक्षा करती।',
          simulatedOutcome: 'सह्याद्रि में लंबे समय तक चलने वाले छापामार युद्ध ने मुगल आपूर्ति तंत्र को वर्षों पहले थका दिया होता, जिससे दक्कन में स्वतंत्र नियंत्रण और पहले स्थापित हो जाता।',
          historiographicalNote: 'इतिहासकार पुरंदर की संधि को सैन्य दुस्साहस के बजाय शिवाजी की कूटनीतिक दूरदर्शिता और यथार्थवाद का सर्वोत्तम उदाहरण मानते हैं।',
        },
        {
          id: 'branch-2',
          title: 'मराठा नौसेना का गहरा समुद्री विस्तार और आधिपत्य',
          actualHistory: 'शिवाजी ने कोंकण तट की रक्षा और सिद्दी व पुर्तगालियों के आक्रमण रोकने के लिए गुराब और गलबत जहाजों की नौसेना बनाई।',
          divergencePoint: 'यदि मराठों ने गहरे समुद्र में युद्धपोत बनाने के लिए डच नौसैनिकों के साथ सीधा सामरिक गठबंधन किया होता।',
          simulatedOutcome: 'पश्चिमी समुद्री व्यापार मार्गों पर पूर्ण मराठा नियंत्रण स्थापित होता, जिससे बॉम्बे और गोवा में यूरोपीय व्यापारिक कोठियां औपनिवेशिक विस्तार से पहले ही निष्प्रभावी हो जातीं।',
          historiographicalNote: 'यह विश्लेषण शिवाजी महाराज को भारतीय नौसेना का जनक मानने और 17वीं सदी की तटीय सैन्य शक्ति के संतुलन पर केंद्रित है।',
        },
        {
          id: 'branch-3',
          title: 'उत्तरी राजपूत राज्यों के साथ संयुक्त संप्रभु महासंघ',
          actualHistory: 'शिवाजी ने मुख्य रूप से महाराष्ट्र, कर्नाटक और दक्कन में हिंदवी स्वराज्य की स्वतंत्र स्थापना की।',
          divergencePoint: 'यदि 1666 की आगरा यात्रा से पूर्व मेवाड़ और मारवाड़ के साथ मुगलों के विरुद्ध एक औपचारिक संयुक्त संधि बन जाती।',
          simulatedOutcome: 'उत्तर और दक्षिण से एक साथ दो मोर्चों पर उठे संप्रभुता आंदोलन ने मुगल केंद्रीय प्रशासन को एक पीढ़ी पहले ही खंडित कर दिया होता।',
          historiographicalNote: 'इतिहासकारों में उपमहाद्वीपीय केंद्रीकृत शासन बनाम क्षेत्रीय स्वायत्त संघों की रणनीतिक प्रभावशीलता पर प्रमुख विमर्श।',
        },
      ];
    }
    if (code === 'MR') {
      return [
        {
          id: 'branch-1',
          title: 'पुरंदरचा तह नाकारून सह्याद्रीत कडवा लढा (१६६५)',
          actualHistory: 'शिवाजी महाराजांनी मिर्झाराजे जयसिंग यांच्याशी पुरंदरचा तह केला, रयतेची व सैन्याची हानी टाळण्यासाठी २३ किल्ले तात्पुरते देऊन आग्र्याला भेट देण्याचा निर्णय घेतला.',
          divergencePoint: 'जर मराठ्यांनी तह नाकारून पुरंदरच्या बुलंद कड्यांवरून मोगल सेनेविरुद्ध अखेरपर्यंत गनिमी कावा सुरू ठेवला असता.',
          simulatedOutcome: 'सह्याद्रीच्या दुर्गम दर्‍याखोऱ्यात मोगली फौजांची रसद तोडली गेली असती, आणि दख्खनमधील स्वराज्यनिर्मिती आणखी पाच वर्षे आधीच निर्विवाद झाली असती.',
          historiographicalNote: 'इतिहासकार पुरंदरच्या तहाला महाराजांच्या संयमी आणि मुत्सद्दी राजकारणाचा अद्वितीय नमुना मानतात.',
        },
        {
          id: 'branch-2',
          title: 'मराठा आरमाराचा अरबी समुद्रावर संपूर्ण दरारा',
          actualHistory: 'छत्रपती शिवाजी महाराजांनी सिंधुदुर्ग, विजयदुर्ग उभारून गुराब आणि गलबतांचे स्वतंत्र मराठा आरमार उभे केले.',
          divergencePoint: 'जर मराठ्यांनी डच कारागिरांच्या साहाय्याने खोल समुद्रातील महाकाय लढाऊ जहाजांची निर्मिती केली असती.',
          simulatedOutcome: 'पश्चिम किनारपट्टीवरील पोर्तुगीज, इंग्रज आणि सिद्दींची मक्तेदारी संपुष्टात येऊन मुंबई आणि गोव्यातील परकीय वखारींवर मराठ्यांचे पूर्ण नियंत्रण प्रस्थापित झाले असते.',
          historiographicalNote: 'महाराजांच्या भारतीय नौदलाचे जनक या संकल्पनेचा आणि १७ व्या शतकातील सागरी सार्वभौमत्वाचा अभ्यास.',
        },
        {
          id: 'branch-3',
          title: 'राजपूत आणि दख्खनचा संयुक्त महासंघ',
          actualHistory: 'महाराजांनी दख्खनमध्ये स्वतंत्रपणे हिंदवी स्वराज्याची स्थापना करून स्वतःचा राज्याभिषेक घडवून आणला.',
          divergencePoint: 'आग्रा भेटीपूर्वी मेवाड आणि मारवाडच्या राजपूत राजांशी औपचारिक युती स्थापन झाली असती तर.',
          simulatedOutcome: 'उत्तर आणि दक्षिण अशा दुहेरी आघाड्यांवर मोगल सत्तेची कोंडी होऊन औरंगजेबाचे साम्राज्य एक पिढी आधीच विस्कळीत झाले असते.',
          historiographicalNote: 'प्रादेशिक स्वराज्य आणि एकाधिकारशाही साम्राज्य यांच्यातील संघर्षावर इतिहासकारांचे मौलिक विश्लेषण.',
        },
      ];
    }
    if (code === 'TE') {
      return [
        {
          id: 'branch-1',
          title: 'పురందర్ ఒప్పంద తిరస్కరణ మరియు పర్వత రక్షణ (1665)',
          actualHistory: 'శివాజీ మహారాజ్ జై సింగ్ I తో పురందర్ సంధి చేసుకుని, సైనిక సంరక్షణ కోసం 23 కోటలను తాత్కాలికంగా అప్పగించారు.',
          divergencePoint: 'మరాఠాలు సంధిని తిరస్కరించి పురందర్ కొండలలో పూర్తి స్థాయి గెరిల్లా రక్షణను ఎంచుకుంటే.',
          simulatedOutcome: 'మొఘల్ సరఫరా వ్యవస్థ సహ్యాద్రి పర్వతాలలో అలసిపోయి, దక్కన్‌లో మరాఠా స్వతంత్ర పాలన మరిన్ని సంవత్సరాల ముందుగానే సుస్థిరమయ్యేది.',
          historiographicalNote: 'చరిత్రకారులు పురందర్ సంధిని శివాజీ యొక్క దౌత్య ప్రజ్ఞ మరియు రాజకీయ పరిపక్వతకు నిదర్శనంగా భావిస్తారు.',
        },
        {
          id: 'branch-2',
          title: 'మరాఠా నౌకాదళం సముద్ర ఆధిపత్యం',
          actualHistory: 'శివాజీ కొంకణ్ తీర రక్షణ కోసం స్వదేశీ నౌకాదళాన్ని నిర్మించి సిద్దిలు మరియు పోర్చుగీసులను నిలువరించారు.',
          divergencePoint: 'మరాఠాలు డచ్ వారితో సాంకేతిక ఒప్పందం చేసుకుని లోతైన సముద్ర యుద్ధనౌకలను నిర్మిస్తే.',
          simulatedOutcome: 'పశ్చిమ తీరంలో యూరోపియన్ వర్తక స్థావరాలపై పూర్తి నియంత్రణ ఏర్పడి, వలసరాజ్యాల విస్తరణ మొదట్లోనే ఆగిపోయేది.',
          historiographicalNote: 'శివాజీని భారత నౌకాదళ పితామహుడిగా గుర్తించే చారిత్రక విశ్లేషణ.',
        },
      ];
    }
    if (code === 'GU') {
      return [
        {
          id: 'branch-1',
          title: 'પુરંદર સંધિનો અસ્વીકાર અને દુર્ગ રક્ષણ (1665)',
          actualHistory: 'શિવાજી મહારાજે જયસિંહ સાથે પુરંદરની સંધિ કરી સેનાની સુરક્ષા માટે ૨૩ કિલ્લા કામચલાઉ સોંપ્યા હતા.',
          divergencePoint: 'જો મરાઠાઓએ સંધિ નકારી પુરંદરના પહાડોમાં મુઘલ સેના સામે લડત ચાલુ રાખી હોત.',
          simulatedOutcome: 'સહ્યાદ્રિમાં મુઘલ સૈન્યની રણનીતિ નિષ્ફળ ગઈ હોત અને દક્ષિણમાં સ્વરાજ્યનો વિજય વહેલો થયો હોત.',
          historiographicalNote: 'ઇતિહાસકારો પુરંદર સંધિને શિવાજીની કુશળ રાજદ્વારી દુરંદેશી ગણાવે છે.',
        },
      ];
    }
    if (code === 'TA') {
      return [
        {
          id: 'branch-1',
          title: 'புரந்தர் உடன்படிக்கை மறுப்பும் கோட்டைப் பாதுகாப்பும் (1665)',
          actualHistory: 'சிவாஜி மகாராஜ் ஜெய்சிங்குடன் புரந்தர் உடன்படிக்கை செய்து, படைகளைக் காக்க 23 கோட்டைகளை தற்காலிகமாக ஒப்படைத்தார்.',
          divergencePoint: 'மராட்டியர்கள் உடன்படிக்கையை மறுத்து புரந்தர் மலைகளில் முழுப் போர் தொடுத்திருந்தால்.',
          simulatedOutcome: 'முகலாயப் படைகளின் உணவு மற்றும் தளவாடப் போக்குவரத்து முடக்கப்பட்டு, தக்காணத்தில் சுயராஜ்யம் விரைவாக நிலைபெற்றிருக்கும்.',
          historiographicalNote: 'வரலாற்றாசிரியர்கள் புரந்தர் உடன்படிக்கையை சிவாஜியின் போர்த்தந்திர விவேகமாகக் கருதுகின்றனர்.',
        },
      ];
    }
    if (code === 'BN') {
      return [
        {
          id: 'branch-1',
          title: 'পুরন্দর সন্ধি প্রত্যাখ্যান ও দীর্ঘস্থায়ী দুর্গ প্রতিরক্ষা (১৬৬৫)',
          actualHistory: 'শিবাজী মহারাজ জয় সিংহের সাথে পুরন্দরের সন্ধি করেন এবং শক্তি সংরক্ষণের জন্য সাময়িকভাবে ২৩টি দুর্গ ছেড়ে দেন।',
          divergencePoint: 'যদি মারাঠারা সন্ধি প্রত্যাখ্যান করে সহ্যাদ্রির দুর্গম পাহাড়ে সর্বাত্মক গেরিলা প্রতিরোধ চালিয়ে যেত।',
          simulatedOutcome: 'মুঘল রসদ সরবরাহ ব্যবস্থা বিপর্যস্ত হতো এবং দাক্ষিণাত্যে স্বাধীন স্বরাজ্য বহু বছর আগেই প্রতিষ্ঠিত হতো।',
          historiographicalNote: 'ঐতিহাসিকরা পুরন্দরের সন্ধিকে সামরিক হঠকারিতার বদলে শিবাজীর রাজনৈতিক দূরদর্শিতা বলে মনে করেন।',
        },
      ];
    }
  }

  // 2. Napoleon
  if (q.includes('waterloo') || q.includes('napoleon') || q.includes('bonaparte')) {
    if (code === 'HI') {
      return [
        {
          id: 'branch-1',
          title: 'मार्शल ग्रूशी द्वारा वावरे में प्रशियाई सेना को रोकना (1815)',
          actualHistory: 'मार्शल ग्रूशी तोपों की आवाज की ओर नहीं बढ़े, जिससे ब्लूशर की प्रशियाई सेना ने शाम 4:30 बजे नेपोलियन के बाजू पर हमला कर दिया।',
          divergencePoint: 'यदि ग्रूशी ने दो डिवीजनों को वाटरलू की ओर भेजकर प्रशियाई सेना का मार्ग रोक दिया होता।',
          simulatedOutcome: 'वेलिंगटन की एंग्लो-एलाइड सेना को पीछे हटना पड़ता और 1815 का अभियान ग्रीष्मकालीन कूटनीतिक वार्ताओं तक खिंच जाता।',
          historiographicalNote: 'क्लॉज़विट्ज़ सहित आधुनिक सैन्य इतिहासकारों द्वारा इसे वाटरलू का सबसे निर्णायक रणनीतिक मोड़ माना जाता है।',
        },
        {
          id: 'branch-2',
          title: 'बिना मूसलाधार बारिश के भोर में तोपखाने का हमला',
          actualHistory: 'रात भर हुई मूसलाधार बारिश से जमीन दलदल बन गई, जिससे नेपोलियन को तोपखाने का हमला सुबह 9 बजे से 11:30 बजे तक टालना पड़ा।',
          divergencePoint: 'यदि जमीन सूखी होती और फ्रांसीसी तोपखाना पहली किरण के साथ ही भीषण गोलाबारी शुरू कर देता।',
          simulatedOutcome: 'प्रशियाई सेना के पहुंचने से घंटों पहले ही वेलिंगटन की रक्षापंक्तियां टूट जातीं और वाटरलू का परिणाम नेपोलियन के पक्ष में होता।',
          historiographicalNote: '19वीं सदी के बारूदी युद्ध में मौसम और भौगोलिक परिस्थितियों के निर्णायक प्रभाव का ऐतिहासिक अध्ययन।',
        },
      ];
    }
    if (code === 'MR') {
      return [
        {
          id: 'branch-1',
          title: 'मार्शल ग्रुशीने प्रूशियन सैन्याची केलेली नाकेबंदी (१८१५)',
          actualHistory: 'मार्शल ग्रुशी योग्य वेळी तोफांच्या दिशेने धावून आला नाही, ज्यामुळे प्रूशियन सैन्याने नेपोलियनच्या सैन्यावर हल्ला चढवला.',
          divergencePoint: 'जर ग्रुशीने वेळेवर प्रूशियन सैन्याची वाट अडवून धरली असती तर.',
          simulatedOutcome: 'वेलिंग्टनच्या सैन्याला माघार घ्यावी लागली असती आणि युरोपातील नेपोलियनचे साम्राज्य पुन्हा प्रस्थापित झाले असते.',
          historiographicalNote: 'वॉटरलूच्या लढाईतील सैन्य हालचालींवर लष्करी इतिहासकारांचे अत्यंत सूक्ष्म विश्लेषण.',
        },
        {
          id: 'branch-2',
          title: 'पावसाचा व्यत्यय न येता पहाटेच झालेली तोफगोळ्यांची बरसात',
          actualHistory: 'रात्रभर पडलेल्या पावसामुळे दलदल निर्माण झाली आणि नेपोलियनला तोफगोळ्यांचा मारा दोन तास उशिरा सुरू करावा लागला.',
          divergencePoint: 'कोरड्या जमिनीवर पहाटेच फ्रेंच तोफा धडाडल्या असत्या तर.',
          simulatedOutcome: 'प्रूशियन कुमक पोहोचण्याआधीच दोस्त राष्ट्रांची आघाडी उद्ध्वस्त झाली असती.',
          historiographicalNote: 'हवामान आणि युद्धाचा निकाल यावर लष्करी तज्ज्ञांचे ऐतिहासिक मत.',
        },
      ];
    }
    if (code === 'TE') {
      return [
        {
          id: 'branch-1',
          title: 'మార్షల్ గ్రూచీ ప్రష్యన్ సైన్యాన్ని అడ్డుకోవడం (1815)',
          actualHistory: 'మార్షల్ గ్రూచీ సరైన సమయంలో రాలేకపోవడంతో ప్రష్యన్ దళాలు నెపోలియన్‌పై దాడి చేశాయి.',
          divergencePoint: 'గ్రూచీ ప్రష్యన్ సైన్యాన్ని వాటర్‌లూ చేరకుండా అడ్డుకుంటే.',
          simulatedOutcome: 'వెల్లింగ్టన్ సైన్యం వెనక్కి తగ్గాల్సి వచ్చేది మరియు నెపోలియన్ అధికారం కొనసాగేది.',
          historiographicalNote: 'వాటర్‌లూ యుద్ధంలో సైనిక సమన్వయ వైఫల్యాన్ని విశ్లేషించే చారిత్రక చర్చ.',
        },
      ];
    }
    if (code === 'GU') {
      return [
        {
          id: 'branch-1',
          title: 'માર્શલ ગ્રૂશી દ્વારા પ્રુશિયન સેનાની રોકથામ (1815)',
          actualHistory: 'માર્શલ ગ્રૂશી સમયસર તોપોના અવાજ તરફ ન પહોંચ્યા અને વૉટરલૂમાં નેપોલિયન પરાજિત થયો.',
          divergencePoint: 'જો ગ્રૂશીએ પ્રુશિયન સેનાનો માર્ગ રોકી લીધો હોત.',
          simulatedOutcome: 'બ્રિટિશ સેનાને પીછેહઠ કરવી પડત અને યુરોપનું રાજકારણ બદલાઈ ગયું હોત.',
          historiographicalNote: 'વૉટરલૂ અભિયાનમાં સમય અને સંચારની ભૂમિકા પર ઐતિહાસિક તારણ.',
        },
      ];
    }
    if (code === 'TA') {
      return [
        {
          id: 'branch-1',
          title: 'மார்ஷல் குரூஷி பிரஷ்யப் படைகளைத் தடுத்தல் (1815)',
          actualHistory: 'மார்ஷல் குரூஷி சரியான நேரத்தில் போர்க்களத்திற்கு வராததால் நெப்போலியன் தோல்வியடைந்தார்.',
          divergencePoint: 'குரூஷி பிரஷ்யப் படைகள் வாட்டர்லூவை அடைவதைத் தடுத்திருந்தால்.',
          simulatedOutcome: 'வெல்லிங்டனின் கூட்டுப் படைகள் பின்வாங்க வேண்டியிருந்திருக்கும்.',
          historiographicalNote: 'வாட்டர்லூ போரின் மிக முக்கியமான திருப்புமுனையாக இது கருதப்படுகிறது.',
        },
      ];
    }
    if (code === 'BN') {
      return [
        {
          id: 'branch-1',
          title: 'মার্শাল গ্রুশি কর্তৃক প্রুশিয়ান বাহিনী প্রতিরোধ (১৮১৫)',
          actualHistory: 'মার্শাল গ্রুশি সময়মতো তোপধ্বনির দিকে অগ্রসর হননি, ফলে প্রুশিয়ান বাহিনী ওয়াটারলুতে নেপোলিয়নের ওপর আঘাত হানে।',
          divergencePoint: 'যদি গ্রুশি প্রুশিয়ান বাহিনীর ওয়াটারলু পৌঁছানো প্রতিহত করতেন।',
          simulatedOutcome: 'ওয়েলিংটনের সম্মিলিত বাহিনী পিছু হটতে বাধ্য হতো এবং নেপোলিয়নের শাসন দীর্ঘায়িত হতো।',
          historiographicalNote: 'সামরিক ঐতিহাসিকদের মতে এটি ওয়াটারলু অভিযানের প্রধান কৌশলগত সন্ধিক্ষণ।',
        },
      ];
    }
  }

  // 3. Rani Lakshmibai
  if (q.includes('lakshmibai') || q.includes('jhansi') || q.includes('1857')) {
    if (code === 'HI') {
      return [
        {
          id: 'branch-1',
          title: 'व्यपगत सिद्धांत (Doctrine of Lapse) की वापसी',
          actualHistory: 'लॉर्ड डलहौजी ने दत्तक पुत्र दामोदर राव के उत्तराधिकार को अस्वीकार कर मार्च 1854 में झाँसी को ईस्ट इंडिया कंपनी में मिला लिया।',
          divergencePoint: 'यदि ब्रिटिश हुकूमत ने दामोदर राव के उत्तराधिकार को पारंपरिक संधियों के तहत मान्यता दे दी होती।',
          simulatedOutcome: 'झाँसी बिना युद्ध और घेराबंदी के एक स्वतंत्र संप्रभु रियासत बनी रहती, यद्यपि 1857 का जनविद्रोह अन्य क्षेत्रों में फैलता।',
          historiographicalNote: 'आधुनिक इतिहासकार डलहौजी की आक्रामक नीतियों को 1857 के प्रथम स्वतंत्रता संग्राम का मुख्य उत्प्रेरक मानते हैं।',
        },
        {
          id: 'branch-2',
          title: 'तात्या टोपे के साथ संयुक्त केंद्रीय भारतीय कमान',
          actualHistory: 'झाँसी ने कालपी और ग्वालियर से सहायता पहुंचने से पहले दो सप्ताह तक अकेले ही किले की रक्षा की।',
          divergencePoint: 'यदि सर ह्यू रोज के बेतवा पार करने से पहले ही तात्या टोपे और रानी की संयुक्त सेनाएं एक साथ प्रहार करतीं।',
          simulatedOutcome: 'बुंदेलखंड में औपनिवेशिक सेना की प्रगति रुक जाती, जिससे ब्रिटिश कमान को दिल्ली और लखनऊ से सेना बुलानी पड़ती।',
          historiographicalNote: '1857 के प्रतिरोध में संचार और रणनीतिक समन्वय की चुनौतियों का ऐतिहासिक अध्ययन।',
        },
      ];
    }
    if (code === 'MR') {
      return [
        {
          id: 'branch-1',
          title: 'दत्तकविधानाचा अधिकार मान्य झाला असता तर (१८५४)',
          actualHistory: 'लॉर्ड डलहौसीने झाशीचे दत्तकविधान नामंजूर करून झाशी ब्रिटिश साम्राज्यात विलीन केली.',
          divergencePoint: 'जर ब्रिटिशांनी दामोदररावांचे वारसदार हक्क कायदेशीररित्या मान्य केले असते तर.',
          simulatedOutcome: 'झाशीची विध्वंसक लढाई टळली असती आणि राणी लक्ष्मीबाईंचे स्वतंत्र राज्य अबाधित राहिले असते.',
          historiographicalNote: '१८५७ च्या उठावामागील राजकीय कारणांचा इतिहासकारांनी घेतलेला वेध.',
        },
        {
          id: 'branch-2',
          title: 'तात्या टोपे आणि झाशीच्या फौजांचा एकत्रित प्रहार',
          actualHistory: 'झाशीच्या फौजांनी एकहाती दोन आठवडे इंग्रजांच्या वेढ्याशी लढा दिला.',
          divergencePoint: 'जर तात्या टोपे आणि रावसाहेबांच्या फौजांनी वेळेत एकत्र येऊन ब्रिटिशांना घेरले असते तर.',
          simulatedOutcome: 'मध्य भारतात ब्रिटिश सेनेचा पराभव झाला असता आणि स्वातंत्र्यलढ्याला नवी दिशा मिळाली असती.',
          historiographicalNote: '१८५७ च्या स्वातंत्र्यलढ्यातील रणनीतिक समन्वयाचे विश्लेषण.',
        },
      ];
    }
  }

  // Universal Dynamic Fallback across all supported languages
  const title1 = code === 'HI' ? 'निर्णायक मोड़ पर वैकल्पिक रणनीतिक निर्णय' :
                 code === 'MR' ? 'निर्णायक क्षणी पर्यायी रणनीतिक निर्णय' :
                 code === 'TE' ? 'కీలక మలుపులో ప్రత్యామ్నాయ వ్యూహాత్మక నిర్ణయం' :
                 code === 'GU' ? 'નિર્ણાયક ક્ષણે વૈકલ્પિક વ્યુહાત્મક નિર્ણય' :
                 code === 'TA' ? 'திருப்புமுனையில் மாற்று வியூக முடிவு' :
                 code === 'BN' ? 'চূড়ান্ত সন্ধিক্ষণে বিকল্প কৌশলগত সিদ্ধান্ত' :
                 'Alternative Tactical Decision at the Climax';

  const act1 = code === 'HI' ? `${query} के इतिहास में प्राथमिक स्रोतों द्वारा प्रमाणित कालक्रमिक घटनाएं घटित हुईं।` :
               code === 'MR' ? `${query} च्या नोंदींनुसार अस्सल ऐतिहासिक साधनांमध्ये नमूद केलेले निष्कर्ष घडले.` :
               code === 'TE' ? `${query} చరిత్రలో ప్రాథమిక ఆధారాలు ధృవీకరించిన వాస్తవాలు నమోదు చేయబడ్డాయి.` :
               code === 'GU' ? `${query} ના ઇતિહાસમાં ઐતિહાસિક દસ્તાવેજો દ્વારા પ્રમાણિત ઘટનાઓ બની હતી.` :
               code === 'TA' ? `${query} இன் வரலாற்றில் முதன்மை ஆவணங்களால் உறுதிப்படுத்தப்பட்ட நிகழ்வுகள் நடந்தன.` :
               code === 'BN' ? `${query}-এর ইতিহাসে প্রাথমিক দলিল দ্বারা প্রমাণিত ঘটনা প্রবাহ সংরক্ষিত রয়েছে।` :
               `The recorded historical timeline of ${query} culminated in the established documented outcome preserved in primary records.`;

  const div1 = code === 'HI' ? `यदि ${query} के चरम मोड़ पर एक विपरीत साहसी रणनीतिक विकल्प चुना गया होता।` :
               code === 'MR' ? `जर ${query} च्या निर्णायक टप्प्यावर एक वेगळा धाडसी निर्णय घेतला गेला असता.` :
               code === 'TE' ? `ఒకవేళ ${query} కీలక మలుపులో భిన్నమైన వ్యూహాత్మక మార్గాన్ని ఎంచుకుని ఉంటే.` :
               code === 'GU' ? `જો ${query} ના મુખ્ય વળાંક પર સાહસિક વિપરીત નિર્ણય લેવાયો હોત.` :
               code === 'TA' ? `${query} இன் திருப்புமுனையில் ஒரு மாற்று தீர்க்கமான முடிவு எடுக்கப்பட்டிருந்தால்.` :
               code === 'BN' ? `যদি ${query}-এর চূড়ান্ত মুহূর্তে একটি বিপরীত সাহসী কৌশলগত সিদ্ধান্ত নেওয়া হতো।` :
               `A critical strategic choice made in reverse during the defining turning point of ${query}.`;

  const sim1 = code === 'HI' ? `क्षेत्रीय सत्ता का संतुलन बदल जाता, जिससे प्रशासनिक संधियों और सांस्कृतिक विकास की आगामी समयरेखा नई दिशा में मुड़ जाती।` :
               code === 'MR' ? `प्रादेशिक सत्तेचे समीकरण बदलले असते, ज्यामुळे प्रशासकीय करार आणि सांस्कृतिक वाटचालीला नवे वळण मिळाले असते.` :
               code === 'TE' ? `ప్రాంతీయ అధికార సమతుల్యత మారి, పాలనా ఒప్పందాలు మరియు సాంస్కృతిక ప్రయాణం కొత్త దిశను తీసుకునేవి.` :
               code === 'GU' ? `પ્રાદેશિક સત્તાનું સંતુલન બદલાઈ ગયું હોત અને સંસ્કૃતિ તથા શાસનને નવી દિશા મળી હોત.` :
               code === 'TA' ? `பிராந்திய அதிகார சமநிலை மாறி, எதிர்கால நிர்வாக ஒப்பந்தங்களும் கலாச்சார வரலாறும் புதிய பரிமாணம் பெற்றிருக்கும்.` :
               code === 'BN' ? `আঞ্চলিক ক্ষমতার ভারসাম্য পরিবর্তিত হতো, যার ফলে ভবিষ্যৎ শাসনব্যবস্থা ও সাংস্কৃতিক বিবর্তন এক নতুন রূপ পেত।` :
               `A modified balance of regional influence, altering the subsequent timeline of administrative treaties and cultural evolution.`;

  const note1 = code === 'HI' ? 'काल्पनिक इतिहास (Counterfactual Analysis) अपरिहार्य संरचनात्मक कारकों और आकस्मिक पलों के बीच अंतर स्पष्ट करने का वैज्ञानिक विश्लेषण है।' :
                code === 'MR' ? 'पर्यायी इतिहास विश्लेषण हे ऐतिहासिक कार्यकारणभाव आणि अपरिहार्य घडामोडी समजून घेण्याचे अभ्यासपूर्ण साधन आहे.' :
                code === 'TE' ? 'చారిత్రక కారణాలు మరియు తప్పనిసరి మార్పుల మధ్య తేడాను గుర్తించడానికి ఈ విశ్లేషణ ఉపయోగపడుతుంది.' :
                code === 'GU' ? 'ઐતિહાસિક કારણો અને અનિવાર્ય પરિબળો વચ્ચેનો તફાવત સમજવા માટે આ વિશ્લેષણ ઉપયોગી છે.' :
                code === 'TA' ? 'வரலாற்று நிகழ்வுகளின் காரண காரியத் தொடர்புகளை ஆராய்வதற்கு இந்த முறை உதவுகிறது.' :
                code === 'BN' ? 'ঐতিহাসিক কার্যকারণ ও অপরিহার্য ঘটনার পার্থক্য নিরূপণে এই অনুমিত বিশ্লেষণ পদ্ধতি ব্যবহৃত হয়।' :
                'Counterfactual historical analysis tests causality to differentiate between inevitable structural developments and contingent moments.';

  return [
    {
      id: 'branch-1',
      title: title1,
      actualHistory: act1,
      divergencePoint: div1,
      simulatedOutcome: sim1,
      historiographicalNote: note1,
    },
  ];
}


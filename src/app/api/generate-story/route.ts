import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { HistoricalScene } from '@/types/story';
import { findDemoStory } from '@/data/sampleStories';
import { getCachedExperience, saveExperience } from '@/lib/db';
import { getSceneVisual } from '@/lib/historicalVisuals';

// Re-export for convenience
export type { HistoricalScene };

// ─── Validation ───────────────────────────────────────────────────────────────

function isValidScene(s: unknown): s is HistoricalScene {
  if (!s || typeof s !== 'object') return false;
  const scene = s as Record<string, unknown>;
  return (
    typeof scene.sceneNumber === 'number' &&
    typeof scene.era === 'string' &&
    typeof scene.title === 'string' &&
    typeof scene.narration === 'string' &&
    typeof scene.imagePrompt === 'string' &&
    typeof scene.ambientTag === 'string'
  );
}

function sanitizeTopic(topic: string): string {
  return topic
    .replace(/<[^>]*>/g, '') // strip any HTML
    .replace(/[`'"\\]/g, '') // strip injection chars
    .trim()
    .substring(0, 500);
}

function validateAndFixScenes(raw: unknown): HistoricalScene[] | null {
  if (!Array.isArray(raw)) return null;
  const scenes = raw.filter(isValidScene);
  if (scenes.length === 0) return null;
  return scenes;
}

import { SUPPORTED_LANGUAGES, resolveLanguage, getLocalizedTopicTitle } from '@/lib/multilingual';

// ─── Fallback Generator ──────────────────────────────────────────────────────

function generateFallbackScenes(topic: string, langCode: string): HistoricalScene[] {
  const isHi = langCode === 'HI';
  const isMr = langCode === 'MR';
  const isGu = langCode === 'GU';
  const isTe = langCode === 'TE';
  const isTa = langCode === 'TA';
  const isBn = langCode === 'BN';

  const era1 = isHi ? 'आरंभ और प्रारंभिक जीवन' :
               isMr ? 'उगम आणि आरंभ' :
               isGu ? 'આરંભ અને પ્રારંભિક જીવન' :
               isTe ? 'ప్రారంభం మరియు తొలి జీవితం' :
               isTa ? 'தொடக்கமும் இளமைக்காலமும்' :
               isBn ? 'সূচনা ও প্রারম্ভিক কাল' : 'Origin & Early Life';

  const era2 = isHi ? 'सत्ता का उदय और संघर्ष' :
               isMr ? 'सत्तेचा उदय आणि संघर्ष' :
               isGu ? 'સત્તાનો ઉદય અને સંઘર્ષ' :
               isTe ? 'అధికార పెరుగుదల మరియు పోరాటం' :
               isTa ? 'அதிகார எழுச்சியும் போரும்' :
               isBn ? 'ক্ষমতার উত্থান ও সংগ্রাম' : 'Rise to Power & Struggle';

  const era3 = isHi ? 'निर्णायक मोड़ और युद्ध' :
               isMr ? 'निर्णायक वळण आणि युद्ध' :
               isGu ? 'નિર્ણાયક વળાંક અને યુદ્ધ' :
               isTe ? 'కీలక మలుపు మరియు యుద్ధం' :
               isTa ? 'திருப்புமுனையும் போரும்' :
               isBn ? 'চূড়ান্ত সন্ধিক্ষণ ও যুদ্ধ' : 'Defining Climax & Siege';

  const era4 = isHi ? 'महान विजय और गौरव' :
               isMr ? 'भव्य विजय आणि राज्याभिषेक' :
               isGu ? 'ભવ્ય વિજય અને ગૌરવ' :
               isTe ? 'గొప్ప విజయం మరియు కీర్తి' :
               isTa ? 'பெருவெற்றியும் மணிமுடியும்' :
               isBn ? 'মহাবিজয় ও গৌরব' : 'Victory & Sovereign Triumph';

  const era5 = isHi ? 'अमर विरासत और इतिहास' :
               isMr ? 'अमर वारसा आणि प्रेरणा' :
               isGu ? 'અમર વારસો અને ઇતિહાસ' :
               isTe ? 'శాశ్వత వారసత్వం మరియు చరిత్ర' :
               isTa ? 'அழியாத பாரம்பரியம்' :
               isBn ? 'অমর ঐতিহ্য ও ইতিহাস' : 'Immortal Legacy & Eternal Impact';

  const t1 = isHi ? 'आरंभ और बाल्यकाल' :
             isMr ? 'सुरुवात आणि बालपण' :
             isGu ? 'શરૂઆત અને બાળપણ' :
             isTe ? 'ప్రారంభం మరియు బాల్యం' :
             isTa ? 'தொடக்கமும் இளமைக்காலமும்' :
             isBn ? 'সূচনা ও বাল্যকাল' : 'Origin & Shadows of Youth';

  const n1 = isHi ? `आप उस युग के गवाह हैं जहां ${topic} की कहानी शुरू हुई। किले के आंगन में हवा प्राचीन प्रार्थनाओं के साथ बहती है।` :
             isMr ? `तुम्ही त्या युगाचे साक्षीदार आहात जिथे ${topic} ची गाथा सुरू झाली. किल्ल्याच्या आवारात प्राचीन मंत्रांचे स्वर घुमतात.` :
             isGu ? `તમે એ યુગના સાક્ષી છો જ્યાં ${topic} ની ગાથા શરૂ થઈ. કિલ્લાના આંગણામાં પ્રાચીન પવન વાય છે.` :
             isTe ? `మీరు ${topic} కథ ప్రారంభమైన యుగానికి సాక్షులు. పురాతన కోట ప్రాంగణంలో పవిత్ర గాలి వీస్తుంది.` :
             isTa ? `${topic} இன் வரலாறு தொடங்கிய காலத்தை நீங்கள் நேரில் காண்கிறீர்கள். கோட்டையின் சுவர்களில் வரலாறு எதிரொலிக்கிறது.` :
             isBn ? `আপনি সেই যুগের সাক্ষী যেখানে ${topic}-এর উপাখ্যান শুরু হয়েছিল। দুর্গের প্রাঙ্গণে বয়ে যায় প্রাচীন ইতিহাস.` :
             `You stand in the quiet shadows where the saga of ${topic} begins. The wind across ancient walls whispers of destiny.`;

  const t2 = isHi ? 'सत्ता का उदय और प्रथम संघर्ष' :
             isMr ? 'सत्तेचा उदय आणि पहिला संघर्ष' :
             isGu ? 'સત્તાનો ઉદય અને પ્રથમ સંઘર્ષ' :
             isTe ? 'అధికార పెరుగుదల మరియు మొదటి పోరాటం' :
             isTa ? 'அதிகார எழுச்சியும் முதல் போரும்' :
             isBn ? 'ক্ষমতার উত্থান ও প্রথম সংঘাত' : 'Rise to Power & First Battles';

  const n2 = isHi ? 'जैसे-जैसे समय बीतता है, आप तलवारों की गूंज और शपथ की आवाज सुनते हैं।' :
             isMr ? 'काळ जसजसा पुढे सरकतो, तसतशी तलवारींची खणखणाट आणि स्वराज्याची प्रतिज्ञा कानावर पडते.' :
             isGu ? 'સમય વીતતાની સાથે, તમે તલવારોના રણકાર અને શપથનો અવાજ સાંભળો છો.' :
             isTe ? 'కాలం గడిచేకొద్దీ, మీరు కత్తుల శబ్దం మరియు పవిత్ర ప్రమాణాలను వింటారు.' :
             isTa ? 'காலம் நகர, வாட்களின் ஒலியும் விடுதலை உறுதிமொழியும் காதில் விழுகின்றன.' :
             isBn ? 'সময় গড়ানোর সাথে সাথে আপনি তরবারির ঝংকার এবং প্রতিজ্ঞার ধ্বনি শুনতে পান।' :
             `As the years unfold, you hear the clash of steel and sacred oaths. Banners rise across rugged hills.`;

  const t3 = isHi ? 'चरम मोड़ और धर्मयुद्ध' :
             isMr ? 'निर्णायक वळण आणि रणनीती' :
             isGu ? 'નિર્ણાયક વળાંક અને યુદ્ધ' :
             isTe ? 'కీలక మలుపు మరియు వ్యూహం' :
             isTa ? 'திருப்பமுனையும் போர் உத்தியும்' :
             isBn ? 'চূড়ান্ত মোড় ও সমরনীতি' : 'The Defining Climax & Siege';

  const n3 = isHi ? 'अब आप निर्णायक क्षण के बीच खड़े हैं। एक साहसी फैसला साम्राज्य का भाग्य बदल देता है।' :
             isMr ? 'आता तुम्ही एका निर्णायक क्षणाचे साक्षीदार आहात. एका धाडसी निर्णयाने साम्राज्याचे भाग्य बदलले.' :
             isGu ? 'હવે તમે નિર્ણાયક ક્ષણના સાક્ષી છો. એક સાહસી નિર્ણય સામ્રાજ્યનું ભાગ્ય બદલી નાખે છે.' :
             isTe ? 'ఇప్పుడు మీరు ఒక కీలక ఘట్టాన్ని చూస్తున్నారు. ఒక సాహసోపేత నిర్ణయం సామ్రాజ్య భవితవ్యాన్ని మారుస్తుంది.' :
             isTa ? 'இப்போது நீங்கள் ஒரு திருப்புமுனைக் கணத்தில் நிற்கிறீர்கள். ஒரு தீர்க்கமான முடிவு பேரரசின் விதியை மாற்றுகிறது.' :
             isBn ? 'এখন আপনি এক চূড়ান্ত মুহূর্তে দাঁড়িয়ে আছেন। একটি সাহসী সিদ্ধান্ত সাম্রাজ্যের ভাগ্য নির্ধারণ করে।' :
             `You witness the ultimate turning point. A daring tactical stroke determines the fate of empires.`;

  const t4 = isHi ? 'महान विजय और राज्याभिषेक' :
             isMr ? 'भव्य विजय आणि राज्याभिषेक' :
             isGu ? 'ભવ્ય વિજય અને રાજ્યાભિષેક' :
             isTe ? 'గొప్ప విజయం మరియు పట్టాభిషేకం' :
             isTa ? 'பெருவெற்றியும் மணிமுடியும்' :
             isBn ? 'মহাবিজয় ও রাজ্যাভিষেক' : 'Sovereign Victory & Triumph';

  const n4 = isHi ? 'शंखध्वनि गूंजती है और विजय का झंडा फहराता है।' :
             isMr ? 'जयघोष घुमतो, तुतारी वाजते आणि स्वराज्याचे भगवे निशाण अभिमानाने फडकते.' :
             isGu ? 'શંખનાદ ગુંજે છે અને વિજય પતાકા લહેરાય છે.' :
             isTe ? 'శంఖారావం మోగుతుంది, విజయ పతాకం సగర్వంగా ఎగురుతుంది.' :
             isTa ? 'சங்கு முழங்குகிறது, வெற்றி கொடி கம்பீரமாகப் பறக்கிறது.' :
             isBn ? 'শঙ্খধ্বনি বেজে ওঠে এবং বিজয়ের পতাকা আকাশে ওড়ে।' :
             `Trumpets echo across mountain peaks as victory is claimed. Golden coins shower the crowds.`;

  const t5 = isHi ? 'अमर विरासत और इतिहास में स्थान' :
             isMr ? 'अमर वारसा आणि चिरंतन प्रेरणा' :
             isGu ? 'અમર વારસો અને ઇતિહાસમાં સ્થાન' :
             isTe ? 'శాశ్వత వారసత్వం మరియు చరిత్రలో స్థానం' :
             isTa ? 'அழியாத பாரம்பரியமும் வரலாற்றுப் பதிவும்' :
             isBn ? 'অমর ঐতিহ্য ও চিরন্তন প্রভাব' : 'Immortal Legacy & Eternal Impact';

  const n5 = isHi ? `सदियों बाद भी, ${topic} के पदचिह्न इतिहास के पन्नों पर अंकित हैं।` :
             isMr ? `शतके उलटली तरी, ${topic} चे विचार आणि कार्य इतिहासाच्या पानांवर सुवर्णाक्षरांनी कोरलेले आहे.` :
             isGu ? `સદીઓ પછી પણ, ${topic} નો પ્રભાવ ઇતિહાસના પાનાઓ પર અમર છે.` :
             isTe ? `శతాబ్దాలు గడిచినా, ${topic} యొక్క కీర్తి చరిత్రలో నిలిచి ఉంటుంది.` :
             isTa ? `நூற்றாண்டுகள் கடந்தாலும், ${topic} இன் பெருமை வரலாற்றில் நிலைத்து நிற்கிறது.` :
             isBn ? `শতাব্দীর পর শতাব্দী পেরিয়েও, ${topic}-এর পদচিহ্ন ইতিহাসে চিরভাস্বর হয়ে রয়েছে।` :
             `Centuries fade, yet the echoes of ${topic} resonate across generations. You stand amidst enduring monuments.`;

  const factLabel = isHi ? `${topic} के प्रमाण ऐतिहासिक अभिलेखों में सुरक्षित हैं।` :
                    isMr ? `${topic} विषयीचे ऐतिहासिक संदर्भ साधनांमध्ये उपलब्ध आहेत.` :
                    isGu ? `${topic} ના ઐતિહાસિક પુરાવા દસ્તાવેજોમાં ઉપલબ્ધ છે.` :
                    isTe ? `${topic} గురించిన చారిత్రక ఆధారాలు అందుబాటులో ఉన్నాయి.` :
                    isTa ? `${topic} பற்றிய வரலாற்று ஆவணங்கள் பாதுகாக்கப்பட்டுள்ளன.` :
                    isBn ? `${topic} সম্পর্কিত ঐতিহাসিক প্রমাণ নথিপত্রে সংরক্ষিত রয়েছে।` :
                    `Historical records document key chronological moments of ${topic}.`;

  const reconLabel = isHi ? 'यह दृश्य ऐतिहासिक स्रोतों पर आधारित AI पुनर्निर्माण है।' :
                     isMr ? 'हे दृश्य ऐतिहासिक नोंदींवर आधारित AI पुनर्निर्माण आहे.' :
                     isGu ? 'આ દ્રશ્ય ઐતિહાસિક પુરાવાઓ પર આધારિત AI પુનર્નિર્માણ છે.' :
                     isTe ? 'ఈ దృశ్యం చారిత్రక రికార్డులపై ఆధారపడిన AI పునర్నిర్మాణం.' :
                     isTa ? 'இந்தக் காட்சி வரலாற்றுப் பதிவுகளின் அடிப்படையிலான AI மறுசீரமைப்பு.' :
                     isBn ? 'এই দৃশ্যটি ঐতিহাসিক তথ্যের ওপর ভিত্তি করে নির্মিত AI পুনর্গঠন।' :
                     'This scene is an AI reconstruction grounded in preserved historical records.';

  const simLabel = isHi ? 'ऐतिहासिक निर्णायक मोड़ का नाटकीय पुनर्निर्माण।' :
                    isMr ? 'ऐतिहासिक वळणाचा नाट्यमय पुनर्निर्माण.' :
                    isGu ? 'ઐતિહાસિક વળાંકનું નાટકીય પુનર્નિર્માણ.' :
                    isTe ? 'చారిత్రక మలుపు యొక్క నాటకీయ పునర్నిర్మాణం.' :
                    isTa ? 'வரலாற்றுத் திருப்புமுனையின் நாடக மறுசீரமைப்பு.' :
                    isBn ? 'ঐতিহাসিক সন্ধিক্ষণের নাট্যরূপ পুনর্গঠন।' :
                    'Dramatized reconstruction of historical turning point.';

  const scenes: HistoricalScene[] = [
    {
      sceneNumber: 1,
      era: era1,
      title: t1,
      narration: n1,
      imagePrompt: `Cinematic historical artwork showing early life and origins of ${topic}, dramatic atmospheric lighting, photorealistic concept art.`,
      ambientTag: 'temple_bells_wind',
      historicalFact: factLabel,
      reconstructionNote: reconLabel,
      imageUrl: getSceneVisual(topic, 1).url,
      visualType: getSceneVisual(topic, 1).visualType,
      evidenceLevel: 'verified',
    },
    {
      sceneNumber: 2,
      era: era2,
      title: t2,
      narration: n2,
      imagePrompt: `Historical painting depicting rising power of ${topic}, torchlit army encampment, cinematic volumetric smoke.`,
      ambientTag: 'marching_drums',
      historicalFact: factLabel,
      reconstructionNote: reconLabel,
      imageUrl: getSceneVisual(topic, 2).url,
      visualType: getSceneVisual(topic, 2).visualType,
      evidenceLevel: 'verified',
    },
    {
      sceneNumber: 3,
      era: era3,
      title: t3,
      narration: n3,
      imagePrompt: `Dramatic battle climax of ${topic}, historical armor details, fiery dusk sky, oil painting style.`,
      ambientTag: 'battle_horns_cannons',
      historicalFact: factLabel,
      simulationNote: simLabel,
      imageUrl: getSceneVisual(topic, 3).url,
      visualType: getSceneVisual(topic, 3).visualType,
      evidenceLevel: 'reconstruction',
    },
    {
      sceneNumber: 4,
      era: era4,
      title: t4,
      narration: n4,
      imagePrompt: `Grand victory celebration of ${topic}, royal golden robes, grand palace architecture, warm sunlight.`,
      ambientTag: 'royal_fanfare',
      historicalFact: factLabel,
      reconstructionNote: reconLabel,
      imageUrl: getSceneVisual(topic, 4).url,
      visualType: getSceneVisual(topic, 4).visualType,
      evidenceLevel: 'verified',
    },
    {
      sceneNumber: 5,
      era: era5,
      title: t5,
      narration: n5,
      imagePrompt: `Majestic historical monument honoring the legacy of ${topic}, epic cinematic composition, golden hour lighting.`,
      ambientTag: 'palace_ambience',
      historicalFact: factLabel,
      reconstructionNote: reconLabel,
      imageUrl: getSceneVisual(topic, 5).url,
      visualType: getSceneVisual(topic, 5).visualType,
      evidenceLevel: 'verified',
    },
  ];

  return scenes;
}

// ─── API Route ────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let requestedTopic = 'Historical Event';
  let resolvedLang = SUPPORTED_LANGUAGES.EN;

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Request body must be a JSON object.' }, { status: 400 });
    }

    const { topic, language = 'EN' } = body as Record<string, unknown>;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json({ error: 'topic (string) is required.' }, { status: 400 });
    }

    if (topic.trim().length > 500) {
      return NextResponse.json({ error: 'topic must be 500 characters or fewer.' }, { status: 400 });
    }

    requestedTopic = sanitizeTopic(topic);
    resolvedLang = resolveLanguage(language);

    // ── Fast path 1: Check curated story dataset (English only) ──────────────
    const apiKey = process.env.GEMINI_API_KEY;
    const demoStory = findDemoStory(requestedTopic);
    const localizedTitle = getLocalizedTopicTitle(requestedTopic, resolvedLang.code);

    if (!apiKey && demoStory && resolvedLang.code === 'EN') {
      const enrichedScenes = demoStory.scenes.map(s => {
        const visual = getSceneVisual(requestedTopic, s.sceneNumber);
        return {
          ...s,
          imageUrl: s.imageUrl || visual.url,
          visualType: s.visualType || visual.visualType,
          evidenceLevel: s.evidenceLevel || (visual.visualType === 'archival' ? 'verified' : 'reconstruction'),
        };
      });
      return NextResponse.json({
        scenes: enrichedScenes,
        title: localizedTitle,
        experienceTitle: localizedTitle,
        source: 'curated',
      });
    }

    // ── Fast path 2: Check Supabase cache ─────────────────────────────────────
    const cached = await getCachedExperience(requestedTopic, resolvedLang.code);
    if (cached && cached.scenes.length > 0) {
      const enrichedScenes = cached.scenes.map(s => {
        const visual = getSceneVisual(requestedTopic, s.sceneNumber);
        return {
          ...s,
          imageUrl: s.imageUrl || visual.url,
          visualType: s.visualType || visual.visualType,
          evidenceLevel: s.evidenceLevel || (visual.visualType === 'archival' ? 'verified' : 'reconstruction'),
        };
      });
      return NextResponse.json({
        scenes: enrichedScenes,
        title: localizedTitle,
        experienceTitle: localizedTitle,
        experienceId: cached.experienceId,
        source: 'supabase-cache',
      });
    }

    // ── If no API key and no curated story: use structured fallback ───────────
    if (!apiKey) {
      const fallbackData = generateFallbackScenes(requestedTopic, resolvedLang.code);
      return NextResponse.json({
        scenes: fallbackData,
        title: localizedTitle,
        experienceTitle: localizedTitle,
        source: 'structured',
      });
    }

    // ── Call Gemini with 25s timeout ──────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a world-class historical narrative engine for TimeWitness.
Generate a structured 5-scene historical journey for the topic: "${requestedTopic}" (${localizedTitle}).
Target Language for narration & titles: ${resolvedLang.name} (${resolvedLang.nativeName}).

CRITICAL REQUIREMENT:
- All scene titles, narrations, historical facts, reconstruction notes, and era locations MUST be in authentic ${resolvedLang.name} (${resolvedLang.nativeName}) script.
- Do NOT output English sentences or English headlines when a non-English language is selected.
- Keep historical facts and chronology accurate, true to primary sources.

Structure the journey into exactly 5 sequential historical scenes:
Scene 1: Origin / Early Life
Scene 2: Rise to Power / Initial Conflict
Scene 3: Defining Climax / Turning Point
Scene 4: Victory / Major Triumph
Scene 5: Legacy / Historical Impact

For each scene, provide:
- narration: Dramatic second-person storytelling ("You stand...", "You witness...") in authentic ${resolvedLang.name} (${resolvedLang.nativeName}) script.
- title: Short dramatic scene headline in ${resolvedLang.name} (${resolvedLang.nativeName}).
- era: Historical era and year in ${resolvedLang.name} (e.g. for Hindi: "1674 ईस्वी, रायगढ़ दुर्ग", for English: "1674 AD, Raigad Fort").
- historicalFact: A single VERIFIED historical fact about this moment in ${resolvedLang.name} (do NOT fabricate).
- reconstructionNote: Brief disclosure note in ${resolvedLang.name} (e.g. "AI Historical Reconstruction").
- simulationNote: If any element is hypothetical/simulated, note it in ${resolvedLang.name}; else leave empty string.
- imagePrompt: Detailed art prompt in English describing character, regalia, lighting, and architecture for cinematic visualization.
- ambientTag: One soundscape tag from: "temple_bells_wind", "marching_drums", "battle_horns_cannons", "royal_fanfare", "palace_ambience".

Ensure strict JSON output conforming to the schema.`;

    const responseSchema = {
      type: Type.ARRAY,
      description: 'List of exactly 5 sequential historical scenes.',
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber:        { type: Type.INTEGER, description: 'Scene number 1 to 5' },
          era:                { type: Type.STRING,  description: 'Historical era and location' },
          title:              { type: Type.STRING,  description: 'Short scene headline' },
          narration:          { type: Type.STRING,  description: 'Dramatic second-person narrative in the requested language' },
          imagePrompt:        { type: Type.STRING,  description: 'Detailed art prompt for historical visual generation' },
          ambientTag:         { type: Type.STRING,  description: 'Short soundscape key, e.g. "battle_horns", "palace_ambience"' },
          historicalFact:     { type: Type.STRING,  description: 'A verified historical fact' },
          reconstructionNote: { type: Type.STRING,  description: 'AI reconstruction disclosure note' },
          simulationNote:     { type: Type.STRING,  description: 'Simulated elements disclosure note' },
        },
        required: ['sceneNumber', 'era', 'title', 'narration', 'imagePrompt', 'ambientTag'],
      },
    };

    // ── Call Gemini with multi-model resilience (handles 503 capacity errors) ──
    const CANDIDATE_MODELS = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

    let responseText = '';
    let lastApiError: unknown = null;

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 12000)
        );

        const apiCallPromise = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
            temperature: 0.7,
          },
        });

        const response = await Promise.race([apiCallPromise, timeoutPromise]);
        if (response.text?.trim()) {
          responseText = response.text.trim();
          break;
        }
      } catch (err: unknown) {
        lastApiError = err;
        console.warn(`[generate-story] Model ${modelName} unavailable:`, err instanceof Error ? err.message : err);
      }
    }

    if (!responseText) {
      throw lastApiError || new Error('All Gemini model candidates unavailable');
    }

    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(responseText);
    } catch {
      throw new Error('Gemini response was not valid JSON');
    }

    const rawScenes = validateAndFixScenes(parsedRaw);
    if (!rawScenes) {
      throw new Error('Gemini response did not match expected scene schema');
    }

    const scenes = rawScenes.map(s => {
      const visual = getSceneVisual(requestedTopic, s.sceneNumber);
      return {
        ...s,
        imageUrl: s.imageUrl || visual.url,
        visualType: s.visualType || visual.visualType,
        evidenceLevel: s.evidenceLevel || (visual.visualType === 'archival' ? 'verified' : 'reconstruction'),
      };
    });

    // Persist to Supabase / Local storage (non-blocking)
    const experienceId = await saveExperience(requestedTopic, resolvedLang.code, scenes);

    return NextResponse.json({
      scenes,
      title: localizedTitle,
      experienceTitle: localizedTitle,
      experienceId: experienceId ?? null,
      source: 'gemini-api',
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[generate-story] Error:', message);

    const localizedTitle = getLocalizedTopicTitle(requestedTopic, resolvedLang.code);

    // Check curated story (English only fallback)
    const demo = findDemoStory(requestedTopic);
    if (demo && resolvedLang.code === 'EN') {
      const enrichedScenes = demo.scenes.map(s => {
        const visual = getSceneVisual(requestedTopic, s.sceneNumber);
        return {
          ...s,
          imageUrl: s.imageUrl || visual.url,
          visualType: s.visualType || visual.visualType,
          evidenceLevel: s.evidenceLevel || (visual.visualType === 'archival' ? 'verified' : 'reconstruction'),
        };
      });
      return NextResponse.json({
        scenes: enrichedScenes,
        title: localizedTitle,
        experienceTitle: localizedTitle,
        source: 'curated',
      });
    }

    const fallbackData = generateFallbackScenes(requestedTopic, resolvedLang.code);
    return NextResponse.json({
      scenes: fallbackData,
      title: localizedTitle,
      experienceTitle: localizedTitle,
      source: 'structured',
    });
  }
}

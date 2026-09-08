import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

export interface HistoricalScene {
  sceneNumber: number;
  era: string;
  title: string;
  narration: string;
  imagePrompt: string;
  ambientTag: string;
}

// Fallback generator if API key is not provided or API call fails
function generateFallbackScenes(topic: string, language: string): HistoricalScene[] {
  const isHindi = language === 'HI' || language === 'Hindi' || /[\u0900-\u097F]/.test(topic);

  return [
    {
      sceneNumber: 1,
      era: 'Origin & Early Life',
      title: isHindi ? `आरंभ और बाल्यकाल` : `Origin & Shadows of Youth`,
      narration: isHindi
        ? `आप उस युग के गवाह हैं जहां ${topic} की कहानी शुरू हुई। किले के आंगन में हवा प्राचीन प्रार्थनाओं के साथ बहती है, और आप भविष्य के महानायक की पहली चिंगारी देखते हैं।`
        : `You stand in the quiet shadows where the saga of ${topic} begins. The wind across the ancient fortress walls whispers of destiny, casting early lights on a future hero.`,
      imagePrompt: `Cinematic historical artwork showing early life and origins of ${topic}, dramatic atmospheric lighting, 8k resolution, photorealistic concept art.`,
      ambientTag: 'temple_bells_wind',
    },
    {
      sceneNumber: 2,
      era: 'Rise to Power',
      title: isHindi ? `सत्ता का उदय और प्रथम संघर्ष` : `Rise to Power & First Battles`,
      narration: isHindi
        ? `जैसे-जैसे समय बीतता है, आप तलवारों की गूंज और शपथ की आवाज सुनते हैं। युद्ध के मैदान में पहला ध्वज फहराया जाता है और इतिहास का नया अध्याय लिखा जाने लगता है।`
        : `As the years unfold, you hear the clash of steel and sacred oaths. Banners rise across rugged hills as the initial conflict sparks the journey to sovereignty.`,
      imagePrompt: `Historical painting depicting the rising power and early battle preparations of ${topic}, torchlit army encampment, cinematic volumetric smoke.`,
      ambientTag: 'marching_drums',
    },
    {
      sceneNumber: 3,
      era: 'Defining Climax',
      title: isHindi ? `चरम मोड़ और धर्मयुद्ध` : `The Defining Climax & Siege`,
      narration: isHindi
        ? `अब आप निर्णायक क्षण के बीच खड़े हैं। तोपों के गोलों और आंधियों के बीच, एक साहसी फैसला साम्राज्य का भाग्य बदल देता है।`
        : `You witness the ultimate turning point of the conflict. Amidst thundering artillery and smoke, a daring tactical stroke determines the fate of empires.`,
      imagePrompt: `Dramatic battle climax of ${topic}, intense action scene, historical armor details, fiery dusk sky, hyperdetailed oil painting style.`,
      ambientTag: 'battle_horns_cannons',
    },
    {
      sceneNumber: 4,
      era: 'Victory & Triumph',
      title: isHindi ? `महान विजय और राज्याभिषेक` : `Sovereign Victory & Triumph`,
      narration: isHindi
        ? `शंखध्वनि गूंजती है और रायगढ़ के शिखर पर विजय का झंडा फहराता है। जनता के जयघोष के बीच ${topic} की संप्रभुता स्थापित होती है।`
        : `Trumpets echo across mountain peaks as victory is claimed. Golden coins and flowers shower the crowds, sealing the sovereign triumph of ${topic}.`,
      imagePrompt: `Grand victory celebration and throne room coronation scene of ${topic}, royal golden robes, grand palace architecture, glowing warm sunlight.`,
      ambientTag: 'royal_fanfare',
    },
    {
      sceneNumber: 5,
      era: 'Immortal Legacy',
      title: isHindi ? `अमर विरासत और इतिहास में स्थान` : `Immortal Legacy & Eternal Impact`,
      narration: isHindi
        ? `सदियों बाद भी, इस महानायक के पदचिह्न इतिहास के पन्नों पर अंकित हैं। आप खड़े होकर उस अमर विरासत को नमन करते हैं जिसने राष्ट्र की चेतना को बदल दिया।`
        : `Centuries fade, yet the echoes of this reign resonate across generations. You stand amidst the enduring monuments, bearing witness to an immortal legacy.`,
      imagePrompt: `Majestic historical monument and sunset silhouette honoring the legacy of ${topic}, epic cinematic composition, golden hour lighting.`,
      ambientTag: 'palace_ambience',
    },
  ];
}

export async function POST(req: Request) {
  let requestedTopic = 'Historical Event';
  let requestedLanguage = 'EN';

  try {
    const body = await req.json();
    const { topic, language = 'EN' } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic string is required in request body.' },
        { status: 400 }
      );
    }

    requestedTopic = topic;
    requestedLanguage = language;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing. Returning structured fallback scenes.');
      const fallbackData = generateFallbackScenes(requestedTopic, requestedLanguage);
      return NextResponse.json({ scenes: fallbackData, source: 'fallback' });
    }

    // Initialize Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a world-class historical narrative engine for TimeWitness.
Generate a structured 5-scene historical journey for the topic: "${requestedTopic}".
Language requested for narration: ${requestedLanguage === 'HI' ? 'Hindi (हिन्दी)' : 'English'}.

Structure the journey into exactly 5 sequential historical scenes:
Scene 1: Origin / Early Life
Scene 2: Rise to Power / Initial Conflict
Scene 3: Defining Climax / Turning Point
Scene 4: Victory / Major Triumph
Scene 5: Legacy / Historical Impact

Use dramatic second-person storytelling ("You stand...", "You witness...") in the narration field in the requested language (${requestedLanguage}).

Ensure strict JSON output conforming to the schema.`;

    const responseSchema = {
      type: Type.ARRAY,
      description: 'List of exactly 5 sequential historical scenes.',
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber: { type: Type.INTEGER, description: 'Scene number 1 to 5' },
          era: { type: Type.STRING, description: 'Historical era and location, e.g., "1674 AD, Raigad Fort"' },
          title: { type: Type.STRING, description: 'Short scene headline' },
          narration: { type: Type.STRING, description: 'Dramatic second-person narrative story in the requested language' },
          imagePrompt: { type: Type.STRING, description: 'Detailed art prompt for historical visual generation' },
          ambientTag: { type: Type.STRING, description: 'Short soundscape key, e.g. "battle_horns", "palace_ambience", "marching_drums"' },
        },
        required: ['sceneNumber', 'era', 'title', 'narration', 'imagePrompt', 'ambientTag'],
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini API');
    }

    const scenes: HistoricalScene[] = JSON.parse(responseText);

    return NextResponse.json({ scenes, source: 'gemini-api' });
  } catch (error: any) {
    console.error('Error generating historical story with Gemini API:', error);
    
    // Graceful fallback if API call fails
    const fallbackData = generateFallbackScenes(requestedTopic, requestedLanguage);

    return NextResponse.json({ 
      scenes: fallbackData, 
      source: 'fallback', 
      warning: 'API invocation failed, returned structured fallback data.' 
    });
  }
}

import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { HistoricalScene } from '@/types/story';
import { findDemoStory } from '@/data/sampleStories';
import { getCachedExperience, saveExperience } from '@/lib/db';

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

// ─── Fallback ────────────────────────────────────────────────────────────────

function generateFallbackScenes(topic: string, language: string): HistoricalScene[] {
  const isHindi = language === 'HI' || /[\u0900-\u097F]/.test(topic);

  return [
    {
      sceneNumber: 1,
      era: 'Origin & Early Life',
      title: isHindi ? 'आरंभ और बाल्यकाल' : 'Origin & Shadows of Youth',
      narration: isHindi
        ? `आप उस युग के गवाह हैं जहां ${topic} की कहानी शुरू हुई। किले के आंगन में हवा प्राचीन प्रार्थनाओं के साथ बहती है।`
        : `You stand in the quiet shadows where the saga of ${topic} begins. The wind across ancient walls whispers of destiny.`,
      imagePrompt: `Cinematic historical artwork showing early life and origins of ${topic}, dramatic atmospheric lighting, photorealistic concept art.`,
      ambientTag: 'temple_bells_wind',
      historicalFact: isHindi
        ? `${topic} की उत्पत्ति और प्रारंभिक जीवन के बारे में ऐतिहासिक अभिलेख उपलब्ध हैं।`
        : `Historical records document the early origins of ${topic}.`,
      reconstructionNote: isHindi
        ? 'यह दृश्य ऐतिहासिक अभिलेखों पर आधारित AI पुनर्निर्माण है।'
        : 'This scene is an AI reconstruction based on historical records.',
    },
    {
      sceneNumber: 2,
      era: 'Rise to Power',
      title: isHindi ? 'सत्ता का उदय और प्रथम संघर्ष' : 'Rise to Power & First Battles',
      narration: isHindi
        ? 'जैसे-जैसे समय बीतता है, आप तलवारों की गूंज और शपथ की आवाज सुनते हैं।'
        : `As the years unfold, you hear the clash of steel and sacred oaths. Banners rise across rugged hills.`,
      imagePrompt: `Historical painting depicting rising power of ${topic}, torchlit army encampment, cinematic volumetric smoke.`,
      ambientTag: 'marching_drums',
      historicalFact: `${isHindi ? 'इस काल में ' + topic + ' का उदय हुआ।' : `The rise of ${topic} is documented in historical chronicles.`}`,
      reconstructionNote: isHindi ? 'AI पुनर्निर्माण।' : 'AI Reconstruction of documented events.',
    },
    {
      sceneNumber: 3,
      era: 'Defining Climax',
      title: isHindi ? 'चरम मोड़ और धर्मयुद्ध' : 'The Defining Climax & Siege',
      narration: isHindi
        ? 'अब आप निर्णायक क्षण के बीच खड़े हैं। एक साहसी फैसला साम्राज्य का भाग्य बदल देता है।'
        : `You witness the ultimate turning point. A daring tactical stroke determines the fate of empires.`,
      imagePrompt: `Dramatic battle climax of ${topic}, historical armor details, fiery dusk sky, oil painting style.`,
      ambientTag: 'battle_horns_cannons',
      historicalFact: isHindi ? 'यह निर्णायक घटना इतिहास में दर्ज है।' : 'This pivotal event is recorded in historical sources.',
      simulationNote: isHindi
        ? 'इस दृश्य में कुछ तत्व काल्पनिक हैं।'
        : 'Some narrative elements in this scene are dramatized for immersion.',
    },
    {
      sceneNumber: 4,
      era: 'Victory & Triumph',
      title: isHindi ? 'महान विजय और राज्याभिषेक' : 'Sovereign Victory & Triumph',
      narration: isHindi
        ? 'शंखध्वनि गूंजती है और विजय का झंडा फहराता है।'
        : `Trumpets echo across mountain peaks as victory is claimed. Golden coins shower the crowds.`,
      imagePrompt: `Grand victory celebration of ${topic}, royal golden robes, grand palace architecture, warm sunlight.`,
      ambientTag: 'royal_fanfare',
      historicalFact: isHindi ? 'यह विजय ऐतिहासिक अभिलेखों में दर्ज है।' : 'This victory is historically documented.',
      reconstructionNote: isHindi ? 'AI पुनर्निर्माण।' : 'AI Reconstruction of the documented triumph.',
    },
    {
      sceneNumber: 5,
      era: 'Immortal Legacy',
      title: isHindi ? 'अमर विरासत और इतिहास में स्थान' : 'Immortal Legacy & Eternal Impact',
      narration: isHindi
        ? `सदियों बाद भी, ${topic} के पदचिह्न इतिहास के पन्नों पर अंकित हैं।`
        : `Centuries fade, yet the echoes of ${topic} resonate across generations. You stand amidst enduring monuments.`,
      imagePrompt: `Majestic historical monument honoring the legacy of ${topic}, epic cinematic composition, golden hour lighting.`,
      ambientTag: 'palace_ambience',
      historicalFact: isHindi
        ? `${topic} की विरासत आज भी जीवित है।`
        : `The legacy of ${topic} continues to influence history and culture.`,
      reconstructionNote: isHindi ? 'AI पुनर्निर्माण।' : 'AI Reconstruction based on historical legacy.',
    },
  ];
}

// ─── API Route ────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let requestedTopic = 'Historical Event';
  let requestedLanguage = 'EN';

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
    requestedLanguage = language === 'HI' ? 'HI' : 'EN';

    // ── Fast path 1: Check curated demo story dataset if no API key ───────────
    const apiKey = process.env.GEMINI_API_KEY;
    const demoStory = findDemoStory(requestedTopic);
    if (!apiKey && demoStory) {
      return NextResponse.json({
        scenes: demoStory.scenes,
        source: 'demo',
        warning: 'Using curated demo story — no API key configured.',
      });
    }

    // ── Fast path 2: Check Supabase cache ─────────────────────────────────────
    const cached = await getCachedExperience(requestedTopic, requestedLanguage);
    if (cached && cached.scenes.length > 0) {
      return NextResponse.json({
        scenes: cached.scenes,
        experienceId: cached.experienceId,
        source: 'supabase-cache',
      });
    }

    // ── If no API key and no demo story: use structured fallback ──────────────
    if (!apiKey) {
      const fallbackData = generateFallbackScenes(requestedTopic, requestedLanguage);
      return NextResponse.json({
        scenes: fallbackData,
        source: 'fallback',
        warning: 'GEMINI_API_KEY not configured. Showing structured preview.',
      });
    }

    // ── Call Gemini with 8s timeout ──────────────────────────────────────────
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

For each scene, provide:
- narration: Dramatic second-person storytelling ("You stand...", "You witness...") in ${requestedLanguage === 'HI' ? 'Hindi' : 'English'}
- historicalFact: A single VERIFIED historical fact about this moment (do NOT fabricate — if uncertain, write "Source verification unavailable for this claim.")
- reconstructionNote: Brief note on what is AI reconstructed / dramatized (label it "AI Historical Reconstruction")
- simulationNote: If any element is hypothetical/simulated, note it here; else leave empty string

IMPORTANT: Never present invented dialogue as authentic historical quotes. Label all creative content clearly.
Ensure strict JSON output conforming to the schema.`;

    const responseSchema = {
      type: Type.ARRAY,
      description: 'List of exactly 5 sequential historical scenes.',
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber:        { type: Type.INTEGER, description: 'Scene number 1 to 5' },
          era:                { type: Type.STRING,  description: 'Historical era and location, e.g., "1674 AD, Raigad Fort"' },
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

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 8000)
    );

    const apiCallPromise = ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    const responseText = response.text ? response.text.trim() : '[]';

    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(responseText);
    } catch {
      throw new Error('Gemini response was not valid JSON');
    }

    const scenes = validateAndFixScenes(parsedRaw);
    if (!scenes) {
      throw new Error('Gemini response did not match expected scene schema');
    }

    // Persist to Supabase / Local storage (non-blocking)
    const experienceId = await saveExperience(requestedTopic, requestedLanguage, scenes);

    return NextResponse.json({
      scenes,
      experienceId: experienceId ?? null,
      source: 'gemini-api',
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[generate-story] Error:', message);

    // Try demo story first if available
    const demo = findDemoStory(requestedTopic);
    if (demo) {
      return NextResponse.json({
        scenes: demo.scenes,
        source: 'demo',
        warning: message === 'GEMINI_TIMEOUT'
          ? 'API response exceeded 8s — showing curated demo story.'
          : 'API unavailable — showing curated demo story.',
      });
    }

    const fallbackData = generateFallbackScenes(requestedTopic, requestedLanguage);
    return NextResponse.json({
      scenes: fallbackData,
      source: 'fallback',
      warning: 'Experience generation temporarily unavailable. Showing structured preview.',
    });
  }
}

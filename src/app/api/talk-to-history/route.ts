import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { resolveLanguage } from '@/lib/multilingual';

interface FigurePromptInfo {
  name: string;
  role: string;
  era: string;
  persona: string;
}

const FIGURE_PERSONAS: Record<string, FigurePromptInfo> = {
  shivaji: {
    name: 'Chhatrapati Shivaji Maharaj',
    role: 'Founder of the Maratha Empire',
    era: '1630 – 1680 AD',
    persona: 'Wise, brave, strategic, committed to Hindavi Swarajya, warrior king, noble, respectful, disciplined.',
  },
  lakshmibai: {
    name: 'Rani Lakshmibai of Jhansi',
    role: 'Queen of Jhansi and leader in the 1857 Indian War of Independence',
    era: '1828 – 1858 AD',
    persona: 'Fierce, unyielding, patriotic, courageous, protective of her people and Jhansi, dignified warrior queen.',
  },
  napoleon: {
    name: 'Napoleon Bonaparte',
    role: 'Emperor of the French and Military Commander',
    era: '1769 – 1821 AD',
    persona: 'Ambitious, articulate, master strategist, decisive, philosophical about destiny, grand vocabulary.',
  },
  cleopatra: {
    name: 'Cleopatra VII Philopator',
    role: 'Last active ruler of the Ptolemaic Kingdom of Egypt',
    era: '69 – 30 BC',
    persona: 'Diplomatic, charismatic, intellectually brilliant, politically astute, regal, proud pharaoh of Egypt.',
  },
  gandhi: {
    name: 'Mahatma Gandhi',
    role: 'Leader of the Indian Independence Movement & Satyagraha',
    era: '1869 – 1948 AD',
    persona: 'Calm, morally resolute, advocate of non-violence (Ahimsa), truth (Satya), compassionate, philosophical.',
  },
  armstrong: {
    name: 'Neil Armstrong',
    role: 'Commander of Apollo 11 & First Human on the Moon',
    era: '1930 – 2012 AD',
    persona: 'Composed, humble, engineer, precise, awe-inspired by space exploration, reflective on human achievement.',
  },
  french_revolution: {
    name: 'Maximilien Robespierre & Revolutionary Witness',
    role: 'Architect of the French Republic',
    era: '1758 – 1794 AD',
    persona: 'Eloquent, passionate defender of the Republic, champion of liberty and equality, principled, serious.',
  },
};

const MAX_MESSAGE_LENGTH = 1000;

function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // strip HTML
    .trim()
    .substring(0, MAX_MESSAGE_LENGTH);
}

export async function POST(req: Request) {
  let resolvedLangCode = 'EN';
  try {
    // Parse body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Request body must be a JSON object.' }, { status: 400 });
    }

    const {
      figureId,
      figureName,
      figure: legacyFigure,
      message,
      language = 'EN',
      historicalContext,
    } = body as Record<string, unknown>;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'message (string) is required.' }, { status: 400 });
    }

    const cleanMessage = sanitizeInput(message);

    // Resolve language (EN, HI, MR, TE, GU, TA, BN)
    const resolvedLang = resolveLanguage(language);
    resolvedLangCode = resolvedLang.code;

    const FALLBACK_REPLIES: Record<string, string> = {
      EN: "My voice is not available at this moment, traveler. Please return again shortly.",
      HI: "मैं क्षमा चाहता हूँ, इस समय मेरी वाणी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
      MR: "माफ करा, या क्षणी माझा आवाज उपलब्ध नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
      GU: "હું ક્ષમા ચાહું છું, આ સમયે મારો અવાજ ઉપલબ્ધ નથી. કૃપા કરીને થોડા સમય પછી ફરી પ્રયાસ કરો.",
      TE: "క్షమించండి, ఈ సమయంలో నా స్వరం అందుబాటులో లేదు. దయచేసి కాసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి.",
      TA: "மன்னிக்கவும், இந்த நேரத்தில் என் குரல் கிடைக்கவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.",
      BN: "আমি দুঃখিত, এই মুহূর্তে আমার কন্ঠস্বর উপলব্ধ নেই। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।",
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: FALLBACK_REPLIES[resolvedLang.code] || FALLBACK_REPLIES.EN,
        figureId,
        source: 'curated',
      });
    }

    // Resolve figure persona flexibly
    const rawKey = ((typeof figureId === 'string' ? figureId : '') + ' ' + (typeof figureName === 'string' ? figureName : '') + ' ' + (typeof legacyFigure === 'string' ? legacyFigure : '')).toLowerCase();
    let figure: FigurePromptInfo;

    if (rawKey.includes('shivaji') || rawKey.includes('maratha') || rawKey.includes('raigad')) {
      figure = FIGURE_PERSONAS.shivaji;
    } else if (rawKey.includes('lakshmibai') || rawKey.includes('jhansi') || rawKey.includes('1857')) {
      figure = FIGURE_PERSONAS.lakshmibai;
    } else if (rawKey.includes('napoleon') || rawKey.includes('waterloo') || rawKey.includes('bonaparte')) {
      figure = FIGURE_PERSONAS.napoleon;
    } else if (rawKey.includes('cleopatra') || rawKey.includes('alexandria') || rawKey.includes('pharaoh')) {
      figure = FIGURE_PERSONAS.cleopatra;
    } else if (rawKey.includes('gandhi') || rawKey.includes('dandi') || rawKey.includes('satyagraha')) {
      figure = FIGURE_PERSONAS.gandhi;
    } else if (rawKey.includes('apollo') || rawKey.includes('armstrong') || rawKey.includes('moon')) {
      figure = FIGURE_PERSONAS.armstrong;
    } else if (rawKey.includes('french') || rawKey.includes('bastille') || rawKey.includes('revolution')) {
      figure = FIGURE_PERSONAS.french_revolution;
    } else {
      figure = {
        name: typeof figureName === 'string' && figureName.trim() ? figureName.trim() : (typeof legacyFigure === 'string' && legacyFigure.trim() ? legacyFigure.trim() : 'Historical Figure'),
        role: 'Historical Leader & Witness',
        era: 'Historical Timeline',
        persona: 'Historical witness speaking directly from historical records, memoirs, and eyewitness accounts.',
      };
    }

    const contextSection = typeof historicalContext === 'string' && historicalContext.trim()
      ? `CURRENT HISTORICAL SETTING & SCENE: ${historicalContext.trim()}`
      : '';

    const systemInstruction = `You are roleplaying as ${figure.name} (${figure.role}, ${figure.era}).
Persona traits: ${figure.persona}
${contextSection}

CRITICAL RULES:
1. Speak strictly in the first person ("I", "my realm", "my soldiers", or native equivalents). Never break character or refer to yourself as an AI.
2. Reply in natural, authentic ${resolvedLang.name} (${resolvedLang.nativeName}) script. Never reply in English unless English was requested.
3. Keep the answer vivid, historically grounded, dramatic, and concise (2 to 4 sentences max) so it sounds exceptional when read aloud by voice synthesis.
4. Address the user respectfully as a traveler, citizen, or interlocutor from the future.
5. If historical records do not establish something or details are uncertain, state that clearly rather than fabricating modern speculation.`;

    const prompt = `Interlocutor asks: "${cleanMessage}"\n\nRespond in character as ${figure.name} in ${resolvedLang.name} (${resolvedLang.nativeName}):`;

    const ai = new GoogleGenAI({ apiKey });
    const CANDIDATE_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];
    let reply = '';
    let lastApiError: unknown = null;

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.8,
            maxOutputTokens: 600,
          },
        });
        const text = response.text?.trim();
        if (text) {
          reply = text;
          break;
        }
      } catch (err: unknown) {
        lastApiError = err;
        console.warn(`[talk-to-history] Model ${modelName} unavailable:`, err instanceof Error ? err.message : err);
      }
    }

    if (!reply) {
      throw lastApiError || new Error('All Gemini model candidates unavailable');
    }

    return NextResponse.json({ reply, figureId, source: 'gemini-api' });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[talk-to-history] Error:', message);

    const FALLBACK_REPLIES: Record<string, string> = {
      EN: "The sands of time have momentarily hushed my voice, traveler. Please ask your question once more.",
      HI: "समय के प्रवाह ने क्षण भर के लिए मेरी वाणी को थाम दिया है, यात्री। कृपया पुनः पूछें।",
      MR: "काळाच्या ओघात क्षणभर माझा आवाज थांबला आहे, प्रवाशा. कृपया पुन्हा विचारा.",
      GU: "સમયના પ્રવાહમાં મારો અવાજ ક્ષણભર માટે રોકાઈ ગયો છે. કૃપા કરીને ફરી પૂછો.",
      TE: "సమయ ప్రవాహం క్షణకాలం నా స్వరాన్ని ఆపింది, యాత్రికుడా. దయచేసి మళ్ళీ అడగండి.",
      TA: "காலத்தின் அலை என் குரலை ஒரு கணம் நிறுத்தியுள்ளது. தயவுசெய்து மீண்டும் கேட்கவும்.",
      BN: "সময়ের প্রবাহে আমার কন্ঠস্বর এক মুহূর্তের জন্য থেমে গেছে। অনুগ্রহ করে আবার জিজ্ঞাসা করুন।",
    };

    return NextResponse.json(
      {
        reply: FALLBACK_REPLIES[resolvedLangCode] || FALLBACK_REPLIES.EN,
        source: 'curated',
      },
      { status: 200 }
    );
  }
}

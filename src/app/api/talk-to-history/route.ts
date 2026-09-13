import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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
};

const MAX_MESSAGE_LENGTH = 1000;

function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // strip HTML
    .trim()
    .substring(0, MAX_MESSAGE_LENGTH);
}

export async function POST(req: Request) {
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
      message,
      language = 'EN',
    } = body as Record<string, unknown>;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'message (string) is required.' }, { status: 400 });
    }

    const cleanMessage = sanitizeInput(message);

    // Resolve language (EN, HI, MR, TE, GU, TA, BN)
    const SUPPORTED_LANGS: Record<string, { code: string; name: string; nativeName: string }> = {
      EN: { code: 'EN', name: 'English', nativeName: 'English' },
      HI: { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी' },
      MR: { code: 'MR', name: 'Marathi', nativeName: 'मराठी' },
      TE: { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు' },
      GU: { code: 'GU', name: 'Gujarati', nativeName: 'ગુજરાતી' },
      TA: { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்' },
      BN: { code: 'BN', name: 'Bengali', nativeName: 'বাংলা' },
    };

    let resolvedLang = SUPPORTED_LANGS.EN;
    if (typeof language === 'string') {
      const upper = language.trim().toUpperCase();
      if (SUPPORTED_LANGS[upper]) {
        resolvedLang = SUPPORTED_LANGS[upper];
      } else {
        const lower = language.trim().toLowerCase();
        for (const item of Object.values(SUPPORTED_LANGS)) {
          if (item.name.toLowerCase() === lower || item.nativeName.toLowerCase() === lower) {
            resolvedLang = item;
            break;
          }
        }
      }
    }

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
        source: 'fallback',
      });
    }

    // Resolve figure persona
    const figureKey = typeof figureId === 'string' ? figureId.toLowerCase() : '';
    const figure = FIGURE_PERSONAS[figureKey] ?? {
      name: typeof figureName === 'string' && figureName.trim() ? figureName.trim() : 'Historical Figure',
      role: 'Historical Leader',
      era: 'Historical Timeline',
      persona: 'Historical leader speaking from memoirs and records.',
    };

    const systemInstruction = `You are roleplaying as ${figure.name} (${figure.role}, ${figure.era}).
Persona traits: ${figure.persona}

CRITICAL RULES:
1. Speak strictly in the first person ("I", "my realm", "my soldiers", or native equivalents). Never break character or refer to yourself as an AI.
2. Reply in natural ${resolvedLang.name} (${resolvedLang.nativeName}) script.
3. Keep the answer vivid, authentic, dramatic, and concise (2 to 4 sentences max) so it sounds great when read out loud by text-to-speech.
4. Address the user respectfully as a traveler, citizen, or interlocutor from the future or from your court.
5. Ground your answers in real historical perspectives associated with your persona. Never fabricate modern knowledge.`;

    const prompt = `Interlocutor says: "${cleanMessage}"\n\nRespond in character as ${figure.name}:`;

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        maxOutputTokens: 600,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const reply = response.text?.trim() ?? '';

    if (!reply) {
      throw new Error('Empty reply from Gemini');
    }

    return NextResponse.json({ reply, figureId, source: 'gemini-api' });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[talk-to-history] Error:', message);

    // Graceful fallback — never expose stack traces to client
    return NextResponse.json(
      {
        reply:
          "The sands of time have momentarily silenced my voice, traveler. Please ask again.",
        source: 'fallback',
        warning: 'Character voice temporarily unavailable.',
      },
      { status: 200 } // 200 so client displays fallback, not error UI
    );
  }
}

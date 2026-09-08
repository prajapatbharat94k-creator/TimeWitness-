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

    // Validate language
    const lang = language === 'HI' ? 'HI' : 'EN';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback reply when no API key
      return NextResponse.json({
        reply:
          lang === 'HI'
            ? 'मैं क्षमा चाहता हूँ, इस समय मेरी वाणी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।'
            : "My voice is not available at this time, traveler. Please return again shortly.",
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

    const isHindi = lang === 'HI';

    const systemInstruction = `You are roleplaying as ${figure.name} (${figure.role}, ${figure.era}).
Persona traits: ${figure.persona}

CRITICAL RULES:
1. Speak strictly in the first person ("I", "my realm", "my soldiers", or in Hindi "मैं", "मेरा", "हम"). Never break character or refer to yourself as an AI.
2. Reply in ${isHindi ? 'Hindi (हिन्दी) in Devanagari script' : 'English'}.
3. Keep the answer vivid, authentic, dramatic, and concise (2 to 4 sentences max) so it sounds great when read out loud by text-to-speech.
4. Address the user respectfully as a traveler, citizen, or interlocutor from the future or from your court.
5. Never fabricate specific dates, names, or facts not historically associated with your persona. If unsure, speak in historical generalities.`;

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

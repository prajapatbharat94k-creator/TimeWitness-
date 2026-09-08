export interface HistoricalScene {
  sceneNumber: number;
  era: string;
  title: string;
  narration: string;
  imagePrompt: string;
  ambientTag: string;
  // Evidence classification fields
  historicalFact?: string;
  reconstructionNote?: string;
  simulationNote?: string;
}

export interface GenerateStoryRequest {
  topic: string;
  language?: string;
}

export interface GenerateStoryResponse {
  scenes: HistoricalScene[];
  source: 'gemini-api' | 'fallback' | 'demo' | 'supabase-cache';
  experienceId?: string | null;
  warning?: string;
  error?: string;
}

export interface HistoricalScene {
  sceneNumber: number;
  era: string;
  title: string;
  narration: string;
  imagePrompt: string;
  ambientTag: string;
  // Visual metadata
  imageUrl?: string;
  visualType?: 'archival' | 'reconstruction';
  // Evidence classification fields
  historicalFact?: string;
  reconstructionNote?: string;
  simulationNote?: string;
  evidenceLevel?: 'verified' | 'supported' | 'uncertain' | 'reconstruction';
  location?: string;
  date?: string;
}

export interface GenerateStoryRequest {
  topic: string;
  language?: string;
}

export interface GenerateStoryResponse {
  scenes: HistoricalScene[];
  title?: string;
  experienceTitle?: string;
  source: 'gemini-api' | 'fallback' | 'demo' | 'supabase-cache' | 'curated' | 'structured';
  experienceId?: string | null;
  warning?: string;
  error?: string;
}

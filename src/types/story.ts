export interface HistoricalScene {
  sceneNumber: number;
  era: string;
  title: string;
  narration: string;
  imagePrompt: string;
  ambientTag: string;
}

export interface GenerateStoryRequest {
  topic: string;
  language?: string;
}

export interface HistoricalKnowledgeContext {
  title: string;
  description?: string;
  extract: string;
  thumbnail_url?: string | null;
  page_url?: string;
  era?: string;
  source?: string;
}

export interface GenerateStoryResponse {
  scenes: HistoricalScene[];
  source: 'gemini-api' | 'fallback' | 'demo';
  wikiContext?: HistoricalKnowledgeContext;
  warning?: string;
  error?: string;
}

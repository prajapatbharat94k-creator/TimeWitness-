export interface HistoricalScene {
  sceneNumber: number;
  era: string;
  title: string;
  narration: string;
  imagePrompt: string;
  ambientTag: string;
  /** Verified historical fact for this scene (📜 HISTORICAL FACT label) */
  historicalFact?: string;
  /** AI reconstruction disclaimer (🎭 AI RECONSTRUCTION label) */
  reconstructionNote?: string;
  /** Alternate-history simulation note (🔮 SIMULATION label) */
  simulationNote?: string;
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

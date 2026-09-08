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

export interface GenerateStoryResponse {
  scenes: HistoricalScene[];
  source: 'gemini-api' | 'fallback' | 'demo';
  warning?: string;
  error?: string;
}

# TimeWitness ⏳

**TimeWitness** is an AI-powered immersive historical narrative engine built with Next.js, Google Gen AI SDK (`@google/genai`), Tailwind CSS, and Framer Motion. It allows users to traverse key eras of human history through dynamic 5-scene dramatic storytelling and interact with legendary historical figures.

---

## ✨ Features

- **5-Scene Historical Journey**: Generates sequential historical scenes (Origin & Youth, Rise to Power, Defining Climax, Victory & Triumph, Immortal Legacy) with cinematic narrations, image prompts, and atmospheric sound tags.
- **Bilingual Experience**: Full support for both **English** and **Hindi (हिन्दी)** narration and UI.
- **Talk to History Modal**: Interactive dialogue experience with historical figures such as Chhatrapati Shivaji Maharaj, Rani Lakshmibai, Napoleon Bonaparte, and Cleopatra VII.
- **Gemini 2.5 Flash Integration**: Leverages `@google/genai` with structured JSON schema output for real-time historical narrative generation.
- **Resilient Fallback Mode**: Graceful fallback generator ensures uninterrupted historical exploration even when an API key is not configured.
- **Modern Cinematic UI**: Designed with dark aesthetics, gold accents, smooth Framer Motion animations, and Lucide icons.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI SDK**: `@google/genai` (Gemini 2.5 Flash)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24.12.0)
- npm or yarn

### 2. Environment Configuration
Copy the example environment file and add your Google Gemini API key:
```bash
cp .env.example .env.local
```
Add your API key inside `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the application runs with structured fallback historical scenes).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

# TimeWitness ⏳ — AI-Powered Historical Narrative Engine

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.0_Flash-E37400?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.3-black?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

<p align="center">
  <a href="https://timewitness-tau.vercel.app">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-timewitness--tau.vercel.app-D4AF37?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## 📖 Overview

**TimeWitness** is an AI-powered archival reconstruction engine designed to bring human history to life. Rather than reading static history books, TimeWitness allows users to step directly into the boots of historical observers through:

- **Cinematic 5-Scene Storylines**: Experience historical arcs from humble beginnings to immortal legacies.
- **Multilingual Primary Sources**: Fully localized experiences in both **English** and **Hindi (हिन्दी)**.
- **Interactive Historical Figures**: Converse in real time with icons such as Chhatrapati Shivaji Maharaj, Rani Lakshmibai, Napoleon Bonaparte, and Cleopatra VII.
- **Atmospheric Audio & Visual Cues**: Detailed visual prompts and ambient sound tags that set the emotional tone for each era.

Powered by Next.js 14 App Router, Tailwind CSS, Framer Motion, and Google's official `@google/genai` SDK with **Gemini 2.0 Flash**.

---

## ✨ Features

- 🏛️ **5-Scene Sequential Narrative Engine**: Automatically segments historical events into 5 dramatic chapters:
  1. *Origin & Shadows of Youth* (आरंभ और बाल्यकाल)
  2. *Rise to Power & First Battles* (सत्ता का उदय और प्रथम संघर्ष)
  3. *The Defining Climax & Siege* (चरम मोड़ और धर्मयुद्ध)
  4. *Sovereign Victory & Triumph* (महान विजय और राज्याभिषेक)
  5. *Immortal Legacy & Eternal Impact* (अमर विरासत और शाश्वत प्रभाव)
- 🌏 **Dual Historical Universe (Indian & World History)**:
  - **10 Indian Eras**: Ancient India, Mauryan, Gupta, Medieval, Delhi Sultanate, Mughal, Maratha, Colonial, Independence, Modern India.
  - **16 World Eras**: Egypt, Greece, Rome, Medieval Europe, Renaissance, French Revolution, Napoleonic, Industrial, WWI, WWII, Cold War, Space Race, China, Mongol, Ottoman, Mesoamerica.
- 🧭 **Explore Discovery Hub (`/explore`)**: Filter by 9 world regions (India, Asia, Europe, Africa, Americas, Middle East, Ancient/Modern World) and 5 chronological epochs.
- 📜 **Dedicated Witnessing Chamber (`/witness`)**: Full immersion with SpeechSynthesis TTS narration, ambient soundscape player, Wikipedia encyclopedic context card, and shareable dossier link.
- 🔍 **Global Universal Search (`/search`)**: Real-time integration with `/api/wiki-history` and Supabase Postgres, type filters, recent searches, and popular suggestions.
- 📊 **Chronicler Dashboard (`/dashboard`)**: Saved historical journeys, persistent viewing history, scholar rank tracking, and research metrics.
- 👤 **Scholar Profile & System Settings (`/profile`, `/settings`)**: Customizable chronicler identity, acoustic synthesis preferences, and local data control.
- 💬 **Interactive Talk to History**: Engage in primary-perspective dialogue with verified historical personas (Chhatrapati Shivaji Maharaj, Rani Lakshmibai, Napoleon Bonaparte, Cleopatra VII, Mahatma Gandhi, Neil Armstrong).
- 🌐 **Full Bilingual Parity**: Real-time toggle between **English** and **Hindi (हिन्दी)** across all pages and narrations.
- 🎨 **Cinematic Museum Aesthetic**: Obsidian backgrounds, warm imperial gold accents, Cinzel typography, and subtle borders.

---

## 🏛️ System Architecture

```text
                               ┌─────────────────────────────────────────┐
                               │           User Browser / Client         │
                               │  (Next.js 14 App Router & React 18)     │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┼──────────────────────────────────┐
                 ▼                                  ▼                                  ▼
      ┌──────────────────────┐           ┌──────────────────────┐           ┌──────────────────────┐
      │   Bilingual TTS      │           │   Atmospheric Sound  │           │   Chronicler State   │
      │   SpeechSynthesis    │           │   Web Audio Engine   │           │   LocalStorage Sync  │
      └──────────────────────┘           └──────────────────────┘           └──────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │           Next.js API Gateway           │
                               │        (Edge & Server Routes)           │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                     ▼
   ┌───────────────────────────┐                                         ┌───────────────────────────┐
   │    Google Gemini SDK      │                                         │    Archival Knowledge     │
   │   (@google/genai 2.21)    │                                         │          Router           │
   └─────────────┬─────────────┘                                         └─────────────┬─────────────┘
                 │                                                                     │
     ┌───────────┴───────────┐                                           ┌─────────────┴─────────────┐
     ▼                       ▼                                           ▼                           ▼
┌──────────────┐     ┌──────────────┐                             ┌──────────────┐           ┌──────────────┐
│ 5-Scene Gen  │     │ Talk-to-Hist │                             │  Supabase DB │           │  Wikipedia   │
│ Engine (2.0) │     │ Persona Chat │                             │  (PG Cache)  │           │  REST API    │
└──────────────┘     └──────────────┘                             └──────────────┘           └──────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) | App Router, Server Components & Route Handlers |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety and unified interfaces |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Imperial gold palette, obsidian theme & custom utility classes |
| **Motion** | [Framer Motion 11](https://www.framer.com/motion/) | Smooth card transitions, scene step animations & modal physics |
| **AI SDK** | [`@google/genai`](https://www.npmjs.com/package/@google/genai) | Official Google SDK running `gemini-2.0-flash` |
| **Database** | [Supabase](https://supabase.com/) | PostgreSQL knowledge base with Row Level Security |
| **Acoustics** | Web Audio & SpeechSynthesis | Native browser TTS narration & procedural ambient soundscapes |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, clean visual iconography |

---

## 📡 API Endpoints

TimeWitness provides server-side endpoints designed with strict JSON validation and offline fallbacks:

| Endpoint | Method | Description |
|---|---|---|
| `/api/generate-story` | `POST` | Generates a sequential 5-scene historical narrative arc with visual prompts and audio tags using Gemini 2.0 Flash. |
| `/api/talk-to-history` | `POST` | Engages in first-person historical dialogue with validated personas (Shivaji Maharaj, Rani Lakshmibai, Napoleon, etc.). |
| `/api/wiki-history` | `GET` | Fetches encyclopedic summaries and images from Supabase or live Wikipedia archives. |

---

## 📁 Project Structure

```text
TimeWitness/
├── public/                    # Static audio, logos, and icon assets
├── scripts/
│   └── fetch-wiki-corpus.mjs  # CLI utility to pre-populate historical knowledge cache
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-story/        # Gemini 2.0 Flash 5-scene generator
│   │   │   ├── talk-to-history/       # Persona conversational AI endpoint
│   │   │   └── wiki-history/          # Encyclopedic archive endpoint
│   │   ├── explore/page.tsx           # Global discovery portal (India & World)
│   │   ├── witness/page.tsx           # Dedicated 5-scene historical witness chamber
│   │   ├── experience/[id]/page.tsx   # Deep-linked historical dossiers
│   │   ├── search/page.tsx            # Global universal search with type filters
│   │   ├── dashboard/page.tsx         # Chronicler dashboard & bookmarks
│   │   ├── profile/page.tsx           # Scholar profile & title credentials
│   │   ├── settings/page.tsx          # Audio speed & cache settings
│   │   ├── how-it-works/page.tsx      # Archival engineering methodology
│   │   ├── about/page.tsx             # Mission & archival ethics
│   │   ├── privacy/page.tsx           # Privacy policy
│   │   ├── terms/page.tsx             # Terms of service
│   │   ├── globals.css                # Imperial theme, gold glow, & glassmorphism
│   │   ├── layout.tsx                 # Root layout with AppShell & font providers
│   │   └── page.tsx                   # Main cinematic landing page
│   ├── components/
│   │   ├── AppShell.tsx               # Layout shell with Navbar, Footer & Talk modal
│   │   ├── Navbar.tsx                 # Responsive global header & mobile drawer
│   │   ├── Footer.tsx                 # Museum-grade footer links
│   │   ├── HeroSection.tsx            # Dual CTAs & dynamic statistics
│   │   ├── ScenePlaceholder.tsx       # 5-scene timeline cards & atmospheric audio
│   │   ├── SearchBar.tsx              # Historical search & suggested exploration tags
│   │   ├── TalkToHistoryModal.tsx     # Interactive historical persona dialogue modal
│   │   └── AmbientAudioPlayer.tsx     # Procedural acoustic soundscapes
│   ├── context/
│   │   └── AppContext.tsx             # Global state (language, mute, bookmarks, profile)
│   ├── data/
│   │   ├── historicalCatalog.ts       # Indian & World categories, epochs, experiences
│   │   └── sampleStories.ts           # Curated primary source demo storylines
│   ├── lib/
│   │   └── supabase.ts                # Resilient Supabase client with offline fallback
│   └── utils/
│       └── supabase/                  # Server, client, admin, and wiki service utilities
├── supabase/
│   └── schema.sql                     # Supabase database schema & RLS policies
├── .env.example                       # Environment variables template
└── README.md                          # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: Version 18.x or later (recommended Node 20.x+)
- **npm** (v9+), **pnpm**, or **yarn**
- **Google Gemini API Key**: [Get a free key here](https://aistudio.google.com/app/apikey)
- **Supabase Project** *(optional)*: [Create a free Supabase project](https://supabase.com/)

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/prajapatbharat94k-creator/TimeWitness-.git
cd TimeWitness-
```

Install dependencies:
```bash
npm install
```

### 3. Environment Setup

Create your `.env.local` configuration file:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
# ── Google Gemini API Key (Required for dynamic AI generation) ──
GEMINI_API_KEY=your_gemini_api_key_here

# ── Supabase Credentials (Optional — enables cloud knowledge caching) ──
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

> **Note on Resilient Fallback Mode:**
> If `GEMINI_API_KEY` or `SUPABASE` keys are not provided, TimeWitness automatically runs in **Offline Resilient Mode**, loading verified historical dossiers and sample storylines directly from internal archives without crashing.

### 4. Running Locally

Start the local Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to explore TimeWitness.

### 5. Build & Production

To verify TypeScript types and generate an optimized production bundle:
```bash
npm run build
npm run start
```

---

## 👥 Contributors

Thanks to the contributors who have built and enhanced TimeWitness:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/prajapatbharat94k-creator">
        <img src="https://github.com/prajapatbharat94k-creator.png?size=100" width="100px;" alt="Bharat Prajapat"/>
        <br />
        <sub><b>Bharat Prajapat</b></sub>
      </a>
      <br />
      <sub>Creator & Maintainer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/harshvarsani043-gif">
        <img src="https://github.com/harshvarsani043-gif.png?size=100" width="100px;" alt="Harsh Varsani"/>
        <br />
        <sub><b>Harsh Varsani</b></sub>
      </a>
      <br />
      <sub>Contributor</sub>
    </td>
  </tr>
</table>

Contributions, issues, and feature requests are welcome!

---

## 🤝 Contributing

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/TimeWitness-.git
   ```
3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit** your changes with a clear commit message:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push** your branch to GitHub:
   ```bash
   git push -u origin feature/amazing-feature
   ```
6. **Open a Pull Request** against the `main` branch.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

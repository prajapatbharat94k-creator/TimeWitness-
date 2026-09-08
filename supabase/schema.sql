-- TimeWitness Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.

-- ============================================================
-- ENABLE UUID extension
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: historical_experiences
-- ============================================================
CREATE TABLE IF NOT EXISTS public.historical_experiences (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  subject      TEXT        NOT NULL,
  event        TEXT        NOT NULL DEFAULT '',
  year         TEXT,
  location     TEXT,
  category     TEXT,
  description  TEXT,
  cover_image  TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experiences_slug ON public.historical_experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_subject ON public.historical_experiences(subject);

-- ============================================================
-- TABLE: historical_scenes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.historical_scenes (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id       UUID        NOT NULL REFERENCES public.historical_experiences(id) ON DELETE CASCADE,
  scene_number        INTEGER     NOT NULL,
  title               TEXT        NOT NULL,
  narration           TEXT        NOT NULL,
  image_url           TEXT,
  historical_fact     TEXT,
  reconstruction_note TEXT,
  simulation_note     TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scenes_experience ON public.historical_scenes(experience_id);
CREATE INDEX IF NOT EXISTS idx_scenes_number    ON public.historical_scenes(experience_id, scene_number);

-- ============================================================
-- TABLE: historical_sources
-- ============================================================
CREATE TABLE IF NOT EXISTS public.historical_sources (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID        NOT NULL REFERENCES public.historical_experiences(id) ON DELETE CASCADE,
  title         TEXT        NOT NULL,
  publisher     TEXT,
  year          TEXT,
  url           TEXT,
  relevance     TEXT,
  source_type   TEXT        DEFAULT 'primary', -- primary | secondary | digital | academic
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sources_experience ON public.historical_sources(experience_id);

-- ============================================================
-- TABLE: favorites
-- ============================================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID        NOT NULL,
  experience_id UUID        NOT NULL REFERENCES public.historical_experiences(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, experience_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- ============================================================
-- TABLE: user_history
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_history (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID        NOT NULL,
  experience_id UUID        NOT NULL REFERENCES public.historical_experiences(id) ON DELETE CASCADE,
  last_viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, experience_id)
);

CREATE INDEX IF NOT EXISTS idx_history_user ON public.user_history(user_id);
CREATE INDEX IF NOT EXISTS idx_history_viewed ON public.user_history(last_viewed_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- historical_experiences: public read, no direct write from client
ALTER TABLE public.historical_experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experiences" ON public.historical_experiences
  FOR SELECT USING (true);
CREATE POLICY "Service role write experiences" ON public.historical_experiences
  FOR ALL USING (auth.role() = 'service_role');

-- historical_scenes: public read
ALTER TABLE public.historical_scenes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read scenes" ON public.historical_scenes
  FOR SELECT USING (true);
CREATE POLICY "Service role write scenes" ON public.historical_scenes
  FOR ALL USING (auth.role() = 'service_role');

-- historical_sources: public read
ALTER TABLE public.historical_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sources" ON public.historical_sources
  FOR SELECT USING (true);
CREATE POLICY "Service role write sources" ON public.historical_sources
  FOR ALL USING (auth.role() = 'service_role');

-- favorites: users can manage their own
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- user_history: users manage their own
ALTER TABLE public.user_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own history" ON public.user_history
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- AUTO-UPDATE updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.historical_experiences
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

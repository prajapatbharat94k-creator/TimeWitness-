'use client';

import { useEffect, useRef } from 'react';

// ─── Ambient Tag → Audio Descriptor Map ──────────────────────────────────────
// Each tag maps to a set of Web Audio API parameters to synthesise the vibe
// without requiring any external audio files.
type AmbientConfig = {
  /** Base oscillator frequency in Hz */
  baseFreq: number;
  /** Oscillator type */
  oscType: OscillatorType;
  /** Noise gain (0 = no noise) */
  noiseGain: number;
  /** Low-pass filter cutoff (Hz) */
  filterFreq: number;
  /** Slow LFO modulation depth */
  lfoDepth: number;
  /** LFO rate (Hz) */
  lfoRate: number;
  /** Master gain (0.0 – 1.0) */
  masterGain: number;
};

const AMBIENT_CONFIGS: Record<string, AmbientConfig> = {
  temple_bells_wind: {
    baseFreq: 220,
    oscType: 'sine',
    noiseGain: 0.04,
    filterFreq: 800,
    lfoDepth: 15,
    lfoRate: 0.3,
    masterGain: 0.06,
  },
  marching_drums: {
    baseFreq: 60,
    oscType: 'sawtooth',
    noiseGain: 0.12,
    filterFreq: 200,
    lfoDepth: 8,
    lfoRate: 1.4,
    masterGain: 0.07,
  },
  battle_horns_cannons: {
    baseFreq: 100,
    oscType: 'square',
    noiseGain: 0.18,
    filterFreq: 600,
    lfoDepth: 30,
    lfoRate: 0.8,
    masterGain: 0.08,
  },
  royal_fanfare: {
    baseFreq: 330,
    oscType: 'sine',
    noiseGain: 0.02,
    filterFreq: 2000,
    lfoDepth: 10,
    lfoRate: 0.5,
    masterGain: 0.06,
  },
  palace_ambience: {
    baseFreq: 180,
    oscType: 'sine',
    noiseGain: 0.03,
    filterFreq: 1200,
    lfoDepth: 8,
    lfoRate: 0.2,
    masterGain: 0.05,
  },
};

const DEFAULT_CONFIG: AmbientConfig = AMBIENT_CONFIGS['palace_ambience'];

// ─── Helper: create a noise buffer ──────────────────────────────────────────
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2; // 2-second loop
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface AmbientAudioPlayerProps {
  ambientTag: string;
  isMuted: boolean;
  isPlaying: boolean;
}

/**
 * AmbientAudioPlayer
 * ───────────────────
 * Uses the Web Audio API to synthesise a subtle ambient soundscape
 * for each historical scene's `ambientTag`. No external audio files required.
 * Automatically cross-fades when ambientTag changes.
 */
export default function AmbientAudioPlayer({ ambientTag, isMuted, isPlaying }: AmbientAudioPlayerProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  // ── Build the audio graph ─────────────────────────────────────────────────
  const buildGraph = (ctx: AudioContext, config: AmbientConfig): GainNode => {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // 1. Tonal oscillator with slow LFO vibrato
    const osc = ctx.createOscillator();
    osc.type = config.oscType;
    osc.frequency.setValueAtTime(config.baseFreq, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(config.lfoRate, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(config.lfoDepth, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const oscFilter = ctx.createBiquadFilter();
    oscFilter.type = 'lowpass';
    oscFilter.frequency.setValueAtTime(config.filterFreq, ctx.currentTime);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.4, ctx.currentTime);

    osc.connect(oscFilter);
    oscFilter.connect(oscGain);
    oscGain.connect(masterGain);

    // 2. Shaped noise layer
    const noiseBuffer = createNoiseBuffer(ctx);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(config.filterFreq * 0.6, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(0.5, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(config.noiseGain, ctx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    osc.start();
    lfo.start();
    noiseSource.start();

    nodesRef.current = [osc, lfo, noiseSource];
    return masterGain;
  };

  // ── Stop existing nodes ───────────────────────────────────────────────────
  const stopNodes = () => {
    nodesRef.current.forEach((node) => {
      try {
        (node as OscillatorNode | AudioBufferSourceNode).stop();
      } catch {
        // already stopped
      }
    });
    nodesRef.current = [];
  };

  // ── Start / Restart playback ──────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;

    // Lazily create AudioContext on user gesture
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = ctxRef.current;

    // Resume if suspended
    if (ctx.state === 'suspended') ctx.resume();

    // Tear down old nodes
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      setTimeout(stopNodes, 400);
    } else {
      stopNodes();
    }

    const config = AMBIENT_CONFIGS[ambientTag] ?? DEFAULT_CONFIG;
    const masterGain = buildGraph(ctx, config);
    masterGainRef.current = masterGain;

    // Fade in
    const targetGain = isMuted ? 0 : config.masterGain;
    masterGain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.8);

    return () => {
      // Fade out on unmount / tag change
      if (masterGainRef.current && ctxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.4);
        setTimeout(stopNodes, 600);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ambientTag, isPlaying]);

  // ── Mute / Unmute without rebuilding graph ───────────────────────────────
  useEffect(() => {
    if (!masterGainRef.current || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const config = AMBIENT_CONFIGS[ambientTag] ?? DEFAULT_CONFIG;
    const target = isMuted || !isPlaying ? 0 : config.masterGain;
    masterGainRef.current.gain.setTargetAtTime(target, ctx.currentTime, 0.3);
  }, [isMuted, isPlaying, ambientTag]);

  // ── Stop on pause ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying && masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.3);
    }
  }, [isPlaying]);

  // This component renders nothing — it's purely audio
  return null;
}

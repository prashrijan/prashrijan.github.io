"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/lib/store";

/**
 * Procedurally generated ambient pad — no audio asset to download. A trio of
 * detuned oscillators through a slow low-pass filter gives a cinematic drone
 * that fades in/out with the sound toggle and shifts subtly per chapter.
 */
export default function SoundManager() {
  const soundOn = useExperience((s) => s.soundOn);
  const chapter = useExperience((s) => s.chapter);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (!soundOn) {
      // Fade out and tear down.
      if (gainRef.current && ctxRef.current) {
        const now = ctxRef.current.currentTime;
        gainRef.current.gain.cancelScheduledValues(now);
        gainRef.current.gain.setTargetAtTime(0, now, 0.6);
        const ctx = ctxRef.current;
        setTimeout(() => {
          oscRef.current.forEach((o) => {
            try {
              o.stop();
            } catch {}
          });
          oscRef.current = [];
          ctx.close().catch(() => {});
          ctxRef.current = null;
        }, 1400);
      }
      return;
    }

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    gainRef.current = master;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 600;
    filter.Q.value = 0.7;
    filter.connect(master);
    filterRef.current = filter;

    // Soft minor-ish chord.
    const freqs = [110, 164.81, 220];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (i - 1) * 6;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.22;
      osc.connect(g);
      g.connect(filter);
      osc.start();
      oscRef.current.push(osc);
    });

    // Slow LFO on the filter for movement.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    oscRef.current.push(lfo);

    master.gain.setTargetAtTime(0.12, ctx.currentTime, 1.2);

    return () => {
      // handled by the soundOff branch / unmount below
    };
  }, [soundOn]);

  // Shift timbre per chapter for a sense of progression.
  useEffect(() => {
    if (!soundOn || !filterRef.current || !ctxRef.current) return;
    const base = 480 + chapter * 90;
    filterRef.current.frequency.setTargetAtTime(
      base,
      ctxRef.current.currentTime,
      2
    );
  }, [chapter, soundOn]);

  useEffect(() => {
    return () => {
      oscRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return null;
}

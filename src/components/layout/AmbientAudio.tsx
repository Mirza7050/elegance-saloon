import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm harmonic chords (A2 110Hz, E3 164.81Hz, C#4 277.18Hz)
      const freqs = [110, 164.81, 220, 277.18];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + idx * 40, ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((idx % 2 === 0 ? -0.4 : 0.4), ctx.currentTime);
          osc.connect(filter);
          filter.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(filter);
          filter.connect(masterGain);
        }

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (err) {
      console.warn('AudioContext not allowed yet:', err);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.5);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscillatorsRef.current = [];
        audioCtxRef.current?.close();
        setIsPlaying(false);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-[#0D0D14]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#EFECE6]/80 hover:text-[#D4AF37] backdrop-blur-md shadow-xl transition-all duration-300 text-[10px] sm:text-[11px] uppercase tracking-widest cursor-pointer active:scale-95"
      title="Toggle Salon Atmospheric Lounge Sound"
      aria-label="Toggle Salon Atmosphere"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] hidden min-[360px]:inline">Sound: On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFECE6]/50" />
          <span className="hidden min-[360px]:inline">Sound</span>
        </>
      )}
    </button>
  );
};

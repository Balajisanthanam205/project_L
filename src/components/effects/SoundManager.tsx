import { useEffect, useRef, useCallback, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// ========== EASY SOUND ADJUSTMENTS ==========
const SOUND_CONFIG = {
  thunder: {
    enabled: true,
    volume: 0.15,
    duration: 0.8,
    frequency: 150, // Low pass filter frequency for rumble
  },
  hover: {
    enabled: true,
    volume: 0.05,
    startFreq: 800,
    endFreq: 400,
    duration: 0.1,
  },
  click: {
    enabled: true,
    volume: 0.08,
    startFreq: 150,
    endFreq: 50,
    duration: 0.15,
  },
  ambient: {
    enabled: true,
    volume: 0.03, // Very subtle background hum
    frequency: 60, // Deep bass frequency
  },
};
// ============================================

const SoundManager = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const isInitializedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (isInitializedRef.current) return;
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    isInitializedRef.current = true;

    // Start ambient sound if enabled
    if (SOUND_CONFIG.ambient.enabled && audioContextRef.current) {
      const ctx = audioContextRef.current;
      
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = SOUND_CONFIG.ambient.frequency;
      
      const gain = ctx.createGain();
      gain.gain.value = SOUND_CONFIG.ambient.volume;
      
      // Add subtle modulation for more atmospheric feel
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 10;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      
      ambientOscillatorRef.current = oscillator;
      ambientGainRef.current = gain;
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.value = newMuted ? 0 : SOUND_CONFIG.ambient.volume;
      }
      return newMuted;
    });
  }, []);

  // Create a thunder sound
  const playThunderSound = useCallback(() => {
    if (!audioContextRef.current || isMuted || !SOUND_CONFIG.thunder.enabled) return;
    const ctx = audioContextRef.current;
    
    // Create noise buffer for thunder
    const bufferSize = ctx.sampleRate * SOUND_CONFIG.thunder.duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Low pass filter for rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = SOUND_CONFIG.thunder.frequency;
    
    // Gain envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(SOUND_CONFIG.thunder.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + SOUND_CONFIG.thunder.duration);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    source.start();
    source.stop(ctx.currentTime + SOUND_CONFIG.thunder.duration);
  }, [isMuted]);

  // Create a hover sound
  const playHoverSound = useCallback(() => {
    if (!audioContextRef.current || isMuted || !SOUND_CONFIG.hover.enabled) return;
    const ctx = audioContextRef.current;
    
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(SOUND_CONFIG.hover.startFreq, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(SOUND_CONFIG.hover.endFreq, ctx.currentTime + SOUND_CONFIG.hover.duration / 2);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(SOUND_CONFIG.hover.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + SOUND_CONFIG.hover.duration);
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + SOUND_CONFIG.hover.duration);
  }, [isMuted]);

  // Create a click sound
  const playClickSound = useCallback(() => {
    if (!audioContextRef.current || isMuted || !SOUND_CONFIG.click.enabled) return;
    const ctx = audioContextRef.current;
    
    const oscillator = ctx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(SOUND_CONFIG.click.startFreq, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(SOUND_CONFIG.click.endFreq, ctx.currentTime + SOUND_CONFIG.click.duration);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(SOUND_CONFIG.click.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + SOUND_CONFIG.click.duration);
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + SOUND_CONFIG.click.duration);
  }, [isMuted]);

  useEffect(() => {
    // Listen for lightning events
    const handleLightning = () => {
      if (audioContextRef.current) {
        playThunderSound();
      }
    };

    // Listen for hover on interactive elements
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playHoverSound();
      }
    };

    // Listen for clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        playClickSound();
      }
    };

    // Initialize on first interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('click', handleClick);
    window.addEventListener('lightning-strike', handleLightning);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('lightning-strike', handleLightning);
      
      // Cleanup ambient sound
      if (ambientOscillatorRef.current) {
        ambientOscillatorRef.current.stop();
      }
    };
  }, [initAudio, playThunderSound, playHoverSound, playClickSound]);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 left-4 z-[9998] p-2 rounded-full glass-panel border border-primary/30 hover:border-primary/60 transition-all duration-300 group"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Volume2 className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
      )}
    </button>
  );
};

export default SoundManager;

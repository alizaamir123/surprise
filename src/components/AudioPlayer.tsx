import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { toggleAmbientMelody, stopAmbientMelody } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      stopAmbientMelody();
    };
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    const active = toggleAmbientMelody((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {!hasInteracted && (
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5A1E2B] bg-[#FAF5ED]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C6A052]/30 shadow-md animate-pulse">
          <Sparkles className="w-3 h-3 text-[#C6A052]" />
          <span>Tap for soft melody</span>
        </span>
      )}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause background romantic melody' : 'Play background romantic melody'}
        className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 border shadow-lg ${
          isPlaying
            ? 'bg-[#5A1E2B] text-[#FAF7F2] border-[#C6A052]/50 shadow-[#5A1E2B]/30'
            : 'bg-[#FAF5ED]/95 text-[#4A1521] border-[#E8DACB] hover:bg-white hover:border-[#C6A052]/40 shadow-[#2C2420]/10'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#E8D5C4] animate-pulse" />
            <span className="text-xs font-serif-luxury tracking-wide hidden sm:inline">Melody Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#7A6B63]" />
            <span className="text-xs font-serif-luxury tracking-wide hidden sm:inline">Play Music</span>
          </>
        )}
      </button>
    </div>
  );
};

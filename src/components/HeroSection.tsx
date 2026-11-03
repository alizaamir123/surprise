import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenSurprise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSurprise }) => {
  const [phase, setPhase] = useState<'intro' | 'revealed'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') return 'revealed';
    }
    return 'intro';
  });

  useEffect(() => {
    if (phase === 'revealed') return;
    // After 2.4 seconds, reveal the grand birthday heading
    const timer = setTimeout(() => {
      setPhase('revealed');
    }, 2400);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 pb-12 overflow-hidden bg-gradient-to-b from-[#F5EBE1] via-[#FAF7F2] to-[#F3EBDD]"
    >
      {/* Subtle romantic ambient radial glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E8D3CE]/40 via-[#F5EBE1]/60 to-[#C6A052]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
        {/* Decorative Luxury Top Crest */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-2 mb-6 text-[#C6A052]"
        >
          <div className="w-8 sm:w-12 h-[1px] bg-[#C6A052]/60" />
          <Heart className="w-3.5 h-3.5 fill-[#C6A052] text-[#C6A052]" />
          <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
            A Little Piece of My Heart
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#C6A052] text-[#C6A052]" />
          <div className="w-8 sm:w-12 h-[1px] bg-[#C6A052]/60" />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'intro' ? (
            <motion.div
              key="intro-teaser"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, y: -10 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="py-12"
            >
              <p className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-[#5A1E2B] font-light tracking-wide mb-3">
                Someone special has a birthday today...
              </p>
              <p className="text-xs sm:text-sm tracking-widest uppercase text-[#9C8276] font-medium">
                Hold on tight · Preparing your surprise
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="birthday-reveal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Delicate Script Introduction */}
              <span className="font-script-romantic text-3xl sm:text-4xl md:text-5xl text-[#9E722A] font-semibold mb-2">
                Celebrating the love of my life
              </span>

              {/* Main Grand Headline */}
              <h1 className="font-display-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#2B0B13] mb-4 text-balance leading-[1.08]">
                HAPPY BIRTHDAY, <span className="text-[#68192A] inline-block">SABIH</span>
                <span className="text-[#C6A052] inline-block ml-2 animate-bounce">❤️</span>
              </h1>

              {/* Romantic Subtitle */}
              <p className="font-serif-luxury text-lg sm:text-2xl md:text-3xl italic text-[#3D2E26] max-w-2xl mb-6 leading-relaxed font-medium text-balance">
                "To my favorite person, my better half, and my sweetest blessing."
              </p>

              {/* Mini emotional note */}
              <p className="text-sm sm:text-base text-[#4E3D35] max-w-lg mb-8 leading-relaxed font-normal">
                Every second with you is a gift I cherish. Today is dedicated entirely to honoring you, your heart, and the happiness you bring into my life.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenSurprise}
                  className="min-h-[50px] px-8 py-3.5 rounded-full bg-[#5A1E2B] text-white font-serif-luxury text-lg tracking-wider shadow-xl shadow-[#5A1E2B]/30 hover:bg-[#43141F] border border-[#DFBF7A]/70 flex items-center justify-center gap-3 group transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#DFBF7A] group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">Open Your Surprise</span>
                  <Heart className="w-4 h-4 fill-[#DFBF7A] text-[#DFBF7A]" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-1 cursor-pointer"
          onClick={onOpenSurprise}
        >
          <span className="text-[11px] font-serif-luxury tracking-widest uppercase text-[#8C766C]">
            Scroll to uncover our story
          </span>
          <ChevronDown className="w-4 h-4 text-[#C6A052] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

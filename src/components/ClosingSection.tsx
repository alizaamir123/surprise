import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMusicBoxNote } from '../utils/audio';

export const ClosingSection: React.FC = () => {
  const [loveCount, setLoveCount] = useState<number>(0);
  const [showHeartsBanner, setShowHeartsBanner] = useState<boolean>(false);

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    setShowHeartsBanner(true);
    playMusicBoxNote(1046.5, 1.0, 0.09);

    // Heart-shaped confetti burst
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#5A1E2B', '#E11D48', '#DFBF7A', '#C6A052', '#FAF7F2'],
      shapes: ['circle']
    });

    setTimeout(() => {
      setShowHeartsBanner(false);
    }, 3500);
  };

  return (
    <footer
      id="closing"
      className="relative min-h-[90vh] flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#2D0D14] to-[#1C050B] text-[#FAF7F2] overflow-hidden"
    >
      {/* Subtle Starry Night Bokeh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#DFBF7A]/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#E11D48]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto px-4">
        {/* Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-[#DFBF7A] mb-8"
        >
          <div className="w-12 h-[1px] bg-[#DFBF7A]/40" />
          <Star className="w-4 h-4 fill-[#DFBF7A]" />
          <Heart className="w-5 h-5 fill-[#E11D48] text-[#E11D48]" />
          <Star className="w-4 h-4 fill-[#DFBF7A]" />
          <div className="w-12 h-[1px] bg-[#DFBF7A]/40" />
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7F2] mb-6 leading-tight"
        >
          Happy Birthday, My Better Half.
        </motion.h2>

        {/* Emotional Paragraph as explicitly requested by user */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-luxury text-lg sm:text-2xl md:text-3xl italic text-[#E8D3CE] max-w-3xl mx-auto mb-8 leading-relaxed font-light text-balance"
        >
          "You deserve all the happiness, love and beautiful things this world has to offer. I'm so lucky to have you. Here's to more memories, more laughter and countless beautiful moments together. I love you. ❤️"
        </motion.p>

        {/* The Final Touch requested */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <span className="font-script-romantic text-3xl sm:text-5xl text-[#DFBF7A] block">
            Forever grateful that it's YOU.
          </span>
        </motion.div>

        {/* Interactive "Send Love Back" button */}
        <div className="flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendLove}
            className="min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBF7A] to-[#C6A052] text-[#2D0D14] font-serif-luxury text-base font-bold tracking-wider shadow-lg shadow-[#DFBF7A]/20 hover:shadow-xl hover:shadow-[#DFBF7A]/30 flex items-center gap-2.5 transition-all"
          >
            <Heart className="w-4 h-4 fill-[#2D0D14]" />
            <span>Shower Sabih with Love</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>

          <AnimatePresence>
            {showHeartsBanner && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-serif-luxury text-[#DFBF7A] tracking-wider"
              >
                Infinite love sent straight to Sabih's heart ({loveCount} {loveCount === 1 ? 'hug' : 'hugs'} & counting) ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer bottom quiet copyright & credit */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D3CE]/60 gap-4">
        <span>Handcrafted with all my love for Sabih's Special Day</span>
        <div className="flex items-center gap-2">
          <span>Made for you</span>
          <span aria-hidden="true">·</span>
          <span>Today & Always</span>
        </div>
      </div>
    </footer>
  );
};

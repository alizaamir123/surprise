import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Feather, BookmarkCheck } from 'lucide-react';
import { playPaperRustle } from '../utils/audio';

export const LoveLetter: React.FC = () => {
  const [isUnfolded, setIsUnfolded] = useState<boolean>(true);
  const [showSecretPS, setShowSecretPS] = useState<boolean>(false);

  const handleTogglePS = () => {
    playPaperRustle();
    setShowSecretPS((prev) => !prev);
  };

  return (
    <section id="letter" className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-[#C6A052] mb-3">
            <Feather className="w-4 h-4" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
              From My Heart To Yours
            </span>
            <Feather className="w-4 h-4" />
          </div>

          <h2 className="font-display-luxury text-3xl sm:text-5xl font-bold text-[#3F131D] mb-4">
            A Little Letter For My Favorite Human
          </h2>
          <p className="font-serif-luxury text-base sm:text-lg italic text-[#6B5A51]">
            Words could never fully contain what you mean to me, but here is a piece of my truth.
          </p>
        </div>

        {/* The Letter Envelope / Stationery Paper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="parchment-card rounded-2xl p-6 sm:p-12 md:p-16 border-2 border-[#D8C7B5] relative shadow-2xl"
        >
          {/* Gold foil corner stamps */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C6A052]/70" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C6A052]/70" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#C6A052]/70" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C6A052]/70" />

          {/* Letter Header with Wax Seal */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#E8DACB]">
            <div>
              <span className="font-script-romantic text-3xl sm:text-4xl text-[#5A1E2B] block">
                My Dearest Sabih,
              </span>
              <span className="text-[11px] font-serif-luxury tracking-widest uppercase text-[#8C766C]">
                November 2026 · With All My Love
              </span>
            </div>

            {/* Wax Seal Medallion */}
            <div className="relative group flex items-center justify-center">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#5A1E2B] flex items-center justify-center shadow-lg border-2 border-[#DFBF7A]/50 cursor-pointer transform hover:scale-105 transition-transform"
                title="Wax Seal of Love"
              >
                <span className="font-display-luxury text-xl sm:text-2xl text-[#DFBF7A] font-bold">
                  S
                </span>
              </div>
            </div>
          </div>

          {/* Letter Body: Handwritten & Elegant Editorial Style */}
          <div className="space-y-6 text-[#3A2E28] font-serif-luxury text-lg sm:text-xl leading-relaxed sm:leading-loose">
            <p>
              Happy Birthday, my love. Today isn't just about blowing out candles or adding another number to your age — it's about honoring the day my favorite person entered this world.
            </p>

            <p>
              I want you to know how deeply grateful I am to have you in my life. You have a way of calming the loudest storms with just a single gentle touch or that silly grin that never fails to make me laugh. In a world that is always in a hurry, being with you feels like exhaling after holding my breath for far too long.
            </p>

            <p>
              You are someone of immense integrity, quiet strength, and genuine kindness. I watch the way you care, the dedication you put into everything you pursue, and how you carry yourself with so much grace — and I fall in love with you all over again every single day.
            </p>

            <p>
              My greatest prayer for you this year is to see all your dreams unfold with effortless beauty. I want to see you happy, thriving, and conquering every milestone your heart desires. You deserve all the good things, all the peace, and all the love this universe can offer.
            </p>

            <p>
              Thank you for being my constant, my safe space, and my greatest blessing. No matter what changes around us, my love for you remains steadfast, deep, and unconditionally yours.
            </p>
          </div>

          {/* Letter Sign-off */}
          <div className="mt-10 pt-6 border-t border-[#E8DACB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-serif-luxury italic text-base text-[#7A6054]">
                Forever and always by your side,
              </p>
              <p className="font-script-romantic text-3xl sm:text-4xl text-[#5A1E2B] mt-1">
                Your Better Half ❤️
              </p>
            </div>

            {/* Secret P.S. interactive button */}
            <button
              onClick={handleTogglePS}
              className="min-h-[44px] px-4 py-2 rounded-full bg-[#FAF5ED] hover:bg-white text-xs font-serif-luxury tracking-wider text-[#5A1E2B] border border-[#C6A052]/40 shadow-xs flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
              <span>{showSecretPS ? 'Fold Secret P.S.' : 'Unfold Secret P.S.'}</span>
            </button>
          </div>

          {/* Secret P.S. Note Accordion */}
          <AnimatePresence>
            {showSecretPS && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-6"
              >
                <div className="p-5 sm:p-6 rounded-xl bg-[#FAF0E4] border border-[#DFBF7A]/60 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-serif-luxury tracking-widest uppercase text-[#8C6D58] mb-2">
                    <BookmarkCheck className="w-4 h-4 text-[#C6A052]" />
                    <span>P.S. Just between you and me:</span>
                  </div>
                  <p className="font-serif-luxury italic text-base sm:text-lg text-[#5A1E2B] leading-relaxed">
                    "You still have the sweetest squishy cheeks in the universe, and no matter how tough you look at the gym, you'll always be my sweet teddy bear. Now go eat lots of cake!"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

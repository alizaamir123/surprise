import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Send } from 'lucide-react';
import { playCelebrationChime, playMusicBoxNote } from '../utils/audio';
import { validateAndCleanWish } from '../utils/birthdayHelpers';

export const CakeSection: React.FC = () => {
  const [isBlownOut, setIsBlownOut] = useState<boolean>(false);
  const [userWish, setUserWish] = useState<string>('');
  const [wishLocked, setWishLocked] = useState<boolean>(false);
  const [wishError, setWishError] = useState<string>('');
  const [wishesCount, setWishesCount] = useState<number>(0);

  const triggerBlowCandle = () => {
    setIsBlownOut(true);
    setWishesCount((prev) => prev + 1);
    playCelebrationChime();

    // Trigger golden and champagne confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#C6A052', '#DFBF7A', '#5A1E2B', '#FAF7F2', '#E8D3CE']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const handleRelight = () => {
    setIsBlownOut(false);
    playMusicBoxNote(880, 0.6, 0.08);
  };

  const handleLockWish = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAndCleanWish(userWish);
    if (!result.isValid) {
      setWishError(result.errorMessage || 'Please write your wish.');
      return;
    }
    setWishError('');
    setWishLocked(true);
    playMusicBoxNote(1046.5, 1.2, 0.1);
  };

  return (
    <section id="cake" className="py-24 sm:py-32 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F6EEE4] to-[#FAF7F2] relative overflow-hidden">
      {/* Warm Ambient Glow behind the cake */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full transition-opacity duration-1000 pointer-events-none blur-3xl ${
          isBlownOut
            ? 'opacity-20 bg-[#DFBF7A]/20'
            : 'opacity-65 bg-gradient-to-tr from-[#F59E0B]/25 via-[#EF4444]/15 to-[#DFBF7A]/30'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 text-[#C6A052] mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
              A Special Birthday Moment
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-display-luxury text-3xl sm:text-5xl font-bold text-[#3F131D] mb-4">
            Make A Wish, Sabih
          </h2>
          <p className="font-serif-luxury text-base sm:text-xl italic text-[#5C4D44] max-w-xl mx-auto leading-relaxed">
            Close your eyes, think of the one dream that makes your heart beat faster, and blow out the candle.
          </p>
        </div>

        {/* Handcrafted Celebration Cake Illustration Scene */}
        <div className="relative py-12 flex flex-col items-center justify-center">
          {/* Candle Setup */}
          <div className="relative flex flex-col items-center z-30 mb-[-4px]">
            {/* Candle Flame / Smoke */}
            <div className="relative h-16 w-8 flex items-center justify-center">
              {!isBlownOut ? (
                <div className="relative flex flex-col items-center">
                  {/* Outer Flame Glow */}
                  <div className="w-6 h-9 rounded-full bg-gradient-to-t from-[#EF4444] via-[#F59E0B] to-[#FEF08A] animate-flame shadow-lg cursor-pointer" />
                  {/* Inner Core Flame */}
                  <div className="absolute top-2 w-2.5 h-4.5 rounded-full bg-white/90 animate-flame" />
                </div>
              ) : (
                /* Smoke Wisp after blowing candle */
                <div className="relative flex flex-col items-center">
                  <div className="w-2.5 h-6 bg-[#A8A29E]/60 rounded-full blur-[1px] animate-smoke" />
                </div>
              )}
            </div>

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-[#3F2B20] rounded-t-xs" />

            {/* Candle Body */}
            <div className="w-4 h-16 bg-gradient-to-r from-[#DFBF7A] via-[#FFF3D6] to-[#C6A052] rounded-t-md shadow-md border-x border-[#C6A052]" />
          </div>

          {/* Tier 1 (Top Tier Cake) */}
          <div className="relative z-20 w-44 sm:w-56 h-20 rounded-t-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EA] to-[#F1E4D4] border-t-4 border-[#C6A052] shadow-md flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-1 h-2 flex justify-around">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-[#DFBF7A] shadow-xs" />
              ))}
            </div>
            <span className="font-script-romantic text-2xl sm:text-3xl text-[#5A1E2B] font-bold tracking-wide">
              Sabih
            </span>
          </div>

          {/* Tier 2 (Bottom Tier Cake) */}
          <div className="relative z-10 w-64 sm:w-80 h-24 rounded-t-2xl bg-gradient-to-b from-[#FFFDF9] via-[#F4E8D8] to-[#E8D7C3] border-t-4 border-[#C6A052] shadow-xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-1.5 h-2.5 flex justify-around px-2">
              {Array.from({ length: 13 }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#C6A052] shadow-xs" />
              ))}
            </div>
            {/* Delicate floral icing scroll */}
            <div className="flex items-center gap-3 text-[#5A1E2B]">
              <Heart className="w-3.5 h-3.5 fill-[#C6A052] text-[#C6A052]" />
              <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.2em] uppercase text-[#6B4B3E]">
                Happy Birthday
              </span>
              <Heart className="w-3.5 h-3.5 fill-[#C6A052] text-[#C6A052]" />
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-[#DFBF7A] via-[#FFF5DE] to-[#C6A052] shadow-xl border-t border-white" />
          <div className="w-40 sm:w-48 h-6 bg-gradient-to-b from-[#C6A052] to-[#8C6D32] rounded-b-xl shadow-lg" />
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {!isBlownOut ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={triggerBlowCandle}
              className="min-h-[50px] px-8 py-3.5 rounded-full bg-[#5A1E2B] text-white font-serif-luxury text-lg tracking-wider shadow-xl shadow-[#5A1E2B]/25 hover:bg-[#43141F] border border-[#DFBF7A]/60 flex items-center gap-3 transition-all"
            >
              <Sparkles className="w-5 h-5 text-[#DFBF7A]" />
              <span>Make a Wish, Sabih!</span>
              <Heart className="w-4 h-4 fill-[#DFBF7A] text-[#DFBF7A]" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRelight}
                className="min-h-[46px] px-6 py-2.5 rounded-full bg-[#FAF5ED] text-[#5A1E2B] font-serif-luxury text-sm tracking-wider border border-[#C6A052]/50 hover:bg-white shadow-md flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-[#C6A052]" />
                <span>Relight the Candle</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Celebration Reveal Card on Blow */}
        <AnimatePresence>
          {isBlownOut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#FAF5ED] border-2 border-[#C6A052]/40 shadow-xl max-w-xl mx-auto"
            >
              <span className="font-script-romantic text-3xl sm:text-4xl text-[#5A1E2B] block mb-2">
                Wish Sent To The Heavens!
              </span>
              <p className="font-serif-luxury text-lg text-[#3F131D] italic mb-3 leading-relaxed">
                "May every prayer you whispered in your heart today be answered in ways sweeter than you ever imagined."
              </p>
              <p className="text-xs text-[#7A6A60] leading-relaxed mb-6">
                You bring so much light to everyone around you. Today, all the light and joy comes right back to you.
              </p>

              {/* Secret Wish Capsule Input */}
              {!wishLocked ? (
                <form onSubmit={handleLockWish} className="mt-4 pt-4 border-t border-[#E8DACB]">
                  <label htmlFor="secret-wish" className="block text-xs font-serif-luxury text-[#6B5A51] mb-2 font-medium">
                    Lock a private wish into our memory capsule:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="secret-wish"
                      type="text"
                      value={userWish}
                      onChange={(e) => {
                        setUserWish(e.target.value);
                        setWishError('');
                      }}
                      placeholder="Type your birthday wish here..."
                      className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-[#D5C1AA] text-sm text-[#3A2E28] placeholder-[#9C8276] focus:outline-none focus:border-[#5A1E2B]"
                    />
                    <button
                      type="submit"
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-[#5A1E2B] text-white text-xs font-serif-luxury tracking-wider hover:bg-[#43141F] flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Seal Wish</span>
                    </button>
                  </div>
                  {wishError && <p className="text-xs text-red-600 mt-1 text-left">{wishError}</p>}
                </form>
              ) : (
                <div className="mt-4 p-4 rounded-xl bg-[#F0E6D8] border border-[#DFBF7A] text-xs text-[#5A1E2B] font-serif-luxury">
                  <span className="font-bold block mb-1">✨ Wish Sealed with Love:</span>
                  "{userWish}" — Kept safe in my heart forever.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
